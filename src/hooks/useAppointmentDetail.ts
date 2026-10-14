"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  mockAppointmentsDb,
  appointmentCalendarDays,
  appointmentTimeSlots,
} from "@/types/appointments.types";

export function useAppointmentDetail(rawId: string, mode: string) {
  const router = useRouter();
  const isReadOnly = mode === "view";
  const appointmentId = rawId.toUpperCase();

  const record = mockAppointmentsDb[rawId] || mockAppointmentsDb["ap-201"];

  const [patientName, setPatientName] = useState(record.name);
  const [phone, setPhone] = useState(record.phone);
  const [department, setDepartment] = useState(record.department);
  const [doctor, setDoctor] = useState(record.doctor);
  const [visitType, setVisitType] = useState(record.visitType);
  const [reason, setReason] = useState(record.reason);
  const [selectedDay, setSelectedDay] = useState(record.dateDay);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(record.timeSlot);
  const [duration, setDuration] = useState(record.duration);
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push(`/dashboard/appointments/${rawId}?mode=view`);
    }, 1500);
  };

  const patientIdDisplay =
    appointmentId === "AP-202"
      ? "#PT-882910"
      : appointmentId === "AP-203"
      ? "#PT-448102"
      : "#PT-103991";

  return {
    // derived
    isReadOnly,
    appointmentId,
    patientIdDisplay,
    calendarDays: appointmentCalendarDays,
    timeSlots: appointmentTimeSlots,
    // state
    patientName, setPatientName,
    phone, setPhone,
    department, setDepartment,
    doctor, setDoctor,
    visitType, setVisitType,
    reason, setReason,
    selectedDay, setSelectedDay,
    selectedTimeSlot, setSelectedTimeSlot,
    duration, setDuration,
    showToast,
    // handler
    handleSave,
  };
}
