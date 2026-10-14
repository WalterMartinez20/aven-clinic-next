"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ handleLogout }: { handleLogout: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-[#f7f9fb] w-64 border-r-0 transition-all duration-300 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <img src="/icon.svg" alt="Sanctuary Health Logo" className="w-10 h-10 shrink-0" />
          <div>
            <h1 className="text-xl font-bold text-primary tracking-tighter">Sanctuary Health</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Clinical Analytics</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {[
          { href: "/dashboard", label: "Dashboard", icon: "space_dashboard", exact: true },
          { href: "/dashboard/appointments", label: "Appointments", icon: "calendar_today", exact: false },
          { href: "/dashboard/patients", label: "Patients", icon: "group", exact: false },
          { href: "/dashboard/staff", label: "Staff", icon: "medical_services", exact: false },
          { href: "/dashboard/reports", label: "Analytics", icon: "analytics", exact: false },
        ].map(({ href, label, icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-primary font-semibold shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] translate-x-1 border-l-4 border-[#38BDF8]"
                  : "border-l-4 border-transparent text-slate-500 hover:text-primary hover:bg-white/50"
              }`}
            >
              <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 space-y-1">
        {(() => {
          const isProfileActive = pathname.startsWith("/dashboard/account");
          return (
            <Link
              href="/dashboard/account"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isProfileActive
                  ? "bg-white text-primary font-semibold shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] translate-x-1 border-l-4 border-[#38BDF8]"
                  : "border-l-4 border-transparent text-slate-500 hover:text-primary hover:bg-white/50"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={isProfileActive ? { fontVariationSettings: "'FILL' 1" } : {}}>account_circle</span>
              <span>Profile</span>
            </Link>
          );
        })()}
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-slate-500 hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
