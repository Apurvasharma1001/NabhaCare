import React, { useState } from 'react';
import { Bell, Globe, Lock, LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { logout, addToast } = useApp();
  const navigate = useNavigate();
  const [notifPrefs, setNotifPrefs] = useState({ reminders: true, prescriptions: true, system: false });
  const [language, setLanguage] = useState('English');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <h2 className="text-lg font-bold text-slate-900">Settings</h2>

      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-blue-600" />
          Notification Preferences
        </h3>
        <div className="space-y-3">
          <Toggle
            label="Appointment reminders"
            checked={notifPrefs.reminders}
            onChange={(v) => setNotifPrefs({ ...notifPrefs, reminders: v })}
          />
          <Toggle
            label="Prescription updates"
            checked={notifPrefs.prescriptions}
            onChange={(v) => setNotifPrefs({ ...notifPrefs, prescriptions: v })}
          />
          <Toggle
            label="System announcements"
            checked={notifPrefs.system}
            onChange={(v) => setNotifPrefs({ ...notifPrefs, system: v })}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-blue-600" />
          Language
        </h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        >
          <option>English</option>
          <option>ਪੰਜਾਬੀ (Punjabi)</option>
          <option>हिन्दी (Hindi)</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Lock className="w-4 h-4 text-blue-600" />
          Account Security
        </h3>
        <button
          onClick={() => addToast({ type: 'info', title: 'Password reset link sent to your email' })}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Change Password
        </button>
      </div>

      <div className="bg-white rounded-lg border border-red-200 p-5">
        <h3 className="text-sm font-bold text-red-700 flex items-center gap-2 mb-3">
          <Trash2 className="w-4 h-4" />
          Danger Zone
        </h3>
        <p className="text-xs text-slate-500 mb-3">Signing out will end your current session on this device.</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-md"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-slate-700">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-full transition-colors relative ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  </div>
);
