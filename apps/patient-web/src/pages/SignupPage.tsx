import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  User,
  Droplet,
  ShieldAlert,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { SignupData } from '../context/AppContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

const STEPS = ['Account', 'Personal Details', 'Medical Records', 'Review'];

export const SignupPage: React.FC = () => {
  const { signup, addToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');

  const [form, setForm] = useState<SignupData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: 0,
    gender: 'Female',
    village: '',
    bloodGroup: '',
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const update = (patch: Partial<SignupData>) => setForm((prev) => ({ ...prev, ...patch }));

  const validateStep = (): boolean => {
    setError('');
    if (step === 0) {
      if (!form.name || !form.email || !form.password || !form.phone) {
        setError('Please fill in all account fields.');
        return false;
      }
      if (form.password.length < 6) {
        setError('Password should be at least 6 characters.');
        return false;
      }
    }
    if (step === 1) {
      if (!form.age || !form.village) {
        setError('Please fill in your age and village/city.');
        return false;
      }
    }
    if (step === 2) {
      if (!form.bloodGroup) {
        setError('Please select your blood group.');
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = () => {
    if (!validateStep()) return;
    signup(form);
    addToast({ type: 'success', title: 'Account created', message: 'Welcome to Nabha Telemedicine.' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">NABHA TELEMEDICINE</h2>
            <p className="text-xs text-blue-300 font-semibold tracking-wider uppercase">Patient Sign Up</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-slate-700/40 p-6 sm:p-8">
          {/* Stepper */}
          <div className="flex items-center mb-8">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                      i < step
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : i === step
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-slate-200 text-slate-400 bg-white'
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`mt-1.5 text-[10px] font-semibold text-center max-w-[70px] leading-tight ${
                      i <= step ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < step ? 'bg-blue-600' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{error}</div>
          )}

          {/* Step 0: Account */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                <User className="w-4 h-4 text-blue-600" />
                Create your account
              </div>
              <Field label="Full Name">
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="e.g. Simran Kaur"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Phone Number">
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  className={inputClass}
                  value={form.password}
                  onChange={(e) => update({ password: e.target.value })}
                  placeholder="At least 6 characters"
                />
              </Field>
            </div>
          )}

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                <User className="w-4 h-4 text-blue-600" />
                Personal details
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Age">
                  <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={form.age || ''}
                    onChange={(e) => update({ age: Number(e.target.value) })}
                    placeholder="34"
                  />
                </Field>
                <Field label="Gender">
                  <select
                    className={inputClass}
                    value={form.gender}
                    onChange={(e) => update({ gender: e.target.value as SignupData['gender'] })}
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
              <Field label="Village / City">
                <input
                  className={inputClass}
                  value={form.village}
                  onChange={(e) => update({ village: e.target.value })}
                  placeholder="e.g. Nabha, Punjab"
                />
              </Field>
              <Field label="Emergency Contact Name">
                <input
                  className={inputClass}
                  value={form.emergencyContactName}
                  onChange={(e) => update({ emergencyContactName: e.target.value })}
                  placeholder="e.g. Harpreet Kaur (Sister)"
                />
              </Field>
              <Field label="Emergency Contact Phone">
                <input
                  className={inputClass}
                  value={form.emergencyContactPhone}
                  onChange={(e) => update({ emergencyContactPhone: e.target.value })}
                  placeholder="+91 98111 22233"
                />
              </Field>
            </div>
          )}

          {/* Step 2: Medical Records */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                <Droplet className="w-4 h-4 text-blue-600" />
                Medical records
              </div>
              <p className="text-xs text-slate-500 -mt-2 mb-2">
                This helps doctors treat you safely and quickly. You can update this anytime from Health Records.
              </p>
              <Field label="Blood Group">
                <select
                  className={inputClass}
                  value={form.bloodGroup}
                  onChange={(e) => update({ bloodGroup: e.target.value })}
                >
                  <option value="">Select blood group</option>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Known Allergies (comma separated)">
                <input
                  className={inputClass}
                  value={form.allergies}
                  onChange={(e) => update({ allergies: e.target.value })}
                  placeholder="e.g. Penicillin, Peanuts"
                />
              </Field>
              <Field label="Chronic Conditions (comma separated)">
                <input
                  className={inputClass}
                  value={form.chronicConditions}
                  onChange={(e) => update({ chronicConditions: e.target.value })}
                  placeholder="e.g. Diabetes, Hypertension"
                />
              </Field>
              <Field label="Current Medications (comma separated)">
                <input
                  className={inputClass}
                  value={form.currentMedications}
                  onChange={(e) => update({ currentMedications: e.target.value })}
                  placeholder="e.g. Metformin 500mg"
                />
              </Field>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Leave a field blank if not applicable — you don't need to guess.</span>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Review your details
              </div>
              <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 text-xs">
                <ReviewRow label="Name" value={form.name} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone" value={form.phone} />
                <ReviewRow label="Age / Gender" value={`${form.age || '—'} / ${form.gender}`} />
                <ReviewRow label="Village / City" value={form.village} />
                <ReviewRow label="Blood Group" value={form.bloodGroup} />
                <ReviewRow label="Allergies" value={form.allergies || 'None reported'} />
                <ReviewRow label="Chronic Conditions" value={form.chronicConditions || 'None reported'} />
                <ReviewRow label="Current Medications" value={form.currentMedications || 'None reported'} />
                <ReviewRow
                  label="Emergency Contact"
                  value={`${form.emergencyContactName || '—'} ${
                    form.emergencyContactPhone ? `(${form.emergencyContactPhone})` : ''
                  }`}
                />
              </div>
              <div className="flex items-start gap-2 text-[11px] text-slate-500">
                <Phone className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>By creating an account you agree this information will be shared with your treating doctor.</span>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
            {step > 0 ? (
              <button
                onClick={back}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Already have an account?
              </Link>
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Create Account
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const inputClass =
  'block w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white placeholder:text-slate-400';

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
    {children}
  </div>
);

const ReviewRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-3 py-2">
    <span className="text-slate-500">{label}</span>
    <span className="font-semibold text-slate-800 text-right">{value || '—'}</span>
  </div>
);
