import React, { useState } from 'react';
import { Award, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { doctor, updateDoctorProfile, doctorAvailability, setDoctorAvailability } = useApp();

  const [formData, setFormData] = useState({
    name: doctor.name,
    specialization: doctor.specialization,
    hospital: doctor.hospital,
    email: doctor.email,
    phone: doctor.phone,
    workingHours: doctor.workingHours,
    experienceYears: doctor.experienceYears,
    qualification: doctor.qualification,
    regNumber: doctor.regNumber,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorProfile(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{doctor.name}</h2>
              <span className="text-xs font-mono bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-bold">
                {doctor.doctorId}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{doctor.specialization} • {doctor.hospital}</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  doctorAvailability === 'AVAILABLE' ? 'bg-emerald-500' : doctorAvailability === 'BUSY' ? 'bg-amber-500' : 'bg-slate-500'
                }`}
              />
              <span className="text-xs font-bold uppercase text-slate-700">Station Status: {doctorAvailability}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['AVAILABLE', 'BUSY', 'OFFLINE'].map((st) => (
            <button
              key={st}
              onClick={() => setDoctorAvailability(st as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                doctorAvailability === st
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Award className="w-4 h-4 text-blue-600" />
            Doctor Credentials & Hospital Station Details
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Medical Specialization</label>
            <input
              type="text"
              required
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hospital / Telemedicine Station</label>
            <input
              type="text"
              required
              value={formData.hospital}
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Years of Clinical Experience</label>
            <input
              type="number"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Qualifications / Degrees</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Medical Council Registration No.</label>
            <input
              type="text"
              value={formData.regNumber}
              onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Shift / Duty Hours</label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
