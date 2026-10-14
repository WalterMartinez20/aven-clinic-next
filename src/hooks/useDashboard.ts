"use client";

import { useState, useEffect } from "react";
import { dashboardService, Patient } from "@/services/dashboard.service";
import { ChartDataPoint, BarItem } from "@/types/dashboard.types";

// ── Pure helpers ────────────────────────────────────────────────────────────

export const getMonthsInRange = (
  start: Date,
  end: Date
): { year: number; month: number; label: string; longLabel: string; isToday: boolean }[] => {
  const months: {
    year: number;
    month: number;
    label: string;
    longLabel: string;
    isToday: boolean;
  }[] = [];
  const curr = new Date(start.getFullYear(), start.getMonth(), 1);
  const limit = new Date(end.getFullYear(), end.getMonth(), 1);
  const monthsNames = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];
  const monthsLong = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre",
  ];
  const today = new Date();

  while (curr <= limit) {
    const isTodayVal =
      curr.getFullYear() === today.getFullYear() &&
      curr.getMonth() === today.getMonth();
    months.push({
      year: curr.getFullYear(),
      month: curr.getMonth(),
      label: isTodayVal
        ? `${monthsNames[curr.getMonth()]} ${curr.getFullYear().toString().substring(2)} (HOY)`
        : `${monthsNames[curr.getMonth()]} ${curr.getFullYear().toString().substring(2)}`,
      longLabel: `Métricas de ${monthsLong[curr.getMonth()]} ${curr.getFullYear()}`,
      isToday: isTodayVal,
    });
    curr.setMonth(curr.getMonth() + 1);
  }
  return months;
};

export const getPatientsForMonth = (
  year: number,
  month: number,
  urgency: "All" | "Green" | "Yellow" | "Red"
) => {
  const seed = (month * 11 + year * 7) % 15;
  const total = 420 + seed * 30;
  if (urgency === "Green") return Math.round(total * 0.52);
  if (urgency === "Yellow") return Math.round(total * 0.33);
  if (urgency === "Red") return Math.max(15, Math.round(total * 0.15));
  return total;
};

export const getPatientsForDate = (
  date: Date,
  urgency: "All" | "Green" | "Yellow" | "Red"
) => {
  const day = date.getDate();
  const month = date.getMonth();
  const seed = (day * 7 + month * 13) % 11;
  const total = 14 + seed * 3 + (day % 4) * 2;
  if (urgency === "Green") return Math.round(total * 0.5);
  if (urgency === "Yellow") return Math.round(total * 0.35);
  if (urgency === "Red") return Math.max(1, Math.round(total * 0.15));
  return total;
};

export const getPatientsForHour = (
  hour: string,
  urgency: "All" | "Green" | "Yellow" | "Red"
) => {
  const h = parseInt(hour.split(":")[0]);
  let base = 8;
  if (h >= 10 && h <= 12) base = 28;
  else if (h >= 16 && h <= 18) base = 34;
  else if (h >= 13 && h <= 15) base = 16;
  else if (h >= 19) base = 12;
  const seed = (h * 17) % 5;
  const total = base + seed;
  if (urgency === "Green") return Math.round(total * 0.5);
  if (urgency === "Yellow") return Math.round(total * 0.35);
  if (urgency === "Red") return Math.max(1, Math.round(total * 0.15));
  return total;
};

export const formatChartXLabel = (d: Date, totalDays: number) => {
  const daysOfWeek = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const dayName = daysOfWeek[d.getDay()];
  const monthName = months[d.getMonth()];
  if (totalDays <= 7) {
    return `${dayName} ${d.getDate()} ${monthName}`;
  }
  return `${d.getDate()} ${monthName}`;
};

export const formatLongDateES = (d: Date) => {
  const weekdays = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const monthsLong = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre",
  ];
  return `${weekdays[d.getDay()]}, ${d.getDate()} de ${monthsLong[d.getMonth()]} de ${d.getFullYear()}`;
};

export const getDaysInRange = (start: Date, end: Date): Date[] => {
  const days: Date[] = [];
  const curr = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const limit = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  while (curr <= limit) {
    days.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return days;
};

// ── Hook ────────────────────────────────────────────────────────────────────

export function useDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const [selectedUrgency, setSelectedUrgency] = useState<"All" | "Green" | "Yellow" | "Red" | "CRITICAL" | "URGENT" | "NORMAL">("All");

  const [startDate, setStartDate] = useState<Date>(() => new Date());
  const [endDate, setEndDate] = useState<Date>(() => new Date());
  const [hoveredBar, setHoveredBar] = useState<{
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
    dp: ChartDataPoint;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let active = true;
    const loadPatients = async () => {
      const data = dashboardService.getPatients();
      if (active) setPatients(data);
    };
    loadPatients();
    return () => { active = false; };
  }, []);

  const getUrgencyClasses = (urgency: string) => {
    switch (urgency) {
      case "CRITICAL": return "bg-red-50 text-red-500 ring-red-500/10";
      case "URGENT": return "bg-orange-50 text-orange-500 ring-orange-500/10";
      default: return "bg-blue-50 text-blue-500 ring-blue-500/10";
    }
  };

  const filteredPatients = patients.filter((p) => {
    const urgencyMap: Record<string, string> = {
      Red: "CRITICAL",
      Yellow: "URGENT",
      Green: "NORMAL",
      CRITICAL: "CRITICAL",
      URGENT: "URGENT",
      NORMAL: "NORMAL",
    };
    const targetUrgency = urgencyMap[selectedUrgency];
    const matchesUrgency = selectedUrgency === "All" || p.urgency === targetUrgency || p.urgency === selectedUrgency;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.document.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUrgency && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));
  const activePage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const handleTimeframeChange = (t: "Daily" | "Weekly" | "Monthly") => {
    setTimeframe(t);
    const today = new Date();
    if (t === "Daily") {
      setStartDate(today);
      setEndDate(today);
    } else if (t === "Weekly") {
      const start = new Date(today);
      start.setDate(today.getDate() - 6);
      setStartDate(start);
      setEndDate(today);
    } else {
      const start = new Date(today.getFullYear(), today.getMonth() - 5, 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setStartDate(start);
      setEndDate(end);
    }
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    const diffDays =
      Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays <= 1) setTimeframe("Daily");
    else if (diffDays <= 7) setTimeframe("Weekly");
    else setTimeframe("Monthly");
  };

  const handleDeletePatient = (id: string) => {
    dashboardService.deletePatient(id);
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const isSingleDay = startDate.toDateString() === endDate.toDateString();
  const hours = ["08:00","10:00","12:00","14:00","16:00","18:00","20:00"];

  const chartUrgency: "All" | "Green" | "Yellow" | "Red" = 
    selectedUrgency === "CRITICAL" ? "Red" :
    selectedUrgency === "URGENT" ? "Yellow" :
    selectedUrgency === "NORMAL" ? "Green" :
    (selectedUrgency as "All" | "Green" | "Yellow" | "Red");

  const dataPoints: ChartDataPoint[] =
    timeframe === "Monthly"
      ? getMonthsInRange(startDate, endDate).map((m) => ({
          label: m.label,
          longLabel: m.longLabel,
          value: getPatientsForMonth(m.year, m.month, chartUrgency),
          isToday: m.isToday,
          breakdown: {
            total: getPatientsForMonth(m.year, m.month, "All"),
            green: getPatientsForMonth(m.year, m.month, "Green"),
            yellow: getPatientsForMonth(m.year, m.month, "Yellow"),
            red: getPatientsForMonth(m.year, m.month, "Red"),
          },
        }))
      : isSingleDay
      ? hours.map((h) => {
          const nowHour = new Date().getHours();
          const slotHour = parseInt(h.split(":")[0], 10);
          // Highlight the slot that is closest to or covers current hour (within 2-hour interval)
          const isCurrentSlot = nowHour >= slotHour && nowHour < slotHour + 2;
          return {
            label: h,
            longLabel: `Hoy a las ${h}`,
            value: getPatientsForHour(h, chartUrgency),
            isToday: isCurrentSlot,
            breakdown: {
              total: getPatientsForHour(h, "All"),
              green: getPatientsForHour(h, "Green"),
              yellow: getPatientsForHour(h, "Yellow"),
              red: getPatientsForHour(h, "Red"),
            },
          };
        })
      : getDaysInRange(startDate, endDate).map((d) => {
          const daysLen = getDaysInRange(startDate, endDate).length;
          const isToday = d.toDateString() === new Date().toDateString();
          return {
            label: isToday
              ? `${formatChartXLabel(d, daysLen)} (HOY)`
              : formatChartXLabel(d, daysLen),
            longLabel: formatLongDateES(d),
            value: getPatientsForDate(d, chartUrgency),
            isToday,
            breakdown: {
              total: getPatientsForDate(d, "All"),
              green: getPatientsForDate(d, "Green"),
              yellow: getPatientsForDate(d, "Yellow"),
              red: getPatientsForDate(d, "Red"),
            },
          };
        });

  const maxVal = Math.max(
    ...dataPoints.map((dp) => dp.breakdown.green + dp.breakdown.yellow + dp.breakdown.red),
    10
  );
  const yLabels = [
    `${maxVal}`,
    `${Math.round(maxVal * 0.75)}`,
    `${Math.round(maxVal * 0.5)}`,
    `${Math.round(maxVal * 0.25)}`,
    "0",
  ];

  const paddingLeft = 40;
  const paddingRight = 20;
  const availableWidth = 1000 - paddingLeft - paddingRight;
  const totalPoints = dataPoints.length;

  const bars: BarItem[] = dataPoints.map((dp, idx) => {
    const slotWidth = availableWidth / totalPoints;
    const xCenter = paddingLeft + idx * slotWidth + slotWidth / 2;
    const isMonthly = timeframe === "Monthly";
    const barWidth = isMonthly ? 110 : Math.max(6, slotWidth * 0.65);
    const x = xCenter - barWidth / 2;
    const chartHeight = 140;
    const barHeight = isMonthly ? 110 : (dp.value / maxVal) * chartHeight;
    const y = 140 - barHeight;
    return { x, y, width: barWidth, height: Math.max(4, barHeight), dp };
  });

  const summaryText = isSingleDay
    ? `Llegadas por hora • ${formatLongDateES(startDate)}`
    : `Llegadas por día • Rango seleccionado (${dataPoints.length} días)`;

  return {
    // state
    patients,
    searchQuery, setSearchQuery,
    timeframe,
    selectedUrgency, setSelectedUrgency,
    startDate, endDate,
    hoveredBar, setHoveredBar,
    currentPage, setCurrentPage,
    // derived
    filteredPatients,
    paginatedPatients,
    totalPages,
    activePage,
    isSingleDay,
    dataPoints,
    bars,
    yLabels,
    maxVal,
    availableWidth,
    totalPoints,
    summaryText,
    // handlers
    handleTimeframeChange,
    handleDateRangeChange,
    handleDeletePatient,
    getUrgencyClasses,
  };
}
