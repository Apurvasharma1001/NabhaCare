import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Doctor,
  Patient,
  DoctorStatus,
  NotificationItem,
  SyncItem,
  ActivityItem,
  DashboardStats,
  Consultation,
  Prescription,
  MedicalReport,
} from '../types';
import {
  mockCurrentDoctor,
  initialPatients,
  initialNotifications,
  initialActivities,
  initialSyncItems,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface AppContextType {
  doctor: Doctor;
  doctorAvailability: DoctorStatus;
  isOnline: boolean;
  isAuthenticated: boolean;
  patients: Patient[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  syncQueue: SyncItem[];
  lastSyncedTime: string;
  isSyncing: boolean;
  activities: ActivityItem[];
  toasts: ToastMessage[];
  stats: DashboardStats;

  // Actions
  setDoctorAvailability: (status: DoctorStatus) => void;
  toggleConnectivity: () => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateDoctorProfile: (data: Partial<Doctor>) => void;
  
  getPatientById: (id: string) => Patient | undefined;
  updatePatient: (patient: Patient) => void;
  completeConsultation: (
    patientId: string,
    consultation: Omit<Consultation, 'id'>,
    prescription?: Omit<Prescription, 'id' | 'createdAt'>
  ) => { consultationId: string; prescriptionId?: string };
  addReportToPatient: (patientId: string, report: Omit<MedicalReport, 'id'>) => void;
  
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  triggerManualSync: () => Promise<void>;
  
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PATIENTS: 'nabha_telemed_patients_v2',   // bumped: new patientRawText + aiSummary fields
  DOCTOR: 'nabha_telemed_doctor_v1',
  AVAILABILITY: 'nabha_telemed_availability_v1',
  NOTIFICATIONS: 'nabha_telemed_notifications_v1',
  ACTIVITIES: 'nabha_telemed_activities_v1',
  SYNC_QUEUE: 'nabha_telemed_sync_queue_v1',
  LAST_SYNC: 'nabha_telemed_last_sync_v1',
  AUTH: 'nabha_telemed_auth_v1',
  ONLINE: 'nabha_telemed_online_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH);
    return saved !== null ? JSON.parse(saved) : true; // Default logged in for hackathon demo convenience
  });

  // 2. Doctor Info & Availability
  const [doctor, setDoctor] = useState<Doctor>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.DOCTOR);
    return saved ? JSON.parse(saved) : mockCurrentDoctor;
  });

  const [doctorAvailability, setAvailabilityState] = useState<DoctorStatus>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.AVAILABILITY);
    return (saved as DoctorStatus) || 'AVAILABLE';
  });

  // 3. Online Connectivity State
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ONLINE);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // 4. Patients Queue & Longitudinal Records
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PATIENTS);
    return saved ? JSON.parse(saved) : initialPatients;
  });

  // 5. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // 6. Sync Items & Syncing status
  const [syncQueue, setSyncQueue] = useState<SyncItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SYNC_QUEUE);
    return saved ? JSON.parse(saved) : initialSyncItems;
  });

  const [lastSyncedTime, setLastSyncedTime] = useState<string>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_SYNC);
    return saved || '10:42 AM';
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // 7. Recent Activity Feed
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : initialActivities;
  });

  // 8. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist states to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH, JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DOCTOR, JSON.stringify(doctor));
  }, [doctor]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AVAILABILITY, doctorAvailability);
  }, [doctorAvailability]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ONLINE, JSON.stringify(isOnline));
  }, [isOnline]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(syncQueue));
  }, [syncQueue]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_SYNC, lastSyncedTime);
  }, [lastSyncedTime]);

  // Toast Helpers
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 4000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Availability Setter with feedback toast & activity
  const setDoctorAvailability = (status: DoctorStatus) => {
    setAvailabilityState(status);
    setDoctor((prev) => ({ ...prev, status }));

    let message = '';
    if (status === 'AVAILABLE') message = 'Doctor status: Available. New patients can be assigned.';
    else if (status === 'BUSY') message = 'Doctor status: Busy. Existing consultation can continue.';
    else message = 'Doctor status: Offline. No new patients will be assigned.';

    addToast({
      type: status === 'AVAILABLE' ? 'success' : status === 'BUSY' ? 'warning' : 'info',
      title: `Status updated to ${status}`,
      message,
    });
  };

  // Connectivity toggle
  const toggleConnectivity = () => {
    setIsOnline((prev) => {
      const next = !prev;
      if (next) {
        // Going online: trigger automatic sync of pending items
        addToast({
          type: 'success',
          title: 'Connection Restored',
          message: 'Synchronizing offline records with central server...',
        });
        setTimeout(() => {
          triggerManualSync();
        }, 800);
      } else {
        // Going offline
        addToast({
          type: 'warning',
          title: 'Working in Offline Mode',
          message: 'Cached records accessible. Changes will be queued for sync.',
        });
      }
      return next;
    });
  };

  // Login / Logout
  const login = (email: string, pass: string): boolean => {
    if (email === 'doctor@example.com' && pass === 'password123') {
      setIsAuthenticated(true);
      addToast({
        type: 'success',
        title: 'Welcome Dr. Sharma',
        message: 'Signed in to Nabha Telemedicine Portal successfully.',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been safely signed out.',
    });
  };

  const updateDoctorProfile = (data: Partial<Doctor>) => {
    setDoctor((prev) => ({ ...prev, ...data }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Doctor profile changes saved successfully.',
    });
  };

  const getPatientById = (id: string): Patient | undefined => {
    return patients.find((p) => p.id === id || p.patientId === id);
  };

  const updatePatient = (updatedPatient: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)));
  };

  // Complete Consultation & Update Longitudinal History
  const completeConsultation = (
    patientId: string,
    consultationData: Omit<Consultation, 'id'>,
    prescriptionData?: Omit<Prescription, 'id' | 'createdAt'>
  ): { consultationId: string; prescriptionId?: string } => {
    const consultationId = `cons-${Date.now()}`;
    const prescriptionId = prescriptionData ? `RX-2026-${Math.floor(1000 + Math.random() * 9000)}` : undefined;

    let newPrescription: Prescription | undefined = undefined;

    if (prescriptionData && prescriptionId) {
      newPrescription = {
        ...prescriptionData,
        id: prescriptionId,
        consultationId,
        createdAt: new Date().toISOString(),
      };
    }

    const newConsultation: Consultation = {
      ...consultationData,
      id: consultationId,
      prescriptionId,
      prescription: newPrescription,
      status: 'Completed',
    };

    // Update patient record
    let targetPatientName = 'Patient';
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          targetPatientName = p.name;
          const updatedConsultations = [newConsultation, ...p.consultationHistory];
          const updatedPrescriptions = newPrescription
            ? [newPrescription, ...p.prescriptions]
            : p.prescriptions;

          return {
            ...p,
            queueStatus: 'Completed',
            waitingMinutes: 0,
            consultationHistory: updatedConsultations,
            prescriptions: updatedPrescriptions,
          };
        }
        return p;
      })
    );

    // Add to activity feed
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: 'Consultation Completed',
      description: `Completed consultation for ${targetPatientName}. Prescription generated and saved to records.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'consultation',
      patientName: targetPatientName,
      patientId,
    };
    setActivities((prev) => [newActivity, ...prev]);

    // Add to sync queue if offline or for sync tracking
    const newSyncItem: SyncItem = {
      id: `sync-${Date.now()}`,
      type: 'consultation_complete',
      title: `Consultation record (${targetPatientName})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: isOnline ? 'synced' : 'pending',
      details: prescriptionId ? `Prescription ${prescriptionId} issued` : 'Clinical notes filed',
    };
    setSyncQueue((prev) => [newSyncItem, ...prev]);

    addToast({
      type: 'success',
      title: 'Consultation Saved',
      message: `Record archived for ${targetPatientName}. History and statistics updated.`,
    });

    return { consultationId, prescriptionId };
  };

  // Add mock report to patient
  const addReportToPatient = (patientId: string, reportData: Omit<MedicalReport, 'id'>) => {
    const reportId = `rep-${Date.now()}`;
    const newReport: MedicalReport = {
      ...reportData,
      id: reportId,
    };

    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            reports: [newReport, ...p.reports],
          };
        }
        return p;
      })
    );

    addToast({
      type: 'success',
      title: 'Report Uploaded',
      message: `${reportData.name} has been added to patient documents.`,
    });
  };

  // Notification management
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.',
    });
  };

  // Manual or automatic synchronization trigger
  const triggerManualSync = async () => {
    setIsSyncing(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSyncQueue((prev) =>
      prev.map((item) => ({ ...item, status: 'synced' }))
    );

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSyncedTime(now);
    setIsSyncing(false);

    addToast({
      type: 'success',
      title: 'Synchronization Complete',
      message: 'All local changes synchronized with Nabha Hospital server.',
    });
  };

  // Compute live Dashboard Statistics
  const waitingPatients = patients.filter((p) => p.queueStatus === 'Waiting' || p.queueStatus === 'In Consultation');
  const completedToday = patients.filter((p) => p.queueStatus === 'Completed').length;
  const urgentCount = waitingPatients.filter((p) => p.priority === 'URGENT').length;
  const mediumCount = waitingPatients.filter((p) => p.priority === 'MEDIUM').length;
  const lowCount = waitingPatients.filter((p) => p.priority === 'LOW').length;

  const totalWait = waitingPatients.reduce((sum, p) => sum + p.waitingMinutes, 0);
  const avgWait = waitingPatients.length > 0 ? Math.round(totalWait / waitingPatients.length) : 0;

  const stats: DashboardStats = {
    patientsWaiting: waitingPatients.length,
    urgentPatients: urgentCount,
    consultationsCompletedToday: completedToday + 13, // Include baseline completed today for realistic stats
    averageWaitTimeMinutes: avgWait || 18,
    mediumPriority: mediumCount,
    lowPriority: lowCount,
  };

  return (
    <AppContext.Provider
      value={{
        doctor,
        doctorAvailability,
        isOnline,
        isAuthenticated,
        patients,
        notifications,
        unreadNotificationCount,
        syncQueue,
        lastSyncedTime,
        isSyncing,
        activities,
        toasts,
        stats,
        setDoctorAvailability,
        toggleConnectivity,
        login,
        logout,
        updateDoctorProfile,
        getPatientById,
        updatePatient,
        completeConsultation,
        addReportToPatient,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        triggerManualSync,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
