"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { dashboardService } from "@/services/dashboard.service";

export function useDashboardLayout() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState("Securing session...");

  const handleLogout = async () => {
    setTransitionText("Logging out...");
    setIsTransitioning(true);
    setTimeout(async () => {
      try {
        await authService.logout();
        router.push("/");
      } catch {
        router.push("/");
      }
    }, 850);
  };

  const handleResetDemo = () => {
    setTransitionText("Resetting workspace demo data...");
    setIsTransitioning(true);
    setTimeout(() => {
      dashboardService.resetDemoData();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }, 850);
  };

  return {
    isTransitioning,
    transitionText,
    handleLogout,
    handleResetDemo,
  };
}
