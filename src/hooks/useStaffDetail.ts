"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  mockStaffDatabase,
  AttendanceRecord,
} from "@/types/staff.types";

export const formatElapsedTime = (totalSecs: number) => {
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export function useStaffDetail(rawId: string, mode: string) {
  const router = useRouter();
  const isReadOnly = mode === "view";
  const staffId = rawId.toUpperCase();

  const record = mockStaffDatabase[rawId] || mockStaffDatabase["4492-er"];

  const [fullName, setFullName] = useState(record.name);
  const [email, setEmail] = useState(record.email);
  const [role, setRole] = useState(record.role);
  const [department, setDepartment] = useState(record.department);
  const [supervisor, setSupervisor] = useState(record.supervisor);
  const [shiftSchedule, setShiftSchedule] = useState(record.shiftSchedule);
  const [avatarUrl] = useState(record.avatarUrl);
  const [initials] = useState(record.initials);

  const [showToast, setShowToast] = useState(false);
  const [shiftActive, setShiftActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(15120);
  const [shiftStart, setShiftStart] = useState("08:04 AM");
  const [lunchBreak, setLunchBreak] = useState("Pending");

  useEffect(() => {
    if (!shiftActive || isPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [shiftActive, isPaused]);

  const handleToggleShift = () => {
    if (shiftActive) {
      setShiftActive(false);
      setIsPaused(false);
      setLunchBreak("00:30 min (Taken)");
    } else {
      setShiftActive(true);
      setShiftStart(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setElapsedSeconds(0);
      setLunchBreak("Pending");
    }
  };

  const handleTogglePause = () => {
    if (shiftActive) setIsPaused((p) => !p);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push(`/dashboard/staff/${rawId}?mode=view`);
    }, 1500);
  };

  const attendanceHistory: AttendanceRecord[] = [
    {
      day: "Monday",
      date: "14 Oct, 2023",
      clockIn: "07:58 AM",
      clockOut: "16:35 PM",
      breakTime: "00:45 min",
      totalHours: "08:37",
    },
    {
      day: "Tuesday",
      date: "15 Oct, 2023",
      clockIn: "08:02 AM",
      clockOut: "17:15 PM",
      breakTime: "01:00 hr",
      totalHours: "08:13",
    },
    {
      day: "Wednesday",
      date: "16 Oct, 2023",
      clockIn: "08:00 AM",
      clockOut: "16:40 PM",
      breakTime: "00:45 min",
      totalHours: "08:40",
    },
    {
      day: "Thursday (Today)",
      date: "17 Oct, 2023",
      clockIn: shiftStart,
      clockOut: shiftActive
        ? "In Progress..."
        : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      breakTime: lunchBreak,
      totalHours: formatElapsedTime(elapsedSeconds).substring(0, 5),
      isToday: true,
    },
    {
      day: "Friday",
      date: "18 Oct, 2023",
      clockIn: "Upcoming",
      clockOut: "Upcoming",
      breakTime: "--:--",
      totalHours: "00:00",
    },
  ];

  return {
    // derived
    isReadOnly,
    staffId,
    avatarUrl,
    initials,
    // state
    fullName, setFullName,
    email, setEmail,
    role, setRole,
    department, setDepartment,
    supervisor, setSupervisor,
    shiftSchedule, setShiftSchedule,
    showToast,
    shiftActive,
    isPaused,
    elapsedSeconds,
    shiftStart,
    lunchBreak,
    // data
    attendanceHistory,
    // handlers
    handleToggleShift,
    handleTogglePause,
    handleSave,
    formatElapsedTime,
  };
}
