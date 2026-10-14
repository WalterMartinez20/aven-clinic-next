import React from 'react';

interface GlobalDateSelectorProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function GlobalDateSelector({ value, onChange, className = "" }: GlobalDateSelectorProps) {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none font-medium text-sm px-4 py-2.5 pr-10 rounded-xl shadow-sm hover:border-primary transition-all cursor-pointer outline-none ${className || "bg-surface-container-lowest text-on-surface border border-surface-container-low/50"}`}
      >
        <optgroup label="Specific Periods">
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Week 1 (This Month)">Week 1 (This Month)</option>
          <option value="Week 2 (This Month)">Week 2 (This Month)</option>
          <option value="Week 3 (This Month)">Week 3 (This Month)</option>
          <option value="Week 4 (This Month)">Week 4 (This Month)</option>
        </optgroup>
        <optgroup label="General Periods">
          <option value="This Week">This Week</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="This Month">This Month</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Current Quarter (Q3)">Current Quarter (Q3)</option>
          <option value="YTD">YTD</option>
          <option value="All Time">All Time</option>
        </optgroup>
      </select>
      <span className="material-symbols-outlined text-outline pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl">expand_more</span>
    </div>
  );
}
