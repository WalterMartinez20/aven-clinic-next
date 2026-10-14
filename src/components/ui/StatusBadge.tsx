import React from "react";

export type UrgencyLevel = "Critical" | "CRITICAL" | "Urgent" | "URGENT" | "Normal" | "NORMAL";
export type StatusLevel = "Confirmed" | "Pending" | "Completed" | "Canceled" | "Active" | "Inactive" | "On Leave" | string;

function BasePillBadge({ text, colorClass, dotColor, pulse = false }: { text: string, colorClass: string, dotColor: string, pulse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-metadata text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-2xs ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${pulse ? 'animate-pulse' : ''}`}></span>
      {text}
    </span>
  );
}

interface UrgencyBadgeProps {
  level: UrgencyLevel | string;
}

export function UrgencyBadge({ level }: UrgencyBadgeProps) {
  const normalizedLevel = level.toUpperCase();
  
  if (normalizedLevel === 'CRITICAL') {
    return <BasePillBadge text="CRITICAL" colorClass="bg-[#fff1f2] text-[#be123c] border-[#fecdd3]" dotColor="bg-[#f43f5e]" pulse />;
  }
  
  if (normalizedLevel === 'URGENT') {
    return <BasePillBadge text="URGENT" colorClass="bg-[#fffbeb] text-[#b45309] border-[#fde68a]" dotColor="bg-[#f59e0b]" />;
  }

  // Default to Normal
  return <BasePillBadge text="NORMAL" colorClass="bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]" dotColor="bg-[#10b981]" />;
}

interface StatusDotBadgeProps {
  status: StatusLevel;
}

export function StatusDotBadge({ status }: StatusDotBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  
  let colorClass = "bg-[#f8fafc] text-[#334155] border-[#e2e8f0]";
  let dotColor = "bg-[#64748b]";
  
  if (normalizedStatus === 'confirmed' || normalizedStatus === 'active') {
    colorClass = "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]";
    dotColor = "bg-[#10b981]";
  } else if (normalizedStatus === 'pending' || normalizedStatus === 'on leave' || normalizedStatus === 'in waiting room') {
    colorClass = "bg-[#fffbeb] text-[#b45309] border-[#fde68a]";
    dotColor = "bg-[#f59e0b]";
  } else if (normalizedStatus === 'completed' || normalizedStatus === 'paid') {
    colorClass = "bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]";
    dotColor = "bg-[#0ea5e9]";
  } else if (normalizedStatus === 'canceled' || normalizedStatus === 'inactive') {
    colorClass = "bg-[#fff1f2] text-[#be123c] border-[#fecdd3]";
    dotColor = "bg-[#f43f5e]";
  } else if (normalizedStatus === 'in consult') {
    colorClass = "bg-[#fdf4ff] text-[#a21caf] border-[#fbcfe8]";
    dotColor = "bg-[#d946ef]";
  }

  return <BasePillBadge text={status} colorClass={colorClass} dotColor={dotColor} />;
}

// Keep export for backward compatibility during migration
export const StatusPillBadge = StatusDotBadge;
// Trigger tailwind rebuild
