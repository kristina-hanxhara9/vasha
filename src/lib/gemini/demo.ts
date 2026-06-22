import type { Lang } from "@/lib/types";

// Friendly canned replies so the whole product works with NO keys at all.
// These are samples — the {type:"demo"} banner tells her to add a key for real AI.

const DEFAULT_DEMO = {
  sq: "Faleminderit që ndave këtë me mua! Ja një fillim:\n\n• Fillo me hapin më të vogël që mund të bësh sot.\n• Mos kërko përsosmëri — kërko një hap përpara.\n• Nëse ngec, kthehu dhe pyetmë sërish me më shumë detaje.\n\nJe në rrugë të mirë. Hap pas hapi, ia del.",
  en: "Thank you for sharing this with me! Here's a start:\n\n• Begin with the smallest step you can take today.\n• Don't aim for perfect — aim for one step forward.\n• If you get stuck, come back and ask me again with more detail.\n\nYou're on the right track. Step by step, you've got this.",
};

const DEMO: Record<string, { sq: string; en: string }> = {
  cv: {
    sq: "Sigurisht! Ja një draft CV-je gati për ta përshtatur:\n\nPROFILI\nProfesioniste e përkushtuar dhe e organizuar, e gatshme të kontribuojë me energji dhe përgjegjësi.\n\nPËRVOJA\n• [Vendi i punës] — [Roli], [vitet]\n  Përgjegjësitë kryesore dhe një arritje konkrete.\n\nAFTËSITË\nKomunikim • Organizim • Punë në ekip • [shto të tuat]\n\nKëshillë: shto një numër konkret (p.sh. 'shërbeva 50+ klientë në ditë') — e bën CV-në më të fortë. E meriton një CV që të përfaqëson!",
    en: "Of course! Here's a draft CV ready to adapt:\n\nPROFILE\nDedicated, organized professional, ready to contribute with energy and responsibility.\n\nEXPERIENCE\n• [Workplace] — [Role], [years]\n  Key responsibilities and one concrete achievement.\n\nSKILLS\nCommunication • Organization • Teamwork • [add yours]\n\nTip: add a concrete number (e.g. 'served 50+ customers a day') — it makes the CV stronger. You deserve a CV that represents you!",
  },
  interview: {
    sq: "Le ta provojmë bashkë! Ja 3 pyetje që ka gjasa t'i dëgjosh:\n\n1. 'Na tregoni për veten.' → Fol 30 sekonda: kush je, çfarë di të bësh, pse je këtu.\n2. 'Pse doni këtë punë?' → Lidh aftësitë e tua me nevojat e tyre.\n3. 'Cila është një anë juaja e fortë?' → Jep një shembull të vogël real.\n\nFrymë thellë. Ti di më shumë nga ç'mendon. Je gati!",
    en: "Let's rehearse together! Here are 3 questions you're likely to hear:\n\n1. 'Tell us about yourself.' → Speak for 30 seconds: who you are, what you can do, why you're here.\n2. 'Why do you want this job?' → Link your skills to their needs.\n3. 'What's one of your strengths?' → Give one small, real example.\n\nDeep breath. You know more than you think. You're ready!",
  },
  raise: {
    sq: "Ja një draft mesazhi që mund t'ia dërgosh menaxherit:\n\n'Përshëndetje [Emri], do të doja të caktoja një takim të shkurtër për të folur rreth rolit tim dhe kontributit tim këtë vit. A do të ishit i/e gatshme këtë javë?'\n\nGjatë takimit, thekso arritjet e tua konkrete dhe vlerën që sjell. Fol me qetësi — kërkesa jote është e drejtë. Ti e meriton.",
    en: "Here's a draft message you could send your manager:\n\n'Hi [Name], I'd like to set up a short meeting to talk about my role and my contribution this year. Would you be available this week?'\n\nIn the meeting, highlight your concrete achievements and the value you bring. Speak calmly — your request is fair. You deserve it.",
  },
  week: {
    sq: "Ja një plan i thjeshtë jave që merr frymë:\n\nE HËNË–E PREMTE\n• Mëngjes: përgatit gjërat një natë më parë.\n• Drekë: 2–3 vakte të gatuara paraprakisht.\n• Mbrëmje: 20 minuta vetëm për ty.\n\nNJË KUJTESË: nuk duhet ta mbash gjithçka vetë. Ndaj një detyrë me dikë sot. Po bën shumë më shumë nga ç'e vëren.",
    en: "Here's a simple week that breathes:\n\nMON–FRI\n• Morning: prep things the night before.\n• Lunch: 2–3 meals cooked ahead.\n• Evening: 20 minutes just for you.\n\nA REMINDER: you don't have to carry it all alone. Share one task with someone today. You're doing far more than you notice.",
  },
  business: {
    sq: "Ide e bukur! Ja 3 hapat e parë:\n\n1. EMRI: zgjidh diçka të thjeshtë që mbahet mend lehtë.\n2. KLIENTI I PARË: kush është personi që do të blejë i pari? Fillo nga njerëzit që njeh.\n3. PROVA: ofroje produktin/shërbimin te 3 persona këtë javë dhe dëgjo çfarë thonë.\n\nNuk të duhen shumë para për të filluar — të duhet hapi i parë. Beso te ideja jote!",
    en: "Lovely idea! Here are the first 3 steps:\n\n1. NAME: pick something simple and memorable.\n2. FIRST CUSTOMER: who will buy first? Start with people you know.\n3. TEST: offer your product/service to 3 people this week and listen.\n\nYou don't need much money to start — you need the first step. Believe in your idea!",
  },
  letter: {
    sq: "Ta shpjegoj me fjalë të thjeshta:\n\n• ÇFARË ËSHTË: duket si një njoftim/kërkesë zyrtare.\n• ÇFARË DO: zakonisht kërkon një përgjigje ose një veprim brenda një afati.\n• ÇFARË TË BËSH: shëno datën e afatit, mblidh dokumentet që përmend, dhe përgjigju shkurt e qartë.\n\nNëse çështja është serioze (gjoba, gjykata), konsultohu me një specialist. Por mos u frikëso — hap pas hapi zgjidhet.",
    en: "Let me explain it in simple words:\n\n• WHAT IT IS: it looks like an official notice/request.\n• WHAT IT WANTS: usually a reply or an action within a deadline.\n• WHAT TO DO: note the deadline, gather the documents it mentions, and reply briefly and clearly.\n\nIf it's serious (a fine, court), consult a specialist. But don't be afraid — step by step, it gets solved.",
  },
  english: {
    sq: "Ja ku nisim (shqip ↔ anglisht):\n\n• Përshëndetje — Hello (Hëllou)\n• Faleminderit — Thank you (Theank ju)\n• Më falni — Excuse me (Ekskjuz mi)\n• A mund të më ndihmoni? — Can you help me? (Ken ju help mi?)\n\nProvo t'i thuash me zë. Çdo fjalë e re është një derë që hapet. Po ia del shumë mirë!",
    en: "Here's where we start (Albanian ↔ English):\n\n• Përshëndetje — Hello\n• Faleminderit — Thank you\n• Më falni — Excuse me\n• A mund të më ndihmoni? — Can you help me?\n\nTry saying them out loud. Every new word is a door that opens. You're doing great!",
  },
  document: {
    sq: "E lexova dokumentin për ty. Ja çfarë kuptova:\n\n• ÇFARË ËSHTË: duket si një njoftim zyrtar.\n• PIKAT KRYESORE: të kërkon një përgjigje ose veprim brenda një afati.\n• ÇFARË TË BËSH: shëno datën, mblidh dokumentet e përmendura dhe përgjigju shkurt e qartë.\n\n(Kjo është një përgjigje shembull — shto një çelës Gemini që ta lexoj dokumentin tënd të vërtetë.)\n\nKjo është për të të ndihmuar ta kuptosh — për hapin zyrtar, drejtohu te institucioni përkatës.",
    en: "I read the document for you. Here's what I understood:\n\n• WHAT IT IS: it looks like an official notice.\n• KEY POINTS: it asks for a reply or action within a deadline.\n• WHAT TO DO: note the date, gather the documents it mentions, and reply briefly and clearly.\n\n(This is a sample answer — add a Gemini key so I can read your real document.)\n\nThis is to help you understand it — for the official step, turn to the relevant institution.",
  },
  style: {
    sq: "Sa bukur që kërkon të ndihesh mirë me veten! Ja disa ide:\n\n• NGJYRAT: tonet e ngrohta (krem, pjeshkë, vishnjë) zakonisht ndriçojnë fytyrën.\n• VESHJA: pantallona të errëta + një bluzë e qetë + një aksesor i vogël = look i sigurt.\n• PËR RASTIN: shto një xhaketë të strukturuar për një ndjesi më profesionale.\n\nJe e bukur ashtu siç je — qëllimi është të ndihesh e sigurt, jo e përsosur. (Përgjigje shembull — shto një çelës Gemini për këshilla nga foto.)",
    en: "How lovely that you want to feel good about yourself! Here are some ideas:\n\n• COLORS: warm tones (cream, peach, berry) usually brighten the face.\n• OUTFIT: dark trousers + a soft top + one small accessory = a confident look.\n• FOR THE OCCASION: add a structured jacket for a more professional feel.\n\nYou are beautiful as you are — the goal is to feel confident, not perfect. (Sample answer — add a Gemini key for tips from a photo.)",
  },
  localized: {
    sq: "Ja një pikënisje e përgjithshme:\n\n• Shumica e vendeve kanë rregulla për lejen e lindjes dhe mbrojtje në punë për gratë.\n• Kontrollo faqen zyrtare të ministrisë së punës ose sigurimeve shoqërore të vendit tënd.\n• Shpesh ka ndihmë juridike falas për gratë.\n\n(Përgjigje shembull pa burime — shto një çelës Gemini me kërkim në internet për informacion aktual e të cituar.)\n\nKjo është informacion i përgjithshëm, jo këshillë ligjore — për rastin tënd, drejtohu te institucioni zyrtar ose ndihma juridike falas në vendin tënd.",
    en: "Here's a general starting point:\n\n• Most countries have rules on maternity leave and workplace protection for women.\n• Check the official labor or social-security ministry website for your country.\n• There is often free legal aid for women.\n\n(Sample answer without sources — add a Gemini key with search grounding for current, cited information.)\n\nThis is general information, not legal advice — for your case, turn to the official institution or free legal aid in your country.",
  },
};

const FOLLOWUP_DEMO = {
  sq: "Me kënaqësi do të vazhdoja bisedën me ty këtu! Por kjo është një përgjigje shembull — shto një çelës Gemini falas që të bisedojmë vërtet, hap pas hapi, pa pasur nevojë të shkosh diku tjetër. 💜",
  en: "I'd love to keep chatting with you right here! But this is a sample reply — add a free Gemini key so we can really talk, step by step, with no need to go anywhere else. 💜",
};

/** Yield a canned reply word-by-word (the route adds the typewriter delay). */
export async function* demoReply(
  scenarioId: string | undefined,
  lang: Lang,
  isFollowup = false,
): AsyncGenerator<string> {
  const entry = isFollowup ? FOLLOWUP_DEMO : (scenarioId && DEMO[scenarioId]) || DEFAULT_DEMO;
  const text = entry[lang] || entry.sq;
  for (const token of text.split(/(\s+)/)) {
    if (token) yield token;
  }
}
