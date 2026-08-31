import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  History,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AudioPanel } from '../components/AudioPanel';
import { VideoPanel } from '../components/VideoPanel';
import { ClinicalNotes } from '../components/ClinicalNotes';
import type { ClinicalNotesData } from '../components/ClinicalNotes';
import { PrescriptionBuilder } from '../components/PrescriptionBuilder';
import { PrescriptionPreview } from '../components/PrescriptionPreview';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import type { Medicine, Prescription } from '../types';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';

export const ConsultationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { doctor, getPatientById, completeConsultation } = useApp();

  const patient = getPatientById(id || '');

  // Workspace Mode: 'audio' | 'video'
  const [mediaMode, setMediaMode] = useState<'audio' | 'video'>('audio');

  // Collapsible History Side Panel
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState<boolean>(false);
  const [historyTab, setHistoryTab] = useState<'overview' | 'visits' | 'prescriptions' | 'reports'>('overview');

  // Clinical Notes State
  const [notes, setNotes] = useState<ClinicalNotesData>({
    chiefComplaint: patient?.symptoms.join(', ') ? `Fever, ${patient.symptoms.join(', ')} for ${patient.symptomDuration}` : 'Acute febrile illness with respiratory symptoms',
    symptomsDiscussed: 'High fever (102°F), dry-to-productive cough, body ache, mild exertional dyspnea',
    clinicalNotes: 'Vitals: BP 130/84 mmHg, HR 88 bpm, SpO2 97% on room air, Temp 102.2°F. Chest auscultation shows bilateral coarse crepitations in lower zones. Pharynx mildly hyperemic. Dehydration signs noted.',
    assessment: 'Acute Bacterial / Viral Bronchopneumonia with moderate dehydration in diabetic patient.',
    advice: 'High fluid intake (3.5L/day), lukewarm saline gargles, steam inhalation TID. Maintain diabetic meal schedule.',
    followUp: 'Strict review in 72 hours. If respiratory distress or SpO2 <94%, report to Civil Hospital Nabha Emergency immediately.',
  });

  // Prescription Medicines State
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 'med-cur-1',
      name: 'Tab. Paracetamol',
      dosage: '650 mg',
      frequency: 'Three times daily (1-1-1)',
      duration: '3 days',
      instructions: 'Take after meals for fever and pain',
    },
    {
      id: 'med-cur-2',
      name: 'Tab. Azithromycin',
      dosage: '500 mg',
      frequency: 'Once daily (1-0-0)',
      duration: '5 days',
      instructions: 'Take 1 hour before breakfast on empty stomach',
    },
    {
      id: 'med-cur-3',
      name: 'Syr. Ambroxol + Guaifenesin',
      dosage: '10 ml',
      frequency: 'Three times daily (1-1-1)',
      duration: '5 days',
      instructions: 'Take with warm water after food',
    },
    {
      id: 'med-cur-4',
      name: 'Electrolyte ORS Sachet',
      dosage: '1 sachet in 1L boiled water',
      frequency: 'Sip throughout the day',
      duration: '3 days',
      instructions: 'Maintain adequate hydration',
    },
  ]);

  // Modal states
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [showCompleteConfirmModal, setShowCompleteConfirmModal] = useState<boolean>(false);
  const [completedSuccessData, setCompletedSuccessData] = useState<{
    consultationId: string;
    prescriptionId?: string;
  } | null>(null);

  if (!patient) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">Patient Record Not Found</h3>
        <button
          onClick={() => navigate('/queue')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Return to Queue
        </button>
      </div>
    );
  }

  // Construct draft prescription for preview
  const draftPrescription: Prescription = {
    id: `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    patientId: patient.id,
    patientName: patient.name,
    patientAge: patient.age,
    patientGender: patient.gender,
    patientVillage: patient.village,
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorSpecialization: doctor.specialization,
    hospitalName: doctor.hospital,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    medicines,
    instructions: notes.advice || 'Take medicines strictly as directed.',
    followUp: notes.followUp || 'Review in 3 days.',
    doctorNotes: notes.clinicalNotes,
    status: 'Active',
    createdAt: new Date().toISOString(),
  };

  const handleCompleteConsultation = () => {
    const result = completeConsultation(
      patient.id,
      {
        patientId: patient.id,
        patientName: patient.name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialization: doctor.specialization,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationMinutes: 18,
        symptoms: patient.symptoms,
        chiefComplaint: notes.chiefComplaint,
        clinicalNotes: notes.clinicalNotes,
        assessment: notes.assessment,
        advice: notes.advice,
        followUp: notes.followUp,
        channel: mediaMode === 'video' ? 'Video' : 'Audio',
        status: 'Completed',
        vitals: {
          bloodPressure: '130/84 mmHg',
          pulseRate: '88 bpm',
          temperature: '102.2°F',
          spO2: '97%',
        },
      },
      medicines.length > 0
        ? {
            patientId: patient.id,
            patientName: patient.name,
            patientAge: patient.age,
            patientGender: patient.gender,
            patientVillage: patient.village,
            doctorId: doctor.id,
            doctorName: doctor.name,
            doctorSpecialization: doctor.specialization,
            hospitalName: doctor.hospital,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            medicines,
            instructions: notes.advice,
            followUp: notes.followUp,
            doctorNotes: notes.clinicalNotes,
            status: 'Completed',
          }
        : undefined
    );

    setShowCompleteConfirmModal(false);
    setCompletedSuccessData(result);
  };

  // SUCCESS SCREEN AFTER CONSULTATION COMPLETION
  if (completedSuccessData) {
    return (
      <div className="max-w-2xl mx-auto my-8 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">Consultation Completed Successfully</h2>
          <p className="text-xs text-slate-500 mt-1">
            Clinical encounter for <strong>{patient.name}</strong> has been archived to permanent EHR records.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2 max-w-lg mx-auto">
          <div className="flex justify-between">
            <span className="text-slate-500">Patient:</span>
            <strong className="text-slate-900">{patient.name} ({patient.patientId})</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Channel / Village:</span>
            <span className="text-slate-800">{patient.source} • {patient.village}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Prescription Issued:</span>
            <strong className="text-blue-700 font-mono">
              {completedSuccessData.prescriptionId || 'None'} ({medicines.length} items)
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery Status:</span>
            <span className="text-emerald-700 font-semibold">
              ✓ Dispatched to Patient SMS & ASHA Field Portal
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {completedSuccessData.prescriptionId && (
            <button
              onClick={() => generatePrescriptionPDF({ ...draftPrescription, id: completedSuccessData.prescriptionId! })}
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Prescription PDF</span>
            </button>
          )}

          <button
            onClick={() => navigate('/queue')}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Priority Queue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Patient Consultation Status Strip */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center border border-blue-200 shrink-0">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">{patient.name}</h2>
              <span className="text-xs bg-slate-100 font-mono px-2 py-0.5 rounded text-slate-700">
                {patient.patientId}
              </span>
              <span className="text-xs bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded border border-blue-200">
                Token {patient.tokenNumber}
              </span>
              <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded uppercase">
                {patient.priority}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {patient.age}y, {patient.gender} • {patient.village} • Entry: {patient.source}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            <span>{isHistoryCollapsed ? 'Show Medical History' : 'Hide Medical History'}</span>
          </button>

          <button
            onClick={() => setShowCompleteConfirmModal(true)}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete Consultation</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Collapsible Patient History Sidebar */}
        {!isHistoryCollapsed && (
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <History className="w-4 h-4 text-blue-600" />
                  <span>In-Call Patient EHR</span>
                </div>
                <span className="text-[10px] text-slate-400">Longitudinal</span>
              </div>

              {/* History Sub-tabs */}
              <div className="flex border-b border-slate-200 bg-slate-100/60 p-1 gap-1 text-[11px] font-semibold">
                <button
                  onClick={() => setHistoryTab('overview')}
                  className={`flex-1 py-1.5 rounded transition-all ${
                    historyTab === 'overview' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setHistoryTab('visits')}
                  className={`flex-1 py-1.5 rounded transition-all ${
                    historyTab === 'visits' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Visits ({patient.consultationHistory.length})
                </button>
                <button
                  onClick={() => setHistoryTab('prescriptions')}
                  className={`flex-1 py-1.5 rounded transition-all ${
                    historyTab === 'prescriptions' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Rx ({patient.prescriptions.length})
                </button>
                <button
                  onClick={() => setHistoryTab('reports')}
                  className={`flex-1 py-1.5 rounded transition-all ${
                    historyTab === 'reports' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Docs ({patient.reports.length})
                </button>
              </div>

              {/* In-Call History Body */}
              <div className="p-4 max-h-[600px] overflow-y-auto space-y-4 text-xs">
                {historyTab === 'overview' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-red-900">
                      <div className="font-bold text-[11px] uppercase tracking-wider text-red-800">
                        Critical Triage Recommendation
                      </div>
                      <p className="mt-1 font-semibold">{patient.triageRecommendation}</p>
                      <p className="text-[11px] mt-0.5 text-red-700">{patient.triageReason}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="font-bold text-[11px] uppercase tracking-wider text-slate-700">
                        Allergies & Comorbidities
                      </div>
                      <div className="mt-1 text-xs text-slate-800">
                        <div>
                          Allergies:{' '}
                          <strong className="text-red-700">
                            {patient.medicalHistory.allergies.join(', ') || 'None'}
                          </strong>
                        </div>
                        <div className="mt-0.5">
                          Conditions:{' '}
                          <strong>{patient.medicalHistory.chronicConditions.join(', ') || 'None'}</strong>
                        </div>
                      </div>
                    </div>

                    {patient.consultationHistory.length > 0 && (
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-200">
                        <div className="font-bold text-[11px] text-blue-900 uppercase">
                          Last Visit: {patient.consultationHistory[0].date} ({patient.consultationHistory[0].doctorName})
                        </div>
                        <p className="text-slate-700 mt-1 leading-relaxed text-[11px]">
                          {patient.consultationHistory[0].assessment}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {historyTab === 'visits' && (
                  <div className="space-y-3">
                    {patient.consultationHistory.map((c) => (
                      <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{c.date}</span>
                          <span className="text-blue-600">{c.doctorName}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-medium">{c.chiefComplaint}</p>
                        <p className="text-[11px] text-slate-500 italic">{c.assessment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {historyTab === 'prescriptions' && (
                  <div className="space-y-3">
                    {patient.prescriptions.map((rx) => (
                      <div key={rx.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                        <div className="flex justify-between font-mono font-bold text-blue-700">
                          <span>#{rx.id}</span>
                          <span className="text-slate-500 font-sans text-[10px]">{rx.date}</span>
                        </div>
                        <div className="text-[11px] text-slate-800">
                          {rx.medicines.map((m, i) => (
                            <div key={i}>• {m.name} ({m.dosage})</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {historyTab === 'reports' && (
                  <div className="space-y-3">
                    {patient.reports.map((rep) => (
                      <div key={rep.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-900 text-xs">{rep.name}</div>
                        <div className="text-[10px] text-slate-500">{rep.uploadDate} • {rep.size}</div>
                        {rep.summary && <p className="text-[11px] text-slate-700 mt-1">{rep.summary}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Audio/Video Telemedicine + Clinical Notes + Prescription Builder */}
        <div className={`${isHistoryCollapsed ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-5`}>
          
          {/* Top Audio/Video Telehealth Interface */}
          {mediaMode === 'audio' ? (
            <AudioPanel
              patient={patient}
              onUpgradeToVideo={() => setMediaMode('video')}
              onEndConsultation={() => setShowCompleteConfirmModal(true)}
            />
          ) : (
            <VideoPanel
              patient={patient}
              onDowngradeToAudio={() => setMediaMode('audio')}
              onEndConsultation={() => setShowCompleteConfirmModal(true)}
            />
          )}

          {/* Clinical Notes Editor */}
          <ClinicalNotes
            patientName={patient.name}
            onChange={(updatedNotes) => setNotes(updatedNotes)}
          />

          {/* Structured Prescription Builder */}
          <PrescriptionBuilder
            medicines={medicines}
            onChange={(updatedMedicines) => setMedicines(updatedMedicines)}
            onPreview={() => setShowPreviewModal(true)}
          />

          {/* Bottom Complete Consultation Action Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Prescription Draft: <strong>{medicines.length} Medicines</strong> • Clinical Notes: <strong>Saved Locally</strong>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                disabled={medicines.length === 0}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <FileText className="w-4 h-4" />
                <span>Preview Prescription</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCompleteConfirmModal(true)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Consultation & Dispatch Rx</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Prescription Preview Modal */}
      <PrescriptionPreview
        prescription={draftPrescription}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />

      {/* Complete Consultation Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCompleteConfirmModal}
        title="Complete Clinical Consultation?"
        confirmLabel="Authorize & Complete Consultation"
        variant="success"
        onConfirm={handleCompleteConsultation}
        onCancel={() => setShowCompleteConfirmModal(false)}
      >
        <div className="space-y-3">
          <p className="leading-relaxed">
            You are finalizing the tele-consultation encounter for <strong>{patient.name}</strong> ({patient.village}).
          </p>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Clinical Observations:</span>
              <strong className="text-emerald-700">✓ Notes Captured</strong>
            </div>
            <div className="flex justify-between">
              <span>Prescription Formulations:</span>
              <strong>{medicines.length} Medicines Added</strong>
            </div>
            <div className="flex justify-between">
              <span>Consultation Mode:</span>
              <span>{mediaMode === 'video' ? 'Video' : 'Audio-First Telehealth'}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Once completed, this consultation and prescription will be committed to the patient's permanent longitudinal medical record and dispatched to their registered phone.
          </p>
        </div>
      </ConfirmationModal>
    </div>
  );
};
