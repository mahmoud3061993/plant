import { CORE_PLANTS } from "./plants/core";
import { MORE_PLANTS } from "./plants/more";
import type { Plant } from "./types";

/**
 * Phase 1 catalog: 20 common household plants.
 * The array is sized and typed so later phases can grow past 100 plants
 * without changing UI consumers — keep adding files under `data/plants/`.
 */
export const PLANTS: Plant[] = [...CORE_PLANTS, ...MORE_PLANTS];

export const PLANT_COUNT = PLANTS.length;
