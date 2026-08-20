import Link from "next/link";
import { PlantPortrait } from "@/components/plant-portrait";
import type { PlantSummary } from "@/data/types";
import { DIFFICULTY_LABELS, INDOOR_LABELS, LIGHT_LABELS, WATER_LABELS } from "@/lib/labels";

export function PlantCard({ plant }: { plant: PlantSummary }) {
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-leaf/30"
    >
      <PlantPortrait slug={plant.slug} name={plant.arabicName} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h2 className="text-lg font-bold text-leaf-dark">{plant.arabicName}</h2>
          <p className="text-sm text-muted">{plant.englishName}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-leaf-soft px-3 py-1 text-leaf-dark">
            {DIFFICULTY_LABELS[plant.difficulty]}
          </span>
          <span className="rounded-full bg-earth-soft px-3 py-1 text-foreground">
            {LIGHT_LABELS[plant.light.level]}
          </span>
          <span className="rounded-full bg-background px-3 py-1 text-foreground">
            {WATER_LABELS[plant.watering.need]}
          </span>
          <span className="rounded-full border border-line px-3 py-1 text-muted">
            {INDOOR_LABELS[plant.indoorOutdoor]}
          </span>
        </div>
      </div>
    </Link>
  );
}
