import React from 'react';
import { Inbox, FileText, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'inbox' | 'file' | 'alert';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'inbox',
  action,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'file':
        return <FileText className="w-10 h-10 text-slate-400" />;
      case 'alert':
        return <AlertCircle className="w-10 h-10 text-amber-500" />;
      default:
        return <Inbox className="w-10 h-10 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-lg border border-slate-200">
      <div className="p-3 bg-slate-50 rounded-full border border-slate-100 mb-3">
        {getIcon()}
      </div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
