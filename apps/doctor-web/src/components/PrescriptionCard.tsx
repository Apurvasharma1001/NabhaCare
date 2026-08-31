import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Calendar, Download, Printer, Eye, Building2 } from 'lucide-react';
import type { Prescription } from '../types';

interface PrescriptionCardProps {
  prescription: Prescription;
  onDownload?: (prescription: Prescription) => void;
  onPrint?: (prescription: Prescription) => void;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  onDownload,
  onPrint,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 transition-all">
      {/* Header */}
      <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900">
                Prescription #{prescription.id}
              </h4>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold uppercase">
                {prescription.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
              <span>{prescription.doctorName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                {prescription.hospitalName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-2">
            <Calendar className="w-3.5 h-3.5" />
            {prescription.date}
          </span>
          <button
            onClick={() => navigate(`/prescriptions/${prescription.id}`)}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
          {onDownload && (
            <button
              onClick={() => onDownload(prescription)}
              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold rounded transition-colors flex items-center gap-1 shadow-2xs"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          )}
          {onPrint && (
            <button
              onClick={() => onPrint(prescription)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
              title="Print Prescription"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Medicines Table */}
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="text-[11px] font-bold text-slate-500 border-b border-slate-200 bg-slate-50/50">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Medicine Name</th>
              <th className="py-2 px-3">Dosage</th>
              <th className="py-2 px-3">Frequency</th>
              <th className="py-2 px-3">Duration</th>
              <th className="py-2 px-3">Instructions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {prescription.medicines.map((med, idx) => (
              <tr key={med.id || idx} className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                <td className="py-2.5 px-3 font-bold text-slate-900">{med.name}</td>
                <td className="py-2.5 px-3 font-semibold text-blue-700 bg-blue-50/40 rounded">
                  {med.dosage}
                </td>
                <td className="py-2.5 px-3 text-slate-700">{med.frequency}</td>
                <td className="py-2.5 px-3 text-slate-700">{med.duration}</td>
                <td className="py-2.5 px-3 text-slate-500 italic text-[11px]">
                  {med.instructions || 'As directed'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Doctor Instructions / Notes Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-4 text-xs text-slate-600">
          <div className="flex-1">
            <strong>General Instructions:</strong> {prescription.instructions}
          </div>
          {prescription.followUp && (
            <div className="sm:w-1/3">
              <strong>Follow-up:</strong> {prescription.followUp}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
