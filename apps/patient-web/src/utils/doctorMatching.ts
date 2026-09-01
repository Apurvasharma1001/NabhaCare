import type { AvailableSlot } from '../types';

// Mock doctor pool the backend would search against. Patient never picks
// from this list directly — the system matches specialization + earliest
// slot automatically, per the booking flow requirement.
interface DoctorRecord {
  name: string;
  specialization: string;
  avatar: string;
  hospital: string;
}

const DOCTOR_POOL: DoctorRecord[] = [
  { name: 'Dr. Ramanpreet Singh', specialization: 'General Medicine', avatar: 'https://i.pravatar.cc/150?img=12', hospital: 'Civil Hospital Nabha' },
  { name: 'Dr. Anaya Kapoor', specialization: 'Endocrinology', avatar: 'https://i.pravatar.cc/150?img=32', hospital: 'Civil Hospital Nabha' },
  { name: 'Dr. Karamjit Dhillon', specialization: 'Cardiology', avatar: 'https://i.pravatar.cc/150?img=15', hospital: 'Civil Hospital Nabha' },
  { name: 'Dr. Simarpreet Bhatia', specialization: 'Orthopedics', avatar: 'https://i.pravatar.cc/150?img=21', hospital: 'Civil Hospital Nabha' },
  { name: 'Dr. Fatima Sheikh', specialization: 'Gastroenterology', avatar: 'https://i.pravatar.cc/150?img=44', hospital: 'Civil Hospital Nabha' },
  { name: 'Dr. Meera Nair', specialization: 'Dermatology', avatar: 'https://i.pravatar.cc/150?img=48', hospital: 'Civil Hospital Nabha' },
  { name: 'Dr. Ishaan Verma', specialization: 'Pediatrics', avatar: 'https://i.pravatar.cc/150?img=8', hospital: 'Civil Hospital Nabha' },
  { name: 'Dr. Priya Chawla', specialization: 'Gynecology', avatar: 'https://i.pravatar.cc/150?img=29', hospital: 'Civil Hospital Nabha' },
];

function formatDayLabel(date: Date, today: Date): string {
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

/**
 * Simulates the backend "search engine" step: given a specialization,
 * scans doctor schedules and returns available slots across the next
 * 10 days. In production this hits doctor_availability filtered by
 * status='available' AND date BETWEEN now AND now+10d.
 */
export function findAvailableSlots(specialization: string, count = 6): AvailableSlot[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const times = ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM', '05:00 PM'];
  const slots: AvailableSlot[] = [];

  let attempts = 0;
  while (slots.length < count && attempts < 40) {
    const dayOffset = Math.floor(Math.random() * 10);
    const time = times[Math.floor(Math.random() * times.length)];
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);

    const key = `${date.toDateString()}-${time}`;
    if (!slots.some((s) => `${s.date}-${s.time}` === key)) {
      slots.push({
        slotId: `slot-${Date.now()}-${attempts}`,
        date: date.toISOString().slice(0, 10),
        dayLabel: formatDayLabel(date, today),
        time,
        specialization,
      });
    }
    attempts++;
  }

  return slots.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

/**
 * Simulates backend doctor auto-assignment: picks the doctor matching
 * the specialization (round-robin / least-busy in production; random
 * here). Patient never sees or chooses from a doctor list.
 */
export function assignDoctorForSpecialization(specialization: string): DoctorRecord {
  const matches = DOCTOR_POOL.filter((d) => d.specialization === specialization);
  const pool = matches.length > 0 ? matches : DOCTOR_POOL;
  return pool[Math.floor(Math.random() * pool.length)];
}
