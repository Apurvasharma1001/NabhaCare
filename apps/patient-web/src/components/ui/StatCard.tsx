import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'urgent' | 'success' | 'warning' | 'primary';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, variant = 'default', onClick }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'urgent':
        return { border: 'border-red-200 hover:border-red-300', iconBg: 'bg-red-50 text-red-600', valueColor: 'text-red-700' };
      case 'warning':
        return { border: 'border-amber-200 hover:border-amber-300', iconBg: 'bg-amber-50 text-amber-600', valueColor: 'text-amber-700' };
      case 'success':
        return { border: 'border-emerald-200 hover:border-emerald-300', iconBg: 'bg-emerald-50 text-emerald-600', valueColor: 'text-emerald-700' };
      case 'primary':
        return { border: 'border-blue-200 hover:border-blue-300', iconBg: 'bg-blue-50 text-blue-600', valueColor: 'text-blue-700' };
      default:
        return { border: 'border-slate-200 hover:border-slate-300', iconBg: 'bg-slate-100 text-slate-600', valueColor: 'text-slate-900' };
    }
  };
  const styles = getVariantStyles();

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border p-4 sm:p-5 shadow-xs transition-all duration-200 ${styles.border} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-md ${styles.iconBg}`}>{icon}</div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${styles.valueColor}`}>{value}</span>
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-500 font-normal">{subtitle}</p>}
    </div>
  );
};
