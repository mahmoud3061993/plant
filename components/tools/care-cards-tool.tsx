"use client";

import { useState } from "react";
import { PlantPicker } from "@/components/plant-picker";
import { PrintCareCard } from "@/components/print-care-card";
import { WizardShell } from "@/components/wizard";
import type { Plant } from "@/data/types";

export function CareCardsTool() {
  const [plant, setPlant] = useState<Plant | null>(null);

  if (!plant) {
    return (
      <WizardShell
        title="بطاقة العناية"
        subtitle="صفحة واحدة للطباعة أو الحفظ PDF من المتصفح."
        step={1}
        total={2}
      >
        <PlantPicker onSelect={setPlant} title="اختار نبات البطاقة" />
      </WizardShell>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <button type="button" onClick={() => setPlant(null)} className="no-print mb-4 font-bold text-leaf">
        نبات تاني
      </button>
      <PrintCareCard plant={plant} />
    </div>
  );
}
