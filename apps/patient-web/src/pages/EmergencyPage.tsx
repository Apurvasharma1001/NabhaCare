import React from 'react';
import { Siren, Phone, MapPin, Ambulance, HeartPulse, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EMERGENCY_CONTACTS = [
  { label: 'National Ambulance Service', number: '108', icon: <Ambulance className="w-5 h-5" /> },
  { label: 'National Emergency Number', number: '112', icon: <Siren className="w-5 h-5" /> },
  { label: 'Civil Hospital Nabha (Direct)', number: '01765-220029', icon: <MapPin className="w-5 h-5" /> },
];

const WARNING_SIGNS = [
  'Chest pain or pressure',
  'Difficulty breathing or shortness of breath',
  'Sudden severe headache or confusion',
  'Uncontrolled bleeding',
  'Loss of consciousness or unresponsiveness',
  'Signs of stroke — facial drooping, slurred speech, arm weakness',
];

export const EmergencyPage: React.FC = () => {
  const { patient } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-red-600 rounded-xl p-6 text-white text-center">
        <Siren className="w-10 h-10 mx-auto mb-2" />
        <h2 className="text-xl font-bold">In an emergency, call for help immediately</h2>
        <p className="text-xs text-red-100 mt-1">
          Don't wait to book an online consultation — use the numbers below or go to the nearest hospital.
        </p>
      </div>

      {/* Emergency contacts */}
      <div className="grid sm:grid-cols-3 gap-4">
        {EMERGENCY_CONTACTS.map((c) => (
          <a
            key={c.number}
            href={`tel:${c.number}`}
            className="bg-white rounded-lg border border-red-200 p-4 flex flex-col items-center text-center hover:border-red-400 hover:shadow-xs transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2">
              {c.icon}
            </div>
            <p className="text-xs font-semibold text-slate-700">{c.label}</p>
            <p className="text-lg font-bold text-red-700 mt-1">{c.number}</p>
            <span className="mt-1.5 text-[11px] text-red-600 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3" /> Tap to call
            </span>
          </a>
        ))}
      </div>

      {/* Patient's own emergency contact */}
      {patient?.medicalHistory.emergencyContactName && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Your Emergency Contact</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{patient.medicalHistory.emergencyContactName}</p>
          </div>
          {patient.medicalHistory.emergencyContactPhone && (
            <a
              href={`tel:${patient.medicalHistory.emergencyContactPhone}`}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-xs font-semibold text-slate-700"
            >
              <Phone className="w-3.5 h-3.5" />
              {patient.medicalHistory.emergencyContactPhone}
            </a>
          )}
        </div>
      )}

      {/* Warning signs */}
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Seek emergency care immediately if you notice
        </h3>
        <ul className="space-y-2">
          {WARNING_SIGNS.map((sign) => (
            <li key={sign} className="text-xs text-slate-700 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              {sign}
            </li>
          ))}
        </ul>
      </div>

      {/* Your medical info reminder */}
      {patient && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <HeartPulse className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900">
            <p className="font-semibold">Share this with emergency responders</p>
            <p className="mt-1">
              Blood Group: <strong>{patient.medicalHistory.bloodGroup}</strong>
              {patient.medicalHistory.allergies.length > 0 && (
                <> • Allergies: <strong>{patient.medicalHistory.allergies.join(', ')}</strong></>
              )}
              {patient.medicalHistory.chronicConditions.length > 0 && (
                <> • Conditions: <strong>{patient.medicalHistory.chronicConditions.join(', ')}</strong></>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
