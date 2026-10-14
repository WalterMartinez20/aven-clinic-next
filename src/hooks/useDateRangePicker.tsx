"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import { MONTHS_ES, DatePreset } from "@/types/dateRangePicker.types";

export function useDateRangePicker(
  startDate: Date,
  endDate: Date,
  onChange: (start: Date, end: Date) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(startDate));
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync date view when startDate changes
  useEffect(() => {
    if (startDate) setCurrentDate(new Date(startDate));
  }, [startDate]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    const clicked = new Date(year, month, day);
    if (!startDate || (startDate && endDate)) {
      onChange(clicked, clicked);
    } else {
      if (clicked < startDate) {
        onChange(clicked, startDate);
      } else {
        onChange(startDate, clicked);
      }
    }
  };

  const isSelected = (day: number) => {
    const date = new Date(year, month, day);
    if (!startDate) return false;
    const dTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const sTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    const eTime = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() : null;
    if (eTime) return dTime >= sTime && dTime <= eTime;
    return dTime === sTime;
  };

  const isRangeBound = (day: number, bound: "start" | "end") => {
    const date = new Date(year, month, day);
    const dTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    if (bound === "start") {
      return dTime === new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    } else if (endDate) {
      return dTime === new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
    }
    return false;
  };

  const applyPreset = (preset: DatePreset) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let start = new Date(today);
    let end = new Date(today);
    switch (preset) {
      case "today": break;
      case "yesterday":
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
        break;
      case "last7":
        start.setDate(today.getDate() - 6);
        break;
      case "last30":
        start.setDate(today.getDate() - 29);
        break;
      case "thisMonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
    }
    onChange(start, end);
    setIsOpen(false);
  };

  const formatDateString = (d: Date) => {
    if (!d) return "";
    const monthName = MONTHS_ES[d.getMonth()].substring(0, 3).toLowerCase();
    return `${d.getDate()} ${monthName}, ${d.getFullYear()}`;
  };

  // Build calendar cells
  const calendarCells: React.ReactNode[] = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDay = prevMonthDays - i;
    calendarCells.push(
      <div
        key={`prev-${prevDay}`}
        className="h-9 w-9 flex items-center justify-center text-xs font-semibold text-slate-300 pointer-events-none"
      >
        {prevDay}
      </div>
    );
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isSel = isSelected(d);
    const isStart = isRangeBound(d, "start");
    const isEnd = isRangeBound(d, "end");
    let cellClass = "h-9 w-9 flex items-center justify-center text-xs font-bold rounded-xl transition-all cursor-pointer ";
    if (isStart && isEnd) {
      cellClass += "bg-primary text-white shadow-md shadow-primary/20 scale-105";
    } else if (isStart) {
      cellClass += "bg-primary text-white rounded-r-none rounded-l-xl shadow-md shadow-primary/20 scale-105";
    } else if (isEnd) {
      cellClass += "bg-primary text-white rounded-l-none rounded-r-xl shadow-md shadow-primary/20 scale-105";
    } else if (isSel) {
      cellClass += "bg-primary-light text-primary-container rounded-none font-extrabold";
    } else {
      cellClass += "text-slate-700 hover:bg-slate-100 hover:text-slate-900";
    }
    calendarCells.push(
      <div key={`day-${d}`} onClick={() => handleDateClick(d)} className={cellClass}>
        {d}
      </div>
    );
  }

  return {
    isOpen, setIsOpen,
    containerRef,
    year, month,
    calendarCells,
    MONTHS_ES,
    formatDateString,
    applyPreset,
    handlePrevMonth,
    handleNextMonth,
  };
}
