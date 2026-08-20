import type { DiagnosticCauseId, Plant, SymptomId } from "@/data/types";
import { CAUSE_DONT, CAUSE_LABELS, CAUSE_SERIOUS, CAUSE_WATCH } from "@/lib/causes";
import {
  likelyCausesForPlant,
  lowHumidityRisk,
  plantLocation,
  preferredLight,
  rootRotRisk,
  sunburnRisk,
  wateringTechnique,
} from "@/lib/plant-fields";

export type FollowupId =
  | "soil"
  | "lastWater"
  | "drainage"
  | "directSun"
  | "leafAge"
  | "smell"
  | "pestsSeen"
  | "moved"
  | "repotted"
  | "fertilized"
  | "fast";

export type Answers = Partial<Record<FollowupId, string>>;

export const SYMPTOMS: { id: SymptomId; label: string; icon: string }[] = [
  { id: "yellow-leaves", label: "الورق بيصفر", icon: "yellow" },
  { id: "wilting", label: "النبات دبلان", icon: "wilt" },
  { id: "leaf-drop", label: "الورق بيقع", icon: "drop" },
  { id: "brown-tips", label: "أطراف الورق بنية", icon: "tips" },
  { id: "spots", label: "بقع بنية أو سودا", icon: "spots" },
  { id: "stunted", label: "النبات مش بيكبر", icon: "stunt" },
  { id: "curling", label: "الورق بيلف", icon: "curl" },
  { id: "pests", label: "فيه حشرات", icon: "bug" },
  { id: "rot-smell", label: "فيه عفن أو ريحة", icon: "smell" },
  { id: "mushy-stem", label: "الساق طرية", icon: "stem" },
  { id: "root-problem", label: "مشكلة في الجذور", icon: "root" },
  { id: "unsure", label: "مش عارف أحدد المشكلة", icon: "unsure" },
];

export const FOLLOWUPS: Record<
  FollowupId,
  { question: string; options: { id: string; label: string }[] }
> = {
  soil: {
    question: "التربة مبلولة ولا ناشفة؟",
    options: [
      { id: "wet", label: "مبلولة أو لزجة" },
      { id: "damp", label: "رطبة شوية ومظبوطة" },
      { id: "dry", label: "ناشفة" },
      { id: "unknown", label: "مش متأكد" },
    ],
  },
  lastWater: {
    question: "آخر مرة سقيت إمتى تقريبًا؟",
    options: [
      { id: "today", label: "النهارده أو امبارح" },
      { id: "few", label: "من ٢–٥ أيام" },
      { id: "week", label: "من أسبوع أو أكتر" },
      { id: "unknown", label: "مش فاكر" },
    ],
  },
  drainage: {
    question: "الأصيص فيه فتحات تصريف؟",
    options: [
      { id: "yes", label: "أيوه، والمية بتخرج" },
      { id: "saucer", label: "فيه فتحات بس المية بتفضل في الطبق" },
      { id: "no", label: "مفيش فتحات" },
      { id: "unknown", label: "مش متأكد" },
    ],
  },
  directSun: {
    question: "النبات بياخد شمس مباشرة؟",
    options: [
      { id: "hours", label: "أيوه، ساعات في اليوم" },
      { id: "little", label: "شوية خفيفة" },
      { id: "none", label: "لا، ضوء غير مباشر" },
      { id: "dark", label: "المكان ضعيف الإضاءة" },
    ],
  },
  leafAge: {
    question: "المشكلة في الأوراق القديمة ولا الجديدة؟",
    options: [
      { id: "old", label: "القديمة من تحت" },
      { id: "new", label: "الجديدة من فوق" },
      { id: "both", label: "الاتنين" },
      { id: "unknown", label: "مش واضح" },
    ],
  },
  smell: {
    question: "فيه ريحة غير طبيعية من التربة أو الجذور؟",
    options: [
      { id: "yes", label: "أيوه، ريحة عفن" },
      { id: "no", label: "لا" },
      { id: "unknown", label: "مش شمت" },
    ],
  },
  pestsSeen: {
    question: "فيه حشرات ظاهرة؟",
    options: [
      { id: "yes", label: "أيوه واضحة" },
      { id: "maybe", label: "حاجة صغيرة مش واثق" },
      { id: "no", label: "لا" },
    ],
  },
  moved: {
    question: "غيّرت مكان النبات مؤخرًا؟",
    options: [
      { id: "yes", label: "أيوه خلال أسبوعين" },
      { id: "no", label: "لا" },
    ],
  },
  repotted: {
    question: "غيّرت الأصيص مؤخرًا؟",
    options: [
      { id: "yes", label: "أيوه خلال أسبوعين" },
      { id: "no", label: "لا" },
    ],
  },
  fertilized: {
    question: "استخدمت سماد مؤخرًا؟",
    options: [
      { id: "yes", label: "أيوه، وجرعة مش قليل" },
      { id: "light", label: "جرعة خفيفة" },
      { id: "no", label: "لا" },
    ],
  },
  fast: {
    question: "المشكلة بتزيد بسرعة؟",
    options: [
      { id: "yes", label: "أيوه خلال أيام" },
      { id: "slow", label: "بتزيد ببطء" },
      { id: "stable", label: "ثابتة تقريبًا" },
    ],
  },
};

export function questionsFor(symptom: SymptomId): FollowupId[] {
  const base: FollowupId[] = ["soil", "drainage"];
  switch (symptom) {
    case "yellow-leaves":
      return [...base, "leafAge", "lastWater", "directSun", "pestsSeen"];
    case "wilting":
      return [...base, "lastWater", "smell", "fast"];
    case "leaf-drop":
      return [...base, "moved", "directSun", "leafAge", "fast"];
    case "brown-tips":
      return ["soil", "directSun", "fertilized", "lastWater"];
    case "spots":
      return [...base, "directSun", "pestsSeen", "leafAge"];
    case "stunted":
      return ["directSun", "repotted", "fertilized", "drainage"];
    case "curling":
      return ["soil", "directSun", "pestsSeen", "lastWater"];
    case "pests":
      return ["pestsSeen", "fast"];
    case "rot-smell":
      return ["soil", "drainage", "smell", "fast"];
    case "mushy-stem":
      return ["soil", "smell", "drainage", "fast"];
    case "root-problem":
      return ["soil", "drainage", "smell", "repotted"];
    default:
      return ["soil", "directSun", "pestsSeen", "moved", "fast"];
  }
}

export type ScoredCause = {
  id: DiagnosticCauseId;
  label: string;
  score: number;
  reasons: string[];
  steps: string[];
  dont: string[];
  watch: string[];
  serious: string[];
};

function add(
  map: Map<DiagnosticCauseId, { score: number; reasons: string[] }>,
  id: DiagnosticCauseId,
  n: number,
  reason: string,
) {
  const cur = map.get(id) ?? { score: 0, reasons: [] };
  cur.score += n;
  if (reason) cur.reasons.push(reason);
  map.set(id, cur);
}

function stepsFor(plant: Plant, cause: DiagnosticCauseId): string[] {
  const loc = plantLocation(plant);
  switch (cause) {
    case "overwatering":
      return [
        "اتأكد إن الأصيص مش واقف في مية.",
        "سيّب التربة تنشف حسب عمق الفحص المناسب للنبات ده.",
        `قبل الري الجاي: ${plant.watering.howToCheck}`,
        "لو التربة ثقيلة جدًا، فكّر في خلطة أخف بعد ما النبات يستقر.",
      ];
    case "underwatering":
      return [
        "اسقي ببطء لحد ما المية تخرج من تحت — مش رشة خفيفة.",
        "بعد ربع ساعة، فرّغ الطبق.",
        wateringTechnique(plant),
      ];
    case "root-rot":
      return [
        "اطلع النبات بهدوء وافحص الجذور.",
        "الجذور السليمة فاتحة وثابتة. اللي طرية وبنية تتشال بمقص نظيف.",
        "انقل لتربة جديدة سريعة التصريف وأصيص فيه فتحات.",
        "ري خفيف جدًا بعد النقل، وبعدين انتظر حسب فحص التربة.",
      ];
    case "too-much-sun":
      return [
        "انقل لمكان ضوء قوي غير مباشر.",
        loc.livingRoom === "excellent" || loc.livingRoom === "good"
          ? "صالون بعيد شوية عن الشباك غالبًا أنسب."
          : "ابحث عن ستارة خفيفة.",
        "سيب الأوراق المحروقة لو لسه فيها أخضر؛ متشيلهاش كلها مرة واحدة.",
      ];
    case "insufficient-light":
      return [
        "قرّب من مصدر ضوء طبيعي من غير شمس حارقة.",
        "لو المكان مظلم، الإضاءة الصناعية للنباتات حل عملي.",
        "قلّل الري شوية لأن النبات في الضوء الضعيف بيشرب أبطأ.",
      ];
    case "low-humidity":
      return [
        "ابعد عن التكييف المباشر.",
        "جرّب صينية حصى ومية تحت الأصيص من غير غمر التربة.",
        "تجميع نباتات محبة للرطوبة جنب بعض بيساعد.",
      ];
    case "ac-draft":
      return ["حرّك النبات بعيد عن مخرج التكييف أو الباب.", "راقب الأوراق اللي كانت مواجهة للهواء."];
    case "fertilizer-burn":
      return [
        "اشطف التربة بري غزير لو في تصريف.",
        "وقف السماد لحد ما النبات يثبت.",
        "بعد أسابيع، ارجع لجرعة أخف من المكتوب على النبات.",
      ];
    case "pests":
      return [
        "اعزل النبات عن الباقي.",
        "امسح الورق بقطعة مبلولة.",
        "استخدم صفحة «إيه الحشرة دي؟» لو لسه مش متأكد من النوع.",
      ];
    case "poor-drainage":
      return [
        "فرّغ أي مية واقفة.",
        "لو مفيش فتحات، انقل لأصيص فيه تصريف.",
        "خلطة التربة مهمّة — استخدم أداة الخلطة.",
      ];
    case "natural-aging":
      return [
        "ورقة أو ورقتين قديمين صفرا حاجة عادية.",
        "ركّز على الأوراق الجديدة: لو سليمة، النبات غالبًا كويس.",
      ];
    case "transplant-shock":
      return ["ثبّت المكان والإضاءة أسبوعين.", "ري حسب التربة مش حسب الخوف.", "متسمّدش دلوقتي."];
    case "root-bound":
      return [
        "لو الجذور بتلف كتير، انقل لمقاس أكبر بدرجة واحدة.",
        "فك الجذور بلطف من غير تكسير عنيف.",
      ];
    case "nutrient-deficiency":
      return ["اتأكد الأول إن الإضاءة والري مظبوطين.", "سماد متوازن مخفف في موسم النمو فقط."];
    default:
      return ["ثبّت الظروف أسبوع وراقب الأوراق الجديدة.", plant.watering.howToCheck];
  }
}

export function diagnose(plant: Plant, symptom: SymptomId, a: Answers): ScoredCause[] {
  const scores = new Map<DiagnosticCauseId, { score: number; reasons: string[] }>();
  const allowed = new Set(likelyCausesForPlant(plant));

  const bump = (id: DiagnosticCauseId, n: number, reason: string) => {
    if (allowed.has(id)) add(scores, id, n, reason);
  };

  if (symptom === "yellow-leaves") {
    bump("overwatering", 18, "الاصفرار شائع مع زيادة الري");
    bump("natural-aging", 8, "الورق القديم ممكن يصفر طبيعي");
    bump("insufficient-light", 10, "الاصفرار ممكن من ضوء ضعيف");
    bump("nutrient-deficiency", 6, "نقص التغذية احتمال أضعف لو باقي الظروف كويسة");
  }
  if (symptom === "wilting") {
    bump("overwatering", 12, "الدبلان بيحصل من زيادة الري كمان مش نقصه بس");
    bump("underwatering", 12, "الدبلان مع تربة ناشفة = عطش");
    bump("root-rot", 10, "الدبلان مع تربة مبلولة ممكن عفن جذور");
  }
  if (symptom === "leaf-drop") {
    bump("transplant-shock", 8, "تساقط الأوراق شائع بعد تغيير مكان أو أصيص");
    bump("ac-draft", 8, "تيار بارد يسقط أوراق");
    bump("underwatering", 6, "العطش الشديد يسقط أوراق");
    bump("overwatering", 6, "الري الزيادة كمان يسقط أوراق");
  }
  if (symptom === "brown-tips") {
    bump("low-humidity", 14, "الأطراف البنية شائعة مع هواء ناشف");
    bump("fertilizer-burn", 8, "السماد الزيادة يحرق الأطراف");
    bump("underwatering", 6, "العطش المزمن يسمّر الأطراف");
    bump("too-much-sun", 5, "الشمس القوية تحرق الأطراف");
  }
  if (symptom === "spots") {
    bump("too-much-sun", 12, "بقع جافة ممكن حرق شمس");
    bump("pests", 10, "بعض الحشرات تسيب بقع");
    bump("overwatering", 6, "بقع مبللة ممكن فطر من الرطوبة الزائدة");
  }
  if (symptom === "stunted") {
    bump("insufficient-light", 14, "ضعف النمو غالبًا ضوء");
    bump("root-bound", 10, "الجذور المزدحمة توقف النمو");
    bump("nutrient-deficiency", 8, "نقص تغذية بعد استبعاد الضوء");
  }
  if (symptom === "curling") {
    bump("underwatering", 10, "الورق بيلف من العطش");
    bump("pests", 10, "العنكبوت الأحمر يلف الورق");
    bump("too-much-sun", 8, "الشمس الزيادة تلف الورق");
    bump("low-humidity", 8, "الهواء الناشف يلف الورق الرقيق");
  }
  if (symptom === "pests") bump("pests", 40, "حشرات ظاهرة");
  if (symptom === "rot-smell") bump("root-rot", 28, "ريحة العفن علامة قوية");
  if (symptom === "mushy-stem") {
    bump("root-rot", 30, "ساق طرية علامة خطيرة");
    bump("overwatering", 16, "زيادة الري تليّن الساق");
  }
  if (symptom === "root-problem") {
    bump("root-rot", 22, "مشكلة جذور معلنة");
    bump("root-bound", 12, "ازدحام جذور وارد");
    bump("poor-drainage", 10, "تصريف ضعيف يدمّر الجذور");
  }
  if (symptom === "unsure") {
    bump("overwatering", 6, "أكتر مشكلة شائعة في البيوت");
    bump("insufficient-light", 6, "الإضاءة الضعيفة شائعة");
    bump("underwatering", 4, "العطش وارد لو التربة ناشفة");
  }

  if (a.soil === "wet") {
    bump("overwatering", 22, "التربة مبلولة دلوقتي");
    bump("root-rot", 12, "الرطوبة المستمرة ترفع خطر العفن");
    bump("poor-drainage", 8, "البلل المستمر قد يكون من تصريف ضعيف");
  }
  if (a.soil === "dry") {
    bump("underwatering", 22, "التربة ناشفة");
    bump("overwatering", -16, "التربة الناشفة تقلل احتمال زيادة الري");
    bump("root-rot", -10, "العفن أقل احتمال مع تربة ناشفة ظاهرية");
  }

  if (a.lastWater === "today" && a.soil !== "dry") bump("overwatering", 8, "ري قريب مع تربة مش ناشفة");
  if (a.lastWater === "week") bump("underwatering", 10, "آخر ري من أسبوع أو أكتر");

  if (a.drainage === "no") bump("poor-drainage", 20, "مفيش فتحات تصريف");
  if (a.drainage === "saucer") bump("poor-drainage", 12, "المية واقفة في الطبق");
  if (a.drainage === "yes") bump("poor-drainage", -6, "في تصريف");

  if (a.directSun === "hours") {
    bump("too-much-sun", sunburnRisk(plant) === "high" ? 22 : 10, "شمس مباشرة ساعات");
  }
  if (a.directSun === "dark") bump("insufficient-light", 18, "المكان ضعيف الإضاءة");
  if (preferredLight(plant) === "low" && a.directSun === "hours") {
    bump("too-much-sun", 8, "النبات ده حساس للشمس");
  }

  if (a.leafAge === "old") bump("natural-aging", 14, "المشكلة في الورق القديم");
  if (a.leafAge === "new") {
    bump("natural-aging", -12, "الورق الجديد متأثر — مش مجرد شيخوخة");
    bump("nutrient-deficiency", 8, "الورق الجديد يتأثر بنقص عناصر");
    bump("pests", 6, "الحشرات تحب النمو الجديد");
  }

  if (a.smell === "yes") bump("root-rot", 24, "ريحة عفن");
  if (a.pestsSeen === "yes") bump("pests", 28, "حشرات ظاهرة");
  if (a.pestsSeen === "maybe") bump("pests", 10, "علامات حشرية محتملة");
  if (a.moved === "yes") bump("transplant-shock", 14, "اتنقل مؤخرًا");
  if (a.repotted === "yes") bump("transplant-shock", 18, "اتغيّر الأصيص مؤخرًا");
  if (a.fertilized === "yes") bump("fertilizer-burn", 20, "سماد قريب بجرعة كبيرة");
  if (a.fast === "yes") {
    bump("root-rot", 8, "التدهور السريع يرفع جدية المشكلة");
    bump("pests", 6, "بعض الإصابات بتزيد بسرعة");
  }

  if (rootRotRisk(plant) === "high" && a.soil === "wet") bump("root-rot", 8, "النبات حساس لعفن الجذور");
  if (lowHumidityRisk(plant) === "high") {
    bump("low-humidity", 6, "النبات محتاج رطوبة أعلى من جو البيت العادي");
  }
  if (plant.environment.acSensitive && a.moved === "yes") {
    bump("ac-draft", 6, "حساس للتكييف واتنقل مؤخرًا");
  }

  const values = [...scores.values()];
  const max = Math.max(...values.map((s) => s.score), 1);
  return [...scores.entries()]
    .map(([id, v]) => ({
      id,
      label: CAUSE_LABELS[id],
      score: v.score,
      reasons: v.reasons,
      steps: stepsFor(plant, id),
      dont: CAUSE_DONT[id],
      watch: CAUSE_WATCH[id],
      serious: CAUSE_SERIOUS[id],
      level: v.score / max,
    }))
    .filter((x) => x.score > 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ level, ...rest }) => ({
      ...rest,
      score: Math.round(
        Math.min(96, Math.max(28, level * 88 + (rest.id === "pests" && a.pestsSeen === "yes" ? 8 : 0))),
      ),
    }));
}

export function confidenceLabel(score: number) {
  if (score >= 75) return "احتمال مرتفع";
  if (score >= 55) return "احتمال متوسط";
  return "احتمال وارد";
}

export function distinguish(primary: ScoredCause, secondary: ScoredCause) {
  const ids = new Set([primary.id, secondary.id]);
  if (ids.has("overwatering") && ids.has("underwatering")) {
    return "افحص التربة على العمق المناسب: لو مبلولة فزيادة الري أقرب، ولو ناشفة فالعطش أقرب.";
  }
  if (ids.has("overwatering") && ids.has("root-rot")) {
    return "ريحة العفن أو جذور طرية بنية تميّز العفن عن مجرد ري زيادة.";
  }
  if (ids.has("too-much-sun") && ids.has("pests")) {
    return "حرق الشمس ثابت ومش بيتحرك. الحشرات بتبان تحت الورق أو مع لزوجه/قطن/شبكة.";
  }
  if (ids.has("low-humidity") && ids.has("fertilizer-burn")) {
    return "لو سمّدت قريب والشطف ممكن يهدّي الحواف، السماد أقرب. لو التكييف ناشف من غير تسميد، الرطوبة أقرب.";
  }
  if (ids.has("insufficient-light") && ids.has("root-bound")) {
    return "لو المية بتنزل بسرعة والجذور خارجة من تحت، الأصيص زحمة. لو السيقان بتطول والورق صغير، الضوء أضعف.";
  }
  if (ids.has("pests") && ids.has("low-humidity")) {
    return "العنكبوت الأحمر بيحب الهوا الناشف. لو في شبكة أو نقط بتتحرك، الحشرة موجودة مش مجرد جفاف.";
  }
  if (ids.has("natural-aging") && ids.has("overwatering")) {
    return "لو الصفرة في ورق قديم من تحت بس والجديد سليم، غالبًا طبيعة. لو الجديد كمان أصفر والتربة مبلولة، الري الزيادة أقرب.";
  }
  return "راقب التربة، مكان الضوء، وسرعة التغير خلال يومين: الحاجة اللي بتزيد هي اللي تميّز السبب.";
}
