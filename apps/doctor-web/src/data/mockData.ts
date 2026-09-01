import type { Doctor, Patient, NotificationItem, SyncItem, ActivityItem } from '../types';

export const mockCurrentDoctor: Doctor = {
  id: 'doc-1',
  doctorId: 'DOC-1021',
  name: 'Dr. Raj Sharma',
  specialization: 'General Medicine',
  hospital: 'Civil Hospital Nabha',
  experienceYears: 12,
  email: 'doctor@example.com',
  phone: '+91 98765 43210',
  workingHours: '09:00 AM – 05:00 PM (IST)',
  status: 'AVAILABLE',
  avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  qualification: 'MBBS, MD (General Medicine) - AIIMS',
  regNumber: 'PB-MED-84920-A',
};

export const mockDoctors: Doctor[] = [
  mockCurrentDoctor,
  {
    id: 'doc-2',
    doctorId: 'DOC-1044',
    name: 'Dr. Ananya Mehta',
    specialization: 'General Physician',
    hospital: 'Nabha Community Health Center',
    experienceYears: 8,
    email: 'dr.ananya@nabhahealth.gov.in',
    phone: '+91 98765 11223',
    workingHours: '10:00 AM – 06:00 PM',
    status: 'AVAILABLE',
    avatar: 'https://images.unsplash.com/photo-1594824813637-450f757270e5?w=150&auto=format&fit=crop&q=80',
    qualification: 'MBBS, DNB (Family Medicine)',
    regNumber: 'PB-MED-92144-B',
  },
  {
    id: 'doc-3',
    doctorId: 'DOC-1088',
    name: 'Dr. Gurpreet Singh',
    specialization: 'Internal Medicine',
    hospital: 'Civil Hospital Nabha',
    experienceYears: 15,
    email: 'dr.gurpreet@nabhahealth.gov.in',
    phone: '+91 98765 99887',
    workingHours: '08:00 AM – 04:00 PM',
    status: 'BUSY',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    qualification: 'MBBS, MD (Internal Medicine)',
    regNumber: 'PB-MED-77182-A',
  },
  {
    id: 'doc-4',
    doctorId: 'DOC-1102',
    name: 'Dr. Priya Patel',
    specialization: 'Pulmonology & General Medicine',
    hospital: 'Nabha Sub-divisional Hospital',
    experienceYears: 10,
    email: 'dr.priya@nabhahealth.gov.in',
    phone: '+91 98765 33445',
    workingHours: '09:00 AM – 05:00 PM',
    status: 'OFFLINE',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    qualification: 'MBBS, MD (Respiratory Medicine)',
    regNumber: 'PB-MED-81930-P',
  },
  {
    id: 'doc-5',
    doctorId: 'DOC-1150',
    name: 'Dr. Vikram Verma',
    specialization: 'Emergency & Critical Care',
    hospital: 'Nabha Telemedicine Hub',
    experienceYears: 6,
    email: 'dr.vikram@nabhahealth.gov.in',
    phone: '+91 98765 66778',
    workingHours: '02:00 PM – 10:00 PM',
    status: 'AVAILABLE',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    qualification: 'MBBS, MEM (Emergency Medicine)',
    regNumber: 'PB-MED-99412-V',
  }
];

export const initialPatients: Patient[] = [
  // 1. Hero Patient: Ramesh Kumar
  {
    id: 'pat-1',
    patientId: 'PAT-1021',
    name: 'Ramesh Kumar',
    age: 52,
    gender: 'Male',
    phone: '+91 98142 88710',
    village: 'Nabha Rural',
    registrationDate: '12 Jan 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tokenNumber: '#121',
    priority: 'URGENT',
    source: 'APP',
    arrivalTime: '10:04 AM',
    waitingMinutes: 18,
    symptoms: ['Fever', 'Weakness', 'Persistent Cough', 'Mild Dyspnea'],
    symptomDuration: '3 days',
    patientRawText: 'Mujhe 3 din se tez bukhar hai, 102 degree. Bahut kamzori aa gayi hai aur khansi nahi ruk rahi. Thodi der chalne par saans fulne lagti hai. Diabetes ki dawai kha raha hun.',
    aiSummary: 'Patient reports high-grade fever (102°F) for 3 days accompanied by significant weakness and a persistent productive cough. Reports exertional breathlessness on minimal activity. Known diabetic currently on regular antidiabetic medication. Symptoms suggest possible lower respiratory tract infection with systemic involvement.',
    triageRecommendation: 'URGENT — Suspected Lower Respiratory Infection with Dehydration',
    triageReason: 'High fever (102.4°F) with productive cough and mild exertional breathlessness in 52M diabetic.',
    effectivePriority: 'URGENT',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['Penicillin (causes mild cutaneous erythema)'],
      chronicConditions: ['Type 2 Diabetes Mellitus (since 2021)', 'Primary Hypertension (controlled)'],
      bloodGroup: 'B+',
      emergencyContact: 'Sunita Kumar (Wife) — +91 98142 88711',
      pastSurgeries: ['Appendectomy (2014)'],
      familyHistory: ['Father had CAD / Myocardial Infarction at 65', 'Mother had Type 2 Diabetes']
    },
    reports: [
      {
        id: 'rep-1',
        patientId: 'pat-1',
        name: 'Complete_Blood_Count_CBC.pdf',
        type: 'PDF',
        uploadDate: '21 Aug 2026',
        source: 'Hospital Lab',
        size: '1.2 MB',
        category: 'Blood Test',
        summary: 'WBC elevated (13,400/mcL, 78% Neutrophils). Hb: 13.8 g/dL. Platelets normal (240k).'
      },
      {
        id: 'rep-2',
        patientId: 'pat-1',
        name: 'Chest_XRay_PA_View.png',
        type: 'PNG',
        uploadDate: '14 Jul 2026',
        source: 'Civil Hospital Nabha',
        size: '2.8 MB',
        category: 'X-Ray',
        summary: 'Bilateral mild bronchovascular markings. No focal consolidation or pleural effusion observed.'
      },
      {
        id: 'rep-3',
        patientId: 'pat-1',
        name: 'HbA1c_and_Lipid_Profile.pdf',
        type: 'PDF',
        uploadDate: '03 Jun 2026',
        source: 'ASHA Worker',
        size: '850 KB',
        category: 'Blood Test',
        summary: 'HbA1c: 7.2% (Moderate control). Fasting Blood Glucose: 138 mg/dL. Total Cholesterol: 192 mg/dL.'
      }
    ],
    consultationHistory: [
      {
        id: 'cons-101',
        patientId: 'pat-1',
        patientName: 'Ramesh Kumar',
        doctorId: 'doc-1',
        doctorName: 'Dr. Raj Sharma',
        doctorSpecialization: 'General Medicine',
        date: '2026-08-21',
        time: '11:15 AM',
        durationMinutes: 14,
        symptoms: ['Mild Fever', 'Generalized Body Fatigue'],
        chiefComplaint: 'Patient reported low-grade fever for 2 days with generalized body weakness.',
        clinicalNotes: 'Vitals stable (BP: 132/84 mmHg, HR: 82 bpm, SpO2: 98%). Throat mildly congested. Chest clear on auscultation. Advised hydration and antipyretics.',
        assessment: 'Viral upper respiratory prodrome in diabetic individual. Stable.',
        advice: 'Adequate oral hydration (3L/day), light khichdi diet, monitor morning fasting blood glucose.',
        followUp: 'Review in 5 days if fever persists >101°F.',
        channel: 'Audio',
        status: 'Completed',
        prescriptionId: 'RX-2026-0142',
        vitals: {
          bloodPressure: '132/84 mmHg',
          pulseRate: '82 bpm',
          temperature: '99.8°F',
          spO2: '98%'
        },
        prescription: {
          id: 'RX-2026-0142',
          consultationId: 'cons-101',
          patientId: 'pat-1',
          patientName: 'Ramesh Kumar',
          patientAge: 52,
          patientGender: 'Male',
          patientVillage: 'Nabha Rural',
          doctorId: 'doc-1',
          doctorName: 'Dr. Raj Sharma',
          doctorSpecialization: 'General Medicine',
          hospitalName: 'Civil Hospital Nabha',
          date: '2026-08-21',
          medicines: [
            {
              id: 'med-101',
              name: 'Tab. Paracetamol',
              dosage: '500 mg',
              frequency: 'Twice daily (1-0-1)',
              duration: '3 days',
              instructions: 'Take after meals for fever relief'
            },
            {
              id: 'med-102',
              name: 'Tab. Cetirizine',
              dosage: '10 mg',
              frequency: 'Once daily at bedtime (0-0-1)',
              duration: '5 days',
              instructions: 'May cause mild sedation; take at night'
            },
            {
              id: 'med-103',
              name: 'Electrolyte ORS Sachet',
              dosage: '1 sachet in 1L water',
              frequency: 'As needed',
              duration: '3 days',
              instructions: 'Sip throughout the day to prevent dehydration'
            }
          ],
          instructions: 'Take medicines strictly as prescribed. Do not skip anti-diabetic medications.',
          followUp: 'Return if fever spikes above 101°F or cough worsens.',
          doctorNotes: 'Keep monitoring blood glucose. Re-evaluate if weakness increases.',
          status: 'Completed',
          createdAt: '2026-08-21T11:30:00Z'
        }
      },
      {
        id: 'cons-102',
        patientId: 'pat-1',
        patientName: 'Ramesh Kumar',
        doctorId: 'doc-2',
        doctorName: 'Dr. Ananya Mehta',
        doctorSpecialization: 'General Physician',
        date: '2026-07-14',
        time: '02:40 PM',
        durationMinutes: 18,
        symptoms: ['Persistent Dry Cough', 'Throat Irritation'],
        chiefComplaint: 'Dry irritating cough for 1 week following harvest dust exposure.',
        clinicalNotes: 'Chest vesicular breathing without ronchi or wheeze. Advised cough suppressant and steam inhalation. Reviewed diabetic diet compliance.',
        assessment: 'Allergic tracheitis secondary to particulate dust exposure.',
        advice: 'Twice-daily steam inhalation, avoid cold drinks and direct dust exposure during field work.',
        followUp: 'Routine follow-up in 2 weeks.',
        channel: 'Audio',
        status: 'Completed',
        prescriptionId: 'RX-2026-0098',
        vitals: {
          bloodPressure: '128/80 mmHg',
          pulseRate: '76 bpm',
          temperature: '98.4°F',
          spO2: '99%'
        },
        prescription: {
          id: 'RX-2026-0098',
          consultationId: 'cons-102',
          patientId: 'pat-1',
          patientName: 'Ramesh Kumar',
          patientAge: 52,
          patientGender: 'Male',
          patientVillage: 'Nabha Rural',
          doctorId: 'doc-2',
          doctorName: 'Dr. Ananya Mehta',
          doctorSpecialization: 'General Physician',
          hospitalName: 'Nabha Community Health Center',
          date: '2026-07-14',
          medicines: [
            {
              id: 'med-201',
              name: 'Syr. Dextromethorphan + Chlorpheniramine',
              dosage: '10 ml',
              frequency: 'Three times daily (1-1-1)',
              duration: '5 days',
              instructions: 'Take after meals'
            },
            {
              id: 'med-202',
              name: 'Tab. Vitamin C (Ascorbic Acid)',
              dosage: '500 mg',
              frequency: 'Once daily (1-0-0)',
              duration: '10 days',
              instructions: 'Chewable tablet, take after breakfast'
            }
          ],
          instructions: 'Steam inhalation twice daily. Wear protective cloth mask during outdoor farming activities.',
          followUp: 'Contact ASHA worker if cough persists beyond 10 days.',
          doctorNotes: 'Advised ASHA Gurmeet Kaur to check fasting blood sugar during monthly visit.',
          status: 'Completed',
          createdAt: '2026-07-14T15:00:00Z'
        }
      },
      {
        id: 'cons-103',
        patientId: 'pat-1',
        patientName: 'Ramesh Kumar',
        doctorId: 'doc-1',
        doctorName: 'Dr. Raj Sharma',
        doctorSpecialization: 'General Medicine',
        date: '2026-06-03',
        time: '10:00 AM',
        durationMinutes: 20,
        symptoms: ['Routine Diabetes & BP Quarterly Review', 'Occasional Leg Cramps'],
        chiefComplaint: 'Quarterly chronic disease management review and refill.',
        clinicalNotes: 'BP 138/88 mmHg. Fasting glucose 138 mg/dL. Monofilament test normal bilateral feet. Peripheral pulses palpable.',
        assessment: 'Type 2 Diabetes Mellitus & Hypertension under fair control. Mild nocturnal calf cramps.',
        advice: 'Continue regular 30-min morning brisk walking. Reduce dietary sodium and refined carbs.',
        followUp: 'Repeat HbA1c and Serum Creatinine in 3 months.',
        channel: 'In-Person',
        status: 'Completed',
        prescriptionId: 'RX-2026-0044',
        vitals: {
          bloodPressure: '138/88 mmHg',
          pulseRate: '78 bpm',
          temperature: '98.6°F',
          spO2: '98%'
        },
        prescription: {
          id: 'RX-2026-0044',
          consultationId: 'cons-103',
          patientId: 'pat-1',
          patientName: 'Ramesh Kumar',
          patientAge: 52,
          patientGender: 'Male',
          patientVillage: 'Nabha Rural',
          doctorId: 'doc-1',
          doctorName: 'Dr. Raj Sharma',
          doctorSpecialization: 'General Medicine',
          hospitalName: 'Civil Hospital Nabha',
          date: '2026-06-03',
          medicines: [
            {
              id: 'med-301',
              name: 'Tab. Metformin HCl SR',
              dosage: '500 mg',
              frequency: 'Twice daily with meals (1-0-1)',
              duration: '90 days',
              instructions: 'Take immediately after breakfast and dinner'
            },
            {
              id: 'med-302',
              name: 'Tab. Telmisartan',
              dosage: '40 mg',
              frequency: 'Once daily morning (1-0-0)',
              duration: '90 days',
              instructions: 'Take in morning before breakfast'
            },
            {
              id: 'med-303',
              name: 'Tab. Calcium + Vitamin D3 + Magnesium',
              dosage: '500 mg / 400 IU',
              frequency: 'Once daily (0-1-0)',
              duration: '30 days',
              instructions: 'Take after lunch'
            }
          ],
          instructions: 'Maintain diabetic log. Inspect feet daily for cuts or ulcers.',
          followUp: 'Next chronic care clinic in September 2026.',
          doctorNotes: 'Long-term refill issued for 3 months under National NCD program.',
          status: 'Completed',
          createdAt: '2026-06-03T10:30:00Z'
        }
      }
    ],
    prescriptions: [
      {
        id: 'RX-2026-0142',
        consultationId: 'cons-101',
        patientId: 'pat-1',
        patientName: 'Ramesh Kumar',
        patientAge: 52,
        patientGender: 'Male',
        patientVillage: 'Nabha Rural',
        doctorId: 'doc-1',
        doctorName: 'Dr. Raj Sharma',
        doctorSpecialization: 'General Medicine',
        hospitalName: 'Civil Hospital Nabha',
        date: '2026-08-21',
        medicines: [
          {
            id: 'med-101',
            name: 'Tab. Paracetamol',
            dosage: '500 mg',
            frequency: 'Twice daily (1-0-1)',
            duration: '3 days',
            instructions: 'Take after meals for fever relief'
          },
          {
            id: 'med-102',
            name: 'Tab. Cetirizine',
            dosage: '10 mg',
            frequency: 'Once daily at bedtime (0-0-1)',
            duration: '5 days',
            instructions: 'May cause mild sedation; take at night'
          },
          {
            id: 'med-103',
            name: 'Electrolyte ORS Sachet',
            dosage: '1 sachet in 1L water',
            frequency: 'As needed',
            duration: '3 days',
            instructions: 'Sip throughout the day to prevent dehydration'
          }
        ],
        instructions: 'Take medicines strictly as prescribed. Do not skip anti-diabetic medications.',
        followUp: 'Return if fever spikes above 101°F or cough worsens.',
        doctorNotes: 'Keep monitoring blood glucose. Re-evaluate if weakness increases.',
        status: 'Completed',
        createdAt: '2026-08-21T11:30:00Z'
      },
      {
        id: 'RX-2026-0098',
        consultationId: 'cons-102',
        patientId: 'pat-1',
        patientName: 'Ramesh Kumar',
        patientAge: 52,
        patientGender: 'Male',
        patientVillage: 'Nabha Rural',
        doctorId: 'doc-2',
        doctorName: 'Dr. Ananya Mehta',
        doctorSpecialization: 'General Physician',
        hospitalName: 'Nabha Community Health Center',
        date: '2026-07-14',
        medicines: [
          {
            id: 'med-201',
            name: 'Syr. Dextromethorphan + Chlorpheniramine',
            dosage: '10 ml',
            frequency: 'Three times daily (1-1-1)',
            duration: '5 days',
            instructions: 'Take after meals'
          },
          {
            id: 'med-202',
            name: 'Tab. Vitamin C (Ascorbic Acid)',
            dosage: '500 mg',
            frequency: 'Once daily (1-0-0)',
            duration: '10 days',
            instructions: 'Chewable tablet, take after breakfast'
          }
        ],
        instructions: 'Steam inhalation twice daily. Wear protective cloth mask during outdoor farming activities.',
        followUp: 'Contact ASHA worker if cough persists beyond 10 days.',
        doctorNotes: 'Advised ASHA Gurmeet Kaur to check fasting blood sugar during monthly visit.',
        status: 'Completed',
        createdAt: '2026-07-14T15:00:00Z'
      },
      {
        id: 'RX-2026-0044',
        consultationId: 'cons-103',
        patientId: 'pat-1',
        patientName: 'Ramesh Kumar',
        patientAge: 52,
        patientGender: 'Male',
        patientVillage: 'Nabha Rural',
        doctorId: 'doc-1',
        doctorName: 'Dr. Raj Sharma',
        doctorSpecialization: 'General Medicine',
        hospitalName: 'Civil Hospital Nabha',
        date: '2026-06-03',
        medicines: [
          {
            id: 'med-301',
            name: 'Tab. Metformin HCl SR',
            dosage: '500 mg',
            frequency: 'Twice daily with meals (1-0-1)',
            duration: '90 days',
            instructions: 'Take immediately after breakfast and dinner'
          },
          {
            id: 'med-302',
            name: 'Tab. Telmisartan',
            dosage: '40 mg',
            frequency: 'Once daily morning (1-0-0)',
            duration: '90 days',
            instructions: 'Take in morning before breakfast'
          },
          {
            id: 'med-303',
            name: 'Tab. Calcium + Vitamin D3 + Magnesium',
            dosage: '500 mg / 400 IU',
            frequency: 'Once daily (0-1-0)',
            duration: '30 days',
            instructions: 'Take after lunch'
          }
        ],
        instructions: 'Maintain diabetic log. Inspect feet daily for cuts or ulcers.',
        followUp: 'Next chronic care clinic in September 2026.',
        doctorNotes: 'Long-term refill issued for 3 months under National NCD program.',
        status: 'Completed',
        createdAt: '2026-06-03T10:30:00Z'
      }
    ]
  },

  // 2. Sita Devi - URGENT
  {
    id: 'pat-2',
    patientId: 'PAT-1026',
    name: 'Sita Devi',
    age: 48,
    gender: 'Female',
    phone: '+91 98144 55432',
    village: 'Nabha Kalan',
    registrationDate: '04 Mar 2025',
    tokenNumber: '#126',
    priority: 'URGENT',
    source: 'USSD',
    arrivalTime: '10:08 AM',
    waitingMinutes: 14,
    symptoms: ['Chest Discomfort', 'Shortness of Breath', 'Palpitations'],
    symptomDuration: '4 hours',
    patientRawText: 'Seene mein bhari bhari si feeling ho rahi hai 4 ghante se. Saans lene mein takleef hai aur dil tez dhadak raha hai. Thoda pasinaaa bhi aa raha tha pehle.',
    aiSummary: 'Patient reports retrosternal heaviness with associated shortness of breath and palpitations lasting 4 hours. History of diaphoresis at onset. Known hypertensive and hypothyroid on medication. Symptoms are suspicious for an acute cardiac event and require urgent ECG evaluation.',
    triageRecommendation: 'URGENT — Acute Anginal Episode / Cardiac Evaluation Required',
    triageReason: 'Retrosternal heaviness radiating to left shoulder with diaphoresis reported via USSD.',
    effectivePriority: 'URGENT',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['Sulfa drugs'],
      chronicConditions: ['Stage 1 Hypertension', 'Hypothyroidism'],
      bloodGroup: 'O+',
      emergencyContact: 'Rajesh Kumar (Son) — +91 98144 55430'
    },
    reports: [
      {
        id: 'rep-201',
        patientId: 'pat-2',
        name: 'Resting_12_Lead_ECG.pdf',
        type: 'PDF',
        uploadDate: '15 May 2026',
        source: 'Civil Hospital Nabha',
        size: '1.5 MB',
        category: 'ECG',
        summary: 'Normal sinus rhythm, HR 74 bpm. No ST elevation/depression noted.'
      }
    ],
    consultationHistory: [
      {
        id: 'cons-201',
        patientId: 'pat-2',
        patientName: 'Sita Devi',
        doctorId: 'doc-3',
        doctorName: 'Dr. Gurpreet Singh',
        doctorSpecialization: 'Internal Medicine',
        date: '2026-05-15',
        time: '03:10 PM',
        durationMinutes: 15,
        symptoms: ['Mild Chest Pain on Exertion'],
        chiefComplaint: 'Episodic chest tightness while carrying water pots.',
        clinicalNotes: 'ECG ordered, thyroid levels reviewed. Advised lifestyle modifications.',
        assessment: 'Atypical chest discomfort, rule out ischemic origin.',
        advice: 'Avoid sudden heavy lifting, continue Thyroxine 50 mcg regularly.',
        followUp: 'Immediate reporting if pain lasts > 15 mins.',
        channel: 'Audio',
        status: 'Completed'
      }
    ],
    prescriptions: [
      {
        id: 'RX-2026-0062',
        patientId: 'pat-2',
        patientName: 'Sita Devi',
        patientAge: 48,
        patientGender: 'Female',
        patientVillage: 'Nabha Kalan',
        doctorId: 'doc-3',
        doctorName: 'Dr. Gurpreet Singh',
        doctorSpecialization: 'Internal Medicine',
        hospitalName: 'Civil Hospital Nabha',
        date: '2026-05-15',
        medicines: [
          {
            id: 'med-211',
            name: 'Tab. Levothyroxine Sodium',
            dosage: '50 mcg',
            frequency: 'Once daily empty stomach (1-0-0)',
            duration: '90 days',
            instructions: 'Take 30 minutes before morning tea'
          }
        ],
        instructions: 'Take on empty stomach with plain water.',
        followUp: 'Check TSH after 3 months.',
        status: 'Completed',
        createdAt: '2026-05-15T15:30:00Z'
      }
    ]
  },

  // 3. Balwinder Singh - URGENT
  {
    id: 'pat-3',
    patientId: 'PAT-1015',
    name: 'Balwinder Singh',
    age: 61,
    gender: 'Male',
    phone: '+91 98146 11299',
    village: 'Alhoran',
    registrationDate: '19 Feb 2025',
    tokenNumber: '#115',
    priority: 'URGENT',
    source: 'APP',
    arrivalTime: '10:00 AM',
    waitingMinutes: 22,
    symptoms: ['Acute Abdominal Pain', 'Vomiting', 'High Fever'],
    symptomDuration: '12 hours',
    patientRawText: 'Raat se pet mein bahut tez dard ho raha hai, neeche daahini taraf. 4 baar ulti ho chuki hai. Bukhar bhi chadh gaya hai. Kuch kha nahi pa raha.',
    aiSummary: 'Patient reports acute onset severe right lower quadrant abdominal pain for 12 hours with multiple episodes of vomiting and high fever. Unable to tolerate oral intake. History of Type 2 Diabetes. Clinical picture raises concern for acute surgical abdomen — appendicitis or cholecystitis must be ruled out urgently.',
    triageRecommendation: 'URGENT — Acute Surgical Abdomen / Appendicitis or Cholecystitis',
    triageReason: 'Severe right lower quadrant guarding with repeated bilious vomiting.',
    effectivePriority: 'URGENT',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['None known'],
      chronicConditions: ['Type 2 Diabetes'],
      bloodGroup: 'A+',
      emergencyContact: 'Gurpreet Singh (Son) — +91 98146 11290'
    },
    reports: [
      {
        id: 'rep-301',
        patientId: 'pat-3',
        name: 'Abdominal_Ultrasound_USG.pdf',
        type: 'PDF',
        uploadDate: '10 Jan 2026',
        source: 'Hospital Lab',
        size: '2.1 MB',
        category: 'General',
        summary: 'Mild fatty liver grade 1. Gallbladder wall unremarkable at baseline.'
      }
    ],
    consultationHistory: [],
    prescriptions: []
  },

  // 4. Mohan Singh - MEDIUM
  {
    id: 'pat-4',
    patientId: 'PAT-1019',
    name: 'Mohan Singh',
    age: 39,
    gender: 'Male',
    phone: '+91 98140 44332',
    village: 'Rohti Chhanna',
    registrationDate: '02 Apr 2025',
    tokenNumber: '#119',
    priority: 'MEDIUM',
    source: 'ASHA',
    arrivalTime: '10:11 AM',
    waitingMinutes: 11,
    symptoms: ['Productive Cough', 'Low Grade Fever', 'Nocturnal Wheeze'],
    symptomDuration: '5 days',
    patientRawText: '5 din se khansi ho rahi hai balgam ke saath. Raat ko saans mein seeti aati hai. Thoda bukhar bhi hai. Inhaler zyada use karna pad raha hai pichle 2 din se.',
    aiSummary: 'Known asthmatic patient reporting 5-day history of productive cough, low-grade fever, and nocturnal wheeze with increased reliever inhaler use over past 48 hours. Symptom pattern is consistent with acute bronchitis overlaying bronchial asthma exacerbation.',
    triageRecommendation: 'MEDIUM — Acute Bronchitis / Asthma Exacerbation',
    triageReason: 'Known asthmatic with increasing inhaler usage over past 48 hours.',
    effectivePriority: 'MEDIUM',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['Dust mites', 'Pollen'],
      chronicConditions: ['Bronchial Asthma (since childhood)'],
      bloodGroup: 'AB+',
      emergencyContact: 'Kuldeep Kaur (Sister) — +91 98140 44330'
    },
    reports: [
      {
        id: 'rep-401',
        patientId: 'pat-4',
        name: 'Spirometry_PFT_Report.pdf',
        type: 'PDF',
        uploadDate: '18 Apr 2026',
        source: 'Civil Hospital Nabha',
        size: '1.1 MB',
        category: 'Clinical Summary',
        summary: 'FEV1/FVC ratio 68%, reversibility positive with salbutamol nebulization.'
      }
    ],
    consultationHistory: [
      {
        id: 'cons-401',
        patientId: 'pat-4',
        patientName: 'Mohan Singh',
        doctorId: 'doc-4',
        doctorName: 'Dr. Priya Patel',
        doctorSpecialization: 'Pulmonology & General Medicine',
        date: '2026-04-18',
        time: '11:45 AM',
        durationMinutes: 12,
        symptoms: ['Seasonal Asthma Flare'],
        chiefComplaint: 'Wheezing triggered by grain dust harvesting.',
        clinicalNotes: 'Bilateral expiratory wheezing. Inhaler technique demonstrated.',
        assessment: 'Moderate persistent asthma exacerbation.',
        advice: 'Continue Budesonide-Formoterol inhaler 2 puffs BID.',
        followUp: 'Check peak flow meter readings daily.',
        channel: 'Audio',
        status: 'Completed'
      }
    ],
    prescriptions: [
      {
        id: 'RX-2026-0038',
        patientId: 'pat-4',
        patientName: 'Mohan Singh',
        patientAge: 39,
        patientGender: 'Male',
        patientVillage: 'Rohti Chhanna',
        doctorId: 'doc-4',
        doctorName: 'Dr. Priya Patel',
        doctorSpecialization: 'Pulmonology & General Medicine',
        hospitalName: 'Nabha Sub-divisional Hospital',
        date: '2026-04-18',
        medicines: [
          {
            id: 'med-401',
            name: 'Inhaler Budesonide + Formoterol (200/6 mcg)',
            dosage: '2 puffs',
            frequency: 'Twice daily with spacer (1-0-1)',
            duration: '60 days',
            instructions: 'Rinse mouth with water thoroughly after inhalation'
          }
        ],
        instructions: 'Use spacer attachment for proper lung deposition.',
        followUp: 'Review in 2 months.',
        status: 'Completed',
        createdAt: '2026-04-18T12:00:00Z'
      }
    ]
  },

  // 5. Geeta Devi - MEDIUM
  {
    id: 'pat-5',
    patientId: 'PAT-1025',
    name: 'Geeta Devi',
    age: 34,
    gender: 'Female',
    phone: '+91 98141 77654',
    village: 'Dulladi',
    registrationDate: '15 May 2025',
    tokenNumber: '#125',
    priority: 'MEDIUM',
    source: 'APP',
    arrivalTime: '10:15 AM',
    waitingMinutes: 7,
    symptoms: ['Persistent Throbbing Headache', 'Blurred Vision', 'Nausea'],
    symptomDuration: '2 days',
    patientRawText: '2 din se sar mein tez dard hai, ek taraf zyada. Aankhon ke aage andhera sa lagta hai aur ulti jaisi feeling aa rahi hai. Tej roshni se zyada dard hota hai.',
    aiSummary: 'Patient reports 2-day history of unilateral throbbing headache with associated photophobia and nausea. Reports transient blurring of vision. Known migraineur. Blood pressure evaluation needed to rule out hypertensive headache. Presentation is consistent with migraine with aura exacerbation.',
    triageRecommendation: 'MEDIUM — Migraine without aura / Tension Cephalea',
    triageReason: 'Unilateral pulsating headache with photophobia and nausea; BP check required.',
    effectivePriority: 'MEDIUM',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['NSAIDs (causes mild dyspepsia)'],
      chronicConditions: ['Migraine with aura'],
      bloodGroup: 'O-',
      emergencyContact: 'Hardev Singh (Husband) — +91 98141 77650'
    },
    reports: [],
    consultationHistory: [],
    prescriptions: []
  },

  // 6. Manpreet Singh - MEDIUM
  {
    id: 'pat-6',
    patientId: 'PAT-1027',
    name: 'Manpreet Singh',
    age: 28,
    gender: 'Male',
    phone: '+91 98149 33211',
    village: 'Bhore',
    registrationDate: '20 Jun 2025',
    tokenNumber: '#127',
    priority: 'MEDIUM',
    source: 'APP',
    arrivalTime: '10:13 AM',
    waitingMinutes: 9,
    symptoms: ['Joint Pain & Swelling in Knees', 'Morning Stiffness'],
    symptomDuration: '2 weeks',
    patientRawText: '2 hafto se ghutno mein dard aur sujan aa gayi hai. Subah uthne ke baad zyada takleef hoti hai aur chalchalna mushkil hota hai. Pehle pet kharab tha phir ye shuru hua.',
    aiSummary: 'Patient reports 2-week history of bilateral knee joint pain and swelling with significant morning stiffness. Symptoms followed a recent gastrointestinal illness. Pattern suggests reactive arthritis or early inflammatory polyarthropathy. ESR, CRP and rheumatoid factor evaluation recommended.',
    triageRecommendation: 'MEDIUM — Inflammatory Polyarthropathy / Reactive Arthritis',
    triageReason: 'Bilateral knee joint warmth and swelling following recent gastrointestinal episode.',
    effectivePriority: 'MEDIUM',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['None known'],
      chronicConditions: ['None'],
      bloodGroup: 'B+',
      emergencyContact: 'Simranjit Kaur (Wife) — +91 98149 33210'
    },
    reports: [],
    consultationHistory: [],
    prescriptions: []
  },

  // 7. Raj Kumar - LOW
  {
    id: 'pat-7',
    patientId: 'PAT-1028',
    name: 'Raj Kumar',
    age: 22,
    gender: 'Male',
    phone: '+91 98143 66554',
    village: 'Nabha Ward 4',
    registrationDate: '10 Jul 2025',
    tokenNumber: '#128',
    priority: 'LOW',
    source: 'ASHA',
    arrivalTime: '10:18 AM',
    waitingMinutes: 4,
    symptoms: ['Common Cold', 'Runny Nose', 'Sneezing'],
    symptomDuration: '1 day',
    patientRawText: 'Kal se naak beh rahi hai aur chheenk aa rahi hain. Gala thoda kharkhara hai. Koi bukhar nahi hai. Bas bahut naak band ho gayi hai.',
    aiSummary: 'Patient reports 1-day history of acute rhinorrhea, sneezing, and nasal congestion with mild throat irritation. No fever or systemic symptoms reported. Consistent with acute viral rhinitis. No high-risk features noted.',
    triageRecommendation: 'LOW — Acute Viral Rhinitis',
    triageReason: 'Mild upper airway symptoms without fever, respiratory distress, or comorbidities.',
    effectivePriority: 'LOW',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['None known'],
      chronicConditions: ['None'],
      bloodGroup: 'A+',
      emergencyContact: 'Vijay Kumar (Father) — +91 98143 66550'
    },
    reports: [],
    consultationHistory: [],
    prescriptions: []
  },

  // 8. Harpreet Kaur - LOW but STARVATION ADJUSTED!
  {
    id: 'pat-8',
    patientId: 'PAT-1012',
    name: 'Harpreet Kaur',
    age: 45,
    gender: 'Female',
    phone: '+91 98145 99881',
    village: 'Chhanna',
    registrationDate: '18 Aug 2025',
    tokenNumber: '#112',
    priority: 'LOW',
    source: 'APP',
    arrivalTime: '09:40 AM',
    waitingMinutes: 42,
    symptoms: ['Mild Skin Itching', 'Dry Patches on Forearm'],
    symptomDuration: '1 week',
    patientRawText: 'Ek hafte se baazu par kharish ho rahi hai aur chamdi sukh gayi hai, patches pad gaye hain. Raat ko zyada jalan hoti hai. Koi naya sabun ya kapda nahi badla.',
    aiSummary: 'Patient reports 1-week history of localised pruritus and dry skin patches on forearms, worse at night. No change in detergent, soap, or clothing reported. No systemic symptoms. Likely contact dermatitis or xerotic eczema. Nickel allergy documented in history.',
    triageRecommendation: 'LOW — Mild Contact Dermatitis / Xerosis',
    triageReason: 'Localized dermatological dryness. Starvation prevention rule elevated effective queue priority due to >40m wait.',
    effectivePriority: 'MEDIUM',
    isStarvationAdjusted: true,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['Nickel jewelry'],
      chronicConditions: ['None'],
      bloodGroup: 'O+',
      emergencyContact: 'Jagjit Singh (Husband) — +91 98145 99880'
    },
    reports: [],
    consultationHistory: [],
    prescriptions: []
  },

  // 9. Sunita Devi - LOW
  {
    id: 'pat-9',
    patientId: 'PAT-1030',
    name: 'Sunita Devi',
    age: 29,
    gender: 'Female',
    phone: '+91 98147 22334',
    village: 'Kakrala',
    registrationDate: '24 Aug 2025',
    tokenNumber: '#130',
    priority: 'LOW',
    source: 'USSD',
    arrivalTime: '10:19 AM',
    waitingMinutes: 3,
    symptoms: ['Mild Lower Back Stiffness', 'Muscle Soreness'],
    symptomDuration: '3 days',
    patientRawText: '3 din se kamar mein dard aur akadahat hai. Khet mein kaam karne ke baad shuru hua. Seendhna mushkil ho raha hai. Koi naya dard ya pair mein jhunjhunahat nahi.',
    aiSummary: 'Patient reports 3-day history of lower back stiffness and diffuse muscular soreness following intensive farm harvesting work. No radicular symptoms, neurological signs, or bowel/bladder involvement reported. Consistent with postural musculoskeletal strain.',
    triageRecommendation: 'LOW — Postural Musculoskeletal Strain',
    triageReason: 'Muscular tenderness after farm harvesting work. No neurological red flags.',
    effectivePriority: 'LOW',
    isStarvationAdjusted: false,
    queueStatus: 'Waiting',
    medicalHistory: {
      allergies: ['None known'],
      chronicConditions: ['None'],
      bloodGroup: 'A-',
      emergencyContact: 'Aman Deep (Brother) — +91 98147 22330'
    },
    reports: [],
    consultationHistory: [],
    prescriptions: []
  },

  // 10. Kamla Devi - COMPLETED EARLIER TODAY
  {
    id: 'pat-10',
    patientId: 'PAT-1008',
    name: 'Kamla Devi',
    age: 68,
    gender: 'Female',
    phone: '+91 98148 00998',
    village: 'Nabha Rural',
    registrationDate: '01 Jan 2025',
    tokenNumber: '#108',
    priority: 'MEDIUM',
    source: 'ASHA',
    arrivalTime: '09:15 AM',
    waitingMinutes: 0,
    symptoms: ['Osteoarthritis Knee Pain', 'Hypertension Refill'],
    symptomDuration: 'Chronic',
    patientRawText: 'Ghutno mein dard zyada ho gaya hai. Dawai bhi khatam hone wali hai BP ki. ASHA behan ne bheja hai check-up ke liye aaj.',
    aiSummary: 'Elderly patient with known bilateral knee osteoarthritis and hypertension presenting for routine follow-up and medication refill. Reports increased knee pain. Referred by ASHA worker for periodic chronic disease review and blood pressure assessment.',
    triageRecommendation: 'MEDIUM — Chronic Care Follow-up',
    triageReason: 'Senior citizen knee pain management and routine blood pressure evaluation.',
    effectivePriority: 'MEDIUM',
    isStarvationAdjusted: false,
    queueStatus: 'Completed',
    medicalHistory: {
      allergies: ['Ciprofloxacin'],
      chronicConditions: ['Bilateral Knee Osteoarthritis', 'Hypertension'],
      bloodGroup: 'B+',
      emergencyContact: 'Sarabjit Singh (Son) — +91 98148 00990'
    },
    reports: [],
    consultationHistory: [
      {
        id: 'cons-1008',
        patientId: 'pat-10',
        patientName: 'Kamla Devi',
        doctorId: 'doc-1',
        doctorName: 'Dr. Raj Sharma',
        doctorSpecialization: 'General Medicine',
        date: '2026-08-29',
        time: '09:30 AM',
        durationMinutes: 16,
        symptoms: ['Knee Pain', 'BP Check'],
        chiefComplaint: 'Bilateral knee stiffness and routine medication review.',
        clinicalNotes: 'BP 130/82 mmHg. Crepitus bilateral knees. Quadriceps strengthening advised.',
        assessment: 'Grade 2 Knee Osteoarthritis + Well-controlled Hypertension.',
        advice: 'Hot fomentation twice daily. Avoid squatting on floor.',
        followUp: 'Review in 1 month.',
        channel: 'Audio',
        status: 'Completed',
        prescriptionId: 'RX-2026-0201'
      }
    ],
    prescriptions: [
      {
        id: 'RX-2026-0201',
        consultationId: 'cons-1008',
        patientId: 'pat-10',
        patientName: 'Kamla Devi',
        patientAge: 68,
        patientGender: 'Female',
        patientVillage: 'Nabha Rural',
        doctorId: 'doc-1',
        doctorName: 'Dr. Raj Sharma',
        doctorSpecialization: 'General Medicine',
        hospitalName: 'Civil Hospital Nabha',
        date: '2026-08-29',
        medicines: [
          {
            id: 'med-501',
            name: 'Tab. Amlodipine Besylate',
            dosage: '5 mg',
            frequency: 'Once daily morning (1-0-0)',
            duration: '30 days',
            instructions: 'Take after breakfast'
          },
          {
            id: 'med-502',
            name: 'Diclofenac Diethylamine Topical Gel',
            dosage: 'Apply thin layer',
            frequency: 'Twice daily on knees',
            duration: '15 days',
            instructions: 'Gently massage until absorbed'
          }
        ],
        instructions: 'Continue knee exercises regularly.',
        followUp: 'Review in 4 weeks.',
        status: 'Completed',
        createdAt: '2026-08-29T09:45:00Z'
      }
    ]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Urgent Patient Arrived',
    message: 'Patient #121 (Ramesh Kumar, 52M) triaged as URGENT (Fever 102.4°F, Chest symptoms).',
    type: 'urgent',
    timestamp: '10:04 AM',
    read: false,
    patientId: 'pat-1',
    tokenNumber: '#121',
    actionUrl: '/patients/pat-1'
  },
  {
    id: 'notif-2',
    title: 'Urgent Cardiac Symptom Alert',
    message: 'Patient #126 (Sita Devi, 48F) entered via USSD with reported retrosternal discomfort.',
    type: 'urgent',
    timestamp: '10:08 AM',
    read: false,
    patientId: 'pat-2',
    tokenNumber: '#126',
    actionUrl: '/patients/pat-2'
  },
  {
    id: 'notif-3',
    title: 'Queue Starvation Warning',
    message: 'Patient #112 (Harpreet Kaur) has reached 40+ minutes wait time. Queue position adjusted.',
    type: 'waiting',
    timestamp: '10:20 AM',
    read: true,
    patientId: 'pat-8',
    tokenNumber: '#112',
    actionUrl: '/patients/pat-8'
  },
  {
    id: 'notif-4',
    title: 'Prescription Records Synchronized',
    message: '3 prescription records successfully synchronized with Nabha Central Health Registry.',
    type: 'sync',
    timestamp: '09:50 AM',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Morning Shift Initialized',
    message: 'Welcome Dr. Sharma. Nabha Telemedicine queue active with 8 waiting rural consultations.',
    type: 'system',
    timestamp: '09:00 AM',
    read: true
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'New Urgent Patient in Queue',
    description: 'Ramesh Kumar (#121) registered via Smartphone App with fever & weakness.',
    timestamp: '10:04 AM',
    type: 'urgent_patient',
    patientName: 'Ramesh Kumar',
    patientId: 'pat-1'
  },
  {
    id: 'act-2',
    title: 'New Urgent Patient in Queue',
    description: 'Sita Devi (#126) entered via USSD with chest discomfort.',
    timestamp: '10:08 AM',
    type: 'urgent_patient',
    patientName: 'Sita Devi',
    patientId: 'pat-2'
  },
  {
    id: 'act-3',
    title: 'Consultation Completed',
    description: 'Completed chronic care consultation for Kamla Devi (#108). Prescription issued.',
    timestamp: '09:46 AM',
    type: 'consultation',
    patientName: 'Kamla Devi',
    patientId: 'pat-10'
  },
  {
    id: 'act-4',
    title: 'Prescription Issued',
    description: 'Prescription #RX-2026-0201 dispatched via SMS/ASHA gateway to Kamla Devi.',
    timestamp: '09:48 AM',
    type: 'prescription',
    patientName: 'Kamla Devi',
    patientId: 'pat-10'
  },
  {
    id: 'act-5',
    title: 'Patient Record Synchronized',
    description: 'Local clinical cache synchronized with District Hospital EHR server.',
    timestamp: '09:50 AM',
    type: 'sync'
  }
];

export const initialSyncItems: SyncItem[] = [
  {
    id: 'sync-1',
    type: 'clinical_notes',
    title: 'Clinical notes draft (Ramesh Kumar)',
    timestamp: '10:05 AM',
    status: 'synced',
    details: 'Initial triage notes mirrored locally'
  },
  {
    id: 'sync-2',
    type: 'prescription',
    title: 'Prescription #RX-2026-0201 (Kamla Devi)',
    timestamp: '09:48 AM',
    status: 'synced',
    details: 'Dispatched to ASHA worker tablet'
  },
  {
    id: 'sync-3',
    type: 'consultation_complete',
    title: 'Consultation record #cons-1008',
    timestamp: '09:46 AM',
    status: 'synced',
    details: 'Archived to permanent history'
  }
];
