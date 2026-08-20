"use client";

import { useState } from "react";
import { PlantPicker } from "@/components/plant-picker";
import { ChoiceList, ResultCard, WizardShell } from "@/components/wizard";
import type { Plant, SoilComponentId } from "@/data/types";
import { ALL_COMPONENTS, mixFromAvailable, recommendedMix } from "@/lib/engines/soil";
import { COMPONENT_LABELS } from "@/lib/plant-fields";
import { DRAINAGE_LABELS } from "@/lib/labels";

export function SoilTool() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [mode, setMode] = useState<"pick" | "best" | "have" | "have-result">("pick");
  const [available, setAvailable] = useState<SoilComponentId[]>([]);

  if (!plant) {
    return (
      <WizardShell title="خلطة التربة" subtitle="المواد والنِّسَب على أساس اللي بيتباع في المشاتل المصرية." step={1} total={2}>
        <PlantPicker onSelect={setPlant} />
      </WizardShell>
    );
  }

  if (mode === "pick") {
    return (
      <WizardShell title="خلطة التربة" step={2} total={2} onBack={() => setPlant(null)}>
        <p className="mb-3 text-sm font-bold text-leaf-dark">{plant.arabicName}</p>
        <ChoiceList
          options={[
            { id: "best", label: "قولّي أفضل خلطة" },
            { id: "have", label: "استخدم اللي موجود عندي" },
          ]}
          onChange={(id) => setMode(id as "best" | "have")}
        />
      </WizardShell>
    );
  }

  if (mode === "best") {
    const mix = recommendedMix(plant);
    return (
      <WizardShell title="خلطة التربة" step={2} total={2} onBack={() => setMode("pick")}>
        <h2 className="text-2xl font-bold text-leaf-dark">{plant.arabicName}</h2>
        <p className="mt-1 text-sm text-muted">{DRAINAGE_LABELS[mix.drainage]} · {mix.type}</p>
        <div className="mt-5 grid gap-3">
          {mix.parts.map((part) => (
            <div key={part.component} className="rounded-[1.25rem] border border-line bg-card p-4">
              <p className="text-2xl font-bold text-leaf-dark">{part.percent}%</p>
              <p className="font-bold">{part.label}</p>
              <p className="text-sm leading-7 text-muted">{part.purpose}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                <div className="h-full bg-leaf" style={{ width: `${part.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
        <ResultCard>
          <p>{mix.why}</p>
          <ul className="mt-2 list-disc pr-5">
            {mix.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </ResultCard>
      </WizardShell>
    );
  }

  if (mode === "have-result") {
    const result = mixFromAvailable(plant, available);
    return (
      <WizardShell title="خلطة التربة" step={2} total={2} onBack={() => setMode("have")}>
        {result.ok ? (
          <div className="grid gap-3">
            <ResultCard>{result.message}</ResultCard>
            {result.parts.map((part) => (
              <div key={part.component} className="rounded-[1.25rem] border border-line bg-card p-4">
                <p className="text-2xl font-bold text-leaf-dark">{part.percent}%</p>
                <p className="font-bold">{part.label}</p>
                {part.note ? <p className="text-sm text-muted">{part.note}</p> : null}
              </div>
            ))}
            {result.warnings.map((warning) => (
              <ResultCard key={warning} tone="clay">
                ⚠️ {warning}
              </ResultCard>
            ))}
          </div>
        ) : (
          <ResultCard tone="clay">{result.message}</ResultCard>
        )}
      </WizardShell>
    );
  }

  return (
    <WizardShell title="خلطة التربة" step={2} total={2} onBack={() => setMode("pick")}>
          <h2 className="mb-3 text-xl font-bold text-leaf-dark">إيه الموجود عندك من المشاتل؟</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            دي المواد الشائعة في السوق المصري. لو مش لاقية بيوميس أو لحاء مستورد، عادي — مش داخلين في الاختيارات.
          </p>
      <div className="grid gap-2">
        {ALL_COMPONENTS.map((id) => {
          const on = available.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() =>
                setAvailable((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
              }
              className={`min-h-14 rounded-[1.25rem] border px-4 text-right font-semibold ${
                on ? "border-leaf bg-leaf-soft text-leaf-dark" : "border-line bg-card"
              }`}
            >
              {on ? "✓ " : ""}
              {COMPONENT_LABELS[id]}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        disabled={available.length === 0}
        onClick={() => setMode("have-result")}
        className="mt-5 inline-flex min-h-12 items-center rounded-full bg-leaf px-6 font-bold text-white disabled:opacity-40"
      >
        اقترح خلطة
      </button>
    </WizardShell>
  );
}
