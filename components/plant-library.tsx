"use client";

import { useMemo, useState } from "react";
import { PlantCard } from "@/components/plant-card";
import type { PlantFilterState, PlantSummary } from "@/data/types";
import { applyPlantFilters } from "@/lib/plants";

const EMPTY_FILTERS: PlantFilterState = {
  query: "",
  lowLight: false,
  brightLight: false,
  lowWater: false,
  beginner: false,
  indoor: false,
  petFriendly: false,
};

const CHIPS: { key: keyof Omit<PlantFilterState, "query">; label: string }[] = [
  { key: "lowLight", label: "🌥 إضاءة قليلة" },
  { key: "brightLight", label: "☀️ إضاءة قوية" },
  { key: "lowWater", label: "💧 ري قليل" },
  { key: "beginner", label: "🌱 مناسب للمبتدئين" },
  { key: "indoor", label: "🏠 نبات داخلي" },
  { key: "petFriendly", label: "🐾 مناسب مع الحيوانات الأليفة" },
];

export function PlantLibrary({ plants }: { plants: PlantSummary[] }) {
  const [filters, setFilters] = useState<PlantFilterState>(EMPTY_FILTERS);

  const results = useMemo(
    () => applyPlantFilters(plants, filters),
    [plants, filters],
  );

  function toggle(key: keyof Omit<PlantFilterState, "query">) {
    setFilters((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div>
      <div className="rounded-[1.75rem] border border-line bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
        <label htmlFor="plant-search" className="mb-2 block text-sm font-bold text-leaf-dark">
          دور على نباتك
        </label>
        <input
          id="plant-search"
          value={filters.query}
          onChange={(event) =>
            setFilters((current) => ({ ...current, query: event.target.value }))
          }
          placeholder="اكتب اسم النبات..."
          className="min-h-12 w-full rounded-2xl border border-line bg-background px-4 text-base outline-none ring-leaf/30 placeholder:text-muted focus:ring-2"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {CHIPS.map((chip) => {
            const active = filters[chip.key];
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => toggle(chip.key)}
                aria-pressed={active}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${
                  active
                    ? "bg-leaf text-white"
                    : "bg-background text-foreground hover:bg-leaf-soft"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        ظاهر {results.length} من {plants.length} نبات
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-[1.5rem] border border-line bg-card p-6 leading-8 text-muted">
          مفيش نبات مطابق للبحث أو الفلتر دلوقتي. جرّب اسم تاني أو شيل فلتر.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
}
