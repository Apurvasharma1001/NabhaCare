# Nabha Telemedicine — Patient Portal

A patient-facing companion to the doctor-web app, built with the same stack and design system
(React 19 + TypeScript + Vite + Tailwind CSS v4 + lucide-react).

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
```

Demo login: `patient@example.com` / `password123` — or sign up as a new patient.

## What's Included

- **Auth-gated app**: unauthenticated users are redirected to `/login`; new users go through
  a 4-step **Signup** flow (Account -> Personal Details -> Medical Records -> Review) that
  captures blood group, allergies, chronic conditions, current medications, and an emergency
  contact — this becomes the patient's initial medical record.
- **Dashboard** (`/dashboard`): quick actions, upcoming appointment, last consultation summary.
- **Health Records** (`/health-records`): view and edit blood group, allergies, chronic
  conditions, medications, past surgeries, and emergency contact.
- **Consultations & Prescriptions** (`/consultations`): full visit history with a prescription
  detail view.
- **Emergency Help** (`/emergency`): one-tap-to-call emergency numbers, red-flag symptom list,
  and the patient's own critical info surfaced for responders. Always reachable from the header.
- **AI Symptom Checker** (`/symptom-checker`): free-text symptom entry -> mock AI-generated
  summary, extracted keywords, urgency tag (Urgent/Medium/Low), and specialization match. Can
  hand off directly into booking.
- **Book Appointment** (`/booking`): symptom description -> analysis -> available slots across
  the next 10 days for the matched specialization -> confirmation. **The patient never selects
  a doctor** — a doctor is auto-assigned by the matching engine once a slot is chosen, and a
  token number + random meeting ID are generated on confirmation, per your backend flow.
- **Notifications**, **Settings**, **Profile** — for parity with the doctor-side navigation
  structure.

## How it mirrors the doctor-side app

- Same CSS custom properties and Tailwind base layer (`src/index.css`), same color roles
  (blue-600 primary, slate-900 sidebar, red/amber/emerald for Urgent/Medium/Low).
- Same component patterns: `Sidebar` (dark navy, collapsible), `Header` (page-title + breadcrumb,
  notification popover, profile dropdown), `AppShell` layout, `StatCard`, `EmptyState`,
  `ToastContainer`.
- Same "Nabha Telemedicine" brand, Civil Hospital Nabha context, and localStorage-backed mock
  auth/session pattern (`AppContext`) as `doctor-web`'s `AppContext`.

## Wiring to a real backend

Everything here runs on mock data/localStorage so it's demo-able standalone. The natural seams
to connect to your actual API (per the schema we discussed) are:

- `src/utils/symptomAnalysis.ts` -> replace with a call to your AI summary/keyword/urgency endpoint.
- `src/utils/doctorMatching.ts` -> replace with calls to `GET /doctors/available-slots` and the
  backend booking-assignment endpoint (the one that does the `SELECT...FOR UPDATE` + atomic
  token/queue-position logic from the schema).
- `src/context/AppContext.tsx` -> replace `login`/`signup`/localStorage persistence with real
  API calls once auth endpoints exist.
