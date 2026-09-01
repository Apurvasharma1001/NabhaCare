import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { patient, updateProfile, addToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: patient?.name || '',
    phone: patient?.phone || '',
    village: patient?.village || '',
  });

  if (!patient) return null;

  const save = () => {
    updateProfile(form);
    setIsEditing(false);
    addToast({ type: 'success', title: 'Profile updated' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-4">
          <img
            src={patient.avatarUrl}
            alt={patient.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900">{patient.name}</h2>
            <p className="text-xs text-slate-500">{patient.patientId} • Registered {patient.registrationDate}</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 border border-slate-300 text-slate-600 rounded-md hover:bg-slate-50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={save}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                <Save className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <FieldRow icon={<User className="w-4 h-4" />} label="Full Name">
            {isEditing ? (
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            ) : (
              <span className="text-sm font-semibold text-slate-800">{patient.name}</span>
            )}
          </FieldRow>
          <FieldRow icon={<Mail className="w-4 h-4" />} label="Email">
            <span className="text-sm font-semibold text-slate-800">{patient.email}</span>
          </FieldRow>
          <FieldRow icon={<Phone className="w-4 h-4" />} label="Phone">
            {isEditing ? (
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            ) : (
              <span className="text-sm font-semibold text-slate-800">{patient.phone}</span>
            )}
          </FieldRow>
          <FieldRow icon={<MapPin className="w-4 h-4" />} label="Village / City">
            {isEditing ? (
              <input
                className={inputClass}
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
              />
            ) : (
              <span className="text-sm font-semibold text-slate-800">{patient.village}</span>
            )}
          </FieldRow>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 text-center">
        To update medical details like blood group or allergies, go to Health Records.
      </p>
    </div>
  );
};

const inputClass =
  'w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white';

const FieldRow: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({
  icon,
  label,
  children,
}) => (
  <div className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-b-0">
    <div className="w-8 h-8 rounded-md bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <div className="mt-0.5">{children}</div>
    </div>
  </div>
);
