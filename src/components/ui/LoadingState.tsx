import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  minHeight?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading patient clinical records...',
  minHeight = 'min-h-[250px]',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${minHeight} p-6 bg-white rounded-lg border border-slate-200`}>
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
      <p className="text-xs font-medium text-slate-600">{message}</p>
      <span className="text-[11px] text-slate-400 mt-1">Retrieving synchronized clinical cache</span>
    </div>
  );
};
