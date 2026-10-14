import React, { useState } from 'react';
import { Pagination } from "@/components/ui/Pagination";
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";
import { StatusDotBadge, StatusPillBadge } from "@/components/ui/StatusBadge";
import { GlobalDateSelector } from "@/components/ui/GlobalDateSelector";

export function FinancialReport() {
  const [hoveredExpenseIndex, setHoveredExpenseIndex] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState("Current Quarter (Q3)");
  const [chartView, setChartView] = useState("months");
  const [expenseChartPage, setExpenseChartPage] = useState(1);

  // Invoices Table State
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("All");
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");
  const [invoicePage, setInvoicePage] = useState(1);

  const invoicesList = React.useMemo(() => [
    {
      id: '#INV-2024-08',
      service: 'AWS Cloud Services',
      category: 'Cloud Infrastructure',
      date: 'Sep 01, 2024',
      period: 'Monthly Plan',
      amount: '$12,450.00',
      type: 'Auto-Debit',
      status: 'Paid',
      icon: 'cloud_done',
      bgIcon: 'bg-primary-container/20 text-primary',
    },
    {
      id: '#INV-2024-07',
      service: 'Twilio SMS API',
      category: 'Telehealth & SMS',
      date: 'Aug 28, 2024',
      period: 'Usage-Based',
      amount: '$3,200.50',
      type: 'Credit Card',
      status: 'Paid',
      icon: 'api',
      bgIcon: 'bg-sky-100 text-sky-700',
    },
    {
      id: '#INV-2024-06',
      service: 'Datadog Monitoring',
      category: 'APM & Security Logs',
      date: 'Aug 25, 2024',
      period: 'Annual License',
      amount: '$1,850.00',
      type: 'Wire Transfer',
      status: 'Pending',
      icon: 'security',
      bgIcon: 'bg-purple-100 text-purple-700',
    },
    {
      id: '#INV-2024-05',
      service: 'SendGrid Email API',
      category: 'Transactional Emails',
      date: 'Aug 20, 2024',
      period: 'Monthly Plan',
      amount: '$850.00',
      type: 'Credit Card',
      status: 'Paid',
      icon: 'mail',
      bgIcon: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: '#INV-2024-04',
      service: 'Stripe Gateway Fee',
      category: 'Payment Processing',
      date: 'Aug 15, 2024',
      period: 'Usage-Based',
      amount: '$4,120.30',
      type: 'Auto-Debit',
      status: 'Paid',
      icon: 'payments',
      bgIcon: 'bg-blue-100 text-blue-700',
    },
    {
      id: '#INV-2024-03',
      service: 'Cloudflare Enterprise',
      category: 'DDoS & Security CDN',
      date: 'Aug 10, 2024',
      period: 'Annual Plan',
      amount: '$2,500.00',
      type: 'Wire Transfer',
      status: 'Pending',
      icon: 'shield',
      bgIcon: 'bg-amber-100 text-amber-700',
    },
  ], []);

  const filteredInvoices = React.useMemo(() => {
    return invoicesList.filter((inv) => {
      const matchesStatus =
        invoiceStatusFilter === 'All' ||
        inv.status.toLowerCase() === invoiceStatusFilter.toLowerCase();
      const matchesSearch =
        inv.service.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
        inv.id.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
        inv.category.toLowerCase().includes(invoiceSearchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [invoicesList, invoiceStatusFilter, invoiceSearchQuery]);

  const invoiceItemsPerPage = 4;
  const invoiceTotalPages = Math.ceil(filteredInvoices.length / invoiceItemsPerPage) || 1;
  const paginatedInvoices = React.useMemo(() => {
    const start = (invoicePage - 1) * invoiceItemsPerPage;
    return filteredInvoices.slice(start, start + invoiceItemsPerPage);
  }, [filteredInvoices, invoicePage]);

  // Wrapper to reset page whenever view changes
  const handleChartViewChange = (view: string) => {
    setChartView(view);
    setExpenseChartPage(1);
  };

  const allExpenseData = React.useMemo(() => {
    const data = [];
    if (chartView === 'months') {
      // Always show Jan–Dec of the current year in order
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); // 0-indexed
      const baseTotal = [22000, 25000, 31000, 28000, 35000, 40000, 38000, 32000, 29000, 26000, 30000, 34000];
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        const label = date.toLocaleString('en-US', { month: 'short' });
        const total = baseTotal[i];
        const infra = total * (0.55 + (i % 3) * 0.1);
        const isCurrentMonth = i === currentMonth;
        data.push({ label, total, infra, isCurrentMonth });
      }
    } else if (chartView === 'weeks') {
      const today = new Date();
      const currentWeekOfMonth = Math.ceil(today.getDate() / 7); // 1-4
      const baseTotal = [8000, 7500, 8200, 7900];
      for (let i = 0; i < 4; i++) {
        const label = `W${i + 1}`;
        const total = baseTotal[i];
        const infra = total * (0.55 + (i % 3) * 0.1);
        const isCurrentMonth = (i + 1) === currentWeekOfMonth;
        data.push({ label, total, infra, isCurrentMonth });
      }
      return data;
    } else {
      // Days — always show last 12 days ending today
      const baseTotal = [1200, 1500, 1100, 1400, 1600, 1300, 1250, 1150, 1350, 1550, 1450, 1650];
      const date = new Date();
      date.setDate(date.getDate() - 11);
      for (let i = 0; i < 12; i++) {
        const label = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
        const total = baseTotal[i];
        const infra = total * (0.55 + (i % 3) * 0.1);
        const isCurrentMonth = i === 11;
        data.push({ label, total, infra, isCurrentMonth });
        date.setDate(date.getDate() + 1);
      }
    }
    return data;
  }, [chartView]);

  const expenseData = chartView === 'weeks' ? allExpenseData : (expenseChartPage === 1 ? allExpenseData.slice(6, 12) : allExpenseData.slice(0, 6));

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Dashboard overview</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface">App Expense Analysis</h1>
          <p className="text-base text-slate-500 font-medium mt-2">Operational cost and infrastructure spend overview for the current fiscal quarter.</p>
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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Total Operational Costs</span>
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">$142,500</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-error mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">trending_up</span> +4.2%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Infrastructure Spend</span>
            <span className="material-symbols-outlined text-primary">dns</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">$85,200</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-error mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">trending_up</span> +8.1%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">License Fees</span>
            <span className="material-symbols-outlined text-primary">vpn_key</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">$32,400</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-slate-500 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">horizontal_rule</span> 0.0%
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Maintenance & Support</span>
            <span className="material-symbols-outlined text-primary">engineering</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">$24,900</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-emerald-600 mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">trending_down</span> -1.5%
            </p>
          </div>
        </div>
      </section>

      {/* Main Charts Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl border border-surface-container-low/50 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Monthly Expense Trend</h3>
                <p className="text-sm text-on-surface-variant mt-1">Total vs Infrastructure expenses over time.</p>
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
                onClick={() => setExpenseChartPage(0)}
                disabled={chartView !== 'months' || expenseChartPage === 0}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button
                onClick={() => setExpenseChartPage(1)}
                disabled={chartView !== 'months' || expenseChartPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-surface-container text-on-surface-variant hover:bg-primary-container hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>
          {/* Dynamic Chart — same pattern as Dashboard */}
          {(() => {
            const maxTotal = Math.max(...expenseData.map(d => d.total), 1);
            // Round up to a nice ceiling (nearest 10k)
            const chartMax = Math.ceil(maxTotal / 10000) * 10000;
            const numTicks = 5;
            const tickStep = chartMax / (numTicks - 1);
            const yTicks = Array.from({ length: numTicks }, (_, i) => chartMax - i * tickStep);

            const fmtK = (v: number) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`;

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

                    {expenseData.map((dp, idx) => {
                      const actualPercent = Math.min(100, Math.max(0, (dp.infra / chartMax) * 100));
                      const capacityPercent = Math.max(0, 100 - actualPercent);
                      const isHovered = hoveredExpenseIndex === idx;

                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredExpenseIndex(idx)}
                          onMouseLeave={() => setHoveredExpenseIndex(null)}
                          className="flex-grow flex flex-col justify-end h-full group relative cursor-pointer z-10"
                        >
                          {/* Tooltip */}
                          {isHovered && (
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-200 min-w-[140px]">
                              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 mb-2">
                                <span className="font-bold text-xs text-on-surface">{dp.label}</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[9px] font-bold uppercase tracking-wider">Expense</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs mb-1">
                                <span className="text-slate-500 font-medium">Infra:</span>
                                <span className="font-bold text-primary">${(dp.infra / 1000).toFixed(1)}k</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-xs">
                                <span className="text-slate-500 font-medium">Total:</span>
                                <span className="font-bold text-slate-700">${(dp.total / 1000).toFixed(1)}k</span>
                              </div>
                            </div>
                          )}
                          {/* Capacity (top gray portion) */}
                          <div
                            className="w-full bg-surface-variant rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                            style={{ height: `${capacityPercent}%` }}
                          />
                          {/* Infra (bottom blue portion) */}
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
                  {expenseData.map((dp, idx) => (
                    <div key={idx} className="flex-grow flex justify-center">
                      <span className={`transition-all duration-300 px-2 py-1 rounded-md whitespace-nowrap ${dp.isCurrentMonth ? "bg-[#38bdf8] text-white font-black shadow-sm" : "text-on-surface-variant font-medium"}`}>
                        {dp.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-container"></div><span>Infrastructure</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-variant"></div><span>Total Expenses</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-container-low/50 shadow-sm hover:bg-surface-bright transition-colors duration-300 flex-1 flex flex-col">
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-6">Spend by Category</h3>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="w-48 h-48 rounded-full border-[24px] border-surface-container-low/50 relative" style={{ borderTopColor: '#00668a', borderRightColor: '#7DD3FC', borderBottomColor: '#a2b4bf', transform: 'rotate(-45deg)' }}>
                <div className="absolute inset-0 m-auto w-full h-full flex flex-col items-center justify-center" style={{ transform: 'rotate(45deg)' }}>
                  <span className="text-3xl font-semibold tracking-tight text-on-surface">4</span>
                  <span className="text-xs text-on-surface-variant font-medium mt-1">Categories</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div><span className="text-on-surface font-medium">Hosting (AWS/GCP)</span></div>
                <span className="font-bold">60%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div><span className="text-on-surface font-medium">API Costs</span></div>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-tertiary-container"></div><span className="text-on-surface font-medium">Security</span></div>
                <span className="font-bold">12%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-surface-container-high"></div><span className="text-on-surface font-medium">Storage</span></div>
                <span className="font-bold">8%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Invoices/Payments List */}
      <section className="bg-surface-container-lowest rounded-xl border border-surface-container-low/50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container">
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Recent Invoices & Payments</h3>
            <p className="text-sm text-on-surface-variant mt-1">Latest processed payments for app-related infrastructure and APIs.</p>
          </div>
          <span className="px-3 py-1 bg-surface-container-low text-primary font-metadata font-bold text-xs rounded-full self-start sm:self-auto">
            {filteredInvoices.length} Invoices Processed
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-surface-container">
            <div className="flex gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1 px-1">
              {["All", "Paid", "Pending"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setInvoiceStatusFilter(tab);
                    setInvoicePage(1);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-metadata text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                    invoiceStatusFilter.toLowerCase() === tab.toLowerCase()
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
                placeholder="Search invoice, vendor, category..."
                type="text"
                value={invoiceSearchQuery}
                onChange={(e) => {
                  setInvoiceSearchQuery(e.target.value);
                  setInvoicePage(1);
                }}
              />
            </div>
          </div>

          {/* Grid Table with responsive overflow protection */}
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <div className="min-w-[720px]">
              <GridTable>
                <GridTableHeader>
                  <div className="col-span-4">SERVICE / VENDOR</div>
                  <div className="col-span-3">BILLING DATE</div>
                  <div className="col-span-2">AMOUNT</div>
                  <div className="col-span-3 text-right">STATUS & ACTION</div>
                </GridTableHeader>

                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((invoice) => (
                    <GridTableRow key={invoice.id}>
                      <GridTableCell className="col-span-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${invoice.bgIcon}`}>
                            <span className="material-symbols-outlined text-lg">{invoice.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-on-surface text-sm truncate">{invoice.service}</h4>
                            <p className="text-xs text-on-surface-variant mt-0.5 truncate">{invoice.id} • {invoice.category}</p>
                          </div>
                        </div>
                      </GridTableCell>

                      <GridTableCell className="col-span-3 flex flex-col justify-center min-w-0">
                        <span className="text-sm font-semibold text-on-surface truncate">{invoice.date}</span>
                        <span className="text-xs text-slate-400 truncate">{invoice.period}</span>
                      </GridTableCell>

                      <GridTableCell className="col-span-2 flex flex-col justify-center min-w-0">
                        <span className="text-sm font-bold text-on-surface tabular-nums">{invoice.amount}</span>
                        <span className="text-xs text-slate-400 truncate">{invoice.type}</span>
                      </GridTableCell>

                      <GridTableCell className="col-span-3 flex justify-end items-center gap-3">
                        <StatusDotBadge status={invoice.status} />
                        <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-surface-container-low hover:bg-primary-container text-slate-700 hover:text-white border border-surface-container/80 hover:border-transparent font-bold text-xs rounded-xl shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95 shrink-0 group/btn">
                          <span className="material-symbols-outlined text-[16px] text-primary group-hover/btn:text-white transition-colors">download</span>
                          <span>PDF</span>
                        </button>
                      </GridTableCell>
                    </GridTableRow>
                  ))
                ) : (
                  <div className="py-12 text-center text-slate-400 font-medium">
                    No invoices match the search or filter criteria.
                  </div>
                )}
              </GridTable>
            </div>
          </div>
          
          <Pagination
            currentPage={invoicePage}
            totalPages={invoiceTotalPages}
            totalItems={filteredInvoices.length}
            showingCount={paginatedInvoices.length}
            itemName="invoices"
            onPageChange={setInvoicePage}
          />
        </div>
      </section>
    </div>
  );
}
