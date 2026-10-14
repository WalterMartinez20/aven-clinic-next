"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isForm: boolean;
  handleResetDemo: () => void;
}

export default function Header({ isForm, handleResetDemo }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-[#f7f9fb] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)] h-20 fixed top-0 left-64 right-0 z-40 flex items-center justify-center transition-all duration-300">
      <div className="w-full max-w-max-width px-container-padding flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isForm && (
            <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline bg-surface hover:bg-surface-container text-on-surface-variant hover:text-primary transition-all shadow-sm cursor-pointer" title="Go Back">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="font-metadata text-xs uppercase tracking-widest">Back</span>
            </button>
          )}
          <div className="flex items-center bg-surface-container-lowest rounded-full px-6 py-3 w-96 group focus-within:bg-surface-container-low transition-colors duration-300">
            <span className="material-symbols-outlined text-outline group-focus-within:text-primary">search</span>
            <input className="bg-transparent border-none focus:ring-0 w-full font-body-md text-body-md text-on-surface placeholder:text-outline-variant ml-3 outline-none" placeholder="Search patients, records..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={handleResetDemo} className="flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" title="Reset Demo Data">
            <span className="material-symbols-outlined text-[24px]">refresh</span>
          </button>
          <button className="flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
        </div>
      </div>
    </header>
  );
}
