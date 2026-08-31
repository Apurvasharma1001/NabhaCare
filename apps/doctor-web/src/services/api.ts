import type { Doctor, Patient, Consultation, Prescription, MedicalReport, DoctorStatus, SyncItem } from '../types';
import { initialPatients, mockCurrentDoctor } from '../data/mockData';

// Simulated delay helper for realistic clinical UI feel
const delay = (ms: number = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Doctor APIs
  async getDoctorProfile(): Promise<Doctor> {
    await delay();
    return mockCurrentDoctor;
  },

  async updateDoctorAvailability(status: DoctorStatus): Promise<{ success: boolean; status: DoctorStatus }> {
    await delay();
    return { success: true, status };
  },

  async updateDoctorProfile(doctor: Partial<Doctor>): Promise<Doctor> {
    await delay();
    return { ...mockCurrentDoctor, ...doctor };
  },

  // Queue & Patients APIs
  async getQueue(): Promise<Patient[]> {
    await delay();
    return initialPatients.filter((p) => p.queueStatus === 'Waiting' || p.queueStatus === 'In Consultation');
  },

  async getAllPatients(): Promise<Patient[]> {
    await delay();
    return initialPatients;
  },

  async getPatientById(id: string): Promise<Patient | undefined> {
    await delay();
    return initialPatients.find((p) => p.id === id || p.patientId === id);
  },

  async getPatientHistory(id: string): Promise<Consultation[]> {
    await delay();
    const patient = initialPatients.find((p) => p.id === id);
    return patient ? patient.consultationHistory : [];
  },

  async getPatientPrescriptions(id: string): Promise<Prescription[]> {
    await delay();
    const patient = initialPatients.find((p) => p.id === id);
    return patient ? patient.prescriptions : [];
  },

  async getPatientReports(id: string): Promise<MedicalReport[]> {
    await delay();
    const patient = initialPatients.find((p) => p.id === id);
    return patient ? patient.reports : [];
  },

  // Consultation Lifecycle APIs
  async saveConsultationDraft(data: Partial<Consultation>): Promise<{ success: boolean; id: string }> {
    await delay(50);
    return { success: true, id: data.id || `draft-${Date.now()}` };
  },

  async completeConsultation(payload: {
    patientId: string;
    consultation: Consultation;
    prescription?: Prescription;
  }): Promise<{ success: boolean; consultationId: string; prescriptionId?: string }> {
    await delay(300);
    return {
      success: true,
      consultationId: payload.consultation.id,
      prescriptionId: payload.prescription?.id,
    };
  },

  // Sync API
  async syncOfflineData(pendingItems: SyncItem[]): Promise<{ success: boolean; syncedCount: number }> {
    await delay(600);
    return { success: true, syncedCount: pendingItems.length };
  },
};
