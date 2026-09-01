export type PriorityLevel = 'URGENT' | 'MEDIUM' | 'LOW';

export type EntryChannel = 'APP' | 'USSD' | 'ASHA';

export type DoctorStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE';

export type PatientQueueStatus = 'Waiting' | 'In Consultation' | 'Completed' | 'Cancelled';

export type ConsultationChannel = 'Audio' | 'Video' | 'In-Person';

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
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientVillage: string;
  doctorId: string;
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

export interface MedicalReport {
  id: string;
  patientId: string;
  name: string;
  type: 'PDF' | 'JPG' | 'PNG';
  uploadDate: string;
  source: 'Hospital Lab' | 'ASHA Worker' | 'Patient Upload' | 'Civil Hospital Nabha';
  size: string;
  category: 'Blood Test' | 'X-Ray' | 'ECG' | 'Prescription' | 'Clinical Summary' | 'General';
  summary?: string;
  fileUrl?: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  time: string;
  durationMinutes: number;
  symptoms: string[];
  chiefComplaint: string;
  clinicalNotes: string;
  assessment: string;
  advice: string;
  followUp: string;
  channel: ConsultationChannel;
  status: 'Completed' | 'In-Progress' | 'Draft';
  prescriptionId?: string;
  prescription?: Prescription;
  reportIds?: string[];
  vitals?: {
    bloodPressure?: string;
    pulseRate?: string;
    temperature?: string;
    spO2?: string;
  };
}

export interface MedicalHistorySummary {
  allergies: string[];
  chronicConditions: string[];
  bloodGroup: string;
  emergencyContact: string;
  pastSurgeries?: string[];
  familyHistory?: string[];
}

export interface Patient {
  id: string;
  patientId: string; // e.g. "PAT-1021"
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  village: string;
  registrationDate: string;
  avatarUrl?: string;
  
  // Current queue / token info
  tokenNumber: string; // e.g. "#121"
  priority: PriorityLevel;
  source: EntryChannel;
  arrivalTime: string;
  waitingMinutes: number;
  symptoms: string[];
  symptomDuration: string;
  triageRecommendation: string;
  triageReason: string;
  effectivePriority?: PriorityLevel;
  isStarvationAdjusted?: boolean;
  queueStatus: PatientQueueStatus;

  // Patient-reported & AI-generated intake data
  patientRawText?: string;   // Verbatim message/text sent by patient (SMS/app)
  aiSummary?: string;        // AI-refined clinical summary of patient's complaint
  
  // Longitudinal records
  medicalHistory: MedicalHistorySummary;
  consultationHistory: Consultation[];
  prescriptions: Prescription[];
  reports: MedicalReport[];
}

export interface Doctor {
  id: string;
  doctorId: string; // e.g. "DOC-1021"
  name: string;
  specialization: string;
  hospital: string;
  experienceYears: number;
  email: string;
  phone: string;
  workingHours: string;
  status: DoctorStatus;
  avatar: string;
  qualification: string;
  regNumber: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'waiting' | 'consultation' | 'sync' | 'connectivity' | 'system';
  timestamp: string;
  read: boolean;
  patientId?: string;
  tokenNumber?: string;
  actionUrl?: string;
}

export interface SyncItem {
  id: string;
  type: 'clinical_notes' | 'prescription' | 'patient_update' | 'consultation_complete';
  title: string;
  timestamp: string;
  status: 'pending' | 'syncing' | 'synced' | 'failed';
  details?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'consultation' | 'prescription' | 'urgent_patient' | 'sync' | 'queue';
  patientName?: string;
  patientId?: string;
}

export interface DashboardStats {
  patientsWaiting: number;
  urgentPatients: number;
  consultationsCompletedToday: number;
  averageWaitTimeMinutes: number;
  mediumPriority: number;
  lowPriority: number;
}
