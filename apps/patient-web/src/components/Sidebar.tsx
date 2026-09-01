import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderHeart,
  History,
  Stethoscope,
  CalendarPlus,
  Siren,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { patient, unreadNotificationCount, logout } = useApp();
  const navigate = useNavigate();
  const [showHelpModal, setShowHelpModal] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
    {
      label: 'Emergency Help',
      path: '/emergency',
      icon: <Siren className="w-4 h-4 shrink-0" />,
      accent: true,
    },
    { label: 'Symptom Checker', path: '/symptom-checker', icon: <Stethoscope className="w-4 h-4 shrink-0" /> },
    { label: 'Book Appointment', path: '/booking', icon: <CalendarPlus className="w-4 h-4 shrink-0" /> },
    { label: 'Health Records', path: '/health-records', icon: <FolderHeart className="w-4 h-4 shrink-0" /> },
    { label: 'Consultations & Rx', path: '/consultations', icon: <History className="w-4 h-4 shrink-0" /> },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: <Bell className="w-4 h-4 shrink-0" />,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
      badgeColor: 'bg-amber-500 text-white',
    },
    { label: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4 shrink-0" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!patient) return null;

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 ${
          isCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm text-white tracking-tight leading-tight">NABHA TELEMED</span>
                <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase">
                  Patient Portal
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Patient Mini-Card */}
        {!isCollapsed ? (
          <div className="p-3 mx-3 my-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="w-10 h-10 rounded-full object-cover border border-blue-400/30 ring-2 ring-blue-500/20"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">{patient.name}</span>
              <span className="text-[11px] text-slate-400 truncate">{patient.patientId}</span>
            </div>
          </div>
        ) : (
          <div className="p-2 my-3 flex justify-center">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="w-9 h-9 rounded-full object-cover border border-blue-400/30"
              title={patient.name}
            />
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? item.accent
                      ? 'bg-red-600 text-white font-semibold shadow-xs'
                      : 'bg-blue-600 text-white font-semibold shadow-xs'
                    : item.accent
                    ? 'text-red-300 hover:text-white hover:bg-red-950/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                } ${isCollapsed ? 'justify-center px-2' : ''}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
              {!isCollapsed && item.badge !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge !== undefined && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800/80 space-y-1 bg-slate-950/20">
          <button
            onClick={() => setShowHelpModal(true)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-md transition-colors ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title="Help & How It Works"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Help & Guide</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md transition-colors ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                How Nabha Telemedicine Works
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
                <strong>Describe, don't diagnose:</strong> Tell us your symptoms in your own words. Our system
                summarizes them and matches you to the right specialist.
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900">
                <strong>In an emergency:</strong> Use the Emergency Help button for immediate guidance and contact
                numbers — don't wait for a booking.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                <strong>Doctor assignment:</strong> You don't need to pick a doctor — our system assigns the
                best-matched, earliest-available specialist automatically.
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
