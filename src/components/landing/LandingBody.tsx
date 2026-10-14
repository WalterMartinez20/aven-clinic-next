import React from "react";
import Link from "next/link";

export default function LandingBody() {
  return (
    <>
      <main className="flex-grow pt-28 sm:pt-36">
        {/* Hero Section */}
        <section id="strategy" className="max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 flex flex-col gap-6 pr-0 lg:pr-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 text-xs font-bold uppercase tracking-widest w-fit shadow-xs">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                Next-Generation Concierge Medicine
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Longevity,<br />
                <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-slate-900 bg-clip-text text-transparent">
                  Engineered.
                </span>
              </h1>

              <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed max-w-lg mt-2">
                Aura Health provides elite, data-driven medical management. We combine advanced genomic sequencing, continuous biomarker monitoring, and world-class clinical expertise to architect your ultimate health trajectory.
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/login"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-2xl shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all inline-flex items-center gap-3 cursor-pointer"
                >
                  Initiate Protocol
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>

                <button className="bg-white hover:bg-slate-100/80 text-slate-700 font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-2xl border border-slate-200/80 shadow-sm transition-all cursor-pointer">
                  Clinical Overview
                </button>
              </div>
            </div>

            {/* Right Column: Hero Image Card */}
            <div className="lg:col-span-6 relative w-full h-[500px] sm:h-[650px]">
              <div className="w-full h-full rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 overflow-hidden bg-white relative group">
                <img
                  alt="Aura Health Lab"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 transition-transform duration-700 opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3rBDfKq4nVJkIap2j-iOESaawsFXySJF52A2Tyts2yjG8D9wir9A7yvuDXACG0-XYG3xLo4l9P4nNLLz6-4I9cpBGaECIjDw5pILqAhghLEdxlZBqXvNyRMcvYVywOaAzKnRNMWasPvlRVcIvN7dVCbukg2T5XjkU5P4Y47CVLB_KontI5asZKNomYO14-0xPzfFIA_PFQHWfqPS0MOcQJIhMLk4MJojNfy68zxEGdBV-bAGHYZXgSw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section: The Concierge Ecosystem */}
        <section id="diagnostics" className="bg-white py-20 px-6 sm:px-12 border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 text-xs font-bold uppercase tracking-widest w-fit">
                Clinical Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                The Aura Methodology
              </h2>
              <p className="text-base font-medium text-slate-500 mt-2 leading-relaxed">
                Our proprietary ecosystem moves beyond preventative care into proactive health optimization, utilizing advanced diagnostics and bespoke interventions.
              </p>
            </div>

            {/* Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              {/* Item 1 */}
              <div className="bg-slate-50/80 p-8 sm:p-10 rounded-3xl border border-slate-200/60 flex flex-col gap-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 group">
                <div className="h-16 w-16 rounded-2xl bg-white text-sky-600 border border-slate-200/80 flex items-center justify-center shadow-xs group-hover:bg-sky-50 group-hover:border-sky-200 transition-colors">
                  <span className="material-symbols-outlined text-3xl">biotech</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Genomic Mapping</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Whole-genome sequencing and polygenic risk scoring to identify inherent predispositions and tailor preventative strategies with absolute precision.
                </p>
              </div>

              {/* Item 2 */}
              <div className="bg-slate-50/80 p-8 sm:p-10 rounded-3xl border border-slate-200/60 flex flex-col gap-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 group md:mt-12">
                <div className="h-16 w-16 rounded-2xl bg-white text-sky-600 border border-slate-200/80 flex items-center justify-center shadow-xs group-hover:bg-sky-50 group-hover:border-sky-200 transition-colors">
                  <span className="material-symbols-outlined text-3xl">monitoring</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Continuous Telemetry</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Integration of wearable and implantable biosensors providing real-time data streams to our clinical team for immediate protocol adjustment.
                </p>
              </div>

              {/* Item 3 */}
              <div className="bg-slate-50/80 p-8 sm:p-10 rounded-3xl border border-slate-200/60 flex flex-col gap-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 group">
                <div className="h-16 w-16 rounded-2xl bg-white text-sky-600 border border-slate-200/80 flex items-center justify-center shadow-xs group-hover:bg-sky-50 group-hover:border-sky-200 transition-colors">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Cognitive Preservation</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Advanced neurocognitive assessments and targeted neuro-plasticity regimens designed to maintain executive function and mental acuity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy / Ethos Section */}
        <section id="physicians" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            {/* Left Image Card */}
            <div className="flex-1 order-2 md:order-1 relative h-[500px] sm:h-[600px] w-full rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/50 group">
              <img
                alt="Bespoke Clinical Design"
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700 opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhL3Wpaksg56YB8D_RfhzHLQ7YGI2v8bQ-MJ1tx9OLMygQ7uTmwcE_gH_qTwrqu5WaxkfewHTuypwKdpZGMTWC2LQv3QU-MALd4434yGq7VA6BTUzJS0kDJXz8nkqNohkzQXMtv_4GzoCnWVlW9-a-gzvJmfInfXCQoE-PlXioKiXKp1fdVsNxoiD7tKIFOwBA4AUDqjF1OOL5j13Hkh-U1JM2sKuR6ib0V-jLqffL3BmNc6vxzPdyVg"
              />
            </div>

            {/* Right Copy */}
            <div className="flex-1 order-1 md:order-2 flex flex-col gap-6 pl-0 lg:pl-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 text-xs font-bold uppercase tracking-widest w-fit">
                Operational Ethos
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Frictionless Medical Sovereignty.
              </h2>

              <p className="text-base font-medium text-slate-600 leading-relaxed">
                We have eliminated the waiting rooms, the bureaucracy, and the opacity of traditional healthcare. Aura operates as your dedicated medical family office, providing unparalleled access to global top-tier specialists and immediate intervention capabilities.
              </p>

              <p className="text-base font-medium text-slate-500 leading-relaxed">
                Our interface—both physical and digital—is designed to fade into the background, providing you with absolute clarity and control over your most valuable asset.
              </p>

              <div id="membership" className="mt-4">
                <a
                  className="text-slate-900 hover:text-sky-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors w-fit group"
                  href="#"
                >
                  Explore Membership Tiers
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">east</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="bg-white w-full border-t border-slate-200/60 px-6 sm:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-auto">
        <div className="flex items-center gap-3">
          <img src="/icon.svg" alt="Aura Health Logo" className="w-9 h-9 rounded-xl shadow-xs" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Aura Health
          </span>
        </div>

        <div className="flex flex-wrap gap-8 items-center text-xs font-semibold text-slate-500">
          <a className="hover:text-slate-900 transition-colors duration-200" href="#">Security &amp; Privacy</a>
          <a className="hover:text-slate-900 transition-colors duration-200" href="#">Clinical Protocols</a>
          <a className="hover:text-slate-900 transition-colors duration-200" href="#">Patient Portal</a>
          <a className="hover:text-slate-900 transition-colors duration-200" href="#">Contact Concierge</a>
        </div>

        <div className="text-xs font-medium text-slate-400">
          © 2026 Aura Health Technologies.
        </div>
      </footer>
    </>
  );
}
