"use client";

import React from "react";
import { useDateRangePicker } from "@/hooks/useDateRangePicker";
import { DateRangePickerProps, DAYS_ES } from "@/types/dateRangePicker.types";

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  align = "right",
}: DateRangePickerProps) {
  const {
    isOpen, setIsOpen,
    containerRef,
    year, month,
    calendarCells,
    MONTHS_ES,
    formatDateString,
    applyPreset,
    handlePrevMonth,
    handleNextMonth,
  } = useDateRangePicker(startDate, endDate, onChange);

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/60 cursor-pointer hover:bg-slate-100/50 transition-all select-none shadow-sm"
      >
        <div className="flex items-center px-3 py-1 gap-2">
          <span className="material-symbols-outlined text-sm text-slate-400">calendar_month</span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Rango:</span>
          <span className="text-xs font-black text-slate-700">
            {formatDateString(startDate)} — {formatDateString(endDate)}
          </span>
        </div>
      </div>

      {/* Popover */}
      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-3 w-[460px] md:w-[500px] bg-white/95 backdrop-blur-md rounded-[2rem] shadow-glass border border-white/50 p-5 z-50 animate-in fade-in slide-in-from-top-3 duration-250 flex flex-col md:flex-row gap-4`}
        >
          {/* Quick Preset Sidebar */}
          <div className="w-full md:w-36 flex flex-col gap-1 border-r border-slate-100 pr-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 mb-1">
              Accesos Rápidos
            </p>
            {(["thisMonth", "today", "yesterday", "last7", "last30"] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                className="text-left text-xs font-bold text-slate-600 hover:bg-primary/5 hover:text-primary px-3 py-2 rounded-xl transition-all"
              >
                {preset === "thisMonth" ? "Este Mes" :
                 preset === "today" ? "Hoy" :
                 preset === "yesterday" ? "Ayer" :
                 preset === "last7" ? "Últimos 7 días" : "Últimos 30 días"}
              </button>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="flex-1">
            {/* Header Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all border border-slate-200/20"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <h4 className="text-sm font-black text-slate-800 tracking-tight">
                {MONTHS_ES[month]} {year}
              </h4>
              <button
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all border border-slate-200/20"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {DAYS_ES.map((d) => (
                <span key={d} className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarCells}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Rango seleccionado
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-[11px] font-black tracking-tight transition-all active:scale-95"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
