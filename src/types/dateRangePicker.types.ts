export interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
  align?: "left" | "right";
}

export const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const DAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export type DatePreset = "today" | "yesterday" | "last7" | "thisMonth" | "last30";
