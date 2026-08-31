import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderHeart, User, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SourceBadge } from '../components/ui/SourceBadge';

export const PatientsListPage: React.FC = () => {
  const { patients } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.patientId.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.phone.includes(q)
      );
    });
  }, [patients, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-blue-600" />
            Patient Records Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Master Longitudinal Electronic Health Records for Nabha Sub-divisional catchment area
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Total Registered: <strong>{patients.length} Patients</strong>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient registry by name, Patient ID (PAT-XXXX), village, or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => navigate(`/patients/${patient.id}`)}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center border border-blue-200 shrink-0">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{patient.name}</h3>
                    <p className="text-[11px] text-slate-500 font-mono">{patient.patientId}</p>
                  </div>
                </div>
                <SourceBadge source={patient.source} size="sm" />
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {patient.age}y, {patient.gender} • Blood Group: <strong>{patient.medicalHistory.bloodGroup}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Village: {patient.village}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{patient.phone}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  Past Visits: <strong>{patient.consultationHistory.length}</strong>
                </span>
                <span className="text-[11px] text-slate-500">
                  Prescriptions: <strong>{patient.prescriptions.length}</strong>
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
              <span>View Longitudinal Record</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
