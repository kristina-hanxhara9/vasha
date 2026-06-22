/** Tiny className joiner (no extra deps). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Today's date as YYYY-MM-DD (UTC) — used for daily usage keys. */
export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Stable, dependency-free id for client-only records. */
export function localId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
