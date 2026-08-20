"use client";

import { useState } from "react";
import { PlantPicker } from "@/components/plant-picker";
import { ChoiceList, ResultCard, WizardShell } from "@/components/wizard";
import type { Plant } from "@/data/types";
import { rescuePlan, type EmergencyAnswers } from "@/lib/engines/emergency";

const KEYS = ["soil", "roots", "stem", "smell", "leaves", "pests", "event"] as const;

export function EmergencyTool() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<EmergencyAnswers>>({});

  if (!plant) {
    return (
      <WizardShell title="أنقذ زرعتي" subtitle="أسئلة قليلة. اعمل الخطوات المهمة الأول." step={1} total={8}>
        <PlantPicker onSelect={setPlant} />
      </WizardShell>
    );
  }

  const questions: Record<(typeof KEYS)[number], { title: string; options: { id: string; label: string }[] }> = {
    soil: {
      title: "التربة",
      options: [
        { id: "wet", label: "مبلولة" },
        { id: "damp", label: "ندية" },
        { id: "dry", label: "ناشفة" },
      ],
    },
    roots: {
      title: "الجذور لو ظاهرة",
      options: [
        { id: "not-seen", label: "مش شايفها" },
        { id: "firm", label: "ثابتة فاتحة" },
        { id: "mushy", label: "طرية أو بنية" },
        { id: "crowded", label: "مليون الأصيص" },
      ],
    },
    stem: {
      title: "حالة الساق",
      options: [
        { id: "firm", label: "ثابتة" },
        { id: "mushy", label: "طرية" },
        { id: "wrinkled", label: "منكمشة ناشفة" },
      ],
    },
    smell: {
      title: "الريحة",
      options: [
        { id: "no", label: "عادية" },
        { id: "yes", label: "عفن أو غريبة" },
      ],
    },
    leaves: {
      title: "حالة الورق الأساسية",
      options: [
        { id: "ok", label: "شبه عادية" },
        { id: "wilt", label: "دبلانة" },
        { id: "yellow", label: "صفرة واسعة" },
        { id: "crisp", label: "محروقة أو ناشفة" },
        { id: "drop", label: "بتقع" },
      ],
    },
    pests: {
      title: "حشرات",
      options: [
        { id: "no", label: "مش ظاهرة" },
        { id: "yes", label: "فيه حشرات" },
      ],
    },
    event: {
      title: "حصل حاجة قريب؟",
      options: [
        { id: "none", label: "لا" },
        { id: "repot", label: "تغيير أصيص" },
        { id: "move", label: "نقل مكان" },
        { id: "sun", label: "شمس قوية" },
        { id: "travel", label: "سفر وإهمال" },
        { id: "fertilizer", label: "سماد زيادة" },
        { id: "fall", label: "وقع أو اتكسر" },
      ],
    },
  };

  if (step >= KEYS.length) {
    const plan = rescuePlan(plant, answers as EmergencyAnswers);
    return (
      <WizardShell title="أنقذ زرعتي" step={8} total={8} onBack={() => setStep(KEYS.length - 1)}>
        <ResultCard>
          <p className="text-sm font-bold text-leaf">{plant.arabicName}</p>
          <h2 className="mt-1 text-2xl font-bold text-leaf-dark">{plan.headline}</h2>
        </ResultCard>
        <ResultCard>
          <h3 className="text-xl font-bold text-leaf-dark">اعمل الـ3 حاجات دول دلوقتي</h3>
          <ol className="mt-2 list-decimal pr-5 text-lg">
            {plan.now.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </ResultCard>
        <ResultCard tone="earth">
          <h3 className="font-bold">خلال الـ٢٤–٤٨ ساعة الجاية</h3>
          <ul className="mt-2 list-disc pr-5">
            {plan.later.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ResultCard>
        <ResultCard tone="clay">
          <h3 className="font-bold">متعملش</h3>
          <ul className="mt-2 list-disc pr-5">
            {plan.dont.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ResultCard>
        <ResultCard>
          <h3 className="font-bold text-leaf-dark">علامات إن النبات بيتحسن</h3>
          <ul className="mt-2 list-disc pr-5">
            {plan.better.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ResultCard>
        <ResultCard tone="clay">
          <h3 className="font-bold">علامات إن المشكلة بتسوء</h3>
          <ul className="mt-2 list-disc pr-5">
            {plan.worse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ResultCard>
      </WizardShell>
    );
  }

  const key = KEYS[step];
  return (
    <WizardShell
      title="أنقذ زرعتي"
      step={step + 2}
      total={8}
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
