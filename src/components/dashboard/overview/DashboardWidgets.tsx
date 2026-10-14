import React, { useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";
import { Pagination } from "@/components/ui/Pagination";
import { UrgencyBadge, StatusDotBadge } from "@/components/ui/StatusBadge";
import { GlobalDateSelector } from "@/components/ui/GlobalDateSelector";

export default function DashboardWidgets() {
  const {
    filteredPatients,
    paginatedPatients,
    totalPages,
    activePage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedUrgency,
    setSelectedUrgency,
    dataPoints,
    maxVal,
    handleDeletePatient,
  } = useDashboard();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chartDate, setChartDate] = useState("Today");
  const [chartView, setChartView] = useState("today");
  const [dashboardChartPage, setDashboardChartPage] = useState(1);

  const displayDataPoints = React.useMemo(() => {
    if (chartView === 'months') {
      const data = [];
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); // 0-indexed
      const baseValues = [350, 420, 380, 490, 520, 480, 450, 470, 500, 460, 510, 530];
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        const label = date.toLocaleString('en-US', { month: 'short' });
        const isCurrentMonth = i === currentMonth;
        data.push({ label, value: baseValues[i], breakdown: { total: baseValues[i] }, isCurrentMonth });
      }
      return dashboardChartPage === 1 ? data.slice(6, 12) : data.slice(0, 6);
    } else if (chartView === 'weeks') {
      const today = new Date();
      const currentWeekOfMonth = Math.ceil(today.getDate() / 7); // 1-4
      return [
        { label: 'W1', value: 120, breakdown: { total: 120 }, isCurrentMonth: currentWeekOfMonth === 1 },
        { label: 'W2', value: 145, breakdown: { total: 145 }, isCurrentMonth: currentWeekOfMonth === 2 },
        { label: 'W3', value: 130, breakdown: { total: 130 }, isCurrentMonth: currentWeekOfMonth === 3 },
        { label: 'W4', value: 160, breakdown: { total: 160 }, isCurrentMonth: currentWeekOfMonth === 4 },
      ];
    }
    // For 'today' view, find which hour slot matches the current time best
    const now = new Date();
    const currentHourNum = now.getHours();
    
    // Parse hours to find matching slot or closest
    let matchingIndex = -1;
    let minDiff = Infinity;
    
    dataPoints.forEach((dp, idx) => {
      const slotHour = parseInt(dp.label.split(':')[0], 10);
      if (!isNaN(slotHour)) {
        const diff = Math.abs(currentHourNum - slotHour);
        if (diff < minDiff) {
          minDiff = diff;
          matchingIndex = idx;
        }
      }
    });

    return dataPoints.map((dp, idx) => ({
      ...dp,
      isCurrentMonth: idx === (matchingIndex !== -1 ? matchingIndex : dataPoints.length - 1),
    }));
  }, [chartView, dataPoints, dashboardChartPage]);

  const capacityMax = chartView === 'today' ? 50 : (chartView === 'weeks' ? 200 : 600);
  const yTicks = chartView === 'today' 
    ? [50, 40, 30, 20, 10, 5, 0] 
    : (chartView === 'weeks' ? [200, 150, 100, 50, 0] : [600, 450, 300, 150, 0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Live Queue (Left 8 cols) - Patient Flow Efficiency Chart */}
      <div className="lg:col-span-12 bg-surface-container-lowest rounded-xl p-8 mb-6 shadow-sm border border-surface-container-low/50">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Patient Flow Efficiency</h4>
            <div className="flex items-center gap-4">
              <GlobalDateSelector value={chartDate} onChange={setChartDate} className="bg-surface-container-low border-none" />
              <div className="flex bg-surface-container-lowest rounded-lg p-1 border border-surface-container-low shadow-sm">
                <button onClick={() => setChartView('months')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'months' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Months</button>
                <button onClick={() => setChartView('weeks')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'weeks' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Weeks</button>
                <button onClick={() => setChartView('today')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'today' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Today</button>
              </div>
              <div className="w-[160px] flex items-center relative">
                <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'months' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                  Months of {new Date().getFullYear()}
                </span>
                <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'weeks' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                  Weeks of {new Date().toLocaleString('en-US', { month: 'long' })}
                </span>
                <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'today' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                  {new Date().toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
              <span className="text-[10px] uppercase text-outline font-bold tracking-widest">Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-surface-variant"></div>
              <span className="text-[10px] uppercase text-outline font-bold tracking-widest">Capacity</span>
            </div>
            
            <div className="flex gap-2 items-center ml-2 border-l border-surface-container pl-4">
              <button
                onClick={() => setDashboardChartPage(0)}
                disabled={chartView !== 'months' || dashboardChartPage === 0}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button
                onClick={() => setDashboardChartPage(1)}
                disabled={chartView !== 'months' || dashboardChartPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chart with Detailed Y-Axis Numeric Scale Indicator */}
        <div className="flex gap-4 items-stretch h-64 mb-4">
          {/* Detailed Y-Axis Numeric Indicator Scale */}
          <div className="relative text-[11px] font-bold text-slate-500 font-metadata text-right select-none border-r-2 border-slate-300 shrink-0 min-w-[44px] tabular-nums h-full pr-0">
            {yTicks.map((val) => {
              const topPercent = (1 - val / 50) * 100;
              return (
                <div
                  key={val}
                  className="absolute right-0 -translate-y-1/2 flex items-center gap-1.5"
                  style={{ top: `${topPercent}%` }}
                >
                  <span className="text-slate-500 font-bold">{val}</span>
                  {/* Tick Mark Rayita */}
                  <div className="w-2 h-[2px] bg-slate-400 rounded-full translate-x-[1px]"></div>
                </div>
              );
            })}
          </div>

          {/* Bars Container with Dotted Grid Lines */}
          <div className="flex-1 flex items-end gap-2 border-b-2 border-slate-300 relative h-full">
            {/* Overlay Grid Lines for clear visual alignment */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {yTicks.map((val) => {
                const topPercent = (1 - val / (chartView === 'today' ? 50 : (chartView === 'weeks' ? 200 : 600))) * 100;
                return (
                  <div
                    key={val}
                    className="absolute left-0 right-0 border-b border-dashed border-slate-300/70 h-0"
                    style={{ top: `${topPercent}%` }}
                  />
                );
              })}
            </div>

            {displayDataPoints.map((dp, idx) => {
              const actualPercent = Math.min(100, Math.max(0, (dp.breakdown.total / capacityMax) * 100));
              const capacityPercent = Math.max(0, 100 - actualPercent);
              const isHovered = hoveredIndex === idx;
              return (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex-grow flex flex-col justify-end h-full group relative cursor-pointer z-10"
                >
                  {/* Animated App-Styled Tooltip on Hover */}
                  {isHovered && (
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-200 min-w-[140px]">
                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 mb-2">
                        <span className="font-bold text-xs text-on-surface">{dp.label}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[9px] font-bold uppercase tracking-wider">Flow</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-xs mb-1">
                        <span className="text-slate-500 font-medium">Actual:</span>
                        <span className="font-bold text-primary">{dp.breakdown.total} patients</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-xs">
                        <span className="text-slate-500 font-medium">Capacity:</span>
                        <span className="font-bold text-slate-700">{Math.round(capacityMax)} max</span>
                      </div>
                    </div>
                  )}
                  <div 
                    className="w-full bg-surface-variant rounded-t-sm transition-all duration-300 group-hover:opacity-80" 
                    style={{ height: `${capacityPercent}%` }}
                  />
                  <div 
                    className="w-full bg-primary-container rounded-t-sm transition-all duration-300 group-hover:brightness-110" 
                    style={{ height: `${actualPercent}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom X-Axis Labels (Aligned with Chart Bars) */}
        <div className="flex pl-12 text-[10px] tracking-[0.15em] uppercase items-center h-8">
          {displayDataPoints.map((dp, idx) => (
            <div key={idx} className="flex-grow flex justify-center">
              <span className={`transition-all duration-300 px-2 py-1 rounded-md whitespace-nowrap ${dp.isCurrentMonth ? "bg-[#38bdf8] text-white font-black shadow-sm" : "text-outline font-bold"}`}>
                {dp.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Queue Table (Matched to Staff & Appointment Directory Style) */}
      <div className="lg:col-span-12 w-full bg-white rounded-xl border border-surface-container shadow-sm p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-on-surface">Live Queue</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Monitor and manage the active waiting room list.</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-surface-container">
          <div className="flex gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1 px-1">
            {(["All", "CRITICAL", "URGENT", "NORMAL"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setSelectedUrgency(tab); setCurrentPage(1); }}
                className={`px-5 py-2.5 rounded-xl font-metadata text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedUrgency === tab 
                    ? 'bg-primary-container text-white font-bold shadow-sm cursor-default' 
                    : 'bg-slate-100/80 text-slate-500 hover:bg-primary-container hover:text-white hover:font-bold hover:shadow-sm cursor-pointer'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#bdc8d1]">search</span>
            <input 
              className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium pl-12 pr-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all duration-200 shadow-2xs placeholder:text-slate-400 outline-none" 
              placeholder="Search waiting patients..." 
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* Grid Table with responsive overflow protection */}
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <div className="min-w-[760px]">
            {/* Table Headers */}
            <GridTableHeader>
              <div className="col-span-4 lg:col-span-3">PATIENT</div>
              <div className="col-span-3 lg:col-span-2 hidden md:block">DATE / TIME</div>
              <div className="col-span-2 lg:col-span-2 hidden lg:block">DOCTOR</div>
              <div className="col-span-2 lg:col-span-2 hidden md:block">URGENCY</div>
              <div className="col-span-2 lg:col-span-2">STATUS</div>
              <div className="col-span-1 lg:col-span-1 text-right">ACTIONS</div>
            </GridTableHeader>

            {/* List Rows */}
            <GridTable>
              {paginatedPatients.length > 0 ? paginatedPatients.map((patient) => (
                <GridTableRow key={patient.id} className="relative">
                  {/* Patient Name & Avatar */}
                  <GridTableCell className="col-span-4 lg:col-span-3 flex items-center gap-4 min-w-0">
                    <Link href={`/dashboard/patients/${patient.id}?mode=view`} className="flex items-center gap-4 w-full min-w-0">
                      {patient.avatarUrl ? (
                        <img className="w-12 h-12 rounded-full object-cover shrink-0 group-hover:scale-105 transition-transform" src={patient.avatarUrl} alt={patient.name} />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary-container font-headline-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                          {patient.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors truncate">{patient.name}</p>
                        <p className="font-body-md text-on-surface-variant text-sm mt-0.5 md:hidden truncate">{patient.reason} • {patient.time}</p>
                      </div>
                    </Link>
                  </GridTableCell>

                  {/* Date / Time */}
                  <GridTableCell className="col-span-3 lg:col-span-2 font-body-md text-on-surface-variant hidden md:block text-sm tabular-nums">
                    <div className="font-medium text-on-background">Today</div>
                    <div className="text-xs text-outline-variant mt-0.5">{patient.time}</div>
                  </GridTableCell>

                  {/* Doctor */}
                  <GridTableCell className="col-span-2 lg:col-span-2 font-body-md text-on-surface-variant hidden lg:block text-sm truncate">
                    {patient.id === '1' ? 'Dr. Sarah Jenkins' : patient.id === '2' ? 'Dr. Michael Chen' : 'Dr. Elena Rostova'}
                  </GridTableCell>

                  {/* Patient Urgency Badge */}
                  <GridTableCell className="col-span-2 lg:col-span-2 hidden md:block">
                    <UrgencyBadge level={patient.urgency} />
                  </GridTableCell>

                  {/* Status Badge */}
                  <GridTableCell className="col-span-2 lg:col-span-2">
                    <StatusDotBadge 
                      status={patient.urgency === 'CRITICAL' ? 'In Consult' : patient.urgency === 'URGENT' ? 'In Waiting Room' : 'Completed'} 
                    />
                  </GridTableCell>

                  {/* Actions Column */}
                  <GridTableCell className="col-span-1 lg:col-span-1 flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <Link 
                      href={`/dashboard/patients/${patient.id}?mode=edit`} 
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-highest hover:text-primary transition-all cursor-pointer" 
                      title="Edit Patient"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeletePatient(patient.id); }} 
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-all cursor-pointer" 
                      title="Delete Patient"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </GridTableCell>
                </GridTableRow>
              )) : (
                <div className="py-16 text-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">hourglass_disabled</span>
                  <p className="text-sm font-bold text-on-surface-variant">No waiting patients match the filter or search criteria.</p>
                </div>
              )}
            </GridTable>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={activePage}
          totalPages={totalPages}
          totalItems={filteredPatients.length}
          showingCount={paginatedPatients.length}
          itemName="waiting patients"
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
