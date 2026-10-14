export interface KPI {
  title: string;
  value: string;
  trend: number;
  trendText?: string;
  icon: string;
  color?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ConsultationReason {
  reason: string;
  frequency: number;
  trend: number;
}

export interface PaymentMethodData {
  method: string;
  description: string;
  icon: string;
  volumePercentage: number;
  amount: number;
  trend: number;
}

export interface LiveQueueStatus {
  department: string;
  doctor: string;
  status: 'On Time' | 'Slight Delay' | 'Delayed';
  queueLength: number;
  avgWait: string;
}

export interface OperationsOverview {
  bedOccupancy: number;
  staffUtilization: number;
  avgConsultTime: string;
  patientThroughput: number;
}
