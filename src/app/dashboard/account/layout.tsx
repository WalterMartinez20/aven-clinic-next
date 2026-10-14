"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard/account", label: "General", icon: "person", exact: true },
    { href: "/dashboard/account/security", label: "Security", icon: "lock", exact: false },
    { href: "/dashboard/account/billing", label: "Billing", icon: "credit_card", exact: false },
    { href: "/dashboard/account/notifications", label: "Notifications", icon: "notifications", exact: false },
    { href: "/dashboard/account/practice-info", label: "Practice Info", icon: "domain", exact: false },
  ];

  return (
    <div className="animate-in fade-in duration-300 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <span className="font-metadata text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            Account Preferences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-1">
            Settings
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage your clinical preferences, security settings, and system configurations.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 bg-[#f7f9fb] p-3 rounded-2xl border border-surface-container shadow-sm overflow-hidden">
          <ul className="flex flex-col gap-1.5">
            {navItems.map(({ href, label, icon, exact }) => {
              const isActive = exact ? pathname === href : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                      isActive 
                        ? "bg-white text-primary font-semibold shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] translate-x-1 border-l-4 border-[#38BDF8]" 
                        : "border-l-4 border-transparent text-slate-500 hover:text-primary hover:bg-white/50"
                    }`}
                  >
                    <span 
                      className="material-symbols-outlined text-[20px]"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {icon}
                    </span>
                    <span className="font-semibold">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Account Content Area */}
        <div className="flex-1 w-full space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
