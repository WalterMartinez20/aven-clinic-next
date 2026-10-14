export default function SummaryReport() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
{/* Dashboard Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div className="flex flex-col gap-1">
<h1 className="text-slate-900 dark:text-slate-100 text-3xl font-extrabold leading-tight tracking-tight">Análisis y Estadísticas</h1>
<p className="text-slate-500 dark:text-slate-400 text-base">Resumen operativo y clínico del periodo: <span className="font-semibold text-primary">Últimos 30 días</span></p>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
<span className="material-symbols-outlined text-lg">calendar_month</span>
                    Mes Actual
                </button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20">
<span className="material-symbols-outlined text-lg">download</span>
                    Exportar Reporte
                </button>
</div>
</div>
{/* KPI Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
<div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">schedule</span>
<span className="text-red-500 text-xs font-bold flex items-center">-2% <span className="material-symbols-outlined text-xs">arrow_downward</span></span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">Promedio de Espera</p>
<p className="text-slate-900 dark:text-slate-100 text-2xl font-bold">15 min</p>
</div>
<div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">group</span>
<span className="text-green-500 text-xs font-bold flex items-center">+12% <span className="material-symbols-outlined text-xs">arrow_upward</span></span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">Pacientes del Mes</p>
<p className="text-slate-900 dark:text-slate-100 text-2xl font-bold">1,240</p>
</div>
<div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">check_circle</span>
<span className="text-green-500 text-xs font-bold flex items-center">+1% <span className="material-symbols-outlined text-xs">arrow_upward</span></span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">Tasa de Resolución</p>
<p className="text-slate-900 dark:text-slate-100 text-2xl font-bold">94%</p>
</div>
<div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">meeting_room</span>
<span className="text-green-500 text-xs font-bold flex items-center">+5% <span className="material-symbols-outlined text-xs">arrow_upward</span></span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">Ocupación de Box</p>
<p className="text-slate-900 dark:text-slate-100 text-2xl font-bold">82%</p>
</div>
</div>
{/* Main Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
{/* Patient Volume Chart (Area Chart Mockup) */}
<div className="lg:col-span-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex justify-between items-center mb-6">
<h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Volumen de Pacientes (Últimos 30 días)</h3>
<select className="bg-slate-50 dark:bg-slate-800 border-none text-xs rounded-lg focus:ring-primary py-1 pl-2 pr-8">
<option>Diario</option>
<option>Semanal</option>
</select>
</div>
<div className="relative h-64 w-full flex items-end gap-2 px-2">
{/* Fake Area Chart Visual */}
<div className="absolute inset-0 flex flex-col justify-between py-2 text-[10px] text-slate-400">
<div className="border-b border-slate-100 dark:border-slate-800 w-full pb-1">100</div>
<div className="border-b border-slate-100 dark:border-slate-800 w-full pb-1">75</div>
<div className="border-b border-slate-100 dark:border-slate-800 w-full pb-1">50</div>
<div className="border-b border-slate-100 dark:border-slate-800 w-full pb-1">25</div>
<div className="w-full">0</div>
</div>
{/* Area representation */}
<div className="relative w-full h-full pt-6">
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
<path d="M0,40 L0,30 C10,25 20,35 30,20 C40,5 50,15 60,10 C70,5 80,15 90,8 L100,5 L100,40 Z" fill="url(#gradient)" opacity="0.2" />
<path d="M0,30 C10,25 20,35 30,20 C40,5 50,15 60,10 C70,5 80,15 90,8 L100,5" fill="none" stroke="#00b2d6" strokeWidth="2" />
<defs>
<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#00b2d6"></stop>
<stop offset="100%" stopColor="#00b2d6" stopOpacity="0"></stop>
</linearGradient>
</defs>
</svg>
</div>
</div>
<div className="flex justify-between mt-4 px-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
<span>Semana 1</span>
<span>Semana 2</span>
<span>Semana 3</span>
<span>Semana 4</span>
</div>
</div>
{/* Triage Distribution (Donut Chart Mockup) */}
<div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-6">Distribución por Triage</h3>
<div className="flex flex-col items-center">
<div className="relative size-48 mb-6">
<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
{/* Background Circle */}
<circle cx="18" cy="18" fill="none" r="16" stroke="#f1f5f9" strokeWidth="4" />
{/* Verde (Low) 60% */}
<circle cx="18" cy="18" fill="none" r="16" stroke="#22c55e" strokeDasharray="60, 100" strokeDashoffset="0" strokeWidth="4" />
{/* Amarillo (Mid) 25% */}
<circle cx="18" cy="18" fill="none" r="16" stroke="#eab308" strokeDasharray="25, 100" strokeDashoffset="-60" strokeWidth="4" />
{/* Rojo (High) 15% */}
<circle cx="18" cy="18" fill="none" r="16" stroke="#ef4444" strokeDasharray="15, 100" strokeDashoffset="-85" strokeWidth="4" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-2xl font-bold text-slate-800 dark:text-slate-100">1,240</span>
<span className="text-[10px] text-slate-400 uppercase">Total</span>
</div>
</div>
<div className="w-full space-y-3">
<div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="size-3 rounded-full bg-green-500"></span>
<span className="text-sm font-medium">Verde (Baja)</span>
</div>
<span className="text-sm font-bold">60%</span>
</div>
<div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="size-3 rounded-full bg-yellow-500"></span>
<span className="text-sm font-medium">Amarillo (Media)</span>
</div>
<span className="text-sm font-bold">25%</span>
</div>
<div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="size-3 rounded-full bg-red-500"></span>
<span className="text-sm font-medium">Rojo (Urgencia)</span>
</div>
<span className="text-sm font-bold">15%</span>
</div>
</div>
</div>
</div>
</div>
{/* Secondary Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
{/* Patients per Specialty (Bar Chart Mockup) */}
<div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-6">Pacientes por Especialidad</h3>
<div className="space-y-4">
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium">Pediatría</span>
<span className="text-slate-500">320 pacientes</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium">Cardiología</span>
<span className="text-slate-500">210 pacientes</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium">Ginecología</span>
<span className="text-slate-500">185 pacientes</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "55%" }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium">Traumatología</span>
<span className="text-slate-500">140 pacientes</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
</div>
</div>
</div>
</div>
{/* Top Motivos de Consulta (Table/List) */}
<div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-6">Top Motivos de Consulta</h3>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
<th className="pb-3 font-bold">Motivo</th>
<th className="pb-3 font-bold">Frecuencia</th>
<th className="pb-3 font-bold text-right">Tendencia</th>
</tr>
</thead>
<tbody className="text-sm">
<tr className="border-b border-slate-50 dark:border-slate-800/50">
<td className="py-4 font-semibold">Control de Crecimiento</td>
<td className="py-4">245 visitas</td>
<td className="py-4 text-right">
<span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md text-xs font-bold">+5%</span>
</td>
</tr>
<tr className="border-b border-slate-50 dark:border-slate-800/50">
<td className="py-4 font-semibold">Infección Respiratoria</td>
<td className="py-4">192 visitas</td>
<td className="py-4 text-right">
<span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-md text-xs font-bold">+12%</span>
</td>
</tr>
<tr className="border-b border-slate-50 dark:border-slate-800/50">
<td className="py-4 font-semibold">Hipertensión Arterial</td>
<td className="py-4">156 visitas</td>
<td className="py-4 text-right">
<span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 px-2 py-1 rounded-md text-xs font-bold">Estable</span>
</td>
</tr>
<tr>
<td className="py-4 font-semibold">Dolor Lumbar Agudo</td>
<td className="py-4">98 visitas</td>
<td className="py-4 text-right">
<span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md text-xs font-bold">-3%</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

    </div>
  );
}