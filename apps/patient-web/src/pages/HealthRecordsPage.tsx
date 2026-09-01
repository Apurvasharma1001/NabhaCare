import React, { useState } from 'react';
import { Droplet, ShieldAlert, Pill, Stethoscope, Users, Phone, Edit2, Save, X, Ruler, Weight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

export const HealthRecordsPage: React.FC = () => {
  const { patient, updateMedicalHistory, addToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(patient?.medicalHistory);

  if (!patient || !form) return null;

  const startEdit = () => {
    setForm(patient.medicalHistory);
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setForm(patient.medicalHistory);
    setIsEditing(false);
  };
  const save = () => {
    updateMedicalHistory(form);
    setIsEditing(false);
    addToast({ type: 'success', title: 'Health records updated' });
  };

  const listToText = (arr: string[]) => arr.join(', ');
  const textToList = (text: string) => text.split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Health Records</h2>
          <p className="text-xs text-slate-500 mt-0.5">Keep this up to date so doctors can treat you safely.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={startEdit}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Records
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={cancelEdit}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              onClick={save}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vitals card */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Droplet className="w-4 h-4 text-red-600" />
            Core Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <RecordItem label="Blood Group">
              {isEditing ? (
                <select
                  className={selectClass}
                  value={form.bloodGroup}
                  onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-lg font-bold text-red-700">{patient.medicalHistory.bloodGroup}</span>
              )}
            </RecordItem>
            <RecordItem label="Height" icon={<Ruler className="w-3.5 h-3.5" />}>
              {isEditing ? (
                <input
                  className={inputClass}
                  value={form.height || ''}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                  placeholder="e.g. 160 cm"
                />
              ) : (
                <span className="text-sm font-semibold text-slate-800">{patient.medicalHistory.height || '—'}</span>
              )}
            </RecordItem>
            <RecordItem label="Weight" icon={<Weight className="w-3.5 h-3.5" />}>
              {isEditing ? (
                <input
                  className={inputClass}
                  value={form.weight || ''}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  placeholder="e.g. 68 kg"
                />
              ) : (
                <span className="text-sm font-semibold text-slate-800">{patient.medicalHistory.weight || '—'}</span>
              )}
            </RecordItem>
            <RecordItem label="Age / Gender">
              <span className="text-sm font-semibold text-slate-800">
                {patient.age} / {patient.gender}
              </span>
            </RecordItem>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Allergies
          </h3>
          {isEditing ? (
            <input
              className={inputClass}
              value={listToText(form.allergies)}
              onChange={(e) => setForm({ ...form, allergies: textToList(e.target.value) })}
              placeholder="e.g. Penicillin, Peanuts"
            />
          ) : patient.medicalHistory.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {patient.medicalHistory.allergies.map((a) => (
                <span key={a} className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-medium">
                  {a}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">No known allergies reported.</p>
          )}
        </div>

        {/* Chronic conditions */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            Chronic Conditions
          </h3>
          {isEditing ? (
            <input
              className={inputClass}
              value={listToText(form.chronicConditions)}
              onChange={(e) => setForm({ ...form, chronicConditions: textToList(e.target.value) })}
              placeholder="e.g. Diabetes, Hypertension"
            />
          ) : patient.medicalHistory.chronicConditions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {patient.medicalHistory.chronicConditions.map((c) => (
                <span key={c} className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-xs font-medium">
                  {c}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">No chronic conditions reported.</p>
          )}
        </div>

        {/* Current medications */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Pill className="w-4 h-4 text-emerald-600" />
            Current Medications
          </h3>
          {isEditing ? (
            <input
              className={inputClass}
              value={listToText(form.currentMedications)}
              onChange={(e) => setForm({ ...form, currentMedications: textToList(e.target.value) })}
              placeholder="e.g. Metformin 500mg"
            />
          ) : patient.medicalHistory.currentMedications.length > 0 ? (
            <ul className="space-y-1.5">
              {patient.medicalHistory.currentMedications.map((m) => (
                <li key={m} className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {m}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">No current medications reported.</p>
          )}
        </div>

        {/* Past surgeries */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-slate-600" />
            Past Surgeries
          </h3>
          {isEditing ? (
            <input
              className={inputClass}
              value={listToText(form.pastSurgeries)}
              onChange={(e) => setForm({ ...form, pastSurgeries: textToList(e.target.value) })}
              placeholder="e.g. Appendectomy (2018)"
            />
          ) : patient.medicalHistory.pastSurgeries.length > 0 ? (
            <ul className="space-y-1.5">
              {patient.medicalHistory.pastSurgeries.map((s) => (
                <li key={s} className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  {s}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">None reported.</p>
          )}
        </div>

        {/* Emergency contact */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Phone className="w-4 h-4 text-red-600" />
            Emergency Contact
          </h3>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <input
                className={inputClass}
                value={form.emergencyContactName}
                onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })}
                placeholder="Contact name"
              />
              <input
                className={inputClass}
                value={form.emergencyContactPhone}
                onChange={(e) => setForm({ ...form, emergencyContactPhone: e.target.value })}
                placeholder="Contact phone"
              />
            </div>
          ) : (
            <p className="text-xs text-slate-700">
              <strong>{patient.medicalHistory.emergencyContactName || '—'}</strong>
              {patient.medicalHistory.emergencyContactPhone && (
                <span className="text-slate-500"> • {patient.medicalHistory.emergencyContactPhone}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const inputClass =
  'w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white';
const selectClass = inputClass;

const RecordItem: React.FC<{ label: string; icon?: React.ReactNode; children: React.ReactNode }> = ({
  label,
  icon,
  children,
}) => (
  <div>
    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
      {icon}
      {label}
    </p>
    {children}
  </div>
);
