"use client";

import { useState } from "react";
import { PlantPicker } from "@/components/plant-picker";
import { ChoiceList, ResultCard, WizardShell } from "@/components/wizard";
import type { Plant, RoomId } from "@/data/types";
import { checkLocation, type LocationAnswers } from "@/lib/engines/location";
import { LIGHT_LABELS, ROOM_LABELS } from "@/lib/labels";
import { plantLocation, preferredLight } from "@/lib/plant-fields";

const KEYS = ["room", "distance", "direct", "hours", "ac", "humid"] as const;

export function LocationTool() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<LocationAnswers>>({});

  if (!plant) {
    return (
      <WizardShell title="أحط النبات فين؟" step={1} total={7}>
        <PlantPicker onSelect={setPlant} />
      </WizardShell>
    );
  }

  const questions: Record<(typeof KEYS)[number], { title: string; options: { id: string; label: string }[] }> = {
    room: {
      title: "الغرفة",
      options: (Object.keys(ROOM_LABELS) as RoomId[]).map((id) => ({ id, label: ROOM_LABELS[id] })),
    },
    distance: {
      title: "المسافة من الشباك",
      options: [
        { id: "sill", label: "على حافة الشباك" },
        { id: "near", label: "قريب (متر تقريبًا)" },
        { id: "mid", label: "في نص الغرفة" },
        { id: "far", label: "بعيد وفي ركن" },
      ],
    },
    direct: {
      title: "هل الشمس بتوصل للنبات مباشرة؟",
      options: [
        { id: "none", label: "لا" },
        { id: "brief", label: "شوية خفيفة" },
        { id: "hours", label: "ساعات واضحة" },
      ],
    },
    hours: {
      title: "عدد ساعات الشمس التقريبي",
      options: [
        { id: "0", label: "تقريبًا ولا حاجة" },
        { id: "1-2", label: "١–٢ ساعة" },
        { id: "3-5", label: "٣–٥ ساعات" },
        { id: "6+", label: "٦ ساعات أو أكتر" },
      ],
    },
    ac: {
      title: "فيه تكييف مباشر؟",
      options: [
        { id: "yes", label: "أيوه على النبات" },
        { id: "no", label: "لا" },
      ],
    },
    humid: {
      title: "المكان رطب؟",
      options: [
        { id: "yes", label: "رطب (حمام / مطبخ بخار)" },
        { id: "normal", label: "عادي" },
        { id: "no", label: "ناشف (تكييف)" },
      ],
    },
  };

  if (step >= KEYS.length) {
    const result = checkLocation(plant, answers as LocationAnswers);
    const tone = result.verdict === "great" ? "leaf" : result.verdict === "ok" ? "earth" : "clay";
    const mark = result.verdict === "great" ? "🟢" : result.verdict === "ok" ? "🟡" : "🔴";
    const loc = plantLocation(plant);
    const better = (Object.keys(loc) as RoomId[])
      .filter((room) => loc[room] === "excellent" || loc[room] === "good")
      .slice(0, 3)
      .map((room) => ROOM_LABELS[room]);
    return (
      <WizardShell title="أحط النبات فين؟" step={7} total={7} onBack={() => setStep(KEYS.length - 1)}>
        <ResultCard tone={tone}>
          <p className="text-3xl">{mark}</p>
          <h2 className="mt-2 text-3xl font-bold">{result.title}</h2>
          <p className="mt-1 text-sm">{plant.arabicName} · الضوء المفضّل: {LIGHT_LABELS[preferredLight(plant)]}</p>
        </ResultCard>
        <ResultCard tone="earth">
          <h3 className="font-bold">ليه؟</h3>
          <ul className="mt-2 list-disc pr-5">
            {result.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </ResultCard>
        {result.fixes.length ? (
          <ResultCard>
            <h3 className="font-bold text-leaf-dark">تعديل مقترح</h3>
            <ul className="mt-2 list-disc pr-5">
              {result.fixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
            <p className="mt-3">أماكن عادةً أنسب: {better.join("، ")}</p>
            <p className="mt-2 text-sm">{plant.light.bestPlacement}</p>
          </ResultCard>
        ) : (
          <ResultCard>
            <p>{plant.light.bestPlacement}</p>
          </ResultCard>
        )}
      </WizardShell>
    );
  }

  const key = KEYS[step];
  return (
    <WizardShell
      title="أحط النبات فين؟"
      step={step + 2}
      total={7}
      onBack={() => (step === 0 ? setPlant(null) : setStep((s) => s - 1))}
    >
      <p className="mb-2 text-sm font-bold text-leaf-dark">{plant.arabicName}</p>
      <h2 className="mb-4 text-2xl font-bold text-leaf-dark">{questions[key].title}</h2>
      <ChoiceList
        options={questions[key].options}
        onChange={(id) => {
          setAnswers((current) => ({ ...current, [key]: id }));
          setStep((s) => s + 1);
        }}
      />
    </WizardShell>
  );
}
