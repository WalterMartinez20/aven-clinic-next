import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";
import { Pagination } from "@/components/ui/Pagination";
import { GlobalDateSelector } from "@/components/ui/GlobalDateSelector";
import { UrgencyBadge, StatusDotBadge } from "@/components/ui/StatusBadge";

export function PatientReport() {
  const [timeframe, setTimeframe] = useState("Last 30 Days");
  const [chartView, setChartView] = useState("months");
  const [chartPage, setChartPage] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Live Queue Status State
  const [queueUrgencyFilter, setQueueUrgencyFilter] = useState("All");
  const [queueSearchQuery, setQueueSearchQuery] = useState("");
  const [queueCurrentPage, setQueueCurrentPage] = useState(1);

  const queuePatients = useMemo(() => [
    {
      id: '1',
      name: 'Elena Rodriguez',
      initials: 'ER',
      mrn: '#PT-0104',
      condition: 'Severe Asthma / Wheezing',
      urgency: 'CRITICAL',
      waitTime: '14m',
      arrivalTime: '10:45 AM',
      doctor: 'Dr. Sarah Jenkins',
      room: 'Triage Bay 1',
      status: 'In Waiting Room',
      bgInitials: 'bg-rose-100 text-rose-700'
    },
    {
      id: '2',
      name: 'Marcus Chen',
      initials: 'MC',
      mrn: '#PT-0218',
      condition: 'High Fever (39.5°C) & Flu',
      urgency: 'URGENT',
      waitTime: '22m',
      arrivalTime: '10:37 AM',
      doctor: 'Dr. Michael Chen',
      room: 'Exam Room 3',
      status: 'In Waiting Room',
      bgInitials: 'bg-amber-100 text-amber-700'
    },
    {
      id: '3',
      name: 'Sarah Jenkins',
      initials: 'SJ',
      mrn: '#PT-0342',
      condition: 'Routine Post-Op Follow-up',
      urgency: 'NORMAL',
      waitTime: '8m',
      arrivalTime: '10:51 AM',
      doctor: 'Dr. Elena Jenkins',
      room: 'Consult 2A',
      status: 'In Waiting Room',
      bgInitials: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: '4',
      name: 'David Kim',
      initials: 'DK',
      mrn: '#PT-0419',
      condition: 'Acute Chest Pain / Arrhythmia',
      urgency: 'CRITICAL',
      waitTime: '6m',
      arrivalTime: '10:53 AM',
      doctor: 'Dr. Marcus Reed',
      room: 'Resus Room 1',
      status: 'In Triage',
      bgInitials: 'bg-rose-100 text-rose-700'
    },
    {
      id: '5',
      name: 'Maria Santos',
      initials: 'MS',
      mrn: '#PT-0582',
      condition: 'Migraine with Aura',
      urgency: 'URGENT',
      waitTime: '28m',
      arrivalTime: '10:31 AM',
      doctor: 'Dr. Sarah Jenkins',
      room: 'Exam Room 4',
      status: 'In Waiting Room',
      bgInitials: 'bg-amber-100 text-amber-700'
    },
    {
      id: '6',
      name: 'James Wilson',
      initials: 'JW',
      mrn: '#PT-0633',
      condition: 'Blood Pressure Check',
      urgency: 'NORMAL',
      waitTime: '19m',
      arrivalTime: '10:40 AM',
      doctor: 'Dr. Elena Jenkins',
      room: 'Consult 1B',
      status: 'In Waiting Room',
      bgInitials: 'bg-blue-100 text-blue-700'
    },
  ], []);

  const filteredQueuePatients = useMemo(() => {
    return queuePatients.filter((pt) => {
      const matchesUrgency =
        queueUrgencyFilter === 'All' ||
        pt.urgency.toUpperCase() === queueUrgencyFilter.toUpperCase();
      const matchesSearch =
        pt.name.toLowerCase().includes(queueSearchQuery.toLowerCase()) ||
        pt.mrn.toLowerCase().includes(queueSearchQuery.toLowerCase()) ||
        pt.condition.toLowerCase().includes(queueSearchQuery.toLowerCase()) ||
        pt.doctor.toLowerCase().includes(queueSearchQuery.toLowerCase());
      return matchesUrgency && matchesSearch;
    });
  }, [queuePatients, queueUrgencyFilter, queueSearchQuery]);

  const queueItemsPerPage = 4;
  const queueTotalPages = Math.ceil(filteredQueuePatients.length / queueItemsPerPage) || 1;
  const paginatedQueuePatients = useMemo(() => {
    const start = (queueCurrentPage - 1) * queueItemsPerPage;
    return filteredQueuePatients.slice(start, start + queueItemsPerPage);
  }, [filteredQueuePatients, queueCurrentPage]);

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
      const baseTotal = [320, 380, 410, 390, 450, 520, 480, 510, 560, 610, 590, 680];
      const baseReturning = [180, 220, 250, 230, 280, 310, 290, 320, 350, 380, 360, 410];
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        const label = date.toLocaleString('en-US', { month: 'short' });
        data.push({ label, total: baseTotal[i], returning: baseReturning[i], isCurrent: i === currentMonth });
      }
    } else if (chartView === 'weeks') {
      const today = new Date();
      const currentWeek = Math.ceil(today.getDate() / 7);
      const baseTotal = [120, 145, 138, 165];
      const baseReturning = [80, 95, 90, 110];
      for (let i = 0; i < 4; i++) {
        data.push({ label: `W${i + 1}`, total: baseTotal[i], returning: baseReturning[i], isCurrent: (i + 1) === currentWeek });
      }
      return data;
    } else {
      // Days — last 12 days ending today
      const baseTotal = [38, 44, 41, 49, 55, 52, 46, 48, 56, 62, 58, 66];
      const baseReturning = [22, 26, 24, 30, 34, 31, 27, 29, 35, 39, 36, 42];
      const date = new Date();
      date.setDate(date.getDate() - 11);
      for (let i = 0; i < 12; i++) {
        const label = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
        data.push({ label, total: baseTotal[i], returning: baseReturning[i], isCurrent: i === 11 });
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Patient Analysis</h1>
          <p className="text-base text-slate-500 font-medium mt-2">Real-time overview of clinic flow, patient volume, and satisfaction.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <GlobalDateSelector value={timeframe} onChange={setTimeframe} />
          <button className="flex items-center gap-2 bg-primary-container hover:bg-primary text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer text-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Total Admissions</span>
            <span className="material-symbols-outlined text-primary">person_add</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">1,248</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> +12%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Avg. Waiting Time</span>
            <span className="material-symbols-outlined text-primary">schedule</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">18m</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
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

      {/* Main Chart Area */}
      <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl w-full flex flex-col relative overflow-hidden min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Patient Volume Trends</h3>
              <p className="text-sm text-on-surface-variant mt-1">New vs Returning Patients over time.</p>
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
            const maxTotal = Math.max(...displayData.map(d => d.total), 1);
            const chartMax = Math.ceil(maxTotal / 100) * 100;
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
                      const actualPercent = Math.min(100, Math.max(0, (dp.returning / chartMax) * 100));
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
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[9px] font-bold uppercase tracking-wider">Patients</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs mb-1">
                                <span className="text-slate-500 font-medium">Returning:</span>
                                <span className="font-bold text-primary">{dp.returning}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs">
                                <span className="text-slate-500 font-medium">Total:</span>
                                <span className="font-bold text-slate-700">{dp.total}</span>
                              </div>
                            </div>
                          )}
                          {/* Capacity / Inactive portion */}
                          <div
                            className="w-full bg-surface-variant rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                            style={{ height: `${capacityPercent}%` }}
                          />
                          {/* Returning patients */}
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
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-container"></div><span>Returning</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-variant"></div><span>New</span></div>
          </div>
        </div>
      </div>

      {/* Live Queue Status */}
      <section className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm overflow-hidden rounded-xl flex flex-col">
        <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container">
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Live Queue Status</h3>
            <p className="text-sm text-on-surface-variant mt-1">Real-time triage, waiting room queue, and active assignments.</p>
          </div>
          <span className="px-3 py-1 bg-surface-container-low text-primary font-metadata font-bold text-xs rounded-full self-start sm:self-auto">
            {filteredQueuePatients.length} Patients in Queue
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-surface-container">
            <div className="flex gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1 px-1">
              {["All", "Critical", "Urgent", "Normal"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setQueueUrgencyFilter(tab);
                    setQueueCurrentPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-metadata text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                    queueUrgencyFilter.toLowerCase() === tab.toLowerCase()
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
                placeholder="Search patient, MRN, condition..."
                type="text"
                value={queueSearchQuery}
                onChange={(e) => {
                  setQueueSearchQuery(e.target.value);
                  setQueueCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Grid Table with responsive overflow protection */}
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <div className="min-w-[760px]">
              <GridTable>
                <GridTableHeader>
                  <div className="col-span-3">PATIENT</div>
                  <div className="col-span-2">TRIAGE LEVEL</div>
                  <div className="col-span-2">WAIT TIME</div>
                  <div className="col-span-2">ASSIGNED DOCTOR</div>
                  <div className="col-span-2">STATUS</div>
                  <div className="col-span-1 text-right">ACTION</div>
                </GridTableHeader>

                {paginatedQueuePatients.length > 0 ? (
                  paginatedQueuePatients.map((pt) => (
                    <GridTableRow key={pt.id}>
                      <GridTableCell className="col-span-3">
                        <Link href={`/dashboard/patients/${pt.id}?mode=view`} className="flex items-center gap-3.5 group/pt cursor-pointer min-w-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 group-hover/pt:scale-105 transition-transform ${pt.bgInitials}`}>
                            {pt.initials}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-on-surface text-sm group-hover/pt:text-primary transition-colors truncate">{pt.name}</h4>
                            <p className="text-xs text-on-surface-variant mt-0.5 truncate">{pt.mrn} • {pt.condition}</p>
                          </div>
                        </Link>
                      </GridTableCell>

                      <GridTableCell className="col-span-2 flex items-center">
                        <UrgencyBadge level={pt.urgency} />
                      </GridTableCell>

                      <GridTableCell className="col-span-2 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs text-slate-400">schedule</span>
                          <span className="text-sm font-bold text-on-surface tabular-nums">{pt.waitTime}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 mt-0.5">{pt.arrivalTime}</span>
                      </GridTableCell>

                      <GridTableCell className="col-span-2 flex flex-col justify-center min-w-0">
                        <span className="text-sm font-semibold text-on-surface truncate">{pt.doctor}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="px-2 py-0.5 rounded bg-surface-container-low text-slate-600 font-medium text-[11px] truncate">{pt.room}</span>
                        </div>
                      </GridTableCell>

                      <GridTableCell className="col-span-2 flex items-center">
                        <StatusDotBadge status={pt.status} />
                      </GridTableCell>

                      <GridTableCell className="col-span-1 flex justify-end items-center">
                        <button
                          title={`Assign room for ${pt.name}`}
                          className="flex items-center gap-1 px-3 py-1.5 bg-primary-container hover:bg-primary text-white font-bold text-xs rounded-xl shadow-2xs hover:shadow transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                        >
                          <span className="material-symbols-outlined text-[16px]">meeting_room</span>
                          <span>Assign</span>
                        </button>
                      </GridTableCell>
                    </GridTableRow>
                  ))
                ) : (
                  <div className="py-12 text-center text-slate-400 font-medium">
                    No patients match the search or filter criteria.
                  </div>
                )}
              </GridTable>
            </div>
          </div>

          <Pagination
            currentPage={queueCurrentPage}
            totalPages={queueTotalPages}
            totalItems={filteredQueuePatients.length}
            showingCount={paginatedQueuePatients.length}
            itemName="patients in queue"
            onPageChange={setQueueCurrentPage}
          />
        </div>
      </section>

      {/* Secondary Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl flex flex-col items-center justify-center">
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

        <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl">
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-8">Wait Time by Dept.</h3>
          <div className="flex flex-col gap-6 w-full">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Cardiology</span>
                <span className="font-metadata font-bold text-slate-400">24m</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">General Practice</span>
                <span className="font-metadata font-bold text-slate-400">12m</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Pediatrics</span>
                <span className="font-metadata font-bold text-slate-400">18m</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-metadata font-bold text-slate-600">Neurology</span>
                <span className="font-metadata font-bold text-slate-400">35m</span>
              </div>
              <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                <div className="bg-surface-tint h-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm p-8 rounded-xl">
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-6">Top Consultations</h3>
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
              <span className="text-sm font-medium text-slate-800">Follow-up</span>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
              <span className="w-6 h-6 flex items-center justify-center bg-surface-container-high text-slate-600 rounded-full text-xs font-bold">4</span>
              <span className="text-sm font-medium text-slate-800">Consultation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
