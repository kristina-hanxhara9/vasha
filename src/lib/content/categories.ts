import type { Localized } from "@/lib/types";

export type AccentKey = "rose" | "plum" | "gold" | "sage" | "coral" | "lavender" | "sky" | "mint";

/** Tailwind classes for an accent's soft icon tile. */
export const ACCENTS: Record<AccentKey, { tile: string; icon: string }> = {
  rose: { tile: "bg-rose-100", icon: "text-rose-600" },
  plum: { tile: "bg-plum-100", icon: "text-plum-600" },
  gold: { tile: "bg-gold-100", icon: "text-gold-700" },
  sage: { tile: "bg-sage-100", icon: "text-sage-600" },
  coral: { tile: "bg-coral-100", icon: "text-coral-600" },
  lavender: { tile: "bg-lavender-100", icon: "text-lavender-600" },
  sky: { tile: "bg-sky-100", icon: "text-sky-600" },
  mint: { tile: "bg-mint-100", icon: "text-mint-600" },
};

export interface CategoryDef {
  id: string;
  name: Localized;
  icon: string;
  accent: AccentKey;
}

/** The fine-grained library categories (mirrors the 18-category prompt pack + extras). */
export const CATEGORIES: CategoryDef[] = [
  { id: "career", name: { sq: "Punë & Karrierë", en: "Work & Career" }, icon: "Briefcase", accent: "rose" },
  { id: "cv", name: { sq: "CV & Intervista", en: "CV & Interviews" }, icon: "FileText", accent: "plum" },
  { id: "english", name: { sq: "Anglisht", en: "English" }, icon: "Languages", accent: "sky" },
  { id: "goals", name: { sq: "Qëllime & Disiplinë", en: "Goals & Discipline" }, icon: "Target", accent: "gold" },
  { id: "motherhood", name: { sq: "Mëmësi & Familje", en: "Motherhood & Family" }, icon: "Baby", accent: "coral" },
  { id: "confidence", name: { sq: "Vetëbesim & Kufij", en: "Confidence & Boundaries" }, icon: "Sparkles", accent: "lavender" },
  { id: "finance", name: { sq: "Financa", en: "Finances" }, icon: "Wallet", accent: "sage" },
  { id: "business", name: { sq: "Biznes & Sipërmarrje", en: "Business" }, icon: "Rocket", accent: "rose" },
  { id: "health", name: { sq: "Shëndet & Ushqim", en: "Health & Food" }, icon: "Heart", accent: "mint" },
  { id: "school", name: { sq: "Shkolla & Fëmijët", en: "School & Kids" }, icon: "GraduationCap", accent: "sky" },
  { id: "relationships", name: { sq: "Marrëdhëniet & Dashuria", en: "Relationships & Love" }, icon: "HeartHandshake", accent: "coral" },
  { id: "friendships", name: { sq: "Miqësitë", en: "Friendships" }, icon: "Users", accent: "lavender" },
  { id: "extendedfamily", name: { sq: "Familja e Madhe", en: "Extended Family" }, icon: "Users", accent: "gold" },
  { id: "cooking", name: { sq: "Gatim & Receta", en: "Cooking & Recipes" }, icon: "Utensils", accent: "coral" },
  { id: "home", name: { sq: "Shtëpia & Organizimi", en: "Home & Organizing" }, icon: "Home", accent: "sage" },
  { id: "time", name: { sq: "Koha & Planifikimi", en: "Time & Planning" }, icon: "CalendarCheck", accent: "plum" },
  { id: "selfcare", name: { sq: "Kujdesi për Veten", en: "Self-care & Beauty" }, icon: "Sparkles", accent: "rose" },
  { id: "celebrations", name: { sq: "Festa & Dhurata", en: "Celebrations & Gifts" }, icon: "Gift", accent: "gold" },
  { id: "learning", name: { sq: "Mësim & Rritje", en: "Learning & Growth" }, icon: "BookOpen", accent: "lavender" },
  { id: "admin", name: { sq: "Punë Zyrtare", en: "Admin & Bureaucracy" }, icon: "ScrollText", accent: "sage" },
];

export function getCategory(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function categoryName(id: string, loc: (v: Localized | string) => string): string {
  const c = getCategory(id);
  return c ? loc(c.name) : id;
}

export function categoryAccent(id: string): { tile: string; icon: string } {
  const c = getCategory(id);
  return c ? ACCENTS[c.accent] : ACCENTS.plum;
}

/** The 6 macro tiles shown on the home screen (each opens the library pre-filtered). */
export interface MacroDef {
  id: string;
  name: Localized;
  subtitle: Localized;
  icon: string;
  accent: AccentKey;
  /** fine category to open in the library; empty = show all */
  cat: string;
}

export const MACROS: MacroDef[] = [
  {
    id: "career",
    name: { sq: "Karrierë & Punë", en: "Career & Work" },
    subtitle: { sq: "CV, intervista, LinkedIn, negocim page", en: "CV, interviews, LinkedIn, raises" },
    icon: "Briefcase",
    accent: "rose",
    cat: "career",
  },
  {
    id: "business",
    name: { sq: "Biznes & Sipërmarrje", en: "Business" },
    subtitle: { sq: "Ide biznesi, marketing, klientë, shitje", en: "Ideas, marketing, customers, sales" },
    icon: "Rocket",
    accent: "coral",
    cat: "business",
  },
  {
    id: "english",
    name: { sq: "Mësim & Gjuhë Angleze", en: "Learning & English" },
    subtitle: { sq: "Biseda, gramatikë, intervista në anglisht", en: "Conversation, grammar, interviews in English" },
    icon: "Languages",
    accent: "sky",
    cat: "english",
  },
  {
    id: "confidence",
    name: { sq: "Vetëbesim & Mindset", en: "Confidence & Mindset" },
    subtitle: { sq: "Qëllime, kufij, zakone, motivim", en: "Goals, boundaries, habits, motivation" },
    icon: "Sparkles",
    accent: "lavender",
    cat: "confidence",
  },
  {
    id: "motherhood",
    name: { sq: "Mëmësi & Familja", en: "Motherhood & Family" },
    subtitle: { sq: "Planifikim, fëmijë, marrëdhënie, shtëpi", en: "Planning, kids, relationships, home" },
    icon: "Baby",
    accent: "gold",
    cat: "motherhood",
  },
  {
    id: "more",
    name: { sq: "Të tjera", en: "More" },
    subtitle: { sq: "Financa, shëndet, gatim, kohë, kujdes për veten", en: "Finances, health, cooking, time, self-care" },
    icon: "HeartHandshake",
    accent: "rose",
    cat: "",
  },
];
