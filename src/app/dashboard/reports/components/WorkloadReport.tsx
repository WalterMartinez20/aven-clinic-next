export default function WorkloadReport() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
{/* Header Section */}
<header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<h1 className="text-[3.5rem] leading-none tracking-[-0.02em] font-display text-primary mb-2">Operations Overview</h1>
<p className="text-on-surface-variant font-body text-body-md max-w-2xl">Real-time telemetry on staffing utilization, patient throughput, and facility load to optimize clinical delivery.</p>
</div>
<div className="flex items-center gap-3">
<span className="text-label-sm text-on-surface-variant font-medium">Last updated: Just now</span>
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-primary rounded-lg font-medium text-sm hover:bg-surface-container transition-colors ambient-shadow">
<span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                    Export Data
                </button>
</div>
</header>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
{/* Key Metrics Cards (Row 1) */}
{/* Metric 1: Bed Occupancy */}
<div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow flex flex-col justify-between group">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="bed">bed</span>
</div>
<span className="flex items-center text-secondary text-label-sm font-medium bg-secondary/10 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_down">trending_down</span> -2%
                    </span>
</div>
<div>
<p className="text-label-md text-on-surface-variant mb-1">Bed Occupancy</p>
<h2 className="text-headline-md font-display font-medium text-on-surface">87.4%</h2>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-4 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "87.4%" }}></div>
</div>
</div>
{/* Metric 2: Staff Utilization */}
<div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow flex flex-col justify-between group">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
</div>
<span className="flex items-center text-error text-label-sm font-medium bg-error/10 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_up">trending_up</span> +5%
                    </span>
</div>
<div>
<p className="text-label-md text-on-surface-variant mb-1">Staff Utilization</p>
<h2 className="text-headline-md font-display font-medium text-on-surface">94.1%</h2>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-4 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "94.1%" }}></div>
</div>
</div>
{/* Metric 3: Avg Consult Time */}
<div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow flex flex-col justify-between group">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="schedule">schedule</span>
</div>
<span className="flex items-center text-secondary text-label-sm font-medium bg-secondary/10 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_down">trending_down</span> -1.2m
                    </span>
</div>
<div>
<p className="text-label-md text-on-surface-variant mb-1">Avg Consult Time</p>
<h2 className="text-headline-md font-display font-medium text-on-surface">14.3m</h2>
</div>
<div className="mt-4 text-label-sm text-on-surface-variant">Target: 15.0m</div>
</div>
{/* Metric 4: Patient Throughput */}
<div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow flex flex-col justify-between group">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="directions_walk">directions_walk</span>
</div>
<span className="flex items-center text-secondary text-label-sm font-medium bg-secondary/10 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_up">trending_up</span> +12/hr
                    </span>
</div>
<div>
<p className="text-label-md text-on-surface-variant mb-1">Patient Throughput</p>
<h2 className="text-headline-md font-display font-medium text-on-surface">142/hr</h2>
</div>
<div className="mt-4 text-label-sm text-on-surface-variant">Peak: 165/hr (10:00 AM)</div>
</div>
{/* Charts Row 2 */}
{/* Workload per Shift (Bar Chart) */}
<div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 ambient-shadow">
<div className="flex justify-between items-center mb-6">
<h3 className="text-headline-sm font-display font-medium text-on-surface">Workload per Shift</h3>
<button className="text-primary hover:bg-surface p-1 rounded transition-colors">
<span className="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
</button>
</div>
{/* Pure CSS/HTML Bar Chart Representation */}
<div className="h-64 flex items-end gap-4 mt-8 relative border-b border-surface-container pb-2">
{/* Y Axis Labels */}
<div className="absolute left-0 top-0 h-full flex flex-col justify-between text-label-sm text-outline pb-2 -ml-2">
<span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
</div>
{/* Bars Space */}
<div className="flex-grow flex items-end justify-around h-full pl-8">
{/* Bar Item */}
<div className="flex flex-col items-center gap-2 group cursor-pointer w-full">
<div className="w-12 bg-gradient-to-t from-primary to-primary-container rounded-t-md transition-all duration-300 group-hover:opacity-80" style={{ height: "65%" }}></div>
<span className="text-label-sm text-on-surface-variant">Morning</span>
</div>
<div className="flex flex-col items-center gap-2 group cursor-pointer w-full">
<div className="w-12 bg-gradient-to-t from-tertiary to-tertiary-container rounded-t-md transition-all duration-300 group-hover:opacity-80" style={{ height: "90%" }}></div>
<span className="text-label-sm text-on-surface-variant">Afternoon</span>
</div>
<div className="flex flex-col items-center gap-2 group cursor-pointer w-full">
<div className="w-12 bg-gradient-to-t from-primary to-primary-container rounded-t-md transition-all duration-300 group-hover:opacity-80 opacity-60" style={{ height: "45%" }}></div>
<span className="text-label-sm text-on-surface-variant">Evening</span>
</div>
<div className="flex flex-col items-center gap-2 group cursor-pointer w-full">
<div className="w-12 bg-gradient-to-t from-primary to-primary-container rounded-t-md transition-all duration-300 group-hover:opacity-80 opacity-40" style={{ height: "30%" }}></div>
<span className="text-label-sm text-on-surface-variant">Night</span>
</div>
</div>
</div>
</div>
{/* Staff Availability Heatmap */}
<div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 ambient-shadow">
<div className="flex justify-between items-center mb-6">
<h3 className="text-headline-sm font-display font-medium text-on-surface">Staff Availability</h3>
<div className="flex items-center gap-2 text-label-sm">
<span className="w-3 h-3 rounded-sm bg-surface-container-high"></span> Low
                        <span className="w-3 h-3 rounded-sm bg-primary/50 ml-2"></span> Med
                        <span className="w-3 h-3 rounded-sm bg-primary ml-2"></span> High
                    </div>
</div>
{/* Heatmap Grid */}
<div className="w-full mt-4">
<div className="grid grid-cols-8 gap-2 text-label-sm text-outline mb-2 text-center">
<div></div> {/* Corner */}
<div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
</div>
<div className="space-y-2">
{/* Ward A */}
<div className="grid grid-cols-8 gap-2 items-center">
<div className="text-label-sm text-on-surface-variant text-right pr-2">ER</div>
<div className="h-8 rounded bg-primary w-full"></div>
<div className="h-8 rounded bg-primary/80 w-full"></div>
<div className="h-8 rounded bg-primary w-full"></div>
<div className="h-8 rounded bg-primary/40 w-full"></div>
<div className="h-8 rounded bg-primary/20 w-full"></div>
<div className="h-8 rounded bg-surface-container-high w-full"></div>
<div className="h-8 rounded bg-surface-container-high w-full"></div>
</div>
{/* Ward B */}
<div className="grid grid-cols-8 gap-2 items-center">
<div className="text-label-sm text-on-surface-variant text-right pr-2">ICU</div>
<div className="h-8 rounded bg-primary/60 w-full"></div>
<div className="h-8 rounded bg-primary/90 w-full"></div>
<div className="h-8 rounded bg-primary w-full"></div>
<div className="h-8 rounded bg-primary w-full"></div>
<div className="h-8 rounded bg-primary/70 w-full"></div>
<div className="h-8 rounded bg-primary/30 w-full"></div>
<div className="h-8 rounded bg-primary/20 w-full"></div>
</div>
{/* Ward C */}
<div className="grid grid-cols-8 gap-2 items-center">
<div className="text-label-sm text-on-surface-variant text-right pr-2">Pediatrics</div>
<div className="h-8 rounded bg-primary/40 w-full"></div>
<div className="h-8 rounded bg-primary/50 w-full"></div>
<div className="h-8 rounded bg-primary/30 w-full"></div>
<div className="h-8 rounded bg-primary/60 w-full"></div>
<div className="h-8 rounded bg-primary/80 w-full"></div>
<div className="h-8 rounded bg-primary/40 w-full"></div>
<div className="h-8 rounded bg-primary/40 w-full"></div>
</div>
</div>
</div>
</div>
{/* Departmental Efficiency (Full Width below) */}
<div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 ambient-shadow mt-2">
<div className="flex justify-between items-center mb-6">
<h3 className="text-headline-sm font-display font-medium text-on-surface">Departmental Efficiency Index</h3>
<span className="text-label-sm text-on-surface-variant bg-surface px-3 py-1 rounded-full">Target: &gt;85%</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Dept 1 */}
<div className="space-y-2">
<div className="flex justify-between text-label-md">
<span className="text-on-surface-variant">Cardiology</span>
<span className="text-primary font-medium">92%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "92%" }}></div>
</div>
</div>
{/* Dept 2 */}
<div className="space-y-2">
<div className="flex justify-between text-label-md">
<span className="text-on-surface-variant">Neurology</span>
<span className="text-primary font-medium">88%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full opacity-80" style={{ width: "88%" }}></div>
</div>
</div>
{/* Dept 3 */}
<div className="space-y-2">
<div className="flex justify-between text-label-md">
<span className="text-on-surface-variant">Orthopedics</span>
<span className="text-tertiary font-medium">76%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "76%" }}></div>
</div>
</div>
</div>
</div>
</div>

    </div>
  );
}