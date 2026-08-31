import React from 'react';
import { Smartphone, MessageSquare, HeartHandshake } from 'lucide-react';
import type { EntryChannel } from '../../types';

interface SourceBadgeProps {
  source: EntryChannel;
  size?: 'sm' | 'md';
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, size = 'md' }) => {
  const getBadgeConfig = (s: EntryChannel) => {
    switch (s) {
      case 'APP':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <Smartphone className="w-3 h-3" />,
          label: 'Mobile App',
        };
      case 'USSD':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <MessageSquare className="w-3 h-3" />,
          label: 'SMS / USSD',
        };
      case 'ASHA':
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200',
          icon: <HeartHandshake className="w-3 h-3" />,
          label: 'ASHA Facilitated',
        };
    }
  };

  const config = getBadgeConfig(source);
  const sizeClasses =
    size === 'sm'
      ? 'text-[10px] font-medium px-1.5 py-0.5 gap-1'
      : 'text-xs font-medium px-2 py-0.5 gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded border ${config.bg} ${sizeClasses}`}
      title={`Patient entered queue via ${config.label}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
