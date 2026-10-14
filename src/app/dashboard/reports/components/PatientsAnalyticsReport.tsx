export default function PatientsAnalyticsReport() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
{/* TopNavBar (Authority: JSON) */}
<header className="bg-surface/80 dark:bg-background/80 backdrop-blur-xl flex justify-between items-center w-full px-8 py-4 docked full-width top-0 sticky z-50">
<div className="flex items-center gap-6">
<div className="relative group">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 w-64 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search insights..." type="text" />
</div>
</div>
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">help</span>
</button>
<div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
<div className="flex items-center gap-3 cursor-pointer group">
<div className="text-right">
<p className="text-body-md font-bold text-on-surface leading-none">Dr. Alena Vance</p>
<p className="text-[11px] text-on-surface-variant uppercase font-semibold">Chief Administrator</p>
</div>
<img alt="User profile avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-container" data-alt="A professional portrait of a female doctor with dark hair tied back, wearing a crisp white medical lab coat over a professional blue blouse. The lighting is soft and clinical, set against a bright, airy medical office background in a high-key light mode style. The image conveys authority, expertise, and approachable clinical care within a premium healthcare environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoNmvx7y-0P7BByQTtKm7iL7zk5VDzSi6vFEhiwn7m5gADBER6dTDxmKwEio7XFEUe3FT6JeX3tpJXHS7Gqxh9ysDfPhWiT_CskZ2L_Yfoni61LV_KOl9Mfgga56coBkUxlb4eV9mr8xY1lAFtBX_J4bQMLen2BDDHFHy9yfJ1-GR6uk1EJh08b0cAOsxZNWpV-4zd7Vt1_sl2suD5Qky9lG13YPzpAaqNua5pt4zIsYTxLyeH_wEZoezN7JfaB2nVKLrQoX0nNMIb" />
</div>
</div>
</header>
{/* Main Content Canvas */}
<div className="p-8 max-w-7xl mx-auto space-y-8">
{/* Header & Filters */}
<section className="flex flex-col md:flex-row justify-between items-end gap-6">
<div>
<h2 className="font-display text-[40px] font-bold text-on-surface tracking-tight leading-tight">Patient Insights &amp; Demographics</h2>
<p className="text-on-surface-variant mt-2 font-medium">Real-time analytical overview of clinical population health metrics.</p>
</div>
<div className="flex gap-3 bg-surface-container-low p-2 rounded-2xl">
<div className="px-4 py-2 bg-surface-container-lowest rounded-xl shadow-sm cursor-pointer hover:bg-surface transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
<span className="text-sm font-semibold text-on-surface">Last 30 Days</span>
</div>
<div className="px-4 py-2 bg-surface-container-lowest rounded-xl shadow-sm cursor-pointer hover:bg-surface transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm">filter_list</span>
<span className="text-sm font-semibold text-on-surface">Department: Cardiology</span>
</div>
<div className="px-4 py-2 bg-primary text-white rounded-xl shadow-md cursor-pointer flex items-center gap-2">
<span className="material-symbols-outlined text-sm">download</span>
<span className="text-sm font-bold">Export PDF</span>
</div>
</div>
</section>
{/* KPI Cards Bento Grid */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Active Patients */}
<div className="bg-surface-container-lowest p-6 rounded-[24px] transition-all hover:translate-y-[-4px]">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
</div>
<span className="text-secondary text-sm font-bold bg-secondary-container/30 px-2 py-1 rounded-lg">+12.4%</span>
</div>
<p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">Active Patients</p>
<h3 className="text-[32px] font-bold text-on-surface mt-1">12,842</h3>
</div>
{/* New Registrations */}
<div className="bg-surface-container-lowest p-6 rounded-[24px] transition-all hover:translate-y-[-4px]">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
</div>
<span className="text-secondary text-sm font-bold bg-secondary-container/30 px-2 py-1 rounded-lg">+5.1%</span>
</div>
<p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">New Registrations (30d)</p>
<h3 className="text-[32px] font-bold text-on-surface mt-1">842</h3>
</div>
{/* Avg. Age */}
<div className="bg-surface-container-lowest p-6 rounded-[24px] transition-all hover:translate-y-[-4px]">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 rounded-2xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
</div>
<span className="text-on-surface-variant text-sm font-bold bg-surface-container px-2 py-1 rounded-lg">Stable</span>
</div>
<p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">Avg. Patient Age</p>
<h3 className="text-[32px] font-bold text-on-surface mt-1">42.5</h3>
</div>
{/* Satisfaction Score */}
<div className="bg-surface-container-lowest p-6 rounded-[24px] transition-all hover:translate-y-[-4px]">
<div className="flex items-center justify-between mb-4">
<div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-white">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
</div>
<span className="text-primary text-sm font-bold bg-primary-fixed px-2 py-1 rounded-lg">High</span>
</div>
<p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">Satisfaction Score</p>
<div className="flex items-baseline gap-1 mt-1">
<h3 className="text-[32px] font-bold text-on-surface">4.9</h3>
<span className="text-on-surface-variant font-bold">/ 5.0</span>
</div>
</div>
</section>
{/* Middle Section: Demographic Distribution & Clinical Outcomes */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* Age Groups Pie (Simplified SVG) */}
<div className="lg:col-span-1 bg-surface-container-lowest p-8 rounded-[32px] flex flex-col items-center">
<div className="w-full flex justify-between items-center mb-10">
<h4 className="font-bold text-lg text-on-surface">Age Distribution</h4>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_horiz</span>
</div>
<div className="relative w-48 h-48 mb-8">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<circle cx="18" cy="18" fill="transparent" r="16" stroke="#eceef0" strokeWidth="4" />
<circle cx="18" cy="18" fill="transparent" r="16" stroke="#00685f" strokeDasharray="35 100" strokeWidth="4" />
<circle cx="18" cy="18" fill="transparent" r="16" stroke="#008378" strokeDasharray="25 100" strokeDashoffset="-35" strokeWidth="4" />
<circle cx="18" cy="18" fill="transparent" r="16" stroke="#6bd8cb" strokeDasharray="20 100" strokeDashoffset="-60" strokeWidth="4" />
<circle cx="18" cy="18" fill="transparent" r="16" stroke="#006c49" strokeDasharray="20 100" strokeDashoffset="-80" strokeWidth="4" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-2xl font-bold text-primary">82%</span>
<span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-tighter">Engagement</span>
</div>
</div>
<div className="w-full space-y-3">
<div className="flex items-center justify-between text-sm">
<div className="flex items-center gap-2 font-semibold text-on-surface-variant">
<span className="w-3 h-3 rounded-full bg-primary"></span> 65+
                            </div>
<span className="font-bold">35%</span>
</div>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center gap-2 font-semibold text-on-surface-variant">
<span className="w-3 h-3 rounded-full bg-primary-container"></span> 46-65
                            </div>
<span className="font-bold">25%</span>
</div>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center gap-2 font-semibold text-on-surface-variant">
<span className="w-3 h-3 rounded-full bg-primary-fixed-dim"></span> 19-45
                            </div>
<span className="font-bold">20%</span>
</div>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center gap-2 font-semibold text-on-surface-variant">
<span className="w-3 h-3 rounded-full bg-secondary"></span> 0-18
                            </div>
<span className="font-bold">20%</span>
</div>
</div>
</div>
{/* Clinical Outcome Trends Line Chart */}
<div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-[32px]">
<div className="flex justify-between items-center mb-8">
<div>
<h4 className="font-bold text-lg text-on-surface">Clinical Outcome Trends</h4>
<p className="text-sm text-on-surface-variant">Recovery rates &amp; Stability (Last 6 Months)</p>
</div>
<div className="flex gap-2">
<span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Primary</span>
<span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">Control</span>
</div>
</div>
<div className="h-64 w-full flex items-end justify-between gap-1 relative overflow-hidden">
{/* Abstract Wave Representation */}
<div className="absolute bottom-0 left-0 w-full h-full opacity-10">
<svg className="w-full h-full preserve-3d" viewBox="0 0 1000 100">
<path d="M0 80 Q 150 20 300 80 T 600 80 T 900 20 L 1000 20 L 1000 100 L 0 100 Z" fill="#00685f" />
</svg>
</div>
{/* Bars for context/grid */}
<div className="flex-1 flex flex-col justify-end items-center gap-2 group h-full">
<div className="w-12 bg-primary/10 rounded-t-xl h-[45%] group-hover:bg-primary/20 transition-all"></div>
<span className="text-[10px] font-bold text-on-surface-variant">JAN</span>
</div>
<div className="flex-1 flex flex-col justify-end items-center gap-2 group h-full">
<div className="w-12 bg-primary/10 rounded-t-xl h-[65%] group-hover:bg-primary/20 transition-all"></div>
<span className="text-[10px] font-bold text-on-surface-variant">FEB</span>
</div>
<div className="flex-1 flex flex-col justify-end items-center gap-2 group h-full">
<div className="w-12 bg-primary/10 rounded-t-xl h-[55%] group-hover:bg-primary/20 transition-all"></div>
<span className="text-[10px] font-bold text-on-surface-variant">MAR</span>
</div>
<div className="flex-1 flex flex-col justify-end items-center gap-2 group h-full">
<div className="w-12 bg-primary/30 rounded-t-xl h-[85%] group-hover:bg-primary/40 transition-all border-b-4 border-primary"></div>
<span className="text-[10px] font-bold text-on-surface-variant">APR</span>
</div>
<div className="flex-1 flex flex-col justify-end items-center gap-2 group h-full">
<div className="w-12 bg-primary/10 rounded-t-xl h-[75%] group-hover:bg-primary/20 transition-all"></div>
<span className="text-[10px] font-bold text-on-surface-variant">MAY</span>
</div>
<div className="flex-1 flex flex-col justify-end items-center gap-2 group h-full">
<div className="w-12 bg-primary/10 rounded-t-xl h-[80%] group-hover:bg-primary/20 transition-all"></div>
<span className="text-[10px] font-bold text-on-surface-variant">JUN</span>
</div>
</div>
<div className="mt-8 pt-6 border-t border-surface-container flex justify-between items-center">
<div className="flex items-center gap-4">
<div className="text-center">
<p className="text-[10px] text-on-surface-variant font-bold uppercase">Avg Recovery</p>
<p className="text-lg font-bold text-on-surface">14.2 Days</p>
</div>
<div className="h-8 w-px bg-surface-container"></div>
<div className="text-center">
<p className="text-[10px] text-on-surface-variant font-bold uppercase">Stability Rate</p>
<p className="text-lg font-bold text-primary">94.8%</p>
</div>
</div>
<button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            View Detailed Analysis <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</section>
{/* Bottom Section: Top Diagnoses & Geography */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
{/* Top Diagnoses Horizontal Bar Chart */}
<div className="bg-surface-container-lowest p-8 rounded-[32px]">
<h4 className="font-bold text-lg text-on-surface mb-6">Top Diagnoses Prevalence</h4>
<div className="space-y-6">
<div className="space-y-2">
<div className="flex justify-between text-sm font-bold">
<span className="text-on-surface">Hypertension</span>
<span className="text-on-surface-variant">42.1%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{ width: "42.1%" }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm font-bold">
<span className="text-on-surface">Diabetes Type II</span>
<span className="text-on-surface-variant">28.5%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{ width: "28.5%" }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm font-bold">
<span className="text-on-surface">Upper Respiratory Infection</span>
<span className="text-on-surface-variant">15.2%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{ width: "15.2%" }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm font-bold">
<span className="text-on-surface">Osteoarthritis</span>
<span className="text-on-surface-variant">9.8%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-fixed-dim rounded-full" style={{ width: "9.8%" }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm font-bold">
<span className="text-on-surface">Asthma</span>
<span className="text-on-surface-variant">4.4%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-surface-container-highest rounded-full" style={{ width: "4.4%" }}></div>
</div>
</div>
</div>
</div>
{/* Geography / District Distribution */}
<div className="bg-surface-container-lowest p-8 rounded-[32px] overflow-hidden">
<div className="flex justify-between items-center mb-6">
<h4 className="font-bold text-lg text-on-surface">Patient Geography</h4>
<div className="flex items-center gap-1 text-on-surface-variant font-bold text-xs uppercase tracking-widest">
<span className="material-symbols-outlined text-sm">location_on</span> District Density
                        </div>
</div>
<div className="grid grid-cols-2 gap-4 h-[280px]">
<div className="relative rounded-2xl overflow-hidden bg-surface-container-low group">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A stylized, minimalist map illustration showing a modern city grid with glowing teal markers indicating high population density. The visual style is high-end medical tech, using the Aura Health teal and blue-gray palette. Soft atmospheric lighting illuminates the map, creating a professional dashboard heatmap feel for clinical demographic analysis." data-location="San Francisco" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVx-Jp6yo5yA9T3pMybcbqiWeTI4bnhu-iwXP09vL-s2AIb_o7hTstvIo1UW7PQ5aozK4MXdxtuzlze6z2hle2JN6iqEUIsK70zgmWrceLYxty_Ka8OJb2jlwUoZK4s-whDY5SUliL-f-p84YXgZUYTqK6xneaZglxTro81OFeh09Wz-7gxHascCV2LrAeShmg3CQjccuts8bHVGot5_11leHYWIhsKexKkK4LVACGT5opfEI_1AKWljxpxYgUNJT8klUFHgFiG2ed" />
<div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent"></div>
<div className="absolute bottom-4 left-4 text-white">
<p className="text-xs font-bold uppercase tracking-widest opacity-80">Highest Density</p>
<p className="text-lg font-bold">West District</p>
</div>
</div>
<div className="space-y-3">
<div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-primary">
<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">West District</p>
<p className="text-xl font-bold text-on-surface">4,281 Patients</p>
<p className="text-[10px] text-primary font-bold mt-1">+4.2% Growth</p>
</div>
<div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-primary-container">
<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Central District</p>
<p className="text-xl font-bold text-on-surface">3,110 Patients</p>
<p className="text-[10px] text-primary font-bold mt-1">+1.8% Growth</p>
</div>
<div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-secondary">
<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">East District</p>
<p className="text-xl font-bold text-on-surface">2,504 Patients</p>
<p className="text-[10px] text-secondary font-bold mt-1">-0.5% Flux</p>
</div>
</div>
</div>
</div>
</section>
</div>

    </div>
  );
}