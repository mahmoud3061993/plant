import { CORE_PLANTS } from "./plants/core";
import { EXPANDED_PLANTS } from "./plants/expanded";
import { MORE_PLANTS } from "./plants/more";
import type { Plant } from "./types";

/** Single source of truth for every interactive tool. */
export const PLANTS: Plant[] = [...CORE_PLANTS, ...MORE_PLANTS, ...EXPANDED_PLANTS];

export const PLANT_COUNT = PLANTS.length;
