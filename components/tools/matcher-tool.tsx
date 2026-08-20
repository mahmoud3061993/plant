"use client";

import { useState } from "react";
import Link from "next/link";
import { PlantPortrait } from "@/components/plant-portrait";
import { ChoiceList, ResultCard, WizardShell } from "@/components/wizard";
import type { LightLevel, RoomId } from "@/data/types";
import { matchPlants, type MatcherAnswers } from "@/lib/engines/matcher";
import { ROOM_LABELS } from "@/lib/labels";
import { getAllPlants } from "@/lib/plants";

const STEPS = [
  "room",
  "light",
  "forgets",
  "experience",
  "pets",
  "size",
  "style",
  "attention",
] as const;

export function MatcherTool() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<MatcherAnswers>>({});
  const key = STEPS[step];

  function set<K extends keyof MatcherAnswers>(field: K, value: MatcherAnswers[K]) {
    const next = { ...answers, [field]: value };
    setAnswers(next);
    setStep((s) => s + 1);
  }

  if (step >= STEPS.length) {
    const full = answers as MatcherAnswers;
    const results = matchPlants(getAllPlants(), full);
    return (
      <WizardShell
        title="إيه النبات المناسب عندي؟"
        step={8}
        total={8}
        onBack={() => setStep(7)}
      >
        <h2 className="mb-4 text-2xl font-bold text-leaf-dark">أفضل ٥ نباتات ليك</h2>
        <div className="grid gap-4">
          {results.map((item) => (
            <article
              key={item.plant.id}
              className="overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-[var(--shadow-card)]"
            >
              <div className="sm:flex">
                <div className="sm:w-40">
                  <PlantPortrait
                    slug={item.plant.slug}
                    name={item.plant.arabicName}
                    emoji={item.plant.visual.emoji}
                    hue={item.plant.visual.hue}
                  />
                </div>
                <div className="flex-1 p-4">
                  <p className="text-sm font-bold text-leaf">{item.percent}٪ مناسبة ليك</p>
                  <h3 className="text-xl font-bold text-leaf-dark">{item.plant.arabicName}</h3>
                  <p className="text-sm text-muted">{item.plant.englishName}</p>
                  <ul className="mt-3 grid gap-1 text-sm">
                    {item.reasons.map((reason) => (
                      <li key={reason}>✓ {reason}</li>
                    ))}
                  </ul>
                  {item.warnings.length ? (
                    <ul className="mt-3 grid gap-1 text-sm text-clay">
                      {item.warnings.map((warning) => (
                        <li key={warning}>⚠️ {warning}</li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    href={`/plants/${item.plant.slug}`}
                    className="mt-4 inline-flex min-h-11 items-center font-bold text-leaf hover:underline"
                  >
                    تفاصيل العناية
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </WizardShell>
    );
  }

  const questions: Record<
    (typeof STEPS)[number],
    { title: string; options: { id: string; label: string }[] }
  > = {
    room: {
      title: "المكان",
      options: (Object.keys(ROOM_LABELS) as RoomId[]).map((id) => ({ id, label: ROOM_LABELS[id] })),
    },
    light: {
      title: "الإضاءة",
      options: [
        { id: "low", label: "ضعيفة" },
        { id: "medium", label: "متوسطة" },
        { id: "bright-indirect", label: "قوية غير مباشرة" },
        { id: "direct", label: "شمس مباشرة" },
      ],
    },
    forgets: {
      title: "هل بتنسى الري؟",
      options: [
        { id: "often", label: "كتير" },
        { id: "sometimes", label: "أحيانًا" },
        { id: "rarely", label: "نادرًا" },
      ],
    },
    experience: {
      title: "خبرتك",
      options: [
        { id: "first", label: "أول مرة أربي زرع" },
        { id: "some", label: "عندي خبرة بسيطة" },
        { id: "good", label: "عندي خبرة كويسة" },
      ],
    },
    pets: {
      title: "الحيوانات الأليفة",
      options: [
        { id: "cats", label: "عندي قطط" },
        { id: "dogs", label: "عندي كلاب" },
        { id: "both", label: "الاتنين" },
        { id: "none", label: "مفيش" },
      ],
    },
    size: {
      title: "الحجم المطلوب",
      options: [
        { id: "small", label: "صغير" },
        { id: "medium", label: "متوسط" },
        { id: "large", label: "كبير" },
        { id: "any", label: "مش فارقة" },
      ],
    },
    style: {
      title: "الشكل",
      options: [
        { id: "foliage", label: "نبات ورقي" },
        { id: "hanging", label: "معلق" },
        { id: "flowering", label: "مزهر" },
        { id: "succulent", label: "عصاري / صبار" },
        { id: "statement", label: "نبات كبير للديكور" },
        { id: "any", label: "مش فارقة" },
      ],
    },
    attention: {
      title: "مستوى الاهتمام",
      options: [
        { id: "tough", label: "عايز حاجة تستحمل" },
        { id: "normal", label: "عادي أهتم بيها" },
        { id: "hobby", label: "بحب النباتات اللي محتاجة اهتمام" },
      ],
    },
  };

  const current = questions[key];

  return (
    <WizardShell
      title="إيه النبات المناسب عندي؟"
      subtitle="هرتّب النباتات حسب مكانك وطريقتك، من نفس دليل النباتات."
      step={step + 1}
      total={8}
      onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
    >
      <h2 className="mb-4 text-2xl font-bold text-leaf-dark">{current.title}</h2>
      <ChoiceList
        options={current.options}
        onChange={(id) => {
          if (key === "room") set("room", id as RoomId);
          if (key === "light") set("light", id as LightLevel);
          if (key === "forgets") set("forgets", id as MatcherAnswers["forgets"]);
          if (key === "experience") set("experience", id as MatcherAnswers["experience"]);
          if (key === "pets") set("pets", id as MatcherAnswers["pets"]);
          if (key === "size") set("size", id as MatcherAnswers["size"]);
          if (key === "style") set("style", id as MatcherAnswers["style"]);
          if (key === "attention") set("attention", id as MatcherAnswers["attention"]);
        }}
      />
      {step === 0 ? <ResultCard tone="earth">الإجابات دي بتفضّل نباتات، مش بتضمن إن أي بيت هيبقى مثالي.</ResultCard> : null}
    </WizardShell>
  );
}
