import { PLANTS } from "@/data/plants";
import type { Plant, PlantFilterState, PlantSummary } from "@/data/types";

const ARABIC_DIACRITICS = /[\u064B-\u065F\u0670]/g;

export function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .replace(ARABIC_DIACRITICS, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function plantSearchBlob(plant: Pick<PlantSummary, "arabicName" | "englishName" | "scientificName" | "shortDescription" | "alsoKnownAs">) {
  return normalizeSearch(
    [
      plant.arabicName,
      plant.englishName,
      plant.scientificName,
      plant.shortDescription,
      ...plant.alsoKnownAs,
    ].join(" "),
  );
}

export function toPlantSummary(plant: Plant): PlantSummary {
  return {
    id: plant.id,
    slug: plant.slug,
    arabicName: plant.arabicName,
    englishName: plant.englishName,
    scientificName: plant.scientificName,
    alsoKnownAs: plant.alsoKnownAs,
    shortDescription: plant.shortDescription,
    difficulty: plant.difficulty,
    indoorOutdoor: plant.indoorOutdoor,
    visual: plant.visual,
    matcher: plant.matcher,
    light: { level: plant.light.level },
    watering: { need: plant.watering.need },
  };
}

export function getAllPlants(): Plant[] {
  return PLANTS;
}

export function getPlantBySlug(slug: string): Plant | undefined {
  return PLANTS.find((plant) => plant.slug === slug);
}

export function getPlantById(id: string): Plant | undefined {
  return PLANTS.find((plant) => plant.id === id);
}

export function getBeginnerPlants(limit = 4): Plant[] {
  return PLANTS.filter((plant) => plant.matcher.beginnerFriendly).slice(0, limit);
}

export function getPlantSummaries(): PlantSummary[] {
  return PLANTS.map(toPlantSummary);
}

export function searchPlants<T extends PlantSummary>(
  query: string,
  plants: T[] = PLANTS as T[],
): T[] {
  const needle = normalizeSearch(query);
  if (!needle) return plants;

  return plants.filter((plant) => plantSearchBlob(plant).includes(needle));
}

export function isPetFriendly(plant: { matcher: { petFriendly: boolean } }) {
  return plant.matcher.petFriendly;
}

export function applyPlantFilters<T extends PlantSummary>(
  plants: T[],
  filters: PlantFilterState,
): T[] {
  let result = searchPlants(filters.query, plants);

  if (filters.lowLight) {
    result = result.filter((plant) => plant.matcher.lowLightOk);
  }
  if (filters.brightLight) {
    result = result.filter(
      (plant) =>
        plant.light.level === "bright-indirect" || plant.light.level === "direct",
    );
  }
  if (filters.lowWater) {
    result = result.filter((plant) => plant.watering.need === "low");
  }
  if (filters.beginner) {
    result = result.filter((plant) => plant.matcher.beginnerFriendly);
  }
  if (filters.indoor) {
    result = result.filter(
      (plant) => plant.indoorOutdoor === "indoor" || plant.indoorOutdoor === "both",
    );
  }
  if (filters.petFriendly) {
    result = result.filter(isPetFriendly);
  }

  return result;
}

/** Future Plant Matcher / Location Checker helpers */
export function getPlantsForLowLight() {
  return PLANTS.filter((plant) => plant.matcher.lowLightOk);
}

export function getLowWaterPlants() {
  return PLANTS.filter((plant) => plant.watering.need === "low");
}

export function getPetFriendlyPlants() {
  return PLANTS.filter(isPetFriendly);
}

export function getPlantsByPest(pestId: string) {
  return PLANTS.filter((plant) =>
    plant.problems.commonPests.some((pest) => pest.id === pestId),
  );
}
