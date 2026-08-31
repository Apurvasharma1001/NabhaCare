import React, { useState } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';

export interface ClinicalNotesData {
  chiefComplaint: string;
  symptomsDiscussed: string;
  clinicalNotes: string;
  assessment: string;
  advice: string;
  followUp: string;
}

interface ClinicalNotesProps {
  initialData?: Partial<ClinicalNotesData>;
  onChange: (data: ClinicalNotesData) => void;
  patientName?: string;
}

export const ClinicalNotes: React.FC<ClinicalNotesProps> = ({
  initialData,
  onChange,
}) => {
  const [data, setData] = useState<ClinicalNotesData>({
    chiefComplaint: initialData?.chiefComplaint || 'Fever, generalized weakness, and persistent cough for 3 days',
    symptomsDiscussed: initialData?.symptomsDiscussed || 'High grade evening pyrexia, throat irritation, decreased appetite',
    clinicalNotes: initialData?.clinicalNotes || 'Patient reports fever spiking to 102°F. Mild tachypnea. Chest auscultation shows bilateral rhonchi at bases. Throat congested. Diabetic sugar control discussed.',
    assessment: initialData?.assessment || 'Acute Lower Respiratory Tract Infection / Bronchitis with mild dehydration in Type 2 Diabetic patient.',
    advice: initialData?.advice || 'Oral hydration (3L boiled water daily), light salt-reduced khichdi diet, steam inhalation BID, strict blood glucose charting.',
    followUp: initialData?.followUp || 'Follow-up in 3 days if fever does not subside or if breathing difficulty worsens.',
  });

  const [lastSaved, setLastSaved] = useState<string>('Just now');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleChange = (field: keyof ClinicalNotesData, value: string) => {
    const updated = { ...data, [field]: value };
    setData(updated);
    onChange(updated);

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Clinical Examination Notes & Assessment
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          {isSaving ? (
            <span className="text-blue-600 font-semibold animate-pulse flex items-center gap-1">
              <Clock className="w-3 h-3" /> Saving draft...
            </span>
          ) : (
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3 h-3 text-emerald-600" /> Draft saved locally ({lastSaved})
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Chief Complaint */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Chief Complaint <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.chiefComplaint}
            onChange={(e) => handleChange('chiefComplaint', e.target.value)}
            placeholder="e.g. High fever and productive cough for 3 days"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>

        {/* Symptoms Discussed */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Symptoms Discussed during Consultation
          </label>
          <input
            type="text"
            value={data.symptomsDiscussed}
            onChange={(e) => handleChange('symptomsDiscussed', e.target.value)}
            placeholder="e.g. Pyrexia, sore throat, chills"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="text-xs">
        <label className="block font-semibold text-slate-700 mb-1">
          Clinical Observations & Tele-Examination Findings
        </label>
        <textarea
          rows={3}
          value={data.clinicalNotes}
          onChange={(e) => handleChange('clinicalNotes', e.target.value)}
          placeholder="Enter clinical observations, general appearance, respiratory rate, hydration status..."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white leading-relaxed"
        />
      </div>

      {/* Assessment & Diagnosis */}
      <div className="text-xs">
        <label className="block font-semibold text-slate-700 mb-1">
          Clinical Assessment / Differential Diagnosis <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={2}
          value={data.assessment}
          onChange={(e) => handleChange('assessment', e.target.value)}
          placeholder="e.g. Acute Lower Respiratory Tract Infection, rule out viral pneumonitis"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white leading-relaxed font-medium text-slate-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Patient Advice */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Advice & Lifestyle / Dietary Guidance
          </label>
          <textarea
            rows={2}
            value={data.advice}
            onChange={(e) => handleChange('advice', e.target.value)}
            placeholder="e.g. Fluid intake, steam inhalation, rest..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>

        {/* Follow-up */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Follow-up / Red Flag Instructions
          </label>
          <textarea
            rows={2}
            value={data.followUp}
            onChange={(e) => handleChange('followUp', e.target.value)}
            placeholder="e.g. Return in 3 days if fever persists; immediate Civil Hospital visit if chest pain occurs"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
