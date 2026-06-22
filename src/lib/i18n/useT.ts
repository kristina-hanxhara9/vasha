"use client";

// Convenience re-exports for components.
export { useI18n, LanguageProvider } from "./LanguageProvider";
import { useI18n } from "./LanguageProvider";

/** Shortcut hook when a component only needs the translate function. */
export function useT() {
  return useI18n().t;
}
