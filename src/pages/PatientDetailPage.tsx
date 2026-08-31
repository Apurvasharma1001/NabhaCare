import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  MapPin,
  Phone,
  Play,
  Download,
  ArrowLeft,
  Activity,
  AlertCircle,
  FileText,
  Pill,
  History,
  Upload,
  HeartPulse,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { SourceBadge } from '../components/ui/SourceBadge';
import { ConsultationCard } from '../components/ConsultationCard';
import { PrescriptionCard } from '../components/PrescriptionCard';
import { ReportCard } from '../components/ReportCard';
import { MedicalHistoryTimeline } from '../components/MedicalHistoryTimeline';
import { generatePrescriptionPDF, generatePatientRecordPDF } from '../utils/pdfGenerator';

type TabType = 'overview' | 'consultations' | 'prescriptions' | 'symptoms' | 'reports' | 'timeline';

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getPatientById, addReportToPatient, addToast } = useApp();

  const patient = getPatientById(id || '');

  // Detect tab from URL path or state
  const getInitialTab = (): TabType => {
    const path = location.pathname;
    if (path.endsWith('/history') || path.includes('/consultations')) return 'consultations';
    if (path.endsWith('/prescriptions')) return 'prescriptions';
    if (path.endsWith('/reports')) return 'reports';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newReportName, setNewReportName] = useState('');
  const [newReportType, setNewReportType] = useState<'PDF' | 'PNG' | 'JPG'>('PDF');
  const [newReportSummary, setNewReportSummary] = useState('');

  if (!patient) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">Patient Record Not Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested patient ID <code>{id}</code> does not match any synchronized clinical cache.
        </p>
        <button
          onClick={() => navigate('/queue')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
        >
          Return to Queue
        </button>
      </div>
    );
  }

  const handleDownloadRecord = () => {
    generatePatientRecordPDF(patient);
    addToast({
      type: 'success',
      title: 'Patient Record Downloaded',
      message: `Full longitudinal EHR record saved for ${patient.name}.`,
    });
  };

  const handleDownloadPrescription = (prescriptionId: string) => {
    const rx = patient.prescriptions.find((p) => p.id === prescriptionId);
    if (rx) {
      generatePrescriptionPDF(rx);
      addToast({
        type: 'success',
        title: 'Prescription Downloaded',
        message: `Prescription #${rx.id} exported successfully.`,
      });
    }
  };

  const handleUploadReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportName.trim()) return;

    addReportToPatient(patient.id, {
      patientId: patient.id,
      name: newReportName.endsWith('.pdf') || newReportName.endsWith('.png') ? newReportName : `${newReportName}.${newReportType.toLowerCase()}`,
      type: newReportType,
      uploadDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      source: 'Civil Hospital Nabha',
      size: '1.4 MB',
      category: 'General',
      summary: newReportSummary || 'Uploaded by doctor during consultation review.',
    });

    setShowUploadModal(false);
    setNewReportName('');
    setNewReportSummary('');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/queue')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patient Queue</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadRecord}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Patient Record</span>
          </button>
          <button
            onClick={() => navigate(`/consultation/${patient.id}`)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Consultation</span>
          </button>
        </div>
      </div>

      {/* Patient Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold text-xl flex items-center justify-center border-2 border-blue-200 shrink-0">
              {patient.avatarUrl ? (
                <img
                  src={patient.avatarUrl}
                  alt={patient.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                patient.name.charAt(0)
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900">{patient.name}</h2>
                <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  {patient.patientId}
                </span>
                <span className="font-mono font-bold text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                  Token {patient.tokenNumber}
                </span>
                <PriorityBadge
                  priority={patient.priority}
                  effectivePriority={patient.effectivePriority}
                  isStarvationAdjusted={patient.isStarvationAdjusted}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span>
                  <strong>{patient.age}</strong> Years, {patient.gender}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {patient.village}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {patient.phone}
                </span>
                <span>•</span>
                <SourceBadge source={patient.source} size="sm" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-1 text-xs border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Status:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  patient.queueStatus === 'Waiting'
                    ? 'bg-amber-100 text-amber-800'
                    : patient.queueStatus === 'In Consultation'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {patient.queueStatus}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Arrived at <strong>{patient.arrivalTime}</strong> (Waiting {patient.waitingMinutes}m)
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center gap-1 p-1.5 border-b border-slate-200 bg-slate-50/70 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: <User className="w-3.5 h-3.5" /> },
            {
              id: 'consultations',
              label: `Consultations (${patient.consultationHistory.length})`,
              icon: <Activity className="w-3.5 h-3.5" />,
            },
            {
              id: 'prescriptions',
              label: `Prescriptions (${patient.prescriptions.length})`,
              icon: <Pill className="w-3.5 h-3.5" />,
            },
            { id: 'symptoms', label: 'Symptoms History', icon: <HeartPulse className="w-3.5 h-3.5" /> },
            {
              id: 'reports',
              label: `Reports & Docs (${patient.reports.length})`,
              icon: <FileText className="w-3.5 h-3.5" />,
            },
            { id: 'timeline', label: 'Complete Timeline', icon: <History className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-6">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Current Consultation Card */}
              <div className="bg-gradient-to-br from-blue-50/80 via-white to-slate-50 rounded-xl border border-blue-200 p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                      Current Visit Triage Summary (Today)
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                    Token {patient.tokenNumber} • {patient.source}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-500 text-[11px] uppercase">
                      Reported Symptoms & Duration
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {patient.symptoms.map((sym, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-600 text-white font-semibold px-2.5 py-0.5 rounded text-xs"
                        >
                          {sym}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Symptom Duration: <strong>{patient.symptomDuration}</strong>
                    </p>
                  </div>

                  {/* AI / Rule-based Triage Recommendation */}
                  <div className="bg-white p-3.5 rounded-lg border border-blue-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>AI / Rule-based Triage Recommendation</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-red-700">
                      {patient.triageRecommendation}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {patient.triageReason}
                    </p>
                    <p className="text-[10px] text-slate-400 italic mt-2 border-t border-slate-100 pt-1">
                      * Urgency recommendation to assist queue organization — not a medical diagnosis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical History & Chronic Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Known Allergies
                  </h4>
                  {patient.medicalHistory.allergies.length > 0 ? (
                    <ul className="space-y-1 text-xs text-red-700 font-semibold">
                      {patient.medicalHistory.allergies.map((a, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">No known drug allergies reported.</p>
                  )}
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Chronic Comorbidities
                  </h4>
                  {patient.medicalHistory.chronicConditions.length > 0 ? (
                    <ul className="space-y-1 text-xs text-slate-800 font-medium">
                      {patient.medicalHistory.chronicConditions.map((c, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">No chronic comorbidities registered.</p>
                  )}
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Clinical Identifiers
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div>
                      Blood Group: <strong className="text-slate-900">{patient.medicalHistory.bloodGroup}</strong>
                    </div>
                    <div>
                      Emergency Contact: <span className="font-mono text-[11px]">{patient.medicalHistory.emergencyContact}</span>
                    </div>
                    <div>
                      Registration: <span>{patient.registrationDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Consultation Preview if exists */}
              {patient.consultationHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Most Recent Consultation Record ({patient.consultationHistory[0].date})
                    </h4>
                    <button
                      onClick={() => setActiveTab('consultations')}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View all {patient.consultationHistory.length} visits →
                    </button>
                  </div>
                  <ConsultationCard
                    consultation={patient.consultationHistory[0]}
                    onDownloadPrescription={handleDownloadPrescription}
                  />
                </div>
              )}
            </div>
          )}

          {/* 2. CONSULTATIONS TAB */}
          {activeTab === 'consultations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Complete Longitudinal Consultation History
                  </h3>
                  <p className="text-xs text-slate-500">
                    Append-only clinical encounter records across all doctors at Nabha Hub
                  </p>
                </div>
              </div>

              {patient.consultationHistory.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                  No prior consultations recorded for this patient.
                </div>
              ) : (
                patient.consultationHistory.map((consultation) => (
                  <ConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    onDownloadPrescription={handleDownloadPrescription}
                  />
                ))
              )}
            </div>
          )}

          {/* 3. PRESCRIPTIONS TAB */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Issued Prescriptions</h3>
                  <p className="text-xs text-slate-500">
                    Structured prescription records generated for rural dispensary and patient SMS delivery
                  </p>
                </div>
              </div>

              {patient.prescriptions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                  No prescriptions recorded for this patient.
                </div>
              ) : (
                patient.prescriptions.map((prescription) => (
                  <PrescriptionCard
                    key={prescription.id}
                    prescription={prescription}
                    onDownload={(rx) => generatePrescriptionPDF(rx)}
                    onPrint={() => window.print()}
                  />
                ))
              )}
            </div>
          )}

          {/* 4. SYMPTOMS TAB */}
          {activeTab === 'symptoms' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Symptom Progression History</h3>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 divide-y divide-slate-200">
                <div className="py-3">
                  <span className="text-xs font-bold text-blue-700">Today (Current Queue Token {patient.tokenNumber})</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {patient.symptoms.map((s, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Reported duration: {patient.symptomDuration}</p>
                </div>

                {patient.consultationHistory.map((c) => (
                  <div key={c.id} className="py-3">
                    <span className="text-xs font-bold text-slate-700">{c.date} • {c.doctorName}</span>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {c.symptoms.map((s, idx) => (
                        <span key={idx} className="bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded text-xs">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{c.chiefComplaint}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. REPORTS TAB */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Diagnostic Reports & Documents</h3>
                  <p className="text-xs text-slate-500">
                    Uploaded lab reports, X-rays, ECGs, and supporting clinical records
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Document</span>
                </button>
              </div>

              {patient.reports.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                  No diagnostic reports uploaded for this patient.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {patient.reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. TIMELINE TAB */}
          {activeTab === 'timeline' && (
            <MedicalHistoryTimeline
              patient={patient}
              onDownloadPrescription={handleDownloadPrescription}
            />
          )}
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-slate-900">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Upload Patient Document / Lab Report</h3>
            <p className="text-xs text-slate-500 mb-4">Attach diagnostic reports to {patient.name}'s permanent EHR.</p>

            <form onSubmit={handleUploadReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sputum_AFB_Test.pdf"
                  value={newReportName}
                  onChange={(e) => setNewReportName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">File Type</label>
                  <select
                    value={newReportType}
                    onChange={(e) => setNewReportType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="PNG">PNG Image</option>
                    <option value="JPG">JPG Image</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs">
                    <option>Blood Test</option>
                    <option>X-Ray</option>
                    <option>ECG</option>
                    <option>Clinical Summary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Findings Summary</label>
                <textarea
                  rows={3}
                  placeholder="Summary of lab results or radiological impression..."
                  value={newReportSummary}
                  onChange={(e) => setNewReportSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                >
                  Upload & Save to EHR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
