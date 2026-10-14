"use client";

import React from "react";
import DashboardTopMetrics from "@/components/dashboard/overview/DashboardTopMetrics";
import DashboardWidgets from "@/components/dashboard/overview/DashboardWidgets";

export default function DashboardPage() {
  return (
    <>
      <DashboardTopMetrics />
      <DashboardWidgets />
    </>
  );
}
