"use client";

import React, { useState } from "react";

export default function NotificationsSettingsPage() {
  const [globalPause, setGlobalPause] = useState(true);
  const [appPush, setAppPush] = useState(true);
  const [emailAlert, setEmailAlert] = useState(true);
  const [smsAlert, setSmsAlert] = useState(false);

  return (
    <div className="space-y-6">
      {/* Global Override Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 flex items-center justify-between border border-slate-200/60 shadow-xl shadow-slate-200/50">
        <div className="space-y-1">
          <h4 className="text-xl font-bold text-slate-900">Pause All Notifications</h4>
          <p className="text-sm font-medium text-slate-500">Temporarily mute all alerts across all channels.</p>
        </div>
        
        {/* Modern Form Toggle Switch */}
        <button
          type="button"
          onClick={() => setGlobalPause(!globalPause)}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            globalPause ? "bg-sky-500 shadow-md shadow-sky-500/25" : "bg-slate-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              globalPause ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </section>

      {/* Category: New Appointment Card */}
      <section className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-200/50">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">event_available</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900">New Appointment Alerts</h4>
            <p className="text-sm font-medium text-slate-500 mt-1">Receive alerts when a new patient schedules a consultation.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {/* Push Notifications Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100/50 transition-colors">
            <span className="text-sm font-bold text-slate-900">In-App Push Notifications</span>
            <button
              type="button"
              onClick={() => setAppPush(!appPush)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                appPush ? "bg-sky-500 shadow-md shadow-sky-500/25" : "bg-slate-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  appPush ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Email Notifications Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100/50 transition-colors">
            <span className="text-sm font-bold text-slate-900">Email Notifications</span>
            <button
              type="button"
              onClick={() => setEmailAlert(!emailAlert)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                emailAlert ? "bg-sky-500 shadow-md shadow-sky-500/25" : "bg-slate-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  emailAlert ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* SMS Alerts Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100/50 transition-colors">
            <span className="text-sm font-bold text-slate-900">SMS Urgent Alerts</span>
            <button
              type="button"
              onClick={() => setSmsAlert(!smsAlert)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                smsAlert ? "bg-sky-500 shadow-md shadow-sky-500/25" : "bg-slate-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  smsAlert ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Save Actions */}
      <div className="flex justify-end gap-4 pt-2">
        <button className="px-6 py-3 border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-all cursor-pointer shadow-xs">
          Discard
        </button>
        <button className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] cursor-pointer">
          Save Changes
        </button>
      </div>
    </div>
  );
}
