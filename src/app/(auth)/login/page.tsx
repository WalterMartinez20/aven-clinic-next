"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sanctuary.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.login({ email, password });
      setIsTransitioning(true);
      setTimeout(() => router.push("/dashboard"), 850);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col justify-center items-center p-4 sm:p-8 font-sans antialiased relative overflow-hidden selection:bg-sky-100 selection:text-sky-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 -left-40 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Central Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden">
          {/* Centered Large App Icon & Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex justify-center">
              <img src="/icon.svg" alt="Aura Health Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-md shadow-sky-500/20" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Welcome Back
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
              Sign in to your professional account.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl text-xs font-bold bg-rose-50 border border-rose-200/80 text-rose-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              <span>{error}</span>
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Professional Email
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

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="font-metadata text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="font-metadata text-[11px] font-bold text-sky-600 hover:text-slate-900 uppercase tracking-widest transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition-all outline-none"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-sky-500/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Meta */}
        <div className="text-center mt-8">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Aura Health. Secure Connection.
          </p>
        </div>
      </div>

      {/* Login Transition Loader (Matching section loader style) */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-200">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="font-metadata text-xs font-bold text-outline uppercase tracking-[0.2em]">Signing in...</p>
          </div>
        </div>
      )}
    </div>
  );
}
