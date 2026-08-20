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

export type ToolStatus = "ready" | "coming-soon";

export type CareToolId =
  | "library"
  | "doctor"
  | "matcher"
  | "watering"
  | "soil"
  | "rescue"
  | "pests"
  | "location";

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
    directSunTolerance: boolean;
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
  };
  soil: {
    type: string;
    drainage: DrainageNeed;
    suggestedMix: string;
    alternatives: string[];
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
