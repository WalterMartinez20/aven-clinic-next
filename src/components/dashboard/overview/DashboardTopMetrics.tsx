import React from "react";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardTopMetrics() {
  const { filteredPatients } = useDashboard();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <>
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Overview</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Dashboard</h2>
          <p className="text-base text-slate-500 font-medium mt-2">Real-time overview of clinic flow, patient wait times, and daily operations.</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Today&apos;s Date</p>
          <p className="text-2xl font-semibold tracking-tight text-on-surface-variant">{today}</p>
        </div>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {/* Total Patients */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Total Patients</span>
            <span className="material-symbols-outlined text-primary">group</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">1,284</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-primary mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">trending_up</span> +4% this month
            </p>
          </div>
        </div>
        {/* Waiting */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Waiting</span>
            <span className="material-symbols-outlined text-primary">hourglass_empty</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">{filteredPatients.length}</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-outline mt-2 uppercase">Avg. wait: 14m</p>
          </div>
        </div>
        {/* In Consultation */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">In Consultation</span>
            <span className="material-symbols-outlined text-primary">medical_services</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">08</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-outline mt-2 uppercase">4 rooms available</p>
          </div>
        </div>
        {/* Completed */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Completed</span>
            <span className="material-symbols-outlined text-primary">check_circle</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">34</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-outline mt-2 uppercase">Today&apos;s total</p>
          </div>
        </div>
      </div>
    </>
  );
}
