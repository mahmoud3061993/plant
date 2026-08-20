"use client";

import { useMemo, useState } from "react";
import { PlantPortrait } from "@/components/plant-portrait";
import type { Plant } from "@/data/types";
import { getAllPlants, searchPlants } from "@/lib/plants";

export function PlantPicker({
  onSelect,
  title = "اختار النبات",
}: {
  onSelect: (plant: Plant) => void;
  title?: string;
}) {
  const [query, setQuery] = useState("");
  const plants = useMemo(() => searchPlants(query, getAllPlants()), [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-leaf-dark">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-muted">دور بالعربي أو الإنجليزي، أو اختار من الصور.</p>
      <label htmlFor="picker-search" className="sr-only">
        بحث عن نبات
      </label>
      <input
        id="picker-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="مونستيرا، بوتس، Snake Plant..."
        className="mt-4 min-h-12 w-full rounded-2xl border border-line bg-card px-4 text-base outline-none ring-leaf/30 placeholder:text-muted focus:ring-2"
      />
      <p className="mt-3 text-xs text-muted">{plants.length} نبات</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {plants.slice(0, 60).map((plant) => (
          <button
            key={plant.id}
            type="button"
            onClick={() => onSelect(plant)}
            className="overflow-hidden rounded-[1.5rem] border border-line bg-card text-right shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-leaf/30"
          >
            <PlantPortrait
              slug={plant.slug}
              name={plant.arabicName}
              emoji={plant.visual.emoji}
              hue={plant.visual.hue}
            />
            <span className="block p-3">
              <span className="block text-sm font-bold text-leaf-dark">{plant.arabicName}</span>
              <span className="block text-xs text-muted">{plant.englishName}</span>
            </span>
          </button>
        ))}
      </div>
      {plants.length > 60 ? (
        <p className="mt-4 text-sm text-muted">ضيّق البحث عشان تشوف الباقي أسرع.</p>
      ) : null}
    </div>
  );
}
