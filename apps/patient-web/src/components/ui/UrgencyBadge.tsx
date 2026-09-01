import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { PriorityLevel } from '../../types';

interface UrgencyBadgeProps {
  urgency: PriorityLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, size = 'md', showIcon = true }) => {
  const getStyles = (p: PriorityLevel) => {
    switch (p) {
      case 'URGENT':
        return {
          bg: 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-600/10',
          icon: <AlertCircle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />,
          label: 'URGENT',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-600/10',
          icon: <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />,
          label: 'MEDIUM',
        };
      case 'LOW':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 ring-1 ring-emerald-600/10',
          icon: <ShieldCheck className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />,
          label: 'LOW',
        };
    }
  };

  const style = getStyles(urgency);
  const sizeClasses =
    size === 'sm'
      ? 'text-[11px] font-semibold px-2 py-0.5 gap-1'
      : size === 'lg'
      ? 'text-sm font-semibold px-3 py-1.5 gap-2'
      : 'text-xs font-semibold px-2.5 py-1 gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-wide uppercase ${style.bg} ${sizeClasses}`}
      title="AI triage recommendation — not a diagnosis"
    >
      {showIcon && style.icon}
      <span>{style.label}</span>
    </span>
  );
};
