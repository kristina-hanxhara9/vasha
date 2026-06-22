import type { Scenario } from "@/lib/types";

/**
 * The 7 guided Sandbox scenarios. Each has Albanian + English display text and
 * an Albanian `systemInstruction` sent to Gemini. Add scenarios freely.
 */
export const SCENARIOS: Scenario[] = [
  {
    id: "document",
    icon: "FileUp",
    category: "admin",
    tool: true,
    title: { sq: "Ndihmësja e Dokumenteve", en: "Document Helper" },
    description: {
      sq: "Ngarko një foto ose PDF të një dokumenti dhe ta shpjegoj thjesht në shqip — çfarë do dhe çfarë të bësh.",
      en: "Upload a photo or PDF of a document and I'll explain it simply in Albanian — what it wants and what to do.",
    },
    fields: [
      {
        name: "file",
        type: "file",
        required: true,
        accept: "image/*,application/pdf",
        label: { sq: "Foto ose PDF e dokumentit", en: "Photo or PDF of the document" },
      },
      {
        name: "question",
        type: "text",
        label: { sq: "Çfarë do të dish? (opsionale)", en: "What do you want to know? (optional)" },
        placeholder: { sq: "p.sh. a duhet të paguaj diçka?", en: "e.g. do I have to pay something?" },
      },
    ],
    systemInstruction:
      "Detyra: ndihmëse e dokumenteve. Përdoruesja ka ngarkuar një foto ose PDF të një dokumenti. Lexoje me kujdes. Nëse është në një gjuhë tjetër (gjermanisht, italisht, anglisht, etj.), përkthe kuptimin në shqip. Pastaj shpjego thjesht: (1) çfarë është ky dokument me një fjali; (2) pikat kryesore me fjalë të thjeshta; (3) çfarë duhet të bëjë ajo; (4) afate ose shuma të rëndësishme nëse ka. Ftoje të bëjë pyetje të tjera për të njëjtin dokument. Mos shpik ligje, afate apo shifra që nuk janë në dokument. Mbylle me një fjali të ngrohtë: kjo është për ta ndihmuar ta kuptojë — për hapin zyrtar, drejtohu te institucioni përkatës ose te ndihma juridike falas në vendin e saj.",
  },
  {
    id: "style",
    icon: "Shirt",
    category: "selfcare",
    tool: true,
    title: { sq: "Stilistja Jote", en: "Your Personal Stylist" },
    description: {
      sq: "Ngarko një foto (opsionale) ose përshkruaj veten dhe merr këshilla stili të ngrohta e pozitive.",
      en: "Upload a photo (optional) or describe yourself and get warm, positive styling tips.",
    },
    fields: [
      {
        name: "photo",
        type: "file",
        accept: "image/*",
        label: { sq: "Foto (opsionale)", en: "Photo (optional)" },
      },
      {
        name: "about",
        type: "textarea",
        required: true,
        label: { sq: "Përshkruaj veten, garderobën ose çfarë kërkon", en: "Describe yourself, your wardrobe or what you need" },
        placeholder: {
          sq: "p.sh. kam intervistë pune dhe dua një veshje të sigurt nga ato që kam",
          en: "e.g. I have a job interview and want a confident outfit from what I own",
        },
      },
      {
        name: "occasion",
        type: "select",
        label: { sq: "Për çfarë rasti?", en: "For what occasion?" },
        options: [
          { sq: "Përditshmëri", en: "Everyday" },
          { sq: "Intervistë pune", en: "Job interview" },
          { sq: "Festë ose dasmë", en: "Party or wedding" },
          { sq: "Punë", en: "Work" },
        ],
      },
    ],
    systemInstruction:
      "Detyra: stiliste personale e ngrohtë dhe pozitive. Përdoruesja mund të ketë ngarkuar një foto ose vetëm të përshkruajë veten. Ndihmoje të ndihet e sigurt dhe e bukur DUKE PUNUAR me atë që ka dhe i pëlqen. Jep: paleta ngjyrash që i shkojnë; veshje nga ato që zotëron; një 'kapsulë' e thjeshtë garderobe; një look për rastin e zgjedhur me buxhet realist; dhe këshilla të lehta për flokët e kujdesin. RREGULLA TË RËNDËSISHME: kurrë mos kritiko trupin e saj, mos sugjero rënie në peshë apo 'ndreqje të të metave', mos përforco pasiguri apo standarde joreale bukurie. Mbaje këshillën me shije, të respektueshme dhe të përshtatshme për moshën; kurrë seksualizuese. Qëllimi është të ndihet mirë, jo e gjykuar.",
  },
  {
    id: "localized",
    icon: "Globe",
    category: "admin",
    tool: true,
    grounded: true,
    title: { sq: "Ndihma Lokale", en: "Local Help" },
    description: {
      sq: "Pyetje për të drejtat, lejen e lindjes, ndihmën juridike e më shumë — me burime reale për vendin tënd.",
      en: "Questions about your rights, maternity leave, legal aid and more — with real sources for your country.",
    },
    fields: [
      {
        name: "country",
        type: "select",
        required: true,
        label: { sq: "Vendi yt", en: "Your country" },
        options: [
          { sq: "Shqipëri", en: "Albania" },
          { sq: "Kosovë", en: "Kosovo" },
          { sq: "Itali", en: "Italy" },
          { sq: "Gjermani", en: "Germany" },
          { sq: "Zvicër", en: "Switzerland" },
          { sq: "Mbretëri e Bashkuar", en: "United Kingdom" },
          { sq: "SHBA", en: "USA" },
        ],
      },
      {
        name: "question",
        type: "textarea",
        required: true,
        label: { sq: "Çfarë do të dish?", en: "What do you want to know?" },
        placeholder: {
          sq: "p.sh. sa ditë leje lindjeje më takojnë?",
          en: "e.g. how many days of maternity leave am I entitled to?",
        },
      },
    ],
    systemInstruction:
      "Detyra: ndihmë lokale për një grua në vendin që tregon ajo. Përdor kërkimin në internet për të gjetur informacion REAL dhe AKTUAL dhe cito burimet. Shpjego thjesht në shqip. KY ËSHTË INFORMACION I PËRGJITHSHËM, JO KËSHILLË LIGJORE. Mos thuaj kurrë një ligj, afat apo të drejtë specifike pa një burim; nëse nuk gjen burim të besueshëm, thuaje qartë dhe drejtoje te ndihma zyrtare. Mbylle gjithmonë me: 'Kjo është informacion i përgjithshëm, jo këshillë ligjore — për rastin tënd, drejtohu te institucioni zyrtar ose ndihma juridike falas në vendin tënd.'",
  },
  {
    id: "cv",
    icon: "FileText",
    category: "cv",
    title: { sq: "Shkruaj ose përmirëso CV-në time", en: "Write or improve my CV" },
    description: {
      sq: "Më jep përvojën tënde dhe të kthej një CV të qartë e profesionale, gati për ta dërguar.",
      en: "Give me your experience and I'll return a clear, professional CV, ready to send.",
    },
    fields: [
      {
        name: "role",
        type: "text",
        required: true,
        label: { sq: "Për çfarë pune po aplikon?", en: "What job are you applying for?" },
        placeholder: { sq: "p.sh. Asistente administrative", en: "e.g. Administrative assistant" },
      },
      {
        name: "experience",
        type: "textarea",
        required: true,
        label: { sq: "Përvoja dhe aftësitë e tua", en: "Your experience and skills" },
        placeholder: {
          sq: "Shkruaj lirshëm: ku ke punuar, çfarë di të bësh, sa vite përvojë…",
          en: "Write freely: where you've worked, what you can do, how many years…",
        },
      },
      {
        name: "education",
        type: "text",
        label: { sq: "Arsimi (opsionale)", en: "Education (optional)" },
        placeholder: {
          sq: "p.sh. Bachelor në Ekonomi, Universiteti i Tiranës",
          en: "e.g. BA in Economics, University of Tirana",
        },
      },
      {
        name: "tone",
        type: "select",
        label: { sq: "Si e do tonin?", en: "What tone do you want?" },
        options: [
          { sq: "Profesional", en: "Professional" },
          { sq: "I ngrohtë", en: "Warm" },
          { sq: "I përmbledhur", en: "Concise" },
        ],
      },
      {
        name: "cvLanguage",
        type: "select",
        label: { sq: "Në çfarë gjuhe ta bëj CV-në?", en: "In what language should the CV be?" },
        options: [
          { sq: "Shqip", en: "Albanian" },
          { sq: "Anglisht", en: "English" },
        ],
      },
    ],
    systemInstruction:
      "Detyra: ndihmoje përdoruesen të krijojë ose përmirësojë një CV. Kthe një CV të strukturuar e gati për t'u kopjuar, me këto seksione: Profili (2–3 fjali), Përvoja e punës, Arsimi, Aftësitë. Përdor gjuhë profesionale por njerëzore. Mos shpik fakte: nëse mungon diçka, lër një vend në kllapa [ ] për ta plotësuar ajo. Në fund jep 2–3 këshilla të shkurtra për ta përmirësuar edhe më. Përshtatu tonit të kërkuar. GJUHA E CV-së: shkruaje CV-në në gjuhën që zgjedh përdoruesja te 'Në çfarë gjuhe ta bëj CV-në' — nëse zgjedh Anglisht, shkruaje TË GJITHË CV-në në anglisht edhe pse biseda është në shqip, por këshillat dhe shpjegimet jepi në shqip.",
  },
  {
    id: "interview",
    icon: "MessagesSquare",
    category: "cv",
    title: { sq: "Më përgatit për një intervistë pune", en: "Prepare me for a job interview" },
    description: {
      sq: "Provojmë intervistën bashkë: pyetje, përgjigje shembull dhe këshilla qetësuese.",
      en: "Let's rehearse together: questions, sample answers and calming tips.",
    },
    fields: [
      {
        name: "role",
        type: "text",
        required: true,
        label: { sq: "Cila është pozita?", en: "What is the position?" },
        placeholder: { sq: "p.sh. Shitëse në dyqan rrobash", en: "e.g. Sales assistant in a clothing shop" },
      },
      {
        name: "company",
        type: "text",
        label: { sq: "Kompania (opsionale)", en: "Company (optional)" },
        placeholder: { sq: "p.sh. një market i madh", en: "e.g. a large supermarket" },
      },
      {
        name: "focus",
        type: "select",
        label: { sq: "Ku ke më shumë frikë?", en: "What worries you most?" },
        options: [
          { sq: "Pyetjet e vështira", en: "Hard questions" },
          { sq: "Të flas për veten", en: "Talking about myself" },
          { sq: "Të flas për pagën", en: "Talking about salary" },
          { sq: "Mungesa e përvojës", en: "Lack of experience" },
        ],
      },
    ],
    systemInstruction:
      "Detyra: përgatit përdoruesen për një intervistë pune. Jep 5–7 pyetje që ka gjasa t'i bëjnë, secila me një përgjigje-shembull të personalizuar që ajo mund ta përshtatë. Shto 3 këshilla të shkurtra qetësuese për nervat dhe gjuhën e trupit. Adreso veçanërisht shqetësimin që zgjodhi. Ftoje të vazhdojë bisedën nëse do të ushtrojë me role-play.",
  },
  {
    id: "raise",
    icon: "TrendingUp",
    category: "career",
    title: { sq: "Më ndihmo të kërkoj rritje page", en: "Help me ask for a raise" },
    description: {
      sq: "Të shkruaj mesazhin dhe ta shpjegoj arsyetimin — me vetëbesim dhe respekt.",
      en: "I'll draft the message and explain the reasoning — with confidence and respect.",
    },
    fields: [
      {
        name: "role",
        type: "text",
        required: true,
        label: { sq: "Çfarë pune bën?", en: "What do you do?" },
        placeholder: { sq: "p.sh. Kontabiliste prej 3 vitesh", en: "e.g. Accountant for 3 years" },
      },
      {
        name: "achievements",
        type: "textarea",
        required: true,
        label: { sq: "Çfarë ke arritur kohët e fundit?", en: "What have you achieved recently?" },
        placeholder: {
          sq: "p.sh. mbylla llogaritë pa gabime, ndihmova 2 kolege të reja…",
          en: "e.g. closed the accounts with no errors, trained 2 new colleagues…",
        },
      },
      {
        name: "context",
        type: "text",
        label: { sq: "Diçka tjetër që duhet të di? (opsionale)", en: "Anything else I should know? (optional)" },
        placeholder: { sq: "p.sh. s'kam pasur rritje prej 2 vitesh", en: "e.g. no raise for 2 years" },
      },
    ],
    systemInstruction:
      "Detyra: ndihmoje përdoruesen të kërkojë rritje page. Kthe tri pjesë të qarta: (1) një draft mesazhi ose email-i të shkurtër e profesional për menaxherin/en; (2) arsyetimin pas tij, çfarë të theksojë gjatë bisedës; (3) si t'i përgjigjet me qetësi nëse dëgjon 'jo' ose 'jo tani'. Toni: i sigurt, konkret dhe respektues, kurrë kërkues a kërcënues. Bazohu te arritjet e saj reale.",
  },
  {
    id: "week",
    icon: "CalendarHeart",
    category: "motherhood",
    title: { sq: "Planifiko javën time si nënë që punon", en: "Plan my week as a working mother" },
    description: {
      sq: "Vakte, orar dhe pak lehtësim për ngarkesën mendore — pa kërkuar përsosmëri.",
      en: "Meals, schedule and some mental-load relief — without demanding perfection.",
    },
    fields: [
      {
        name: "family",
        type: "text",
        required: true,
        label: { sq: "Sa fëmijë ke dhe çfarë moshe?", en: "How many children and what ages?" },
        placeholder: { sq: "p.sh. dy, 3 dhe 7 vjeç", en: "e.g. two, ages 3 and 7" },
      },
      {
        name: "work",
        type: "text",
        label: { sq: "Orari yt i punës", en: "Your work schedule" },
        placeholder: { sq: "p.sh. 9:00–17:00, të hënë–të premte", en: "e.g. 9:00–17:00, Mon–Fri" },
      },
      {
        name: "needs",
        type: "textarea",
        required: true,
        label: { sq: "Çfarë të rëndon më shumë këtë javë?", en: "What weighs on you most this week?" },
        placeholder: {
          sq: "p.sh. gatimi çdo ditë, lëndët e fëmijëve, koha për veten…",
          en: "e.g. cooking every day, kids' homework, time for myself…",
        },
      },
    ],
    systemInstruction:
      "Detyra: krijo një plan jave realist dhe të dhembshur për një nënë që punon. Përfshi: një orar të thjeshtë ditë-për-ditë; ide vaktesh të shpejta që mund të përgatiten paraprakisht; ndarje detyrash që mund t'i delegojë (partneri, fëmijët sipas moshës); dhe të paktën dy momente të vogla vetëm për veten. Mos kërko përsosmëri — propozo zgjidhje që lehtësojnë ngarkesën mendore. Ton i ngrohtë dhe kuptues.",
  },
  {
    id: "business",
    icon: "Lightbulb",
    category: "business",
    title: { sq: "Më ndihmo të nis një ide biznesi", en: "Help me start a small business idea" },
    description: {
      sq: "Nga ideja te hapat e parë konkretë që mund t'i ndërmarrësh që sot.",
      en: "From idea to concrete first steps you can take today.",
    },
    fields: [
      {
        name: "idea",
        type: "textarea",
        required: true,
        label: { sq: "Cila është ideja jote? (edhe e papërpunuar)", en: "What is your idea? (even rough)" },
        placeholder: {
          sq: "p.sh. të shes ëmbëlsira shtëpie me porosi",
          en: "e.g. sell homemade cakes to order",
        },
      },
      {
        name: "budget",
        type: "text",
        label: { sq: "Buxhet fillestar (opsionale)", en: "Starting budget (optional)" },
        placeholder: { sq: "p.sh. 200 €", en: "e.g. €200" },
      },
      {
        name: "location",
        type: "text",
        label: { sq: "Ku — qytet/zonë (opsionale)", en: "Where — city/area (optional)" },
        placeholder: { sq: "p.sh. Prishtinë", en: "e.g. Pristina" },
      },
    ],
    systemInstruction:
      "Detyra: ndihmoje përdoruesen ta kthejë idenë në hapa konkretë. Jep: 2–3 mundësi emri; kush janë klientët e parë dhe ku t'i gjejë; si të fillojë me buxhetin që ka (ose me shumë pak para); tri hapat e parë praktikë për këtë javë; dhe një ose dy rreziqe që duhet t'i ketë parasysh. Përshtatu tregut shqiptar dhe diasporës. Ji inkurajuese dhe e realiste njëkohësisht.",
  },
  {
    id: "letter",
    icon: "ScrollText",
    category: "admin",
    title: { sq: "Më shpjego këtë letër zyrtare thjesht", en: "Explain this official letter simply" },
    description: {
      sq: "Ngjit tekstin dhe ta shpjegoj çfarë do, çfarë afate ka dhe çfarë të bësh.",
      en: "Paste the text and I'll explain what it wants, any deadlines, and what to do.",
    },
    fields: [
      {
        name: "text",
        type: "textarea",
        required: true,
        label: { sq: "Ngjit tekstin e letrës ose dokumentit", en: "Paste the letter or document text" },
        placeholder: {
          sq: "Ngjit këtu çdo gjë që shkruan dokumenti…",
          en: "Paste everything the document says here…",
        },
      },
      {
        name: "question",
        type: "text",
        label: { sq: "Çfarë do të dish konkretisht? (opsionale)", en: "What exactly do you want to know? (optional)" },
        placeholder: { sq: "p.sh. a duhet të paguaj diçka?", en: "e.g. do I have to pay something?" },
      },
    ],
    systemInstruction:
      "Detyra: shpjego një dokument zyrtar me fjalë shumë të thjeshta, sikur t'ia shpjegoje një mikeje. Jep: (1) çfarë është ky dokument me një fjali; (2) çfarë kërkon prej saj; (3) afatet ose datat e rëndësishme; (4) hapat konkretë që duhet të bëjë; dhe (5) nëse duhet të përgjigjet, një draft përgjigjeje të sjellshme. Shmang zhargonin ligjor; kur s'mund ta shmangësh një term, shpjegoje në kllapa. Mos jep këshilla ligjore zyrtare — sugjero të konsultohet me një specialist kur çështja është serioze.",
  },
  {
    id: "english",
    icon: "Languages",
    category: "english",
    title: { sq: "Më ndihmo me anglishten", en: "Help me with English" },
    description: {
      sq: "Mëso fjalë, përkthe diçka ose shkruaj një email në anglisht — me shpjegime në shqip.",
      en: "Learn words, translate something, or write an email in English — explained in Albanian.",
    },
    fields: [
      {
        name: "task",
        type: "select",
        label: { sq: "Çfarë të duhet?", en: "What do you need?" },
        options: [
          { sq: "Të shkruaj një email", en: "Write an email" },
          { sq: "Të përkthej diçka", en: "Translate something" },
          { sq: "Të mësoj fraza", en: "Learn phrases" },
          { sq: "Të ushtroj bisedë", en: "Practise conversation" },
        ],
      },
      {
        name: "detail",
        type: "textarea",
        required: true,
        label: { sq: "Shkruaj detajet ose tekstin", en: "Write the details or text" },
        placeholder: {
          sq: "p.sh. dua të kërkoj informacion për një punë…",
          en: "e.g. I want to ask about a job opening…",
        },
      },
      {
        name: "level",
        type: "select",
        label: { sq: "Niveli yt i anglishtes", en: "Your English level" },
        options: [
          { sq: "Fillestar", en: "Beginner" },
          { sq: "Mesatar", en: "Intermediate" },
          { sq: "I avancuar", en: "Advanced" },
        ],
      },
    ],
    systemInstruction:
      "Detyra: ndihmo me anglishten sipas asaj që zgjedh. Pjesën e kërkuar (email-in ose përkthimin) jepe në ANGLISHT; por shpjegimet dhe udhëzimet jepi në SHQIP, që përdoruesja t'i kuptojë. Për mësim frazash, jep çiftet shqip ↔ anglisht me shqiptim të thjeshtë në kllapa. Përshtatu nivelit të saj. Ky është rasti i vetëm ku lejohet të përziesh shqipen me anglishten, sepse është mësim gjuhe.",
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
