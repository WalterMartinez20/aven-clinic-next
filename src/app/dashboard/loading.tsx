import React from "react";

export default function DashboardLoading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-primary-container/20 animate-ping"></div>
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <span className="material-symbols-outlined text-primary text-xl absolute">medical_services</span>
      </div>
      <p className="text-[11px] font-bold tracking-[0.2em] text-outline uppercase animate-pulse">Loading Section...</p>
    </div>
  );
}
