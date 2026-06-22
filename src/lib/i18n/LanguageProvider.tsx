"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import sqMessages from "../../../messages/sq.json";
import enMessages from "../../../messages/en.json";
import type { Lang, Localized } from "@/lib/types";
import { pick } from "@/lib/types";

const DICT: Record<Lang, unknown> = { sq: sqMessages, en: enMessages };
const STORAGE_KEY = "vasha_lang";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translate a dotted key, with optional {var} interpolation. */
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Translate a key whose value is a list of strings. */
  tList: (key: string) => string[];
  /** Pick the active language from a Localized value. */
  loc: (value: Localized | string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function lookup(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), obj);
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Albanian (sq) is the default everywhere.
  const [lang, setLangState] = useState<Lang>("sq");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) || readCookie(STORAGE_KEY)) as Lang | null;
    if (stored === "sq" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.cookie = `${STORAGE_KEY}=${l}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* storage may be unavailable; ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const v = lookup(DICT[lang], key) ?? lookup(DICT.sq, key) ?? key;
      return typeof v === "string" ? interpolate(v, vars) : key;
    },
    [lang],
  );

  const tList = useCallback(
    (key: string) => {
      const v = lookup(DICT[lang], key) ?? lookup(DICT.sq, key);
      return Array.isArray(v) ? (v as string[]) : [];
    },
    [lang],
  );

  const loc = useCallback((value: Localized | string) => pick(value, lang), [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t, tList, loc }),
    [lang, setLang, t, tList, loc],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
