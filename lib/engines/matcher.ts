import type { LightLevel, Plant, RoomId } from "@/data/types";
import {
  isHanging,
  isNeglectTolerant,
  isPetSafe,
  matureSize,
  needsFrequentCare,
  plantLocation,
  preferredLight,
  styleTags,
} from "@/lib/plant-fields";

export type MatcherAnswers = {
  room: RoomId;
  light: LightLevel;
  forgets: "often" | "sometimes" | "rarely";
  experience: "first" | "some" | "good";
  pets: "cats" | "dogs" | "both" | "none";
  size: "small" | "medium" | "large" | "any";
  style: "foliage" | "hanging" | "flowering" | "succulent" | "statement" | "any";
  attention: "tough" | "normal" | "hobby";
};

const LIGHT_RANK: Record<string, number> = {
  low: 1,
  medium: 2,
  "bright-indirect": 3,
  direct: 4,
};

export type MatchResult = {
  plant: Plant;
  percent: number;
  reasons: string[];
  warnings: string[];
};

function roomScore(plant: Plant, room: RoomId) {
  const loc = plantLocation(plant)[room];
  if (loc === "excellent") return { n: 24, t: "مناسبة جدًا للمكان اللي اخترته" };
  if (loc === "good") return { n: 18, t: "مناسبة للمكان اللي اخترته" };
  if (loc === "possible") return { n: 8, t: "ممكن في المكان ده مع شوية تعديل" };
  return { n: -22, t: "" };
}

function petSafeFor(plant: Plant, pets: MatcherAnswers["pets"]) {
  if (pets === "none") return true;
  if (!plant.matcher.petFriendly) return false;
  if ((pets === "cats" || pets === "both") && plant.safety.cats.status !== "safe") return false;
  if ((pets === "dogs" || pets === "both") && plant.safety.dogs.status !== "safe") return false;
  return isPetSafe(plant);
}

export function matchPlants(all: Plant[], a: MatcherAnswers): MatchResult[] {
  return all
    .map((plant) => {
      let score = 40;
      const reasons: string[] = [];
      const warnings: string[] = [];

      const rs = roomScore(plant, a.room);
      score += rs.n;
      if (rs.n > 0) reasons.push(rs.t);

      const pref = LIGHT_RANK[preferredLight(plant)] ?? 3;
      const need = LIGHT_RANK[a.light] ?? 3;
      const lightDiff = Math.abs(pref - need);
      if (lightDiff === 0) {
        score += 20;
        reasons.push("مناسبة للإضاءة");
      } else if (lightDiff === 1) {
        score += 10;
        reasons.push("الإضاءة قريبة من احتياجها");
      } else {
        score -= 18;
        warnings.push("الإضاءة اللي اخترتها مش مثالية للنبات ده.");
      }

      if (a.light === "direct" && (preferredLight(plant) === "low" || preferredLight(plant) === "medium")) {
        score -= 16;
        warnings.push("النبات ده مش من النباتات اللي تحب شمس مباشرة قوية.");
      }
      if (a.light === "direct" && !plant.light.directSunTolerance) {
        score -= 14;
        warnings.push("الدليل بيقول النبات ده مش بيستحمل شمس مباشرة.");
      }
      if (a.light === "low" && preferredLight(plant) === "bright-indirect") {
        score -= 10;
      }

      const neglect = isNeglectTolerant(plant);
      const frequent = needsFrequentCare(plant);
      if (a.forgets === "often") {
        if (neglect) {
          score += 16;
          reasons.push("تستحمل نسيان الري");
        } else {
          score -= 18;
          warnings.push("هتحتاج تفتكر الري بانتظام.");
        }
      }
      if (a.forgets === "rarely" && frequent) {
        score += 8;
        reasons.push("هتستفيد من اهتمامك بالري");
      }

      if (a.experience === "first") {
        if (plant.difficulty === "beginner") {
          score += 16;
          reasons.push("مناسبة لمستوى خبرتك");
        } else if (plant.difficulty === "advanced") {
          score -= 22;
          warnings.push("صعبة للمبتدئ.");
        } else score -= 8;
      }
      if (a.experience === "some" && plant.difficulty === "advanced") score -= 8;
      if (a.experience === "good" && plant.difficulty === "advanced") {
        score += 6;
        reasons.push("مناسبة لخبرتك");
      }

      const safe = petSafeFor(plant, a.pets);
      if (a.pets !== "none") {
        if (safe) {
          score += 10;
          reasons.push("أأمن نسبيًا مع الحيوانات (من غير مضغ)");
        } else {
          score -= 8;
          warnings.push("غير مناسبة لو الحيوان الأليف بيمضغ النباتات.");
        }
      }

      const size = matureSize(plant);
      if (a.size !== "any") {
        if (size === a.size) {
          score += 10;
          reasons.push("الحجم مناسب");
        } else if ((a.size === "small" && size === "medium") || (a.size === "large" && size === "medium")) {
          score += 2;
        } else {
          score -= 8;
          warnings.push("الحجم المتوقع مختلف عن اللي طالباه.");
        }
      }

      const tags = styleTags(plant);
      if (a.style === "hanging") {
        if (isHanging(plant) || tags.includes("hanging")) {
          score += 14;
          reasons.push("ينفع معلّق");
        } else score -= 14;
      }
      if (a.style === "flowering" && (tags.includes("flowering") || plant.category === "flowering")) {
        score += 12;
        reasons.push("من النباتات المزهرة");
      } else if (a.style === "flowering") score -= 10;
      if (a.style === "succulent" && (tags.includes("succulent") || tags.includes("cactus"))) {
        score += 14;
        reasons.push("عصاري / صبار");
      } else if (a.style === "succulent") score -= 12;
      if (a.style === "statement" && (tags.includes("statement") || size === "large")) {
        score += 10;
        reasons.push("شكل ديكور واضح");
      }
      if (a.style === "foliage" && (tags.includes("foliage") || plant.category === "foliage")) {
        score += 6;
        reasons.push("نبات ورقي للشكل الأخضر");
      }

      if (a.attention === "tough") {
        if (neglect && plant.difficulty === "beginner") {
          score += 12;
          reasons.push("تستحمل الإهمال النسبي");
        } else if (frequent || plant.difficulty === "advanced") {
          score -= 16;
          warnings.push("محتاجة اهتمام أكتر من اللي ناويه.");
        }
      }
      if (a.attention === "hobby" && (frequent || plant.difficulty !== "beginner")) {
        score += 8;
        reasons.push("فيها مساحة اهتمام");
      }

      const percent = Math.round(Math.max(8, Math.min(97, score)));
      return { plant, percent, reasons: reasons.filter(Boolean).slice(0, 4), warnings };
    })
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);
}
