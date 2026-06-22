// Shared types for VASHA.

export type Lang = "sq" | "en";

/** A string available in both Albanian (default) and English. */
export type Localized = { sq: string; en: string };

/** Pick the right language from a Localized value, falling back to Albanian. */
export function pick(value: Localized | string, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang] ?? value.sq;
}

// Category ids are plain strings — see src/lib/content/categories.ts for the set.
export type Category = string;

export type FieldType = "text" | "textarea" | "select" | "file";

export interface ScenarioField {
  name: string;
  label: Localized;
  placeholder?: Localized;
  type: FieldType;
  required?: boolean;
  options?: Localized[];
  /** For file fields: accepted mime types, e.g. "image/*,application/pdf". */
  accept?: string;
}

/** A grounding citation returned by Gemini's Google Search tool. */
export interface Source {
  title?: string;
  uri: string;
}

/** A file sent to the multimodal model (base64 inline data). */
export interface UploadFile {
  name: string;
  mimeType: string;
  data: string; // base64 (no data: prefix)
}

/** One turn in a Sandbox conversation (Gemini roles). */
export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

export interface Scenario {
  id: string;
  icon: string; // lucide icon name
  category: Category;
  title: Localized;
  description: Localized;
  fields: ScenarioField[];
  /** Albanian system instruction sent to Gemini for this scenario. */
  systemInstruction: string;
  /** Optional intro shown above the result while empty. */
  hint?: Localized;
  /** Use Google Search grounding (live facts + citations) for this scenario. */
  grounded?: boolean;
  /** Mark as an "AI tool" (gets a badge in the picker). */
  tool?: boolean;
}

export interface PromptItem {
  id: string;
  category: Category;
  icon: string;
  title: Localized;
  description: Localized;
  /** The ready-to-run text the woman sends to the AI (Albanian-first; may be a plain string). */
  body: Localized | string;
  /** Fill-in-the-blank version of the request — blanks marked with [kllapa] she replaces.
   *  Teaches the structure of a good command; falls back to `body` when absent. */
  template?: Localized;
  /** One short line: why this command works / what she learns by writing it this way. */
  why?: Localized;
  /** Pin to the top of the library / feature on the home screen. */
  featured?: boolean;
  /** Optional scenario to open when "run in sandbox" is clicked. */
  scenarioId?: string;
}

export interface LessonSection {
  heading: Localized;
  body: Localized;
}

export interface Lesson {
  id: string;
  slug: string;
  icon: string;
  minutes: number;
  title: Localized;
  summary: Localized;
  sections: LessonSection[];
  task: {
    prompt: Localized;
    scenarioId?: string;
  };
}

export interface ChallengeDay {
  day: number;
  title: Localized;
  task: Localized;
  scenarioId?: string;
}

export interface Circle {
  slug: string;
  icon: string;
  name: Localized;
  description: Localized;
}

export type Tier = "free" | "premium";
