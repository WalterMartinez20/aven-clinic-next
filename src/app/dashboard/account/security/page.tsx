"use client";

import React, { useState } from "react";

export default function SecuritySettingsPage() {
  const [toggle2fa, setToggle2fa] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column (Main Forms) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Password Management Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Password Management</h3>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                Current Password
              </label>
              <input
                className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                type="password"
                defaultValue="********"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  New Password
                </label>
                <input
                  className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                  placeholder="Enter new password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <label className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  Confirm Password
                </label>
                <input
                  className="w-full h-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium px-4 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                  placeholder="Confirm new password"
                  type="password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </section>

        {/* Two-Factor Authentication Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shield_person
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h3>
              </div>
              <p className="text-sm font-medium text-slate-500 max-w-md mt-1 leading-relaxed">
                Protect your account with an extra layer of security. Once configured, you&apos;ll be required to enter both your password and an authentication code.
              </p>
            </div>

            {/* Modern Form Toggle Switch */}
            <button
              type="button"
              onClick={() => setToggle2fa(!toggle2fa)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                toggle2fa ? "bg-sky-500 shadow-md shadow-sky-500/25" : "bg-slate-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  toggle2fa ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="mt-6 flex gap-4 items-center flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-metadata text-[10px] font-bold uppercase tracking-widest border whitespace-nowrap ${
              toggle2fa 
                ? 'bg-sky-50 text-sky-800 border-sky-200/60' 
                : 'bg-slate-100 text-slate-600 border-slate-200/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${toggle2fa ? "bg-emerald-500" : "bg-slate-400"}`}></span>
              <span>Status: {toggle2fa ? "Active" : "Inactive"}</span>
            </span>
            <button className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/80 shadow-xs transition-all cursor-pointer">
              Configure App
            </button>
          </div>
        </section>
      </div>

      {/* Right Column (Sessions) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Active Sessions Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    devices
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Active Sessions</h3>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              {/* Session Item 1 (Current) */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-sky-600 shadow-xs border border-slate-100">
                    <span className="material-symbols-outlined text-xl">laptop_mac</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">MacBook Pro 16&quot;</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">San Francisco, CA • Safari</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/60 font-metadata text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active Now
                </span>
              </div>

              {/* Session Item 2 */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-xs border border-slate-100">
                    <span className="material-symbols-outlined text-xl">phone_iphone</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">iPhone 15 Pro</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">San Francisco, CA • App</p>
                  </div>
                </div>
                {/* Solid Red Revoke Button */}
                <button className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer">
                  Revoke
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            {/* Solid Red Action Button */}
            <button className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Sign Out All Other Devices</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
