import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { GlobalDateSelector } from "@/components/ui/GlobalDateSelector";
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";
import { Pagination } from "@/components/ui/Pagination";

export function EmployeeReport() {
  const [timeframe, setTimeframe] = useState("Last 30 Days");
  const [chartView, setChartView] = useState("departments");
  const [chartPage, setChartPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Elite Performers State
  const [staffFilter, setStaffFilter] = useState("All");
  const [staffSearchQuery, setStaffSearchQuery] = useState("");
  const [staffCurrentPage, setStaffCurrentPage] = useState(1);

  const eliteStaffList = useMemo(() => [
    {
      id: '1',
      name: 'Sarah Jenkins, RN',
      role: 'Emergency Specialist',
      dept: 'Emergency',
      unit: 'Critical Care Wing',
      rating: '4.9',
      reviews: 84,
      initials: 'SJ',
      bgInitials: 'bg-primary-container/20 text-primary',
    },
    {
      id: '2',
      name: 'Dr. Marcus Reed',
      role: 'Lead Cardiologist',
      dept: 'Cardiology',
      unit: 'Cardiac Center',
      rating: '4.8',
      reviews: 62,
      initials: 'MR',
      bgInitials: 'bg-blue-100 text-blue-700',
    },
    {
      id: '3',
      name: 'Elena Lopez',
      role: 'ICU Specialist',
      dept: 'ICU',
      unit: 'Intensive Care Unit',
      rating: '4.7',
      reviews: 59,
      initials: 'EL',
      bgInitials: 'bg-purple-100 text-purple-700',
    },
    {
      id: '4',
      name: 'Dr. David Cho',
      role: 'Pediatric Consultant',
      dept: 'Pediatrics',
      unit: 'Children Health Wing',
      rating: '4.9',
      reviews: 73,
      initials: 'DC',
      bgInitials: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: '5',
      name: 'Maria Rossi, RN',
      role: 'Head Nurse Oncology',
      dept: 'Oncology',
      unit: 'Oncology Wing',
      rating: '4.8',
      reviews: 51,
      initials: 'MR',
      bgInitials: 'bg-amber-100 text-amber-700',
    },
    {
      id: '6',
      name: 'Dr. Lucas Vance',
      role: 'Neurology Chief',
      dept: 'Neurology',
      unit: 'Neuro Diagnostics',
      rating: '4.7',
      reviews: 44,
      initials: 'LV',
      bgInitials: 'bg-sky-100 text-sky-700',
    },
  ], []);

  const filteredEliteStaff = useMemo(() => {
    return eliteStaffList.filter((member) => {
      const matchesDept =
        staffFilter === 'All' ||
        member.dept.toLowerCase() === staffFilter.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
        member.dept.toLowerCase().includes(staffSearchQuery.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [eliteStaffList, staffFilter, staffSearchQuery]);

  const staffItemsPerPage = 3;
  const staffTotalPages = Math.ceil(filteredEliteStaff.length / staffItemsPerPage) || 1;
  const paginatedEliteStaff = useMemo(() => {
    const start = (staffCurrentPage - 1) * staffItemsPerPage;
    return filteredEliteStaff.slice(start, start + staffItemsPerPage);
  }, [filteredEliteStaff, staffCurrentPage]);

  // Wrapper to reset page whenever view changes
  const handleChartViewChange = (view: string) => {
    setChartView(view);
    setChartPage(0);
  };

  const allDepts = useMemo(() => [
    { label: 'Emergency', active: 45, capacity: 50, doctors: 12, nurses: 25, support: 8 },
    { label: 'Cardiology', active: 28, capacity: 35, doctors: 8, nurses: 15, support: 5 },
    { label: 'Pediatrics', active: 32, capacity: 40, doctors: 10, nurses: 18, support: 4 },
    { label: 'ICU', active: 55, capacity: 60, doctors: 15, nurses: 35, support: 5 },
    { label: 'Oncology', active: 22, capacity: 30, doctors: 6, nurses: 12, support: 4 },
    { label: 'Neurology', active: 18, capacity: 25, doctors: 5, nurses: 9, support: 4 },
    { label: 'Orthopedics', active: 24, capacity: 30, doctors: 7, nurses: 13, support: 4 },
    { label: 'Dermatology', active: 14, capacity: 20, doctors: 4, nurses: 7, support: 3 },
  ], []);

  const displayData = useMemo(() => {
    if (chartView === 'departments') {
      return chartPage === 0 ? allDepts.slice(0, 5) : allDepts.slice(5, 8);
    } else if (chartView === 'shifts') {
      return [
        { label: 'Morning Shift', active: 180, capacity: 200, doctors: 45, nurses: 105, support: 30 },
        { label: 'Afternoon Shift', active: 145, capacity: 170, doctors: 35, nurses: 85, support: 25 },
        { label: 'Night Shift', active: 85, capacity: 110, doctors: 20, nurses: 50, support: 15 },
        { label: 'On-Call', active: 18, capacity: 25, doctors: 10, nurses: 6, support: 2 },
      ];
    } else {
      // Roles
      return [
        { label: 'Physicians', active: 110, capacity: 125, doctors: 110, nurses: 0, support: 0 },
        { label: 'Nurses', active: 246, capacity: 275, doctors: 0, nurses: 246, support: 0 },
        { label: 'Support Staff', active: 72, capacity: 85, doctors: 0, nurses: 0, support: 72 },
      ];
    }
  }, [chartView, chartPage, allDepts]);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Dashboard overview</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface">Employee Analysis</h1>
          <p className="text-base text-slate-500 font-medium mt-2">Strategic overview of staff performance, shift hours, and utilization.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <GlobalDateSelector value={timeframe} onChange={setTimeframe} />
          <button className="flex items-center gap-2 bg-primary-container hover:bg-primary text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer text-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Total Active Staff</span>
            <span className="material-symbols-outlined text-primary">group</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">428</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> +12
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Staff Utilization</span>
            <span className="material-symbols-outlined text-primary">pie_chart</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">87%</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> +2.4%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Avg Shift Duration</span>
            <span className="material-symbols-outlined text-primary">schedule</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-on-surface">8.4</span>
              <span className="text-slate-500 text-sm">hrs</span>
            </div>
            <p className="text-[11px] font-bold tracking-[0.15em] text-slate-500 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">horizontal_rule</span> Stable
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Performance Index</span>
            <span className="material-symbols-outlined text-primary">star_rate</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-on-surface">9.2</span>
              <span className="text-slate-500 text-sm">/10</span>
            </div>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> +0.3
            </p>
          </div>
        </div>
      </div>

      {/* Main Staffing Load Chart Area (Full Width) */}
      <section className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm rounded-xl p-8 flex flex-col min-h-[400px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Staffing Load by Department</h3>
              <p className="text-sm text-on-surface-variant mt-1">Active staff vs target capacity across units.</p>
            </div>
            <div className="hidden lg:flex bg-surface-container-lowest rounded-lg p-1 border border-surface-container-low shadow-sm ml-2">
              <button onClick={() => handleChartViewChange('departments')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'departments' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Departments</button>
              <button onClick={() => handleChartViewChange('shifts')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'shifts' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Shifts</button>
              <button onClick={() => handleChartViewChange('roles')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartView === 'roles' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Roles</button>
            </div>
            <div className="w-[160px] hidden lg:flex items-center relative">
              <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'departments' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                Units & Specialties
              </span>
              <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'shifts' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                Daily Shift Rotations
              </span>
              <span className={`text-xs text-slate-500 font-medium whitespace-nowrap transition-opacity duration-300 absolute ${chartView === 'roles' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                Staff Categories
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setChartPage(0)}
              disabled={chartView !== 'departments' || chartPage === 0}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button
              onClick={() => setChartPage(1)}
              disabled={chartView !== 'departments' || chartPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end">
          {(() => {
            const maxVal = Math.max(...displayData.map(d => d.capacity), 1);
            const chartMax = maxVal <= 100 ? Math.ceil(maxVal / 20) * 20 : Math.ceil(maxVal / 50) * 50;
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
                          {isHovered && (
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-200 min-w-[140px]">
                              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 mb-2">
                                <span className="font-bold text-xs text-on-surface">{dp.label}</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[9px] font-bold uppercase tracking-wider">Staff</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs mb-1">
                                <span className="text-slate-500 font-medium">Active:</span>
                                <span className="font-bold text-primary">{dp.active} staff</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs">
                                <span className="text-slate-500 font-medium">Capacity:</span>
                                <span className="font-bold text-slate-700">{dp.capacity} max</span>
                              </div>
                            </div>
                          )}
                          {/* Capacity / inactive portion (top gray portion) */}
                          <div
                            className="w-full bg-surface-variant rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                            style={{ height: `${capacityPercent}%` }}
                          />
                          {/* Active staff */}
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
                      <span className={`transition-all duration-300 px-2 py-1 rounded-md whitespace-nowrap text-on-surface-variant font-medium`}>
                        {dp.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-container"></div><span>Active Staff</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-variant"></div><span>Capacity</span></div>
          </div>
        </div>
      </section>

      {/* Elite Performers Table (Full-Width) */}
      <section className="bg-surface-container-lowest border border-surface-container-low/50 shadow-sm overflow-hidden rounded-xl flex flex-col">
        <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container">
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Elite Performers</h3>
            <p className="text-sm text-on-surface-variant mt-1">Top-rated clinical and support specialists this month.</p>
          </div>
          <span className="px-3 py-1 bg-surface-container-low text-primary font-metadata font-bold text-xs rounded-full self-start sm:self-auto">
            {filteredEliteStaff.length} Top Specialists
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-surface-container">
            <div className="flex gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1 px-1">
              {["All", "Emergency", "Cardiology", "ICU", "Pediatrics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setStaffFilter(tab);
                    setStaffCurrentPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-metadata text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                    staffFilter.toLowerCase() === tab.toLowerCase()
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
                placeholder="Search specialist, role, department..."
                type="text"
                value={staffSearchQuery}
                onChange={(e) => {
                  setStaffSearchQuery(e.target.value);
                  setStaffCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Grid Table with responsive overflow protection */}
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <div className="min-w-[720px]">
              <GridTable>
                <GridTableHeader>
                  <div className="col-span-4">STAFF MEMBER</div>
                  <div className="col-span-3">DEPARTMENT & UNIT</div>
                  <div className="col-span-3">RATING & REVIEWS</div>
                  <div className="col-span-2 text-right">ACTION</div>
                </GridTableHeader>

                {paginatedEliteStaff.length > 0 ? (
                  paginatedEliteStaff.map((member) => (
                    <GridTableRow key={member.id}>
                      <GridTableCell className="col-span-4">
                        <Link href={`/dashboard/staff/${member.id}?mode=view`} className="flex items-center gap-3.5 group/staff cursor-pointer min-w-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 group-hover/staff:scale-105 transition-transform ${member.bgInitials}`}>
                            {member.initials}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-on-surface text-sm group-hover/staff:text-primary transition-colors truncate">{member.name}</h4>
                            <p className="text-xs text-on-surface-variant mt-0.5 truncate">{member.role}</p>
                          </div>
                        </Link>
                      </GridTableCell>

                      <GridTableCell className="col-span-3 flex flex-col justify-center min-w-0">
                        <span className="text-sm font-semibold text-on-surface truncate">{member.dept}</span>
                        <span className="text-xs text-slate-400 truncate">{member.unit}</span>
                      </GridTableCell>

                      <GridTableCell className="col-span-3 flex items-center">
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-amber-100/40 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-xl shadow-2xs hover:shadow-sm transition-all duration-200">
                          <span className="material-symbols-outlined text-[16px] text-amber-500 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="font-bold text-xs tabular-nums text-amber-950">{member.rating}</span>
                          <span className="text-[10px] font-medium text-amber-700/80 hidden sm:inline">({member.reviews} reviews)</span>
                          <span className="text-[10px] font-medium text-amber-700/80 sm:hidden">({member.reviews})</span>
                        </div>
                      </GridTableCell>

                      <GridTableCell className="col-span-2 flex justify-end items-center">
                        <Link
                          href={`/dashboard/staff/${member.id}?mode=view`}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-surface-container-low hover:bg-primary-container text-slate-700 hover:text-white border border-surface-container/80 hover:border-transparent font-bold text-xs rounded-xl shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95 shrink-0 group/btn"
                        >
                          <span className="material-symbols-outlined text-[16px] text-primary group-hover/btn:text-white transition-colors">person</span>
                          <span>Profile</span>
                        </Link>
                      </GridTableCell>
                    </GridTableRow>
                  ))
                ) : (
                  <div className="py-12 text-center text-slate-400 font-medium">
                    No staff members match the search or filter criteria.
                  </div>
                )}
              </GridTable>
            </div>
          </div>

          <Pagination
            currentPage={staffCurrentPage}
            totalPages={staffTotalPages}
            totalItems={filteredEliteStaff.length}
            showingCount={paginatedEliteStaff.length}
            itemName="elite performers"
            onPageChange={setStaffCurrentPage}
          />
        </div>
      </section>

      {/* Secondary Bottom Section: 2 Cards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Card 1: Punctuality & Attendance */}
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-surface-container-low/50 shadow-sm hover:bg-surface-bright transition-colors duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Punctuality & Attendance</h3>
              <span className="material-symbols-outlined text-primary text-lg">event_available</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">Staff punctuality and shift attendance metrics.</p>

            <div className="flex flex-col gap-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-metadata font-bold text-slate-600">On Time</span>
                  <span className="font-metadata font-bold text-slate-400">94.2%</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-metadata font-bold text-slate-600">Delayed</span>
                  <span className="font-metadata font-bold text-slate-400">4.1%</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '4.1%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-metadata font-bold text-slate-600">Absence</span>
                  <span className="font-metadata font-bold text-slate-400">1.7%</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: '1.7%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant font-medium">
            <span>Monthly Attendance Target: 95%</span>
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-sm">trending_up</span> 98.3% Met
            </span>
          </div>
        </div>

        {/* Card 2: Training & Compliance */}
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-surface-container-low/50 shadow-sm hover:bg-surface-bright transition-colors duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Training & Compliance</h3>
              <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">Staff certification, HIPAA, and clinical licensing status.</p>

            <div className="flex flex-col gap-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-metadata font-bold text-slate-600">BLS & ACLS Emergency Certs</span>
                  <span className="font-metadata font-bold text-slate-400">100%</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-metadata font-bold text-slate-600">HIPAA & Privacy Protocol</span>
                  <span className="font-metadata font-bold text-slate-400">98.5%</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-metadata font-bold text-slate-600">CME Clinical Credits Completed</span>
                  <span className="font-metadata font-bold text-slate-400">92.0%</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant font-medium">
            <span>Overall Clinical Compliance</span>
            <span className="text-primary font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-sm">check_circle</span> 97.8% Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
