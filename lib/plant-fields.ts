import type {
  DiagnosticCauseId,
  DirectSunHours,
  DrainageNeed,
  HumidityNeed,
  LightLevel,
  MatureSize,
  MoistureRetention,
  Plant,
  RiskLevel,
  RoomPlacement,
  RoomSuitability,
  SoilComponentId,
  SoilMixPart,
  SoilMoisture,
  StyleTag,
} from "@/data/types";

export const COMPONENT_LABELS: Record<SoilComponentId, string> = {
  "potting-mix": "تربة جاهزة للأصص",
  "garden-soil": "تربة زراعية",
  "peat-moss": "بيتموس",
  perlite: "بيرلايت",
  "coco-peat": "بيت جوز هند",
  "coco-coir": "ألياف جوز هند",
  bark: "لحاء",
  sand: "رمل",
  pumice: "بيوميس",
  compost: "كمبوست / سماد عضوي",
  vermiculite: "فيرميكيوليت",
  charcoal: "فحم نباتي",
};

/** Map imported/specialty ingredients to what Egyptian nurseries actually sell. */
const EGYPT_SUBSTITUTE: Partial<Record<SoilComponentId, SoilComponentId>> = {
  bark: "perlite",
  pumice: "perlite",
  vermiculite: "peat-moss",
  "coco-coir": "coco-peat",
  "potting-mix": "peat-moss",
};

export function egyptizeMix(parts: SoilMixPart[]): SoilMixPart[] {
  const merged = new Map<SoilComponentId, SoilMixPart>();
  for (const part of parts) {
    const component = EGYPT_SUBSTITUTE[part.component] ?? part.component;
    const prev = merged.get(component);
    if (prev) {
      prev.percent += part.percent;
    } else {
      merged.set(component, {
        component,
        percent: part.percent,
        purpose: part.purpose,
      });
    }
  }
  const list = [...merged.values()];
  const total = list.reduce((sum, part) => sum + part.percent, 0) || 1;
  return list.map((part) => ({
    ...part,
    percent: Math.round((part.percent / total) * 100),
  }));
}

export function preferredLight(plant: Plant): LightLevel {
  return plant.light.preferred ?? plant.light.level;
}

export function minimumLight(plant: Plant): LightLevel {
  if (plant.light.minimum) return plant.light.minimum;
  return plant.matcher.lowLightOk ? "low" : preferredLight(plant);
}

export function directSunHours(plant: Plant): DirectSunHours {
  if (plant.light.directSunHours) return plant.light.directSunHours;
  if (!plant.light.directSunTolerance) return "none";
  return preferredLight(plant) === "direct" ? "few" : "morning";
}

export function soilMoisture(plant: Plant): SoilMoisture {
  if (plant.watering.soilMoisture) return plant.watering.soilMoisture;
  if (plant.watering.need === "low") return "dry";
  if (plant.watering.need === "high") return "evenly-moist";
  return "mostly-dry";
}

export function checkDepthCm(plant: Plant): [number, number] {
  if (plant.watering.checkDepthCm) return plant.watering.checkDepthCm;
  if (plant.watering.need === "low") return [5, 8];
  if (plant.watering.need === "high") return [1, 3];
  return [3, 5];
}

export function moistureRetention(plant: Plant): MoistureRetention {
  if (plant.soil.moistureRetention) return plant.soil.moistureRetention;
  if (plant.soil.drainage === "sharp") return "low";
  if (plant.soil.drainage === "moisture-retentive") return "high";
  return "medium";
}

export function mixFromDrainage(drainage: DrainageNeed): SoilMixPart[] {
  if (drainage === "sharp") {
    return [
      { component: "peat-moss", percent: 30, purpose: "أساس خفيف متوفر في المشاتل" },
      { component: "sand", percent: 40, purpose: "صرف سريع زي جو مصر الجاف" },
      { component: "perlite", percent: 30, purpose: "هوا للجذور ومنع الطين" },
    ];
  }
  if (drainage === "moisture-retentive") {
    return [
      { component: "peat-moss", percent: 60, purpose: "بيتموس يحتفظ بندى من غير طين ثقيل" },
      { component: "perlite", percent: 25, purpose: "يمنع الغرق رغم الرطوبة" },
      { component: "compost", percent: 15, purpose: "سماد عضوي خفيف لو التربة فقيرة" },
    ];
  }
  return [
    { component: "peat-moss", percent: 50, purpose: "أساس الأصص في المشاتل المصرية" },
    { component: "perlite", percent: 25, purpose: "صرف وهوا" },
    { component: "sand", percent: 15, purpose: "يخفف البيتموس في الحر" },
    { component: "garden-soil", percent: 10, purpose: "شوية تربة زراعية لو الخلطة خفيفة زيادة" },
  ];
}

export function plantMix(plant: Plant): SoilMixPart[] {
  return egyptizeMix(plant.soil.mix ?? mixFromDrainage(plant.soil.drainage));
}

export function temperatureRange(plant: Plant): { min: number; max: number } {
  return {
    min: plant.environment.temperatureMinC ?? 16,
    max: plant.environment.temperatureMaxC ?? 29,
  };
}

export function isAcSensitive(plant: Plant): boolean {
  return plant.environment.acSensitive ?? plant.environment.humidity === "high";
}

export function isAirflowSensitive(plant: Plant): boolean {
  return plant.environment.airflowSensitive ?? plant.category === "fern";
}

export function matureSize(plant: Plant): MatureSize {
  if (plant.matcher.matureSize) return plant.matcher.matureSize;
  if (plant.category === "palm" || plant.englishName.toLowerCase().includes("fiddle")) {
    return "large";
  }
  return plant.matcher.compact ? "small" : "medium";
}

export function isHanging(plant: Plant): boolean {
  return plant.matcher.hanging ?? plant.category === "trailing";
}

export function isNeglectTolerant(plant: Plant): boolean {
  return (
    plant.matcher.neglectTolerant ??
    (plant.watering.droughtTolerance === "high" && plant.difficulty === "beginner")
  );
}

export function needsFrequentCare(plant: Plant): boolean {
  return (
    plant.matcher.frequentCare ??
    (plant.difficulty === "advanced" || plant.watering.need === "high")
  );
}

export function styleTags(plant: Plant): StyleTag[] {
  if (plant.matcher.styleTags?.length) return plant.matcher.styleTags;
  const tags: StyleTag[] = [];
  if (plant.category === "flowering") tags.push("flowering");
  if (plant.category === "succulent") tags.push("succulent");
  if (plant.category === "cactus") tags.push("cactus");
  if (plant.category === "trailing") tags.push("hanging");
  if (matureSize(plant) === "large") tags.push("statement");
  if (!tags.includes("flowering") && !tags.includes("succulent") && !tags.includes("cactus")) {
    tags.push("foliage");
  }
  return tags;
}

function rank(value: RoomSuitability): number {
  return { excellent: 3, good: 2, possible: 1, poor: 0 }[value];
}

export function defaultLocation(plant: Plant): RoomPlacement {
  const low = plant.matcher.lowLightOk;
  const humid = plant.environment.humidity === "high";
  const sun = plant.light.directSunTolerance || preferredLight(plant) === "direct";
  const outdoorOk = plant.indoorOutdoor === "outdoor" || plant.indoorOutdoor === "both";
  const drought = plant.watering.droughtTolerance === "high";

  const indoorBase: RoomSuitability = plant.indoorOutdoor === "outdoor" ? "poor" : "good";

  return {
    bedroom: low || preferredLight(plant) !== "direct" ? indoorBase : "possible",
    livingRoom: indoorBase === "poor" ? "poor" : "excellent",
    bathroom: humid ? "excellent" : drought ? "possible" : "good",
    kitchen: indoorBase,
    office: low ? "excellent" : preferredLight(plant) === "low" || preferredLight(plant) === "medium" ? "good" : "possible",
    balcony: sun || outdoorOk || preferredLight(plant) === "bright-indirect" ? (sun ? "excellent" : "good") : "possible",
    outdoor: outdoorOk ? (plant.indoorOutdoor === "outdoor" ? "excellent" : "good") : "poor",
  };
}

export function plantLocation(plant: Plant): RoomPlacement {
  return plant.location ?? defaultLocation(plant);
}

export function roomScore(plant: Plant, room: keyof RoomPlacement): RoomSuitability {
  return plantLocation(plant)[room];
}

export function rootRotRisk(plant: Plant): RiskLevel {
  if (plant.diagnostics?.rootRotRisk) return plant.diagnostics.rootRotRisk;
  if (plant.watering.droughtTolerance === "high") return "high";
  if (plant.watering.need === "high") return "medium";
  return "medium";
}

export function sunburnRisk(plant: Plant): RiskLevel {
  if (plant.diagnostics?.sunburnRisk) return plant.diagnostics.sunburnRisk;
  if (plant.light.directSunTolerance && preferredLight(plant) === "direct") return "low";
  if (!plant.light.directSunTolerance) return "high";
  return "medium";
}

export function lowHumidityRisk(plant: Plant): RiskLevel {
  if (plant.diagnostics?.lowHumidityRisk) return plant.diagnostics.lowHumidityRisk;
  if (plant.environment.humidity === "high") return "high";
  if (plant.environment.humidity === "low") return "low";
  return "medium";
}

export function transplantShockRisk(plant: Plant): RiskLevel {
  if (plant.diagnostics?.transplantShockRisk) return plant.diagnostics.transplantShockRisk;
  const name = `${plant.englishName} ${plant.scientificName}`.toLowerCase();
  if (name.includes("ficus") || name.includes("fig")) return "high";
  return plant.difficulty === "advanced" ? "high" : "medium";
}

export function wateringTechnique(plant: Plant) {
  return plant.watering.generalGuidance;
}

export function isPetSafe(plant: Plant) {
  return (
    plant.matcher.petFriendly &&
    plant.safety.cats.status === "safe" &&
    plant.safety.dogs.status === "safe"
  );
}

export function likelyCausesForPlant(plant: Plant): DiagnosticCauseId[] {
  const causes: DiagnosticCauseId[] = [
    "overwatering",
    "underwatering",
    "poor-drainage",
    "insufficient-light",
    "pests",
    "natural-aging",
  ];
  if (rootRotRisk(plant) !== "low") causes.push("root-rot");
  if (sunburnRisk(plant) !== "low") causes.push("too-much-sun");
  if (lowHumidityRisk(plant) !== "low") causes.push("low-humidity");
  if (isAcSensitive(plant)) causes.push("ac-draft");
  causes.push("temperature-stress", "fertilizer-burn", "transplant-shock", "root-bound", "nutrient-deficiency");
  return Array.from(new Set(causes));
}

export function humidityNeed(plant: Plant): HumidityNeed {
  return plant.environment.humidity;
}

export function suitabilityRank(value: RoomSuitability): number {
  return rank(value);
}
