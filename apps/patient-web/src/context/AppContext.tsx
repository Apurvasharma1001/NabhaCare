import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Patient,
  Consultation,
  Prescription,
  NotificationItem,
  SymptomReport,
  Booking,
  MedicalHistorySummary,
} from '../types';
import {
  mockCurrentPatient,
  initialConsultations,
  initialPrescriptions,
  initialNotifications,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  village: string;
  bloodGroup: string;
  allergies: string;
  chronicConditions: string;
  currentMedications: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface AppContextType {
  patient: Patient | null;
  isAuthenticated: boolean;
  consultations: Consultation[];
  prescriptions: Prescription[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  symptomReports: SymptomReport[];
  bookings: Booking[];
  toasts: ToastMessage[];

  login: (email: string, password: string) => boolean;
  signup: (data: SignupData) => void;
  logout: () => void;
  updateMedicalHistory: (data: Partial<MedicalHistorySummary>) => void;
  updateProfile: (data: Partial<Patient>) => void;

  addSymptomReport: (report: Omit<SymptomReport, 'id' | 'patientId' | 'createdAt'>) => SymptomReport;
  addBooking: (booking: Omit<Booking, 'id' | 'patientId' | 'bookedAt'>) => Booking;
  cancelBooking: (id: string) => void;

  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const KEYS = {
  PATIENT: 'nabha_telemed_patient_v1',
  AUTH: 'nabha_telemed_patient_auth_v1',
  CONSULTATIONS: 'nabha_telemed_patient_consultations_v1',
  PRESCRIPTIONS: 'nabha_telemed_patient_prescriptions_v1',
  NOTIFICATIONS: 'nabha_telemed_patient_notifications_v1',
  REPORTS: 'nabha_telemed_patient_reports_v1',
  BOOKINGS: 'nabha_telemed_patient_bookings_v1',
  REGISTERED: 'nabha_telemed_patient_registered_v1', // demo "database" of one signed-up user
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<Patient | null>(load(KEYS.PATIENT, null));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(load(KEYS.AUTH, false));
  const [consultations] = useState<Consultation[]>(load(KEYS.CONSULTATIONS, initialConsultations));
  const [prescriptions] = useState<Prescription[]>(load(KEYS.PRESCRIPTIONS, initialPrescriptions));
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    load(KEYS.NOTIFICATIONS, initialNotifications)
  );
  const [symptomReports, setSymptomReports] = useState<SymptomReport[]>(load(KEYS.REPORTS, []));
  const [bookings, setBookings] = useState<Booking[]>(load(KEYS.BOOKINGS, []));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (patient) localStorage.setItem(KEYS.PATIENT, JSON.stringify(patient));
  }, [patient]);
  useEffect(() => {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);
  useEffect(() => {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem(KEYS.REPORTS, JSON.stringify(symptomReports));
  }, [symptomReports]);
  useEffect(() => {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };
  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // --- Auth ---
  const login = (email: string, password: string): boolean => {
    const registered = load<SignupData | null>(KEYS.REGISTERED, null);
    // Demo login: accept the registered demo account OR the seeded demo credentials
    if (
      (registered && registered.email === email && registered.password === password) ||
      (email === 'patient@example.com' && password === 'password123')
    ) {
      const toLoad = registered && registered.email === email ? buildPatientFromSignup(registered) : mockCurrentPatient;
      setPatient(toLoad);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const buildPatientFromSignup = (data: SignupData): Patient => ({
    id: 'p1',
    patientId: 'PAT-1021',
    name: data.name,
    age: data.age,
    gender: data.gender,
    phone: data.phone,
    email: data.email,
    village: data.village,
    registrationDate: new Date().toISOString().slice(0, 10),
    avatarUrl: `https://i.pravatar.cc/150?u=${encodeURIComponent(data.email)}`,
    medicalHistory: {
      bloodGroup: data.bloodGroup,
      allergies: data.allergies ? data.allergies.split(',').map((s) => s.trim()).filter(Boolean) : [],
      chronicConditions: data.chronicConditions
        ? data.chronicConditions.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      currentMedications: data.currentMedications
        ? data.currentMedications.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      pastSurgeries: [],
      familyHistory: '',
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
    },
  });

  const signup = (data: SignupData) => {
    localStorage.setItem(KEYS.REGISTERED, JSON.stringify(data));
    const newPatient = buildPatientFromSignup(data);
    setPatient(newPatient);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(KEYS.AUTH, JSON.stringify(false));
  };

  const updateMedicalHistory = (data: Partial<MedicalHistorySummary>) => {
    setPatient((prev) => (prev ? { ...prev, medicalHistory: { ...prev.medicalHistory, ...data } } : prev));
  };

  const updateProfile = (data: Partial<Patient>) => {
    setPatient((prev) => (prev ? { ...prev, ...data } : prev));
  };

  // --- Symptom reports & Booking ---
  const addSymptomReport = (report: Omit<SymptomReport, 'id' | 'patientId' | 'createdAt'>): SymptomReport => {
    const full: SymptomReport = {
      ...report,
      id: `rep-${Date.now()}`,
      patientId: patient?.id || 'p1',
      createdAt: new Date().toISOString(),
    };
    setSymptomReports((prev) => [full, ...prev]);
    return full;
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'patientId' | 'bookedAt'>): Booking => {
    const full: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      patientId: patient?.id || 'p1',
      bookedAt: new Date().toISOString(),
    };
    setBookings((prev) => [full, ...prev]);
    addToast({ type: 'success', title: 'Appointment booked', message: `Token ${full.tokenNumber} confirmed` });
    return full;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b)));
    addToast({ type: 'info', title: 'Booking cancelled' });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        patient,
        isAuthenticated,
        consultations,
        prescriptions,
        notifications,
        unreadNotificationCount,
        symptomReports,
        bookings,
        toasts,
        login,
        signup,
        logout,
        updateMedicalHistory,
        updateProfile,
        addSymptomReport,
        addBooking,
        cancelBooking,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
