"use client";

import type { Plant } from "@/data/types";
import { DIFFICULTY_LABELS } from "@/lib/labels";

export function PrintCareCard({ plant }: { plant: Plant }) {
  function printCard() {
    document.body.classList.add("print-care-only");
    const cleanup = () => {
      document.body.classList.remove("print-care-only");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  return (
    <section className="rounded-[1.75rem] border border-line bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-leaf-dark">بطاقة العناية السريعة</h2>
        <button
          type="button"
          onClick={printCard}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-leaf px-5 text-sm font-bold text-white hover:bg-leaf-dark"
        >
          اطبع أو احفظ PDF
        </button>
      </div>

      <div className="print-care-card rounded-[1.5rem] border border-line bg-background p-5">
        <p className="text-sm text-muted">دليل إنقاذ ورعاية النباتات المنزلية</p>
        <h3 className="mt-1 text-2xl font-bold text-leaf-dark">{plant.arabicName}</h3>
        <p className="text-sm text-muted">
          {plant.englishName} · {plant.scientificName}
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <CardRow label="الضوء" value={plant.quickCard.light} />
          <CardRow label="إمتى تسقي" value={plant.quickCard.water} />
          <CardRow label="التربة" value={plant.quickCard.soil} />
          <CardRow label="الحرارة" value={plant.quickCard.temperature} />
          <CardRow label="الرطوبة" value={plant.quickCard.humidity} />
          <CardRow label="التسميد" value={`${plant.fertilizing.frequency} — ${plant.fertilizing.season}`} />
          <CardRow label="مستوى الصعوبة" value={DIFFICULTY_LABELS[plant.difficulty]} />
        </dl>
        <div className="mt-5 rounded-2xl border border-line bg-card px-4 py-3">
          <p className="text-xs font-bold text-muted">أشهر ٣ أخطاء</p>
          <ol className="mt-2 list-decimal pr-5 text-sm leading-7">
            {plant.commonMistakes.slice(0, 3).map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ol>
        </div>
        <p className="mt-5 rounded-2xl bg-clay-soft px-4 py-3 text-sm font-semibold leading-7 text-clay">
          أهم تحذير: {plant.quickCard.topWarning}
        </p>
      </div>
    </section>
  );
}

function CardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-4 py-3">
      <dt className="text-xs font-bold text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-6">{value}</dd>
    </div>
  );
}
