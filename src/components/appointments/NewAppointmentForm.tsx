"use client";

import Link from "next/link";
import { useNewAppointment } from "@/hooks/useFormPages";
import { useRouter } from "next/navigation";

export default function NewAppointmentForm() {
  const { handleSchedule } = useNewAppointment();
  const router = useRouter();

  return (
    <form onSubmit={handleSchedule} className="flex-grow w-full max-w-4xl mx-auto flex justify-center pb-24">
      <div className="w-full flex flex-col gap-8">
        
        {/* Header Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-on-surface text-3xl font-bold tracking-tight">Schedule New Appointment</h1>
          <p className="text-slate-500 text-sm font-medium">Select a patient, assign an attending clinician, and specify the appointment details.</p>
        </div>

        {/* Section 1: Patient Information */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-surface-container flex flex-col gap-6">
          <h2 className="font-headline-sm text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">person_search</span>
            Patient Selection
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Search Patient</label>
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input 
                  autoComplete="off" 
                  className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium pl-12 pr-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" 
                  placeholder="Search by Patient Name, MRN, or DOB..." 
                  type="text" 
                />
              </div>
            </div>

            {/* Selected Patient Card */}
            <div className="bg-surface-container-low border border-surface-container rounded-xl p-4 sm:p-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-container/10 text-primary flex items-center justify-center overflow-hidden shrink-0 border border-surface-container">
                  <img className="w-full h-full object-cover" alt="Robert Sterling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANoBWyZsY4A-CmtxlvMToKnHt61L45PFvSsiR1FaHmZpKrO3850_6OKxATw0ttF4W0n3-8xEiHzZWGb-WkdbLOzSwSQHdqWACDgNSTAQs8GNv0d8izyj909ytua2XJcQJnixsM02CECtoz9y_AfaohlJmxENpz9AauoURNyNj8uIngYeJF01zgN4e819460aotkuBAdyXUoXPh3N1J7-TudDFlZszpi7VVGO5XylirNLQmAfh2uMRPTw" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-base text-on-surface">Robert Sterling</span>
                  <div className="flex items-center gap-2 font-metadata text-[10px] text-slate-500 uppercase tracking-widest">
                    <span>MRN: #8492-A</span>
                    <span>•</span>
                    <span>DOB: 11/04/1952</span>
                  </div>
                </div>
              </div>
              <button type="button" className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all cursor-pointer" title="Edit Selection">
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Visit Specifications */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-surface-container flex flex-col gap-6">
          <h2 className="font-headline-sm text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">stethoscope</span>
            Visit Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department Select */}
            <div className="space-y-2">
              <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Department</label>
              <div className="relative">
                <select defaultValue="" className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 pr-10 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all appearance-none cursor-pointer outline-none" required>
                  <option disabled value="">Select Department</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="general">General Practice</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>
            
            {/* Clinician Select */}
            <div className="space-y-2">
              <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Attending Clinician</label>
              <div className="relative">
                <select defaultValue="" className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 pr-10 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all appearance-none cursor-pointer outline-none" required>
                  <option disabled value="">Select Clinician</option>
                  <option value="dr_smith">Dr. Sarah Smith</option>
                  <option value="dr_jones">Dr. Marcus Jones</option>
                  <option value="dr_lee">Dr. Amanda Lee</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
          
          {/* Reason for Visit */}
          <div className="space-y-2">
            <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Reason for Visit</label>
            <textarea className="w-full bg-[#f2f3ff] text-[#131b2e] text-sm font-medium p-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none resize-none" placeholder="Briefly describe the clinical symptoms or purpose of this visit..." rows={3} required></textarea>
          </div>

          {/* Visit Type (Chips - Staff Table Badge Style) */}
          <div className="space-y-2">
            <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Visit Type</label>
            <div className="flex flex-wrap gap-3">
              {["Initial Consult", "Follow-up", "Diagnostic", "Procedure"].map((type, i) => (
                <label key={type} className="cursor-pointer group">
                  <input className="hidden peer" name="visit_type" type="radio" value={type.toLowerCase()} defaultChecked={i === 0} />
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full font-metadata text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer border bg-slate-100/70 text-slate-500 border-slate-200/60 hover:bg-sky-50/60 hover:text-sky-800 peer-checked:bg-sky-50 peer-checked:text-sky-800 peer-checked:border-sky-200/80 peer-checked:shadow-xs peer-checked:ring-2 peer-checked:ring-sky-400/20">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Scheduling Date & Time */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-surface-container flex flex-col gap-6">
          <h2 className="font-headline-sm text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">calendar_today</span>
            Date & Slot Selection
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Date Calendar Mock */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <button type="button" className="text-slate-400 hover:text-on-surface transition-colors p-1 cursor-pointer"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                <span className="font-bold text-base text-on-surface">October 2026</span>
                <button type="button" className="text-slate-400 hover:text-on-surface transition-colors p-1 cursor-pointer"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
              </div>
              <div className="grid grid-cols-7 gap-y-3 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
                  <div key={idx} className="font-metadata text-[10px] font-bold text-slate-400 uppercase">{d}</div>
                ))}
                
                {/* Mock Calendar Days */}
                <div className="text-slate-300 text-xs py-2">1</div>
                <div className="text-slate-300 text-xs py-2">2</div>
                <div className="text-slate-300 text-xs py-2">3</div>
                <div className="text-slate-300 text-xs py-2">4</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">5</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">6</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">7</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">8</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">9</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">10</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">11</div>
                <div className="text-white bg-primary-container font-bold text-xs py-2 rounded-lg cursor-pointer shadow-sm">12</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">13</div>
                <div className="text-on-surface text-xs py-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors font-semibold">14</div>
              </div>
              
              <div className="space-y-2 mt-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Estimated Duration</label>
                <div className="relative">
                  <select defaultValue="30" className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 pr-10 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all appearance-none cursor-pointer outline-none">
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-full md:w-px h-px md:h-auto bg-surface-container"></div>
            
            {/* Time Slots */}
            <div className="flex-1 flex flex-col gap-4">
              <span className="font-bold text-sm text-on-surface">Available Slots</span>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="bg-surface-container-low text-slate-300 text-xs font-semibold py-2.5 rounded-xl cursor-not-allowed line-through">
                  09:00 AM
                </button>
                {["09:30 AM", "10:00 AM", "10:30 AM"].map((time) => (
                  <label key={time} className="cursor-pointer group">
                    <input className="hidden peer" name="time_slot" type="radio" value={time} />
                    <div className="text-center bg-surface-container-low border border-surface-container text-on-surface peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-primary-container text-xs font-bold py-2.5 rounded-xl transition-all hover:bg-slate-100 cursor-pointer shadow-2xs">
                      {time}
                    </div>
                  </label>
                ))}
                <label className="cursor-pointer group">
                  <input className="hidden peer" name="time_slot" type="radio" value="11:00 AM" defaultChecked />
                  <div className="text-center bg-surface-container-low border border-surface-container text-on-surface peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-primary-container text-xs font-bold py-2.5 rounded-xl transition-all hover:bg-slate-100 cursor-pointer shadow-2xs">
                    11:00 AM
                  </div>
                </label>
                {["11:30 AM", "01:00 PM", "01:30 PM"].map((time) => (
                  <label key={time} className="cursor-pointer group">
                    <input className="hidden peer" name="time_slot" type="radio" value={time} />
                    <div className="text-center bg-surface-container-low border border-surface-container text-on-surface peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-primary-container text-xs font-bold py-2.5 rounded-xl transition-all hover:bg-slate-100 cursor-pointer shadow-2xs">
                      {time}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-surface-container bg-surface text-on-surface-variant hover:text-primary hover:border-primary transition-all font-bold text-sm rounded-xl cursor-pointer shadow-sm">
            Cancel
          </button>
          <button type="submit" className="px-8 py-3 bg-primary-container hover:bg-primary text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2">
            <span>Schedule Appointment</span>
            <span className="material-symbols-outlined text-lg">check</span>
          </button>
        </div>

      </div>
    </form>
  );
}
