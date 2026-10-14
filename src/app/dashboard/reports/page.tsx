"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SummaryReport } from "@/components/reports/SummaryReport";
import { FinancialReport } from "@/components/reports/FinancialReport";
import { FlowReport } from "@/components/reports/FlowReport";
import { PatientReport } from "@/components/reports/PatientReport";
import { EmployeeReport } from "@/components/reports/EmployeeReport";

type Tab = "platform" | "expense" | "appointment" | "patient" | "employee";

export default function ReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as Tab) || "platform";

  const handleTabChange = (tabId: Tab) => {
    router.push(`?tab=${tabId}`);
  };

  const tabs = [
    { id: "platform", label: "Platform Analytics", icon: "analytics" },
    { id: "expense", label: "App Expense Analysis", icon: "payments" },
    { id: "appointment", label: "Appointment Analytics", icon: "calendar_today" },
    { id: "patient", label: "Patient Analysis", icon: "groups" },
    { id: "employee", label: "Employee Analysis", icon: "medical_services" }
  ];

  return (
    <div className="animate-in fade-in duration-300 w-full space-y-8">
      {/* Header */}
      <div>
        <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Analytics & Reports</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Clinic Reports</h2>
        <p className="text-base text-slate-500 font-medium mt-2">Review financial performance, patient demographics, operational flow, and staff utilization.</p>
      </div>

      {/* Horizontal Tabs Navigation (Profile Navigation Styling) */}
      <div className="bg-[#f7f9fb] p-1.5 rounded-2xl border-none shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] overflow-x-auto w-fit max-w-full flex">
        <nav className="flex items-center gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as Tab)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-200 text-sm whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "bg-white text-primary font-semibold shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border-l-4 border-[#38BDF8]" 
                    : "border-l-4 border-transparent text-slate-500 hover:text-primary hover:bg-white/50"
                }`}
              >
                <span 
                  className="material-symbols-outlined text-[20px]" 
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Content Area (Full Width Below) */}
      <div className="w-full">
        {activeTab === "platform" && <SummaryReport />}
        {activeTab === "expense" && <FinancialReport />}
        {activeTab === "appointment" && <FlowReport />}
        {activeTab === "patient" && <PatientReport />}
        {activeTab === "employee" && <EmployeeReport />}
      </div>
    </div>
  );
}
