import React, { useState, useMemo } from 'react';
import { GlobalDateSelector } from "@/components/ui/GlobalDateSelector";

export function SummaryReport() {
  const [timeframe, setTimeframe] = useState("Last 30 Days");
  const [chartView, setChartView] = useState("months");
  const [chartPage, setChartPage] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Wrapper to reset page whenever view changes
  const handleChartViewChange = (view: string) => {
    setChartView(view);
    setChartPage(1);
  };

  const allDisplayData = useMemo(() => {
    const data = [];
    if (chartView === 'months') {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const baseSessions = [3200, 3800, 4100, 3900, 4500, 5200, 4800, 5100, 5600, 6100, 5900, 6800];
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        const label = date.toLocaleString('en-US', { month: 'short' });
        const total = baseSessions[i];
        const active = Math.round(total * (0.6 + (i % 3) * 0.08));
        const isCurrent = i === currentMonth;
        data.push({ label, total, active, isCurrent });
      }
    } else if (chartView === 'weeks') {
      const today = new Date();
      const currentWeek = Math.ceil(today.getDate() / 7);
      const baseSessions = [1200, 1450, 1380, 1650];
      for (let i = 0; i < 4; i++) {
        const label = `W${i + 1}`;
        const total = baseSessions[i];
        const active = Math.round(total * (0.6 + (i % 3) * 0.08));
        const isCurrent = (i + 1) === currentWeek;
        data.push({ label, total, active, isCurrent });
      }
      return data;
    } else {
      // Days — last 12 days ending today
      const baseSessions = [420, 510, 480, 550, 610, 580, 530, 490, 620, 680, 640, 710];
      const date = new Date();
      date.setDate(date.getDate() - 11);
      for (let i = 0; i < 12; i++) {
        const label = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
        const total = baseSessions[i];
        const active = Math.round(total * (0.6 + (i % 3) * 0.08));
        const isCurrent = i === 11;
        data.push({ label, total, active, isCurrent });
        date.setDate(date.getDate() + 1);
      }
    }
    return data;
  }, [chartView]);

  const displayData = chartView === 'weeks' ? allDisplayData : (chartPage === 1 ? allDisplayData.slice(6, 12) : allDisplayData.slice(0, 6));

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Dashboard overview</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Platform Analytics</h1>
          <p className="text-base text-slate-500 font-medium mt-2">Real-time overview of platform engagement and clinical operations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <GlobalDateSelector value={timeframe} onChange={setTimeframe} />
          <button className="flex items-center gap-2 bg-primary-container hover:bg-primary text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer text-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Total Admissions</span>
            <span className="material-symbols-outlined text-primary">person_add</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">1,248</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> +12.4%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Avg. Waiting Time</span>
            <span className="material-symbols-outlined text-primary">schedule</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">18 min</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-error mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_downward</span> -5m
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Resolution Rate</span>
            <span className="material-symbols-outlined text-primary">check_circle</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">94.2%</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> +2.1%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Patient Satisfaction</span>
            <span className="material-symbols-outlined text-primary">star</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-on-surface">4.8</span>
            <span className="text-slate-500 text-sm">/5.0</span>
          </div>
        </div>
      </div>

      {/* Platform Usage Trends (Full Width) */}
      <section className="bg-surface-container-lowest p-8 rounded-xl border border-surface-container-low/50 shadow-sm flex flex-col min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Platform Usage Trends</h3>
              <p className="text-sm text-on-surface-variant mt-1">Total vs Active sessions over time.</p>
            </div>
            <div className="hidden lg:flex bg-surface-container-lowest rounded-lg p-1 border border-surface-container-low shadow-sm ml-2">
              <button onClick={() => handleChartViewChange('months')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'months' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Months</button>
              <button onClick={() => handleChartViewChange('weeks')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'weeks' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Weeks</button>
              <button onClick={() => handleChartViewChange('days')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'days' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Days</button>
            </div>
            <div className="w-[160px] hidden lg:flex items-center relative">
              <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'months' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                Months of {new Date().getFullYear()}
              </span>
              <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'weeks' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                Weeks of {new Date().toLocaleString('en-US', { month: 'long' })}
              </span>
              <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'days' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                Days of {new Date().toLocaleString('en-US', { month: 'long' })}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setChartPage(0)}
              disabled={chartView !== 'months' || chartPage === 0}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button
              onClick={() => setChartPage(1)}
              disabled={chartView !== 'months' || chartPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* Dynamic Chart — same pattern as Monthly Expense Trend */}
        {(() => {
          const maxTotal = Math.max(...displayData.map(d => d.total), 1);
          // Round up to a nice ceiling (nearest 1000)
          const chartMax = Math.ceil(maxTotal / 1000) * 1000;
          const numTicks = 5;
          const tickStep = chartMax / (numTicks - 1);
          const yTicks = Array.from({ length: numTicks }, (_, i) => chartMax - i * tickStep);

          const fmtK = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`;

          return (
            <>
              {/* Chart area */}
              <div className="flex gap-3 items-stretch h-64 mb-4">
                {/* Y-Axis labels */}
                <div className="relative text-[11px] font-bold text-slate-500 text-right select-none border-r-2 border-slate-300 shrink-0 min-w-[44px] tabular-nums h-full pr-1">
                  {yTicks.map((val) => {
                    const topPercent = (1 - val / chartMax) * 100;
                    return (
                      <div
                        key={val}
                        className="absolute right-0 -translate-y-1/2 flex items-center gap-1.5"
                        style={{ top: `${topPercent}%` }}
                      >
                        <span className="text-slate-500 font-bold">{fmtK(val)}</span>
                        <div className="w-2 h-[2px] bg-slate-400 rounded-full translate-x-[1px]" />
                      </div>
                    );
                  })}
                </div>

                {/* Bars */}
                <div className="flex-1 flex items-end gap-2 border-b-2 border-slate-300 relative h-full">
                  {/* Dashed grid lines */}
                  <div className="absolute inset-0 pointer-events-none z-20">
                    {yTicks.map((val) => {
                      const topPercent = (1 - val / chartMax) * 100;
                      return (
                        <div
                          key={val}
                          className="absolute left-0 right-0 border-b border-dashed border-slate-300/70 h-0"
                          style={{ top: `${topPercent}%` }}
                        />
                      );
                    })}
                  </div>

                  {displayData.map((dp, idx) => {
                    const actualPercent = Math.min(100, Math.max(0, (dp.active / chartMax) * 100));
                    const capacityPercent = Math.max(0, 100 - actualPercent);
                    const isHovered = hoveredIndex === idx;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="flex-grow flex flex-col justify-end h-full group relative cursor-pointer z-10"
                      >
                        {/* Tooltip */}
                        {isHovered && (
                          <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-200 min-w-[140px]">
                            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 mb-2">
                              <span className="font-bold text-xs text-on-surface">{dp.label}</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[9px] font-bold uppercase tracking-wider">Usage</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-xs mb-1">
                              <span className="text-slate-500 font-medium">Active:</span>
                              <span className="font-bold text-primary">{dp.active.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-xs">
                              <span className="text-slate-500 font-medium">Total:</span>
                              <span className="font-bold text-slate-700">{dp.total.toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                        {/* Capacity / Inactive portion */}
                        <div
                          className="w-full bg-surface-variant rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                          style={{ height: `${capacityPercent}%` }}
                        />
                        {/* Active sessions */}
                        <div
                          className="w-full bg-primary-container rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                          style={{ height: `${actualPercent}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex pl-[52px] text-[10px] uppercase tracking-widest h-8 items-center gap-2">
                {displayData.map((dp, idx) => (
                  <div key={idx} className="flex-grow flex justify-center">
                    <span className={`transition-all duration-300 px-2 py-1 rounded-md whitespace-nowrap ${dp.isCurrent ? "bg-[#38bdf8] text-white font-black shadow-sm" : "text-on-surface-variant font-medium"}`}>
                      {dp.label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-container"></div><span>Active Sessions</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-variant"></div><span>Total Sessions</span></div>
        </div>
      </section>

      {/* Secondary Insights Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Engagement */}
        <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl flex flex-col justify-between">
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-8">Feature Engagement</h3>
          <div className="flex flex-col gap-6 w-full">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Patient Management</span>
                <span className="font-metadata font-bold text-slate-400">45%</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Scheduling</span>
                <span className="font-metadata font-bold text-slate-400">30%</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Billing & Claims</span>
                <span className="font-metadata font-bold text-slate-400">15%</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Analytics</span>
                <span className="font-metadata font-bold text-slate-400">10%</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-surface-tint h-full rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Patients by Specialty */}
        <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl flex flex-col justify-between">
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-8">Patients by Specialty</h3>
          <div className="flex flex-col gap-6 w-full">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">General Practice</span>
                <span className="font-metadata font-bold text-slate-400">420 pts</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Cardiology</span>
                <span className="font-metadata font-bold text-slate-400">215 pts</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Pediatrics</span>
                <span className="font-metadata font-bold text-slate-400">180 pts</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Dermatology</span>
                <span className="font-metadata font-bold text-slate-400">95 pts</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-surface-tint h-full rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Reasons */}
        <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl flex flex-col justify-between">
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-6">Top Consultation Reasons</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
              <span className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full text-xs font-bold">1</span>
              <span className="text-sm font-medium text-slate-800">Routine Checkup</span>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
              <span className="w-6 h-6 flex items-center justify-center bg-primary-container text-white rounded-full text-xs font-bold">2</span>
              <span className="text-sm font-medium text-slate-800">Seasonal Flu</span>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
              <span className="w-6 h-6 flex items-center justify-center bg-secondary text-white rounded-full text-xs font-bold">3</span>
              <span className="text-sm font-medium text-slate-800">Follow-up Consult</span>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
              <span className="w-6 h-6 flex items-center justify-center bg-surface-container-high text-slate-600 rounded-full text-xs font-bold">4</span>
              <span className="text-sm font-medium text-slate-800">Vaccination</span>
            </li>
          </ul>
        </div>

        {/* Distribution by Triage */}
        <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl flex flex-col items-center justify-between">
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase w-full mb-8">Triage Distribution</h3>
          <div className="relative w-48 h-48 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#38BDF8 0% 45%, #7DD3FC 45% 80%, #E0F2FE 80% 100%)' }}>
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center flex-col">
              <span className="text-4xl font-bold text-slate-800">3</span>
              <span className="font-metadata text-slate-400 font-bold mt-1">Levels</span>
            </div>
          </div>
          <div className="w-full flex justify-between mt-8">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div><span className="font-metadata font-bold">Level 1 (45%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-secondary rounded-full"></div><span className="font-metadata font-bold">Level 2 (35%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-surface-container-high rounded-full"></div><span className="font-metadata font-bold">Level 3 (20%)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
