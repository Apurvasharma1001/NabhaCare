import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, ShieldCheck, Lock, Mail, KeyRound, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('patient@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials, or you have not signed up yet. Please sign up first.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('patient@example.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700/40">
          {/* Left Brand Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 p-8 sm:p-10 flex flex-col justify-between text-white border-b lg:border-b-0 lg:border-r border-blue-800/40">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight">NABHA TELEMEDICINE</h2>
                  <p className="text-xs text-blue-300 font-semibold tracking-wider uppercase">Patient Portal</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-white leading-snug">
                  Quality Healthcare, Right From Your Village
                </h3>
                <p className="text-xs text-blue-200/90 leading-relaxed">
                  Describe your symptoms, get matched to the right specialist at Civil Hospital Nabha, and consult
                  by audio or video — no travel required.
                </p>
              </div>

              <div className="mt-8 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-blue-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI Symptom Checker & Auto Doctor Matching</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Digital Health Records & Prescriptions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>One-Tap Emergency Help</span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-4 border-t border-blue-800/40 flex items-center justify-between text-[11px] text-blue-300">
              <span>Civil Hospital Nabha</span>
              <span>Govt. of Punjab Health Dept.</span>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Patient Sign In</h2>
                  <p className="text-xs text-slate-500 mt-1">Enter your details to access your health portal</p>
                </div>
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>Remember me on this device</span>
                  </label>
                  <span className="text-blue-600 hover:underline cursor-pointer text-[11px]">Forgot Password?</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Demo Account:</span>{' '}
                  <span className="text-slate-500 font-mono">patient@example.com / password123</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-blue-600 font-semibold hover:underline text-xs"
                >
                  Fill Demo
                </button>
              </div>

              <p className="mt-5 text-center text-xs text-slate-600">
                New here?{' '}
                <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                  Create an account
                </Link>{' '}
                to book your first consultation.
              </p>

              <div className="mt-6 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-red-500" />
                <span>Your medical data is kept private and secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
