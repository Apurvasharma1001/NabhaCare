import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  Calendar,
  Activity,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/ui/StatCard';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { SourceBadge } from '../components/ui/SourceBadge';

const weeklyData = [
  { day: 'Mon', consultations: 18, urgent: 4 },
  { day: 'Tue', consultations: 24, urgent: 7 },
  { day: 'Wed', consultations: 21, urgent: 5 },
  { day: 'Thu', consultations: 28, urgent: 8 },
  { day: 'Fri', consultations: 22, urgent: 6 },
  { day: 'Sat', consultations: 19, urgent: 3 },
  { day: 'Today', consultations: 14, urgent: 3 },
];

export const DashboardPage: React.FC = () => {
  const { doctor, doctorAvailability, patients, stats, activities } = useApp();
  const navigate = useNavigate();

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Waiting queue filtered and sorted by priority (Urgent first, then starvation adjusted, then arrival)
  const waitingPatients = patients
    .filter((p) => p.queueStatus === 'Waiting' || p.queueStatus === 'In Consultation')
    .sort((a, b) => {
      const priorityWeight = { URGENT: 3, MEDIUM: 2, LOW: 1 };
      const aWeight = priorityWeight[a.effectivePriority || a.priority];
      const bWeight = priorityWeight[b.effectivePriority || b.priority];
      if (bWeight !== aWeight) return bWeight - aWeight;
      return b.waitingMinutes - a.waitingMinutes;
    });

  const previewQueue = waitingPatients.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span>•</span>
            <span>{doctor.hospital}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {getGreeting()}, {doctor.name}
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-xl">
            You have <span className="font-bold underline decoration-amber-400">{stats.urgentPatients} urgent rural consultations</span> in your queue. Unified incoming streams from Nabha Rural, Nabha Kalan, and surrounding Panchayats.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-2.5 rounded-lg border border-white/20">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-blue-200 uppercase font-semibold">Triage Station Status</span>
            <span className="text-xs font-bold text-white uppercase">{doctorAvailability}</span>
          </div>
          <span
            className={`w-3.5 h-3.5 rounded-full ring-4 ring-white/20 ${
              doctorAvailability === 'AVAILABLE'
                ? 'bg-emerald-400 animate-pulse'
                : doctorAvailability === 'BUSY'
                ? 'bg-amber-400'
                : 'bg-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Patients Waiting"
          value={String(stats.patientsWaiting).padStart(2, '0')}
          subtitle={`${stats.mediumPriority} medium, ${stats.lowPriority} low urgency`}
          icon={<Users className="w-5 h-5" />}
          variant="primary"
          badgeText="Active Queue"
        />

        <StatCard
          title="Urgent Patients"
          value={String(stats.urgentPatients).padStart(2, '0')}
          subtitle="Immediate clinical attention recommended"
          icon={<AlertCircle className="w-5 h-5" />}
          variant="urgent"
          badgeText="High Urgency"
        />

        <StatCard
          title="Consultations Completed"
          value={String(stats.consultationsCompletedToday).padStart(2, '0')}
          subtitle="EHR records & prescriptions archived"
          icon={<CheckCircle2 className="w-5 h-5" />}
          variant="success"
          badgeText="Today"
        />

        <StatCard
          title="Average Wait Time"
          value={`${stats.averageWaitTimeMinutes} min`}
          subtitle="Starvation prevention active (>40m)"
          icon={<Clock className="w-5 h-5" />}
          variant={stats.averageWaitTimeMinutes > 25 ? 'warning' : 'default'}
          badgeText="Est. Latency"
        />
      </div>

      {/* Main Grid: Priority Queue on Left, Activity & Trend on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Priority Queue Preview */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Live Priority Queue
                </h3>
                <p className="text-[11px] text-slate-500">
                  Unified rural triage order (Urgent cases top, followed by bounded waiting time)
                </p>
              </div>

              <button
                onClick={() => navigate('/queue')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <span>View Full Queue ({waitingPatients.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4">Token</th>
                    <th className="py-2.5 px-4">Patient Name</th>
                    <th className="py-2.5 px-4">Priority</th>
                    <th className="py-2.5 px-4">Source</th>
                    <th className="py-2.5 px-4">Arrival</th>
                    <th className="py-2.5 px-4">Waiting</th>
                    <th className="py-2.5 px-4">Symptoms</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewQueue.map((patient) => (
                    <tr
                      key={patient.id}
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {patient.tokenNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{patient.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {patient.age}y, {patient.gender} • {patient.village}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <PriorityBadge
                          priority={patient.priority}
                          size="sm"
                          effectivePriority={patient.effectivePriority}
                          isStarvationAdjusted={patient.isStarvationAdjusted}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <SourceBadge source={patient.source} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{patient.arrivalTime}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            patient.waitingMinutes > 20
                              ? 'text-red-600'
                              : patient.waitingMinutes > 10
                              ? 'text-amber-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {patient.waitingMinutes} min
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-[150px] truncate">
                        {patient.symptoms.join(', ')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/consultation/${patient.id}`);
                          }}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-[11px] transition-colors shadow-2xs"
                        >
                          Consult
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => navigate('/queue')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                View all {waitingPatients.length} waiting rural patients in priority table →
              </button>
            </div>
          </div>

          {/* Weekly Consultation Activity Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Weekly Tele-Consultation Volume
                </h3>
                <p className="text-[11px] text-slate-500">
                  Daily patient throughput at Nabha Hospital Station
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                +18% this week
              </span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="consultationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="consultations"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#consultationGrad)"
                    name="Consultations"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed & Entry Channels Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Doctor Availability Switcher Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Doctor Station Status
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">DOC-1021</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => navigate('/queue')}
                className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  doctorAvailability === 'AVAILABLE'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => navigate('/queue')}
                className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  doctorAvailability === 'BUSY'
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Busy
              </button>
              <button
                onClick={() => navigate('/queue')}
                className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  doctorAvailability === 'OFFLINE'
                    ? 'bg-slate-700 text-white border-slate-800 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Offline
              </button>
            </div>
          </div>

          {/* Today's Clinical Activity Feed */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Today's Activity Feed
              </h3>
              <span className="text-[10px] text-slate-400">Live Audit Log</span>
            </div>

            <div className="p-4 space-y-4 max-h-[360px] overflow-y-auto">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{act.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Entry Channel Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Patient Entry Channels
            </h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Smartphone App
                  </span>
                  <span>45% (4 patients)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    SMS / USSD Gateway
                  </span>
                  <span>30% (3 patients)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '30%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    ASHA Worker Facilitated
                  </span>
                  <span>25% (3 patients)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
