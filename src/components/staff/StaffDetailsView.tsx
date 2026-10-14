"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";
import { Pagination } from "@/components/ui/Pagination";
import { useStaffDetail, formatElapsedTime } from "@/hooks/useStaffDetail";

function StaffProfilePageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawId = ((params?.id as string) || "4492-er").toLowerCase();
  const mode = searchParams.get("mode") || "view";

  const {
    isReadOnly,
    staffId,
    avatarUrl,
    initials,
    fullName,
    role,
    department,
    supervisor,
    shiftSchedule,
    shiftActive,
    isPaused,
    elapsedSeconds,
    shiftStart,
    lunchBreak,
    attendanceHistory,
    handleToggleShift,
    handleTogglePause,
  } = useStaffDetail(rawId, mode);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative pb-16">
      {/* Top Back Navigation & Breadcrumb (Matches Patient Details View) */}
      <div className="flex items-center gap-2">
        <Link 
          href="/dashboard/staff" 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest border border-surface-container-low/50 text-on-surface-variant hover:text-primary transition-all shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant font-metadata uppercase tracking-widest ml-2">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/dashboard/staff" className="hover:text-primary transition-colors">Staff</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-bold">{fullName} ({isReadOnly ? "View" : "Edit"})</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Employee Header & Current Shift Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="lg:col-span-1 bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-surface-container-low/50">
            <div className="relative mb-5">
              {avatarUrl ? (
                <img 
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-primary-container" 
                  alt={fullName} 
                  src={avatarUrl}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300";
                  }}
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-surface-container text-on-surface flex items-center justify-center text-4xl font-bold ring-4 ring-primary-container">
                  {initials}
                </div>
              )}
              <span className={`absolute bottom-2 right-2 w-5 h-5 border-4 border-white rounded-full ${shiftActive ? "bg-green-500" : "bg-on-surface-variant"}`}></span>
            </div>
            <h1 className="text-2xl font-bold text-on-surface tracking-tight">{fullName}</h1>
            <p className="text-on-surface-variant font-medium text-sm mt-1">{role}</p>
            
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-surface-container text-xs font-bold rounded-full text-on-surface-variant tracking-wide uppercase">ID: {staffId}</span>
              <span className="px-3 py-1 bg-primary-container text-xs font-bold rounded-full text-white tracking-wide uppercase">FULL TIME</span>
            </div>
            
            <div className="w-full mt-8 pt-6 border-t border-surface-container-low space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Shift Info</span>
                <span className="font-bold text-on-surface">{shiftSchedule}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Department</span>
                <span className="font-bold text-on-surface">{department}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Supervisor</span>
                <span className="font-bold text-on-surface">{supervisor}</span>
              </div>
            </div>
          </div>
          
          {/* Shift Control Box (Pure white background without blue blur blob) */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-8 flex flex-col justify-between shadow-sm border border-surface-container-low/50 relative overflow-hidden">
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className={`flex h-2.5 w-2.5 rounded-full ${shiftActive && !isPaused ? 'bg-primary animate-pulse' : 'bg-on-surface-variant'}`}></span>
                <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                <span className="text-xs font-bold tracking-widest text-primary uppercase font-metadata">
                  {shiftActive ? (isPaused ? "Paused" : "Shift in Progress") : "Shift Ended"}
                </span>
              </div>
              
              <div className="flex items-end gap-3 mb-10">
                <h2 className="text-7xl font-black text-on-surface tracking-tighter">
                  {shiftActive ? formatElapsedTime(elapsedSeconds).substring(0, 5) : "08:30"}
                </h2>
                <span className="text-xl font-medium text-on-surface-variant mb-3">/ 08:30 hrs</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="bg-surface-container-low border border-surface-container-low/50 rounded-xl p-5 flex-1">
                  <p className="text-xs text-on-surface-variant uppercase font-bold tracking-wider mb-2 font-metadata">Shift Start</p>
                  <p className="text-2xl font-bold text-on-surface">{shiftStart}</p>
                </div>
                <div className="bg-surface-container-low border border-surface-container-low/50 rounded-xl p-5 flex-1">
                  <p className="text-xs text-on-surface-variant uppercase font-bold tracking-wider mb-2 font-metadata">Lunch Break</p>
                  <p className="text-2xl font-bold text-on-surface">{lunchBreak}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handleToggleShift} 
                className="flex-1 bg-surface-container-lowest border border-surface-container-low/50 text-on-surface font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition-all cursor-pointer shadow-sm text-sm"
              >
                <span className="material-symbols-outlined text-lg">{shiftActive ? "logout" : "login"}</span>
                <span>{shiftActive ? "Clock Out" : "Clock In"}</span>
              </button>
              {shiftActive && (
                <button 
                  onClick={handleTogglePause} 
                  className={`px-8 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer text-sm ${isPaused ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-primary-container text-white hover:bg-primary"}`}
                >
                  <span className="material-symbols-outlined text-lg">{isPaused ? "play_arrow" : "pause"}</span>
                  <span>{isPaused ? "Resume" : "Pause"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Monthly Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-low/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-container/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">schedule</span>
              </div>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-metadata">Monthly Hours</span>
            </div>
            <p className="text-3xl font-bold text-on-surface">142.5</p>
            <p className="text-xs text-on-surface-variant font-medium mt-2">Goal: 160.0 hrs</p>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-low/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-600">event_available</span>
              </div>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-metadata">Attendance</span>
            </div>
            <p className="text-3xl font-bold text-on-surface">18/22</p>
            <p className="text-xs text-on-surface-variant font-medium mt-2">Days Worked</p>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-low/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600">add_alarm</span>
              </div>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-metadata">Overtime Hours</span>
            </div>
            <p className="text-3xl font-bold text-on-surface">04:15</p>
            <p className="text-xs text-amber-600 font-semibold mt-2">+12% vs last month</p>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-low/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">avg_time</span>
              </div>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-metadata">Punctuality</span>
            </div>
            <p className="text-3xl font-bold text-on-surface">98%</p>
            <p className="text-xs text-emerald-600 font-semibold mt-2">High Performance</p>
          </div>
        </div>
        
        {/* Weekly Attendance History Table */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container flex flex-col gap-4 overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Weekly Attendance History</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Week of Oct 14 - Oct 20</p>
            </div>
          </div>
          
          {/* Grid Table with responsive overflow protection */}
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <div className="min-w-[700px]">
              <GridTableHeader>
                <div className="col-span-2">DAY</div>
                <div className="col-span-2">DATE</div>
                <div className="col-span-2">CLOCK IN</div>
                <div className="col-span-2">CLOCK OUT</div>
                <div className="col-span-2">BREAK</div>
                <div className="col-span-2 text-right">TOTAL HOURS</div>
              </GridTableHeader>

              <GridTable>
                {attendanceHistory.map((record) => (
                  <GridTableRow key={record.day} className={record.isToday ? "bg-primary-container/5" : ""}>
                    <GridTableCell className={`col-span-2 font-bold ${record.isToday ? "text-primary" : "text-on-surface"}`}>{record.day}</GridTableCell>
                    <GridTableCell className="col-span-2 text-sm text-on-surface-variant">{record.date}</GridTableCell>
                    <GridTableCell className="col-span-2 text-sm font-medium text-on-surface">{record.clockIn}</GridTableCell>
                    <GridTableCell className="col-span-2 text-sm font-medium text-on-surface">{record.clockOut}</GridTableCell>
                    <GridTableCell className="col-span-2 text-sm text-on-surface-variant">{record.breakTime}</GridTableCell>
                    <GridTableCell className="col-span-2 text-sm font-bold text-on-surface text-right">{record.totalHours}</GridTableCell>
                  </GridTableRow>
                ))}
              </GridTable>
            </div>
          </div>

          {/* Table Bottom Pagination Navigation */}
          <Pagination
            currentPage={1}
            totalPages={1}
            totalItems={attendanceHistory.length}
            showingCount={attendanceHistory.length}
            itemName="entries"
            onPageChange={() => {}}
          />
        </section>
      </div>
    </div>
  );
}

export default function StaffDetailsView() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant animate-spin mb-2">refresh</span>
        <p className="font-metadata text-[10px] uppercase tracking-widest text-on-surface-variant">Loading profile...</p>
      </div>
    }>
      <StaffProfilePageContent />
    </Suspense>
  );
}
