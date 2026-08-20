"use client";

import { useState } from "react";
import { ChoiceList, ResultCard, WizardShell } from "@/components/wizard";
import { identifyPests, PEST_QUESTIONS, type PestAnswerId } from "@/lib/engines/pests";

export function PestTool() {
  const [index, setIndex] = useState(0);
  const [yes, setYes] = useState<PestAnswerId[]>([]);
  const [done, setDone] = useState(false);

  if (!done) {
    const q = PEST_QUESTIONS[index];
    return (
      <WizardShell
        title="إيه الحشرة دي؟"
        subtitle="تحديد بالعلامات الظاهرة، من غير تصوير ذكي. تجنّب المبيدات القوية في البيت."
        step={index + 1}
        total={PEST_QUESTIONS.length}
        onBack={index > 0 ? () => setIndex((i) => i - 1) : undefined}
      >
        <h2 className="mb-4 text-2xl font-bold text-leaf-dark">{q.label}</h2>
        <ChoiceList
          options={[
            { id: "yes", label: "أيوه" },
            { id: "no", label: "لا / مش واضح" },
          ]}
          onChange={(id) => {
            setYes((list) => {
              const without = list.filter((item) => item !== q.id);
              return id === "yes" ? [...without, q.id] : without;
            });
            if (index + 1 >= PEST_QUESTIONS.length) setDone(true);
            else setIndex((i) => i + 1);
          }}
        />
      </WizardShell>
    );
  }

  const ranked = identifyPests(yes);
  const top = ranked[0];

  return (
    <WizardShell title="إيه الحشرة دي؟" step={PEST_QUESTIONS.length} total={PEST_QUESTIONS.length} onBack={() => setDone(false)}>
      {!top ? (
        <ResultCard tone="earth">
          العلامات مش كافية لتحديد حشرة معيّنة. افحص تحت الورق وجنب التربة، ولو في شك استخدم أداة التشخيص.
        </ResultCard>
      ) : (
        <div className="grid gap-4">
          <ResultCard>
            <p className="text-sm font-bold text-leaf">الاحتمال الأقرب</p>
            <h2 className="mt-1 text-3xl font-bold text-leaf-dark">{top.pest.arabicName}</h2>
            <p className="text-sm text-muted">{top.pest.englishName}</p>
          </ResultCard>
          <ResultCard tone="earth">
            <h3 className="font-bold">إزاي تتأكد</h3>
            <ul className="mt-2 list-disc pr-5">
              {top.pest.signs.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
          </ResultCard>
          <ResultCard>
            <h3 className="font-bold text-leaf-dark">خطوات آمنة دلوقتي</h3>
            <ol className="mt-2 list-decimal pr-5">
              <li>اعزل النبات عن الباقي.</li>
              {top.pest.nonChemicalTreatment.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </ResultCard>
          <ResultCard>
            <h3 className="font-bold">التنظيف والعزل</h3>
            <p>امسح الورق من فوق ومن تحت. اغسل إيدك والأدوات. راقب النباتات المجاورة أسبوع.</p>
          </ResultCard>
          <ResultCard tone="clay">
            <h3 className="font-bold">إمتى التدخل يبقى أقوى</h3>
            <p>
              لو الإصابة غطّت معظم النبات أو بدأت تنتقل بسرعة بعد العزل والتنظيف المتكرر، ساعتها تحتاج مساعدة متخصص زراعي. متستخدمش مبيدات قوية في البيت من غير معرفة، خصوصًا مع أطفال أو حيوانات.
            </p>
            <p className="mt-2 text-sm">{top.pest.notes}</p>
          </ResultCard>
          {ranked[1] ? (
            <ResultCard tone="earth">
              احتمال تاني: {ranked[1].pest.arabicName}. الفرق غالبًا في مكان الحشرة وشكلها مش في الذعر.
            </ResultCard>
          ) : null}
        </div>
      )}
    </WizardShell>
  );
}
