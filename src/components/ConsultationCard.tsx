import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Activity,
  HeartPulse,
  Pill,
  Download,
} from 'lucide-react';
import type { Consultation } from '../types';

interface ConsultationCardProps {
  consultation: Consultation;
  onDownloadPrescription?: (prescriptionId: string) => void;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = ({
  consultation,
  onDownloadPrescription,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300">
      {/* Header Banner */}
      <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900">
                Consultation with {consultation.doctorName}
              </h4>
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-medium">
                {consultation.channel} Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {consultation.doctorSpecialization}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-[11px] text-slate-500">
            <div className="font-semibold text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {consultation.date}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              {consultation.time} ({consultation.durationMinutes} min)
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Content */}
      {isExpanded && (
        <div className="p-5 space-y-4 text-xs">
          {/* Chief Complaint & Symptoms */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Chief Complaint & Symptoms
            </span>
            <div className="mt-1 font-semibold text-slate-900">
              {consultation.chiefComplaint}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {consultation.symptoms.map((s, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Vitals if present */}
          {consultation.vitals && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex flex-wrap items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1 font-medium text-slate-700">
                <HeartPulse className="w-3.5 h-3.5 text-red-500" />
                <span>BP: <strong>{consultation.vitals.bloodPressure || 'N/A'}</strong></span>
              </div>
              <div>HR: <strong>{consultation.vitals.pulseRate || 'N/A'}</strong></div>
              <div>Temp: <strong>{consultation.vitals.temperature || 'N/A'}</strong></div>
              <div>SpO2: <strong>{consultation.vitals.spO2 || 'N/A'}</strong></div>
            </div>
          )}

          {/* Clinical Notes & Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Clinical Observation Notes
              </span>
              <p className="mt-1 text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {consultation.clinicalNotes}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Clinical Assessment & Diagnosis
              </span>
              <p className="mt-1 text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {consultation.assessment}
              </p>
            </div>
          </div>

          {/* Advice & Follow-up */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Patient Advice / Dietary Guidelines
              </span>
              <p className="mt-1 text-slate-700">{consultation.advice}</p>
            </div>
            <div className="sm:w-1/3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Follow-up Instruction
              </span>
              <p className="mt-1 text-slate-700 font-medium">{consultation.followUp}</p>
            </div>
          </div>

          {/* Prescription Preview Snippet */}
          {consultation.prescription && (
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">
                    Prescription #{consultation.prescription.id}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {consultation.prescription.medicines.length} prescribed medicines ({consultation.prescription.medicines.map((m) => m.name).join(', ')})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/prescriptions/${consultation.prescription?.id}`)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-blue-700 border border-blue-300 rounded text-xs font-semibold shadow-2xs transition-colors"
                >
                  View Prescription
                </button>
                {onDownloadPrescription && (
                  <button
                    onClick={() => onDownloadPrescription(consultation.prescription!.id)}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-2xs transition-colors"
                    title="Download Rx PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
