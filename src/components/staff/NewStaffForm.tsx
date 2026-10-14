"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNewStaff } from "@/hooks/useFormPages";

export default function NewStaffForm() {
  const { handleRegister } = useNewStaff();
  const router = useRouter();

  return (
    <div className="flex flex-1 justify-center py-6 px-4 pb-24">
      <div className="flex flex-col max-w-4xl flex-1 gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-on-surface text-3xl font-bold tracking-tight">Add New Staff Member</h1>
          <p className="text-slate-500 text-sm font-medium">Onboard healthcare professionals into the clinical ecosystem. Ensure all credentials and placements are accurately recorded.</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleRegister} className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Personal Info */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary-container">person</span>
              <h2 className="text-on-surface font-headline-sm text-xl font-bold">Personal Info</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">First Name</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="Jane" type="text" required />
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Last Name</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="Doe" type="text" required />
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Email Address</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="email@clinicflow.com" type="email" required />
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Phone Number</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="+1 (555) 000-0000" type="tel" />
              </div>
            </div>
          </section>

          <hr className="border-surface-container" />

          {/* Section 2: Professional Details */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary-container">work</span>
              <h2 className="text-on-surface font-headline-sm text-xl font-bold">Professional Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Department</label>
                <div className="relative">
                  <select defaultValue="" className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 pr-10 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all appearance-none cursor-pointer outline-none" required>
                    <option value="" disabled>Select Department</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="emergency">Emergency</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="administration">Administration</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Role</label>
                <div className="relative">
                  <select defaultValue="" className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 pr-10 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all appearance-none cursor-pointer outline-none" required>
                    <option value="" disabled>Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="admin">Admin</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">License Number (Optional)</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="MD-123456789" type="text" />
              </div>
            </div>
          </section>

          <hr className="border-surface-container" />

          {/* Section 3: Emergency Contact */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary-container">contact_emergency</span>
              <h2 className="text-on-surface font-headline-sm text-xl font-bold">Emergency Contact</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Contact Name</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="Full Name" type="text" required />
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Relationship</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="e.g. Spouse, Parent" type="text" required />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="font-metadata text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Emergency Phone</label>
                <input className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium px-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all outline-none" placeholder="+1 (555) 000-0000" type="tel" required />
              </div>
            </div>
          </section>

          <hr className="border-surface-container" />

          {/* Section 4: Access & Permissions */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary-container">admin_panel_settings</span>
              <h2 className="text-on-surface font-headline-sm text-xl font-bold">Access & Permissions</h2>
            </div>
            <div className="flex flex-col space-y-4">
              
              {/* Toggle 1 */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-surface-container hover:border-primary-container transition-colors group">
                <div>
                  <span className="font-bold text-sm text-on-surface block mb-0.5">View Financials</span>
                  <span className="text-xs text-slate-500 font-medium">Allow access to patient billing and clinic revenue.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-surface-container hover:border-primary-container transition-colors group">
                <div>
                  <span className="font-bold text-sm text-on-surface block mb-0.5">Modify Clinical Records</span>
                  <span className="text-xs text-slate-500 font-medium">Grant permissions to update and edit patient health records.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-surface-container hover:border-primary-container transition-colors group">
                <div>
                  <span className="font-bold text-sm text-on-surface block mb-0.5">Schedule Appointments</span>
                  <span className="text-xs text-slate-500 font-medium">Allow managing doctor calendars and creating appointments.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>

            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-surface-container">
            <button onClick={() => router.back()} className="px-6 py-3 border border-surface-container bg-surface text-on-surface-variant hover:text-primary hover:border-primary transition-all font-bold text-sm rounded-xl cursor-pointer shadow-sm" type="button">
              Cancel
            </button>
            <button className="px-8 py-3 bg-primary-container hover:bg-primary text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2" type="submit">
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>Register Staff Member</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
