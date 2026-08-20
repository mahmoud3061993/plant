import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CareSection } from "@/components/care-section";
import { PlantPortrait } from "@/components/plant-portrait";
import { PrintCareCard } from "@/components/print-care-card";
import { QuickCare } from "@/components/quick-care";
import { getPhotoCredit } from "@/data/photo-credits";
import { getAllPlants, getPlantBySlug } from "@/lib/plants";
import {
  DIFFICULTY_LABELS,
  HUMIDITY_LABELS,
  INDOOR_LABELS,
  TOXICITY_LABELS,
} from "@/lib/labels";

type PlantPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPlants().map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({
  params,
}: PlantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) return { title: "نبات غير موجود" };
  return {
    title: plant.arabicName,
    description: plant.shortDescription,
  };
}

export default async function PlantDetailPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) notFound();
  const photoCredit = getPhotoCredit(plant.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link href="/plants" className="text-sm font-bold text-leaf hover:underline">
        رجوع لدليل النباتات
      </Link>

      <div className="mt-5 overflow-hidden rounded-[2rem] border border-line bg-card shadow-[var(--shadow-card)]">
        <PlantPortrait slug={plant.slug} name={plant.arabicName} size="hero" />
        <div className="p-5 sm:p-7">
          {photoCredit ? (
            <p className="mb-3 text-xs leading-6 text-muted">
              صورة: {photoCredit.author} · {photoCredit.license} ·{" "}
              <a
                href={photoCredit.sourceUrl}
                className="underline decoration-line underline-offset-4 hover:text-leaf"
                target="_blank"
                rel="noreferrer"
              >
                Wikimedia Commons
              </a>
            </p>
          ) : null}
          <p className="text-sm text-muted">{INDOOR_LABELS[plant.indoorOutdoor]}</p>
          <h1 className="mt-1 text-3xl font-bold text-leaf-dark sm:text-4xl">
            {plant.arabicName}
          </h1>
          <p className="mt-2 text-base text-muted">
            {plant.englishName}
            <span className="mx-2">·</span>
            <em>{plant.scientificName}</em>
          </p>
          <p className="mt-4 leading-8">{plant.shortDescription}</p>
          <p className="mt-3 text-sm font-semibold text-leaf-dark">
            {DIFFICULTY_LABELS[plant.difficulty]}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <QuickCare plant={plant} />
      </div>

      <div className="mt-6 grid gap-4">
        <CareSection title="أفضل مكان للنبات">
          <p>{plant.light.bestPlacement}</p>
          <p>{plant.light.explanation}</p>
        </CareSection>

        <CareSection title="إزاي تعرف إنه محتاج مياه؟">
          <p>{plant.watering.howToCheck}</p>
          <p>{plant.watering.generalGuidance}</p>
          <p>
            في الصيف: {plant.watering.summerNotes}
          </p>
          <p>
            في الشتا: {plant.watering.winterNotes}
          </p>
        </CareSection>

        <CareSection title="علامات إنك بتسقي زيادة" tone="warning">
          <ul className="list-disc pr-5">
            {plant.watering.overwateringSigns.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </CareSection>

        <CareSection title="علامات إنه عطشان">
          <ul className="list-disc pr-5">
            {plant.watering.underwateringSigns.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </CareSection>

        <CareSection title="أفضل تربة">
          <p>{plant.soil.type}</p>
          <p>{plant.soil.suggestedMix}</p>
          {plant.soil.alternatives.length > 0 ? (
            <ul className="list-disc pr-5">
              {plant.soil.alternatives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </CareSection>

        <CareSection title="التسميد">
          <p>{plant.fertilizing.frequency}</p>
          <p>الموسم: {plant.fertilizing.season}</p>
          <p>{plant.fertilizing.notes}</p>
        </CareSection>

        <CareSection title="الرطوبة والحرارة">
          <p>الحرارة: {plant.environment.temperature}</p>
          <p>
            الرطوبة: {HUMIDITY_LABELS[plant.environment.humidity]}. {plant.environment.humidityNotes}
          </p>
          <p>{plant.environment.ventilation}</p>
        </CareSection>

        <CareSection title="التقليم وتغيير الأصيص">
          <p>{plant.care.pruning}</p>
          <p>{plant.care.repotting}</p>
          <p>{plant.care.propagation}</p>
        </CareSection>

        <CareSection title="أشهر المشاكل">
          {plant.problems.commonProblems.map((problem) => (
            <article key={problem.id} className="rounded-2xl bg-background p-4">
              <h3 className="font-bold">{problem.arabicName}</h3>
              <p className="text-sm text-muted">الأعراض: {problem.symptoms.join("، ")}</p>
              <p className="text-sm">الأسباب المحتملة: {problem.likelyCauses.join("، ")}</p>
              <ul className="mt-2 list-disc pr-5 text-sm">
                {problem.whatToDo.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </CareSection>

        <CareSection title="الحشرات الشائعة">
          {plant.problems.commonPests.map((pest) => (
            <article key={pest.id} className="rounded-2xl bg-background p-4">
              <h3 className="font-bold">
                {pest.arabicName}{" "}
                <span className="text-sm font-normal text-muted">({pest.englishName})</span>
              </h3>
              <p className="text-sm">علامات: {pest.signs.join("، ")}</p>
              <ul className="mt-2 list-disc pr-5 text-sm">
                {pest.nonChemicalTreatment.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted">{pest.notes}</p>
            </article>
          ))}
        </CareSection>

        <CareSection title="علامات تعفن الجذور" tone="warning">
          <ul className="list-disc pr-5">
            {plant.problems.rootRotSigns.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </CareSection>

        <CareSection title="هل آمن للأطفال والحيوانات؟" tone="safe">
          <p>الأطفال: {TOXICITY_LABELS[plant.safety.children.status]}. {plant.safety.children.notes}</p>
          <p>القطط: {TOXICITY_LABELS[plant.safety.cats.status]}. {plant.safety.cats.notes}</p>
          <p>الكلاب: {TOXICITY_LABELS[plant.safety.dogs.status]}. {plant.safety.dogs.notes}</p>
        </CareSection>

        <CareSection title="أشهر أخطاء بتقتل النبات ده" tone="warning">
          <div className="grid gap-3">
            {plant.commonMistakes.map((mistake) => (
              <p
                key={mistake}
                className="rounded-2xl border border-clay/15 bg-card px-4 py-3 font-semibold leading-7"
              >
                ❌ {mistake}
              </p>
            ))}
          </div>
        </CareSection>

        <CareSection title="علامات خطر">
          <ul className="list-disc pr-5">
            {plant.dangerSigns.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </CareSection>

        <CareSection title="نصائح سريعة">
          <ul className="list-disc pr-5">
            {plant.quickTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </CareSection>

        <PrintCareCard plant={plant} />
      </div>
    </div>
  );
}
