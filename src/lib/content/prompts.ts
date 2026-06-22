import type { PromptItem } from "@/lib/types";
import { PROMPT_PACK } from "./promptPack";

/**
 * The starter Prompt Library — 15 ready-to-run ideas in Albanian + English,
 * across every category. `body` is the first-person request that gets sent to
 * the AI when she taps "Provoje". Grow this list freely.
 */
const BASE_PROMPTS: PromptItem[] = [
  {
    id: "cv-no-experience",
    category: "cv",
    icon: "FileText",
    title: { sq: "CV edhe pa përvojë pune", en: "A CV even with no work experience" },
    description: {
      sq: "Nxirr anët e tua të forta nga jeta, jo vetëm nga puna.",
      en: "Surface your strengths from life, not just jobs.",
    },
    body: {
      sq: "Ndihmomë të shkruaj një CV edhe pse nuk kam përvojë pune zyrtare. Do të të jap gjërat që kam bërë (kujdesi për familjen, vullnetarizëm, kurse, aftësi) dhe ti nxirr anët e mia të forta në mënyrë profesionale.",
      en: "Help me write a CV even though I have no formal work experience. I'll give you what I've done (caring for family, volunteering, courses, skills) and you bring out my strengths professionally.",
    },
  },
  {
    id: "cover-letter",
    category: "cv",
    icon: "PenLine",
    title: { sq: "Letër motivimi bindëse", en: "A convincing cover letter" },
    description: {
      sq: "Një letër e shkurtër që të dallon nga të tjerët.",
      en: "A short letter that sets you apart.",
    },
    body: {
      sq: "Shkruaj një letër motivimi të shkurtër dhe bindëse për punën që dua. Do të të them pozicionin dhe pse më intereson, e ti bëje të ngrohtë por profesionale.",
      en: "Write a short, convincing cover letter for the job I want. I'll tell you the role and why it interests me; make it warm but professional.",
    },
  },
  {
    id: "email-to-boss",
    category: "career",
    icon: "Mail",
    title: { sq: "Email për shefin", en: "A professional email to my boss" },
    description: {
      sq: "Thuaja qartë dhe me edukatë atë që ke për të thënë.",
      en: "Say what you need to say, clearly and politely.",
    },
    body: {
      sq: "Më ndihmo të shkruaj një email profesional te menaxheri im. Do të të them çfarë dua të kërkoj ose të shpjegoj, dhe ti ma jep me ton të qetë e respektues.",
      en: "Help me write a professional email to my manager. I'll tell you what I want to ask or explain, and you give it to me in a calm, respectful tone.",
    },
  },
  {
    id: "say-no-politely",
    category: "career",
    icon: "MessageCircle",
    title: { sq: "Si të them 'jo' me edukatë", en: "How to say 'no' politely" },
    description: {
      sq: "Mbroje kohën tënde pa faj dhe pa konflikt.",
      en: "Protect your time without guilt or conflict.",
    },
    body: {
      sq: "Më duhet të refuzoj diçka në punë (një detyrë shtesë ose orë jashtë orarit) por pa e prishur marrëdhënien. Më jep 2–3 mënyra të sjellshme për ta thënë 'jo'.",
      en: "I need to decline something at work (an extra task or overtime) without damaging the relationship. Give me 2–3 polite ways to say 'no'.",
    },
  },
  {
    id: "weekly-kids-menu",
    category: "motherhood",
    icon: "CalendarHeart",
    title: { sq: "Menu javore për fëmijë", en: "A weekly kids' menu" },
    description: {
      sq: "Vakte të shpejta, të shëndetshme dhe që i hanë.",
      en: "Quick, healthy meals they'll actually eat.",
    },
    body: {
      sq: "Më ndihmo të planifikoj një menu javore për fëmijët — vakte të thjeshta, të shpejta dhe të shëndetshme. Do të të them moshat e tyre dhe çfarë u pëlqen.",
      en: "Help me plan a weekly menu for my kids — simple, fast, healthy meals. I'll tell you their ages and what they like.",
    },
  },
  {
    id: "explain-to-child",
    category: "motherhood",
    icon: "HeartHandshake",
    title: { sq: "Shpjegoji fëmijës diçka të vështirë", en: "Explain something hard to my child" },
    description: {
      sq: "Fjalë të buta për tema të mëdha.",
      en: "Gentle words for big topics.",
    },
    body: {
      sq: "Më ndihmo t'i shpjegoj fëmijës tim një temë të vështirë me fjalë të thjeshta e të buta sipas moshës. Do të të them temën dhe moshën.",
      en: "Help me explain a hard topic to my child with simple, gentle, age-appropriate words. I'll tell you the topic and age.",
    },
  },
  {
    id: "business-name",
    category: "business",
    icon: "Lightbulb",
    title: { sq: "Emër & slogan për biznesin tim", en: "Name & slogan for my business" },
    description: {
      sq: "Ide emrash që mbahen mend lehtë.",
      en: "Memorable name ideas.",
    },
    body: {
      sq: "Po nis një biznes të vogël dhe më duhen ide për emër dhe një slogan të shkurtër. Do të të përshkruaj çfarë shes dhe kujt, e ti më jep 5 mundësi.",
      en: "I'm starting a small business and need name and short slogan ideas. I'll describe what I sell and to whom; give me 5 options.",
    },
  },
  {
    id: "instagram-caption",
    category: "business",
    icon: "Sparkles",
    title: { sq: "Përshkrim produkti për Instagram", en: "A product caption for Instagram" },
    description: {
      sq: "Tekst që tërheq vëmendje dhe shet.",
      en: "Copy that grabs attention and sells.",
    },
    body: {
      sq: "Shkruaj një përshkrim tërheqës për Instagram për produktin tim. Do të të them çfarë është dhe pse është i veçantë; shtoji edhe disa hashtag-e.",
      en: "Write an engaging Instagram caption for my product. I'll tell you what it is and why it's special; add a few hashtags too.",
    },
  },
  {
    id: "job-email-english",
    category: "english",
    icon: "Languages",
    title: { sq: "Email në anglisht për punë", en: "A job email in English" },
    description: {
      sq: "Anglishtja gati, shpjegimi në shqip.",
      en: "English ready, explained in Albanian.",
    },
    body: {
      sq: "Më shkruaj një email në anglisht për të pyetur për një vend pune, dhe ma shpjego në shqip çfarë thotë secila pjesë. Do të të jap detajet.",
      en: "Write me an email in English to ask about a job opening, and explain in Albanian what each part says. I'll give you the details.",
    },
  },
  {
    id: "everyday-english",
    category: "english",
    icon: "Globe",
    title: { sq: "50 fjalë anglisht për përditshmërinë", en: "50 everyday English words" },
    description: {
      sq: "Fjalët që të duhen vërtet, me shqiptim.",
      en: "The words you actually need, with pronunciation.",
    },
    body: {
      sq: "Më jep 50 fjalë dhe fraza anglisht që përdoren më shumë në jetën e përditshme, me përkthim në shqip dhe shqiptim të thjeshtë në kllapa.",
      en: "Give me 50 of the most-used everyday English words and phrases, with Albanian translation and simple pronunciation in brackets.",
    },
  },
  {
    id: "explain-bill",
    category: "admin",
    icon: "ScrollText",
    title: { sq: "Më shpjego këtë faturë ose kontratë", en: "Explain this bill or contract" },
    description: {
      sq: "Çfarë do dhe çfarë duhet të bësh — thjesht.",
      en: "What it wants and what to do — simply.",
    },
    body: {
      sq: "Do të të ngjit tekstin e një faturë ose kontrate dhe ti ma shpjego me fjalë shumë të thjeshta: çfarë është, çfarë kërkon dhe çfarë duhet të bëj.",
      en: "I'll paste the text of a bill or contract and you explain it to me in very simple words: what it is, what it asks, and what I should do.",
    },
  },
  {
    id: "polite-complaint",
    category: "admin",
    icon: "MessageCircle",
    title: { sq: "Ankesë e sjellshme por e fortë", en: "A polite but firm complaint" },
    description: {
      sq: "Bëje zërin tënd të dëgjohet me dinjitet.",
      en: "Make your voice heard with dignity.",
    },
    body: {
      sq: "Më ndihmo të shkruaj një ankesë të sjellshme por të vendosur (për një shërbim ose produkt me problem). Do të të them situatën dhe çfarë dua të zgjidhet.",
      en: "Help me write a polite but firm complaint (about a faulty service or product). I'll tell you the situation and what I want resolved.",
    },
  },
  {
    id: "encouragement",
    category: "confidence",
    icon: "Heart",
    title: { sq: "Fjalë inkurajuese kur ndihem keq", en: "Encouragement when I feel low" },
    description: {
      sq: "Një zë i butë që të kujton vlerën tënde.",
      en: "A gentle voice reminding you of your worth.",
    },
    body: {
      sq: "Sot ndihem e lodhur dhe pa vetëbesim. Më fol me ngrohtësi, më kujto vlerën time dhe më jep një hap të vogël e të thjeshtë për sot.",
      en: "Today I feel tired and low on confidence. Speak to me warmly, remind me of my worth, and give me one small, simple step for today.",
    },
  },
  {
    id: "hard-conversation",
    category: "confidence",
    icon: "MessagesSquare",
    title: { sq: "Përgatitu për një bisedë të vështirë", en: "Prepare for a hard conversation" },
    description: {
      sq: "Hyr e qetë dhe e qartë në bisedën që të frikëson.",
      en: "Walk into the scary talk calm and clear.",
    },
    body: {
      sq: "Më ndihmo të përgatitem mendërisht për një bisedë të vështirë me dikë. Do të të them me kë dhe për çfarë; më jep çfarë të them dhe si të rri e qetë.",
      en: "Help me prepare mentally for a hard conversation with someone. I'll tell you who and about what; give me what to say and how to stay calm.",
    },
  },
  {
    id: "productive-day",
    category: "career",
    icon: "CalendarCheck",
    title: { sq: "Plani i një dite produktive", en: "Plan a productive day" },
    description: {
      sq: "Pak gjëra të rëndësishme, pa u mbingarkuar.",
      en: "A few important things, without overwhelm.",
    },
    body: {
      sq: "Më ndihmo të organizoj një ditë produktive por të qetë. Do të të them çfarë kam për të bërë sot dhe sa kohë kam; ti m'i rendit sipas rëndësisë.",
      en: "Help me organize a productive but calm day. I'll tell you what I have to do today and how much time I have; you order it by importance.",
    },
  },
];

/** Featured prompts (e.g. "Këshilltarja personale") float to the top of the library. */
export const PROMPTS: PromptItem[] = [...BASE_PROMPTS, ...PROMPT_PACK].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
);

export function getPrompt(id: string): PromptItem | undefined {
  return PROMPTS.find((p) => p.id === id);
}
