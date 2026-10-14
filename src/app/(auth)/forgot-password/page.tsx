"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col justify-center items-center p-4 sm:p-8 font-sans antialiased relative overflow-hidden selection:bg-sky-100 selection:text-sky-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 -left-40 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Central Recovery Module Card */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden">
          {!submitted ? (
            <>
              {/* Centered Large App Icon & Header */}
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex justify-center">
                  <img src="/icon.svg" alt="Aura Health Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-md shadow-sky-500/20" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Recover Access
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
                  Enter your professional email address to receive a secure password recovery link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      mail
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="doctor@aurahealth.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Send Recovery Link
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>

                  <Link
                    href="/login"
                    className="w-full h-11 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider transition-colors rounded-xl hover:bg-slate-50"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center text-center py-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 shadow-sm">
                <span className="material-symbols-outlined text-[42px] sm:text-[52px]">
                  mark_email_read
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                Recovery Link Sent
              </h2>
              <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs mb-6">
                If an account exists for <strong className="text-slate-900">{email}</strong>, you will receive password reset instructions shortly.
              </p>
              <Link
                href="/login"
                className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Return to Login
              </Link>
            </div>
          )}
        </div>

        {/* Footer Meta */}
        <div className="text-center mt-8">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Aura Health. Secure Connection.
          </p>
        </div>
      </div>
    </div>
  );
}
