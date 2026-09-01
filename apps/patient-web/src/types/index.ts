export type PriorityLevel = 'URGENT' | 'MEDIUM' | 'LOW';

export type ConsultationChannel = 'Audio' | 'Video' | 'In-Person';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_QUEUE' | 'COMPLETED' | 'CANCELLED';

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string; // e.g. "RX-2026-0142"
  consultationId?: string;
  patientId: string;
  doctorName: string;
  doctorSpecialization: string;
  hospitalName: string;
  date: string;
  medicines: Medicine[];
  instructions: string;
  followUp: string;
  doctorNotes?: string;
  status: 'Active' | 'Dispensed' | 'Completed';
  createdAt: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  time: string;
  durationMinutes: number;
  chiefComplaint: string;
  assessment: string;
  advice: string;
  followUp: string;
  channel: ConsultationChannel;
  status: 'Completed' | 'In-Progress' | 'Cancelled';
  prescriptionId?: string;
  vitals?: {
    bloodPressure?: string;
    pulseRate?: string;
    temperature?: string;
    spO2?: string;
  };
}

export interface MedicalHistorySummary {
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  pastSurgeries: string[];
  familyHistory: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  height?: string;
  weight?: string;
}

export interface Patient {
  id: string;
  patientId: string; // e.g. "PAT-1021"
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  village: string;
  registrationDate: string;
  avatarUrl?: string;
  medicalHistory: MedicalHistorySummary;
}

export interface SymptomReport {
  id: string;
  patientId: string;
  rawText: string;
  summary: string;
  keywords: string[];
  urgencyTag: PriorityLevel;
  urgencyReason: string;
  suggestedSpecialization: string;
  createdAt: string;
}

export interface AvailableSlot {
  slotId: string;
  date: string; // YYYY-MM-DD
  dayLabel: string; // "Today", "Tomorrow", "Wed, 3 Sep"
  time: string; // "10:30 AM"
  specialization: string;
}

export interface Booking {
  id: string;
  tokenNumber: string; // "#T-114"
  meetingId: string; // random meeting id
  patientId: string;
  reportId: string;
  doctorName: string; // assigned by backend matching engine
  doctorSpecialization: string;
  doctorAvatar: string;
  slot: AvailableSlot;
  urgencyTag: PriorityLevel;
  status: BookingStatus;
  queuePosition?: number;
  bookedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'reminder' | 'prescription' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
