import type { PromptItem } from "@/lib/types";
import { PROMPT_PACK } from "./promptPack";

/**
 * The starter Prompt Library — 15 teaching komanda in Albanian + English.
 * `body` is the plain ready-to-run request. `template` is the "half ready-made"
 * version: she replaces the parts in [kllapa] with her own details, so she
 * learns *how* a good command is built — not just what it produces. `why`
 * explains, in one line, why giving the AI those details works.
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
    template: {
      sq: "Sillu si një këshilltare karriere e ngrohtë. Po shkruaj një CV edhe pse s'kam përvojë pune zyrtare.\n\nÇfarë kam bërë në jetë: [p.sh. u kujdesa për familjen, bëra vullnetarizëm, ndoqa kurse, di gjuhë…].\nPozicioni ose fusha që dua: [shkruaj këtu].\n\nNxirr anët e mia të forta në mënyrë profesionale dhe shkruaje CV-në të qartë e me pika.",
      en: "Act as a warm career advisor. I'm writing a CV even though I have no formal work experience.\n\nWhat I've done in life: [e.g. cared for my family, volunteered, took courses, speak languages…].\nThe role or field I want: [write here].\n\nBring out my strengths professionally and write the CV clearly, in bullet points.",
    },
    why: {
      sq: "AI nuk të njeh — sa më shumë i tregon (çfarë ke bërë, çfarë do), aq më e personalizuar del CV-ja.",
      en: "The AI doesn't know you — the more you tell it (what you've done, what you want), the more personal the CV.",
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
    template: {
      sq: "Shkruaj një letër motivimi të shkurtër dhe bindëse.\n\nPozicioni: [puna që dua].\nPse më intereson: [një ose dy arsye të sinqerta].\nDiçka për mua që ia vlen ta dinë: [aftësi ose përvojë e shkurtër].\n\nBëje të ngrohtë por profesionale, jo më shumë se 200 fjalë.",
      en: "Write a short, convincing cover letter.\n\nRole: [the job I want].\nWhy it interests me: [one or two honest reasons].\nSomething about me worth knowing: [a skill or short experience].\n\nMake it warm but professional, no more than 200 words.",
    },
    why: {
      sq: "Kur i jep kontekstin (pozicionin, arsyen, anët e tua), letra del e jotja — jo një shabllon i ftohtë.",
      en: "Give it the context (role, reason, your strengths) and the letter comes out yours — not a cold template.",
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
    template: {
      sq: "Më ndihmo të shkruaj një email profesional te menaxheri im.\n\nÇfarë dua të kërkoj ose të shpjegoj: [shkruaj këtu].\nToni që dua: [i qetë / i vendosur / falënderues].\n\nMbaje të shkurtër, të qartë e respektues, dhe jepmë edhe një titull (subject).",
      en: "Help me write a professional email to my manager.\n\nWhat I want to ask or explain: [write here].\nTone I want: [calm / firm / grateful].\n\nKeep it short, clear and respectful, and give me a subject line too.",
    },
    why: {
      sq: "Kur i thua qëllimin dhe tonin, përgjigjja del gati për t'u dërguar — jo diçka që duhet ndrequr nga e para.",
      en: "Tell it the goal and the tone, and the reply comes out ready to send — not something to redo from scratch.",
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
    template: {
      sq: "Më duhet të refuzoj diçka në punë pa e prishur marrëdhënien.\n\nÇfarë po më kërkojnë: [p.sh. një detyrë shtesë, orë jashtë orarit].\nPse s'mund ta pranoj: [arsyeja jote].\n\nMë jep 2–3 mënyra të sjellshme për të thënë 'jo', nga më e buta te më e drejtpërdrejta.",
      en: "I need to decline something at work without damaging the relationship.\n\nWhat I'm being asked: [e.g. an extra task, overtime].\nWhy I can't accept: [your reason].\n\nGive me 2–3 polite ways to say 'no', from the softest to the most direct.",
    },
    why: {
      sq: "Duke i dhënë situatën dhe arsyen, përgjigjja tingëllon si ti — jo si fjalë boshe nga interneti.",
      en: "Give it the situation and the reason, and the answer sounds like you — not empty words off the internet.",
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
    template: {
      sq: "Më ndihmo të planifikoj një menu javore për fëmijët — vakte të thjeshta e të shëndetshme.\n\nMoshat e fëmijëve: [shkruaj këtu].\nÇfarë u pëlqen / nuk u pëlqen: [shkruaj këtu].\nSa kohë kam zakonisht për gatim: [p.sh. 20–30 minuta].\n\nM'i jep për 7 ditë, me një listë të shkurtër pazari në fund.",
      en: "Help me plan a weekly menu for my kids — simple, healthy meals.\n\nMy kids' ages: [write here].\nWhat they like / dislike: [write here].\nHow much time I usually have to cook: [e.g. 20–30 minutes].\n\nGive it to me for 7 days, with a short shopping list at the end.",
    },
    why: {
      sq: "Detajet (mosha, shijet, koha) e bëjnë planin të përdorshëm vërtet — ndryshe del një menu që s'i shkon askujt.",
      en: "The details (ages, tastes, time) make the plan actually usable — otherwise you get a menu that fits no one.",
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
    template: {
      sq: "Më ndihmo t'i shpjegoj fëmijës tim një temë të vështirë me fjalë të thjeshta e të buta.\n\nTema: [shkruaj këtu].\nMosha e fëmijës: [shkruaj këtu].\nÇfarë dua të kuptojë ose të ndiejë: [shkruaj këtu].\n\nDërgoma si një bisedë të shkurtër, me fjalë që i kupton një fëmijë.",
      en: "Help me explain a hard topic to my child with simple, gentle words.\n\nTopic: [write here].\nMy child's age: [write here].\nWhat I want them to understand or feel: [write here].\n\nGive it to me as a short conversation, in words a child understands.",
    },
    why: {
      sq: "Mosha dhe qëllimi i tregojnë AI-së si t'i zgjedhë fjalët — pa to, përgjigjja del tepër e madhe ose e ftohtë.",
      en: "The age and goal tell the AI how to pick its words — without them, the answer comes out too big or too cold.",
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
    template: {
      sq: "Po nis një biznes të vogël dhe më duhen ide për emër dhe slogan.\n\nÇfarë shes: [shkruaj këtu].\nKujt ia shes: [klientët e tu].\nNdjesia që dua të japë: [p.sh. elegante, e ngrohtë, moderne].\n\nMë jep 5 emra, secilin me një slogan të shkurtër, dhe shpjego shkurt pse.",
      en: "I'm starting a small business and need name and slogan ideas.\n\nWhat I sell: [write here].\nWho I sell to: [your customers].\nThe feeling I want it to give: [e.g. elegant, warm, modern].\n\nGive me 5 names, each with a short slogan, and briefly explain why.",
    },
    why: {
      sq: "Kur AI di çfarë shet, kujt dhe çfarë ndjesie do, idetë dalin të përshtatura — jo emra të rastësishëm.",
      en: "When the AI knows what you sell, to whom, and the feeling you want, the ideas fit — instead of random names.",
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
    template: {
      sq: "Shkruaj një përshkrim tërheqës për Instagram për produktin tim.\n\nProdukti: [çfarë është].\nPse është i veçantë: [shkruaj këtu].\nKujt i flet: [klientët e tu].\n\nBëje të ngrohtë, me një thirrje për veprim në fund dhe 5–7 hashtag-e të përshtatshme.",
      en: "Write an engaging Instagram caption for my product.\n\nThe product: [what it is].\nWhy it's special: [write here].\nWho it speaks to: [your customers].\n\nMake it warm, with a call to action at the end and 5–7 fitting hashtags.",
    },
    why: {
      sq: "Sa më qartë e përshkruan produktin dhe klientin, aq më shumë 'shet' teksti — AI shkruan për dikë konkret.",
      en: "The clearer you describe the product and customer, the more the copy sells — the AI writes for someone real.",
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
    template: {
      sq: "Më shkruaj një email në anglisht për të pyetur për një vend pune, dhe ma shpjego në shqip çfarë thotë secila pjesë.\n\nPozicioni / kompania: [shkruaj këtu].\nDetaje për mua: [përvojë ose pse më intereson].\n\nJepma anglishten gati për t'u dërguar, e pastaj përkthimin në shqip poshtë.",
      en: "Write me an email in English to ask about a job opening, and explain in Albanian what each part says.\n\nRole / company: [write here].\nDetails about me: [experience or why I'm interested].\n\nGive me the English ready to send, then the Albanian translation below.",
    },
    why: {
      sq: "Duke i dhënë detajet, AI e shkruan anglishten saktë për situatën tënde — dhe ti mëson çfarë do të thotë çdo pjesë.",
      en: "Give it the details and the AI writes the English correctly for your situation — and you learn what each part means.",
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
    template: {
      sq: "Më jep [50] fjalë dhe fraza anglisht që përdoren më shumë në jetën e përditshme.\n\nKu dua t'i përdor më shumë: [p.sh. në punë, me fëmijët, kur udhëtoj].\n\nVendosi në tabelë: fjala në anglisht, përkthimi në shqip, dhe shqiptimi i thjeshtë në kllapa.",
      en: "Give me [50] of the most-used everyday English words and phrases.\n\nWhere I want to use them most: [e.g. at work, with my kids, when travelling].\n\nPut them in a table: the English word, the Albanian translation, and simple pronunciation in brackets.",
    },
    why: {
      sq: "Kur i thua ku do t'i përdorësh, të jep fjalët që të duhen vërtet ty — jo një listë të rastësishme.",
      en: "Tell it where you'll use them and it gives you the words you actually need — not a random list.",
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
    template: {
      sq: "Do të të ngjit tekstin e një faturë ose kontrate dhe ti ma shpjego me fjalë shumë të thjeshta.\n\n[Ngjit këtu tekstin, ose përshkruaje me fjalët e tua].\n\nMë thuaj: çfarë është, çfarë kërkon, sa duhet të paguaj ose çfarë duhet të bëj, dhe deri kur.",
      en: "I'll paste the text of a bill or contract and you explain it to me in very simple words.\n\n[Paste the text here, or describe it in your own words].\n\nTell me: what it is, what it asks, how much I owe or what I must do, and by when.",
    },
    why: {
      sq: "AI nuk e di çfarë ke përpara derisa ia jep. Ngjit tekstin — pastaj ta kthen në gjuhë të thjeshtë.",
      en: "The AI can't see what's in front of you until you give it. Paste the text — then it turns it into plain words.",
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
    template: {
      sq: "Më ndihmo të shkruaj një ankesë të sjellshme por të vendosur.\n\nPër çfarë ankohem: [shërbimi ose produkti me problem].\nÇfarë ndodhi saktësisht: [shkruaj këtu].\nÇfarë dua të zgjidhet: [p.sh. rimbursim, zëvendësim, kërkim falje].\n\nMbaje me dinjitet, të qartë dhe pa fyerje.",
      en: "Help me write a polite but firm complaint.\n\nWhat I'm complaining about: [the faulty service or product].\nWhat exactly happened: [write here].\nWhat I want resolved: [e.g. refund, replacement, an apology].\n\nKeep it dignified, clear and without insults.",
    },
    why: {
      sq: "Faktet dhe kërkesa jote e qartë e bëjnë ankesën të fortë — AI i rendit me dinjitet, ti i jep përmbajtjen.",
      en: "The facts and your clear ask make the complaint strong — the AI arranges it with dignity, you give the substance.",
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
    template: {
      sq: "Sot ndihem [p.sh. e lodhur, pa vetëbesim, e mbingarkuar].\n\nÇfarë po më rëndon më shumë: [shkruaj këtu, nëse do].\n\nMë fol me ngrohtësi, më kujto vlerën time dhe më jep një hap të vogël e të thjeshtë për sot.",
      en: "Today I feel [e.g. tired, low on confidence, overwhelmed].\n\nWhat's weighing on me most: [write here, if you want].\n\nSpeak to me warmly, remind me of my worth, and give me one small, simple step for today.",
    },
    why: {
      sq: "Sa më shumë i tregon si ndihesh, aq më shumë të përgjigjet pikërisht ty — jo me fjalë të përgjithshme.",
      en: "The more you tell it how you feel, the more it answers you specifically — instead of with generic words.",
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
    template: {
      sq: "Më ndihmo të përgatitem për një bisedë të vështirë.\n\nMe kë është biseda: [shkruaj këtu].\nPër çfarë: [shkruaj këtu].\nÇfarë kam frikë se mund të ndodhë: [shkruaj këtu].\n\nMë jep çfarë të them, si ta nis, dhe si të rri e qetë.",
      en: "Help me prepare for a hard conversation.\n\nWho the conversation is with: [write here].\nWhat it's about: [write here].\nWhat I'm afraid might happen: [write here].\n\nGive me what to say, how to start, and how to stay calm.",
    },
    why: {
      sq: "Konteksti (kush, çfarë, frika jote) e lejon AI-në të të përgatisë për bisedën tënde reale — jo një skenar të përgjithshëm.",
      en: "The context (who, what, your fear) lets the AI prepare you for your real conversation — not a generic scenario.",
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
    template: {
      sq: "Më ndihmo të organizoj një ditë produktive por të qetë.\n\nÇfarë kam për të bërë sot: [rendit gjërat këtu].\nSa kohë kam: [p.sh. nga ora 9 deri në 15].\nÇfarë është më e rëndësishmja: [nëse e di].\n\nM'i rendit sipas rëndësisë, me pushime të vogla, pa më mbingarkuar.",
      en: "Help me organize a productive but calm day.\n\nWhat I have to do today: [list things here].\nHow much time I have: [e.g. from 9am to 3pm].\nWhat matters most: [if you know].\n\nOrder it by importance, with small breaks, without overwhelming me.",
    },
    why: {
      sq: "Kur i jep listën dhe kohën, AI ta ndan ditën realisht — jo një plan ideal që s'hyn në kohën tënde.",
      en: "Give it your list and your time, and the AI splits the day realistically — not an ideal plan that won't fit.",
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
