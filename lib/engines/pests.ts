import { PESTS } from "@/data/pests";
import type { PestInfo } from "@/data/types";

export type PestAnswerId =
  | "cotton"
  | "webbing"
  | "greenBlack"
  | "tinyMoving"
  | "sticky"
  | "brownScale"
  | "flyingSoil"
  | "whiteFlying";

export const PEST_QUESTIONS: { id: PestAnswerId; label: string }[] = [
  { id: "cotton", label: "فيه حاجة شبه القطن الأبيض؟" },
  { id: "webbing", label: "فيه شبكة رفيعة على الورق؟" },
  { id: "greenBlack", label: "حشرات صغيرة خضرا أو سودا على النمو الجديد؟" },
  { id: "tinyMoving", label: "نقط صغيرة جدًا بتتحرك على الورق؟" },
  { id: "sticky", label: "فيه مادة لزجة على الورق أو الأرض؟" },
  { id: "brownScale", label: "قشور بنية ثابتة على الساق أو الورق؟" },
  { id: "flyingSoil", label: "حشرات طايرة صغيرة حوالين التربة؟" },
  { id: "whiteFlying", label: "فراشات بيضا صغيرة بتطير لما تحرّك الورق؟" },
];

const MAP: Record<PestAnswerId, string[]> = {
  cotton: ["mealybugs"],
  webbing: ["spider-mites"],
  greenBlack: ["aphids"],
  tinyMoving: ["spider-mites", "thrips"],
  sticky: ["aphids", "scale", "whiteflies", "mealybugs"],
  brownScale: ["scale"],
  flyingSoil: ["fungus-gnats"],
  whiteFlying: ["whiteflies"],
};

const ALL_PESTS = Object.values(PESTS);

export function identifyPests(yes: PestAnswerId[]) {
  const scores = new Map<string, number>();
  for (const id of yes) {
    for (const pestId of MAP[id]) {
      const weight = id === "cotton" || id === "brownScale" || id === "flyingSoil" || id === "whiteFlying" ? 3 : 2;
      scores.set(pestId, (scores.get(pestId) ?? 0) + weight);
    }
  }
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id, n]) => ({ pest: ALL_PESTS.find((p) => p.id === id)!, score: n }))
    .filter((x) => x.pest)
    .slice(0, 3);
}

export function pestById(id: string): PestInfo | undefined {
  return ALL_PESTS.find((p) => p.id === id);
}

export function allPests() {
  return ALL_PESTS;
}
