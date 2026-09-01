import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Shield, Activity, Clock } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Hero Section */}
      <div className="max-w-5xl w-full text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] tracking-tight mb-4">
          Welcome to <span className="text-blue-600">Nabha</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12">
          Bridging the gap between healthcare providers and patients through seamless, accessible technology.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Secure Records</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              End-to-end encrypted medical history and seamless prescription management.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Real-time Tracking</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Live clinic queue management and instant health metric updates.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">24/7 Access</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Connect with your dedicated healthcare ecosystem anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Continue As</h2>
          <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => window.location.href = 'http://localhost:5174'} // Redirects to doctor-web containing DashboardPage.tsx[cite: 1]
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="bg-slate-50 p-5 rounded-full mb-4 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-200">
              <Stethoscope className="w-10 h-10 text-slate-400 group-hover:text-blue-600" />
            </div>
            <span className="text-xl font-bold text-slate-800 mb-1">Doctor</span>
            <span className="text-sm text-slate-500">Manage patients & queues</span>
          </button>

          <button
            onClick={() => navigate('/patient/channels')}
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="bg-slate-50 p-5 rounded-fxull mb-4 group-hover:bg-emerald-50 group-hover:scale-110 transition-all duration-200">
              <User className="w-10 h-10 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <span className="text-xl font-bold text-slate-800 mb-1">Patient</span>
            <span className="text-sm text-slate-500">Access your healthcare</span>
          </button>
        </div>
      </div>
    </div>
  );
}