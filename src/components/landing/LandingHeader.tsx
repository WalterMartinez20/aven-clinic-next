import React from "react";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl px-6 py-3.5 flex justify-between items-center shadow-lg shadow-slate-200/40">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/icon.svg" alt="Aura Health Logo" className="w-10 h-10 rounded-xl shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform" />
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">
              Aura Health
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
              Clinical Sanctuary
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-sky-600 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors duration-200" href="#strategy">
            Clinical Strategy
          </a>
          <a className="text-slate-500 hover:text-sky-600 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors duration-200" href="#diagnostics">
            Diagnostics
          </a>
          <a className="text-slate-500 hover:text-sky-600 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors duration-200" href="#physicians">
            Physicians
          </a>
          <a className="text-slate-500 hover:text-sky-600 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors duration-200" href="#membership">
            Membership
          </a>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-slate-700 hover:text-sky-600 text-xs font-bold uppercase tracking-wider transition-colors px-4 py-2.5 rounded-xl hover:bg-slate-100/60"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center gap-2"
          >
            Access Dashboard
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
