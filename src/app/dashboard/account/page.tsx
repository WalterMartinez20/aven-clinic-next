"use client";

import React, { useState } from "react";

export default function AccountPage() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Profile Section Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-6 border-b border-slate-100">
          <div className="relative group cursor-pointer shrink-0">
            <img className="w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-sky-50" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQg3C73utiip99PEugiLJgjCWOquUXhacyovhpjGUlH8LJwpb71PAFli3caYMYk9x1s2E2DPOtraQrfwn11c1F1yrB5UQaOpg873Fqe29S2qLYoKdxlBggerIIZIU5ftTUTL6aNR7Z4I_OpoQ6DabuTDW1WFUDkHNNKxIvyUJZa4SteBxLZ4DO0pWi03itrskPJ2JnwaCBfIKG5Alq1XCD4TQ1BwPR37FD08FoG700iy2HnekjrpwrDA" />
            <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white">photo_camera</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Profile Picture</h3>
            <p className="text-xs font-medium text-slate-500 mt-1">PNG, JPG under 5MB</p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all cursor-pointer">
                Upload New
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer">
                Remove
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              First Name
            </label>
            <input
              className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
              placeholder="Enter first name"
              type="text"
              defaultValue="Dr. Sarah"
            />
          </div>

          <div className="space-y-2">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              Last Name
            </label>
            <input
              className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
              placeholder="Enter last name"
              type="text"
              defaultValue="Jenkins"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              Email Address
            </label>
            <input
              className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
              placeholder="Enter email"
              type="email"
              defaultValue="sarah.jenkins@aurahealth.com"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              Professional Title
            </label>
            <input
              className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
              placeholder="e.g. Attending Physician"
              type="text"
              defaultValue="Chief of Neurology"
            />
          </div>
        </div>
      </section>

      {/* Preferences Section Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              Timezone
            </label>
            <div className="relative">
              <select className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 pr-10 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all appearance-none cursor-pointer outline-none">
                <option>Pacific Time (PT) - US &amp; Canada</option>
                <option>Eastern Time (ET) - US &amp; Canada</option>
                <option>Greenwich Mean Time (GMT)</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              Language
            </label>
            <div className="relative">
              <select className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 pr-10 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all appearance-none cursor-pointer outline-none">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Save Actions */}
      <div className="flex justify-end gap-4 pt-2">
        <button className="px-6 py-3 border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-all cursor-pointer shadow-xs">
          Discard
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] cursor-pointer"
        >
          Save Changes
        </button>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 z-50 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-sky-400">check_circle</span>
        <span className="font-bold text-sm">Settings updated successfully</span>
      </div>
    </div>
  );
}
