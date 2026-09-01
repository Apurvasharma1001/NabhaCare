import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  ArrowUpDown,
  Info,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QueueTable } from '../components/QueueTable';

export const QueuePage: React.FC = () => {
  const { doctor, doctorAvailability, setDoctorAvailability, patients, stats } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedSource, setSelectedSource] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('Waiting');
  const [sortBy, setSortBy] = useState<'priority' | 'waiting' | 'arrival'>('priority');

  // Filter and sort patients
  const filteredPatients = useMemo(() => {
    return patients
      .filter((patient) => {
        // Status filter
        if (selectedStatus !== 'ALL' && patient.queueStatus !== selectedStatus) {
          return false;
        }

        // Priority filter
        if (selectedPriority !== 'ALL' && patient.priority !== selectedPriority) {
          return false;
        }

        // Source filter
        if (selectedSource !== 'ALL' && patient.source !== selectedSource) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = patient.name.toLowerCase().includes(q);
          const matchToken = patient.tokenNumber.toLowerCase().includes(q);
          const matchId = patient.patientId.toLowerCase().includes(q);
          const matchVillage = patient.village.toLowerCase().includes(q);
          const matchPhone = patient.phone.includes(q);
          const matchSymptoms = patient.symptoms.some((s) => s.toLowerCase().includes(q));

          if (!matchName && !matchToken && !matchId && !matchVillage && !matchPhone && !matchSymptoms) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityWeight = { URGENT: 3, MEDIUM: 2, LOW: 1 };
          const aWeight = priorityWeight[a.effectivePriority || a.priority];
          const bWeight = priorityWeight[b.effectivePriority || b.priority];
          if (bWeight !== aWeight) return bWeight - aWeight;
          return b.waitingMinutes - a.waitingMinutes;
        } else if (sortBy === 'waiting') {
          return b.waitingMinutes - a.waitingMinutes;
        } else {
          return a.arrivalTime.localeCompare(b.arrivalTime);
        }
      });
  }, [patients, selectedStatus, selectedPriority, selectedSource, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Station Header with Availability Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Unified Clinical Triage Queue</h2>
            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
              Live Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Doctor on Duty: <strong>{doctor.name}</strong> ({doctor.specialization}) • Station: <strong>{doctor.hospital}</strong>
          </p>
        </div>

        {/* Doctor Availability Buttons */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
          <span className="text-xs font-semibold text-slate-600 px-2">Station Mode:</span>
          <button
            onClick={() => setDoctorAvailability('AVAILABLE')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              doctorAvailability === 'AVAILABLE'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            ● Available
          </button>
          <button
            onClick={() => setDoctorAvailability('BUSY')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              doctorAvailability === 'BUSY'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            ● Busy
          </button>
          <button
            onClick={() => setDoctorAvailability('OFFLINE')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              doctorAvailability === 'OFFLINE'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            ● Offline
          </button>
        </div>
      </div>

      {/* Queue Stat Pill Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-slate-200 p-3.5 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Waiting</div>
            <div className="text-2xl font-bold text-slate-900">{stats.patientsWaiting}</div>
          </div>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-red-200 bg-red-50/20 p-3.5 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[11px] font-bold text-red-700 uppercase">Urgent Cases</div>
            <div className="text-2xl font-bold text-red-700">{stats.urgentPatients}</div>
          </div>
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-amber-200 bg-amber-50/20 p-3.5 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[11px] font-bold text-amber-800 uppercase">Medium Priority</div>
            <div className="text-2xl font-bold text-amber-800">{stats.mediumPriority}</div>
          </div>
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-emerald-200 bg-emerald-50/20 p-3.5 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase">Low Priority</div>
            <div className="text-2xl font-bold text-emerald-800">{stats.lowPriority}</div>
          </div>
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Starvation Prevention & AI Medical Safety Banner */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3.5 text-xs text-blue-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Intelligent Rural Triage Protocol:</strong> Priority is assigned via AI/Rule-based triage recommendations (urgency recommendation — not a medical diagnosis). Bounded starvation prevention prevents low-priority patients from waiting indefinitely (&gt;40 min), while critical emergencies strictly retain clinical precedence.
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, token #, phone, symptoms, or village..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 text-slate-700 font-medium"
            >
              <option value="priority">Clinical Priority (Urgent First)</option>
              <option value="waiting">Wait Time (Longest First)</option>
              <option value="arrival">Arrival Time (Earliest First)</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs">
          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Priority:</span>
            {['ALL', 'URGENT', 'MEDIUM', 'LOW'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedPriority === p
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Source Channel Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Channel:</span>
            {['ALL', 'APP', 'USSD', 'ASHA'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSource(s)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedSource === s
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s === 'ALL' ? 'All Channels' : s === 'USSD' ? 'SMS / USSD' : s === 'APP' ? 'Mobile App' : 'ASHA Worker'}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 flex-wrap ml-auto">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Status:</span>
            {['Waiting', 'Completed', 'ALL'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedStatus === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Queue Table Result */}
      <QueueTable patients={filteredPatients} />
    </div>
  );
};
