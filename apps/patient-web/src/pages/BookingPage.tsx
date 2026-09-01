import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Siren,
  Video,
  Copy,
  Home,
} from 'lucide-react';
import { analyzeSymptomText, type AnalysisResult, generateMeetingId, generateTokenNumber } from '../utils/symptomAnalysis';
import { findAvailableSlots, assignDoctorForSpecialization } from '../utils/doctorMatching';
import { useApp } from '../context/AppContext';
import { UrgencyBadge } from '../components/ui/UrgencyBadge';
import type { AvailableSlot, Booking } from '../types';

type Step = 'describe' | 'analyzing' | 'slots' | 'confirming' | 'confirmed';

export const BookingPage: React.FC = () => {
  const location = useLocation() as { state?: { prefillText?: string } };
  const navigate = useNavigate();
  const { addSymptomReport, addBooking } = useApp();

  const [step, setStep] = useState<Step>('describe');
  const [text, setText] = useState(location.state?.prefillText || '');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const runAnalysis = () => {
    if (!text.trim()) return;
    setStep('analyzing');
    setTimeout(() => {
      const result = analyzeSymptomText(text);
      setAnalysis(result);
      setSlots(findAvailableSlots(result.suggestedSpecialization, 8));
      setStep('slots');
    }, 900);
  };

  const confirmBooking = () => {
    if (!analysis || !selectedSlot) return;
    setStep('confirming');

    setTimeout(() => {
      const report = addSymptomReport({
        rawText: text,
        summary: analysis.summary,
        keywords: analysis.keywords,
        urgencyTag: analysis.urgencyTag,
        urgencyReason: analysis.urgencyReason,
        suggestedSpecialization: analysis.suggestedSpecialization,
      });

      // Backend auto-assigns the doctor — patient never picks one directly
      const assignedDoctor = assignDoctorForSpecialization(analysis.suggestedSpecialization);

      const booking = addBooking({
        tokenNumber: generateTokenNumber(),
        meetingId: generateMeetingId(),
        reportId: report.id,
        doctorName: assignedDoctor.name,
        doctorSpecialization: assignedDoctor.specialization,
        doctorAvatar: assignedDoctor.avatar,
        slot: selectedSlot,
        urgencyTag: analysis.urgencyTag,
        status: 'CONFIRMED',
        queuePosition: Math.floor(Math.random() * 4) + 1,
      });

      setConfirmedBooking(booking);
      setStep('confirmed');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress indicator */}
      {step !== 'confirmed' && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <StepPill active={step === 'describe' || step === 'analyzing'} label="1. Describe Symptoms" />
          <div className="w-6 h-px bg-slate-200" />
          <StepPill active={step === 'slots' || step === 'confirming'} label="2. Choose a Slot" />
          <div className="w-6 h-px bg-slate-200" />
          <StepPill active={false} label="3. Confirmation" />
        </div>
      )}

      {/* Step 1: Describe */}
      {(step === 'describe' || step === 'analyzing') && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">What's bothering you?</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Describe your symptoms and we'll match you with the right specialist — you don't need to pick a doctor
            yourself.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            disabled={step === 'analyzing'}
            placeholder="e.g. I've had a fever and body ache for the past 3 days..."
            className="w-full text-sm border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none placeholder:text-slate-400 disabled:bg-slate-50"
          />
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => navigate('/emergency')}
              className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"
            >
              <Siren className="w-3.5 h-3.5" />
              This is an emergency
            </button>
            <button
              onClick={runAnalysis}
              disabled={!text.trim() || step === 'analyzing'}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {step === 'analyzing' ? 'Analyzing...' : 'Analyze & Find Slots'}
            </button>
          </div>
          {step === 'analyzing' && (
            <div className="mt-4 text-center py-6">
              <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-500 mt-3">Matching you to a specialist and checking availability...</p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Slots */}
      {(step === 'slots' || step === 'confirming') && analysis && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Analysis Summary</h3>
              <UrgencyBadge urgency={analysis.urgencyTag} size="sm" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{analysis.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {analysis.keywords.map((k) => (
                <span key={k} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                  {k}
                </span>
              ))}
            </div>
            <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
              Matched specialization: <strong>{analysis.suggestedSpecialization}</strong>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Available Slots (next 10 days)</h3>
            <p className="text-xs text-slate-500 mb-4">
              A specialist will be assigned automatically once you pick a time — no need to choose a doctor.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {slots.map((slot) => (
                <button
                  key={slot.slotId}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedSlot?.slotId === slot.slotId
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {slot.dayLabel}
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {slot.time}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep('describe')}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
              <button
                onClick={confirmBooking}
                disabled={!selectedSlot || step === 'confirming'}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-md disabled:opacity-50"
              >
                {step === 'confirming' ? 'Booking...' : 'Confirm Appointment'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirmed */}
      {step === 'confirmed' && confirmedBooking && (
        <div className="text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Appointment Confirmed</h2>
            <p className="text-xs text-slate-500 mt-1">You've been added to the doctor's queue in real time.</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={confirmedBooking.doctorAvatar}
                alt={confirmedBooking.doctorName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{confirmedBooking.doctorName}</p>
                <p className="text-xs text-slate-500">{confirmedBooking.doctorSpecialization}</p>
              </div>
              <UrgencyBadge urgency={confirmedBooking.urgencyTag} size="sm" />
            </div>

            <div className="py-4 space-y-3 text-xs">
              <DetailRow label="Date & Time" value={`${confirmedBooking.slot.dayLabel}, ${confirmedBooking.slot.time}`} />
              <DetailRow label="Token Number" value={`#${confirmedBooking.tokenNumber}`} mono />
              <DetailRow label="Meeting ID" value={confirmedBooking.meetingId} mono copyable />
              <DetailRow label="Queue Position" value={`${confirmedBooking.queuePosition} patient(s) ahead`} />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <Video className="w-3.5 h-3.5" />
              You'll get a reminder notification and the join link will activate 10 minutes before your slot.
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-md mx-auto"
          >
            <Home className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

const StepPill: React.FC<{ active: boolean; label: string }> = ({ active, label }) => (
  <span className={`font-semibold ${active ? 'text-blue-700' : 'text-slate-400'}`}>{label}</span>
);

const DetailRow: React.FC<{ label: string; value: string; mono?: boolean; copyable?: boolean }> = ({
  label,
  value,
  mono,
  copyable,
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold text-slate-800 flex items-center gap-1.5 ${mono ? 'font-mono' : ''}`}>
        {value}
        {copyable && (
          <button onClick={handleCopy} className="text-slate-400 hover:text-blue-600">
            {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        )}
      </span>
    </div>
  );
};
