import type { CareTool } from "./types";

export const CARE_TOOLS: CareTool[] = [
  {
    id: "doctor",
    href: "/doctor",
    emoji: "🩺",
    title: "زرعتي فيها مشكلة",
    description: "ساعدني أعرف السبب وإيه اللي أعمله",
    status: "ready",
    consumes: ["problems", "watering", "light", "diagnostics"],
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
    href: "/plant-matcher",
    emoji: "🏡",
    title: "إيه النبات المناسب عندي؟",
    description: "اختار نبات يناسب المكان وطريقة حياتك",
    status: "ready",
    consumes: ["matcher", "light", "safety", "location"],
  },
  {
    id: "watering",
    href: "/watering-checker",
    emoji: "💧",
    title: "أسقي دلوقتي ولا لأ؟",
    description: "اعرف هل نباتك محتاج مياه فعلًا",
    status: "ready",
    consumes: ["watering"],
  },
  {
    id: "soil",
    href: "/soil-mixer",
    emoji: "soil",
    title: "خلطة التربة",
    description: "اعرف أفضل تربة لنباتك",
    status: "ready",
    consumes: ["soil"],
  },
  {
    id: "rescue",
    href: "/emergency",
    emoji: "🚑",
    title: "أنقذ زرعتي",
    description: "خطوات سريعة لو حالة النبات بتسوء",
    status: "ready",
    consumes: ["dangerSigns", "problems"],
  },
  {
    id: "pests",
    href: "/pest-identifier",
    emoji: "🐛",
    title: "إيه الحشرة دي؟",
    description: "حدد الآفة واعرف تتعامل معاها إزاي",
    status: "ready",
    consumes: ["problems.commonPests"],
  },
  {
    id: "location",
    href: "/location-checker",
    emoji: "📍",
    title: "أحط النبات فين؟",
    description: "اختار أفضل مكان للنبات في البيت",
    status: "ready",
    consumes: ["light", "environment", "location"],
  },
  {
    id: "care-cards",
    href: "/care-cards",
    emoji: "🃏",
    title: "بطاقة العناية",
    description: "اطبع صفحة عناية واحدة لنباتك",
    status: "ready",
    consumes: ["quickCard"],
  },
  {
    id: "planner",
    href: "/planner",
    emoji: "📋",
    title: "مخطط العناية",
    description: "صفحات للطباعة تسجّل فيها حالة كل نبات",
    status: "ready",
    consumes: [],
  },
  {
    id: "situations",
    href: "/situations",
    emoji: "❓",
    title: "حصل إيه لزرعتي؟",
    description: "مواقف شائعة وإيه الطبيعي فيها",
    status: "ready",
    consumes: [],
  },
];

export function getToolById(id: string) {
  return CARE_TOOLS.find((tool) => tool.id === id);
}

export const HOME_TOOLS = CARE_TOOLS.filter((tool) =>
  ["doctor", "library", "matcher", "watering", "soil", "rescue", "pests", "location"].includes(tool.id),
);
