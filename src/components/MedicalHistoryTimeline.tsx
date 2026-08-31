import React from 'react';
import { Calendar, FileText, Stethoscope } from 'lucide-react';
import type { Patient } from '../types';
import { ConsultationCard } from './ConsultationCard';
import { ReportCard } from './ReportCard';

interface MedicalHistoryTimelineProps {
  patient: Patient;
  onDownloadPrescription?: (prescriptionId: string) => void;
}

export const MedicalHistoryTimeline: React.FC<MedicalHistoryTimelineProps> = ({
  patient,
  onDownloadPrescription,
}) => {
  // Combine consultations, prescriptions, and reports into a unified sorted chronological list
  const events = React.useMemo(() => {
    const list: Array<{
      id: string;
      date: string;
      type: 'consultation' | 'prescription' | 'report';
      data: any;
    }> = [];

    patient.consultationHistory.forEach((c) => {
      list.push({
        id: `c-${c.id}`,
        date: c.date,
        type: 'consultation',
        data: c,
      });
    });

    patient.prescriptions.forEach((p) => {
      list.push({
        id: `p-${p.id}`,
        date: p.date,
        type: 'prescription',
        data: p,
      });
    });

    patient.reports.forEach((r) => {
      // Convert uploadDate e.g. "21 Aug 2026" to comparable string
      list.push({
        id: `r-${r.id}`,
        date: r.uploadDate,
        type: 'report',
        data: r,
      });
    });

    return list;
  }, [patient]);

  if (events.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
        No previous medical records or consultations found for this patient.
      </div>
    );
  }

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      {patient.consultationHistory.map((consultation) => (
        <div key={consultation.id} className="relative">
          {/* Timeline Node Dot */}
          <div className="absolute -left-6 sm:-left-8 top-4 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-xs flex items-center justify-center text-white">
            <Stethoscope className="w-2.5 h-2.5" />
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Consultation Visit • {consultation.date}</span>
            </div>

            <ConsultationCard
              consultation={consultation}
              onDownloadPrescription={onDownloadPrescription}
            />
          </div>
        </div>
      ))}

      {/* Reports section in timeline */}
      {patient.reports.length > 0 && (
        <div className="relative pt-2">
          <div className="absolute -left-6 sm:-left-8 top-4 w-5 h-5 rounded-full bg-purple-600 border-4 border-white shadow-xs flex items-center justify-center text-white">
            <FileText className="w-2.5 h-2.5" />
          </div>
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Diagnostic Lab Reports Archive ({patient.reports.length})</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {patient.reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
