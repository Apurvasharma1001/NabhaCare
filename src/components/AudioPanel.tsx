import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  Volume2,
  VolumeX,
  PhoneOff,
  Radio,
  AlertTriangle,
} from 'lucide-react';
import type { Patient } from '../types';
import { NetworkIndicator } from './ui/NetworkIndicator';
import type { NetworkQuality } from './ui/NetworkIndicator';

interface AudioPanelProps {
  patient: Patient;
  onUpgradeToVideo: () => void;
  onEndConsultation: () => void;
}

export const AudioPanel: React.FC<AudioPanelProps> = ({
  patient,
  onUpgradeToVideo,
  onEndConsultation,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>('Good');

  // Timer for consultation
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[260px]">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            Audio Call Connected
          </span>
          <span className="font-mono text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded">
            {formatDuration(callDuration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <NetworkIndicator quality={networkQuality} />
          {/* Network quality toggler for demo testing */}
          <button
            onClick={() => {
              const next: Record<NetworkQuality, NetworkQuality> = {
                Excellent: 'Good',
                Good: 'Poor',
                Poor: 'Fair',
                Fair: 'Excellent',
              };
              setNetworkQuality(next[networkQuality]);
            }}
            className="text-[10px] text-slate-400 hover:text-slate-200 underline"
            title="Simulate bandwidth change"
          >
            Simulate Bandwidth
          </button>
        </div>
      </div>

      {/* Center Audio Avatar & Waveform */}
      <div className="flex flex-col items-center justify-center my-4 z-10">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-slate-800 shadow-xl flex items-center justify-center text-white text-2xl font-bold">
            {patient.name.charAt(0)}
          </div>
          <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
        </div>

        <h3 className="text-base font-bold text-white mt-2">{patient.name}</h3>
        <p className="text-xs text-slate-400">
          {patient.village} • Connected via {patient.source === 'USSD' ? 'PSTN / USSD Voice Gateway' : 'VoIP Telehealth Channel'}
        </p>

        {/* Subtle live audio visualizer pulses */}
        <div className="flex items-center gap-1 mt-3">
          <span className="w-1 bg-blue-500 h-3 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 bg-blue-400 h-6 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 bg-blue-500 h-8 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="w-1 bg-blue-400 h-4 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
          <span className="w-1 bg-blue-500 h-2 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
        </div>
      </div>

      {/* Bandwidth Alert if Poor */}
      {networkQuality === 'Poor' && (
        <div className="z-10 mb-2 p-2 bg-amber-950/80 border border-amber-500/50 rounded-lg text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Low rural bandwidth detected. Audio-only mode optimized for call stability.</span>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2.5 rounded-full transition-all ${
              isMuted
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
            className={`p-2.5 rounded-full transition-all ${
              isSpeakerMuted
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title={isSpeakerMuted ? 'Unmute Speaker' : 'Mute Speaker'}
          >
            {isSpeakerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={onUpgradeToVideo}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-colors"
          title="Switch to Video Stream"
        >
          <Video className="w-4 h-4" />
          <span>Upgrade to Video</span>
        </button>

        <button
          onClick={onEndConsultation}
          className="px-3.5 py-2 bg-red-600/90 hover:bg-red-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
          title="End Telemedicine Call"
        >
          <PhoneOff className="w-4 h-4" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};
