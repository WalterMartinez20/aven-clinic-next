"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePatientDetail } from "@/hooks/usePatientDetail";

function PatientDetailsContent() {
  const {
    isReadOnly,
    generalExam, setGeneralExam,
    cardioExam, setCardioExam,
    respExam, setRespExam,
    clinicalNotes, setClinicalNotes,
    showToast,
    handleSave,
  } = usePatientDetail();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative pb-16">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-8 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-bold">check</span>
          </div>
          <div>
            <p className="font-metadata text-[10px] uppercase tracking-widest text-inverse-on-surface/70">Success</p>
            <p className="font-body-md font-bold text-inverse-on-surface">Patient record updated successfully!</p>
          </div>
        </div>
      )}

      {/* Back Navigation */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard/patients" className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-lowest border border-surface-container-low/50 text-on-surface-variant hover:text-primary transition-all shadow-sm cursor-pointer">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant font-metadata uppercase tracking-widest ml-2">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/dashboard/patients" className="hover:text-primary transition-colors">Patients</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-bold">Maria Garcia ({isReadOnly ? "View" : "Edit"})</span>
        </div>
      </div>

      <div className="max-w-max-width w-full mx-auto flex flex-col gap-6">
        <form onSubmit={handleSave} className="flex-1 flex flex-col gap-6">
          {/* Header of the Form */}
          <header className="px-8 py-6 bg-surface-container-lowest border border-surface-container-low/50 rounded-2xl sticky top-20 z-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="size-20 rounded-full bg-surface-container-low flex items-center justify-center overflow-hidden border-2 border-surface-container-low/50 shadow-sm">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9jVbEYlv3SdrSe0NLze1dIzsD-IDX_b4wWZxEiv58KNSOK1CtlZEMuXWGADZXTUPHdUKsqic-QetQ1zRHdHj8A-WYZt41T4Sf_iUEg91zcQxc5macRCsFuPFje0p42fPKypHm_k3Y7XXNp6SjP7Vew7S5m8dzc5FQnRt_qj43sJJO6KPyQL8AtFcBWvVF6qReNEqSfyjgJo6LdikN0FsRx-hnJ6NDopOxV2Pywn3TzaWk6qcOAB9gRL-yHhsvBL0PP01ElcI9z6KQ" alt="Profile" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-headline-sm text-2xl font-bold text-on-surface">Maria Garcia</h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/60 font-metadata text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    In Consultation
                  </span>
                </div>
                <p className="text-on-surface-variant mt-1.5 font-body-md text-sm flex items-center gap-2 flex-wrap">
                  <span><span className="font-bold">ID:</span> #882910-B</span>
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

            {/* Header Action Buttons (Appointment Modal Button Style) */}
            <div className="flex items-center gap-3 flex-wrap">
              <button 
                type="button" 
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-surface-container-low/50 bg-white text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm font-bold text-xs cursor-pointer flex items-center gap-2"
                title="Print Patient Summary"
              >
                <span className="material-symbols-outlined text-lg">print</span>
                <span>Print Summary</span>
              </button>

              <button 
                type="button" 
                onClick={() => alert("Patient discharged.")}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                title="Discharge Patient"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Discharge</span>
              </button>

              {!isReadOnly ? (
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Save Clinical Record"
                >
                  <span className="material-symbols-outlined text-lg">save</span>
                  <span>Save Record</span>
                </button>
              ) : (
                <Link 
                  href="/dashboard/patients/1?mode=edit" 
                  className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Edit Patient Record"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  <span>Edit Record</span>
                </Link>
              )}
            </div>
          </header>

          {/* Main Content Layout */}
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vital Signs */}
              <section className="bg-surface-container-lowest p-6 sm:p-8 border border-surface-container-low/50 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline-sm text-xl font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">monitor_heart</span>
                    Vital Signs
                  </h2>
                  <span className="font-metadata text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full font-bold">Recorded 5 mins ago</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Heart Rate", value: "72", unit: "bpm" },
                    { label: "Blood Pressure", value: "120/80", unit: "mmHg" },
                    { label: "Temperature", value: "36.6", unit: "°C" },
                    { label: "SpO2", value: "98", unit: "%" },
                    { label: "Weight", value: "65", unit: "kg" },
                  ].map((vital) => (
                    <div key={vital.label} className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-low/50 flex flex-col justify-between min-h-[100px] shadow-sm">
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">{vital.label}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display-lg-mobile text-2xl text-on-surface font-bold">{vital.value}</span>
                        <span className="font-metadata text-[10px] text-on-surface-variant font-bold">{vital.unit}</span>
                      </div>
                    </div>
                  ))}
                  <div className="bg-[#E0F2FE] p-5 rounded-2xl border border-sky-200 flex flex-col justify-between min-h-[100px] shadow-sm">
                    <p className="font-metadata text-[10px] text-[#001e2b] uppercase tracking-widest mb-2 font-bold">BMI</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display-lg-mobile text-2xl text-[#001e2b] font-bold">22.5</span>
                      <span className="font-metadata text-[10px] text-[#001e2b]/70 uppercase tracking-widest font-bold">Normal</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Consultation Details (Added below Vital Signs) */}
              <section className="bg-surface-container-lowest p-6 sm:p-8 border border-surface-container-low/50 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline-sm text-xl font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">stethoscope</span>
                    Consultation Details
                  </h2>
                  <span className="font-metadata text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full font-bold">Active Record</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-low/50 flex flex-col justify-between min-h-[100px] shadow-sm">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Date</p>
                    <span className="font-display-lg-mobile text-xl font-bold text-on-surface">Oct 24, 2023</span>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-low/50 flex flex-col justify-between min-h-[100px] shadow-sm">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Time Slot</p>
                    <span className="font-display-lg-mobile text-xl font-bold text-on-surface">10:30 AM - 11:15 AM</span>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-low/50 flex flex-col justify-between min-h-[100px] shadow-sm">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Location</p>
                    <span className="font-display-lg-mobile text-xl font-bold text-on-surface">Room 302</span>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-low/50 flex flex-col justify-between min-h-[100px] shadow-sm">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Doctor</p>
                    <span className="font-display-lg-mobile text-xl font-bold text-primary truncate">Dr. Sarah Jenkins</span>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-low/50 flex flex-col justify-between min-h-[100px] shadow-sm">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Department</p>
                    <span className="font-display-lg-mobile text-xl font-bold text-on-surface">Cardiology</span>
                  </div>
                  <div className="bg-[#E0F2FE] p-5 rounded-2xl border border-sky-200 flex flex-col justify-between min-h-[100px] shadow-sm">
                    <p className="font-metadata text-[10px] text-[#001e2b] uppercase tracking-widest mb-2 font-bold">Status</p>
                    <span className="font-display-lg-mobile text-xl font-bold text-[#001e2b]">In Consultation</span>
                  </div>
                </div>
              </section>

              {/* Physical Examination */}
              <section className="bg-surface-container-lowest p-6 sm:p-8 border border-surface-container-low/50 rounded-2xl shadow-sm">
                <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">stethoscope</span>
                  Physical Examination
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "General", value: generalExam, onChange: setGeneralExam },
                    { label: "Cardio", value: cardioExam, onChange: setCardioExam },
                    { label: "Respiratory", value: respExam, onChange: setRespExam },
                  ].map((field) => (
                    <div key={field.label} className="p-5 bg-surface-container-lowest border border-surface-container-low/50 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-start transition-all hover:border-primary-container">
                      <span className="font-metadata text-xs uppercase tracking-widest text-on-surface-variant pt-2 font-bold">{field.label}</span>
                      <div className="md:col-span-3">
                        <textarea
                          readOnly={isReadOnly}
                          disabled={isReadOnly}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container p-4 outline-none font-body-md text-on-surface transition-all disabled:opacity-75 disabled:bg-slate-50 disabled:cursor-not-allowed"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Clinical Notes */}
              <section className="bg-surface-container-lowest p-6 sm:p-8 border border-surface-container-low/50 rounded-2xl shadow-sm">
                <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">description</span>
                  Clinical Notes & Assessment
                </h2>
                <textarea
                  readOnly={isReadOnly}
                  disabled={isReadOnly}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="w-full min-h-[220px] p-6 rounded-2xl bg-white border border-slate-200 text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container text-base leading-relaxed outline-none font-body-md disabled:opacity-75 disabled:bg-slate-50 disabled:cursor-not-allowed"
                />
              </section>
            </div>

            {/* Right Column: Patient Info & Clinical History */}
            <div className="space-y-6">
              {/* Patient Info Card (From Appointment Modal) */}
              <section className="p-6 sm:p-8 bg-surface-container-lowest border border-surface-container-low/50 rounded-2xl shadow-sm">
                <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">account_circle</span>
                  Patient Info
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="p-3.5 bg-surface-container-low/50 border border-surface-container-low/50 rounded-xl">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5 font-bold">Email</p>
                    <p className="font-bold text-on-surface text-xs">m.garcia@example.com</p>
                  </div>
                  <div className="p-3.5 bg-surface-container-low/50 border border-surface-container-low/50 rounded-xl">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5 font-bold">Attending Doctor</p>
                    <p className="font-bold text-primary text-xs">Dr. Sarah Jenkins</p>
                  </div>
                  <div className="p-3.5 bg-surface-container-low/50 border border-surface-container-low/50 rounded-xl">
                    <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5 font-bold">Medical Record Number</p>
                    <p className="font-bold text-on-surface text-xs">#PT-882910</p>
                  </div>
                </div>
              </section>

              {/* Clinical History Section */}
              <section className="p-6 sm:p-8 bg-surface-container-lowest border border-surface-container-low/50 rounded-2xl shadow-sm">
                <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">history_edu</span>
                  <span>Clinical History</span>
                </h2>
                <div className="space-y-6">
                  {/* Allergies Section */}
                  <div>
                    <h3 className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between font-bold">
                      <span>ALLERGIES</span>
                      <button type="button" className="w-5 h-5 rounded-full bg-[#E0F2FE] hover:bg-[#bae6fd] text-[#0284c7] border border-[#7dd3fc]/40 flex items-center justify-center transition-colors cursor-pointer" title="Add Allergy">
                        <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                      </button>
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2.5 px-4 py-3 bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] rounded-xl font-body-md text-sm font-semibold">
                        <span className="material-symbols-outlined text-sm text-[#ef4444]">warning</span> Penicillin
                      </li>
                      <li className="flex items-center gap-2.5 px-4 py-3 bg-[#fffbe6] text-[#92400e] border border-[#fde68a] rounded-xl font-body-md text-sm font-semibold">
                        <span className="material-symbols-outlined text-sm text-[#f59e0b]">allergies</span> Dust Mites
                      </li>
                    </ul>
                  </div>

                  {/* Past Procedures Section */}
                  <div>
                    <h3 className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between font-bold">
                      <span>PAST PROCEDURES</span>
                      <button type="button" className="w-5 h-5 rounded-full bg-[#E0F2FE] hover:bg-[#bae6fd] text-[#0284c7] border border-[#7dd3fc]/40 flex items-center justify-center transition-colors cursor-pointer" title="Add Procedure">
                        <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                      </button>
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 p-3 bg-surface-container-low/50 border border-surface-container-low/50 rounded-xl">
                        <div className="size-2 bg-[#0284c7] rounded-full mt-1.5 shrink-0" />
                        <div>
                          <p className="font-body-md text-sm font-bold text-on-surface">Appendectomy</p>
                          <p className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-bold">St. Mary&apos;s Hospital • 2015</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 p-3 bg-surface-container-low/50 border border-surface-container-low/50 rounded-xl">
                        <div className="size-2 bg-[#0284c7] rounded-full mt-1.5 shrink-0" />
                        <div>
                          <p className="font-body-md text-sm font-bold text-on-surface">Wisdom Teeth Extraction</p>
                          <p className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-bold">Local Dental Clinic • 2010</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Chronic Conditions Section */}
                  <div>
                    <h3 className="font-metadata text-[10px] text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between font-bold">
                      <span>CHRONIC CONDITIONS</span>
                      <button type="button" className="w-5 h-5 rounded-full bg-[#E0F2FE] hover:bg-[#bae6fd] text-[#0284c7] border border-[#7dd3fc]/40 flex items-center justify-center transition-colors cursor-pointer" title="Add Condition">
                        <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                      </button>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3.5 py-1.5 bg-[#e0f2fe] text-[#0369a1] border border-[#7dd3fc]/40 rounded-full font-metadata text-[10px] uppercase tracking-widest font-bold">Mild Asthma</span>
                      <span className="px-3.5 py-1.5 bg-[#e0f2fe] text-[#0369a1] border border-[#7dd3fc]/40 rounded-full font-metadata text-[10px] uppercase tracking-widest font-bold">Seasonal Rhinitis</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </form>
      </div>
    </div>
  );
}

export default function PatientDetailsView() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant animate-spin mb-2">refresh</span>
        <p className="font-metadata text-xs uppercase tracking-widest text-on-surface-variant">Loading patient record...</p>
      </div>
    }>
      <PatientDetailsContent />
    </Suspense>
  );
}
