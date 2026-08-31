# 🏥 NabhaCare — Rural Telemedicine Platform

> **A high-resilience, offline-ready telemedicine platform built for rural healthcare delivery, district hospitals, and ASHA worker networks — connecting patients to doctors via App, SMS, and IVR channels.**

---

## 🌟 Overview

**NabhaCare** is a multi-channel telemedicine platform designed for rural healthcare access. It gives medical officers and specialists at district hubs (e.g., Civil Hospital Nabha) a clinical workstation to conduct remote consultations, review multi-channel triage queues, inspect longitudinal patient EHR records, and generate digitally signed prescriptions — all with offline resilience.

On the patient side, NabhaCare meets patients where they are: a full-featured mobile/web **App** for smartphone users, an **SMS** channel for basic feature phones, and an **IVR (voice call)** channel for patients with no data connectivity at all — all backed by the same shared AI triage and session logic.

This repository is structured as a **monorepo**, cleanly separating the **Doctor workstation**, the three **Patient-facing entry points**, shared **backend services**, and shared **packages** used across the platform.

---

## 🚀 Key Features

### Doctor Workstation (`apps/doctor-web`)

#### 1. 📊 Smart Dashboard & Triage Command Center
- **Real-Time Clinical Metrics**: Instant metrics on waiting patients, urgent triage cases, consultations completed today, and average waiting times.
- **Visual Analytics**: Interactive priority distribution and wait-time distribution charts powered by Recharts.
- **Urgent Case Alerts**: Dynamic warning banners and priority alerts for critical rural patients requiring immediate medical attention.

#### 2. ⏱️ Intelligent Patient Queue & Starvation Prevention
- **Multi-Level Priority Triage**: Color-coded categorization across **URGENT**, **MEDIUM**, and **LOW** clinical severity levels.
- **Starvation-Prevention Algorithm**: Automatically elevates priority flags for long-waiting low/medium patients to prevent queue starvation.
- **Multi-Channel Source Badging**: Identifies entry origins (**App**, **SMS**, **IVR**, **ASHA Worker**).
- **Search & Multi-Filter Controls**: Filter queue items by priority level, entry channel, consultation type, and patient search.

#### 3. 🩺 Interactive Consultation Suite (Audio / Video / In-Person)
- **Live Video Consultation**: High-definition video simulation with camera/mic controls, connection quality status, and screen layout.
- **Low-Bandwidth Audio Mode**: Dedicated ultra-low bandwidth audio call mode optimized for 2G/3G rural networks.
- **Vitals Tracking**: Live vitals logging for Blood Pressure (BP), Pulse Rate, Temperature, and Blood Oxygen (SpO2).
- **Clinical Notes & Assessment**: Structured fields for Chief Complaint, Clinical Notes, Diagnosis/Assessment, and Dietary/Follow-up Advice.

#### 4. 💊 Digital Prescription (Rx) Builder & PDF Generator
- **Structured Medication Prescribing**: Add medicines with dosage, frequency (e.g., 1-0-1 after food), duration, and specific patient instructions.
- **Quick-Fill Disease Templates**: One-click medicine templates for common primary care conditions (URTI, Hypertension, Type 2 Diabetes, Acute Gastroenteritis).
- **Client-Side PDF Generation**: Produces formatted, government-compliant PDF prescriptions (`jspdf` + `jspdf-autotable`) complete with digital signature stamps, hospital metadata, and emergency instructions.

#### 5. 📁 Longitudinal Patient EHR & Diagnostic Records
- **Patient Detail Dossier**: Demographics, emergency contacts, blood group, chronic conditions, and allergy warnings.
- **Interactive Medical Timeline**: Chronological history of past visits, prior doctors, diagnoses, and treatments.
- **Diagnostic Reports Hub**: View, download, and categorize lab reports (Blood tests, X-Rays, ECGs, Clinical Summaries).
- **Longitudinal EHR Export**: Download complete consolidated patient health history as a single PDF.

#### 6. 🌐 Offline-First Resilience & Sync Engine
- **Network Status Indicator**: Real-time network monitor (Online, Low Bandwidth, Offline).
- **Offline Sync Queue**: Automatically queues clinical notes, prescriptions, and consult completions locally when disconnected.
- **Auto-Sync Reconciliation**: Automatically synchronizes queued transactions when connectivity is restored with visual sync progress banners.

#### 7. 🔔 Notifications & Doctor Status Management
- **Urgent Triage Push Feed**: Instant notification stream for new urgent patients, lab report arrivals, and sync updates.
- **Doctor Shift Controls**: Toggle between **Available**, **Busy**, and **Offline** statuses with working hours and registration verification.

### Patient Access (`apps/patient-landing`, `apps/patient-web`, and backend channel services)

- **Patient Landing (`patient-landing`)**: The entry screen where a patient chooses how they want to connect — App, SMS, or IVR.
- **Patient App (`patient-web`)**: Full mobile/web experience for smartphone users with data access.
- **SMS Channel (`services/sms-gateway`)**: Text-based triage and consultation booking for basic feature phones — no app or data plan required.
- **IVR Channel (`services/ivr-gateway`)**: Voice-call-based triage using speech-to-text/text-to-speech, for patients with no internet access at all.
- **Shared Core Logic (`services/core-logic`)**: A single AI triage/session engine shared across App, SMS, and IVR, ensuring consistent clinical logic regardless of how a patient connects.

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
| **Monorepo Management** | npm Workspaces |
| **Backend Services** *(in progress)* | Node.js-based API, SMS gateway, IVR gateway, shared core AI/triage logic |

---

## 📂 Project Structure

This repository is a **monorepo** managed with npm workspaces, organized into three top-level groups: `apps/` (frontend UIs), `services/` (backend), and `packages/` (shared code).

```
NabhaCare/
├── apps/
│   ├── doctor-web/              # Doctor clinical workstation (React + Vite)
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/          # Logos and graphics
│   │   │   ├── components/      # Reusable clinical UI components
│   │   │   │   └── ui/          # Badges, modals, toasts, stat cards
│   │   │   ├── context/         # Global app/patient/queue/offline state
│   │   │   ├── data/            # Mock data (patients, consultations, reports)
│   │   │   ├── layouts/         # AppShell, sidebar/offline banner wrapper
│   │   │   ├── pages/           # Route-level views (Dashboard, Queue, etc.)
│   │   │   ├── services/        # API service layer
│   │   │   ├── types/           # TypeScript data contracts
│   │   │   └── utils/           # PDF generation, helpers
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   ├── patient-web/             # Patient-facing app (smartphone/web channel)
│   │   ├── public/
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── patient-landing/         # Entry screen: choose App / SMS / IVR
│       ├── src/
│       └── package.json
│
├── services/                    # Backend
│   ├── api/                     # Core REST API (patients, doctors, sessions, records)
│   ├── core-logic/              # Shared AI triage + session logic (used by all channels)
│   ├── sms-gateway/             # SMS channel service
│   └── ivr-gateway/             # IVR (voice call) channel service
│
├── packages/                    # Shared code across apps/services
│   ├── ui-kit/                  # Shared design system components
│   ├── types/                   # Shared TypeScript interfaces (Patient, Doctor, Session)
│   └── utils/                   # Shared helper functions
│
├── package.json                 # Root workspace config
├── .gitignore
├── .oxlintrc.json
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** (workspace-based monorepo — always run commands from the **repo root**)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Apurvasharma1001/NabhaCare.git
   cd NabhaCare
   ```

2. **Install dependencies (from the repo root, not inside individual apps):**
   ```bash
   npm install
   ```
   This installs dependencies for every workspace package (`apps/*`, `services/*`, `packages/*`) into a single shared `node_modules` at the root.

3. **Start the Doctor Workstation:**
   ```bash
   npm run dev:doctor
   ```
   Open your browser at `http://localhost:5173`.

4. **Start the Patient App / Landing** *(once built out)*:
   ```bash
   npm run dev:patient
   npm run dev:landing
   ```

5. **Build for production:**
   ```bash
   npm run build --workspace=doctor
   ```

6. **Run Linter:**
   ```bash
   npm run lint --workspace=doctor
   ```

> ⚠️ **Note:** Do not run `npm install` inside individual app folders (e.g. `apps/doctor-web`). Always install from the repo root — this is required for the npm workspaces setup to correctly share dependencies.

---

## 👥 Branching & Collaboration Guidelines

- **`Main`**: Production / integration branch.
- Feature and structural work happens on descriptive branches (e.g. `restructure/monorepo`, `feature/patient-sms-flow`).

```bash
# Checkout your working branch
git checkout <your-branch>

# Pull latest updates from main
git pull origin Main

# Push changes to your branch
git push origin <your-branch>
```

Open a Pull Request into `Main` for review before merging, especially for structural changes that affect the whole team's local setup.

---

## 📄 Compliance & Telemedicine Standards
Designed following guidelines inspired by the **Telemedicine Practice Guidelines (Ministry of Health and Family Welfare, Govt. of India)** and standard digital health data privacy norms.
