import React from 'react';

export function GridTable({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
    </div>
  );
}

export function GridTableHeader({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`grid grid-cols-12 gap-4 px-4 pb-2 border-b border-surface-container font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest ${className}`}>
      {children}
    </div>
  );
}

export function GridTableRow({ children, className = "", onClick, title }: { children: React.ReactNode, className?: string, onClick?: (e?: any) => void, title?: string }) {
  return (
    <div 
      onClick={onClick}
      title={title}
      className={`group grid grid-cols-12 gap-4 items-center p-4 rounded-xl hover:bg-slate-50/80 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function GridTableCell({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
