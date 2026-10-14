"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isTransitioning, transitionText, handleLogout, handleResetDemo } = useDashboardLayout();
  const isForm = pathname.includes('/new') || pathname.includes('/edit');

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const [isSectionLoading, setIsSectionLoading] = React.useState(true);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsSectionLoading(true);
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsSectionLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="bg-surface-container-low text-on-surface font-body-md text-body-md antialiased min-h-screen">
      <Sidebar handleLogout={handleLogout} />
      
      <Header isForm={isForm} handleResetDemo={handleResetDemo} />

      {/* Main Content Area */}
      <main className="ml-64 pt-28 pb-12 px-container-padding max-w-max-width mx-auto">
        {children}
      </main>

      {/* Section Loader (Simple, Solid White Background, App-Styled) */}
      {isSectionLoading && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-200">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="font-metadata text-xs font-bold text-outline uppercase tracking-[0.2em]">Loading...</p>
          </div>
        </div>
      )}

      {/* Transitional Full-Screen Loader (Matching section loader style) */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-200">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="font-metadata text-xs font-bold text-outline uppercase tracking-[0.2em]">
              {transitionText.toLowerCase().includes("reset") ? "Resetting demo data..." : "Logging out..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
