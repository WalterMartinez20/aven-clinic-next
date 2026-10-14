"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";
import { Pagination } from "@/components/ui/Pagination";
import { UrgencyBadge, StatusDotBadge } from "@/components/ui/StatusBadge";
import { GlobalDateSelector } from "@/components/ui/GlobalDateSelector";
import {
  useAppointments,
} from "@/hooks/useAppointments";
import { Appointment } from "@/types/appointments.types";

export default function AppointmentDirectory() {
  const {
    searchQuery, setSearchQuery,
    selectedStatus, setSelectedStatus,
    selectedAppointmentId, setSelectedAppointmentId,
    currentPage, setCurrentPage,
    weekDays,
    filteredAppointments,
    paginatedAppointments,
    totalPages,
    activePage,
    getAppointmentForSlot,
    handleDeleteAppointment,
  } = useAppointments();

  const [activeModalApp, setActiveModalApp] = useState<Appointment | null>(null);
  const [viewMode, setViewMode] = useState<'today' | 'week' | 'month'>('week');
  const [date, setDate] = useState("Today");
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const handleOpenModal = (app: Appointment) => {
    setSelectedAppointmentId(app.id);
    setActiveModalApp(app);
  };

  const getConsultationTypeBadge = (type: string) => {
    switch (type) {
      case "In Consult":
      case "General Consult":
        return "bg-sky-50 text-sky-800 border-sky-200/80";
      case "Therapy Session":
      case "Specialty Care":
        return "bg-indigo-50 text-indigo-800 border-indigo-200/80";
      case "Pending Check-in":
        return "bg-amber-50 text-amber-800 border-amber-200/80";
      case "Follow-up":
        return "bg-emerald-50 text-emerald-800 border-emerald-200/80";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200/80";
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 w-full">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Schedule Overview</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Appointments</h2>
          <p className="text-base text-slate-500 font-medium mt-2">Manage daily consultations, doctor schedules, and appointment requests.</p>
        </div>
        <div className="flex flex-col md:items-end gap-4 shrink-0">
          <div className="text-left md:text-right" title={`Today is ${today}`}>
            <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-1">Date</p>
            <p className="text-2xl font-semibold tracking-tight text-on-surface-variant">{viewMode === 'today' ? today : date}</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <GlobalDateSelector value={date} onChange={setDate} className="bg-surface-container-lowest border border-surface-container shadow-sm" />
            <div className="bg-surface-container-lowest rounded-full px-2 py-1 flex items-center shadow-sm border border-surface-container">
              <button 
                onClick={() => setViewMode('today')}
                className={`px-6 py-2 rounded-full font-headline-sm text-sm font-semibold transition-all shadow-sm ${viewMode === 'today' ? 'bg-primary-container text-on-secondary' : 'text-on-surface-variant hover:text-primary'}`} 
                title="View Today's Appointments"
              >
                Today
              </button>
              <button 
                onClick={() => setViewMode('week')}
                className={`px-6 py-2 rounded-full font-headline-sm text-sm font-semibold transition-all ${viewMode === 'week' ? 'bg-primary-container text-on-secondary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`} 
                title="View Weekly View"
              >
                Week
              </button>
              <button 
                onClick={() => setViewMode('month')}
                className={`px-6 py-2 rounded-full font-headline-sm text-sm font-semibold transition-all ${viewMode === 'month' ? 'bg-primary-container text-on-secondary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`} 
                title="View Monthly View"
              >
                Month
              </button>
            </div>
            <Link href="/dashboard/appointments/new" className="bg-primary-container text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-primary transition-all flex items-center gap-3 shadow-md shrink-0 cursor-pointer" title="Create New Appointment">
              <span className="material-symbols-outlined text-xl">add</span> New
            </Link>
          </div>
        </div>
      </div>

      {/* Full-Width Agenda Container */}
      <div className="w-full space-y-8">
        
        {/* Month View Section */}
        {viewMode === 'month' && (
          <div className="w-full bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-container animate-in fade-in duration-300">
            <div className="grid grid-cols-7 border-b border-surface-container mb-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                <div key={d} className="pb-4 text-center font-metadata font-bold text-outline-variant uppercase tracking-widest">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNum = i - 1; // start offset to push 1st to wednesday (index 2)
                const isValid = dayNum > 0 && dayNum <= 30;
                const isToday = dayNum === 9; // Hardcoded today as 9 for demo
                const appointments = dayNum === 9 ? 3 : dayNum === 14 ? 2 : dayNum === 22 ? 4 : 0;
                
                return (
                  <div key={i} className={`min-h-[120px] p-3 border rounded-2xl flex flex-col gap-2 ${isValid ? 'bg-white border-surface-container hover:border-primary/50 hover:shadow-md transition-all cursor-pointer' : 'bg-surface-container-lowest/30 border-transparent opacity-40'}`}>
                    {isValid && (
                      <>
                        <div className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-[#38bdf8] text-white shadow-sm' : 'text-on-surface-variant'}`}>
                          {dayNum}
                        </div>
                        {appointments > 0 && (
                          <div className="flex flex-col gap-1 mt-1">
                            <div className={`text-[10px] font-bold px-2 py-1.5 rounded-lg truncate ${isToday ? 'bg-primary-container text-white shadow-sm' : 'bg-primary-container/10 text-primary'}`}>
                              {appointments} Appt{appointments > 1 ? 's' : ''}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Weekly/Today Schedule Grid Section */}
        {viewMode !== 'month' && (
          <div className="w-full bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-container animate-in fade-in duration-300">
            {/* Calendar Header (Days) */}
            <div className={`grid ${viewMode === 'today' ? 'grid-cols-[100px_minmax(300px,500px)]' : 'grid-cols-6'} border-b border-surface-container mb-6 overflow-x-auto`}>
              <div className="pb-4 text-center min-w-[80px]">
                <span className="block text-metadata font-bold text-outline-variant uppercase tracking-widest mb-1">Time</span>
              </div>
              {weekDays.filter(day => viewMode === 'today' ? new Date().toDateString() === day.toDateString() : true).map((day, idx) => {
                const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
                const isToday = new Date().toDateString() === day.toDateString();
                const realIdx = weekDays.findIndex(d => d.toDateString() === day.toDateString());
                return (
                  <div key={idx} className={`pb-4 pt-2 text-center min-w-[130px] rounded-t-xl transition-colors ${isToday ? "bg-[#38bdf8] text-white shadow-md" : ""}`}>
                    <span className={`block text-metadata font-bold uppercase tracking-widest mb-1 ${isToday ? "text-white" : "text-outline-variant"}`}>
                      {dayNames[realIdx] || "Today"}
                    </span>
                    <span className={`text-xl font-extrabold ${isToday ? "text-white" : "text-on-background"}`}>
                      {day.getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Calendar Grid Rows */}
            <div className="space-y-2 relative overflow-x-auto select-none">
              {(["08:00 AM", "09:00 AM", "10:30 AM", "11:45 AM", "02:00 PM"] as const).map((timeSlot) => (
                <div key={timeSlot} className={`grid ${viewMode === 'today' ? 'grid-cols-[100px_minmax(300px,500px)]' : 'grid-cols-6 min-w-[780px]'} min-h-[105px] items-center border-b border-surface-container/40 gap-3 py-2`}>
                  <div className="text-center text-metadata font-bold text-outline-variant text-xs">{timeSlot}</div>
                  {weekDays.filter(day => viewMode === 'today' ? new Date().toDateString() === day.toDateString() : true).map((day, idx) => {
                    const app = getAppointmentForSlot(day, timeSlot);
                    if (!app) return <div key={idx} className="p-1 h-full min-h-[95px]" />;
                    
                    const isConfirmed = app.status === "Confirmed";
                    const isPending = app.status === "Pending";

                    return (
                      <div key={idx} className="p-1 h-full min-h-[95px] relative z-10">
                      <div 
                        onClick={() => handleOpenModal(app)} 
                        title={`Click to inspect consultation details for ${app.patientName}`}
                        className="group relative h-full w-full p-3 rounded-2xl bg-white border border-surface-container shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                      >
                        {/* Top Micro Badge */}
                        <div className="flex items-center justify-between gap-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200/60 font-metadata text-[9px] font-bold uppercase tracking-widest truncate">
                            {app.type}
                          </span>
                        </div>

                        {/* Patient Avatar & Name */}
                        <div className="flex items-center gap-2 my-1">
                          {app.patientAvatar ? (
                            <img src={app.patientAvatar} alt={app.patientName} className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-primary-container/10 text-primary flex items-center justify-center text-[10px] font-extrabold shrink-0">
                              {app.patientName.charAt(0)}
                            </div>
                          )}
                          <p className="text-xs font-extrabold text-on-surface group-hover:text-primary transition-colors truncate">
                            {app.patientName}
                          </p>
                        </div>

                        {/* Footer: Doctor Info */}
                        <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-medium pt-1 border-t border-surface-container/50">
                          <span className="truncate font-semibold">{app.doctor}</span>
                          <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity text-primary">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Appointment List Table (Exact Match to Staff and Patients Table Styles) */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">Appointment Directory</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Filter, review, and manage all scheduled clinical consultations.</p>
            </div>
          </div>
          
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-surface-container">
            <div className="flex gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1 px-1">
              {["All", "Confirmed", "Pending", "Completed", "Canceled"].map((status) => (
                <button
                  key={status}
                  onClick={() => { setSelectedStatus(status); setCurrentPage(1); }}
                  title={`Filter appointments by status: ${status}`}
                  className={`px-5 py-2.5 rounded-xl font-metadata text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                    selectedStatus === status 
                      ? 'bg-primary-container text-white font-bold shadow-sm cursor-default' 
                      : 'bg-slate-100/80 text-slate-500 hover:bg-primary-container hover:text-white hover:font-bold hover:shadow-md cursor-pointer'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-80" title="Search appointments by patient, doctor or modality">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#bdc8d1]">search</span>
              <input 
                className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium pl-12 pr-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all duration-200 shadow-2xs placeholder:text-slate-400 outline-none" 
                placeholder="Search appointments..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
          
          {/* Grid Table with responsive overflow protection */}
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <div className="min-w-[760px]">
              {/* Table Headers */}
              <GridTableHeader>
                <div className="col-span-4 lg:col-span-3">PATIENT</div>
                <div className="col-span-3 lg:col-span-2 hidden md:block">DATE / TIME</div>
                <div className="col-span-2 lg:col-span-2 hidden lg:block">DOCTOR</div>
                <div className="col-span-2 lg:col-span-2 hidden md:block">URGENCY</div>
                <div className="col-span-2 lg:col-span-2">STATUS</div>
                <div className="col-span-1 lg:col-span-1 text-right">ACTIONS</div>
              </GridTableHeader>

              {/* Table List Rows */}
              <GridTable>
                {paginatedAppointments.length > 0 ? paginatedAppointments.map((app) => (
                  <GridTableRow 
                    key={app.id} 
                    onClick={() => handleOpenModal(app)}
                    title={`Click to view details for ${app.patientName}`}
                  >
                    {/* Patient Name & Avatar */}
                    <GridTableCell className="col-span-4 lg:col-span-3 flex items-center gap-4 min-w-0">
                      {app.patientAvatar ? (
                        <img src={app.patientAvatar} alt={app.patientName} className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary-container font-headline-sm font-bold group-hover:scale-105 transition-transform shrink-0">
                          {app.patientName.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors truncate">{app.patientName}</p>
                        <p className="font-body-md text-on-surface-variant text-sm mt-0.5 md:hidden truncate">{app.type} • {app.time}</p>
                      </div>
                    </GridTableCell>
                    
                    {/* Date / Time */}
                    <GridTableCell className="col-span-3 lg:col-span-2 font-body-md text-on-surface-variant hidden md:block text-sm tabular-nums">
                      <div className="font-medium text-on-background">{app.date}</div>
                      <div className="text-xs text-outline-variant mt-0.5">{app.time}</div>
                    </GridTableCell>

                    {/* Doctor */}
                    <GridTableCell className="col-span-2 lg:col-span-2 font-body-md text-on-surface-variant hidden lg:block text-sm truncate">
                      {app.doctor}
                    </GridTableCell>

                    {/* Patient Urgency */}
                    <GridTableCell className="col-span-2 lg:col-span-2 hidden md:block">
                      <UrgencyBadge level={app.urgency || "Normal"} />
                    </GridTableCell>

                    {/* Status Badge */}
                    <GridTableCell className="col-span-2 lg:col-span-2">
                      <StatusDotBadge status={app.status} />
                    </GridTableCell>

                    {/* Actions Column */}
                    <GridTableCell className="col-span-1 lg:col-span-1 flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <Link 
                        href={`/dashboard/appointments/${app.id}?mode=edit`}
                        onClick={(e) => e.stopPropagation()} 
                        className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-highest hover:text-primary transition-all cursor-pointer" 
                        title="Edit Appointment"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </Link>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteAppointment(app.id); }} 
                        className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-all cursor-pointer" 
                        title="Delete Appointment"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </GridTableCell>
                  </GridTableRow>
                )) : (
                  <div className="py-16 text-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">event_busy</span>
                    <p className="text-sm font-bold text-on-surface-variant">No appointments matched your search or filters.</p>
                  </div>
                )}
              </GridTable>
            </div>
          </div>
          
          {/* Pagination Controls */}
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            totalItems={filteredAppointments.length}
            showingCount={paginatedAppointments.length}
            itemName="appointments"
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Daily Insights & Today's Progress Cards (Side-by-Side Full Width Below Table) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Daily Insights Card */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 flex flex-col justify-between">
            <h4 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">insights</span>
              Daily Insights
            </h4>
            <div className="space-y-4">
              <div>
                <p className="font-metadata text-metadata text-outline uppercase mb-1">Capacity Utilization</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display-lg text-display-lg leading-none">84</span>
                  <span className="text-on-surface-variant font-bold pb-1">%</span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: "84%" }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-low p-3.5 rounded-xl">
                  <p className="font-metadata text-[10px] text-outline uppercase mb-1">Cancellations</p>
                  <span className="font-headline-md text-headline-md text-on-background">
                    {filteredAppointments.filter(a => a.status === 'Canceled').length}
                  </span>
                </div>
                <div className="bg-surface-container-low p-3.5 rounded-xl">
                  <p className="font-metadata text-[10px] text-outline uppercase mb-1">Waitlist</p>
                  <span className="font-headline-md text-headline-md text-on-background">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Progress Card */}
          <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between">
            <h4 className="text-sm font-bold text-on-background mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              Today&apos;s Progress
            </h4>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-outline-variant uppercase">Completed Consultations</p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {filteredAppointments.filter(a => a.status === 'Completed').length} <span className="text-xs font-medium text-outline-variant">/ {filteredAppointments.length}</span>
                </p>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-outline-variant uppercase">Avg. Duration</p>
                <p className="text-2xl font-bold text-primary mt-1">24 <span className="text-xs font-medium text-outline-variant">min</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Appointment Detail Modal (Modeled After Patient Detail View Structure - Ultra Spacious & No Scroll) */}
      {activeModalApp && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-6xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-surface-container relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col gap-5 max-h-[95vh] overflow-y-auto">
            
            {/* Header (Matching Patient Detail View Header Style with Icon Buttons) */}
            <div className="px-6 py-5 bg-surface border border-surface-container rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="size-16 rounded-full bg-surface-container-low flex items-center justify-center overflow-hidden border-2 border-surface-container shadow-sm">
                    {activeModalApp.patientAvatar ? (
                      <img className="w-full h-full object-cover" src={activeModalApp.patientAvatar} alt={activeModalApp.patientName} />
                    ) : (
                      <div className="w-full h-full bg-primary-container text-white flex items-center justify-center font-extrabold text-xl">
                        {activeModalApp.patientName.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="font-headline-sm text-2xl font-bold text-on-surface">{activeModalApp.patientName}</h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/60 font-metadata text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      In Consultation
                    </span>
                  </div>
                  <p className="text-on-surface-variant mt-1 font-body-md text-sm flex items-center gap-2 flex-wrap">
                    <span><span className="font-bold">ID:</span> #{activeModalApp.id.replace("AP-", "882910-")}</span>
                    <span>•</span>
                    <span><span className="font-bold">42 years old</span> • <span className="font-bold">Female</span></span>
                  </p>
                  <p className="text-slate-500 mt-1 font-body-md text-xs flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-slate-400">calendar_today</span>
                      <span>Last Visit: <strong className="text-on-surface font-semibold">Oct 24, 2023</strong></span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-slate-400">water_drop</span>
                      <span>Type: <strong className="text-on-surface font-semibold">O+</strong></span>
                    </span>
                  </p>
                </div>
              </div>

              {/* Icon Action Buttons (Print, Edit, Close) */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.print()}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-surface-container bg-surface text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm cursor-pointer"
                  title="Print Summary"
                >
                  <span className="material-symbols-outlined text-xl">print</span>
                </button>
                <Link 
                  href={`/dashboard/appointments/${activeModalApp.id}?mode=edit`}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-surface-container bg-surface text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm cursor-pointer" 
                  title="Edit Appointment"
                >
                  <span className="material-symbols-outlined text-xl">edit</span>
                </Link>
                <button 
                  onClick={() => setActiveModalApp(null)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-surface-container bg-surface text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm cursor-pointer"
                  title="Close Modal"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
            </div>

            {/* Main Content (Grid matching Patient Detail View) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Left Column (span 2): Vital Signs, Consultation Details, Physical Exam, Notes */}
              <div className="lg:col-span-2 space-y-5">
                
                {/* Vital Signs Section */}
                <section className="bg-surface p-5 sm:p-6 border border-surface-container rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container">monitor_heart</span>
                      Vital Signs
                    </h2>
                    <span className="font-metadata text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full font-bold">Recorded 5 mins ago</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: "Heart Rate", value: "72", unit: "bpm" },
                      { label: "Blood Pressure", value: "120/80", unit: "mmHg" },
                      { label: "Temperature", value: "36.6", unit: "°C" },
                      { label: "SpO2", value: "98", unit: "%" },
                      { label: "Weight", value: "65", unit: "kg" },
                    ].map((vital) => (
                      <div key={vital.label} className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container flex flex-col justify-between">
                        <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">{vital.label}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display-lg-mobile text-xl text-on-surface font-bold">{vital.value}</span>
                          <span className="font-metadata text-[10px] text-on-surface-variant font-bold">{vital.unit}</span>
                        </div>
                      </div>
                    ))}
                    <div className="bg-[#E0F2FE] p-3.5 rounded-xl border border-sky-200 flex flex-col justify-between">
                      <p className="font-metadata text-[10px] text-[#001e2b] uppercase tracking-widest mb-1 font-bold">BMI</p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display-lg-mobile text-xl text-[#001e2b] font-bold">22.5</span>
                        <span className="font-metadata text-[10px] text-[#001e2b]/70 uppercase tracking-widest font-bold">Normal</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Consultation Details (3 Top Cards + 3 Bottom Cards Grid) */}
                <section className="bg-surface p-5 sm:p-6 border border-surface-container rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container">stethoscope</span>
                      Consultation Details
                    </h2>
                    <span className="font-metadata text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full font-bold">Active Record</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container flex flex-col justify-between">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">Date</p>
                      <span className="font-display-lg-mobile text-sm font-bold text-on-surface">{activeModalApp.date}</span>
                    </div>
                    <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container flex flex-col justify-between">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">Time Slot</p>
                      <span className="font-display-lg-mobile text-sm font-bold text-on-surface">{activeModalApp.time}</span>
                    </div>
                    <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container flex flex-col justify-between">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">Location</p>
                      <span className="font-display-lg-mobile text-sm font-bold text-on-surface">Room 302</span>
                    </div>
                    <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container flex flex-col justify-between">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">Doctor</p>
                      <span className="font-display-lg-mobile text-sm font-bold text-primary truncate">{activeModalApp.doctor}</span>
                    </div>
                    <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container flex flex-col justify-between">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">Department</p>
                      <span className="font-display-lg-mobile text-sm font-bold text-on-surface">{activeModalApp.type}</span>
                    </div>
                    <div className="bg-[#E0F2FE] p-3.5 rounded-xl border border-sky-200 flex flex-col justify-between">
                      <p className="font-metadata text-[10px] text-[#001e2b] uppercase tracking-widest mb-1 font-bold">Status</p>
                      <span className="font-display-lg-mobile text-sm font-bold text-[#001e2b]">{activeModalApp.status}</span>
                    </div>
                  </div>
                </section>

                {/* Physical Examination */}
                <section className="bg-surface p-5 sm:p-6 border border-surface-container rounded-2xl shadow-sm">
                  <h2 className="font-headline-sm text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">stethoscope</span>
                    Physical Examination
                  </h2>
                  <div className="space-y-3">
                    {[
                      { label: "General", value: "Patient appears alert and oriented, in no acute distress. Hydrated, good skin turgor." },
                      { label: "Cardio", value: "Rhythmic heart sounds, S1 and S2 present. No murmurs or gallops noted. Peripheral pulses symmetrical." },
                      { label: "Respiratory", value: "Lungs clear to auscultation bilaterally. No wheezes, rales, or rhonchi. Normal respiratory effort." },
                    ].map((field) => (
                      <div key={field.label} className="p-3.5 bg-surface-container-lowest border border-surface-container rounded-xl grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                        <span className="font-metadata text-xs uppercase tracking-widest text-on-surface-variant pt-1 font-bold">{field.label}</span>
                        <p className="md:col-span-3 text-xs text-on-surface font-body-md leading-relaxed">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Chief Complaint & Consultation Notes Section */}
                <section className="bg-surface p-5 sm:p-6 border border-surface-container rounded-2xl shadow-sm">
                  <h2 className="font-headline-sm text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">description</span>
                    Chief Complaint & Consultation Notes
                  </h2>
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container text-on-surface text-sm leading-relaxed font-body-md">
                    Routine clinical evaluation, vital signs assessment, prescription update, and general health review. Patient reports stable blood pressure and overall good progress since last visit.
                  </div>
                </section>
              </div>

              {/* Right Column (span 1): Patient Info & Clinical History */}
              <div className="space-y-5">
                <section className="p-5 sm:p-6 bg-surface border border-surface-container rounded-2xl shadow-sm">
                  <h2 className="font-headline-sm text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">account_circle</span>
                    Patient Info
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="p-3.5 bg-surface-container-low border border-surface-container rounded-xl">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5 font-bold">Email</p>
                      <p className="font-bold text-on-surface text-xs">{activeModalApp.patientEmail}</p>
                    </div>
                    <div className="p-3.5 bg-surface-container-low border border-surface-container rounded-xl">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5 font-bold">Attending Doctor</p>
                      <p className="font-bold text-primary text-xs">{activeModalApp.doctor}</p>
                    </div>
                    <div className="p-3.5 bg-surface-container-low border border-surface-container rounded-xl">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5 font-bold">Medical Record Number</p>
                      <p className="font-bold text-on-surface text-xs">#PT-{activeModalApp.id.replace('AP-', '88')}</p>
                    </div>
                  </div>
                </section>

                {/* Clinical History Section */}
                <section className="p-5 sm:p-6 bg-surface border border-surface-container rounded-2xl shadow-sm">
                  <h2 className="font-headline-sm text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">history_edu</span>
                    <span>Clinical History</span>
                  </h2>
                  <div className="space-y-5">
                    {/* Allergies Section */}
                    <div>
                      <h3 className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between font-bold">
                        <span>ALLERGIES</span>
                        <button type="button" className="w-5 h-5 rounded-full bg-[#E0F2FE] hover:bg-[#bae6fd] text-[#0284c7] border border-[#7dd3fc]/40 flex items-center justify-center transition-colors cursor-pointer" title="Add Allergy">
                          <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                        </button>
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 px-3.5 py-2 bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] rounded-xl font-body-md text-xs font-semibold">
                          <span className="material-symbols-outlined text-sm text-[#ef4444]">warning</span> Penicillin
                        </li>
                        <li className="flex items-center gap-2 px-3.5 py-2 bg-[#fffbe6] text-[#92400e] border border-[#fde68a] rounded-xl font-body-md text-xs font-semibold">
                          <span className="material-symbols-outlined text-sm text-[#f59e0b]">allergies</span> Dust Mites
                        </li>
                      </ul>
                    </div>

                    {/* Past Procedures Section */}
                    <div>
                      <h3 className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between font-bold">
                        <span>PAST PROCEDURES</span>
                        <button type="button" className="w-5 h-5 rounded-full bg-[#E0F2FE] hover:bg-[#bae6fd] text-[#0284c7] border border-[#7dd3fc]/40 flex items-center justify-center transition-colors cursor-pointer" title="Add Procedure">
                          <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                        </button>
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2.5 p-2.5 bg-surface-container-low border border-surface-container rounded-xl">
                          <div className="size-2 bg-[#0284c7] rounded-full mt-1 shrink-0" />
                          <div>
                            <p className="font-body-md text-xs font-bold text-on-surface">Appendectomy</p>
                            <p className="font-metadata text-[9px] text-slate-400 uppercase tracking-widest font-bold">St. Mary&apos;s Hospital • 2015</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5 p-2.5 bg-surface-container-low border border-surface-container rounded-xl">
                          <div className="size-2 bg-[#0284c7] rounded-full mt-1 shrink-0" />
                          <div>
                            <p className="font-body-md text-xs font-bold text-on-surface">Wisdom Teeth Extraction</p>
                            <p className="font-metadata text-[9px] text-slate-400 uppercase tracking-widest font-bold">Local Dental Clinic • 2010</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Chronic Conditions Section */}
                    <div>
                      <h3 className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between font-bold">
                        <span>CHRONIC CONDITIONS</span>
                        <button type="button" className="w-5 h-5 rounded-full bg-[#E0F2FE] hover:bg-[#bae6fd] text-[#0284c7] border border-[#7dd3fc]/40 flex items-center justify-center transition-colors cursor-pointer" title="Add Condition">
                          <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                        </button>
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-3 py-1 bg-[#e0f2fe] text-[#0369a1] border border-[#7dd3fc]/40 rounded-full font-metadata text-[10px] uppercase tracking-widest font-bold">Mild Asthma</span>
                        <span className="px-3 py-1 bg-[#e0f2fe] text-[#0369a1] border border-[#7dd3fc]/40 rounded-full font-metadata text-[10px] uppercase tracking-widest font-bold">Seasonal Rhinitis</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-container flex gap-3 mt-4">
                    <Link 
                      href={`/dashboard/patients/${activeModalApp.id.replace("AP-", "PT-")}?mode=view`}
                      className="flex-1 py-3 bg-primary-container hover:bg-primary text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      title="Open full patient health records profile"
                    >
                      <span>View Record</span>
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleDeleteAppointment(activeModalApp.id);
                        setActiveModalApp(null);
                      }}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      title="Cancel and remove appointment"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Cancel</span>
                    </button>
                  </div>
                </section>
              </div>

            </div>

            {/* Modal Footer Bar */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
              <button 
                onClick={() => setActiveModalApp(null)}
                className="px-6 py-2.5 rounded-xl border border-surface-container bg-surface text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm font-bold text-sm cursor-pointer flex items-center gap-2"
                title="Close details dialog"
              >
                <span className="material-symbols-outlined text-lg">close</span>
                <span>Close</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
