import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline, toggleConnectivity, syncQueue } = useApp();

  if (isOnline) return null;

  const pendingCount = syncQueue.filter((item) => item.status === 'pending').length;

  return (
    <div className="bg-amber-600 text-white px-4 py-2 text-xs sm:text-sm font-medium shadow-inner flex flex-wrap items-center justify-between gap-2 border-b border-amber-700">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
        <span>
          <strong>Offline Mode Active:</strong> Live queue updates and live tele-consultation are unavailable. Cached patient records remain accessible.
          {pendingCount > 0 && ` (${pendingCount} pending items queued)`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleConnectivity}
          className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Reconnect
        </button>
      </div>
    </div>
  );
};
