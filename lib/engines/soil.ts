import type { Plant, SoilComponentId } from "@/data/types";
import { COMPONENT_LABELS, plantMix } from "@/lib/plant-fields";

export const ALL_COMPONENTS: SoilComponentId[] = [
  "potting-mix",
  "garden-soil",
  "perlite",
  "pumice",
  "bark",
  "coco-coir",
  "coco-peat",
  "sand",
  "compost",
  "charcoal",
  "vermiculite",
];

const DRAINAGE: SoilComponentId[] = ["perlite", "pumice", "bark", "sand", "charcoal"];
const BASE: SoilComponentId[] = ["potting-mix", "coco-coir", "coco-peat", "vermiculite"];
const HEAVY: SoilComponentId[] = ["garden-soil", "compost"];

export function recommendedMix(plant: Plant) {
  const mix = plantMix(plant);
  return {
    parts: mix.map((part) => ({
      ...part,
      label: COMPONENT_LABELS[part.component],
    })),
    why: plant.soil.suggestedMix,
    notes: plant.soil.alternatives,
    drainage: plant.soil.drainage,
    type: plant.soil.type,
  };
}

export function mixFromAvailable(plant: Plant, available: SoilComponentId[]) {
  const have = new Set(available);
  const rec = plantMix(plant);
  const mapped: { component: SoilComponentId; percent: number; note?: string }[] = [];
  const warnings: string[] = [];
  let remaining = 100;
  const drainNeed = plant.soil.drainage === "sharp";

  const take = (ids: SoilComponentId[], percent: number, note?: string) => {
    const found = ids.find((id) => have.has(id));
    if (!found || percent <= 0) return false;
    mapped.push({ component: found, percent, note });
    remaining -= percent;
    return true;
  };

  const recBase = rec.find((p) => BASE.includes(p.component) || p.component === "potting-mix");
  const recDrain = rec.filter((p) => DRAINAGE.includes(p.component));
  const recOrg = rec.find((p) => p.component === "compost");

  if (recBase) {
    const ok = take(
      have.has(recBase.component)
        ? [recBase.component]
        : ["potting-mix", "coco-coir", "coco-peat", "vermiculite"],
      Math.min(recBase.percent, 55),
      recBase.purpose,
    );
    if (!ok && have.has("garden-soil") && !drainNeed) {
      take(["garden-soil"], 40, "أثقل من المثالي — خفّفها بمادة تصريف.");
      warnings.push("التربة الزراعية أثقل من potting mix. استخدمها بحذر.");
    }
  }

  const drainPct = recDrain.reduce((s, p) => s + p.percent, 0) || (drainNeed ? 45 : 25);
  const drainOk = take(
    recDrain.map((p) => p.component).concat(["perlite", "pumice", "bark", "sand"]),
    Math.min(drainPct, remaining - 10),
  );
  if (!drainOk && drainNeed) {
    return {
      ok: false as const,
      message:
        "المواد اللي عندك مش كافية لنبات محتاج تصريف سريع. لازم على الأقل بيرلايت أو بيوميس أو رمل خشن أو لحاء.",
      parts: [],
      warnings,
    };
  }

  if (recOrg && remaining > 10) {
    take(["compost"], Math.min(10, remaining), "نسبة صغيرة بس.");
  }

  if (remaining > 0 && have.has("potting-mix")) take(["potting-mix"], remaining);
  else if (remaining > 0 && have.has("coco-coir")) take(["coco-coir"], remaining);
  else if (remaining > 5) {
    const last = mapped[0];
    if (last) last.percent += remaining;
  }

  if (
    have.has("garden-soil") &&
    drainNeed &&
    !have.has("perlite") &&
    !have.has("pumice") &&
    !have.has("sand")
  ) {
    return {
      ok: false as const,
      message: "تربة زراعية لوحدها لنبات عصاري أو صبار خطر عفن. ضيف مادة تصريف.",
      parts: [],
      warnings,
    };
  }

  if (mapped.length === 0) {
    return {
      ok: false as const,
      message: "المواد المختارة مش كفاية لعمل خلطة مفيدة. اختار أساس خفيف ومادة تصريف.",
      parts: [],
      warnings,
    };
  }

  const total = mapped.reduce((s, p) => s + p.percent, 0) || 1;
  const parts = mapped.map((p) => ({
    ...p,
    percent: Math.round((p.percent / total) * 100),
    label: COMPONENT_LABELS[p.component],
  }));

  if (parts.some((p) => HEAVY.includes(p.component)) && drainNeed) {
    warnings.push("قلّل التربة الثقيلة لو قدرت، وزوّد التصريف.");
  }

  return {
    ok: true as const,
    parts,
    warnings,
    message: "دي أقرب خلطة آمنة من اللي عندك — مش بديل مثالي ١٠٠٪.",
  };
}
