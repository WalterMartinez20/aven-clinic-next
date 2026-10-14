import React, { useState, useMemo } from 'react';
import { GlobalDateSelector } from "@/components/ui/GlobalDateSelector";

export function FlowReport() {
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
      const baseSched = [380, 420, 390, 450, 480, 510, 460, 490, 530, 580, 550, 620];
      const baseComp = [340, 380, 350, 410, 440, 480, 420, 450, 490, 540, 510, 580];
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        const label = date.toLocaleString('en-US', { month: 'short' });
        data.push({ label, scheduled: baseSched[i], completed: baseComp[i], isCurrent: i === currentMonth });
      }
    } else if (chartView === 'weeks') {
      const today = new Date();
      const currentWeek = Math.ceil(today.getDate() / 7);
      const baseSched = [120, 145, 138, 165];
      const baseComp = [110, 130, 125, 150];
      for (let i = 0; i < 4; i++) {
        data.push({ label: `W${i + 1}`, scheduled: baseSched[i], completed: baseComp[i], isCurrent: (i + 1) === currentWeek });
      }
      return data;
    } else {
      // Days — last 12 days ending today
      const baseSched = [42, 48, 39, 45, 52, 50, 44, 46, 54, 58, 51, 60];
      const baseComp = [38, 44, 35, 41, 48, 46, 40, 42, 50, 53, 47, 56];
      const date = new Date();
      date.setDate(date.getDate() - 11);
      for (let i = 0; i < 12; i++) {
        const label = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
        data.push({ label, scheduled: baseSched[i], completed: baseComp[i], isCurrent: i === 11 });
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Appointment Analytics</h1>
          <p className="text-base text-slate-500 font-medium mt-2">Real-time evaluation of daily consultation flow and booking trends.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <GlobalDateSelector value={timeframe} onChange={setTimeframe} />
          <button className="flex items-center gap-2 bg-primary-container hover:bg-primary text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer text-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Total Appointments</span>
            <span className="material-symbols-outlined text-primary">calendar_today</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">1,248</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> +5.2%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">No-Show Rate</span>
            <span className="material-symbols-outlined text-primary">person_off</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">4.2%</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_downward</span> -1.8%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Avg. Consultation Time</span>
            <span className="material-symbols-outlined text-primary">timer</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">22m</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-slate-500 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">horizontal_rule</span> Stable
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

      {/* Main Chart Section */}
      <section className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm rounded-xl p-8 flex flex-col min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Appointment Volume Trends</h3>
              <p className="text-sm text-on-surface-variant mt-1">Scheduled vs completed consultations over time.</p>
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

        <div className="flex-1 flex flex-col justify-end">
          {(() => {
            const maxScheduled = Math.max(...displayData.map(d => d.scheduled), 1);
            const chartMax = Math.ceil(maxScheduled / 100) * 100;
            const numTicks = 5;
            const tickStep = chartMax / (numTicks - 1);
            const yTicks = Array.from({ length: numTicks }, (_, i) => chartMax - i * tickStep);

            return (
              <>
                <div className="flex gap-3 items-stretch h-64 mb-4">
                  <div className="relative text-[11px] font-bold text-slate-500 text-right select-none border-r-2 border-slate-300 shrink-0 min-w-[44px] tabular-nums h-full pr-1">
                    {yTicks.map((val) => {
                      const topPercent = (1 - val / chartMax) * 100;
                      return (
                        <div
                          key={val}
                          className="absolute right-0 -translate-y-1/2 flex items-center gap-1.5"
                          style={{ top: `${topPercent}%` }}
                        >
                          <span className="text-slate-500 font-bold">{val}</span>
                          <div className="w-2 h-[2px] bg-slate-400 rounded-full translate-x-[1px]" />
                        </div>
                      );
                    })}
                  </div>

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
                      const actualPercent = Math.min(100, Math.max(0, (dp.completed / chartMax) * 100));
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
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[9px] font-bold uppercase tracking-wider">Flow</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs mb-1">
                                <span className="text-slate-500 font-medium">Completed:</span>
                                <span className="font-bold text-primary">{dp.completed}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs">
                                <span className="text-slate-500 font-medium">Scheduled:</span>
                                <span className="font-bold text-slate-700">{dp.scheduled}</span>
                              </div>
                            </div>
                          )}
                          {/* Capacity / Inactive portion */}
                          <div
                            className="w-full bg-surface-variant rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                            style={{ height: `${capacityPercent}%` }}
                          />
                          {/* Completed consultations */}
                          <div
                            className="w-full bg-primary-container rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                            style={{ height: `${actualPercent}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

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
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-container"></div><span>Completed</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-variant"></div><span>Scheduled</span></div>
          </div>
        </div>
      </section>

      {/* Secondary Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Specialty Breakdown */}
        <section className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm hover:bg-surface-bright transition-colors duration-300 rounded-xl p-8">
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-6">Appointments by Specialty</h3>
          <div className="space-y-6">
            <div className="group cursor-pointer">
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-on-surface">General Practice</span>
                <span className="text-sm font-metadata font-bold text-outline">45% (561)</span>
              </div>
              <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-on-surface">Cardiology</span>
                <span className="text-sm font-metadata font-bold text-outline">25% (312)</span>
              </div>
              <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full transition-all duration-500 ease-out" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-on-surface">Pediatrics</span>
                <span className="text-sm font-metadata font-bold text-outline">18% (224)</span>
              </div>
              <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-tertiary-container rounded-full transition-all duration-500 ease-out" style={{ width: '18%' }}></div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-on-surface">Neurology</span>
                <span className="text-sm font-metadata font-bold text-outline">12% (151)</span>
              </div>
              <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-outline-variant rounded-full transition-all duration-500 ease-out" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Peak Booking Heatmap Simulation */}
        <section className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm hover:bg-surface-bright transition-colors duration-300 rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Peak Booking Times</h3>
            <div className="flex gap-2 items-center">
              <span className="font-metadata text-[10px] text-outline font-bold">LOW</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-surface-container-low"></div>
                <div className="w-3 h-3 rounded-sm bg-primary-container/40"></div>
                <div className="w-3 h-3 rounded-sm bg-primary-container"></div>
                <div className="w-3 h-3 rounded-sm bg-primary"></div>
              </div>
              <span className="font-metadata text-[10px] text-outline font-bold">HIGH</span>
            </div>
          </div>
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[400px]">
              {/* Headers */}
              <div className="grid grid-cols-8 gap-2 mb-2 font-metadata text-outline text-center font-bold">
                <div className="text-left">Time</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>
              {/* Heatmap Grid */}
              <div className="space-y-2">
                {[
                  {
                    time: "08:00 AM",
                    slots: [
                      { level: "bg-primary-container/40", label: "Moderate Volume (8 appts)" },
                      { level: "bg-primary-container", label: "High Volume (14 appts)" },
                      { level: "bg-primary-container/40", label: "Moderate Volume (9 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (3 appts)" },
                      { level: "bg-primary-container/40", label: "Moderate Volume (8 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (2 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (1 appt)" },
                    ]
                  },
                  {
                    time: "10:00 AM",
                    slots: [
                      { level: "bg-primary", label: "High Volume (24 appts)" },
                      { level: "bg-primary", label: "High Volume (22 appts)" },
                      { level: "bg-primary-container", label: "High Volume (16 appts)" },
                      { level: "bg-primary", label: "High Volume (25 appts)" },
                      { level: "bg-primary-container", label: "High Volume (18 appts)" },
                      { level: "bg-primary-container/40", label: "Moderate Volume (7 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (3 appts)" },
                    ]
                  },
                  {
                    time: "12:00 PM",
                    slots: [
                      { level: "bg-surface-container-low", label: "Low Volume (4 appts)" },
                      { level: "bg-primary-container/40", label: "Moderate Volume (8 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (5 appts)" },
                      { level: "bg-primary-container/40", label: "Moderate Volume (9 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (4 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (2 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (1 appt)" },
                    ]
                  },
                  {
                    time: "02:00 PM",
                    slots: [
                      { level: "bg-primary-container", label: "High Volume (15 appts)" },
                      { level: "bg-primary-container/40", label: "Moderate Volume (9 appts)" },
                      { level: "bg-primary", label: "High Volume (23 appts)" },
                      { level: "bg-primary-container", label: "High Volume (16 appts)" },
                      { level: "bg-primary-container/40", label: "Moderate Volume (10 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (3 appts)" },
                      { level: "bg-surface-container-low", label: "Low Volume (1 appt)" },
                    ]
                  }
                ].map((row, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-8 gap-2 items-center">
                    <div className="font-metadata text-outline text-left font-bold">{row.time}</div>
                    {row.slots.map((slot, sIdx) => (
                      <div
                        key={sIdx}
                        className={`h-8 rounded ${slot.level} hover:opacity-80 transition-opacity cursor-pointer relative group`}
                      >
                        <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200/90 text-on-surface text-xs font-bold py-1 px-2.5 rounded-xl shadow-lg whitespace-nowrap z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                          {slot.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
