import type {
  Patient,
  Consultation,
  Prescription,
  NotificationItem,
} from '../types';

export const mockCurrentPatient: Patient = {
  id: 'p1',
  patientId: 'PAT-1021',
  name: 'Simran Kaur',
  age: 34,
  gender: 'Female',
  phone: '+91 98765 43210',
  email: 'patient@example.com',
  village: 'Nabha, Punjab',
  registrationDate: '2025-11-02',
  avatarUrl: 'https://i.pravatar.cc/150?img=47',
  medicalHistory: {
    bloodGroup: 'B+',
    allergies: ['Penicillin'],
    chronicConditions: ['Type 2 Diabetes'],
    currentMedications: ['Metformin 500mg'],
    pastSurgeries: ['Appendectomy (2018)'],
    familyHistory: 'Father: Hypertension. Mother: Diabetes.',
    emergencyContactName: 'Harpreet Kaur (Sister)',
    emergencyContactPhone: '+91 98111 22233',
    height: '160 cm',
    weight: '68 kg',
  },
};

export const initialConsultations: Consultation[] = [
  {
    id: 'c1',
    patientId: 'p1',
    doctorName: 'Dr. Ramanpreet Singh',
    doctorSpecialization: 'General Medicine',
    date: '2026-08-18',
    time: '11:20 AM',
    durationMinutes: 14,
    chiefComplaint: 'Fever and body ache for 3 days',
    assessment: 'Viral fever, no signs of complication',
    advice: 'Rest, hydration, paracetamol as needed. Follow up if fever persists beyond 5 days.',
    followUp: '5 days if not improved',
    channel: 'Audio',
    status: 'Completed',
    prescriptionId: 'RX-2026-0118',
    vitals: { bloodPressure: '118/76', pulseRate: '88 bpm', temperature: '100.9°F', spO2: '98%' },
  },
  {
    id: 'c2',
    patientId: 'p1',
    doctorName: 'Dr. Anaya Kapoor',
    doctorSpecialization: 'Endocrinology',
    date: '2026-07-02',
    time: '4:00 PM',
    durationMinutes: 20,
    chiefComplaint: 'Routine diabetes follow-up',
    assessment: 'Blood sugar stable, HbA1c improving',
    advice: 'Continue Metformin 500mg. Maintain diet plan. Repeat HbA1c in 3 months.',
    followUp: '3 months',
    channel: 'Video',
    status: 'Completed',
    prescriptionId: 'RX-2026-0091',
    vitals: { bloodPressure: '124/80', pulseRate: '76 bpm' },
  },
];

export const initialPrescriptions: Prescription[] = [
  {
    id: 'RX-2026-0118',
    consultationId: 'c1',
    patientId: 'p1',
    doctorName: 'Dr. Ramanpreet Singh',
    doctorSpecialization: 'General Medicine',
    hospitalName: 'Civil Hospital Nabha',
    date: '2026-08-18',
    medicines: [
      { id: 'm1', name: 'Paracetamol 650mg', dosage: '1 tablet', frequency: 'Every 6-8 hrs if fever', duration: '3 days', instructions: 'After food' },
      { id: 'm2', name: 'ORS Sachets', dosage: '1 sachet in 1L water', frequency: 'As needed', duration: '3 days', instructions: 'For hydration' },
    ],
    instructions: 'Plenty of fluids, rest. Return if fever exceeds 102°F.',
    followUp: '5 days if not improved',
    status: 'Completed',
    createdAt: '2026-08-18',
  },
  {
    id: 'RX-2026-0091',
    consultationId: 'c2',
    patientId: 'p1',
    doctorName: 'Dr. Anaya Kapoor',
    doctorSpecialization: 'Endocrinology',
    hospitalName: 'Civil Hospital Nabha',
    date: '2026-07-02',
    medicines: [
      { id: 'm3', name: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '90 days', instructions: 'After breakfast and dinner' },
    ],
    instructions: 'Continue low-sugar diet. Monitor fasting glucose weekly.',
    followUp: '3 months',
    status: 'Active',
    createdAt: '2026-07-02',
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Appointment confirmed',
    message: 'Your consultation for tomorrow 10:30 AM has been confirmed. Token #T-114.',
    type: 'reminder',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/booking',
  },
  {
    id: 'n2',
    title: 'New prescription available',
    message: 'Dr. Ramanpreet Singh has issued a new prescription for you.',
    type: 'prescription',
    timestamp: '1 day ago',
    read: false,
    actionUrl: '/consultations',
  },
  {
    id: 'n3',
    title: 'System maintenance',
    message: 'Nabha Telemedicine will undergo brief maintenance tonight 2–3 AM.',
    type: 'system',
    timestamp: '2 days ago',
    read: true,
  },
];

// Keyword -> specialization matching table, mirrors the doctor-side triage logic
export const SPECIALIZATION_KEYWORDS: { specialization: string; keywords: string[] }[] = [
  { specialization: 'Cardiology', keywords: ['chest pain', 'heart', 'palpitation', 'breathless', 'chest tightness'] },
  { specialization: 'General Medicine', keywords: ['fever', 'cold', 'cough', 'body ache', 'weakness', 'headache'] },
  { specialization: 'Endocrinology', keywords: ['diabetes', 'sugar', 'thyroid', 'weight loss', 'weight gain'] },
  { specialization: 'Gastroenterology', keywords: ['stomach', 'vomiting', 'diarrhea', 'abdominal pain', 'nausea', 'acidity'] },
  { specialization: 'Orthopedics', keywords: ['joint pain', 'fracture', 'back pain', 'knee pain', 'swelling'] },
  { specialization: 'Dermatology', keywords: ['rash', 'skin', 'itching', 'allergy', 'acne'] },
  { specialization: 'Pediatrics', keywords: ['child', 'infant', 'baby'] },
  { specialization: 'Gynecology', keywords: ['pregnancy', 'menstrual', 'period pain'] },
];

// Urgent keywords that force URGENT tag regardless of other matches
export const URGENT_KEYWORDS = [
  'chest pain', 'can\'t breathe', 'unconscious', 'severe bleeding', 'stroke',
  'seizure', 'suicidal', 'poisoning', 'severe burn', 'breathless',
];

export const MEDIUM_KEYWORDS = [
  'fever', 'vomiting', 'diarrhea', 'infection', 'fracture', 'moderate pain',
];
