import type { Plant, SoilComponentId } from "@/data/types";
import { COMPONENT_LABELS, plantMix } from "@/lib/plant-fields";

/** Materials actually sold in Egyptian nurseries and garden shops. */
export const ALL_COMPONENTS: SoilComponentId[] = [
  "peat-moss",
  "potting-mix",
  "garden-soil",
  "perlite",
  "sand",
  "compost",
  "coco-peat",
  "charcoal",
];

const DRAINAGE: SoilComponentId[] = ["perlite", "sand", "charcoal"];
const BASE: SoilComponentId[] = ["peat-moss", "potting-mix", "coco-peat"];
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

  const recBase = rec.find((p) => BASE.includes(p.component) || p.component === "peat-moss");
  const recDrain = rec.filter((p) => DRAINAGE.includes(p.component));
  const recOrg = rec.find((p) => p.component === "compost");

  if (recBase) {
    const ok = take(
      have.has(recBase.component)
        ? [recBase.component]
        : ["peat-moss", "potting-mix", "coco-peat"],
      Math.min(recBase.percent, 55),
      recBase.purpose,
    );
    if (!ok && have.has("garden-soil") && !drainNeed) {
      take(["garden-soil"], 40, "أثقل من البيتموس — خفّفها برمل أو بيرلايت.");
      warnings.push("التربة الزراعية في مصر غالبًا تقيلة. خفّفيها قبل ما تحطي نبات أصص.");
    }
  }

  const drainPct = recDrain.reduce((s, p) => s + p.percent, 0) || (drainNeed ? 45 : 25);
  const drainOk = take(
    recDrain.map((p) => p.component).concat(["perlite", "sand", "charcoal"]),
    Math.min(drainPct, remaining - 10),
  );
  if (!drainOk && drainNeed) {
    return {
      ok: false as const,
      message:
        "النبات ده محتاج تصريف سريع. من غير بيرلايت أو رمل الخلطة هتتعجن، خصوصًا مع تربة زراعية.",
      parts: [],
      warnings,
    };
  }

  if (recOrg && remaining > 10) {
    take(["compost"], Math.min(10, remaining), "نسبة صغيرة من السماد العضوي.");
  }

  if (remaining > 0 && have.has("peat-moss")) take(["peat-moss"], remaining);
  else if (remaining > 0 && have.has("potting-mix")) take(["potting-mix"], remaining);
  else if (remaining > 0 && have.has("coco-peat")) take(["coco-peat"], remaining);
  else if (remaining > 5) {
    const last = mapped[0];
    if (last) last.percent += remaining;
  }

  if (have.has("garden-soil") && drainNeed && !have.has("perlite") && !have.has("sand")) {
    return {
      ok: false as const,
      message: "تربة زراعية لوحدها للصبار أو العصاريات خطر عفن. لازم رمل أو بيرلايت.",
      parts: [],
      warnings,
    };
  }

  if (mapped.length === 0) {
    return {
      ok: false as const,
      message: "المواد المختارة مش كفاية. اختاري بيتموس أو تربة جاهزة، ويفضّل بيرلايت أو رمل.",
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
    warnings.push("قلّلي التربة الزراعية وزوّدي الرمل أو البيرلايت.");
  }

  return {
    ok: true as const,
    parts,
    warnings,
    message: "الخلطة دي من مواد بتتجاب من المشاتل في مصر — مش مكونات مستوردة صعبة.",
  };
}
