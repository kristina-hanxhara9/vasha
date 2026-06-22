import type { Lesson } from "@/lib/types";

/**
 * Guided Learning Paths. Short, warm lessons that each end with a hands-on task
 * in the Sandbox. The first FREE_LESSON_COUNT are open to free users.
 */
export const LESSONS: Lesson[] = [
  {
    id: "what-is-ai",
    slug: "cfare-eshte-ai",
    icon: "BookOpen",
    minutes: 5,
    title: { sq: "Çfarë është AI dhe pse është për ty", en: "What is AI and why it's for you" },
    summary: {
      sq: "Pa fjalë të mëdha. AI-ja është thjesht një ndihmëse shumë e zgjuar — dhe po, është për ty.",
      en: "No jargon. AI is simply a very smart helper — and yes, it's for you.",
    },
    sections: [
      {
        heading: { sq: "Çfarë është, vërtet?", en: "What is it, really?" },
        body: {
          sq: "AI (inteligjenca artificiale) është një program që kupton gjuhën tënde dhe të ndihmon të shkruash, të planifikosh dhe të kuptosh gjëra. Mendoje si një mike shumë e lexuar që e ke gjithmonë pranë: i thua çfarë të duhet, dhe ajo të ndihmon.",
          en: "AI (artificial intelligence) is a program that understands your language and helps you write, plan and understand things. Think of it as a very well-read friend who's always nearby: you tell it what you need, and it helps.",
        },
      },
      {
        heading: { sq: "Ku të ndihmon në jetën e vërtetë", en: "Where it helps in real life" },
        body: {
          sq: "Të shkruan një CV, të përgatit për intervistë, të shpjegon një letër zyrtare, të planifikon javën, të mëson anglisht. Nuk të zëvendëson ty — të kursen kohë dhe energji për gjërat që kanë rëndësi.",
          en: "It writes a CV, preps you for an interview, explains an official letter, plans your week, teaches you English. It doesn't replace you — it saves you time and energy for what matters.",
        },
      },
      {
        heading: { sq: "Pa frikë", en: "No fear" },
        body: {
          sq: "Nuk prish gjë nëse gabon. Nuk të gjykon. Mund ta pyesësh të njëjtën gjë sa herë të duash. Sa më shumë ta përdorësh, aq më e lehtë bëhet.",
          en: "You can't break anything by making a mistake. It doesn't judge you. You can ask the same thing as many times as you like. The more you use it, the easier it gets.",
        },
      },
    ],
    task: {
      prompt: {
        sq: "Përshëndet AI-në dhe pyete: 'Shpjegomë me një shembull të thjeshtë si mund të më ndihmosh në jetën e përditshme.'",
        en: "Greet the AI and ask: 'Explain with one simple example how you can help me in daily life.'",
      },
    },
  },
  {
    id: "how-to-talk",
    slug: "si-t-i-flasesh-ai",
    icon: "MessageCircle",
    minutes: 6,
    title: { sq: "Si t'i flasësh AI-së", en: "How to talk to AI" },
    summary: {
      sq: "Sekreti i përgjigjeve të mira: t'i japësh pak kontekst dhe të kërkosh qartë.",
      en: "The secret to good answers: give a little context and ask clearly.",
    },
    sections: [
      {
        heading: { sq: "Jepi pak kontekst", en: "Give a little context" },
        body: {
          sq: "Sa më shumë t'i tregosh për situatën tënde, aq më e mirë përgjigja. Në vend të 'shkruaj një CV', provo 'shkruaj një CV për një punë si arkëtare, kam 2 vite përvojë në dyqan'.",
          en: "The more you tell it about your situation, the better the answer. Instead of 'write a CV', try 'write a CV for a cashier job, I have 2 years' shop experience'.",
        },
      },
      {
        heading: { sq: "Kërko qartë çfarë do", en: "Ask clearly for what you want" },
        body: {
          sq: "Thuaj formën që do: 'jepma të shkurtër', 'me lista', 'me ton miqësor'. Dhe nëse përgjigja s'të pëlqen, thjesht thuaj 'bëje më të thjeshtë' ose 'shtoje këtë' — vazhdoni bisedën.",
          en: "Say the form you want: 'make it short', 'with bullet points', 'in a friendly tone'. And if you don't like the answer, just say 'make it simpler' or 'add this' — keep the conversation going.",
        },
      },
    ],
    task: {
      prompt: {
        sq: "Merr një kërkesë të paqartë që ke në mendje dhe shkruaje me kontekst: kush je, çfarë të duhet dhe si e do përgjigjen.",
        en: "Take a vague request you have in mind and write it with context: who you are, what you need, and how you want the answer.",
      },
    },
  },
  {
    id: "first-cv",
    slug: "cv-jote-e-pare",
    icon: "FileText",
    minutes: 8,
    title: { sq: "CV-ja jote e parë me AI", en: "Your first CV with AI" },
    summary: {
      sq: "Hap pas hapi, nga një faqe bosh te një CV që je krenare ta dërgosh.",
      en: "Step by step, from a blank page to a CV you're proud to send.",
    },
    sections: [
      {
        heading: { sq: "Mblidh gjërat e tua", en: "Gather your pieces" },
        body: {
          sq: "Mos u mërzit nëse s'ke 'përvojë zyrtare'. Shkruaj çdo gjë: ku ke punuar, çfarë di të bësh, kurse, vullnetarizëm, gjuhë. AI-ja i kthen këto në pika të forta.",
          en: "Don't worry if you have no 'formal experience'. Write everything: where you've worked, what you can do, courses, volunteering, languages. AI turns these into strengths.",
        },
      },
      {
        heading: { sq: "Lëre AI-në të strukturojë", en: "Let AI structure it" },
        body: {
          sq: "Përdor skenarin 'Shkruaj CV-në time' në Praktikë. Plotëso fushat dhe merr një CV të gatshme. Pastaj ndryshoje me fjalët e tua — është e jotja.",
          en: "Use the 'Write my CV' scenario in Practice. Fill the fields and get a ready CV. Then edit it in your own words — it's yours.",
        },
      },
    ],
    task: {
      prompt: {
        sq: "Hap skenarin e CV-së në Praktikë dhe plotësoje me përvojën tënde. Merr CV-në tënde të parë sot.",
        en: "Open the CV scenario in Practice and fill it with your experience. Get your first CV today.",
      },
      scenarioId: "cv",
    },
  },
  {
    id: "ai-for-business",
    slug: "ai-per-biznesin",
    icon: "Rocket",
    minutes: 8,
    title: { sq: "AI për biznesin tënd të vogël", en: "AI for your small business" },
    summary: {
      sq: "Nga ideja te klienti i parë — me një ndihmëse që s'fle kurrë.",
      en: "From idea to first customer — with a helper that never sleeps.",
    },
    sections: [
      {
        heading: { sq: "Qartëso idenë", en: "Clarify the idea" },
        body: {
          sq: "Edhe nëse ideja është e papërpunuar, AI-ja të ndihmon ta qartësosh: kush janë klientët, çfarë i bën të blejnë, si të fillosh me pak para.",
          en: "Even if the idea is rough, AI helps you clarify it: who your customers are, what makes them buy, how to start with little money.",
        },
      },
      {
        heading: { sq: "Përmbajtje që shet", en: "Content that sells" },
        body: {
          sq: "Përshkrime produktesh, postime për rrjete sociale, përgjigje për klientët — AI t'i shkruan për pak sekonda, ti vetëm i përshtat.",
          en: "Product descriptions, social posts, replies to customers — AI writes them in seconds, you just adjust.",
        },
      },
    ],
    task: {
      prompt: {
        sq: "Hap skenarin 'Nis një ide biznesi' dhe përshkruaj idenë tënde. Merr 3 hapat e parë praktikë.",
        en: "Open the 'Start a business idea' scenario and describe your idea. Get your first 3 practical steps.",
      },
      scenarioId: "business",
    },
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}
