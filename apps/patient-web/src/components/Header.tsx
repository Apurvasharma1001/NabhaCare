import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, User, Settings, LogOut, Menu, Siren } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onToggleSidebarMobile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebarMobile }) => {
  const { patient, notifications, unreadNotificationCount, markNotificationAsRead, markAllNotificationsAsRead, logout } =
    useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const getPageMeta = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return { title: 'My Health Dashboard', breadcrumb: 'Overview' };
    if (path.startsWith('/emergency')) return { title: 'Emergency Help', breadcrumb: 'Immediate Assistance' };
    if (path.startsWith('/symptom-checker')) return { title: 'AI Symptom Checker', breadcrumb: 'Self-Assessment' };
    if (path.startsWith('/booking')) return { title: 'Book Appointment', breadcrumb: 'Consult a Specialist' };
    if (path.startsWith('/health-records')) return { title: 'Health Records', breadcrumb: 'My Medical Profile' };
    if (path.startsWith('/consultations')) return { title: 'Consultations & Prescriptions', breadcrumb: 'Visit History' };
    if (path.startsWith('/notifications')) return { title: 'Notification Center', breadcrumb: 'Alerts & Updates' };
    if (path.startsWith('/settings')) return { title: 'Settings', breadcrumb: 'Account & Preferences' };
    if (path.startsWith('/profile')) return { title: 'My Profile', breadcrumb: 'Personal Details' };
    return { title: 'Nabha Telemedicine Portal', breadcrumb: 'Patient Station' };
  };
  const { title, breadcrumb } = getPageMeta();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!patient) return null;

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
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
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">{title}</h1>
          <p className="text-[11px] text-slate-500 font-medium hidden sm:block">{breadcrumb}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Emergency quick-access button, always visible */}
        <button
          onClick={() => navigate('/emergency')}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors shadow-2xs"
          title="Emergency Help"
        >
          <Siren className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Emergency</span>
        </button>

        {/* Notifications */}
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
                  <span className="font-bold text-xs text-slate-900">Notifications</span>
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
                  <div className="p-4 text-center text-xs text-slate-500">No active notifications</div>
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
                        <span
                          className={`font-semibold ${notif.type === 'urgent' ? 'text-red-700' : 'text-slate-900'}`}
                        >
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

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">{patient.name}</span>
              <span className="text-[10px] text-slate-500">{patient.patientId}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">{patient.name}</p>
                <p className="text-[11px] text-slate-500">{patient.email}</p>
                <p className="text-[10px] text-blue-600 font-medium mt-0.5">{patient.village}</p>
              </div>
              <button
                onClick={() => {
                  navigate('/profile');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  navigate('/settings');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-700 hover:bg-slate-50"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
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
