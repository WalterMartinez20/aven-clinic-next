export default function AppointmentsAnalyticsReport() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
{/* Page Header & Filters */}
<header className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
<div className="flex flex-col gap-2">
<h1 className="text-display-lg font-display tracking-[-0.02em] font-light text-on-surface">Flow Analytics</h1>
<p className="text-body-md text-on-surface-variant max-w-xl leading-relaxed">
                    Overview of appointment volumes, cancellation trends, and patient wait times across all departments.
                </p>
</div>
{/* Date Range Selector */}
<div className="flex bg-surface-container-lowest rounded-xl shadow-sm p-1">
<button className="px-4 py-2 text-label-md font-medium text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">Today</button>
<button className="px-4 py-2 text-label-md font-medium text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">Week</button>
<button className="px-4 py-2 text-label-md font-medium bg-primary-fixed text-on-primary-fixed rounded-lg shadow-sm transition-colors">Month</button>
<button className="px-4 py-2 text-label-md font-medium text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">Quarter</button>
</div>
</header>
{/* Metrics Bento Grid */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Metric 1: Appointment Volume */}
<div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<div className="p-3 bg-surface-container-low rounded-lg text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
</div>
<span className="bg-secondary-container/30 text-secondary px-2 py-1 rounded-md text-label-sm font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
                    </span>
</div>
<div>
<h3 className="text-headline-md font-display font-medium text-on-surface">3,245</h3>
<p className="text-label-md text-on-surface-variant">Total Appointments</p>
</div>
</div>
{/* Metric 2: Cancellation Rate */}
<div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<div className="p-3 bg-error-container/50 rounded-lg text-error">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_busy</span>
</div>
<span className="bg-error-container/30 text-error px-2 py-1 rounded-md text-label-sm font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span> 2.1%
                    </span>
</div>
<div>
<h3 className="text-headline-md font-display font-medium text-on-surface">4.8%</h3>
<p className="text-label-md text-on-surface-variant">Cancellation Rate</p>
</div>
</div>
{/* Metric 3: Avg Wait Time */}
<div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<div className="p-3 bg-surface-container-low rounded-lg text-tertiary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
</div>
<span className="bg-secondary-container/30 text-secondary px-2 py-1 rounded-md text-label-sm font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">arrow_downward</span> 4m
                    </span>
</div>
<div>
<h3 className="text-headline-md font-display font-medium text-on-surface">18 min</h3>
<p className="text-label-md text-on-surface-variant">Average Wait Time</p>
</div>
</div>
{/* Metric 4: Patient Retention */}
<div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<div className="p-3 bg-surface-container-low rounded-lg text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
</div>
<span className="bg-surface-container text-on-surface-variant px-2 py-1 rounded-md text-label-sm font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">horizontal_rule</span> 0%
                    </span>
</div>
<div>
<h3 className="text-headline-md font-display font-medium text-on-surface">92.4%</h3>
<p className="text-label-md text-on-surface-variant">Patient Retention</p>
</div>
</div>
</section>
{/* Charts Area */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Main Chart: Appointment Volume Trend */}
<div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-sm">
<div className="flex justify-between items-center mb-8">
<div>
<h2 className="text-headline-md font-display font-medium text-on-surface">Volume Trend</h2>
<p className="text-body-md text-on-surface-variant">Daily appointments over the last 30 days</p>
</div>
<button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
{/* Mock Area Chart */}
<div className="relative h-64 w-full flex-grow border-b border-surface-container-highest">
{/* Y-Axis Labels */}
<div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-label-sm text-outline-variant py-2">
<span>150</span>
<span>100</span>
<span>50</span>
<span>0</span>
</div>
{/* Chart SVG Area */}
<div className="ml-8 h-full relative overflow-hidden flex items-end">
{/* Grid Lines */}
<div className="absolute inset-0 flex flex-col justify-between">
<div className="border-t border-surface-container h-0 w-full"></div>
<div className="border-t border-surface-container h-0 w-full"></div>
<div className="border-t border-surface-container h-0 w-full"></div>
<div className="border-t border-surface-container h-0 w-full"></div>
</div>
{/* The Graph (CSS representation) */}
<div className="relative w-full h-[80%] bg-gradient-to-t from-primary/10 to-transparent flex items-end justify-between px-2 pt-4">
{/* Line Path (approximated with clip-path for structural demo) */}
<div className="absolute top-0 left-0 w-full h-full border-t-2 border-primary" style={{ clipPath: "polygon(0 40%, 10% 20%, 20% 50%, 30% 10%, 40% 60%, 50% 30%, 60% 70%, 70% 20%, 80% 40%, 90% 10%, 100% 30%, 100% 100%, 0 100%)", background: "linear-gradient(to bottom, rgba(0, 104, 95, 0.2), transparent)" }}></div>
{/* Data Points (Decorative) */}
<div className="w-2 h-2 bg-primary rounded-full absolute top-[10%] left-[30%] shadow-[0_0_8px_rgba(0,104,95,0.8)]"></div>
<div className="w-2 h-2 bg-primary rounded-full absolute top-[10%] left-[90%] shadow-[0_0_8px_rgba(0,104,95,0.8)]"></div>
{/* Hover Tooltip Line (Decorative) */}
<div className="absolute left-[70%] top-0 bottom-0 w-px bg-outline-variant border-dashed"></div>
<div className="absolute left-[70%] top-[15%] transform -translate-x-1/2 -translate-y-full bg-inverse-surface text-inverse-on-surface px-3 py-1 rounded-md text-label-sm font-medium whitespace-nowrap shadow-lg">
                                Oct 24: 142 Appts
                            </div>
</div>
</div>
</div>
{/* X-Axis Labels */}
<div className="ml-8 mt-4 flex justify-between text-label-sm text-outline-variant">
<span>Oct 1</span>
<span>Oct 8</span>
<span>Oct 15</span>
<span>Oct 22</span>
<span>Oct 29</span>
</div>
</div>
{/* Secondary Chart: Wait Time Distribution */}
<div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-sm">
<div className="mb-6">
<h2 className="text-headline-md font-display font-medium text-on-surface">Wait Times</h2>
<p className="text-body-md text-on-surface-variant">Average delay by department</p>
</div>
<div className="flex-grow flex flex-col justify-center gap-6">
{/* Bar 1 */}
<div className="flex flex-col gap-2">
<div className="flex justify-between text-label-sm">
<span className="font-medium text-on-surface">Cardiology</span>
<span className="text-error">24 min</span>
</div>
<div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-error rounded-full" style={{ width: "80%" }}></div>
</div>
</div>
{/* Bar 2 */}
<div className="flex flex-col gap-2">
<div className="flex justify-between text-label-sm">
<span className="font-medium text-on-surface">General Practice</span>
<span className="text-tertiary">15 min</span>
</div>
<div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-tertiary rounded-full" style={{ width: "50%" }}></div>
</div>
</div>
{/* Bar 3 */}
<div className="flex flex-col gap-2">
<div className="flex justify-between text-label-sm">
<span className="font-medium text-on-surface">Pediatrics</span>
<span className="text-secondary">8 min</span>
</div>
<div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{ width: "25%" }}></div>
</div>
</div>
{/* Bar 4 */}
<div className="flex flex-col gap-2">
<div className="flex justify-between text-label-sm">
<span className="font-medium text-on-surface">Neurology</span>
<span className="text-tertiary">12 min</span>
</div>
<div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-tertiary rounded-full" style={{ width: "40%" }}></div>
</div>
</div>
</div>
</div>
</section>
{/* Bottom Section: Detailed Queue Table */}
<section className="bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-sm overflow-x-auto">
<div className="flex justify-between items-center mb-6 min-w-[600px]">
<h2 className="text-headline-md font-display font-medium text-on-surface">Live Queue Status</h2>
<div className="flex gap-4">
<button className="flex items-center gap-2 text-primary text-label-md font-medium hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">
<span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
                    </button>
<button className="flex items-center gap-2 text-primary text-label-md font-medium hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">
<span className="material-symbols-outlined text-[18px]">download</span> Export
                    </button>
</div>
</div>
<div className="min-w-[600px]">
<div className="grid grid-cols-5 gap-4 py-3 border-b border-surface-container text-label-sm font-medium text-outline-variant">
<div className="col-span-2">Department &amp; Doctor</div>
<div>Status</div>
<div>Queue Length</div>
<div className="text-right">Avg Wait</div>
</div>
<div className="flex flex-col">
{/* Row 1 */}
<div className="grid grid-cols-5 gap-4 py-4 border-b border-surface-container-low hover:bg-surface-container-low/50 transition-colors group">
<div className="col-span-2 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-medium">CR</div>
<div>
<p className="text-body-md font-medium text-on-surface">Cardiology</p>
<p className="text-label-sm text-on-surface-variant">Dr. Sarah Jenkins</p>
</div>
</div>
<div className="flex items-center">
<span className="bg-error-container text-on-error-container px-2 py-1 rounded-md text-label-sm font-medium flex items-center gap-1">
<div className="w-1.5 h-1.5 rounded-full bg-error"></div> Delayed
                            </span>
</div>
<div className="flex items-center text-body-md text-on-surface">8 patients</div>
<div className="flex items-center justify-end text-body-md font-medium text-error">24m</div>
</div>
{/* Row 2 */}
<div className="grid grid-cols-5 gap-4 py-4 border-b border-surface-container-low hover:bg-surface-container-low/50 transition-colors group">
<div className="col-span-2 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-medium">GP</div>
<div>
<p className="text-body-md font-medium text-on-surface">General Practice</p>
<p className="text-label-sm text-on-surface-variant">Dr. Michael Chen</p>
</div>
</div>
<div className="flex items-center">
<span className="bg-secondary-container/50 text-on-secondary-container px-2 py-1 rounded-md text-label-sm font-medium flex items-center gap-1">
<div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> On Time
                            </span>
</div>
<div className="flex items-center text-body-md text-on-surface">3 patients</div>
<div className="flex items-center justify-end text-body-md font-medium text-secondary">5m</div>
</div>
{/* Row 3 */}
<div className="grid grid-cols-5 gap-4 py-4 hover:bg-surface-container-low/50 transition-colors group">
<div className="col-span-2 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-medium">PD</div>
<div>
<p className="text-body-md font-medium text-on-surface">Pediatrics</p>
<p className="text-label-sm text-on-surface-variant">Dr. Emily Stone</p>
</div>
</div>
<div className="flex items-center">
<span className="bg-tertiary-container/20 text-on-tertiary-fixed-variant px-2 py-1 rounded-md text-label-sm font-medium flex items-center gap-1">
<div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div> Slight Delay
                            </span>
</div>
<div className="flex items-center text-body-md text-on-surface">5 patients</div>
<div className="flex items-center justify-end text-body-md font-medium text-tertiary">12m</div>
</div>
</div>
</div>
</section>

    </div>
  );
}