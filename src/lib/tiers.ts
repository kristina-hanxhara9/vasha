import type { Tier } from "./types";

// Everything is FREE for now. FREE_DAILY_SANDBOX_LIMIT=0 (or unset) means UNLIMITED.
export const FREE_DAILY_SANDBOX_LIMIT = Number(process.env.FREE_DAILY_SANDBOX_LIMIT ?? 0);
const FREE_LIMIT = FREE_DAILY_SANDBOX_LIMIT > 0 ? FREE_DAILY_SANDBOX_LIMIT : null; // null = unlimited

/** All lessons are free for now. */
export const FREE_LESSON_COUNT = 9999;

export interface TierConfig {
  id: Tier;
  /** null = unlimited */
  dailySandboxLimit: number | null;
  allLessons: boolean;
  allCircles: boolean;
  saveOutputs: boolean;
}

export const TIERS: Record<Tier, TierConfig> = {
  free: { id: "free", dailySandboxLimit: FREE_LIMIT, allLessons: true, allCircles: true, saveOutputs: true },
  premium: { id: "premium", dailySandboxLimit: null, allLessons: true, allCircles: true, saveOutputs: true },
};

export function dailyLimit(tier: Tier): number | null {
  return TIERS[tier].dailySandboxLimit;
}
