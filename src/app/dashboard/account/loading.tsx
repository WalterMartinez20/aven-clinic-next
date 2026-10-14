import React from "react";

export default function AccountLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Navigation Breadcrumb Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Back button skeleton */}
          <div className="w-10 h-10 rounded-xl bg-slate-100 animate-shimmer"></div>
          {/* Path text skeleton */}
          <div className="w-48 h-5 bg-slate-100 rounded-lg animate-shimmer ml-2"></div>
        </div>
        {/* Status badge skeleton */}
        <div className="w-36 h-9 rounded-full bg-slate-100 animate-shimmer"></div>
      </div>

      {/* Bento Layout Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Reused Profile Card Skeleton */}
        <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-8 border border-white flex flex-col items-center shadow-glass">
          {/* Avatar Skeleton */}
          <div className="w-32 h-32 rounded-[2rem] bg-slate-150 animate-shimmer mb-6 mt-4"></div>
          {/* Name Skeleton */}
          <div className="w-48 h-7 bg-slate-150 rounded-xl animate-shimmer mb-3"></div>
          {/* Role Skeleton */}
          <div className="w-36 h-4 bg-slate-100 rounded-lg animate-shimmer mb-6"></div>
          
          {/* Badges Row */}
          <div className="flex gap-2 justify-center mb-8 w-full">
            <div className="w-24 h-7 bg-slate-100 rounded-xl animate-shimmer"></div>
            <div className="w-20 h-7 bg-slate-100 rounded-xl animate-shimmer"></div>
          </div>

          {/* Details Row Skeleton */}
          <div className="w-full border-t border-slate-100 pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-20 h-4 bg-slate-100 rounded animate-shimmer"></div>
              <div className="w-36 h-4 bg-slate-150 rounded animate-shimmer"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 bg-slate-100 rounded animate-shimmer"></div>
              <div className="w-40 h-4 bg-slate-150 rounded animate-shimmer"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-16 h-4 bg-slate-100 rounded animate-shimmer"></div>
              <div className="w-32 h-4 bg-slate-150 rounded animate-shimmer"></div>
            </div>
          </div>

          {/* Bio Skeleton */}
          <div className="w-full border-t border-slate-100 mt-6 pt-6 text-left">
            <div className="w-24 h-3 bg-slate-100 rounded mb-3 animate-shimmer"></div>
            <div className="w-full h-16 bg-slate-50 rounded-2xl animate-shimmer border border-slate-100/50"></div>
          </div>
        </div>

        {/* Right Column: Shift Manager + Form Skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Shift Clock Card Skeleton */}
          <div className="bg-gradient-to-br from-slate-200 to-slate-100 rounded-[2.5rem] p-8 text-white relative min-h-[300px] flex flex-col justify-between overflow-hidden shadow-glass border border-white/10 animate-shimmer">
            <div>
              <div className="w-32 h-4 bg-white/20 rounded mb-4"></div>
              <div className="w-56 h-14 bg-white/25 rounded-2xl mb-8"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-20 bg-white/10 rounded-2xl border border-white/5"></div>
                <div className="h-20 bg-white/10 rounded-2xl border border-white/5"></div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10 mt-6">
              <div className="flex-1 h-14 bg-white/20 rounded-2xl"></div>
              <div className="w-36 h-14 bg-white/15 rounded-2xl"></div>
            </div>
          </div>

          {/* Profile Form Card Skeleton */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-glass border border-white space-y-6">
            <div className="flex gap-3 mb-6 items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 animate-shimmer"></div>
              <div>
                <div className="w-48 h-5 bg-slate-150 rounded-lg animate-shimmer mb-2"></div>
                <div className="w-72 h-3.5 bg-slate-100 rounded animate-shimmer"></div>
              </div>
            </div>

            {/* Inputs Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="w-20 h-4 bg-slate-100 rounded animate-shimmer"></div>
                <div className="w-full h-12 bg-slate-50 border border-slate-200/40 rounded-2xl animate-shimmer"></div>
              </div>
              <div className="space-y-2">
                <div className="w-24 h-4 bg-slate-100 rounded animate-shimmer"></div>
                <div className="w-full h-12 bg-slate-50 border border-slate-200/40 rounded-2xl animate-shimmer"></div>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <div className="w-32 h-4 bg-slate-100 rounded animate-shimmer"></div>
                <div className="w-full h-12 bg-slate-50 border border-slate-200/40 rounded-2xl animate-shimmer"></div>
              </div>
            </div>

            {/* Password section skeleton */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="w-48 h-5 bg-slate-150 rounded animate-shimmer"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="w-full h-12 bg-slate-50 border border-slate-200/40 rounded-2xl animate-shimmer"></div>
                <div className="w-full h-12 bg-slate-50 border border-slate-200/40 rounded-2xl animate-shimmer"></div>
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 mt-8">
              <div className="w-20 h-11 bg-slate-50 rounded-xl animate-shimmer"></div>
              <div className="w-36 h-11 bg-slate-100 rounded-2xl animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-white shadow-glass space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 animate-shimmer"></div>
              <div className="w-20 h-3.5 bg-slate-100 rounded animate-shimmer"></div>
            </div>
            <div className="w-16 h-8 bg-slate-150 rounded-xl animate-shimmer"></div>
            <div className="w-24 h-4 bg-slate-100 rounded animate-shimmer"></div>
          </div>
        ))}
      </div>

      {/* Attendance History Section Skeleton */}
      <div className="bg-white rounded-[2.5rem] shadow-glass border border-white overflow-hidden flex flex-col">
        <div className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
          <div>
            <div className="w-56 h-5 bg-slate-150 rounded-lg animate-shimmer mb-2"></div>
            <div className="w-48 h-3.5 bg-slate-100 rounded animate-shimmer"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-slate-50 rounded-xl animate-shimmer border border-slate-100"></div>
            <div className="w-10 h-10 bg-slate-50 rounded-xl animate-shimmer border border-slate-100"></div>
          </div>
        </div>
        
        {/* Table skeleton */}
        <div className="p-8 space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-4">
            <div className="w-20 h-4 bg-slate-100 rounded animate-shimmer"></div>
            <div className="w-24 h-4 bg-slate-100 rounded animate-shimmer"></div>
            <div className="w-24 h-4 bg-slate-100 rounded animate-shimmer"></div>
            <div className="w-20 h-4 bg-slate-100 rounded animate-shimmer"></div>
            <div className="w-16 h-4 bg-slate-100 rounded animate-shimmer animate-shimmer text-right"></div>
          </div>
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="flex justify-between py-2.5 items-center">
              <div className="w-28 h-5 bg-slate-150 rounded animate-shimmer"></div>
              <div className="w-20 h-4 bg-slate-100 rounded animate-shimmer"></div>
              <div className="w-16 h-4 bg-slate-150 rounded animate-shimmer"></div>
              <div className="w-20 h-6 bg-slate-50 rounded-xl animate-shimmer"></div>
              <div className="w-16 h-5 bg-slate-150 rounded animate-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
