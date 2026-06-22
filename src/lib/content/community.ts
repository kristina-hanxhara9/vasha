import type { Localized } from "@/lib/types";

// Seeded sample content so the community feels alive in v1 (clearly labelled).
export interface SampleReply {
  body: Localized;
  author: string;
}
export interface SamplePost {
  id: string;
  circle: string;
  title: Localized;
  body: Localized;
  author: string;
  replies?: SampleReply[];
}

export const SAMPLE_POSTS: SamplePost[] = [
  {
    id: "s-mothers-1",
    circle: "mothers",
    author: "Teuta",
    title: { sq: "Si t'i shpjegoj fëmijës një temë të vështirë?", en: "How do I explain a hard topic to my child?" },
    body: {
      sq: "Vajza ime 6-vjeçare bëri pyetje për sëmundjen e gjyshes dhe nuk dija si t'ia them. Përdora skenarin 'Shpjegoji fëmijës' dhe më ndihmoi shumë.",
      en: "My 6-year-old asked about her grandma's illness and I didn't know how to put it. I used the 'Explain to my child' scenario and it helped a lot.",
    },
    replies: [
      {
        author: "Arta",
        body: {
          sq: "Faleminderit që ndave këtë! Do ta provoj edhe unë.",
          en: "Thank you for sharing! I'll try it too.",
        },
      },
    ],
  },
  {
    id: "s-mothers-2",
    circle: "mothers",
    author: "Mira",
    title: { sq: "Vakte të shpejta për mëngjes?", en: "Quick breakfast ideas?" },
    body: {
      sq: "Kërkoj ide mëngjesi që përgatiten për 10 minuta para shkollës. Çfarë funksionon për ju?",
      en: "Looking for breakfast ideas that take 10 minutes before school. What works for you?",
    },
  },
  {
    id: "s-jobseekers-1",
    circle: "jobseekers",
    author: "Elona",
    title: { sq: "Sapo mbarova CV-në time me VASHA!", en: "I just finished my CV with VASHA!" },
    body: {
      sq: "Pas dy vitesh pa punuar, kisha frikë nga CV-ja. Sot e bëra në 15 minuta dhe dukem profesionale. Faleminderit, vajza!",
      en: "After two years out of work, I was scared of the CV. Today I made it in 15 minutes and I look professional. Thank you, sisters!",
    },
    replies: [
      {
        author: "Drita",
        body: { sq: "Urime! Më frymëzove ta filloj edhe unë.", en: "Congrats! You inspired me to start mine too." },
      },
    ],
  },
  {
    id: "s-jobseekers-2",
    circle: "jobseekers",
    author: "Drita",
    title: { sq: "Si të përgatitem për intervistën e parë?", en: "How do I prepare for my first interview?" },
    body: {
      sq: "Kam intervistën e parë javën tjetër dhe jam shumë nervoze. Ndonjë këshillë?",
      en: "I have my first interview next week and I'm so nervous. Any advice?",
    },
  },
  {
    id: "s-entrepreneurs-1",
    circle: "entrepreneurs",
    author: "Blerta",
    title: { sq: "Nisa të shes ëmbëlsira online", en: "I started selling cakes online" },
    body: {
      sq: "Përdora VASHA-n për emrin dhe përshkrimet në Instagram. Javën e parë mora 5 porosi! Hap pas hapi.",
      en: "I used VASHA for the name and the Instagram captions. First week I got 5 orders! Step by step.",
    },
  },
  {
    id: "s-beginners-1",
    circle: "beginners",
    author: "Vesa",
    title: { sq: "A është AI e vështirë për t'u mësuar?", en: "Is AI hard to learn?" },
    body: {
      sq: "Nuk jam shumë e mirë me teknologjinë. A mund ta përdor vërtet këtë?",
      en: "I'm not very good with technology. Can I really use this?",
    },
    replies: [
      {
        author: "Elira",
        body: {
          sq: "Edhe unë mendoja kështu! Fillo me mësimin e parë, është shumë e thjeshtë.",
          en: "I thought the same! Start with the first lesson, it's very simple.",
        },
      },
    ],
  },
];

export interface SampleStory {
  id: string;
  body: Localized;
  author: string;
}

export const SUCCESS_STORIES: SampleStory[] = [
  {
    id: "story-1",
    author: "Elona",
    body: {
      sq: "Mora punën pas 3 muajsh kërkim. CV-ja nga VASHA bëri ndryshimin!",
      en: "I got the job after 3 months of searching. The CV from VASHA made the difference!",
    },
  },
  {
    id: "story-2",
    author: "Teuta",
    body: {
      sq: "Tani shkruaj email-e në anglisht pa frikë. Ndihem më e zonja.",
      en: "Now I write emails in English without fear. I feel more capable.",
    },
  },
  {
    id: "story-3",
    author: "Blerta",
    body: {
      sq: "Biznesi im i vogël ka 20 klientë të rinj këtë muaj. Faleminderit!",
      en: "My small business has 20 new customers this month. Thank you!",
    },
  },
  {
    id: "story-4",
    author: "Drita",
    body: {
      sq: "Mësova ta përdor AI-në në moshën 52-vjeçare. Kurrë s'është vonë.",
      en: "I learned to use AI at 52. It's never too late.",
    },
  },
];
