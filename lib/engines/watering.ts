import type { Plant } from "@/data/types";
import { checkDepthCm, soilMoisture, wateringTechnique } from "@/lib/plant-fields";

export type WateringAnswers = {
  surface: "dry" | "damp" | "wet";
  deeper?: "dry" | "damp" | "wet" | "skip";
  leaves: "firm" | "soft" | "crispy" | "yellow";
  drainage: "yes" | "no" | "saucer";
  last: "today" | "few" | "week" | "unknown";
  weather: "hot" | "mild" | "cool";
  light: "strong" | "normal" | "weak";
};

export type WateringVerdict = "water" | "wait" | "too-wet";

export function checkWatering(plant: Plant, a: WateringAnswers) {
  const prefer = soilMoisture(plant);
  const depth = checkDepthCm(plant);
  let wet = 0;
  let dry = 0;
  const reasons: string[] = [];

  if (a.surface === "wet") {
    wet += 3;
    reasons.push("سطح التربة مبلول.");
  }
  if (a.surface === "damp") wet += 1;
  if (a.surface === "dry") {
    dry += 2;
    reasons.push("سطح التربة ناشف.");
  }

  if (a.deeper === "wet") {
    wet += 4;
    reasons.push("التربة الأعمق لسه مبلولة.");
  }
  if (a.deeper === "damp") wet += 1;
  if (a.deeper === "dry") {
    dry += 3;
    reasons.push("التربة الأعمق ناشفة.");
  }

  if (prefer === "dry" && a.surface !== "dry") {
    wet += 2;
    reasons.push("النبات ده يُسقى بعد ما التربة تنشف أكتر من نباتات الأوراق.");
  }
  if (prefer === "evenly-moist" && a.surface === "dry" && a.deeper === "dry") {
    dry += 2;
    reasons.push("النبات ده مش بيحب الجفاف الكامل.");
  }

  if (a.leaves === "crispy") {
    dry += 2;
    reasons.push("الأوراق ناشفة أو مقرمشة علامة عطش أو حرق.");
  }
  if (a.leaves === "soft" && a.surface === "wet") {
    wet += 2;
    reasons.push("أوراق طرية مع تربة مبلولة = غالبًا ري زيادة مش عطش.");
  }
  if (a.leaves === "yellow" && a.surface === "wet") wet += 1;

  if (a.drainage === "no" || a.drainage === "saucer") {
    wet += 1;
    reasons.push("التصريف ضعيف أو المية واقفة — خليك أحذر قبل الري.");
  }

  if (a.last === "today") {
    wet += 2;
    reasons.push("اتسقى قريب. عدد الأيام لوحده مش كافي، بس الري القريب مع تربة مبلولة يعني استنى.");
  }
  if (a.last === "week" && prefer !== "dry") {
    dry += 1;
    reasons.push("مرّ وقت مش قصير من آخر ري، بس القرار لسه من التربة.");
  }

  if (a.weather === "hot" && a.light === "strong") dry += 1;
  if (a.weather === "cool") wet += 1;
  if (a.light === "weak") {
    wet += 1;
    reasons.push("في الضوء الضعيف النبات بيشرب أبطأ.");
  }

  let verdict: WateringVerdict = "wait";
  if (wet >= dry + 3) verdict = "too-wet";
  else if (dry >= wet + 2) verdict = "water";
  else if (prefer === "dry" && a.surface === "dry" && a.deeper !== "wet") verdict = "water";
  else if (prefer === "evenly-moist" && a.surface === "dry" && a.deeper !== "wet") verdict = "water";
  else verdict = "wait";

  const title =
    verdict === "water" ? "اسقي دلوقتي" : verdict === "too-wet" ? "التربة مبلولة زيادة" : "استنى شوية";

  return {
    verdict,
    title,
    reasons,
    technique: wateringTechnique(plant),
    howToCheck: plant.watering.howToCheck,
    depth,
    prefer,
    extra:
      verdict === "too-wet"
        ? "فرّغ الطبق، وحسّن التهوية، ومتسقيش تاني قبل ما العمق المناسب ينشف."
        : verdict === "water"
          ? "اسقي لحد ما المية تخرج من تحت، وبعدين فرّغ الزيادة."
          : `افحص تاني بعد يوم-يومين على عمق حوالي ${depth[0]}–${depth[1]} سم.`,
  };
}
