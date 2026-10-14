"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useAppointmentDetail } from "@/hooks/useAppointmentDetail";

function AppointmentDetailsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawId = ((params?.id as string) || "ap-201").toLowerCase();
  const mode = searchParams.get("mode") || "view";

  const {
    isReadOnly,
    appointmentId,
    calendarDays,
    timeSlots,
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
    handleSave,
  } = useAppointmentDetail(rawId, mode);

  const patientIdDisplay =
    appointmentId === "AP-202" ? "#PT-882910" :
    appointmentId === "AP-203" ? "#PT-448102" : "#PT-103991";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-8 bg-slate-900/95 text-white backdrop-blur-md px-6 py-4 rounded-2xl shadow-glass border border-white/10 flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-bold">check</span>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Exitoso</p>
            <p className="text-sm font-bold text-slate-100">Cita guardada con éxito!</p>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/appointments" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm cursor-pointer active:scale-95">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-semibold ml-2">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href="/dashboard/appointments" className="hover:text-primary transition-colors">Appointments</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-800 font-bold">{appointmentId} ({isReadOnly ? "Ver" : "Editar"})</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-sm">
            <Link href={`/dashboard/appointments/${rawId}?mode=view`} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-95 ${isReadOnly ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-primary"}`} title="Ver Cita">
              <span className="material-symbols-outlined text-lg">visibility</span>
            </Link>
            <Link href={`/dashboard/appointments/${rawId}?mode=edit`} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-95 ${!isReadOnly ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-primary"}`} title="Editar Cita">
              <span className="material-symbols-outlined text-lg">edit</span>
            </Link>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-slate-100 shadow-glass flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Active Connection</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSave} className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 mb-2">
              {isReadOnly ? "View Appointment Details" : "Edit Appointment Details"}
            </h2>
            <p className="text-slate-400 text-sm font-semibold max-w-xl">
              {isReadOnly
                ? "Review clinical appointment data, scheduling times, patient contacts and clinicians verified for this session."
                : "Modify scheduling times, assign doctors and update visit symptoms before finalizing the appointment slot."}
            </p>
          </div>
          <div className="flex gap-3">
            {isReadOnly ? (
              <>
                <Link href="/dashboard/appointments" className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-500 font-extrabold hover:bg-slate-50 hover:border-slate-300 transition-all text-sm shadow-sm active:scale-95">
                  Back to Directory
                </Link>
                <Link href={`/dashboard/appointments/${rawId}?mode=edit`} className="px-8 py-3 rounded-2xl font-extrabold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Edit Appointment
                </Link>
              </>
            ) : (
              <>
                <Link href={`/dashboard/appointments/${rawId}?mode=view`} className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-500 font-extrabold hover:bg-slate-50 hover:border-slate-300 transition-all text-sm shadow-sm active:scale-95">
                  Cancel
                </Link>
                <button type="submit" className="px-8 py-3 rounded-2xl font-extrabold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-lg">save</span>
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            {/* Patient Info */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">person</span>
                <h3 className="text-xl font-extrabold text-slate-800">Patient Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Search/Select Patient</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
                    <input className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800 font-bold disabled:opacity-85 disabled:cursor-not-allowed text-sm" placeholder="Start typing patient name..." type="text" disabled={isReadOnly} readOnly={isReadOnly} value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Patient ID</label>
                  <input className="w-full bg-slate-100 border-none rounded-2xl py-4 px-4 text-slate-500 font-bold font-mono cursor-not-allowed text-sm" readOnly disabled type="text" value={patientIdDisplay} />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Contact Phone</label>
                  <input className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800 font-bold disabled:opacity-85 disabled:cursor-not-allowed text-sm" placeholder="+1 (555) 000-0000" type="tel" disabled={isReadOnly} readOnly={isReadOnly} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
            </section>

            {/* Appointment Details */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40" />
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">clinical_notes</span>
                <h3 className="text-xl font-extrabold text-slate-800">Appointment Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Department</label>
                  <select disabled={isReadOnly} value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800 font-bold disabled:opacity-85 disabled:cursor-not-allowed cursor-pointer text-sm outline-none">
                    {["Cardiology","Neurology","Pediatrics","Orthopedics","General Medicine"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Clinician/Doctor</label>
                  <select disabled={isReadOnly} value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800 font-bold disabled:opacity-85 disabled:cursor-not-allowed cursor-pointer text-sm outline-none">
                    {["Dr. Elena Rodriguez","Dr. Marcus Thorne","Dr. Sarah Chen","Dr. James Wilson"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Type of Visit</label>
                  <div className="flex flex-wrap gap-3">
                    {["Consultation","Surgery","Follow-up","Check-up"].map((typeOpt) => (
                      <label key={typeOpt} className={`cursor-pointer ${isReadOnly ? "pointer-events-none opacity-90" : ""}`}>
                        <input type="radio" name="visit_type" checked={visitType === typeOpt} disabled={isReadOnly} onChange={() => setVisitType(typeOpt)} className="hidden peer" />
                        <span className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all inline-block ${visitType === typeOpt ? "bg-primary text-white border-primary shadow-sm shadow-primary/20" : "border-slate-200 hover:bg-slate-50 text-slate-600 bg-white"}`}>{typeOpt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Reason for Visit</label>
                  <textarea className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-slate-800 font-medium disabled:opacity-85 disabled:cursor-not-allowed text-sm outline-none resize-none" placeholder="Briefly describe the symptoms..." rows={4} disabled={isReadOnly} readOnly={isReadOnly} value={reason} onChange={(e) => setReason(e.target.value)} required />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Scheduling */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-md h-full">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary text-2xl">event</span>
                <h3 className="text-xl font-extrabold text-slate-800">Scheduling</h3>
              </div>
              <div className="space-y-8">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Date Picker</label>
                  <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl shadow-inner">
                    <div className="flex justify-between items-center mb-4 select-none">
                      <span className="font-extrabold text-slate-800 text-sm">October 2023</span>
                      <div className="flex gap-1.5">
                        <button type="button" className="w-8 h-8 rounded-lg hover:bg-slate-200/50 flex items-center justify-center transition-all cursor-pointer" disabled={isReadOnly}><span className="material-symbols-outlined text-base">chevron_left</span></button>
                        <button type="button" className="w-8 h-8 rounded-lg hover:bg-slate-200/50 flex items-center justify-center transition-all cursor-pointer" disabled={isReadOnly}><span className="material-symbols-outlined text-base">chevron_right</span></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400 mb-2">
                      {["SU","MO","TU","WE","TH","FR","SA"].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {calendarDays.map((item, i) => {
                        const isSel = !item.isPrevMonth && item.dayNum === selectedDay;
                        return (
                          <button key={i} type="button" disabled={isReadOnly || item.isPrevMonth} onClick={() => setSelectedDay(item.dayNum)}
                            className={`py-2 rounded-xl text-xs font-bold transition-all ${isSel ? "bg-primary text-white font-extrabold shadow-md shadow-primary/25 cursor-default" : item.isPrevMonth ? "text-slate-200 cursor-not-allowed" : isReadOnly ? "text-slate-600" : "hover:bg-slate-200/50 text-slate-700 cursor-pointer"}`}>
                            {item.dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button key={slot} type="button" disabled={isReadOnly} onClick={() => setSelectedTimeSlot(slot)}
                        className={`px-4 py-3 rounded-2xl border text-xs font-extrabold transition-all ${selectedTimeSlot === slot ? "bg-primary text-white border-primary shadow-lg shadow-primary/10 cursor-default" : isReadOnly ? "border-slate-100 text-slate-400 bg-slate-50/50" : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:border-primary/40 cursor-pointer active:scale-95"}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Estimated Duration</label>
                  <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl shadow-inner">
                    <span className="material-symbols-outlined text-slate-400">schedule</span>
                    <select disabled={isReadOnly} value={duration} onChange={(e) => setDuration(e.target.value)} className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-slate-800 font-bold text-sm cursor-pointer p-0 select-none">
                      {["15 Minutes","30 Minutes","45 Minutes","60 Minutes","90 Minutes"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0"><span className="material-symbols-outlined">info</span></div>
            <div>
              <h4 className="font-extrabold text-emerald-800 text-sm mb-1">Clinic Policy</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">Appointments canceled with less than 24h notice may incur a service fee.</p>
            </div>
          </div>
          <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0"><span className="material-symbols-outlined">verified_user</span></div>
            <div>
              <h4 className="font-extrabold text-blue-800 text-sm mb-1">Insurance Check</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">Patient&apos;s active coverage (BlueShield) has been verified for this visit.</p>
            </div>
          </div>
          <div className="bg-slate-100/50 p-6 rounded-3xl flex items-center justify-between border border-slate-200/20 group cursor-pointer hover:bg-slate-200/50 transition-all duration-300">
            <div>
              <h4 className="font-extrabold text-slate-700 text-sm mb-1">Save as Template</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">Apply these settings for future clinical visits.</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 transition-transform group-hover:translate-x-1">arrow_forward</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AppointmentDetailsView() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin mb-2">refresh</span>
        <p className="text-sm font-extrabold text-slate-500">Loading appointment details...</p>
      </div>
    }>
      <AppointmentDetailsContent />
    </Suspense>
  );
}
