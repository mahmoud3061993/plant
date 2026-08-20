import { PESTS } from "@/data/pests";
import { SITUATIONS } from "@/data/situations";
import { SYMPTOMS } from "@/lib/engines/doctor";
import { CAUSE_LABELS } from "@/lib/causes";
import { normalizeSearch } from "@/lib/plants";
import { getAllPlants } from "@/lib/plants";

export type SearchHit = {
  type: "plant" | "problem" | "pest" | "situation";
  href: string;
  title: string;
  snippet: string;
};

export function globalSearch(query: string): SearchHit[] {
  const needle = normalizeSearch(query);
  if (!needle) return [];

  const hits: SearchHit[] = [];

  for (const plant of getAllPlants()) {
    const blob = normalizeSearch(
      [plant.arabicName, plant.englishName, plant.scientificName, plant.shortDescription, ...plant.alsoKnownAs].join(" "),
    );
    if (blob.includes(needle)) {
      hits.push({
        type: "plant",
        href: `/plants/${plant.slug}`,
        title: plant.arabicName,
        snippet: `${plant.englishName} — ${plant.shortDescription}`,
      });
    }
  }

  for (const symptom of SYMPTOMS) {
    if (normalizeSearch(`${symptom.label} اصفرار دبلان حشرات بقع`).includes(needle) || normalizeSearch(symptom.label).includes(needle)) {
      hits.push({
        type: "problem",
        href: "/doctor",
        title: symptom.label,
        snippet: "افتح أداة التشخيص واختار النبات والعَرَض.",
      });
    }
  }

  for (const [id, label] of Object.entries(CAUSE_LABELS)) {
    if (normalizeSearch(label).includes(needle) || needle.includes(normalizeSearch(label))) {
      hits.push({
        type: "problem",
        href: "/doctor",
        title: label,
        snippet: "سبب محتمل داخل أداة «زرعتي فيها مشكلة».",
      });
    }
    void id;
  }

  if (["اصفرار", "اصفر", "ورق اصفر", "yellow"].some((word) => needle.includes(normalizeSearch(word)) || normalizeSearch(word).includes(needle))) {
    hits.push({ type: "problem", href: "/doctor", title: "اصفرار الورق", snippet: "العَرَض ده بيتشخص حسب النبات والتربة والضوء." });
  }
  if (["حشرات بيضا", "قطن", "بق دقيقي", "white"].some((word) => needle.includes(normalizeSearch(word)))) {
    hits.push({ type: "pest", href: "/pest-identifier", title: "حشرات بيضا / قطنية", snippet: "غالبًا بق دقيقي أو ذبابة بيضاء — افتح معرّف الحشرات." });
  }

  for (const pest of Object.values(PESTS)) {
    const blob = normalizeSearch([pest.arabicName, pest.englishName, ...pest.signs, pest.notes].join(" "));
    if (blob.includes(needle)) {
      hits.push({
        type: "pest",
        href: "/pest-identifier",
        title: pest.arabicName,
        snippet: pest.signs[0] ?? pest.notes,
      });
    }
  }

  for (const situation of SITUATIONS) {
    const blob = normalizeSearch([situation.title, ...situation.aliases, situation.happening].join(" "));
    if (blob.includes(needle)) {
      hits.push({
        type: "situation",
        href: `/situations/${situation.id}`,
        title: situation.title,
        snippet: situation.happening,
      });
    }
  }

  const seen = new Set<string>();
  return hits.filter((hit) => {
    const key = `${hit.type}:${hit.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 24);
}
