import React, { useState } from 'react';
import {
  Settings,
  Wifi,
  Volume2,
  Database,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { triggerManualSync, lastSyncedTime, syncQueue, addToast } = useApp();

  const [autoSync, setAutoSync] = useState(true);
  const [lowBandwidthMode, setLowBandwidthMode] = useState(true);
  const [audioFirstDefault, setAudioFirstDefault] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [starvationAlerts, setStarvationAlerts] = useState(true);

  const handleSavePreferences = () => {
    addToast({
      type: 'success',
      title: 'Preferences Saved',
      message: 'Telemedicine station settings updated locally.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Station Settings & System Configuration
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Network adaptation, triage alert parameters, and offline cache settings
          </p>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        {/* Connection & Low Bandwidth Adaptation */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
            <Wifi className="w-4 h-4 text-blue-600" />
            Rural Network Adaptation & Offline Settings
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <p className="font-semibold text-slate-800">Low Bandwidth Optimization Mode</p>
                <p className="text-[11px] text-slate-500">
                  Automatically prioritizes audio codecs and reduces unnecessary UI network overhead for rural links.
                </p>
              </div>
              <input
                type="checkbox"
                checked={lowBandwidthMode}
                onChange={(e) => setLowBandwidthMode(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <p className="font-semibold text-slate-800">Default to Audio-First Consultation</p>
                <p className="text-[11px] text-slate-500">
                  Starts patient calls in audio mode with on-demand video upgrade to preserve rural cell towers.
                </p>
              </div>
              <input
                type="checkbox"
                checked={audioFirstDefault}
                onChange={(e) => setAudioFirstDefault(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-slate-800">Auto-Sync on Network Restoration</p>
                <p className="text-[11px] text-slate-500">
                  Immediately synchronize pending prescriptions and clinical notes when connection resumes.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Clinical Alert & Triage Sounds */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
            <Volume2 className="w-4 h-4 text-blue-600" />
            Clinical Triage Audio & Notification Alerts
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <p className="font-semibold text-slate-800">High-Urgency Patient Arrival Chime</p>
                <p className="text-[11px] text-slate-500">
                  Play distinct audible chime when a new URGENT triage patient enters the Nabha queue.
                </p>
              </div>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-slate-800">Queue Starvation Warnings (&gt;40 min wait)</p>
                <p className="text-[11px] text-slate-500">
                  Alert doctor when a lower-priority rural patient reaches starvation threshold in waiting area.
                </p>
              </div>
              <input
                type="checkbox"
                checked={starvationAlerts}
                onChange={(e) => setStarvationAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Local EHR Cache & Synchronization Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
            <Database className="w-4 h-4 text-blue-600" />
            Local Clinical EHR Cache & District Sync
          </h3>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Local Station Storage Status</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Last synchronized with Civil Hospital central EHR: <strong>{lastSyncedTime}</strong>
              </p>
              <p className="text-[11px] text-slate-500">
                Pending sync items in local queue: <strong>{syncQueue.filter((i) => i.status === 'pending').length} items</strong>
              </p>
            </div>

            <button
              onClick={triggerManualSync}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Force Synchronize Now</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSavePreferences}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
          >
            Save All Station Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
