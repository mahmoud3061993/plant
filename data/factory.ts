import { pest } from "@/data/pests";
import type {
  DiagnosticCauseId,
  Difficulty,
  DrainageNeed,
  HumidityNeed,
  IndoorOutdoor,
  LightLevel,
  MatureSize,
  Plant,
  PlantCategory,
  RiskLevel,
  RoomPlacement,
  SoilMixPart,
  StyleTag,
  Toxicity,
  WaterNeed,
} from "@/data/types";
import { COMPONENT_LABELS, mixFromDrainage } from "@/lib/plant-fields";

export type CareProfileId =
  | "aroid-easy"
  | "aroid-humidity"
  | "drought-foliage"
  | "succulent"
  | "cactus-desert"
  | "cactus-jungle"
  | "fern"
  | "palm"
  | "prayer"
  | "ficus"
  | "flowering-easy"
  | "hoya"
  | "peperomia"
  | "balcony-sun"
  | "orchid"
  | "bromeliad"
  | "easy-foliage";

interface ProfileDefaults {
  category: PlantCategory;
  difficulty: Difficulty;
  indoorOutdoor: IndoorOutdoor;
  light: LightLevel;
  lowLightOk: boolean;
  directSun: boolean;
  water: WaterNeed;
  drought: "low" | "medium" | "high";
  drainage: DrainageNeed;
  humidity: HumidityNeed;
  hanging: boolean;
  neglect: boolean;
  frequent: boolean;
  rootRot: RiskLevel;
  sunburn: RiskLevel;
  humidityRisk: RiskLevel;
  transplant: RiskLevel;
  acSensitive: boolean;
  soilType: string;
  mix?: SoilMixPart[];
  pests: Array<"spiderMites" | "mealybugs" | "fungusGnats" | "scale" | "aphids" | "thrips" | "whiteflies">;
}

const PROFILES: Record<CareProfileId, ProfileDefaults> = {
  "aroid-easy": {
    category: "trailing",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    light: "medium",
    lowLightOk: true,
    directSun: false,
    water: "moderate",
    drought: "medium",
    drainage: "good",
    humidity: "medium",
    hanging: true,
    neglect: true,
    frequent: false,
    rootRot: "medium",
    sunburn: "high",
    humidityRisk: "medium",
    transplant: "low",
    acSensitive: false,
    soilType: "خلطة آرويد خفيفة",
    pests: ["mealybugs", "spiderMites", "fungusGnats"],
  },
  "aroid-humidity": {
    category: "foliage",
    difficulty: "advanced",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: false,
    water: "moderate",
    drought: "low",
    drainage: "good",
    humidity: "high",
    hanging: false,
    neglect: false,
    frequent: true,
    rootRot: "high",
    sunburn: "high",
    humidityRisk: "high",
    transplant: "high",
    acSensitive: true,
    soilType: "خلطة هوائية خشنة",
    pests: ["spiderMites", "thrips", "mealybugs"],
  },
  "drought-foliage": {
    category: "upright",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    light: "low",
    lowLightOk: true,
    directSun: true,
    water: "low",
    drought: "high",
    drainage: "sharp",
    humidity: "low",
    hanging: false,
    neglect: true,
    frequent: false,
    rootRot: "high",
    sunburn: "medium",
    humidityRisk: "low",
    transplant: "low",
    acSensitive: false,
    soilType: "تربة سريعة الصرف",
    pests: ["mealybugs", "scale"],
  },
  succulent: {
    category: "succulent",
    difficulty: "beginner",
    indoorOutdoor: "both",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: true,
    water: "low",
    drought: "high",
    drainage: "sharp",
    humidity: "low",
    hanging: false,
    neglect: true,
    frequent: false,
    rootRot: "high",
    sunburn: "medium",
    humidityRisk: "low",
    transplant: "low",
    acSensitive: false,
    soilType: "خلطة عصاريات",
    pests: ["mealybugs", "scale"],
  },
  "cactus-desert": {
    category: "cactus",
    difficulty: "beginner",
    indoorOutdoor: "both",
    light: "direct",
    lowLightOk: false,
    directSun: true,
    water: "low",
    drought: "high",
    drainage: "sharp",
    humidity: "low",
    hanging: false,
    neglect: true,
    frequent: false,
    rootRot: "high",
    sunburn: "low",
    humidityRisk: "low",
    transplant: "low",
    acSensitive: false,
    soilType: "خلطة صبار حصوية",
    pests: ["mealybugs", "scale"],
  },
  "cactus-jungle": {
    category: "cactus",
    difficulty: "intermediate",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: false,
    water: "moderate",
    drought: "medium",
    drainage: "good",
    humidity: "medium",
    hanging: true,
    neglect: false,
    frequent: false,
    rootRot: "medium",
    sunburn: "high",
    humidityRisk: "medium",
    transplant: "medium",
    acSensitive: false,
    soilType: "خلطة خفيفة للصبار الغابي",
    pests: ["mealybugs", "fungusGnats"],
  },
  fern: {
    category: "fern",
    difficulty: "advanced",
    indoorOutdoor: "indoor",
    light: "medium",
    lowLightOk: false,
    directSun: false,
    water: "high",
    drought: "low",
    drainage: "moisture-retentive",
    humidity: "high",
    hanging: true,
    neglect: false,
    frequent: true,
    rootRot: "medium",
    sunburn: "high",
    humidityRisk: "high",
    transplant: "medium",
    acSensitive: true,
    soilType: "تربة خفيفة تحتفظ بندى",
    pests: ["spiderMites", "scale"],
  },
  palm: {
    category: "palm",
    difficulty: "intermediate",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: false,
    water: "moderate",
    drought: "low",
    drainage: "good",
    humidity: "medium",
    hanging: false,
    neglect: false,
    frequent: false,
    rootRot: "medium",
    sunburn: "medium",
    humidityRisk: "medium",
    transplant: "high",
    acSensitive: true,
    soilType: "تربة نخيل خفيفة",
    pests: ["spiderMites", "scale", "mealybugs"],
  },
  prayer: {
    category: "foliage",
    difficulty: "advanced",
    indoorOutdoor: "indoor",
    light: "medium",
    lowLightOk: false,
    directSun: false,
    water: "high",
    drought: "low",
    drainage: "moisture-retentive",
    humidity: "high",
    hanging: false,
    neglect: false,
    frequent: true,
    rootRot: "medium",
    sunburn: "high",
    humidityRisk: "high",
    transplant: "medium",
    acSensitive: true,
    soilType: "تربة خفيفة نديّة",
    pests: ["spiderMites", "thrips"],
  },
  ficus: {
    category: "upright",
    difficulty: "intermediate",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: false,
    water: "moderate",
    drought: "medium",
    drainage: "good",
    humidity: "medium",
    hanging: false,
    neglect: false,
    frequent: false,
    rootRot: "medium",
    sunburn: "medium",
    humidityRisk: "medium",
    transplant: "high",
    acSensitive: true,
    soilType: "تربة شجر داخلي",
    pests: ["scale", "spiderMites", "mealybugs"],
  },
  "flowering-easy": {
    category: "flowering",
    difficulty: "intermediate",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: false,
    water: "moderate",
    drought: "medium",
    drainage: "good",
    humidity: "medium",
    hanging: false,
    neglect: false,
    frequent: false,
    rootRot: "medium",
    sunburn: "high",
    humidityRisk: "medium",
    transplant: "medium",
    acSensitive: false,
    soilType: "تربة أصص جيدة الصرف",
    pests: ["aphids", "mealybugs", "spiderMites"],
  },
  hoya: {
    category: "trailing",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: false,
    water: "low",
    drought: "high",
    drainage: "good",
    humidity: "medium",
    hanging: true,
    neglect: true,
    frequent: false,
    rootRot: "high",
    sunburn: "medium",
    humidityRisk: "low",
    transplant: "low",
    acSensitive: false,
    soilType: "خلطة خفيفة مع لحاء",
    pests: ["mealybugs", "aphids"],
  },
  peperomia: {
    category: "foliage",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    light: "medium",
    lowLightOk: true,
    directSun: false,
    water: "low",
    drought: "high",
    drainage: "good",
    humidity: "medium",
    hanging: false,
    neglect: true,
    frequent: false,
    rootRot: "high",
    sunburn: "high",
    humidityRisk: "medium",
    transplant: "low",
    acSensitive: false,
    soilType: "تربة خفيفة سريعة الصرف",
    pests: ["mealybugs", "fungusGnats"],
  },
  "balcony-sun": {
    category: "flowering",
    difficulty: "intermediate",
    indoorOutdoor: "both",
    light: "direct",
    lowLightOk: false,
    directSun: true,
    water: "moderate",
    drought: "medium",
    drainage: "good",
    humidity: "low",
    hanging: false,
    neglect: false,
    frequent: false,
    rootRot: "medium",
    sunburn: "low",
    humidityRisk: "low",
    transplant: "medium",
    acSensitive: false,
    soilType: "تربة أصص للشمس",
    pests: ["aphids", "whiteflies", "spiderMites"],
  },
  orchid: {
    category: "flowering",
    difficulty: "intermediate",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: false,
    directSun: false,
    water: "moderate",
    drought: "medium",
    drainage: "sharp",
    humidity: "high",
    hanging: false,
    neglect: false,
    frequent: false,
    rootRot: "high",
    sunburn: "high",
    humidityRisk: "medium",
    transplant: "medium",
    acSensitive: true,
    soilType: "خلطة خفيفة للأوركيد من مواد موجودة في مصر",
    mix: [
      { component: "perlite", percent: 50, purpose: "هوا للجذور بدل اللحاء المستورد" },
      { component: "charcoal", percent: 20, purpose: "يفك الخلطة ويقلل العفن" },
      { component: "peat-moss", percent: 30, purpose: "ندى خفيف من غير طين" },
    ],
    pests: ["mealybugs", "scale", "thrips"],
  },
  bromeliad: {
    category: "flowering",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    light: "bright-indirect",
    lowLightOk: true,
    directSun: false,
    water: "moderate",
    drought: "medium",
    drainage: "good",
    humidity: "medium",
    hanging: false,
    neglect: true,
    frequent: false,
    rootRot: "medium",
    sunburn: "high",
    humidityRisk: "medium",
    transplant: "low",
    acSensitive: false,
    soilType: "خلطة خفيفة بروميليد",
    pests: ["scale", "mealybugs"],
  },
  "easy-foliage": {
    category: "foliage",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    light: "medium",
    lowLightOk: true,
    directSun: false,
    water: "moderate",
    drought: "medium",
    drainage: "good",
    humidity: "medium",
    hanging: false,
    neglect: true,
    frequent: false,
    rootRot: "medium",
    sunburn: "high",
    humidityRisk: "medium",
    transplant: "low",
    acSensitive: false,
    soilType: "تربة أصص خفيفة",
    pests: ["spiderMites", "mealybugs"],
  },
};

export interface PlantDraft {
  slug: string;
  arabicName: string;
  englishName: string;
  scientificName: string;
  alsoKnownAs?: string[];
  profile: CareProfileId;
  shortDescription: string;
  emoji: string;
  hue: number;
  category?: PlantCategory;
  difficulty?: Difficulty;
  indoorOutdoor?: IndoorOutdoor;
  light?: LightLevel;
  petFriendly: boolean;
  childStatus?: Toxicity;
  hanging?: boolean;
  size?: MatureSize;
  styleTags?: StyleTag[];
  location?: Partial<RoomPlacement>;
  mistakes: string[];
  tips: string[];
  warning: string;
  toxicityNote?: string;
}

function lightCopy(level: LightLevel, direct: boolean, name: string) {
  const preferred =
    level === "low"
      ? `${name} بيعيش في إضاءة قليلة، وشكله أحسن لو الضوء متوسط غير مباشر.`
      : level === "medium"
        ? `${name} بيحب ضوء متوسط إلى ساطع غير مباشر. الشمس القوية بتحرق الورق.`
        : level === "direct"
          ? `${name} محتاج ضوء قوي، وشمس مباشرة لطيفة بتساعده. زوّد الضوء بالتدريج.`
          : `${name} بيحب ضوء ساطع غير مباشر. الشمس المباشرة القوية عادةً بتسبب حروق.`;
  const place =
    level === "direct"
      ? "شباك شرق أو جنوب، أو بلكونة مضيئة."
      : level === "low"
        ? "ركن صالة أو مكتب فيه ضوء نهار، مش دُرج مقفول."
        : "جنب شباك بستارة خفيفة، بعيد عن شمس الظهر.";
  return { explanation: preferred + (direct ? "" : " تجنب الشمس المباشرة القوية."), bestPlacement: place };
}

function waterCopy(need: WaterNeed, name: string) {
  if (need === "low") {
    return {
      generalGuidance: `${name} بيخزن مياه في الورق أو الساق. الغرق أخطر من العطش.`,
      howToCheck: "افحص التربة لعمق أكبر. اسقِ بعد ما أغلب الأصيص ينشف، وصرّف المياه الزيادة تمامًا.",
    };
  }
  if (need === "high") {
    return {
      generalGuidance: `${name} بيحب تربة ندية باعتدال. لا تسيبها تنشف عضم، ولا تخلّيها مستنقع.`,
      howToCheck: "افحص السطح. لو ناشف خفيف، اسقِ وصرّف. لو مبلول، استنى.",
    };
  }
  return {
    generalGuidance: `${name} يتسقي بعد فحص التربة، مش حسب عدد أيام ثابت.`,
    howToCheck: "افحص أول 3–5 سم. لو ناشفة اسقِ حتى الصرف، ولو ندية استنى.",
  };
}

export function createPlant(draft: PlantDraft): Plant {
  const profile = PROFILES[draft.profile];
  const light = draft.light ?? profile.light;
  const lighting = lightCopy(light, profile.directSun, draft.arabicName);
  const watering = waterCopy(profile.water, draft.arabicName);
  const mix = profile.mix ?? mixFromDrainage(profile.drainage);
  const hanging = draft.hanging ?? profile.hanging;
  const size = draft.size ?? (profile.category === "palm" ? "large" : hanging ? "small" : "medium");
  const pet = draft.petFriendly;
  const tox: Toxicity = pet ? "safe" : "toxic";
  const toxNote =
    draft.toxicityNote ??
    (pet
      ? "عادةً غير سام، مع إن المضغ الزائد ممكن يضايق المعدة. الشوك أو التربة مش للأكل."
      : "سام لو اتأكل. خليه بعيد عن الأطفال والحيوانات اللي بتمضغ ورق.");

  const suggestedMix = mix
    .map((part) => `${part.percent}% ${COMPONENT_LABELS[part.component]}`)
    .join(" + ");

  return {
    id: draft.slug,
    slug: draft.slug,
    arabicName: draft.arabicName,
    englishName: draft.englishName,
    scientificName: draft.scientificName,
    alsoKnownAs: draft.alsoKnownAs ?? [],
    category: draft.category ?? profile.category,
    difficulty: draft.difficulty ?? profile.difficulty,
    indoorOutdoor: draft.indoorOutdoor ?? profile.indoorOutdoor,
    shortDescription: draft.shortDescription,
    visual: { emoji: draft.emoji, hue: draft.hue, leafStyle: "oval" },
    light: {
      level: light,
      minimum: profile.lowLightOk ? "low" : light === "direct" ? "bright-indirect" : light,
      preferred: light,
      directSunTolerance: profile.directSun,
      directSunHours: profile.directSun ? (light === "direct" ? "few" : "morning") : "none",
      explanation: lighting.explanation,
      bestPlacement: lighting.bestPlacement,
    },
    watering: {
      need: profile.water,
      droughtTolerance: profile.drought,
      soilMoisture: profile.water === "low" ? "dry" : profile.water === "high" ? "evenly-moist" : "mostly-dry",
      checkDepthCm: profile.water === "low" ? [5, 8] : profile.water === "high" ? [1, 3] : [3, 5],
      generalGuidance: watering.generalGuidance,
      howToCheck: watering.howToCheck,
      overwateringSigns: ["ورق أصفر طري", "تربة تفضل مبلولة", "رائحة كريهة أحيانًا"],
      underwateringSigns: ["ورق ناشف أو منكمش", "أطراف بنية", "نمو واقف"],
      summerNotes: "في الحر افحص التربة أكتر، من غير جدول أعمى.",
      winterNotes: "في الشتا قلل الري لأن التربة بتفضل ندية أطول.",
    },
    soil: {
      type: profile.soilType,
      drainage: profile.drainage,
      moistureRetention: profile.drainage === "sharp" ? "low" : profile.drainage === "moisture-retentive" ? "high" : "medium",
      suggestedMix: `نِسَب تقريبية: ${suggestedMix}. عدّل حسب حجم الأصيص والجو.`,
      alternatives: ["بدّل البيرلايت برمل لو مش متوفر.", "ما تستخدميش تربة زراعية تقيلة لوحدها من غير تخفيف."],
      mix,
    },
    fertilizing: {
      frequency: "كل 4–6 أسابيع في موسم النمو بتركيز خفيف",
      season: "الربيع والصيف",
      notes: "التسميد مش هيصلح ضوء وحش أو ري غلط. في الشتا غالبًا مش محتاج.",
    },
    environment: {
      temperature: "تقريبًا 16–29°م حسب النوع، بعيد عن صقيع.",
      temperatureMinC: 16,
      temperatureMaxC: 29,
      humidity: profile.humidity,
      humidityNotes:
        profile.humidity === "high"
          ? "الرطوبة العالية فارقة. التكييف الجاف بيضعف الأطراف."
          : profile.humidity === "low"
            ? "رطوبة البيت العادية أو الجافة مناسبة."
            : "رطوبة متوسطة كافية في أغلب البيوت.",
      ventilation: "هوا لطيف، من غير تيار بارد مباشر.",
      acSensitive: profile.acSensitive,
      airflowSensitive: draft.profile === "fern",
    },
    care: {
      pruning: "شيل الورق التالف بمقص نظيف. القص الخفيف بيخلي الشكل أنظف.",
      repotting: "كل سنة–سنتين حسب امتلاء الجذور. كبّر الأصيص درجة واحدة.",
      propagation: "العقل أو التقسيم حسب النوع. استنى جذور قبل النقل النهائي.",
    },
    problems: {
      commonProblems: [
        {
          id: "yellowing",
          arabicName: "اصفرار الورق",
          symptoms: ["ورق أصفر"],
          likelyCauses: ["ري زيادة أو نقص", "إضاءة غير مناسبة"],
          whatToDo: ["افحص التربة قبل أي ري", "راجع الضوء"],
          severity: "mild",
        },
      ],
      commonPests: profile.pests.map((id) => pest(id)),
      rootRotSigns: ["جذور بنية طرية", "رائحة عفن", "انهيار من القاعدة"],
    },
    safety: {
      children: { status: draft.childStatus ?? tox, notes: toxNote },
      cats: { status: tox, notes: toxNote },
      dogs: { status: tox, notes: toxNote },
    },
    commonMistakes: draft.mistakes,
    dangerSigns: ["انهيار الساق أو التاج", "عفن منتشر", "سقوط ورق جماعي مع تربة نتنة"],
    quickTips: draft.tips,
    quickCard: {
      light: lighting.bestPlacement,
      water: watering.howToCheck,
      soil: profile.soilType,
      temperature: "16–29°م",
      humidity: profile.humidity === "high" ? "عالية" : profile.humidity === "low" ? "منخفضة" : "متوسطة",
      topWarning: draft.warning,
    },
    matcher: {
      lowLightOk: profile.lowLightOk,
      brightLightOk: light !== "low",
      petFriendly: pet,
      beginnerFriendly: (draft.difficulty ?? profile.difficulty) === "beginner",
      compact: size === "small",
      neglectTolerant: profile.neglect,
      frequentCare: profile.frequent,
      hanging,
      matureSize: size,
      styleTags: draft.styleTags,
    },
    location: {
      bedroom: "good",
      livingRoom: "excellent",
      bathroom: profile.humidity === "high" ? "excellent" : "possible",
      kitchen: "good",
      office: profile.lowLightOk ? "excellent" : "good",
      balcony: profile.directSun || light === "bright-indirect" ? "good" : "possible",
      outdoor: (draft.indoorOutdoor ?? profile.indoorOutdoor) === "indoor" ? "poor" : "good",
      ...draft.location,
    },
    diagnostics: {
      rootRotRisk: profile.rootRot,
      sunburnRisk: profile.sunburn,
      lowHumidityRisk: profile.humidityRisk,
      transplantShockRisk: profile.transplant,
    },
  };
}

export const CAUSE_LABELS: Record<DiagnosticCauseId, string> = {
  overwatering: "زيادة الري",
  underwatering: "العطش",
  "root-rot": "تعفن الجذور",
  "too-much-sun": "شمس مباشرة زيادة",
  "insufficient-light": "إضاءة ضعيفة",
  "low-humidity": "رطوبة هوا قليلة",
  "temperature-stress": "تقلب حرارة أو برد",
  "ac-draft": "تكييف أو تيار مباشر",
  "fertilizer-burn": "حرق سماد",
  "nutrient-deficiency": "نقص تغذية محتمل",
  "transplant-shock": "صدمة تغيير أصيص أو مكان",
  pests: "إصابة حشرية",
  "poor-drainage": "صرف ضعيف",
  "natural-aging": "شيخوخة ورق طبيعية",
  "root-bound": "جذور زحمت الأصيص",
};
