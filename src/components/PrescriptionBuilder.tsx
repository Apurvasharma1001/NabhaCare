import React, { useState } from 'react';
import { Pill, Plus, Trash2, Eye } from 'lucide-react';
import type { Medicine } from '../types';

interface PrescriptionBuilderProps {
  medicines: Medicine[];
  onChange: (medicines: Medicine[]) => void;
  onPreview: () => void;
}

const COMMON_RURAL_MEDICINES = [
  { name: 'Tab. Paracetamol', dosage: '500 mg', frequency: 'Twice daily (1-0-1)', duration: '3 days', instructions: 'After food for fever' },
  { name: 'Tab. Azithromycin', dosage: '500 mg', frequency: 'Once daily (1-0-0)', duration: '3 days', instructions: 'Take 1 hour before breakfast' },
  { name: 'Tab. Cetirizine', dosage: '10 mg', frequency: 'Once at night (0-0-1)', duration: '5 days', instructions: 'At bedtime' },
  { name: 'Electrolyte ORS Sachet', dosage: '1 pkt in 1L water', frequency: 'Sip as needed', duration: '3 days', instructions: 'Maintain hydration' },
  { name: 'Tab. Metformin HCl SR', dosage: '500 mg', frequency: 'Twice daily (1-0-1)', duration: '30 days', instructions: 'With meals' },
  { name: 'Tab. Telmisartan', dosage: '40 mg', frequency: 'Once morning (1-0-0)', duration: '30 days', instructions: 'Before breakfast' },
  { name: 'Syr. Cough Expectorant', dosage: '10 ml', frequency: 'Three times (1-1-1)', duration: '5 days', instructions: 'After meals with warm water' },
];

export const PrescriptionBuilder: React.FC<PrescriptionBuilderProps> = ({
  medicines,
  onChange,
  onPreview,
}) => {
  const [newMed, setNewMed] = useState<Medicine>({
    id: '',
    name: '',
    dosage: '',
    frequency: 'Twice daily (1-0-1)',
    duration: '5 days',
    instructions: 'Take after food',
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMedicine = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMed.name.trim()) return;

    const medToAdd: Medicine = {
      ...newMed,
      id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    };

    onChange([...medicines, medToAdd]);
    setNewMed({
      id: '',
      name: '',
      dosage: '',
      frequency: 'Twice daily (1-0-1)',
      duration: '5 days',
      instructions: 'Take after food',
    });
    setShowAddForm(false);
  };

  const handleQuickAdd = (preset: typeof COMMON_RURAL_MEDICINES[0]) => {
    const medToAdd: Medicine = {
      ...preset,
      id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    };
    onChange([...medicines, medToAdd]);
  };

  const handleRemoveMedicine = (id: string) => {
    onChange(medicines.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Pill className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Prescription Builder ({medicines.length} Prescribed Medicines)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreview}
            disabled={medicines.length === 0}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Prescription PDF</span>
          </button>
        </div>
      </div>

      {/* Quick Suggestions Pills */}
      <div>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
          Quick Add Formulary Presets (Common Primary Care Items):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_RURAL_MEDICINES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickAdd(preset)}
              className="text-[11px] bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 px-2.5 py-1 rounded-md transition-colors border border-slate-200 flex items-center gap-1 font-medium"
            >
              <Plus className="w-3 h-3 text-blue-600" />
              <span>{preset.name} ({preset.dosage})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="text-[11px] font-bold text-slate-500 border-b border-slate-200 bg-slate-50">
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Medicine Name & Formulation</th>
              <th className="py-2.5 px-3">Dosage</th>
              <th className="py-2.5 px-3">Frequency</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3">Instructions</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {medicines.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-400 text-xs">
                  No medicines added to this prescription yet. Use presets above or click '+ Add Custom Medicine'.
                </td>
              </tr>
            ) : (
              medicines.map((med, index) => (
                <tr key={med.id || index} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">{index + 1}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{med.name}</td>
                  <td className="py-2.5 px-3 font-semibold text-blue-700 bg-blue-50/40 rounded">
                    {med.dosage}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{med.frequency}</td>
                  <td className="py-2.5 px-3 text-slate-700">{med.duration}</td>
                  <td className="py-2.5 px-3 text-slate-500 italic">{med.instructions}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(med.id)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      title="Remove Medicine"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Custom Medicine Form */}
      {showAddForm ? (
        <form
          onSubmit={handleAddMedicine}
          className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3"
        >
          <div className="font-bold text-slate-800 text-xs">Add Custom Medicine to Prescription</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Medicine Name & Formulation</label>
              <input
                type="text"
                required
                placeholder="e.g. Tab. Amoxicillin + Clav"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Strength / Dosage</label>
              <input
                type="text"
                placeholder="e.g. 625 mg"
                value={newMed.dosage}
                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
              <select
                value={newMed.frequency}
                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
              >
                <option>Once daily morning (1-0-0)</option>
                <option>Twice daily (1-0-1)</option>
                <option>Three times daily (1-1-1)</option>
                <option>Once daily at bedtime (0-0-1)</option>
                <option>As needed for fever (SOS)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g. 5 days, 30 days"
                value={newMed.duration}
                onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Special Patient Instructions</label>
              <input
                type="text"
                placeholder="e.g. Take immediately after meals with warm water"
                value={newMed.instructions}
                onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
            >
              Add to Prescription
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Custom Medicine Formulation</span>
        </button>
      )}
    </div>
  );
};
