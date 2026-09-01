import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBorder = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200';
      case 'warning':
        return 'border-amber-200';
      case 'error':
        return 'border-red-200';
      default:
        return 'border-blue-200';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-xs">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white rounded-lg border ${getBorder(toast.type)} shadow-lg p-3 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2`}
        >
          {getIcon(toast.type)}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900">{toast.title}</p>
            {toast.message && <p className="text-[11px] text-slate-500 mt-0.5">{toast.message}</p>}
          </div>
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
