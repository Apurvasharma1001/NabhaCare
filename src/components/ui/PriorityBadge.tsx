import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { PriorityLevel } from '../../types';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  effectivePriority?: PriorityLevel;
  isStarvationAdjusted?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'md',
  showIcon = true,
  effectivePriority,
  isStarvationAdjusted,
}) => {
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

  const currentStyle = getStyles(priority);
  const sizeClasses =
    size === 'sm'
      ? 'text-[11px] font-semibold px-2 py-0.5 gap-1'
      : size === 'lg'
      ? 'text-sm font-semibold px-3 py-1.5 gap-2'
      : 'text-xs font-semibold px-2.5 py-1 gap-1.5';

  return (
    <div className="inline-flex flex-col items-start">
      <span
        className={`inline-flex items-center rounded-md border tracking-wide uppercase ${currentStyle.bg} ${sizeClasses}`}
        title="AI / Rule-based Triage Recommendation (Urgency recommendation — not a diagnosis)"
      >
        {showIcon && currentStyle.icon}
        <span>{currentStyle.label}</span>
      </span>

      {isStarvationAdjusted && effectivePriority && (
        <span
          className="text-[10px] text-amber-700 font-medium mt-0.5 flex items-center gap-0.5 cursor-help"
          title="Waiting time is considered to prevent lower-priority patients from waiting indefinitely. Urgent cases always retain clinical priority."
        >
          ★ Fair Queue (+{effectivePriority})
        </span>
      )}
    </div>
  );
};
