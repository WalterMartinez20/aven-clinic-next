export interface PatientDirectory {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  initials: string;
  ageGender: string;
  lastVisitDate: string;
  lastVisitDept: string;
  status: "Active" | "Pending" | "Inactive";
  urgency?: "Critical" | "Urgent" | "Normal";
}

export const initialPatients: PatientDirectory[] = [
  {
    id: "PT-88231",
    name: "Eleanor Vance",
    email: "eleanor.v@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQBlXBxv78vXGFrH3b9xWEebj5h2s_z1UF-vY_tLAEO-VYacSkrB3dpb9wezo__UHn3SSRykeAWImfODXkmiZH-4kvhWkhGD42fRUh_HHBRHu1I9lh1wDlQXtahSveuEtfHGhvRPX6Zceb2U-Za7JQEGhKz9M6DdLVAWVV5meEgXzsgkqr2IIWJfqprbn6IIBjPCeo0EGfw4NQEs3qSNm65dF7vsSmQSqaU9cmCrXMBd_ZAgx7ysdmhXCyWaLqnXkgSF0iIyvbUw0b",
    initials: "EV",
    ageGender: "42, Female",
    lastVisitDate: "Oct 12, 2023",
    lastVisitDept: "Cardiology",
    status: "Active",
    urgency: "Critical",
  },
  {
    id: "PT-88232",
    name: "Marcus Reed",
    email: "m.reed88@example.com",
    avatarUrl: "",
    initials: "MR",
    ageGender: "35, Male",
    lastVisitDate: "Oct 10, 2023",
    lastVisitDept: "General Practice",
    status: "Pending",
  },
  {
    id: "PT-88233",
    name: "Arthur Pendelton",
    email: "arthur.p@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDm7Q7lF5MMpRbZe3z9RdbL9quMTd3Y-pvAg0Vtbzj_8INna_14vlx187DrARYF78rAjQWGNqMLmHHpPZIpvFs_nHvOFxV9o4zEK4p6PbrqTTN-AsYOemDIM-FImMm4MeCRtylhVnCJ4uAj7mWYxtVl6uFITZRYkUtKbAeWMN1NZSxTT2le23Doqk2T05LOW-gYUdIXjMt-n-Xz9D3h0OD2WSRiPR2x50y696nGw4mVHmGfDNymnmQPLJ1RSb_K5wPuu-cDz4XM8sQ4",
    initials: "AP",
    ageGender: "71, Male",
    lastVisitDate: "Sep 28, 2023",
    lastVisitDept: "Neurology",
    status: "Inactive",
  },
];
