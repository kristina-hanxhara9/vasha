import type { ChallengeDay } from "@/lib/types";

/**
 * The 30-Day AI Challenge — one small, real task per day. Gentle on purpose.
 * Keep tasks tiny and concrete so finishing feels easy and good.
 */
export const CHALLENGE: ChallengeDay[] = [
  {
    day: 1,
    title: { sq: "Përshëndetu me AI-në", en: "Say hello to AI" },
    task: {
      sq: "Pyet AI-në një pyetje të thjeshtë për ditën tënde dhe shiko si të përgjigjet.",
      en: "Ask the AI one simple question about your day and see how it answers.",
    },
  },
  {
    day: 2,
    title: { sq: "Një gjë që do ta dish", en: "One thing you're curious about" },
    task: {
      sq: "Kërko t'ia shpjegojë me fjalë të thjeshta diçka që gjithmonë ke dashur ta kuptosh.",
      en: "Ask it to explain, in simple words, something you've always wanted to understand.",
    },
  },
  {
    day: 3,
    title: { sq: "Lista e ditës", en: "Today's list" },
    task: {
      sq: "Jepi gjërat që ke për të bërë sot dhe kërko t'i rendisë sipas rëndësisë.",
      en: "Give it your to-dos for today and ask it to order them by importance.",
    },
    scenarioId: "week",
  },
  {
    day: 4,
    title: { sq: "Një mesazh i vështirë", en: "A tricky message" },
    task: {
      sq: "Merr ndihmë për të shkruar një mesazh që e ke shtyrë — shkurt dhe me ton të qetë.",
      en: "Get help writing a message you've been putting off — short and calm.",
    },
  },
  {
    day: 5,
    title: { sq: "Fjalë për veten", en: "Words for yourself" },
    task: {
      sq: "Kërkoji AI-së tri fjalë inkurajuese për një gjë që po të frikëson.",
      en: "Ask the AI for three encouraging words about something that scares you.",
    },
  },
  {
    day: 6,
    title: { sq: "Aftësitë e tua", en: "Your skills" },
    task: {
      sq: "Bëj një listë me gjërat që di të bësh mirë — lëre AI-në të të ndihmojë t'i emërtosh.",
      en: "Make a list of things you do well — let the AI help you name them.",
    },
  },
  {
    day: 7,
    title: { sq: "Pushim & reflektim", en: "Rest & reflect" },
    task: {
      sq: "Java e parë u mbyll! Pyet AI-në: 'Çfarë mësova këtë javë?' dhe shkruaj një fjali.",
      en: "First week done! Ask the AI: 'What did I learn this week?' and write one sentence.",
    },
  },
  {
    day: 8,
    title: { sq: "Nis CV-në tënde", en: "Start your CV" },
    task: {
      sq: "Hap skenarin e CV-së dhe plotëso vetëm përvojën tënde. Mos u shqetëso për përsosmëri.",
      en: "Open the CV scenario and fill in just your experience. Don't worry about perfection.",
    },
    scenarioId: "cv",
  },
  {
    day: 9,
    title: { sq: "Përmirëso CV-në", en: "Polish your CV" },
    task: {
      sq: "Kërkoji AI-së ta bëjë CV-në tënde më të fortë me 3 sugjerime.",
      en: "Ask the AI to make your CV stronger with 3 suggestions.",
    },
  },
  {
    day: 10,
    title: { sq: "Letër motivimi", en: "Cover letter" },
    task: {
      sq: "Shkruaj një letër të shkurtër motivimi për një punë që të intereson.",
      en: "Write a short cover letter for a job that interests you.",
    },
  },
  {
    day: 11,
    title: { sq: "Provo intervistën", en: "Rehearse the interview" },
    task: {
      sq: "Përdor skenarin e intervistës dhe përgjigju 3 pyetjeve me zë.",
      en: "Use the interview scenario and answer 3 questions out loud.",
    },
    scenarioId: "interview",
  },
  {
    day: 12,
    title: { sq: "Fol për pagën", en: "Talk about pay" },
    task: {
      sq: "Kërko ndihmë si të flasësh për pagën në një intervistë ose me shefin.",
      en: "Get help on how to talk about salary in an interview or with your boss.",
    },
    scenarioId: "raise",
  },
  {
    day: 13,
    title: { sq: "Plani i javës", en: "Plan your week" },
    task: {
      sq: "Planifiko javën tënde me ndihmën e AI-së — punë, shtëpi dhe pak kohë për veten.",
      en: "Plan your week with AI — work, home and a little time for yourself.",
    },
    scenarioId: "week",
  },
  {
    day: 14,
    title: { sq: "Menu e shpejtë", en: "Quick menu" },
    task: {
      sq: "Kërko një menu 3-ditore me vakte të shpejta e të shëndetshme.",
      en: "Ask for a 3-day menu of quick, healthy meals.",
    },
  },
  {
    day: 15,
    title: { sq: "Gjysma e rrugës!", en: "Halfway there!" },
    task: {
      sq: "15 ditë! Pyet AI-në të të kujtojë pse ia nise. Krenare për ty.",
      en: "15 days! Ask the AI to remind you why you started. Proud of you.",
    },
  },
  {
    day: 16,
    title: { sq: "Një letër zyrtare", en: "An official letter" },
    task: {
      sq: "Merr një letër ose faturë që s'e ke kuptuar dhe kërko ta shpjegojë thjesht.",
      en: "Take a letter or bill you didn't understand and ask it to explain simply.",
    },
    scenarioId: "letter",
  },
  {
    day: 17,
    title: { sq: "Thuaj 'jo'", en: "Say 'no'" },
    task: {
      sq: "Ushtro si të refuzosh diçka me edukatë por me vendosmëri.",
      en: "Practise declining something politely but firmly.",
    },
  },
  {
    day: 18,
    title: { sq: "Bisedë e vështirë", en: "A hard conversation" },
    task: {
      sq: "Përgatitu për një bisedë që po e shtyn — çfarë të thuash dhe si të rrish e qetë.",
      en: "Prepare for a conversation you're avoiding — what to say and how to stay calm.",
    },
  },
  {
    day: 19,
    title: { sq: "Ideja jote", en: "Your idea" },
    task: {
      sq: "Përshkruaj një ide biznesi (edhe të vogël) dhe merr 3 hapat e parë.",
      en: "Describe a business idea (even a small one) and get the first 3 steps.",
    },
    scenarioId: "business",
  },
  {
    day: 20,
    title: { sq: "Emër & slogan", en: "Name & slogan" },
    task: {
      sq: "Kërko 5 emra dhe një slogan për idenë tënde.",
      en: "Ask for 5 names and a slogan for your idea.",
    },
  },
  {
    day: 21,
    title: { sq: "Postim që shet", en: "A post that sells" },
    task: {
      sq: "Shkruaj një postim për rrjete sociale për diçka që do të ofroje.",
      en: "Write a social media post for something you'd offer.",
    },
  },
  {
    day: 22,
    title: { sq: "Çmimi i drejtë", en: "A fair price" },
    task: {
      sq: "Kërko ndihmë si të vendosësh një çmim të drejtë për produktin ose shërbimin tënd.",
      en: "Get help setting a fair price for your product or service.",
    },
  },
  {
    day: 23,
    title: { sq: "Buxheti i thjeshtë", en: "A simple budget" },
    task: {
      sq: "Lëre AI-në të të ndihmojë të bësh një buxhet të thjeshtë mujor.",
      en: "Let the AI help you make a simple monthly budget.",
    },
  },
  {
    day: 24,
    title: { sq: "Fjalë anglisht", en: "English words" },
    task: {
      sq: "Mëso 10 fjalë anglisht që do t'i përdorësh këtë javë.",
      en: "Learn 10 English words you'll use this week.",
    },
    scenarioId: "english",
  },
  {
    day: 25,
    title: { sq: "Email në anglisht", en: "An email in English" },
    task: {
      sq: "Shkruaj një email të shkurtër në anglisht me shpjegim në shqip.",
      en: "Write a short email in English with an explanation in Albanian.",
    },
    scenarioId: "english",
  },
  {
    day: 26,
    title: { sq: "Prezantohu", en: "Introduce yourself" },
    task: {
      sq: "Përgatit 3 fjali për të prezantuar veten — në punë ose online.",
      en: "Prepare 3 sentences to introduce yourself — at work or online.",
    },
  },
  {
    day: 27,
    title: { sq: "Mëso diçka të re", en: "Learn something new" },
    task: {
      sq: "Zgjidh një temë që të intereson dhe kërko një mësim 5-minutësh.",
      en: "Pick a topic you're curious about and ask for a 5-minute lesson.",
    },
  },
  {
    day: 28,
    title: { sq: "Ndihmo dikë", en: "Help someone" },
    task: {
      sq: "Përdor AI-në për të ndihmuar një mike ose familjar me diçka konkrete.",
      en: "Use AI to help a friend or family member with something concrete.",
    },
  },
  {
    day: 29,
    title: { sq: "Shkruaj fitoren tënde", en: "Write your win" },
    task: {
      sq: "Shkruaj një fitore të vogël nga këto 30 ditë — mund ta ndash në Komunitet.",
      en: "Write one small win from these 30 days — you can share it in the Community.",
    },
  },
  {
    day: 30,
    title: { sq: "E arrite!", en: "You did it!" },
    task: {
      sq: "30 ditë të plota! Pyet AI-në: 'Si jam rritur?' dhe festoje veten. E meriton.",
      en: "A full 30 days! Ask the AI: 'How have I grown?' and celebrate yourself. You earned it.",
    },
  },
];
