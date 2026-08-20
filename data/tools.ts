import type { CareTool } from "./types";

/**
 * Tool registry for the product shell.
 *
 * Phase 1 implements the plant library only. Later engines (Plant Doctor,
 * Matcher, Watering Checker, Soil Mixer, Location Checker, Pest Identifier,
 * Emergency Rescue, Quick Care Card) MUST read from `@/lib/plants` instead of
 * duplicating plant facts.
 */
export const CARE_TOOLS: CareTool[] = [
  {
    id: "doctor",
    href: "/tools/doctor",
    emoji: "🩺",
    title: "زرعتي فيها مشكلة",
    description: "ساعدني أعرف السبب وإيه اللي أعمله",
    status: "coming-soon",
    consumes: [
      "problems.commonProblems",
      "problems.rootRotSigns",
      "watering.overwateringSigns",
      "watering.underwateringSigns",
      "dangerSigns",
      "light.level",
    ],
  },
  {
    id: "library",
    href: "/plants",
    emoji: "🌱",
    title: "دليل النباتات",
    description: "اعرف كل حاجة عن نباتك وطريقة العناية بيه",
    status: "ready",
    consumes: ["*"],
  },
  {
    id: "matcher",
    href: "/tools/matcher",
    emoji: "🏡",
    title: "إيه النبات المناسب عندي؟",
    description: "اختار نبات يناسب المكان وطريقة حياتك",
    status: "coming-soon",
    consumes: [
      "matcher",
      "light.level",
      "environment.humidity",
      "difficulty",
      "indoorOutdoor",
      "safety",
    ],
  },
  {
    id: "watering",
    href: "/tools/watering",
    emoji: "💧",
    title: "أسقي دلوقتي ولا لأ؟",
    description: "اعرف هل نباتك محتاج مياه فعلًا",
    status: "coming-soon",
    consumes: [
      "watering.need",
      "watering.howToCheck",
      "watering.droughtTolerance",
      "watering.summerNotes",
      "watering.winterNotes",
    ],
  },
  {
    id: "soil",
    href: "/tools/soil",
    emoji: "🪴",
    title: "خلطة التربة",
    description: "اعرف أفضل تربة لنباتك",
    status: "coming-soon",
    consumes: ["soil.type", "soil.drainage", "soil.suggestedMix", "soil.alternatives"],
  },
  {
    id: "rescue",
    href: "/tools/rescue",
    emoji: "🚑",
    title: "أنقذ زرعتي",
    description: "خطوات سريعة لو حالة النبات بتسوء",
    status: "coming-soon",
    consumes: ["dangerSigns", "problems.rootRotSigns", "commonMistakes"],
  },
  {
    id: "pests",
    href: "/tools/pests",
    emoji: "🐛",
    title: "إيه الحشرة دي؟",
    description: "حدد الآفة واعرف تتعامل معاها إزاي",
    status: "coming-soon",
    consumes: ["problems.commonPests"],
  },
  {
    id: "location",
    href: "/tools/location",
    emoji: "📍",
    title: "أحط النبات فين؟",
    description: "اختار أفضل مكان للنبات في البيت",
    status: "coming-soon",
    consumes: [
      "light.bestPlacement",
      "light.directSunTolerance",
      "environment.temperature",
      "environment.humidity",
      "environment.ventilation",
    ],
  },
];

export function getToolById(id: string) {
  return CARE_TOOLS.find((tool) => tool.id === id);
}

export const COMING_SOON_TOOLS = CARE_TOOLS.filter((tool) => tool.status === "coming-soon");
