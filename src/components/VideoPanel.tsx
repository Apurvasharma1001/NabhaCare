import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Radio,
} from 'lucide-react';
import type { Patient } from '../types';
import { NetworkIndicator } from './ui/NetworkIndicator';
import { useApp } from '../context/AppContext';

interface VideoPanelProps {
  patient: Patient;
  onDowngradeToAudio: () => void;
  onEndConsultation: () => void;
}

export const VideoPanel: React.FC<VideoPanelProps> = ({
  patient,
  onDowngradeToAudio,
  onEndConsultation,
}) => {
  const { doctor } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  return (
    <div className="bg-slate-950 text-white rounded-xl border border-slate-800 shadow-xl overflow-hidden relative flex flex-col justify-between min-h-[340px]">
      {/* Patient Video Stream View (Mock Jitsi) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center justify-center">
        {patient.avatarUrl ? (
          <img
            src={patient.avatarUrl}
            alt={patient.name}
            className="w-full h-full object-cover opacity-60 filter blur-xs scale-105"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-900/60 border-2 border-blue-500/40 flex items-center justify-center text-3xl font-bold text-blue-200">
            {patient.name.charAt(0)}
          </div>
        )}

        {/* Patient Centered Mock Frame */}
        <div className="absolute flex flex-col items-center text-center p-4 bg-slate-950/60 rounded-xl backdrop-blur-md border border-white/10">
          <div className="w-16 h-16 rounded-full bg-blue-600 border-2 border-white/80 overflow-hidden mb-2">
            <img
              src={patient.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
              alt={patient.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-sm font-bold text-white">{patient.name}</h4>
          <span className="text-[11px] text-slate-300">{patient.village} • Patient Cam Active</span>
        </div>
      </div>

      {/* Floating Doctor Self-Preview (PIP) */}
      <div className="absolute top-4 right-4 z-20 w-28 sm:w-36 aspect-video bg-slate-900 rounded-lg border-2 border-blue-500/60 shadow-2xl overflow-hidden flex items-center justify-center">
        {!isCameraOff ? (
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-[10px] text-slate-400 font-bold uppercase">Camera Off</div>
        )}
        <span className="absolute bottom-1 left-1.5 text-[9px] bg-slate-900/80 px-1 py-0.5 rounded text-white font-medium">
          You (Doctor)
        </span>
      </div>

      {/* Top Header Overlay */}
      <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/90 to-transparent">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            HD Video Feed (Jitsi WebRTC)
          </span>
        </div>

        <div className="flex items-center gap-2 mr-32 sm:mr-40">
          <NetworkIndicator quality="Good" />
        </div>
      </div>

      {/* Bottom Controls Overlay */}
      <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-t from-slate-950/95 to-transparent border-t border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2.5 rounded-full transition-all ${
              isMuted ? 'bg-red-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsCameraOff(!isCameraOff)}
            className={`p-2.5 rounded-full transition-all ${
              isCameraOff ? 'bg-red-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
            title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
          >
            {isCameraOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={onDowngradeToAudio}
          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold transition-colors"
          title="Switch back to Audio-only"
        >
          Switch to Audio-Only
        </button>

        <button
          onClick={onEndConsultation}
          className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <PhoneOff className="w-4 h-4" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};
