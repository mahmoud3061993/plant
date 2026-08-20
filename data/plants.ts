import { CORE_PLANTS } from "./plants/core";
import { EGYPT_SKIP_SLUGS } from "./plants/egypt-availability";
import { EXTRA_EGYPT_PLANTS } from "./plants/egypt-extra";
import { EXPANDED_PLANTS } from "./plants/expanded";
import { MORE_PLANTS } from "./plants/more";
import type { Plant } from "./types";

/** Single source of truth: houseplants actually found in the Egyptian market. */
export const PLANTS: Plant[] = [
  ...CORE_PLANTS,
  ...MORE_PLANTS,
  ...EXPANDED_PLANTS.filter((plant) => !EGYPT_SKIP_SLUGS.has(plant.slug)),
  ...EXTRA_EGYPT_PLANTS,
];

export const PLANT_COUNT = PLANTS.length;
