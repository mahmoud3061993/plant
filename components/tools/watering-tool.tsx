"use client";

import { useState } from "react";
import { PlantPicker } from "@/components/plant-picker";
import { ChoiceList, ResultCard, WizardShell } from "@/components/wizard";
import type { Plant } from "@/data/types";
import { checkWatering, type WateringAnswers } from "@/lib/engines/watering";
import { checkDepthCm } from "@/lib/plant-fields";

const KEYS = ["surface", "deeper", "leaves", "drainage", "last", "weather", "light"] as const;

export function WateringTool() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WateringAnswers>>({});

  if (!plant) {
    return (
      <WizardShell title="أسقي دلوقتي ولا لأ؟" subtitle="القرار من حالة التربة والنبات، مش من عدد الأيام لوحده." step={1} total={8}>
        <PlantPicker onSelect={setPlant} />
      </WizardShell>
    );
  }

  const depth = checkDepthCm(plant);
  const questions: Record<(typeof KEYS)[number], { title: string; options: { id: string; label: string }[] }> = {
    surface: {
      title: "حالة أول جزء من التربة",
      options: [
        { id: "dry", label: "ناشفة" },
        { id: "damp", label: "ندية خفيفة" },
        { id: "wet", label: "مبلولة" },
      ],
    },
    deeper: {
      title: `حالة التربة أعمق قليلًا (حوالي ${depth[0]}–${depth[1]} سم)`,
      options: [
        { id: "dry", label: "ناشفة" },
        { id: "damp", label: "ندية" },
        { id: "wet", label: "مبلولة" },
        { id: "skip", label: "مش قادر أفحص الأعمق" },
      ],
    },
    leaves: {
      title: "شكل الأوراق",
      options: [
        { id: "firm", label: "ثابتة وشكلها عادي" },
        { id: "soft", label: "طرية أو دبلانة" },
        { id: "crispy", label: "ناشفة أو مقرمشة" },
        { id: "yellow", label: "صفرة واضحة" },
      ],
    },
    drainage: {
      title: "هل الأصيص بيصرف المياه؟",
      options: [
        { id: "yes", label: "أيوه، والمية بتخرج" },
        { id: "saucer", label: "بتخرج وبتفضل في الطبق" },
        { id: "no", label: "مفيش فتحات" },
      ],
    },
    last: {
      title: "آخر ري تقريبي",
      options: [
        { id: "today", label: "النهارده أو امبارح" },
        { id: "few", label: "من يومين لخمسة" },
        { id: "week", label: "من أسبوع أو أكتر" },
        { id: "unknown", label: "مش فاكر" },
      ],
    },
    weather: {
      title: "الجو حاليًا",
      options: [
        { id: "hot", label: "حار" },
        { id: "mild", label: "معتدل" },
        { id: "cool", label: "بارد" },
      ],
    },
    light: {
      title: "هل النبات في إضاءة قوية؟",
      options: [
        { id: "strong", label: "إضاءة قوية" },
        { id: "normal", label: "عادية" },
        { id: "weak", label: "ضعيفة" },
      ],
    },
  };

  if (step >= KEYS.length) {
    const result = checkWatering(plant, answers as WateringAnswers);
    const tone = result.verdict === "too-wet" ? "clay" : result.verdict === "water" ? "leaf" : "earth";
    const mark = result.verdict === "water" ? "💧" : result.verdict === "too-wet" ? "⚠️" : "⏳";
    return (
      <WizardShell title="أسقي دلوقتي ولا لأ؟" step={8} total={8} onBack={() => setStep(KEYS.length - 1)}>
        <ResultCard tone={tone}>
          <p className="text-4xl">{mark}</p>
          <h2 className="mt-2 text-3xl font-bold">{result.title}</h2>
          <p className="mt-2 text-sm">{plant.arabicName}</p>
        </ResultCard>
        <div className="mt-4 grid gap-4">
          <ResultCard tone="earth">
            <h3 className="font-bold">ليه؟</h3>
            <ul className="mt-2 list-disc pr-5">
              {result.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <p className="mt-3">{result.extra}</p>
          </ResultCard>
          <ResultCard>
            <h3 className="font-bold text-leaf-dark">طريقة الري المناسبة</h3>
            <p>{result.technique}</p>
            <p className="mt-2">{result.howToCheck}</p>
          </ResultCard>
        </div>
        <button type="button" className="mt-6 font-bold text-leaf" onClick={() => { setPlant(null); setStep(0); setAnswers({}); }}>
          نبات تاني
        </button>
      </WizardShell>
    );
  }

  const key = KEYS[step];
  const current = questions[key];
  return (
    <WizardShell
      title="أسقي دلوقتي ولا لأ؟"
      step={step + 2}
      total={8}
      onBack={() => (step === 0 ? setPlant(null) : setStep((s) => s - 1))}
    >
      <p className="mb-2 text-sm font-bold text-leaf-dark">{plant.arabicName}</p>
      <h2 className="mb-4 text-2xl font-bold text-leaf-dark">{current.title}</h2>
      <ChoiceList
        options={current.options}
        onChange={(id) => {
          setAnswers((currentAnswers) => ({ ...currentAnswers, [key]: id }));
          setStep((s) => s + 1);
        }}
      />
    </WizardShell>
  );
}
