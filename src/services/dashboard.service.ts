export interface Patient {
  id: string;
  name: string;
  age: number;
  document: string;
  reason: string;
  urgency: 'CRITICAL' | 'NORMAL' | 'URGENT';
  time: string;
  avatarUrl: string;
}

const DEFAULT_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Ricardo Silva',
    age: 45,
    document: '982.112.443-09',
    reason: 'Severe Headache',
    urgency: 'CRITICAL',
    time: '10:24 AM',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwwerctj_U9HHONsfoIF7qHzuQMGuBWA1rS0Hp2HsYv2g8nFDM-CkwaC9hyOz47n-mSY0fFFC77mVykcRQdRkD5aYnv1LtyCvl7cXO2FPsu4WsPcO6HU1kokQmP7lknTRnWea3isnx1agkBrmthTrqW-DY1I8Gnl04zjqpUwISudfdAF9_gfQWjeOmEw3YuND7wG9VF4gZinJDlVZHlz_pGS_lkICIS6JvgsvCmaQWlsIStiJdHaOpvX67jC6sHFwRgw88UoXqqLwC'
  },
  {
    id: '2',
    name: 'Amanda Lee',
    age: 28,
    document: '332.887.091-22',
    reason: 'Routine Checkup',
    urgency: 'NORMAL',
    time: '10:45 AM',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRVGTwAik1Hwlt7amlBnS__hLAiYZTzJwaP702GS2xZ298NAqGstqGVOS47uRvMizrl6yQ5cJNADaBbniuMNI6EkTGKYbUKRhcdYnQJnYdQsCw6l5mWAuIuWOyK5jpFmqCyretnyaCjkmo5EEAj85Kb6Uwaj-3ccophIAGr-sJ0Mdo1SQgial-jGB7s4Bys2TNkAEwxHGRH8f9Qz7_0BLtgLBpmyyPXT5dFpIi8s3-Z6HRyuJJ4nhtU7i321_-StZXcAOe5GKczMoK'
  },
  {
    id: '3',
    name: 'Marco Rossi',
    age: 62,
    document: '112.556.778-45',
    reason: 'Lower Back Pain',
    urgency: 'URGENT',
    time: '11:12 AM',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJH7kwMzu4aJdWHhAffmCdsZhIymFFFgu-h6_5wuHZOg5G_E8_LRCXZklVOKwzRBTx49QTbaUqkh8EqkIBzUmkXpjc-_Ll5KAudv-Xf3w9gX-O1DGHNaax-twsPSOfqebA1PnVz7XueqF7zw6GgRFlioN07ExgFtHm7xsPBSNpF9MpCL10NhlLkt96L6-xLBvKLhWOB63_knMZg65T6RtIVpaVUctqf018ojHZ-7uwCBxPlTooIcDIcymi4G3yV2darCWOW5RJGt4j'
  }
];

const STORAGE_KEY = 'aven_clinic_demo_patients';

export const dashboardService = {
  getPatients(): Patient[] {
    if (typeof window === 'undefined') return DEFAULT_PATIENTS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PATIENTS));
      return DEFAULT_PATIENTS;
    }
    return JSON.parse(stored);
  },

  addPatient(patient: Omit<Patient, 'id'>): Patient {
    const patients = this.getPatients();
    const newPatient = { ...patient, id: Date.now().toString() };
    patients.push(newPatient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    return newPatient;
  },

  deletePatient(id: string): void {
    const patients = this.getPatients();
    const filtered = patients.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  resetDemoData(): Patient[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PATIENTS));
    return DEFAULT_PATIENTS;
  }
};
