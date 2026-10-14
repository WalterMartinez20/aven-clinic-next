"use client";

import React from "react";

export default function BillingSettingsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Column: Subscription & Payment */}
      <div className="md:col-span-8 flex flex-col gap-6">
        {/* Subscription Plan Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Subscription Plan</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-slate-50/80 border border-slate-200/80 rounded-2xl gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Professional Tier</h3>
              <p className="text-sm font-semibold text-slate-500 mb-3">$199.00 / month</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/60 font-metadata text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Active Plan
              </span>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-slate-500 font-medium mb-3">
                Next billing date: <span className="text-slate-900 font-bold">Oct 12, 2026</span>
              </p>
              <button className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all cursor-pointer">
                Manage Plan
              </button>
            </div>
          </div>
        </section>

        {/* Payment Methods Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Payment Methods</h2>
            <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Add Card</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Card 1 */}
            <div className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl group transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-xs">
                  VISA
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Visa ending in 4242</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Expires 12/28</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 bg-sky-50 text-sky-800 border border-sky-200/60 font-metadata text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
                  Default
                </span>
                {/* Solid Red Delete Button */}
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-sm"
                  title="Delete Payment Method"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl group transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-[#ff5f00] rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-xs">
                  MC
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Mastercard ending in 8899</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Expires 08/27</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Solid Red Delete Button */}
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-sm"
                  title="Delete Payment Method"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Billing History */}
      <div className="md:col-span-12 lg:col-span-4">
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50 h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Billing History</h2>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer border border-slate-200/60 shadow-xs"
              title="Filter Invoices"
            >
              <span className="material-symbols-outlined text-lg">filter_list</span>
            </button>
          </div>

          <div className="w-full">
            <div className="flex font-metadata text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
              <div className="w-1/3">Date</div>
              <div className="w-1/3 text-center">Amount</div>
              <div className="w-1/3 text-right">Invoice</div>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Row 1 */}
              <div className="flex items-center py-3 px-3 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
                <div className="w-1/3 text-xs text-slate-900 font-semibold">Sep 12</div>
                <div className="w-1/3 text-xs text-slate-900 font-bold text-center">$199.00</div>
                <div className="w-1/3 text-right">
                  <button className="text-sky-600 hover:underline transition-colors flex items-center justify-end gap-1 ml-auto cursor-pointer font-bold">
                    <span className="text-xs">PDF</span>
                    <span className="material-symbols-outlined text-sm">download</span>
                  </button>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center py-3 px-3 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
                <div className="w-1/3 text-xs text-slate-900 font-semibold">Aug 12</div>
                <div className="w-1/3 text-xs text-slate-900 font-bold text-center">$199.00</div>
                <div className="w-1/3 text-right">
                  <button className="text-sky-600 hover:underline transition-colors flex items-center justify-end gap-1 ml-auto cursor-pointer font-bold">
                    <span className="text-xs">PDF</span>
                    <span className="material-symbols-outlined text-sm">download</span>
                  </button>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center py-3 px-3 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
                <div className="w-1/3 text-xs text-slate-900 font-semibold">Jul 12</div>
                <div className="w-1/3 text-xs text-slate-900 font-bold text-center">$199.00</div>
                <div className="w-1/3 text-right">
                  <button className="text-sky-600 hover:underline transition-colors flex items-center justify-end gap-1 ml-auto cursor-pointer font-bold">
                    <span className="text-xs">PDF</span>
                    <span className="material-symbols-outlined text-sm">download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
