import type {
  Difficulty,
  DrainageNeed,
  HumidityNeed,
  IndoorOutdoor,
  LightLevel,
  RoomId,
  Toxicity,
  WaterNeed,
} from "@/data/types";

export const LIGHT_LABELS: Record<LightLevel, string> = {
  low: "إضاءة قليلة",
  medium: "إضاءة متوسطة",
  "bright-indirect": "ضوء ساطع غير مباشر",
  direct: "شمس مباشرة",
};

export const WATER_LABELS: Record<WaterNeed, string> = {
  low: "ري قليل",
  moderate: "ري معتدل",
  high: "بتحب تربة أندى",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "سهل للمبتدئين",
  intermediate: "محتاج شوية خبرة",
  advanced: "حساس ومحتاج عناية أدق",
};

export const INDOOR_LABELS: Record<IndoorOutdoor, string> = {
  indoor: "نبات داخلي",
  outdoor: "نبات خارجي",
  both: "داخلي أو شرفة",
};

export const HUMIDITY_LABELS: Record<HumidityNeed, string> = {
  low: "رطوبة منخفضة",
  medium: "رطوبة متوسطة",
  high: "رطوبة عالية",
};

export const DRAINAGE_LABELS: Record<DrainageNeed, string> = {
  sharp: "صرف سريع جدًا",
  good: "صرف جيد",
  "moisture-retentive": "تحتفظ بندى خفيف",
};

export const TOXICITY_LABELS: Record<Toxicity, string> = {
  safe: "غير سام عادةً",
  "mildly-toxic": "قد يسبب ضيق لو اتأكل",
  toxic: "سام لو اتأكل",
};

export const TOXICITY_SHORT: Record<Toxicity, string> = {
  safe: "آمن نسبيًا",
  "mildly-toxic": "غير مناسب للأكل",
  toxic: "يبعد عن الأطفال والحيوانات",
};

export const ROOM_LABELS: Record<RoomId, string> = {
  bedroom: "غرفة نوم",
  livingRoom: "صالون",
  bathroom: "حمام",
  kitchen: "مطبخ",
  office: "مكتب",
  balcony: "بلكونة",
  outdoor: "مساحة خارجية",
};
