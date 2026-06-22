import type { Localized } from "@/lib/types";

// ⚠️ HUMAN-VERIFY BEFORE LAUNCH:
// Safety/emergency contacts must be REAL and CURRENT — never AI-generated.
// Only the universal emergency numbers below are pre-filled (they are stable and
// public). Everything marked [VERIFIKO …] is a PLACEHOLDER for a human (you) to
// replace with a verified, current contact for that country. The app shows ONLY
// what is in this file for safety contacts — it never lets the AI invent them.

export interface ResourceItem {
  label: Localized;
  value: string;
}

export interface CountryResource {
  /** lowercase strings the selected country value is matched against */
  match: string[];
  name: Localized;
  items: ResourceItem[];
}

const womensLine: Localized = { sq: "Linja për gratë", en: "Women's helpline" };
const legalAid: Localized = { sq: "Ndihma juridike falas", en: "Free legal aid" };
const emergency: Localized = { sq: "Urgjenca", en: "Emergency" };
const PLACEHOLDER = "[VERIFIKO — plotëso kontaktin e verifikuar]";

export const COUNTRY_RESOURCES: CountryResource[] = [
  {
    match: ["shqipëri", "shqiperi", "albania"],
    name: { sq: "Shqipëri", en: "Albania" },
    items: [
      { label: emergency, value: "112" },
      { label: womensLine, value: PLACEHOLDER },
      { label: legalAid, value: PLACEHOLDER },
    ],
  },
  {
    match: ["kosovë", "kosove", "kosovo"],
    name: { sq: "Kosovë", en: "Kosovo" },
    items: [
      { label: emergency, value: "112" },
      { label: womensLine, value: PLACEHOLDER },
      { label: legalAid, value: PLACEHOLDER },
    ],
  },
  {
    match: ["itali", "italy", "italia"],
    name: { sq: "Itali", en: "Italy" },
    items: [
      { label: emergency, value: "112" },
      { label: womensLine, value: PLACEHOLDER },
      { label: legalAid, value: PLACEHOLDER },
    ],
  },
  {
    match: ["gjermani", "germany", "deutschland"],
    name: { sq: "Gjermani", en: "Germany" },
    items: [
      { label: emergency, value: "112" },
      { label: womensLine, value: PLACEHOLDER },
      { label: legalAid, value: PLACEHOLDER },
    ],
  },
  {
    match: ["zvicër", "zvicer", "switzerland"],
    name: { sq: "Zvicër", en: "Switzerland" },
    items: [
      { label: emergency, value: "112" },
      { label: womensLine, value: PLACEHOLDER },
      { label: legalAid, value: PLACEHOLDER },
    ],
  },
  {
    match: ["mbretëri e bashkuar", "mbreteri e bashkuar", "united kingdom", "uk"],
    name: { sq: "Mbretëri e Bashkuar", en: "United Kingdom" },
    items: [
      { label: emergency, value: "999" },
      { label: womensLine, value: PLACEHOLDER },
      { label: legalAid, value: PLACEHOLDER },
    ],
  },
  {
    match: ["shba", "usa", "united states"],
    name: { sq: "SHBA", en: "USA" },
    items: [
      { label: emergency, value: "911" },
      { label: womensLine, value: PLACEHOLDER },
      { label: legalAid, value: PLACEHOLDER },
    ],
  },
];

export function findResources(country: string | undefined): CountryResource | undefined {
  if (!country) return undefined;
  const c = country.trim().toLowerCase();
  return COUNTRY_RESOURCES.find((r) => r.match.some((m) => c.includes(m) || m.includes(c)));
}
