"use client";

import { useState } from "react";
import { PatientDirectory, initialPatients } from "@/types/patients.types";

export const getStatusBadgeClassPatient = (
  status: "Active" | "Pending" | "Inactive"
) => {
  switch (status) {
    case "Active":   return "bg-emerald-50 text-emerald-500 ring-emerald-500/10";
    case "Pending":  return "bg-amber-50 text-amber-500 ring-amber-500/10";
    case "Inactive": return "bg-slate-100 text-slate-500 ring-slate-500/10";
  }
};

export function usePatients() {
  const [patients, setPatients] = useState<PatientDirectory[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handleDeletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastVisitDept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "All" || patient.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));
  const activePage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  return {
    // state
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    // derived
    filteredPatients,
    paginatedPatients,
    totalPages,
    activePage,
    // helpers & handlers
    getStatusBadgeClassPatient,
    handleDeletePatient,
  };
}
