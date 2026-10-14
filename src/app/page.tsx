"use client";

import React from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingBody from "@/components/landing/LandingBody";

export default function LandingPage() {
  return (
    <div className="bg-slate-50/80 text-slate-900 antialiased selection:bg-sky-100 selection:text-sky-900 min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-slate-200/40 blur-3xl pointer-events-none" />

      <LandingHeader />
      <LandingBody />
    </div>
  );
}
