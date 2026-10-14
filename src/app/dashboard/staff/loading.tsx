import React from "react";
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";

export default function StaffLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <header className="mb-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="w-56 h-9 bg-slate-150 rounded-xl animate-shimmer mb-3"></div>
          <div className="w-80 h-4 bg-slate-100 rounded-lg animate-shimmer"></div>
        </div>
      </header>

      {/* KPI Bento Grid Skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-glass border border-white flex items-center gap-5">
            {/* Round Icon Skeleton */}
            <div className="w-14 h-14 rounded-2xl bg-slate-100 animate-shimmer shrink-0"></div>
            <div className="space-y-2.5 w-full">
              <div className="w-20 h-3 bg-slate-100 rounded animate-shimmer"></div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-7 bg-slate-150 rounded-xl animate-shimmer"></div>
                <div className="w-12 h-4.5 bg-slate-100 rounded-md animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Data Table Container Skeleton */}
      <section className="bg-white rounded-[2.5rem] shadow-glass border border-white overflow-hidden flex flex-col">
        {/* Table Title Block */}
        <div className="p-8 border-b border-slate-100 bg-white">
          <div className="w-36 h-6 bg-slate-150 rounded-lg animate-shimmer mb-2"></div>
          <div className="w-64 h-3.5 bg-slate-100 rounded animate-shimmer"></div>
        </div>

        {/* Filtering & Search Toolbar Skeleton */}
        <div className="px-8 py-5 bg-slate-50/40 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs skeleton */}
          <div className="w-64 h-9 bg-slate-100 rounded-2xl animate-shimmer"></div>
          {/* Search bar and New Button skeleton */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="w-48 h-10 bg-slate-100 rounded-2xl animate-shimmer"></div>
            <div className="w-32 h-10 bg-slate-150 rounded-2xl animate-shimmer"></div>
          </div>
        </div>

        {/* Rows skeleton */}
        <GridTableHeader>
          <GridTableCell className="col-span-5 md:col-span-4"><div className="w-24 h-3.5 bg-slate-100 rounded animate-shimmer"></div></GridTableCell>
          <GridTableCell className="col-span-2 hidden lg:block"><div className="w-20 h-3.5 bg-slate-100 rounded animate-shimmer"></div></GridTableCell>
          <GridTableCell className="col-span-2 hidden md:block"><div className="w-16 h-3.5 bg-slate-100 rounded animate-shimmer"></div></GridTableCell>
          <GridTableCell className="col-span-4 md:col-span-2"><div className="w-16 h-3.5 bg-slate-100 rounded animate-shimmer"></div></GridTableCell>
          <GridTableCell className="col-span-3 md:col-span-2 text-right"><div className="w-16 h-3.5 bg-slate-100 rounded animate-shimmer ml-auto"></div></GridTableCell>
        </GridTableHeader>

        <GridTable>
          {[1, 2, 3].map((idx) => (
            <GridTableRow key={idx} className="hover:bg-slate-50/50 transition-colors">
              <GridTableCell className="col-span-5 md:col-span-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 animate-shimmer shrink-0"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4.5 bg-slate-150 rounded animate-shimmer"></div>
                  <div className="w-40 h-3 bg-slate-100 rounded animate-shimmer"></div>
                </div>
              </GridTableCell>
              <GridTableCell className="col-span-2 hidden lg:block">
                <div className="w-20 h-4 bg-slate-100 rounded animate-shimmer"></div>
              </GridTableCell>
              <GridTableCell className="col-span-2 hidden md:block">
                <div className="w-20 h-4 bg-slate-100 rounded animate-shimmer"></div>
              </GridTableCell>
              <GridTableCell className="col-span-4 md:col-span-2">
                <div className="w-16 h-7 bg-slate-50 rounded-xl animate-shimmer border border-slate-100"></div>
              </GridTableCell>
              <GridTableCell className="col-span-3 md:col-span-2 flex justify-end">
                <div className="w-12 h-6 bg-slate-50 rounded animate-shimmer"></div>
              </GridTableCell>
            </GridTableRow>
          ))}
        </GridTable>

        {/* Pagination Footer Skeleton */}
        <div className="p-8 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-36 h-4 bg-slate-100 rounded animate-shimmer"></div>
          <div className="flex gap-2">
            <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl animate-shimmer"></div>
            <div className="w-9 h-9 bg-slate-150 rounded-xl animate-shimmer"></div>
            <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl animate-shimmer"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
