import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Siren,
  Stethoscope,
  CalendarPlus,
  FolderHeart,
  History,
  Pill,
  Clock,
  Video,
  ArrowRight,
  Droplet,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/ui/StatCard';
import { UrgencyBadge } from '../components/ui/UrgencyBadge';
import { EmptyState } from '../components/ui/EmptyState';

export const DashboardPage: React.FC = () => {
  const { patient, consultations, prescriptions, bookings } = useApp();
  const navigate = useNavigate();

  if (!patient) return null;

  const activePrescriptions = prescriptions.filter((p) => p.status === 'Active').length;
  const upcomingBooking = bookings.find((b) => b.status === 'PENDING' || b.status === 'CONFIRMED' || b.status === 'IN_QUEUE');
  const lastConsultation = consultations[0];

  const quickActions = [
    {
      label: 'Emergency Help',
      description: 'Immediate assistance & helplines',
      icon: <Siren className="w-5 h-5" />,
      color: 'bg-red-600 hover:bg-red-700',
      onClick: () => navigate('/emergency'),
    },
    {
      label: 'AI Symptom Checker',
      description: 'Describe symptoms, get guidance',
      icon: <Stethoscope className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => navigate('/symptom-checker'),
    },
    {
      label: 'Book Appointment',
      description: 'Consult a matched specialist',
      icon: <CalendarPlus className="w-5 h-5" />,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      onClick: () => navigate('/booking'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 rounded-xl p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">Welcome back</p>
          <h2 className="text-xl sm:text-2xl font-bold mt-0.5">{patient.name}</h2>
          <p className="text-xs text-blue-200/80 mt-1">{patient.patientId} • {patient.village}</p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs rounded-lg px-3 py-2 border border-white/10">
          <Droplet className="w-4 h-4 text-red-300" />
          <span className="text-xs">
            Blood Group: <strong>{patient.medicalHistory.bloodGroup}</strong>
          </span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`${action.color} text-white rounded-xl p-5 text-left shadow-md hover:shadow-lg transition-all flex flex-col gap-3`}
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">{action.icon}</div>
            <div>
              <p className="font-bold text-sm">{action.label}</p>
              <p className="text-xs text-white/80 mt-0.5">{action.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Consultations"
          value={consultations.length}
          icon={<History className="w-4 h-4" />}
          variant="primary"
          onClick={() => navigate('/consultations')}
        />
        <StatCard
          title="Active Prescriptions"
          value={activePrescriptions}
          icon={<Pill className="w-4 h-4" />}
          variant="success"
          onClick={() => navigate('/consultations')}
        />
        <StatCard
          title="Upcoming Visit"
          value={upcomingBooking ? upcomingBooking.slot.dayLabel : 'None'}
          icon={<CalendarPlus className="w-4 h-4" />}
          variant={upcomingBooking ? 'warning' : 'default'}
        />
        <StatCard
          title="Health Records"
          value="Up to date"
          icon={<FolderHeart className="w-4 h-4" />}
          variant="default"
          onClick={() => navigate('/health-records')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming appointment */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Upcoming Appointment</h3>
            <button
              onClick={() => navigate('/booking')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              Book new <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          {upcomingBooking ? (
            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={upcomingBooking.doctorAvatar}
                    alt={upcomingBooking.doctorName}
                    className="w-10 h-10 rounded-full object-cover border border-blue-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{upcomingBooking.doctorName}</p>
                    <p className="text-xs text-slate-500">{upcomingBooking.doctorSpecialization}</p>
                  </div>
                </div>
                <UrgencyBadge urgency={upcomingBooking.urgencyTag} size="sm" />
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200/60 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5" />
                  {upcomingBooking.slot.dayLabel}, {upcomingBooking.slot.time}
                </span>
                <span className="font-mono font-semibold text-blue-700">Token {upcomingBooking.tokenNumber}</span>
              </div>
              <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                Join when it's time
              </button>
            </div>
          ) : (
            <EmptyState
              title="No upcoming appointments"
              description="Describe your symptoms and we'll match you to the right doctor and slot."
              icon="inbox"
              action={{ label: 'Book Appointment', onClick: () => navigate('/booking') }}
            />
          )}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Last Consultation</h3>
            <button
              onClick={() => navigate('/consultations')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          {lastConsultation ? (
            <div className="p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">{lastConsultation.doctorName}</p>
                <span className="text-[11px] text-slate-400">{lastConsultation.date}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{lastConsultation.doctorSpecialization}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{lastConsultation.assessment}</p>
              {lastConsultation.prescriptionId && (
                <button
                  onClick={() => navigate('/consultations')}
                  className="mt-3 text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Pill className="w-3.5 h-3.5" />
                  View prescription
                </button>
              )}
            </div>
          ) : (
            <EmptyState title="No consultations yet" description="Your visit history will appear here." icon="file" />
          )}
        </div>
      </div>
    </div>
  );
};
