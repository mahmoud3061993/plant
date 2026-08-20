export type LightLevel = "low" | "medium" | "bright-indirect" | "direct";
export type WaterNeed = "low" | "moderate" | "high";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type IndoorOutdoor = "indoor" | "outdoor" | "both";
export type HumidityNeed = "low" | "medium" | "high";
export type Toxicity = "safe" | "mildly-toxic" | "toxic";
export type DrainageNeed = "sharp" | "good" | "moisture-retentive";
export type DroughtTolerance = "low" | "medium" | "high";
export type LeafStyle =
  | "heart"
  | "sword"
  | "split"
  | "oval"
  | "rosette"
  | "feather"
  | "round"
  | "arrow"
  | "fiddle"
  | "spiny";

export type PlantCategory =
  | "trailing"
  | "upright"
  | "palm"
  | "fern"
  | "succulent"
  | "cactus"
  | "flowering"
  | "foliage";

export type DirectSunHours = "none" | "morning" | "few" | "full";
export type SoilMoisture = "dry" | "mostly-dry" | "evenly-moist" | "never-soggy";
export type MoistureRetention = "low" | "medium" | "high";
export type RoomSuitability = "excellent" | "good" | "possible" | "poor";
export type MatureSize = "small" | "medium" | "large";
export type RiskLevel = "low" | "medium" | "high";
export type StyleTag =
  | "foliage"
  | "hanging"
  | "flowering"
  | "succulent"
  | "cactus"
  | "statement";

export type SoilComponentId =
  | "potting-mix"
  | "garden-soil"
  | "perlite"
  | "coco-peat"
  | "coco-coir"
  | "bark"
  | "sand"
  | "pumice"
  | "compost"
  | "vermiculite"
  | "charcoal";

export type DiagnosticCauseId =
  | "overwatering"
  | "underwatering"
  | "root-rot"
  | "too-much-sun"
  | "insufficient-light"
  | "low-humidity"
  | "temperature-stress"
  | "ac-draft"
  | "fertilizer-burn"
  | "nutrient-deficiency"
  | "transplant-shock"
  | "pests"
  | "poor-drainage"
  | "natural-aging"
  | "root-bound";

export type SymptomId =
  | "yellow-leaves"
  | "wilting"
  | "leaf-drop"
  | "brown-tips"
  | "spots"
  | "stunted"
  | "curling"
  | "pests"
  | "rot-smell"
  | "mushy-stem"
  | "root-problem"
  | "unsure";

export interface SoilMixPart {
  component: SoilComponentId;
  percent: number;
  purpose: string;
}

export interface RoomPlacement {
  bedroom: RoomSuitability;
  livingRoom: RoomSuitability;
  bathroom: RoomSuitability;
  kitchen: RoomSuitability;
  office: RoomSuitability;
  balcony: RoomSuitability;
  outdoor: RoomSuitability;
}

export type RoomId = keyof RoomPlacement;

export type ToolStatus = "ready" | "coming-soon";

export type CareToolId =
  | "library"
  | "doctor"
  | "matcher"
  | "watering"
  | "soil"
  | "rescue"
  | "pests"
  | "location"
  | "planner"
  | "situations"
  | "care-cards";

export interface CareTool {
  id: CareToolId;
  href: string;
  emoji: string;
  title: string;
  description: string;
  status: ToolStatus;
  /** Plant fields this tool will later consume. */
  consumes: string[];
}

export interface PlantProblem {
  id: string;
  arabicName: string;
  symptoms: string[];
  likelyCauses: string[];
  whatToDo: string[];
  severity: "mild" | "serious" | "urgent";
}

export interface PestInfo {
  id: string;
  arabicName: string;
  englishName: string;
  signs: string[];
  nonChemicalTreatment: string[];
  notes: string;
}

export interface SafetyNote {
  status: Toxicity;
  notes: string;
}

export interface Plant {
  id: string;
  slug: string;
  arabicName: string;
  englishName: string;
  scientificName: string;
  alsoKnownAs: string[];
  category: PlantCategory;
  difficulty: Difficulty;
  indoorOutdoor: IndoorOutdoor;
  shortDescription: string;
  visual: {
    emoji: string;
    hue: number;
    leafStyle: LeafStyle;
  };
  light: {
    level: LightLevel;
    minimum?: LightLevel;
    preferred?: LightLevel;
    directSunTolerance: boolean;
    directSunHours?: DirectSunHours;
    explanation: string;
    bestPlacement: string;
  };
  watering: {
    need: WaterNeed;
    generalGuidance: string;
    howToCheck: string;
    overwateringSigns: string[];
    underwateringSigns: string[];
    summerNotes: string;
    winterNotes: string;
    droughtTolerance: DroughtTolerance;
    soilMoisture?: SoilMoisture;
    checkDepthCm?: [number, number];
  };
  soil: {
    type: string;
    drainage: DrainageNeed;
    suggestedMix: string;
    alternatives: string[];
    moistureRetention?: MoistureRetention;
    mix?: SoilMixPart[];
  };
  fertilizing: {
    frequency: string;
    season: string;
    notes: string;
  };
  environment: {
    temperature: string;
    humidity: HumidityNeed;
    humidityNotes: string;
    ventilation: string;
    temperatureMinC?: number;
    temperatureMaxC?: number;
    acSensitive?: boolean;
    airflowSensitive?: boolean;
  };
  care: {
    pruning: string;
    repotting: string;
    propagation: string;
  };
  problems: {
    commonProblems: PlantProblem[];
    commonPests: PestInfo[];
    rootRotSigns: string[];
  };
  safety: {
    children: SafetyNote;
    cats: SafetyNote;
    dogs: SafetyNote;
  };
  commonMistakes: string[];
  dangerSigns: string[];
  quickTips: string[];
  quickCard: {
    light: string;
    water: string;
    soil: string;
    temperature: string;
    humidity: string;
    topWarning: string;
  };
  matcher: {
    lowLightOk: boolean;
    brightLightOk: boolean;
    petFriendly: boolean;
    beginnerFriendly: boolean;
    compact: boolean;
    neglectTolerant?: boolean;
    frequentCare?: boolean;
    hanging?: boolean;
    matureSize?: MatureSize;
    styleTags?: StyleTag[];
  };
  location?: RoomPlacement;
  diagnostics?: {
    rootRotRisk: RiskLevel;
    sunburnRisk: RiskLevel;
    lowHumidityRisk: RiskLevel;
    transplantShockRisk: RiskLevel;
  };
}

export interface PlantFilterState {
  query: string;
  lowLight: boolean;
  brightLight: boolean;
  lowWater: boolean;
  beginner: boolean;
  indoor: boolean;
  petFriendly: boolean;
}

/** Compact record for library/search UI. Full `Plant` stays on detail pages and future tools. */
export type PlantSummary = Pick<
  Plant,
  | "id"
  | "slug"
  | "arabicName"
  | "englishName"
  | "scientificName"
  | "alsoKnownAs"
  | "shortDescription"
  | "difficulty"
  | "indoorOutdoor"
  | "visual"
  | "matcher"
> & {
  light: Pick<Plant["light"], "level">;
  watering: Pick<Plant["watering"], "need">;
};
