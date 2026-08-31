import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  AlertCircle,
  Clock,
  Radio,
  RefreshCw,
  Info,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationCount,
  } = useApp();

  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'UNREAD') return !n.read;
    return n.type === filterType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'waiting':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'consultation':
        return <Radio className="w-5 h-5 text-blue-600" />;
      case 'sync':
        return <RefreshCw className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Clinical Notification & Alert Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time critical alerts, urgent triage arrivals, and EHR synchronization events
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadNotificationCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
            >
              Mark all {unreadNotificationCount} as read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-wrap gap-2 text-xs">
        {[
          { id: 'ALL', label: `All Alerts (${notifications.length})` },
          { id: 'UNREAD', label: `Unread (${unreadNotificationCount})` },
          { id: 'urgent', label: 'Urgent Triage' },
          { id: 'waiting', label: 'Queue Time' },
          { id: 'consultation', label: 'Consultations' },
          { id: 'sync', label: 'Sync Events' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === tab.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No notifications in this category.
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationAsRead(notif.id);
                if (notif.actionUrl) navigate(notif.actionUrl);
              }}
              className={`bg-white rounded-xl border p-4 shadow-xs hover:border-blue-300 transition-all cursor-pointer flex items-start gap-3.5 ${
                !notif.read ? 'bg-blue-50/20 border-blue-200 ring-1 ring-blue-500/10' : 'border-slate-200'
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    <span>{notif.title}</span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">{notif.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>

                {notif.actionUrl && (
                  <div className="mt-2 text-xs font-semibold text-blue-600 flex items-center gap-1">
                    <span>Open Associated Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
