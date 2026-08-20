import type { Plant, RoomId } from "@/data/types";
import { directSunHours, plantLocation, preferredLight } from "@/lib/plant-fields";

export type LocationAnswers = {
  room: RoomId;
  distance: "sill" | "near" | "mid" | "far";
  lightKnown?: "low" | "medium" | "bright" | "unknown";
  direct: "none" | "brief" | "hours";
  hours?: "0" | "1-2" | "3-5" | "6+";
  ac: "yes" | "no";
  humid: "yes" | "no" | "normal";
};

export function checkLocation(plant: Plant, a: LocationAnswers) {
  const loc = plantLocation(plant)[a.room];
  let score = loc === "excellent" ? 74 : loc === "good" ? 64 : loc === "possible" ? 46 : 22;
  const reasons: string[] = [];
  const fixes: string[] = [];

  if (loc === "excellent") reasons.push("الغرفة دي من الأماكن المناسبة للنبات.");
  if (loc === "good") reasons.push("الغرفة مناسبة في العموم.");
  if (loc === "possible") {
    reasons.push("الغرفة ممكن تنفع، بس مش المثالية.");
    fixes.push("ركّز على الضوء والبعد عن التكييف أكتر من نوع الغرفة نفسها.");
  }
  if (loc === "poor") {
    reasons.push("الغرفة دي غالبًا مش مناسبة من غير تعديل كبير.");
    fixes.push("فكّر في غرفة أضوء أو أبعد عن البخار أو الشمس حسب النبات.");
  }

  const prefer = preferredLight(plant);
  const sun = directSunHours(plant);

  if (a.distance === "far" && prefer !== "low") {
    score -= 18;
    reasons.push("بعيد عن الشباك غالبًا ضوء أضعف من احتياج النبات.");
    fixes.push("قرّب من الشباك مع ستارة لو الشمس قاسية.");
  }
  if (a.distance === "sill" && (prefer === "low" || sun === "none")) {
    score -= 16;
    reasons.push("على حافة الشباك ممكن يتحرق.");
    fixes.push("ارجع متر أو حط ستارة خفيفة.");
  }
  if (a.distance === "near" && prefer === "bright-indirect") {
    score += 10;
    reasons.push("قريب من الشباك مناسب للضوء القوي غير المباشر.");
  }

  if (a.direct === "hours" && (sun === "none" || sun === "morning")) {
    score -= 24;
    reasons.push("شمس مباشرة ساعات زيادة على النبات ده.");
    fixes.push("منع الشمس المباشرة بستارة أو مكان أعمق في الغرفة.");
  }
  if (a.direct === "hours" && sun === "few") {
    score -= 8;
    reasons.push("ساعات الشمس أطول من اللي النبات بيستحمله عادةً.");
  }
  if (a.direct === "none" && (sun === "full" || sun === "few") && a.room === "balcony") {
    score -= 8;
    reasons.push("نبات الشمس هيضعف في مكان من غير شمس.");
  }
  if (a.direct === "brief" && (sun === "morning" || sun === "few")) {
    score += 8;
    reasons.push("شمس خفيفة قصيرة مناسبة.");
  }
  if (a.direct === "hours" && !plant.light.directSunTolerance) {
    score -= 12;
    reasons.push("صفحة النبات بتقول إنه مش بيستحمل شمس مباشرة.");
  }

  if (a.hours === "6+" && sun !== "full") {
    score -= 18;
    reasons.push("ساعات شمس كتير.");
  }
  if (a.hours === "0" && prefer === "bright-indirect") {
    score -= 12;
    reasons.push("من غير ضوء حقيقي النبات هيتجهّل.");
  }

  if (a.ac === "yes" && plant.environment.acSensitive) {
    score -= 16;
    reasons.push("التكييف المباشر مضر للنبات ده.");
    fixes.push("حرّك الأصيص بعيد عن مخرج الهواء.");
  }

  if (a.humid === "yes" && plant.environment.humidity === "high") {
    score += 8;
    reasons.push("الرطوبة العالية مناسبة.");
  }
  if (a.humid === "no" && plant.environment.humidity === "high") {
    score -= 10;
    reasons.push("المكان ناشف لنبات بيحب الرطوبة.");
    fixes.push("صينية حصى أو تجميع نباتات أو جهاز ترطيب خفيف.");
  }

  if (a.lightKnown === "low" && prefer === "bright-indirect") score -= 12;
  if (a.lightKnown === "bright" && prefer === "low" && a.direct !== "none") score -= 8;

  score = Math.max(5, Math.min(96, score));
  const verdict = score >= 68 ? "great" : score >= 45 ? "ok" : "bad";
  const title =
    verdict === "great" ? "مكان مناسب جدًا" : verdict === "ok" ? "ممكن مع تعديل" : "المكان مش مناسب";

  return { score, verdict, title, reasons, fixes: [...new Set(fixes)].slice(0, 4) };
}
