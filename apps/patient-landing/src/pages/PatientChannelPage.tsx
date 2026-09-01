import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, MessageSquare, PhoneCall, ArrowLeft } from 'lucide-react';

export default function PatientChannelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] tracking-tight mb-4">
            Choose Your Platform
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Select how you would like to access Nabha's patient services today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => window.location.href = 'http://localhost:5173'} // Redirects to patient-web containing LoginPage.tsx and SignupPage.tsx[cite: 2]
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="bg-slate-50 p-4 rounded-xl mb-5 group-hover:bg-emerald-50 transition-colors">
              <Smartphone className="w-8 h-8 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Mobile App</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">
              Full featured web and mobile experience with live updates.
            </p>
          </button>

          <button
            onClick={() => window.location.href = 'sms:+1234567890'} 
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="bg-slate-50 p-4 rounded-xl mb-5 group-hover:bg-emerald-50 transition-colors">
              <MessageSquare className="w-8 h-8 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">SMS Service</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">
              Access basic services and status checks via text messaging.
            </p>
          </button>

          <button
            onClick={() => window.location.href = 'tel:+1234567890'} 
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="bg-slate-50 p-4 rounded-xl mb-5 group-hover:bg-emerald-50 transition-colors">
              <PhoneCall className="w-8 h-8 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">IVR / Voice</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">
              Call our automated voice system for offline access.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}