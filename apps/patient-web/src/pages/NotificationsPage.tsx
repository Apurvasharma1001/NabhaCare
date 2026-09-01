import React from 'react';
import { AlertCircle, Pill, Clock, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/ui/EmptyState';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'prescription':
        return <Pill className="w-4 h-4 text-emerald-600" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <SettingsIcon className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
        <button onClick={markAllNotificationsAsRead} className="text-xs text-blue-600 font-semibold hover:underline">
          Mark all read
        </button>
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up." icon="inbox" />
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${
                !n.read ? 'bg-blue-50/40' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900">{n.title}</p>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
