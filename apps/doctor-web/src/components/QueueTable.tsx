import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../types';
import { PriorityBadge } from './ui/PriorityBadge';
import { Play, Eye, Clock, MapPin } from 'lucide-react';

interface QueueTableProps {
  patients: Patient[];
  onSelectPatient?: (patient: Patient) => void;
}

export const QueueTable: React.FC<QueueTableProps> = ({ patients }) => {
  const navigate = useNavigate();

  if (patients.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
        No patients match the selected filter criteria.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Token</th>
              <th className="py-3 px-4">Patient Info</th>
              <th className="py-3 px-4">Priority / Triage</th>
              <th className="py-3 px-4">Arrival</th>
              <th className="py-3 px-4">Wait Time</th>
              <th className="py-3 px-4">Chief Complaint / Symptoms</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Clinical Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => navigate(`/patients/${patient.id}`)}
                className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                  patient.priority === 'URGENT' ? 'bg-red-50/15' : ''
                }`}
              >
                {/* Token */}
                <td className="py-3 px-4 font-mono font-bold text-sm text-slate-900">
                  {patient.tokenNumber}
                </td>

                {/* Patient Info */}
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900 text-xs">{patient.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>
                      {patient.age}y, {patient.gender}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {patient.village}
                    </span>
                  </div>
                </td>

                {/* Priority */}
                <td className="py-3 px-4">
                  <PriorityBadge
                    priority={patient.priority}
                    effectivePriority={patient.effectivePriority}
                    isStarvationAdjusted={patient.isStarvationAdjusted}
                  />
                </td>

                {/* Arrival Time */}
                <td className="py-3 px-4 font-medium text-slate-700">{patient.arrivalTime}</td>

                {/* Waiting Time */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span
                      className={`font-bold ${
                        patient.waitingMinutes >= 20
                          ? 'text-red-600'
                          : patient.waitingMinutes >= 10
                          ? 'text-amber-600'
                          : 'text-slate-700'
                      }`}
                    >
                      {patient.waitingMinutes} min
                    </span>
                  </div>
                </td>

                {/* Symptoms */}
                <td className="py-3 px-4 max-w-[200px]">
                  <div className="text-slate-800 font-medium truncate">
                    {patient.symptoms.join(', ')}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    Duration: {patient.symptomDuration}
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      patient.queueStatus === 'Waiting'
                        ? 'bg-amber-100 text-amber-800'
                        : patient.queueStatus === 'In Consultation'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {patient.queueStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                      title="View Longitudinal Records"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/consultation/${patient.id}`)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-xs inline-flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Start Consult</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden divide-y divide-slate-200">
        {patients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => navigate(`/patients/${patient.id}`)}
            className="p-4 space-y-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm bg-slate-100 px-2 py-0.5 rounded text-slate-900">
                    {patient.tokenNumber}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{patient.name}</h4>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {patient.age}y, {patient.gender} • {patient.village}
                </p>
              </div>
              <PriorityBadge
                priority={patient.priority}
                size="sm"
                effectivePriority={patient.effectivePriority}
                isStarvationAdjusted={patient.isStarvationAdjusted}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span>Wait: <strong>{patient.waitingMinutes}m</strong></span>
              <span>•</span>
              <span className="truncate">Symptoms: {patient.symptoms.join(', ')}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500">
                Arrived: {patient.arrivalTime}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/consultation/${patient.id}`);
                }}
                className="px-3 py-1 bg-blue-600 text-white font-semibold rounded text-xs inline-flex items-center gap-1 shadow-2xs"
              >
                <Play className="w-3 h-3 fill-current" />
                Start Consult
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
