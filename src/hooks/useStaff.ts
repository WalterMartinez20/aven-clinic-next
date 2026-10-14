"use client";

import { useState } from "react";
import { StaffMember, initialStaff } from "@/types/staff.types";

export function useStaff() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All Staff");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handleDeleteStaff = (id: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;
    if (activeTab === "Emergency")      matchesTab = member.department === "Emergency";
    else if (activeTab === "Cardiology")     matchesTab = member.department === "Cardiology";
    else if (activeTab === "Administration") matchesTab = member.department === "Administration";

    return matchesSearch && matchesTab;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / itemsPerPage));
  const activePage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + itemsPerPage);

  return {
    // state
    searchQuery, setSearchQuery,
    activeTab, setActiveTab,
    currentPage, setCurrentPage,
    // derived
    filteredStaff,
    paginatedStaff,
    totalPages,
    activePage,
    // handlers
    handleDeleteStaff,
  };
}
