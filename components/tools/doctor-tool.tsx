"use client";

import { useMemo, useState } from "react";
import { PlantPicker } from "@/components/plant-picker";
import { ChoiceList, ResultCard, WizardShell } from "@/components/wizard";
import type { Plant, SymptomId } from "@/data/types";
import {
  type Answers,
  type FollowupId,
  FOLLOWUPS,
  SYMPTOMS,
  confidenceLabel,
  diagnose,
  distinguish,
  questionsFor,
} from "@/lib/engines/doctor";

function SymptomMark({ id }: { id: string }) {
  const map: Record<string, string> = {
    yellow: "🟡",
    wilt: "🥀",
    drop: "🍂",
    tips: "🟤",
    spots: "⚫",
    stunt: "📏",
    curl: "🌀",
    bug: "🐛",
    smell: "👃",
    stem: "🪵",
    root: "🌱",
    unsure: "❓",
  };
  return <span>{map[id] ?? "🌿"}</span>;
}

export function DoctorTool() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [symptom, setSymptom] = useState<SymptomId | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [qIndex, setQIndex] = useState(0);
  const [done, setDone] = useState(false);

  const followups = symptom ? questionsFor(symptom) : [];
  const total = 2 + followups.length;
  const currentQ: FollowupId | undefined = followups[qIndex];

  const step = !plant ? 1 : !symptom ? 2 : done ? total : 2 + qIndex + 1;

  const results = useMemo(() => {
    if (!plant || !symptom || !done) return [];
    return diagnose(plant, symptom, answers);
  }, [plant, symptom, answers, done]);

  function resetFromPlant() {
    setSymptom(null);
    setAnswers({});
    setQIndex(0);
    setDone(false);
  }

  function back() {
    if (done) {
      setDone(false);
      setQIndex(Math.max(followups.length - 1, 0));
      return;
    }
    if (currentQ && qIndex > 0) {
      setQIndex((i) => i - 1);
      return;
    }
    if (symptom) {
      setSymptom(null);
      setAnswers({});
      setQIndex(0);
      return;
    }
    if (plant) setPlant(null);
  }

  if (!plant) {
    return (
      <WizardShell title="زرعتي فيها مشكلة" subtitle="تشخيص تقريبي حسب النبات والأعراض، مش تشخيص طبي." step={1} total={total || 3}>
        <PlantPicker onSelect={setPlant} title="اختار النبات" />
      </WizardShell>
    );
  }

  if (!symptom) {
    return (
      <WizardShell title="زرعتي فيها مشكلة" step={2} total={total || 3} onBack={back}>
        <p className="mb-2 text-sm font-bold text-leaf-dark">{plant.arabicName}</p>
        <h2 className="mb-4 text-2xl font-bold text-leaf-dark">إيه المشكلة اللي شايفها؟</h2>
        <ChoiceList
          options={SYMPTOMS.map((item) => ({
            id: item.id,
            label: item.label,
            icon: <SymptomMark id={item.icon} />,
          }))}
          onChange={(id) => setSymptom(id as SymptomId)}
        />
      </WizardShell>
    );
  }

  if (!done && currentQ) {
    const q = FOLLOWUPS[currentQ];
    return (
      <WizardShell title="زرعتي فيها مشكلة" step={step} total={total} onBack={back}>
        <p className="mb-2 text-sm font-bold text-leaf-dark">
          {plant.arabicName} · {SYMPTOMS.find((s) => s.id === symptom)?.label}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-leaf-dark">{q.question}</h2>
        <ChoiceList
          options={q.options}
          value={answers[currentQ]}
          onChange={(id) => {
            const next = { ...answers, [currentQ]: id };
            setAnswers(next);
            if (qIndex + 1 >= followups.length) setDone(true);
            else setQIndex((i) => i + 1);
          }}
        />
      </WizardShell>
    );
  }

  const primary = results[0];
  const second = results[1];

  return (
    <WizardShell title="زرعتي فيها مشكلة" step={total} total={total} onBack={back}>
      <button type="button" onClick={resetFromPlant} className="mb-4 text-sm font-bold text-leaf hover:underline">
        نبات تاني
      </button>
      <p className="text-sm text-muted">
        النتيجة تقديرية حسب إجاباتك وبيانات {plant.arabicName}. ممكن أكتر من سبب يتشابه.
      </p>
      {!primary ? (
        <ResultCard tone="earth">محتاج إجابات أوضح. راجع التربة والضوء وجرّب تاني.</ResultCard>
      ) : (
        <div className="mt-5 grid gap-4">
          <ResultCard>
            <p className="text-sm font-bold text-leaf">الاحتمال الأقرب</p>
            <h2 className="mt-1 text-3xl font-bold text-leaf-dark">{primary.label}</h2>
            <p className="mt-1 font-bold">{confidenceLabel(primary.score)}</p>
          </ResultCard>
          <ResultCard tone="earth">
            <h3 className="font-bold text-leaf-dark">ليه ده الاحتمال الأقرب؟</h3>
            <ul className="mt-2 list-disc pr-5">
              {primary.reasons.slice(0, 6).map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </ResultCard>
          <ResultCard>
            <h3 className="font-bold text-leaf-dark">اعمل إيه دلوقتي؟</h3>
            <ol className="mt-2 list-decimal pr-5">
              {primary.steps.map((stepItem) => (
                <li key={stepItem}>{stepItem}</li>
              ))}
            </ol>
          </ResultCard>
          <ResultCard tone="clay">
            <h3 className="font-bold">متعملش إيه؟</h3>
            <ul className="mt-2 list-disc pr-5">
              {primary.dont.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ResultCard>
          <ResultCard>
            <h3 className="font-bold text-leaf-dark">راقب إيه خلال الأيام الجاية؟</h3>
            <ul className="mt-2 list-disc pr-5">
              {primary.watch.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ResultCard>
          <ResultCard tone="clay">
            <h3 className="font-bold">إمتى تعتبر الحالة خطيرة؟</h3>
            <ul className="mt-2 list-disc pr-5">
              {primary.serious.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ResultCard>
          {second ? (
            <ResultCard tone="earth">
              <p className="font-bold">١. الأقرب: {primary.label}</p>
              <p className="mt-2 font-bold">٢. احتمال تاني: {second.label}</p>
              <p className="mt-3">٣. إيه اللي يفرّق بينهم؟ {distinguish(primary, second)}</p>
            </ResultCard>
          ) : null}
        </div>
      )}
    </WizardShell>
  );
}
