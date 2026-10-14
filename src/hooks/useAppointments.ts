"use client";

import { useState } from "react";
import { Appointment, initialAppointments } from "@/types/appointments.types";

export const parseAppointmentDate = (dateStr: string): Date => new Date(dateStr);

export const getWeekDays = (baseDate: Date): Date[] => {
  const day = baseDate.getDay();
  const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(baseDate.getFullYear(), baseDate.getMonth(), diff);
  const weekDays: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDays.push(d);
  }
  return weekDays;
};

export const formatDateStringES = (d: Date) => {
  if (!d) return "";
  const months = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre",
  ];
  return `${d.getDate()} de ${months[d.getMonth()]}, ${d.getFullYear()}`;
};

export const getStatusBadgeClassApp = (status: Appointment["status"]) => {
  switch (status) {
    case "Confirmed": return "bg-emerald-50 text-emerald-500 ring-emerald-500/10";
    case "Pending":   return "bg-amber-50 text-amber-500 ring-amber-500/10";
    case "Completed": return "bg-blue-50 text-blue-500 ring-blue-500/10";
    case "Canceled":  return "bg-red-50 text-red-500 ring-red-500/10";
  }
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [endDate, setEndDate] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
  });

  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>("AP-201");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const selectedApp =
    appointments.find((app) => app.id === selectedAppointmentId) || appointments[0];

  const weekDays = getWeekDays(new Date());

  const getAppointmentForSlot = (day: Date, timeSlot: string) =>
    appointments.find((app) => {
      const appDate = parseAppointmentDate(app.date);
      const sameDate =
        appDate.getDate() === day.getDate() &&
        appDate.getMonth() === day.getMonth() &&
        appDate.getFullYear() === day.getFullYear();
      if (!sameDate) return false;
      
      const cleanSlot = timeSlot.replace(/^0/, '').toLowerCase().trim();
      const cleanAppTime = app.time.replace(/^0/, '').toLowerCase().trim();
      
      const slotHourMin = cleanSlot.split(' ')[0];
      const appHourMin = cleanAppTime.split(' ')[0];
      
      return slotHourMin === appHourMin || cleanAppTime.includes(cleanSlot) || cleanSlot.includes(cleanAppTime);
    });

  const filteredAppointments = appointments.filter((app) => {
    const appDate = parseAppointmentDate(app.date);
    const appTime = new Date(appDate.getFullYear(), appDate.getMonth(), appDate.getDate()).getTime();
    const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    const endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();

    if (appTime < startTime || appTime > endTime) return false;
    if (selectedStatus !== "All" && app.status !== selectedStatus) return false;
    if (selectedDoctor !== "All" && app.doctor !== selectedDoctor) return false;
    if (selectedType !== "All" && app.type !== selectedType) return false;

    return (
      app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / itemsPerPage));
  const activePage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return {
    // state
    appointments,
    searchQuery, setSearchQuery,
    selectedStatus, setSelectedStatus,
    selectedDoctor, setSelectedDoctor,
    selectedType, setSelectedType,
    startDate, endDate,
    selectedAppointmentId, setSelectedAppointmentId,
    currentPage, setCurrentPage,
    // derived
    selectedApp,
    weekDays,
    filteredAppointments,
    paginatedAppointments,
    totalPages,
    activePage,
    // helpers
    getAppointmentForSlot,
    getStatusBadgeClassApp,
    formatDateStringES,
    handleDeleteAppointment,
    handleDateRangeChange,
  };
}
