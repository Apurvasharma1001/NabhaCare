import React, { useState } from 'react';
import { FileText, Image as ImageIcon, Download, Eye, Calendar, Building2, X } from 'lucide-react';
import type { MedicalReport } from '../types';

interface ReportCardProps {
  report: MedicalReport;
  onDownload?: (report: MedicalReport) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onDownload }) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const getReportIcon = (type: string) => {
    if (type === 'PNG' || type === 'JPG') {
      return <ImageIcon className="w-6 h-6 text-purple-600" />;
    }
    return <FileText className="w-6 h-6 text-blue-600" />;
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-slate-100 rounded-lg shrink-0">
            {getReportIcon(report.type)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900">{report.name}</h4>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-semibold">
                {report.type} • {report.size}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Uploaded: {report.uploadDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                Source: {report.source}
              </span>
            </div>
            {report.summary && (
              <p className="mt-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 leading-relaxed">
                <strong>Lab Summary:</strong> {report.summary}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => (onDownload ? onDownload(report) : setShowPreviewModal(true))}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold rounded-md transition-colors flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Mock Document Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 text-slate-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                {getReportIcon(report.type)}
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{report.name}</h3>
                  <p className="text-[11px] text-slate-500">
                    Uploaded by {report.source} on {report.uploadDate} ({report.size})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Render Body */}
            <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                {getReportIcon(report.type)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{report.name}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Category: {report.category} | File format: {report.type}
                </p>
              </div>

              {report.summary && (
                <div className="text-left bg-white p-4 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                    Diagnostic Lab Interpretation
                  </div>
                  <p className="leading-relaxed">{report.summary}</p>
                </div>
              )}

              <div className="p-4 bg-blue-50/50 rounded-lg text-xs text-blue-900 border border-blue-100 text-left">
                <strong>Certified Digital Laboratory Record:</strong> Synchronized with District Public Health Laboratory Nabha. Authorized by Pathologist Dr. S. Gill.
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-md"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
