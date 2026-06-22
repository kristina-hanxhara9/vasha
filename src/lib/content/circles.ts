import type { Circle } from "@/lib/types";

/** Community topic circles. Keep slugs stable (used in URLs + the DB seed). */
export const CIRCLES: Circle[] = [
  {
    slug: "mothers",
    icon: "Baby",
    name: { sq: "Nëna", en: "Mothers" },
    description: {
      sq: "Për nënat që po e balancojnë gjithçka. Pyet, ndaj, merr frymë.",
      en: "For mothers balancing everything. Ask, share, breathe.",
    },
  },
  {
    slug: "jobseekers",
    icon: "Briefcase",
    name: { sq: "Kërkuese pune", en: "Job-seekers" },
    description: {
      sq: "CV, intervista dhe guximi për të aplikuar. Jemi bashkë.",
      en: "CVs, interviews and the courage to apply. We're in it together.",
    },
  },
  {
    slug: "entrepreneurs",
    icon: "Rocket",
    name: { sq: "Sipërmarrëse", en: "Entrepreneurs" },
    description: {
      sq: "Nga ideja te klienti i parë. Ndaj fitoret dhe mësimet.",
      en: "From idea to first customer. Share the wins and the lessons.",
    },
  },
  {
    slug: "beginners",
    icon: "Sprout",
    name: { sq: "Fillestare", en: "Beginners" },
    description: {
      sq: "E re me AI-në dhe teknologjinë? Ky është vendi yt i sigurt.",
      en: "New to AI and tech? This is your safe place.",
    },
  },
];

export function getCircle(slug: string): Circle | undefined {
  return CIRCLES.find((c) => c.slug === slug);
}
