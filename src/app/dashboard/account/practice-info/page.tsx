"use client";

import React from "react";

export default function PracticeInfoSettingsPage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. General Information Card (Includes Clinic Logo) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/60 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              domain
            </span>
          </div>
          <span>General Information</span>
        </h3>

        {/* Clinic Logo & Branding Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-md ring-4 ring-sky-50 overflow-hidden">
              <img src="/icon.svg" alt="Clinic Logo" className="w-12 h-12 object-contain" />
            </div>
            <div className="absolute inset-0 bg-slate-900/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white">photo_camera</span>
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">Clinic Logo &amp; Branding</h4>
            <p className="text-xs font-medium text-slate-500 mt-1">PNG, JPG or SVG up to 5MB (1:1 square ratio recommended)</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">upload</span>
                <span>Upload Logo</span>
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2.5">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              Clinic Name
            </label>
            <input
              className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
              type="text"
              defaultValue="Aura Health Sanctuary"
            />
          </div>

          <div className="space-y-3">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              Specialties
            </label>
            <div className="flex flex-wrap gap-2.5 my-2">
              <span className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/60 px-3.5 py-2 rounded-full font-metadata text-[10px] uppercase font-bold tracking-widest">
                Cardiology
                <button className="hover:text-red-600 transition-colors cursor-pointer flex items-center">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
              <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 border border-indigo-200/60 px-3.5 py-2 rounded-full font-metadata text-[10px] uppercase font-bold tracking-widest">
                Neurology
                <button className="hover:text-red-600 transition-colors cursor-pointer flex items-center">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                className="w-full h-11 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-xs font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                placeholder="Add specialty..."
                type="text"
              />
              <button className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20 transition-all shrink-0 cursor-pointer">
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
              About the Clinic
            </label>
            <textarea
              className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium p-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none resize-none"
              rows={4}
              defaultValue="Aura Health Sanctuary provides cutting-edge, patient-centered care in a serene environment designed to promote healing and well-being."
            />
          </div>
        </div>
      </div>

      {/* 2. Address & Location Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/60 shadow-xl shadow-slate-200/50">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
          </div>
          <span>Address &amp; Location</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                Street Address
              </label>
              <input
                className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                type="text"
                defaultValue="1200 Sanctuary Blvd, Suite 400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  City
                </label>
                <input
                  className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                  type="text"
                  defaultValue="Metropolis"
                />
              </div>
              <div className="space-y-2.5">
                <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  State / Zip
                </label>
                <input
                  className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                  type="text"
                  defaultValue="NY 10001"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-slate-100 min-h-[180px] h-full relative border border-slate-200/80 shadow-xs">
            <div
              className="bg-cover bg-center w-full h-full opacity-80"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhlK0nMbh9IYDjKlT1dTRx4tQNekPNZKS1B_BYXhC4dJW_f5ZnYck1YsWxFiYSIGFQ5iGnIzCMfWdVtT6cpmdo8tZ2-nTAxSLtdNJQ0V1LwYJLbXfKG2XMrLvV_iygsg8P1CWWO1ceU7Z3cfT4lbYtY-eU6y3GbCvPzKQAIg4U-Oul02yUAPjvX9yOl8AOcyNJrwVKsWxU5TSEZC1FlDAbTMaWedPL8tOEOlK_N0yEdCdPbR7r4z35yw')",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10">
              <span
                className="material-symbols-outlined text-sky-600 text-4xl shadow-md"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Operating Hours Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/60 shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                schedule
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Operating Hours</h3>
          </div>
          <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-xl">edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          {[
            { day: "Monday", hours: "8:00 AM - 6:00 PM" },
            { day: "Tuesday", hours: "8:00 AM - 6:00 PM" },
            { day: "Wednesday", hours: "8:00 AM - 6:00 PM" },
            { day: "Thursday", hours: "8:00 AM - 6:00 PM" },
            { day: "Friday", hours: "8:00 AM - 4:00 PM" },
            { day: "Saturday", hours: "Closed", closed: true },
            { day: "Sunday", hours: "Closed", closed: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50/80 transition-colors ${
                item.closed ? "opacity-60 bg-slate-50/40" : "bg-slate-50/70"
              }`}
            >
              <span className="font-bold text-slate-900 mb-1">{item.day}</span>
              <span className="text-xs text-slate-600 font-semibold">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Actions */}
      <div className="flex justify-end gap-4 pt-2 pb-8">
        <button className="px-6 py-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all cursor-pointer shadow-xs">
          Cancel
        </button>
        <button className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all cursor-pointer">
          Save Practice Info
        </button>
      </div>
    </div>
  );
}

