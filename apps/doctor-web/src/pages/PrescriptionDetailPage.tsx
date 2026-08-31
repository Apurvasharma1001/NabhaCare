import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Pill } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';

export const PrescriptionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, addToast } = useApp();

  // Find prescription
  let foundPrescription = null;

  for (const p of patients) {
    const rx = p.prescriptions.find((r) => r.id === id);
    if (rx) {
      foundPrescription = rx;
      break;
    }
  }

  if (!foundPrescription) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Prescription Not Found</h3>
        <p className="text-xs text-slate-500">Prescription ID <code>{id}</code> was not found in records.</p>
        <button
          onClick={() => navigate('/prescriptions')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Back to Prescriptions
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    generatePrescriptionPDF(foundPrescription);
    addToast({
      type: 'success',
      title: 'Prescription Downloaded',
      message: `Prescription #${foundPrescription.id} PDF saved.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Records</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Official Prescription Document */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-6 text-slate-900 text-xs">
        
        {/* Document Header */}
        <div className="border-b-2 border-blue-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 text-white rounded-lg flex items-center justify-center font-bold">
                <Pill className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-black text-blue-900 tracking-tight">
                NABHA TELEMEDICINE HUB
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Civil Hospital Nabha, Sub-divisional Hospital Campus, Patiala District, Punjab
            </p>
            <p className="text-[10px] text-slate-400">
              National Health Mission • Digital EHR Tele-Prescription
            </p>
          </div>

          <div className="text-left sm:text-right text-xs space-y-0.5">
            <div className="font-bold text-slate-900 text-sm">{foundPrescription.doctorName}</div>
            <div className="text-blue-700 font-semibold">{foundPrescription.doctorSpecialization}</div>
            <div className="text-slate-500">{foundPrescription.hospitalName}</div>
            <div className="text-slate-400 font-mono text-[10px]">Reg No: PB-MED-84920-A</div>
          </div>
        </div>

        {/* Patient Block */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Patient Name</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{foundPrescription.patientName}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Age / Gender</span>
            <p className="font-medium text-slate-800 mt-0.5">{foundPrescription.patientAge} Years / {foundPrescription.patientGender}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Village / Catchment</span>
            <p className="font-medium text-slate-800 mt-0.5">{foundPrescription.patientVillage}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Prescription ID</span>
            <p className="font-mono font-bold text-blue-700 text-sm mt-0.5">{foundPrescription.id}</p>
            <span className="text-[10px] text-slate-500">Date: {foundPrescription.date}</span>
          </div>
        </div>

        {/* Rx Symbol & Medicines Table */}
        <div className="space-y-2">
          <div className="text-3xl font-serif font-bold text-blue-900">Rx</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr className="bg-blue-900 text-white text-[11px]">
                  <th className="py-2.5 px-3.5 border border-blue-800">#</th>
                  <th className="py-2.5 px-3.5 border border-blue-800">Medicine Name & Strength</th>
                  <th className="py-2.5 px-3.5 border border-blue-800">Dosage</th>
                  <th className="py-2.5 px-3.5 border border-blue-800">Frequency Schedule</th>
                  <th className="py-2.5 px-3.5 border border-blue-800">Duration</th>
                  <th className="py-2.5 px-3.5 border border-blue-800">Special Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {foundPrescription.medicines.map((med, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="py-3 px-3.5 border border-slate-200 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-3 px-3.5 border border-slate-200 font-bold text-slate-900">{med.name}</td>
                    <td className="py-3 px-3.5 border border-slate-200 font-semibold text-blue-700">{med.dosage}</td>
                    <td className="py-3 px-3.5 border border-slate-200 text-slate-700">{med.frequency}</td>
                    <td className="py-3 px-3.5 border border-slate-200 text-slate-700">{med.duration}</td>
                    <td className="py-3 px-3.5 border border-slate-200 italic text-slate-600">{med.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advice & Instructions */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div>
            <strong className="text-slate-900">General Patient Instructions:</strong>
            <p className="text-slate-700 mt-0.5 leading-relaxed">{foundPrescription.instructions}</p>
          </div>
          {foundPrescription.followUp && (
            <div>
              <strong className="text-slate-900">Follow-up Advice:</strong>
              <p className="text-slate-700 mt-0.5">{foundPrescription.followUp}</p>
            </div>
          )}
        </div>

        {/* Footer Signature */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="text-[11px] text-slate-400 max-w-md">
            This digital electronic prescription is legally valid under the Information Technology Act 2000 and Telemedicine Practice Guidelines 2020 issued by Govt. of India.
          </div>

          <div className="text-left sm:text-right min-w-[220px]">
            <div className="w-32 h-0.5 bg-slate-400 ml-auto mb-2" />
            <div className="font-bold text-slate-900 text-sm">{foundPrescription.doctorName}</div>
            <div className="text-[11px] text-slate-500">Digitally Verified & Authorized</div>
            <div className="text-[10px] font-mono text-slate-400">{foundPrescription.hospitalName}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
