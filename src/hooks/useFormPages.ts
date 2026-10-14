"use client";

import { useRouter } from "next/navigation";

export function useNewAppointment() {
  const router = useRouter();

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/appointments");
  };

  return { handleSchedule };
}

export function useNewPatient() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/patients");
  };

  return { handleRegister };
}

export function useNewStaff() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/staff");
  };

  return { handleRegister };
}
