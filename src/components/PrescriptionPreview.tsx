import { Download, Printer, X, ShieldCheck } from 'lucide-react';
import type { Prescription } from '../types';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';

interface PrescriptionPreviewProps {
  prescription: Prescription;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSave?: () => void;
}

export const PrescriptionPreview: React.FC<PrescriptionPreviewProps> = ({
  prescription,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    generatePrescriptionPDF(prescription);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold">Prescription Preview & Electronic Authorization</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
              title="Print Prescription"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 text-slate-900 bg-white space-y-6 text-xs" id="printable-prescription">
          
          {/* Header */}
          <div className="border-b-2 border-blue-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <h2 className="text-xl font-black text-blue-900 tracking-tight">
                NABHA TELEMEDICINE HUB
              </h2>
              <p className="text-[11px] text-slate-600 font-medium">
                Civil Hospital Nabha, Sub-divisional Hospital Campus, Patiala District, Punjab
              </p>
              <p className="text-[10px] text-slate-400">
                Govt. Telehealth Initiative under National Digital Health Mission
              </p>
            </div>

            <div className="text-left sm:text-right text-xs">
              <div className="font-bold text-slate-900 text-sm">{prescription.doctorName}</div>
              <div className="text-blue-700 font-semibold text-[11px]">{prescription.doctorSpecialization}</div>
              <div className="text-slate-500 text-[10px]">{prescription.hospitalName}</div>
              <div className="text-slate-400 font-mono text-[9px]">Reg: PB-MED-84920-A</div>
            </div>
          </div>

          {/* Patient Details Grid */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Patient Name</span>
              <p className="font-bold text-slate-900">{prescription.patientName}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Age / Gender</span>
              <p className="font-medium text-slate-800">{prescription.patientAge}y / {prescription.patientGender}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Village / Area</span>
              <p className="font-medium text-slate-800">{prescription.patientVillage}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Prescription ID</span>
              <p className="font-mono font-bold text-blue-700">{prescription.id}</p>
              <span className="text-[10px] text-slate-400">{prescription.date}</span>
            </div>
          </div>

          {/* Rx Symbol & Medicines Table */}
          <div>
            <div className="text-2xl font-bold font-serif text-blue-900 mb-2">Rx</div>
            <table className="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr className="bg-blue-900 text-white text-[11px]">
                  <th className="py-2 px-3 border border-blue-800">#</th>
                  <th className="py-2 px-3 border border-blue-800">Medicine Name</th>
                  <th className="py-2 px-3 border border-blue-800">Dosage</th>
                  <th className="py-2 px-3 border border-blue-800">Frequency</th>
                  <th className="py-2 px-3 border border-blue-800">Duration</th>
                  <th className="py-2 px-3 border border-blue-800">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {prescription.medicines.map((med, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="py-2 px-3 border border-slate-200 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-2 px-3 border border-slate-200 font-bold text-slate-900">{med.name}</td>
                    <td className="py-2 px-3 border border-slate-200 font-semibold text-blue-800">{med.dosage}</td>
                    <td className="py-2 px-3 border border-slate-200">{med.frequency}</td>
                    <td className="py-2 px-3 border border-slate-200">{med.duration}</td>
                    <td className="py-2 px-3 border border-slate-200 italic text-slate-600">{med.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Instructions & Advice */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div>
              <strong className="text-slate-900">General Patient Instructions:</strong>
              <p className="text-slate-700 mt-0.5">{prescription.instructions}</p>
            </div>
            {prescription.followUp && (
              <div>
                <strong className="text-slate-900">Follow-up Advice:</strong>
                <p className="text-slate-700 mt-0.5">{prescription.followUp}</p>
              </div>
            )}
          </div>

          {/* Doctor Signature Block */}
          <div className="pt-6 flex justify-between items-end">
            <div className="text-[10px] text-slate-400 max-w-sm">
              Electronically generated via Nabha Telemedicine Platform. Valid for medicine dispensation at Civil Hospital Nabha Dispensary and Jan Aushadhi Kendras.
            </div>

            <div className="text-right border-t border-slate-300 pt-2 min-w-[200px]">
              <div className="font-bold text-slate-900 text-xs">{prescription.doctorName}</div>
              <div className="text-[10px] text-slate-500">Digitally Authenticated Signature</div>
              <div className="text-[9px] font-mono text-slate-400">Time: {new Date().toLocaleTimeString()}</div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Click <strong>Download PDF</strong> or <strong>Print</strong> for paper dispensation.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg"
            >
              Back to Editor
            </button>
            <button
              onClick={() => {
                handleDownload();
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF & Close</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
