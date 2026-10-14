"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNewPatient } from "@/hooks/useFormPages";

export default function NewPatientForm() {
  const { handleRegister } = useNewPatient();
  const router = useRouter();

  return (
    <div className="flex flex-1 justify-center py-6 px-4 pb-24">
      <div className="flex flex-col max-w-4xl flex-1 gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-on-surface text-3xl font-bold tracking-tight">Patient Registration</h1>
          <p className="text-slate-500 text-sm font-medium">Complete the form below to enroll a new patient into the clinical management system.</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleRegister} className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Personal Information */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary-container">person</span>
              <h2 className="text-on-surface font-headline-sm text-xl font-bold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Full Name</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="e.g. John Doe" type="text" required />
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">ID Document / Passport</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="Document number" type="text" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Age</label>
                  <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="25" type="number" required />
                </div>
                <div className="space-y-2">
                  <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Gender</label>
                  <div className="relative">
                    <select defaultValue="" className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 pr-10 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all appearance-none cursor-pointer outline-none" required>
                      <option value="" disabled>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Phone Number</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="+1 (555) 000-0000" type="tel" required />
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Email Address</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="patient@example.com" type="email" required />
              </div>
            </div>
          </section>

          <hr className="border-surface-container" />

          {/* Section 2: Clinical Context */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary-container">clinical_notes</span>
              <h2 className="text-on-surface font-headline-sm text-xl font-bold">Clinical Context</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Reason for Visit</label>
                <textarea className="w-full bg-[#f2f3ff] text-[#131b2e] text-sm font-medium p-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none resize-none" placeholder="Describe symptoms or purpose of appointment..." rows={3} required></textarea>
              </div>
              
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Urgency Level</label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-surface-container bg-surface-container-low p-3 hover:bg-emerald-50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                    <input className="hidden" name="urgency" type="radio" value="low" defaultChecked />
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-emerald-500 mb-1 shadow-sm"></div>
                      <span className="text-xs font-bold text-on-surface">Low</span>
                    </div>
                  </label>
                  <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-surface-container bg-surface-container-low p-3 hover:bg-amber-50 transition-colors has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
                    <input className="hidden" name="urgency" type="radio" value="medium" />
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-amber-500 mb-1 shadow-sm"></div>
                      <span className="text-xs font-bold text-on-surface">Medium</span>
                    </div>
                  </label>
                  <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-surface-container bg-surface-container-low p-3 hover:bg-error-container transition-colors has-[:checked]:border-error has-[:checked]:bg-error-container">
                    <input className="hidden" name="urgency" type="radio" value="high" />
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-error mb-1 shadow-sm"></div>
                      <span className="text-xs font-bold text-on-surface">High</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Appointment Date</label>
                  <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" type="date" required />
                </div>
                <div className="space-y-2">
                  <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Appointment Time</label>
                  <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" type="time" required />
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-surface-container">
            <button onClick={() => router.back()} className="px-6 py-3 border border-surface-container bg-surface text-on-surface-variant hover:text-primary hover:border-primary transition-all font-bold text-sm rounded-xl cursor-pointer shadow-sm" type="button">
              Cancel
            </button>
            <button className="px-8 py-3 bg-primary-container hover:bg-primary text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2" type="submit">
              <span className="material-symbols-outlined text-lg">how_to_reg</span>
              <span>Register Patient</span>
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-on-surface-variant font-metadata uppercase tracking-widest text-[10px]">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span>All patient data is encrypted and managed according to clinical privacy standards.</span>
        </div>
      </div>
    </div>
  );
}
