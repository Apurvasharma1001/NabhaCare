import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Wifi,
  WifiOff,
  RefreshCw,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Clock,
  Menu,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { DoctorStatus } from '../types';

interface HeaderProps {
  onToggleSidebarMobile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebarMobile }) => {
  const {
    doctor,
    doctorAvailability,
    setDoctorAvailability,
    isOnline,
    toggleConnectivity,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    lastSyncedTime,
    isSyncing,
    triggerManualSync,
    logout,
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [showAvailabilityMenu, setShowAvailabilityMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const availabilityRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (availabilityRef.current && !availabilityRef.current.contains(event.target as Node)) {
        setShowAvailabilityMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute page title from route
  const getPageMeta = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return { title: 'Clinical Dashboard', breadcrumb: 'Hospital Overview' };
    if (path.startsWith('/queue')) return { title: 'Unified Patient Queue', breadcrumb: 'Live Triage Stream' };
    if (path.startsWith('/consultation')) return { title: 'Live Consultation Workspace', breadcrumb: 'Tele-Clinic' };
    if (path.startsWith('/patients/')) return { title: 'Longitudinal Patient Record', breadcrumb: 'Patient Profile & EHR' };
    if (path.startsWith('/patients')) return { title: 'Patient Registry', breadcrumb: 'Nabha Rural Health Center' };
    if (path.startsWith('/prescriptions/')) return { title: 'Prescription Details', breadcrumb: 'Pharmacy Dispatch' };
    if (path.startsWith('/prescriptions')) return { title: 'Prescriptions Directory', breadcrumb: 'Dispensation Records' };
    if (path.startsWith('/profile')) return { title: 'Doctor Profile', breadcrumb: 'Credentialing & Schedule' };
    if (path.startsWith('/notifications')) return { title: 'Notification Center', breadcrumb: 'Alerts & System Messages' };
    if (path.startsWith('/settings')) return { title: 'System & Connectivity Settings', breadcrumb: 'Configuration' };
    return { title: 'Nabha Telemedicine Portal', breadcrumb: 'Doctor Station' };
  };

  const { title, breadcrumb } = getPageMeta();

  const handleAvailabilitySelect = (status: DoctorStatus) => {
    setDoctorAvailability(status);
    setShowAvailabilityMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        {onToggleSidebarMobile && (
          <button
            onClick={onToggleSidebarMobile}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
            {title}
          </h1>
          <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
            {breadcrumb}
          </p>
        </div>
      </div>

      {/* Right Actions & Status Indicators */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sync Center Status */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Sync: <strong>{lastSyncedTime}</strong></span>
          <button
            onClick={triggerManualSync}
            disabled={isSyncing || !isOnline}
            className="text-blue-600 hover:text-blue-800 disabled:opacity-40 p-0.5"
            title="Sync offline records with hospital central registry"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Connectivity Mode Simulator Button */}
        <button
          onClick={toggleConnectivity}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold transition-all shadow-2xs ${
            isOnline
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 animate-pulse'
          }`}
          title="Click to toggle simulated online/offline network mode"
        >
          {isOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-700" />
              <span>Simulated Offline</span>
            </>
          )}
        </button>

        {/* Doctor Availability Selector */}
        <div className="relative" ref={availabilityRef}>
          <button
            onClick={() => setShowAvailabilityMenu(!showAvailabilityMenu)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-bold transition-all shadow-2xs ${
              doctorAvailability === 'AVAILABLE'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : doctorAvailability === 'BUSY'
                ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                doctorAvailability === 'AVAILABLE'
                  ? 'bg-emerald-500'
                  : doctorAvailability === 'BUSY'
                  ? 'bg-amber-500'
                  : 'bg-slate-500'
              }`}
            />
            <span className="tracking-wide uppercase">{doctorAvailability}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {showAvailabilityMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 font-semibold text-slate-500 text-[10px] uppercase tracking-wider border-b border-slate-100">
                Doctor Triage Availability
              </div>
              <button
                onClick={() => handleAvailabilitySelect('AVAILABLE')}
                className="w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-emerald-50/70 text-slate-800 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-900">AVAILABLE</div>
                  <div className="text-[11px] text-slate-500">New patients can enter your queue</div>
                </div>
              </button>
              <button
                onClick={() => handleAvailabilitySelect('BUSY')}
                className="w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-amber-50/70 text-slate-800 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-amber-900">BUSY</div>
                  <div className="text-[11px] text-slate-500">In consultation; new queue assignments held</div>
                </div>
              </button>
              <button
                onClick={() => handleAvailabilitySelect('OFFLINE')}
                className="w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-slate-100 text-slate-800 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-slate-500 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">OFFLINE</div>
                  <div className="text-[11px] text-slate-500">No new patients assigned to station</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Bell with Popover */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">Clinical Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {unreadNotificationCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-[11px] text-blue-600 hover:underline font-medium"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No active notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.actionUrl) {
                          navigate(notif.actionUrl);
                          setShowNotificationMenu(false);
                        }
                      }}
                      className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                        !notif.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`font-semibold ${notif.type === 'urgent' ? 'text-red-700' : 'text-slate-900'}`}>
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    navigate('/notifications');
                    setShowNotificationMenu(false);
                  }}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Doctor Avatar / Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">{doctor.name}</span>
              <span className="text-[10px] text-slate-500">{doctor.specialization}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">{doctor.name}</p>
                <p className="text-[11px] text-slate-500">{doctor.email}</p>
                <p className="text-[10px] text-blue-600 font-medium mt-0.5">{doctor.hospital}</p>
              </div>
              <button
                onClick={() => {
                  navigate('/profile');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Doctor Profile</span>
              </button>
              <button
                onClick={() => {
                  navigate('/settings');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-700 hover:bg-slate-50"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Station Settings</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
