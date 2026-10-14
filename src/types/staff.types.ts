export interface StaffMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  initials: string;
  department: string;
  role: string;
  status: "On Shift" | "Off Duty";
}

export const initialStaff: StaffMember[] = [
  {
    id: "MED-8942",
    name: "Dr. Sarah Jenkins",
    email: "s.jenkins@aven.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQBlXBxv78vXGFrH3b9xWEebj5h2s_z1UF-vY_tLAEO-VYacSkrB3dpb9wezo__UHn3SSRykeAWImfODXkmiZH-4kvhWkhGD42fRUh_HHBRHu1I9lh1wDlQXtahSveuEtfHGhvRPX6Zceb2U-Za7JQEGhKz9M6DdLVAWVV5meEgXzsgkqr2IIWJfqprbn6IIBjPCeo0EGfw4NQEs3qSNm65dF7vsSmQSqaU9cmCrXMBd_ZAgx7ysdmhXCyWaLqnXkgSF0iIyvbUw0b",
    initials: "SJ",
    department: "Cardiology",
    role: "Head Physician",
    status: "On Shift",
  },
  {
    id: "NUR-3319",
    name: "Marcus Chen",
    email: "m.chen@aven.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDm7Q7lF5MMpRbZe3z9RdbL9quMTd3Y-pvAg0Vtbzj_8INna_14vlx187DrARYF78rAjQWGNqMLmHHpPZIpvFs_nHvOFxV9o4zEK4p6PbrqTTN-AsYOemDIM-FImMm4MeCRtylhVnCJ4uAj7mWYxtVl6uFITZRYkUtKbAeWMN1NZSxTT2le23Doqk2T05LOW-gYUdIXjMt-n-Xz9D3h0OD2WSRiPR2x50y696nGw4mVHmGfDNymnmQPLJ1RSb_K5wPuu-cDz4XM8sQ4",
    initials: "MC",
    department: "Emergency",
    role: "Senior Registrar",
    status: "Off Duty",
  },
  {
    id: "4492-ER",
    name: "Elena Rodriguez",
    email: "e.rodriguez@aven.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYsT9X3ChV-sIke_7429o_cg5cTdRzLoGjbjlXxAcbnYJmGPHEJe4BU4mfn5VxqkftqXqxZHcFo1lPDvMuofKKna4WdyamM85Z64RgI96n-kOYtrAzkPmWOn_klnIwVdQtZgDvmE9DgMh5D04GM5fOENOf4zmRXetWUM2AflWJew2vwmrtpCDuI4aHRY-7ZU54Bs4MGrYBMaAgNLz-89VYTBn0ysWhgXiys5wFbpGtpDBpxEyTKIApECmeyhhYFyKUpY6w7TL7Btr0",
    initials: "ER",
    department: "Administration",
    role: "Senior Medical Secretary",
    status: "On Shift",
  },
];

// ── Detail types ────────────────────────────────────────────────────────────

export interface StaffData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  supervisor: string;
  shiftSchedule: string;
  avatarUrl: string;
  initials: string;
  status: "On Shift" | "Off Duty";
}

export interface AttendanceRecord {
  day: string;
  date: string;
  clockIn: string;
  clockOut: string;
  breakTime: string;
  totalHours: string;
  isToday?: boolean;
}

export const mockStaffDatabase: Record<string, StaffData> = {
  "med-8942": {
    id: "MED-8942",
    name: "Dr. Sarah Jenkins",
    email: "s.jenkins@aven.com",
    role: "Head Physician",
    department: "Cardiology",
    supervisor: "Dr. R. Vance",
    shiftSchedule: "07:00 AM - 03:30 PM",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQBlXBxv78vXGFrH3b9xWEebj5h2s_z1UF-vY_tLAEO-VYacSkrB3dpb9wezo__UHn3SSRykeAWImfODXkmiZH-4kvhWkhGD42fRUh_HHBRHu1I9lh1wDlQXtahSveuEtfHGhvRPX6Zceb2U-Za7JQEGhKz9M6DdLVAWVV5meEgXzsgkqr2IIWJfqprbn6IIBjPCeo0EGfw4NQEs3qSNm65dF7vsSmQSqaU9cmCrXMBd_ZAgx7ysdmhXCyWaLqnXkgSF0iIyvbUw0b",
    initials: "SJ",
    status: "On Shift",
  },
  "nur-3319": {
    id: "NUR-3319",
    name: "Marcus Chen",
    email: "m.chen@aven.com",
    role: "Senior Registrar",
    department: "Emergency",
    supervisor: "Dr. K. Fletcher",
    shiftSchedule: "09:00 AM - 05:30 PM",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDm7Q7lF5MMpRbZe3z9RdbL9quMTd3Y-pvAg0Vtbzj_8INna_14vlx187DrARYF78rAjQWGNqMLmHHpPZIpvFs_nHvOFxV9o4zEK4p6PbrqTTN-AsYOemDIM-FImMm4MeCRtylhVnCJ4uAj7mWYxtVl6uFITZRYkUtKbAeWMN1NZSxTT2le23Doqk2T05LOW-gYUdIXjMt-n-Xz9D3h0OD2WSRiPR2x50y696nGw4mVHmGfDNymnmQPLJ1RSb_K5wPuu-cDz4XM8sQ4",
    initials: "MC",
    status: "Off Duty",
  },
  "4492-er": {
    id: "4492-ER",
    name: "Elena Rodriguez",
    email: "e.rodriguez@aven.com",
    role: "Senior Medical Secretary",
    department: "Administration",
    supervisor: "Dr. A. Mendez",
    shiftSchedule: "08:00 AM - 04:30 PM",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYsT9X3ChV-sIke_7429o_cg5cTdRzLoGjbjlXxAcbnYJmGPHEJe4BU4mfn5VxqkftqXqxZHcFo1lPDvMuofKKna4WdyamM85Z64RgI96n-kOYtrAzkPmWOn_klnIwVdQtZgDvmE9DgMh5D04GM5fOENOf4zmRXetWUM2AflWJew2vwmrtpCDuI4aHRY-7ZU54Bs4MGrYBMaAgNLz-89VYTBn0ysWhgXiys5wFbpGtpDBpxEyTKIApECmeyhhYFyKUpY6w7TL7Btr0",
    initials: "ER",
    status: "On Shift",
  },
};
