"use client";

import { useState, type ReactNode } from "react";
import { PlantPicker } from "@/components/plant-picker";
import type { Plant } from "@/data/types";

export function PlannerTool() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [picking, setPicking] = useState(false);
  const name = plant?.arabicName ?? "";

  function printPlanner() {
    document.body.classList.add("print-planner");
    const cleanup = () => {
      document.body.classList.remove("print-planner");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="no-print">
        <p className="text-sm font-bold text-leaf">مخطط العناية</p>
        <h1 className="mt-2 text-3xl font-bold text-leaf-dark">اطبع نسخة لكل نبات عندك وسجل تطور حالته.</h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
          المخطط للطباعة، مش لوحة متابعة أونلاين. املأ بقلم بعد الطباعة، وصوّر النبات من نفس الزاوية كل أسبوع.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPicking((value) => !value)}
            className="inline-flex min-h-12 items-center rounded-full border border-line bg-card px-5 font-bold text-leaf-dark"
          >
            {plant ? `النبات: ${plant.arabicName}` : "اختار نبات (اختياري)"}
          </button>
          <button
            type="button"
            onClick={printPlanner}
            className="inline-flex min-h-12 items-center rounded-full bg-leaf px-5 font-bold text-white"
          >
            اطبع أو احفظ PDF
          </button>
        </div>
        {picking ? (
          <div className="mt-6">
            <PlantPicker
              onSelect={(selected) => {
                setPlant(selected);
                setPicking(false);
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="print-planner mt-10 grid gap-8">
        <PrintPage title="بطاقة النبات" page="١ / ٥">
          <Field label="اسم النبات" value={name} />
          <Field label="تاريخ الشراء" />
          <Field label="مكان الشراء" />
          <Field label="مكان النبات في البيت" />
          <Field label="نوع الأصيص" />
          <Field label="حجم الأصيص" />
          <Field label="نوع التربة" />
          <Field label="تاريخ آخر تغيير أصيص" />
          <Field label="ملاحظات" tall />
        </PrintPage>

        <PrintPage title="سجل الري" page="٢ / ٥">
          <p className="mb-4 text-sm leading-7">
            سجّل حالة التربة قبل الري. متسجلش «كل X أيام» من غير ما تفحص.
          </p>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["التاريخ", "حالة التربة", "سقيت؟", "كمية تقريبية", "حالة النبات", "ملاحظات"].map((h) => (
                  <th key={h} className="border border-neutral-400 bg-neutral-100 px-2 py-3 text-right font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((__, j) => (
                    <td key={j} className="border border-neutral-400 px-2 py-5">
                      &nbsp;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </PrintPage>

        <PrintPage title="سجل العناية" page="٣ / ٥">
          <p className="mb-3 text-sm">الإجراءات: ري · تسميد · تقليم · تغيير أصيص · تغيير مكان · علاج حشرات · تغيير تربة · تكاثر · أخرى</p>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["التاريخ", "الإجراء", "الملاحظات"].map((h) => (
                  <th key={h} className="border border-neutral-400 bg-neutral-100 px-2 py-3 text-right font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 14 }).map((_, i) => (
                <tr key={i}>
                  <td className="w-1/5 border border-neutral-400 py-5" />
                  <td className="w-1/5 border border-neutral-400" />
                  <td className="border border-neutral-400" />
                </tr>
              ))}
            </tbody>
          </table>
        </PrintPage>

        <PrintPage title="متابعة صحة النبات" page="٤ / ٥">
          {Array.from({ length: 2 }).map((_, block) => (
            <div key={block} className="mb-6 rounded-xl border-2 border-neutral-500 p-4">
              <Field label="التاريخ" />
              <p className="mt-3 text-sm font-bold">لون الأوراق: أخضر □ &nbsp; أصفر □ &nbsp; بني □ &nbsp; مختلط □</p>
              <p className="mt-2 text-sm font-bold">حالة الأوراق: قوية □ &nbsp; دبلانة □ &nbsp; بتقع □ &nbsp; ملتفة □</p>
              <p className="mt-2 text-sm font-bold">نمو جديد: نعم □ &nbsp; لا □ &nbsp;&nbsp; حشرات: نعم □ &nbsp; لا □</p>
              <p className="mt-2 text-sm font-bold">حالة التربة: ناشفة □ &nbsp; رطبة □ &nbsp; مبلولة □</p>
              <Field label="المشكلة اللي لاحظتها" />
              <Field label="الإجراء اللي عملته" />
              <p className="mt-3 text-sm font-bold">النتيجة بعد ٣–٧ أيام: تحسن □ &nbsp; ثابت □ &nbsp; أسوأ □</p>
            </div>
          ))}
        </PrintPage>

        <PrintPage title="تقدم الشهر" page="٥ / ٥">
          <p className="mb-4 text-sm leading-7">
            صوّر النبات من نفس الزاوية كل أسبوع والصق الصورة أو اكتب ملاحظة.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {["الأسبوع ١", "الأسبوع ٢", "الأسبوع ٣", "الأسبوع ٤"].map((week) => (
              <div key={week} className="min-h-48 rounded-xl border-2 border-dashed border-neutral-500 p-3">
                <p className="font-bold">{week}</p>
                <p className="mt-8 text-center text-sm text-neutral-600">الصورة / ملاحظات</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            <Field label="الحالة أول الشهر" />
            <Field label="الحالة آخر الشهر" />
            <Field label="إيه اللي اتحسن؟" />
            <Field label="إيه اللي محتاج متابعة؟" />
          </div>
        </PrintPage>
      </div>
    </div>
  );
}

function PrintPage({ title, page, children }: { title: string; page: string; children: ReactNode }) {
  return (
    <section className="print-page rounded-[1.5rem] border-2 border-neutral-700 bg-white p-6 text-neutral-900 shadow-[var(--shadow-card)]">
      <header className="mb-5 flex items-end justify-between border-b-2 border-neutral-800 pb-3">
        <div>
          <p className="text-xs font-bold">دليل إنقاذ ورعاية النباتات المنزلية</p>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-sm font-bold">{page}</p>
      </header>
      {children}
    </section>
  );
}

function Field({ label, value = "", tall = false }: { label: string; value?: string; tall?: boolean }) {
  return (
    <label className="mt-3 block">
      <span className="text-sm font-bold">{label}</span>
      <span
        className={`mt-1 block w-full rounded-lg border border-neutral-500 px-3 py-2 ${tall ? "min-h-24" : "min-h-10"}`}
      >
        {value}
      </span>
    </label>
  );
}
