import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './layouts/AppShell';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { QueuePage } from './pages/QueuePage';
import { PatientsListPage } from './pages/PatientsListPage';
import { PatientDetailPage } from './pages/PatientDetailPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { PrescriptionsPage } from './pages/PrescriptionsPage';
import { PrescriptionDetailPage } from './pages/PrescriptionDetailPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Wrapper
const ProtectedLayout: React.FC = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AppShell />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Clinical Workstation Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/queue" element={<QueuePage />} />
        <Route path="/patients" element={<PatientsListPage />} />
        <Route path="/patients/:id" element={<PatientDetailPage />} />
        <Route path="/patients/:id/history" element={<PatientDetailPage />} />
        <Route path="/patients/:id/prescriptions" element={<PatientDetailPage />} />
        <Route path="/patients/:id/reports" element={<PatientDetailPage />} />
        <Route path="/consultation/:id" element={<ConsultationPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/prescriptions/:id" element={<PrescriptionDetailPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
