# 🏥 NabhaCare — Doctor Clinical Telemedicine Workstation

> **A high-resilience, offline-ready clinical workstation and teleconsultation platform built for rural healthcare delivery, district hospitals, and ASHA worker networks.**

---

## 🌟 Overview

**NabhaCare Doctor Workstation** empowers medical officers and specialists at district hubs (e.g., Civil Hospital Nabha) to conduct remote consultations, review multi-channel triage queues (ASHA tablets, USSD, mobile apps), inspect longitudinal patient EHR records, and generate digitally signed digital prescriptions with offline resilience.

---

## 🚀 Key Features

### 1. 📊 Smart Dashboard & Triage Command Center
- **Real-Time Clinical Metrics**: Instant metrics on waiting patients, urgent triage cases, consultations completed today, and average waiting times.
- **Visual Analytics**: Interactive priority distribution and wait-time distribution charts powered by Recharts.
- **Urgent Case Alerts**: Dynamic warning banners and priority alerts for critical rural patients requiring immediate medical attention.

### 2. ⏱️ Intelligent Patient Queue & Starvation Prevention
- **Multi-Level Priority Triage**: Color-coded categorization across **URGENT**, **MEDIUM**, and **LOW** clinical severity levels.
- **Starvation-Prevention Algorithm**: Automatically elevates priority flags for long-waiting low/medium patients to prevent queue starvation.
- **Multi-Channel Source Badging**: Identifies entry origins (**ASHA Worker**, **USSD**, **Mobile App**).
- **Search & Multi-Filter Controls**: Filter queue items by priority level, entry channel, consultation type, and patient search.

### 3. 🩺 Interactive Consultation Suite (Audio / Video / In-Person)
- **Live Video Consultation**: High-definition video simulation with camera/mic controls, connection quality status, and screen layout.
- **Low-Bandwidth Audio Mode**: Dedicated ultra-low bandwidth audio call mode optimized for 2G/3G rural networks.
- **Vitals Tracking**: Live vitals logging for Blood Pressure (BP), Pulse Rate, Temperature, and Blood Oxygen (SpO2).
- **Clinical Notes & Assessment**: Structured fields for Chief Complaint, Clinical Notes, Diagnosis/Assessment, and Dietary/Follow-up Advice.

### 4. 💊 Digital Prescription (Rx) Builder & PDF Generator
- **Structured Medication Prescribing**: Add medicines with dosage, frequency (e.g., 1-0-1 after food), duration, and specific patient instructions.
- **Quick-Fill Disease Templates**: One-click medicine templates for common primary care conditions:
  - Upper Respiratory Tract Infection (URTI)
  - Hypertension Management
  - Type 2 Diabetes Mellitus
  - Acute Gastroenteritis
- **Client-Side PDF Generation**: Produces formatted, government-compliant PDF prescriptions (`jspdf` + `jspdf-autotable`) complete with digital signature stamps, hospital metadata, and emergency instructions.

### 5. 📁 Longitudinal Patient EHR & Diagnostic Records
- **Patient Detail Dossier**: Demographics (age, gender, village), emergency contacts, blood group, chronic conditions, and allergy warnings.
- **Interactive Medical Timeline**: Chronological history of past visits, prior doctors, diagnoses, and treatments.
- **Diagnostic Reports Hub**: View, download, and categorize lab reports (Blood tests, X-Rays, ECGs, Clinical Summaries).
- **Longitudinal EHR Export**: Download complete consolidated patient health history as a single PDF.

### 6. 🌐 Offline-First Resilience & Sync Engine
- **Network Status Indicator**: Real-time network monitor (Online, Low Bandwidth, Offline).
- **Offline Sync Queue**: Automatically queues clinical notes, prescriptions, and consult completions locally when disconnected.
- **Auto-Sync Reconciliation**: Automatically synchronizes queued transactions when connectivity is restored with visual sync progress banners.

### 7. 🔔 Notifications & Doctor Status Management
- **Urgent Triage Push Feed**: Instant notification stream for new urgent patients, lab report arrivals, and sync updates.
- **Doctor Shift Controls**: Toggle between **Available**, **Busy**, and **Offline** statuses with working hours and registration verification.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Dev Server** | [Vite 8](https://vite.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Charts & Visualizations** | [Recharts](https://recharts.org/) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Linter & Code Quality** | [Oxlint](https://oxc.rs/) |

---

## 📂 Project Structure

```
Doctor/
├── public/                  # Static assets & SVG icons
├── src/
│   ├── assets/              # Logos and graphics
│   ├── components/          # Reusable clinical UI components
│   │   ├── ui/              # Badges, modals, toasts, stat cards, network indicators
│   │   ├── AudioPanel.tsx   # Low-bandwidth audio consultation interface
│   │   ├── VideoPanel.tsx   # Video teleconsultation interface
│   │   ├── ClinicalNotes.tsx# Structured clinical documentation panel
│   │   ├── PrescriptionBuilder.tsx # Drug dosage builder & quick templates
│   │   ├── PrescriptionPreview.tsx # Modal preview for Rx
│   │   ├── PrescriptionCard.tsx    # Card layout for prescriptions
│   │   ├── QueueTable.tsx   # Triage queue with priority sorting
│   │   ├── MedicalHistoryTimeline.tsx # Longitudinal history timeline
│   │   ├── ReportCard.tsx   # Diagnostic reports card viewer
│   │   ├── Header.tsx       # Top bar with doctor status & network indicator
│   │   └── Sidebar.tsx      # Navigation drawer
│   ├── context/
│   │   └── AppContext.tsx   # Global application, patient, queue, and offline state
│   ├── data/
│   │   └── mockData.ts      # Comprehensive mock patients, consultations & reports
│   ├── layouts/
│   │   └── AppShell.tsx     # Main layout wrapper with sidebar & offline banner
│   ├── pages/               # Application route views
│   │   ├── DashboardPage.tsx
│   │   ├── QueuePage.tsx
│   │   ├── PatientsListPage.tsx
│   │   ├── PatientDetailPage.tsx
│   │   ├── ConsultationPage.tsx
│   │   ├── PrescriptionsPage.tsx
│   │   ├── PrescriptionDetailPage.tsx
│   │   ├── NotificationsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── LoginPage.tsx
│   ├── services/
│   │   └── api.ts           # Mock API service layer with network delay simulation
│   ├── types/
│   │   └── index.ts         # TypeScript data contracts & clinical interfaces
│   ├── utils/
│   │   └── pdfGenerator.ts  # Client-side PDF generation for prescriptions & EHR
│   ├── App.tsx              # Application routing configuration
│   ├── index.css            # Tailwind CSS imports & theme styles
│   └── main.tsx             # Application bootstrap
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone -b Apurv https://github.com/Apurvasharma1001/NabhaCare.git
   cd NabhaCare
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run Linter:**
   ```bash
   npm run lint
   ```

---

## 👥 Branching & Collaboration Guidelines

- **`Main`**: Production / integration branch.
- **`Apurv`**: Active feature development branch.

```bash
# Checkout working branch
git checkout Apurv

# Pull latest updates from main
git pull origin Main

# Push changes to your branch
git push origin Apurv
```

---

## 📄 Compliance & Telemedicine Standards
Designed following guidelines inspired by the **Telemedicine Practice Guidelines (Ministry of Health and Family Welfare, Govt. of India)** and standard digital health data privacy norms.
