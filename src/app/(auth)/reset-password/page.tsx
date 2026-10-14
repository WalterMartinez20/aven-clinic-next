"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function getStrength(password: string): { level: number; label: string } {
  if (password.length === 0) return { level: 0, label: "None" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 1, label: "Weak" };
  if (score === 2) return { level: 2, label: "Fair" };
  if (score === 3) return { level: 3, label: "Good" };
  return { level: 4, label: "Strong" };
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const strength = getStrength(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col justify-center items-center p-4 sm:p-8 font-sans antialiased relative overflow-hidden selection:bg-sky-100 selection:text-sky-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 -left-40 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10">

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden">
          {!submitted ? (
            <>
              {/* Centered Large App Icon & Header */}
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex justify-center">
                  <img src="/icon.svg" alt="Aura Health Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-md shadow-sky-500/20" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Reset Password
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
                  Create a strong new password to secure your professional account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Error Banner */}
                {error && (
                  <div className="p-4 rounded-2xl text-xs font-bold bg-rose-50 border border-rose-200/80 text-rose-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">error</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* New Password Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="new_password" className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    New Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      lock
                    </span>
                    <input
                      id="new_password"
                      name="new_password"
                      type={showNew ? "text" : "password"}
                      placeholder="Enter new password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-12 pl-12 pr-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showNew ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Dynamic 4-Section Strength Indicator (Dashboard Aesthetic & Smooth Animation) */}
                <div className="flex flex-col gap-2.5 p-4 bg-slate-50/80 border border-slate-200/60 rounded-2xl transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      Password Strength
                    </span>
                    {newPassword.length > 0 && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-metadata text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        strength.level === 1 ? 'bg-rose-50 text-rose-700 border border-rose-200/80' :
                        strength.level === 2 ? 'bg-amber-50 text-amber-700 border border-amber-200/80' :
                        strength.level === 3 ? 'bg-sky-50 text-sky-700 border border-sky-200/80' :
                        'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          strength.level === 1 ? 'bg-rose-500' :
                          strength.level === 2 ? 'bg-amber-500' :
                          strength.level === 3 ? 'bg-sky-500' :
                          'bg-emerald-500 animate-pulse'
                        }`}></span>
                        {strength.label}
                      </span>
                    )}
                  </div>

                  {/* 4-Section Segmented Pill Meter */}
                  <div className="grid grid-cols-4 gap-1.5 w-full">
                    {[1, 2, 3, 4].map((step) => {
                      const isFilled = step <= strength.level;
                      const activeColorClass = 
                        strength.level === 1 ? 'bg-rose-500' :
                        strength.level === 2 ? 'bg-amber-500' :
                        strength.level === 3 ? 'bg-sky-500' :
                        'bg-emerald-500';

                      return (
                        <div
                          key={step}
                          className={`h-2 rounded-full transition-all duration-300 ease-out ${
                            isFilled ? activeColorClass : 'bg-slate-200/80'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <p className="text-[11px] font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-slate-400">info</span>
                    <span>At least 8 characters, include a number &amp; symbol.</span>
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirm_password" className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      lock_reset
                    </span>
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-12 pl-12 pr-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showConfirm ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Update Password
                    <span className="material-symbols-outlined text-lg">check</span>
                  </button>

                  <Link
                    href="/login"
                    className="w-full h-11 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider transition-colors rounded-xl hover:bg-slate-50"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Cancel &amp; Return to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center text-center py-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 shadow-sm">
                <span className="material-symbols-outlined text-[42px] sm:text-[52px]">
                  verified_user
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                Password Updated!
              </h2>
              <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs mb-6">
                Your password has been successfully reset. Redirecting you to login...
              </p>
              <Link
                href="/login"
                className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                Continue to Login
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
