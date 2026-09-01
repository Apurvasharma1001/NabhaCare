import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './layouts/AppShell';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { HealthRecordsPage } from './pages/HealthRecordsPage';
import { ConsultationsPage } from './pages/ConsultationsPage';
import { SymptomCheckerPage } from './pages/SymptomCheckerPage';
import { BookingPage } from './pages/BookingPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const RedirectIfAuthed: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<RedirectIfAuthed><LoginPage /></RedirectIfAuthed>} />
    <Route path="/signup" element={<RedirectIfAuthed><SignupPage /></RedirectIfAuthed>} />

    <Route
      element={
        <RequireAuth>
          <AppShell />
        </RequireAuth>
      }
    >
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/health-records" element={<HealthRecordsPage />} />
      <Route path="/consultations" element={<ConsultationsPage />} />
      <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </BrowserRouter>
);

export default App;
