import React, { useState, useMemo } from 'react';
import { Pill, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrescriptionCard } from '../components/PrescriptionCard';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';
import type { Prescription } from '../types';

export const PrescriptionsPage: React.FC = () => {
  const { patients } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Aggregate all prescriptions from all patients
  const allPrescriptions = useMemo(() => {
    const list: Prescription[] = [];
    patients.forEach((p) => {
      p.prescriptions.forEach((rx) => {
        list.push(rx);
      });
    });
    // Sort by latest first
    return list.sort((a, b) => b.id.localeCompare(a.id));
  }, [patients]);

  const filteredPrescriptions = useMemo(() => {
    return allPrescriptions.filter((rx) => {
      if (statusFilter !== 'ALL' && rx.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchId = rx.id.toLowerCase().includes(q);
        const matchPatient = rx.patientName.toLowerCase().includes(q);
        const matchDoctor = rx.doctorName.toLowerCase().includes(q);
        const matchMeds = rx.medicines.some((m) => m.name.toLowerCase().includes(q));
        if (!matchId && !matchPatient && !matchDoctor && !matchMeds) return false;
      }
      return true;
    });
  }, [allPrescriptions, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            Central Prescriptions Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official repository of electronic medical prescriptions issued across Nabha Telemedicine stations
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Total Issued: <strong>{allPrescriptions.length} Prescriptions</strong>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prescriptions by Rx ID (#RX-2026-XXXX), patient name, or medicine name..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium"
          >
            <option value="ALL">All Prescriptions</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Dispensed">Dispensed</option>
          </select>
        </div>
      </div>

      {/* Prescription Cards List */}
      <div className="space-y-4">
        {filteredPrescriptions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No prescriptions found matching your query.
          </div>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
              onDownload={(rx) => generatePrescriptionPDF(rx)}
              onPrint={() => window.print()}
            />
          ))
        )}
      </div>
    </div>
  );
};
