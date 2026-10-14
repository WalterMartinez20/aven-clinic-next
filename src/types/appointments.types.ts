export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientAvatar: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: "Confirmed" | "Pending" | "Completed" | "Canceled";
  urgency?: "Critical" | "Urgent" | "Normal";
}

export const getDynamicInitialAppointments = (): Appointment[] => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(today.getFullYear(), today.getMonth(), diff);

  const getDayDateStr = (dayOffset: number) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + dayOffset);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  return [
    {
      id: "AP-201",
      patientName: "Margarita Rosa Villalta",
      patientEmail: "m.rosa@example.com",
      patientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      date: getDayDateStr(0), // Mon
      time: "08:00 AM",
      doctor: "Dr. Elena Rodriguez",
      type: "In Consult",
      status: "Confirmed",
      urgency: "Critical",
    },
    {
      id: "AP-202",
      patientName: "Carlos Alberto",
      patientEmail: "carlos.a@example.com",
      patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      date: getDayDateStr(1), // Tue
      time: "09:00 AM",
      doctor: "Dr. Aris",
      type: "Therapy Session",
      status: "Confirmed",
      urgency: "Normal",
    },
    {
      id: "AP-203",
      patientName: "Elena Beatriz",
      patientEmail: "elena.b@example.com",
      patientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      date: getDayDateStr(2), // Wed
      time: "10:30 AM",
      doctor: "Dr. Jenkins",
      type: "Pending Check-in",
      status: "Pending",
    },
    {
      id: "AP-204",
      patientName: "María Fernanda",
      patientEmail: "maria.f@example.com",
      patientAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      date: getDayDateStr(3), // Thu
      time: "11:45 AM",
      doctor: "Dr. Aris",
      type: "General Consult",
      status: "Confirmed",
    },
    {
      id: "AP-205",
      patientName: "Juan Diego",
      patientEmail: "juan.d@example.com",
      patientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      date: getDayDateStr(4), // Fri
      time: "02:00 PM",
      doctor: "Dr. Jenkins",
      type: "Specialty Care",
      status: "Completed",
    },
    {
      id: "AP-206",
      patientName: "Lucia Silva",
      patientEmail: "lucia.s@example.com",
      patientAvatar: "",
      date: getDayDateStr(0), // Mon
      time: "09:00 AM",
      doctor: "Dr. Aris",
      type: "General Consult",
      status: "Completed",
    },
    {
      id: "AP-207",
      patientName: "Jordan Smith",
      patientEmail: "j.smith@example.com",
      patientAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      date: getDayDateStr(2), // Wed
      time: "08:00 AM",
      doctor: "Dr. Elena Rodriguez",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      id: "AP-208",
      patientName: "Sarah Chen",
      patientEmail: "sarah.c@example.com",
      patientAvatar: "",
      date: getDayDateStr(3), // Thu
      time: "08:00 AM",
      doctor: "Dr. Jenkins",
      type: "Pending Check-in",
      status: "Pending",
    },
  ];
};

export const initialAppointments: Appointment[] = getDynamicInitialAppointments();

// ── Detail types ────────────────────────────────────────────────────────────

export interface AppointmentData {
  id: string;
  name: string;
  phone: string;
  department: string;
  doctor: string;
  visitType: string;
  reason: string;
  dateDay: number;
  timeSlot: string;
  duration: string;
}

export const mockAppointmentsDb: Record<string, AppointmentData> = {
  "ap-201": {
    id: "#AP-201",
    name: "Jordan Smith",
    phone: "+1 (555) 019-2834",
    department: "Cardiology",
    doctor: "Dr. Elena Rodriguez",
    visitType: "Consultation",
    reason: "Mild chest tightness and heart palpitation after exercise.",
    dateDay: 4,
    timeSlot: "09:00 AM",
    duration: "30 Minutes",
  },
  "ap-202": {
    id: "#AP-202",
    name: "Maria Garcia",
    phone: "+1 (555) 382-9012",
    department: "General Medicine",
    doctor: "Dr. Sarah Chen",
    visitType: "Check-up",
    reason: "Routine annual check-up and renewal of allergy prescription.",
    dateDay: 5,
    timeSlot: "10:30 AM",
    duration: "15 Minutes",
  },
  "ap-203": {
    id: "#AP-203",
    name: "Marcus Thorne",
    phone: "+1 (555) 881-2299",
    department: "Neurology",
    doctor: "Dr. Marcus Thorne",
    visitType: "Follow-up",
    reason: "Post-surgery neurological assessment and migraine review.",
    dateDay: 10,
    timeSlot: "02:30 PM",
    duration: "45 Minutes",
  },
};

export const appointmentCalendarDays = [
  { dayNum: 25, isPrevMonth: true },
  { dayNum: 26, isPrevMonth: true },
  { dayNum: 27, isPrevMonth: true },
  { dayNum: 28, isPrevMonth: true },
  { dayNum: 29, isPrevMonth: true },
  { dayNum: 30, isPrevMonth: true },
  { dayNum: 1 },
  { dayNum: 2 },
  { dayNum: 3 },
  { dayNum: 4 },
  { dayNum: 5 },
  { dayNum: 6 },
  { dayNum: 7 },
  { dayNum: 8 },
  { dayNum: 9 },
  { dayNum: 10 },
  { dayNum: 11 },
  { dayNum: 12 },
  { dayNum: 13 },
  { dayNum: 14 },
  { dayNum: 15 },
  { dayNum: 16 },
  { dayNum: 17 },
  { dayNum: 18 },
  { dayNum: 19 },
  { dayNum: 20 },
  { dayNum: 21 },
  { dayNum: 22 },
  { dayNum: 23 },
  { dayNum: 24 },
  { dayNum: 25 },
  { dayNum: 26 },
  { dayNum: 27 },
  { dayNum: 28 },
  { dayNum: 29 },
];

export const appointmentTimeSlots = [
  "09:00 AM",
  "10:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];
