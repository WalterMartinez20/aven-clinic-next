"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { GridTable, GridTableHeader, GridTableRow, GridTableCell } from "@/components/ui/GridTable";
import { Pagination } from "@/components/ui/Pagination";
import { StatusDotBadge } from "@/components/ui/StatusBadge";
import { useStaff } from "@/hooks/useStaff";

export default function StaffDirectory() {
  const {
    searchQuery, setSearchQuery,
    activeTab, setActiveTab,
    currentPage, setCurrentPage,
    filteredStaff,
    paginatedStaff,
    totalPages,
    activePage,
    handleDeleteStaff,
  } = useStaff();

  return (
    <>
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase mb-2">Team Management</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Staff Directory</h2>
          <p className="text-base text-slate-500 font-medium mt-2">Manage doctors, nurses, and administrative personnel and monitor real-time shift status.</p>
        </div>
        <Link href="/dashboard/staff/new" className="bg-primary-container text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-primary transition-all flex items-center gap-3 shadow-md shrink-0 cursor-pointer">
          <span className="material-symbols-outlined text-xl">person_add</span>
          Add Staff
        </Link>
      </div>

      {/* Directory Metrics (Dashboard Stats Card Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Staff */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Total Staff</span>
            <span className="material-symbols-outlined text-primary">groups</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">124</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-primary mt-2 flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-sm">trending_up</span> +3 this month
            </p>
          </div>
        </div>
        
        {/* On Shift */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">On Shift</span>
            <span className="material-symbols-outlined text-primary">clinical_notes</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">42</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-outline mt-2 uppercase">Currently Active</p>
          </div>
        </div>

        {/* On Leave Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">On Leave</span>
            <span className="material-symbols-outlined text-primary">event_busy</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">08</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-outline mt-2 uppercase">Scheduled</p>
          </div>
        </div>

        {/* Open Positions Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300 shadow-sm border border-surface-container-low/50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.15em] text-outline uppercase">Open Positions</span>
            <span className="material-symbols-outlined text-primary">person_search</span>
          </div>
          <div>
            <span className="text-3xl font-semibold tracking-tight text-on-surface">05</span>
            <p className="text-[11px] font-bold tracking-[0.15em] text-primary mt-2 uppercase">Hiring</p>
          </div>
        </div>
      </div>

      {/* Staff List Table (Always White Container) */}
      <div className="w-full bg-white rounded-xl border border-surface-container shadow-sm p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">Staff Directory</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Filter, review, and manage your clinic's staff members.</p>
          </div>
        </div>

        {/* Filter/Search Bar (Inside Table Header) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-surface-container">
          <div className="flex gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1 px-1">
            {["All Staff", "Emergency", "Cardiology", "Administration"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-5 py-2.5 rounded-xl font-metadata text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-primary-container text-white font-bold shadow-sm cursor-default' 
                    : 'bg-slate-100/80 text-slate-500 hover:bg-primary-container hover:text-white hover:font-bold hover:shadow-md cursor-pointer'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#bdc8d1]">search</span>
            <input 
              className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-sm font-medium pl-12 pr-4 rounded-xl border border-transparent hover:border-slate-200/80 focus:bg-white focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-all duration-200 shadow-2xs placeholder:text-slate-400 outline-none" 
              placeholder="Search staff..." 
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* Grid Table with responsive overflow protection */}
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <div className="min-w-[760px]">
            {/* Headers */}
            <GridTableHeader>
              <div className="col-span-5 md:col-span-4">NAME & ROLE</div>
              <div className="col-span-2 hidden lg:block">DEPARTMENT</div>
              <div className="col-span-2 hidden md:block">STAFF ID</div>
              <div className="col-span-4 md:col-span-2">STATUS</div>
              <div className="col-span-3 md:col-span-2 text-right">ACTIONS</div>
            </GridTableHeader>

            {/* List Rows */}
            <GridTable>
              {paginatedStaff.length > 0 ? paginatedStaff.map((member) => (
                <GridTableRow key={member.id}>
                  
                  {/* Name & Role */}
                  <GridTableCell className="col-span-5 md:col-span-4 flex items-center gap-4 cursor-pointer min-w-0">
                    <Link href={`/dashboard/staff/${member.id}?mode=view`} className="flex items-center gap-4 w-full min-w-0">
                      {member.avatarUrl ? (
                        <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary-container font-headline-sm font-bold group-hover:scale-105 transition-transform shrink-0">
                          {member.initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors truncate">{member.name}</p>
                        <p className="font-body-md text-on-surface-variant text-sm mt-0.5 truncate">{member.role}</p>
                      </div>
                    </Link>
                  </GridTableCell>
                  
                  {/* Department Badge */}
                  <GridTableCell className="col-span-2 hidden lg:block">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/60 font-metadata text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      {member.department}
                    </span>
                  </GridTableCell>
                  
                  {/* Staff ID */}
                  <GridTableCell className="col-span-2 font-body-md text-on-surface-variant hidden md:block text-sm tabular-nums">
                    {member.id}
                  </GridTableCell>
                  
                  {/* Status Badge */}
                  <GridTableCell className="col-span-4 md:col-span-2">
                    <StatusDotBadge status={member.status === 'On Shift' ? 'Active' : 'On Leave'} />
                  </GridTableCell>
                  
                  {/* Actions */}
                  <GridTableCell className="col-span-3 md:col-span-2 flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <Link href={`/dashboard/staff/${member.id}?mode=edit`} className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-highest hover:text-primary transition-all cursor-pointer" title="Edit Staff">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button onClick={() => handleDeleteStaff(member.id)} className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-all cursor-pointer" title="Delete Staff">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </GridTableCell>
                </GridTableRow>
              )) : (
                <div className="py-16 text-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">person_off</span>
                  <p className="text-sm font-bold text-on-surface-variant">No staff members match the active search or department filter.</p>
                </div>
              )}
            </GridTable>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={activePage}
          totalPages={totalPages}
          totalItems={filteredStaff.length}
          showingCount={paginatedStaff.length}
          itemName="staff members"
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
