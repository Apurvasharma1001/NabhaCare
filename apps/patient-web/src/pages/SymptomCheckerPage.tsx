import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Sparkles, ArrowRight, Siren, RotateCcw } from 'lucide-react';
import { analyzeSymptomText, type AnalysisResult } from '../utils/symptomAnalysis';
import { useApp } from '../context/AppContext';
import { UrgencyBadge } from '../components/ui/UrgencyBadge';

export const SymptomCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const { addSymptomReport } = useApp();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const analysis = analyzeSymptomText(text);
      setResult(analysis);
      addSymptomReport({
        rawText: text,
        summary: analysis.summary,
        keywords: analysis.keywords,
        urgencyTag: analysis.urgencyTag,
        urgencyReason: analysis.urgencyReason,
        suggestedSpecialization: analysis.suggestedSpecialization,
      });
      setIsAnalyzing(false);
    }, 900);
  };

  const reset = () => {
    setText('');
    setResult(null);
  };

  const goToBooking = () => {
    navigate('/booking', { state: { prefillText: text } });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
          <Stethoscope className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">AI Symptom Checker</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Describe how you're feeling in your own words. This is a guidance tool, not a diagnosis — for anything
          serious, use Emergency Help.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="e.g. I've had a fever and body ache for the past 3 days, and a mild headache since this morning..."
          className="w-full text-sm border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none placeholder:text-slate-400"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-[11px] text-slate-400">{text.length} characters</span>
          <div className="flex items-center gap-2">
            {result && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-md border border-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Start Over
              </button>
            )}
            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || isAnalyzing}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </div>
        </div>
      </div>

      {isAnalyzing && (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 mt-3">Summarizing your symptoms and checking urgency...</p>
        </div>
      )}

      {result && !isAnalyzing && (
        <div className="space-y-4">
          {result.urgencyTag === 'URGENT' && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <Siren className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-800">This may need urgent attention</p>
                <p className="text-xs text-red-700 mt-1">{result.urgencyReason}</p>
                <button
                  onClick={() => navigate('/emergency')}
                  className="mt-2 text-xs font-semibold text-red-700 underline hover:text-red-900"
                >
                  Go to Emergency Help →
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Summary</h3>
              <UrgencyBadge urgency={result.urgencyTag} size="sm" />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{result.summary}</p>

            <div className="mt-4">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Terms Identified</p>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((k) => (
                  <span key={k} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
              Based on your symptoms, we'd recommend <strong>{result.suggestedSpecialization}</strong>.
            </div>
          </div>

          <button
            onClick={goToBooking}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
          >
            Continue to Book Appointment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
