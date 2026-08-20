import type { Metadata } from "next";
import { PlantLibrary } from "@/components/plant-library";
import { getPlantSummaries } from "@/lib/plants";

export const metadata: Metadata = {
  title: "دليل النباتات",
  description: "ابحث عن نباتك بالعربي أو الإنجليزي، وفلتر حسب الضوء والري وسهولة العناية.",
};

export default function PlantsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-leaf">دليل النباتات</p>
      <h1 className="mt-2 text-3xl font-bold text-leaf-dark sm:text-4xl">اعرف نباتك كويس</h1>
      <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
        دور بالاسم العربي أو الإنجليزي. الفلتر بسيط وبيشتغل على بيانات حقيقية للنبات،
        مش على شكل الكرت بس.
      </p>
      <div className="mt-8">
        <PlantLibrary plants={getPlantSummaries()} />
      </div>
    </div>
  );
}
