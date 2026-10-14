export default function RevenueReport() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
{/* Header & Filters */}
<header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 w-full">
<div className="space-y-2">
<h2 className="text-display-lg font-display font-light text-on-surface tracking-tight leading-none">Financial Analytics</h2>
<p className="text-body-lg text-on-surface-variant max-w-2xl">Revenue and billing performance overview for the current fiscal quarter.</p>
</div>
<div className="flex flex-wrap items-center gap-3 glass-panel p-2 rounded-xl border border-outline-variant/10 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
<select className="bg-transparent border-none text-on-surface font-medium focus:ring-0 cursor-pointer pl-4 pr-8 py-2">
<option>Q3 2026 (Current)</option>
<option>Q2 2026</option>
<option>Q1 2026</option>
<option>YTD</option>
</select>
<div className="h-6 w-px bg-outline-variant/30"></div>
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]">filter_list</span>
<span className="font-medium text-sm">Filters</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 primary-gradient text-on-primary rounded-lg hover:shadow-lg transition-all">
<span className="material-symbols-outlined text-[20px]">download</span>
<span className="font-medium text-sm">Export</span>
</button>
</div>
</header>
{/* KPI Grid */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Gross Revenue */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[64px] text-primary">account_balance_wallet</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]">payments</span>
<h3 className="font-label text-sm uppercase tracking-wider font-semibold">Gross Revenue</h3>
</div>
<div className="flex flex-col">
<span className="text-headline-md font-display font-medium text-on-surface">$1,245,000</span>
<div className="flex items-center gap-1 text-secondary mt-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="text-sm font-medium">+14.2% vs last quarter</span>
</div>
</div>
</div>
{/* Average Ticket */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[64px] text-primary">receipt_long</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]">receipt</span>
<h3 className="font-label text-sm uppercase tracking-wider font-semibold">Avg Ticket</h3>
</div>
<div className="flex flex-col">
<span className="text-headline-md font-display font-medium text-on-surface">$485</span>
<div className="flex items-center gap-1 text-secondary mt-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="text-sm font-medium">+5.1% vs last quarter</span>
</div>
</div>
</div>
{/* Billing Growth */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[64px] text-primary">auto_graph</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]">show_chart</span>
<h3 className="font-label text-sm uppercase tracking-wider font-semibold">Billing Growth</h3>
</div>
<div className="flex flex-col">
<span className="text-headline-md font-display font-medium text-on-surface">22.4%</span>
<div className="flex items-center gap-1 text-secondary mt-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="text-sm font-medium">+2.3% vs last quarter</span>
</div>
</div>
</div>
{/* Outstanding */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[64px] text-error">warning</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-error text-[20px]">pending_actions</span>
<h3 className="font-label text-sm uppercase tracking-wider font-semibold">Outstanding</h3>
</div>
<div className="flex flex-col">
<span className="text-headline-md font-display font-medium text-on-surface">$84,500</span>
<div className="flex items-center gap-1 text-error mt-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="text-sm font-medium">+8.4% vs last quarter</span>
</div>
</div>
</div>
</section>
{/* Main Charts Area */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* Revenue Trend Line Chart */}
<div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.02)] flex flex-col min-h-[400px]">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="text-headline-sm font-display font-medium text-on-surface">Revenue Trend</h3>
<p className="text-label-sm text-on-surface-variant mt-1">Monthly gross vs net revenue.</p>
</div>
<button className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>
{/* Chart Placeholder - Simulated with CSS */}
<div className="flex-1 relative mt-4 border-l border-b border-outline-variant/30 flex items-end pt-10">
{/* Y Axis Labels */}
<div className="absolute left-[-45px] top-0 h-full flex flex-col justify-between text-xs text-on-surface-variant py-2">
<span>$500k</span>
<span>$375k</span>
<span>$250k</span>
<span>$125k</span>
<span>$0</span>
</div>
{/* Grid Lines */}
<div className="absolute w-full h-full flex flex-col justify-between">
<div className="w-full border-t border-outline-variant/10"></div>
<div className="w-full border-t border-outline-variant/10"></div>
<div className="w-full border-t border-outline-variant/10"></div>
<div className="w-full border-t border-outline-variant/10"></div>
<div className="w-full border-t-0"></div>
</div>
{/* Bars / Lines simulation */}
<div className="w-full h-full flex justify-around items-end px-4 z-10">
<div className="w-12 bg-primary/20 rounded-t-sm h-[40%] relative group">
<div className="absolute bottom-0 w-full bg-primary rounded-t-sm h-[80%]"></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">Oct: $200k</div>
</div>
<div className="w-12 bg-primary/20 rounded-t-sm h-[55%] relative group">
<div className="absolute bottom-0 w-full bg-primary rounded-t-sm h-[85%]"></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">Nov: $275k</div>
</div>
<div className="w-12 bg-primary/20 rounded-t-sm h-[45%] relative group">
<div className="absolute bottom-0 w-full bg-primary rounded-t-sm h-[70%]"></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">Dec: $225k</div>
</div>
<div className="w-12 bg-primary/20 rounded-t-sm h-[70%] relative group">
<div className="absolute bottom-0 w-full bg-primary rounded-t-sm h-[90%]"></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">Jan: $350k</div>
</div>
<div className="w-12 bg-primary/20 rounded-t-sm h-[85%] relative group">
<div className="absolute bottom-0 w-full bg-primary rounded-t-sm h-[85%]"></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">Feb: $425k</div>
</div>
<div className="w-12 bg-primary/20 rounded-t-sm h-[60%] relative group">
<div className="absolute bottom-0 w-full bg-primary rounded-t-sm h-[75%]"></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">Mar: $300k</div>
</div>
</div>
</div>
{/* X Axis Labels */}
<div className="flex justify-around items-center w-full px-4 mt-3 ml-[20px] text-xs text-on-surface-variant">
<span>Oct</span>
<span>Nov</span>
<span>Dec</span>
<span>Jan</span>
<span>Feb</span>
<span>Mar</span>
</div>
<div className="flex justify-center gap-6 mt-6 text-sm">
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div><span>Net Revenue</span></div>
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary/20"></div><span>Gross Revenue</span></div>
</div>
</div>
{/* Revenue by Department Donut & Payment Methods */}
<div className="flex flex-col gap-8">
{/* Donut Chart Card */}
<div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.02)] flex-1 flex flex-col">
<h3 className="text-headline-sm font-display font-medium text-on-surface mb-6">Revenue by Dept</h3>
<div className="flex-1 flex flex-col items-center justify-center relative">
{/* CSS Donut Chart Simulation */}
<div className="w-48 h-48 rounded-full border-[24px] border-surface-container relative" style={{ borderTopColor: "var(--color-primary)", borderRightColor: "var(--color-secondary)", borderBottomColor: "var(--color-tertiary)", transform: "rotate(-45deg)" }}>
<div className="absolute inset-0 m-auto w-full h-full flex flex-col items-center justify-center" style={{ transform: "rotate(45deg)" }}>
<span className="text-2xl font-bold text-on-surface">4</span>
<span className="text-xs text-on-surface-variant">Depts</span>
</div>
</div>
</div>
<div className="mt-6 space-y-3">
<div className="flex justify-between items-center text-sm">
<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div><span className="text-on-surface">Cardiology</span></div>
<span className="font-medium">45%</span>
</div>
<div className="flex justify-between items-center text-sm">
<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div><span className="text-on-surface">Neurology</span></div>
<span className="font-medium">30%</span>
</div>
<div className="flex justify-between items-center text-sm">
<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div><span className="text-on-surface">Pediatrics</span></div>
<span className="font-medium">15%</span>
</div>
<div className="flex justify-between items-center text-sm">
<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-surface-container"></div><span className="text-on-surface">Other</span></div>
<span className="font-medium">10%</span>
</div>
</div>
</div>
</div>
</section>
{/* Payment Methods List */}
<section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.02)] overflow-hidden">
<div className="p-6 md:p-8 flex justify-between items-center border-b border-outline-variant/10">
<div>
<h3 className="text-headline-sm font-display font-medium text-on-surface">Payment Methods Distribution</h3>
<p className="text-label-sm text-on-surface-variant mt-1">Breakdown of transaction volume by payment type.</p>
</div>
<button className="text-primary hover:underline font-medium text-sm">View All</button>
</div>
<div className="p-6 md:p-8">
<div className="space-y-6">
{/* Item 1 */}
<div className="flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined">credit_card</span>
</div>
<div>
<h4 className="font-medium text-on-surface text-base">Credit/Debit Card</h4>
<p className="text-sm text-on-surface-variant">Visa, Mastercard, Amex</p>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-right hidden sm:block">
<div className="text-sm font-medium text-on-surface">62%</div>
<div className="text-xs text-on-surface-variant">of total volume</div>
</div>
<div className="text-right">
<div className="text-base font-semibold text-on-surface">$771,900</div>
<div className="text-xs text-secondary flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 4.2%</div>
</div>
</div>
</div>
{/* Item 2 */}
<div className="flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined">account_balance</span>
</div>
<div>
<h4 className="font-medium text-on-surface text-base">Bank Transfer</h4>
<p className="text-sm text-on-surface-variant">Direct deposit, Wire</p>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-right hidden sm:block">
<div className="text-sm font-medium text-on-surface">28%</div>
<div className="text-xs text-on-surface-variant">of total volume</div>
</div>
<div className="text-right">
<div className="text-base font-semibold text-on-surface">$348,600</div>
<div className="text-xs text-secondary flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 1.8%</div>
</div>
</div>
</div>
{/* Item 3 */}
<div className="flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined">payments</span>
</div>
<div>
<h4 className="font-medium text-on-surface text-base">Cash</h4>
<p className="text-sm text-on-surface-variant">In-clinic payments</p>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-right hidden sm:block">
<div className="text-sm font-medium text-on-surface">10%</div>
<div className="text-xs text-on-surface-variant">of total volume</div>
</div>
<div className="text-right">
<div className="text-base font-semibold text-on-surface">$124,500</div>
<div className="text-xs text-error flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[12px]">arrow_downward</span> 0.5%</div>
</div>
</div>
</div>
</div>
</div>
</section>

    </div>
  );
}