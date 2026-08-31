import React from 'react';
import { Wifi } from 'lucide-react';

export type NetworkQuality = 'Excellent' | 'Good' | 'Fair' | 'Poor';

interface NetworkIndicatorProps {
  quality?: NetworkQuality;
  showLabel?: boolean;
}

export const NetworkIndicator: React.FC<NetworkIndicatorProps> = ({
  quality = 'Good',
  showLabel = true,
}) => {
  const getIndicator = () => {
    switch (quality) {
      case 'Excellent':
        return {
          bars: 4,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          label: 'Bandwidth: Excellent (4G / Fiber)',
        };
      case 'Good':
        return {
          bars: 3,
          color: 'text-blue-600',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          label: 'Bandwidth: Good (Stable 3G/4G)',
        };
      case 'Fair':
        return {
          bars: 2,
          color: 'text-amber-600',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          label: 'Bandwidth: Fair (Audio Recommended)',
        };
      case 'Poor':
        return {
          bars: 1,
          color: 'text-red-600',
          bg: 'bg-red-50 text-red-800 border-red-200',
          label: 'Low Bandwidth Detected (Video disabled)',
        };
    }
  };

  const config = getIndicator();

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-medium ${config.bg}`}
      title={config.label}
    >
      <Wifi className={`w-3.5 h-3.5 ${config.color}`} />
      {showLabel && <span className="text-[11px]">{quality}</span>}
    </div>
  );
};
