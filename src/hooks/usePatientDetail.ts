"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function usePatientDetail() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "view";
  const isReadOnly = mode === "view";

  const [generalExam, setGeneralExam] = useState(
    "Patient appears alert and oriented, in no acute distress. Hydrated, good skin turgor."
  );
  const [cardioExam, setCardioExam] = useState(
    "Rhythmic heart sounds, S1 and S2 present. No murmurs or gallops noted. Peripheral pulses symmetrical."
  );
  const [respExam, setRespExam] = useState(
    "Lungs clear to auscultation bilaterally. No wheezes, rales, or rhonchi. Normal respiratory effort."
  );
  const [clinicalNotes, setClinicalNotes] = useState(
    "Patient presents with mild recurrent seasonal allergies. Currently reporting slight nasal congestion for the past 3 days. No fever or cough. \n\nPlan: \n1. Continue current antihistamine as needed. \n2. Saline nasal spray twice daily.\n3. Review in 2 weeks if symptoms persist. \n4. Laboratory tests ordered: Full Blood Count (FBC) to rule out underlying infection."
  );
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return {
    isReadOnly,
    // state
    generalExam, setGeneralExam,
    cardioExam, setCardioExam,
    respExam, setRespExam,
    clinicalNotes, setClinicalNotes,
    showToast,
    // handler
    handleSave,
  };
}
