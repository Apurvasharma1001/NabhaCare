import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MapPin, Pill, FileText, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/ui/EmptyState';
import type { Prescription } from '../types';

export const ConsultationsPage: React.FC = () => {
  const { consultations, prescriptions } = useApp();
  const [tab, setTab] = useState<'consultations' | 'prescriptions'>('consultations');
  const [activeRx, setActiveRx] = useState<Prescription | null>(null);

  const channelIcon = (channel: string) => {
    if (channel === 'Video') return <Video className="w-3.5 h-3.5" />;
    if (channel === 'Audio') return <Phone className="w-3.5 h-3.5" />;
    return <MapPin className="w-3.5 h-3.5" />;
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Consultations & Prescriptions</h2>
        <p className="text-xs text-slate-500 mt-0.5">Your complete visit history with Nabha Telemedicine.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab('consultations')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            tab === 'consultations' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Consultations ({consultations.length})
        </button>
        <button
          onClick={() => setTab('prescriptions')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            tab === 'prescriptions' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Prescriptions ({prescriptions.length})
        </button>
      </div>

      {tab === 'consultations' ? (
        consultations.length === 0 ? (
          <EmptyState title="No consultations yet" description="Book your first appointment to get started." icon="file" />
        ) : (
          <div className="space-y-3">
            {consultations.map((c) => (
              <div key={c.id} className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{c.doctorName}</p>
                    <p className="text-xs text-slate-500">{c.doctorSpecialization}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {c.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {c.time}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-md">
                      {channelIcon(c.channel)}
                      {c.channel}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[10px] mb-0.5">Chief Complaint</p>
                    <p className="text-slate-700">{c.chiefComplaint}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[10px] mb-0.5">Assessment</p>
                    <p className="text-slate-700">{c.assessment}</p>
                  </div>
                </div>

                {c.vitals && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.vitals.bloodPressure && <VitalPill label="BP" value={c.vitals.bloodPressure} />}
                    {c.vitals.pulseRate && <VitalPill label="Pulse" value={c.vitals.pulseRate} />}
                    {c.vitals.temperature && <VitalPill label="Temp" value={c.vitals.temperature} />}
                    {c.vitals.spO2 && <VitalPill label="SpO2" value={c.vitals.spO2} />}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Follow-up: {c.followUp}</span>
                  {c.prescriptionId && (
                    <button
                      onClick={() => {
                        const rx = prescriptions.find((p) => p.id === c.prescriptionId);
                        if (rx) {
                          setActiveRx(rx);
                          setTab('prescriptions');
                        }
                      }}
                      className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Pill className="w-3.5 h-3.5" />
                      View Prescription
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : prescriptions.length === 0 ? (
        <EmptyState title="No prescriptions yet" description="Prescriptions from your consultations will appear here." icon="file" />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {prescriptions.map((rx) => (
            <button
              key={rx.id}
              onClick={() => setActiveRx(rx)}
              className="text-left bg-white rounded-lg border border-slate-200 p-4 hover:border-blue-300 hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-700">{rx.id}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    rx.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {rx.status}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900 mt-2">{rx.doctorName}</p>
              <p className="text-xs text-slate-500">{rx.doctorSpecialization} • {rx.date}</p>
              <p className="text-xs text-slate-600 mt-2">{rx.medicines.length} medicine(s) prescribed</p>
            </button>
          ))}
        </div>
      )}

      {/* Prescription detail modal */}
      {activeRx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  {activeRx.id}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{activeRx.hospitalName} • {activeRx.date}</p>
              </div>
              <button onClick={() => setActiveRx(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px] mb-1">Prescribed By</p>
                <p className="text-slate-800 font-semibold">{activeRx.doctorName}</p>
                <p className="text-slate-500">{activeRx.doctorSpecialization}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px] mb-2">Medicines</p>
                <div className="space-y-2">
                  {activeRx.medicines.map((m) => (
                    <div key={m.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                      <p className="font-semibold text-slate-800">{m.name}</p>
                      <p className="text-slate-500 mt-0.5">
                        {m.dosage} • {m.frequency} • {m.duration}
                      </p>
                      {m.instructions && <p className="text-slate-400 mt-0.5 italic">{m.instructions}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px] mb-1">Instructions</p>
                <p className="text-slate-700">{activeRx.instructions}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px] mb-1">Follow-up</p>
                <p className="text-slate-700">{activeRx.followUp}</p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveRx(null)}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VitalPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] text-slate-600">
    <strong className="text-slate-800">{label}:</strong> {value}
  </span>
);
