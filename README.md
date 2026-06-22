# VASHA

**AI fluency + belonging for Albanian-speaking women.**

VASHA is a warm, mobile-first web app where women across Albania, Kosovo and the
diaspora learn AI and use it for real life — CVs, interviews, asking for a raise,
planning the week as a working mother, starting a small business, understanding
official letters, and learning English. Everything is in **Albanian (Shqip) by
default**, with an English toggle. The product is fluency and sisterhood — not a
shop for prompt PDFs.

> It runs the moment you clone it. With **no keys at all**, VASHA boots in a
> friendly **demo mode**. Each real service (Gemini, Supabase, Stripe) lights up
> automatically the moment you add its keys.

---

## Features

- **AI Practice Sandbox** — 7 guided scenarios (CV, interview, raise, working-mum
  week, business idea, official letters, English) + a free-request mode. She never
  faces a blank box; replies stream word-by-word in Albanian.
- **AI Tools (multimodal + grounded)** — built on Gemini's own capabilities through
  the same secure proxy: **Document Helper** (reads a photo/PDF and explains it in
  Albanian), **Personal Style Curator** (body-positive styling, optional photo), and
  **Local Help** (country-aware answers grounded with Google Search + citations,
  plus curated safety resources). Uploads are processed then discarded — not stored.
- **Living Prompt Library** — 15 ready-to-run Albanian ideas, searchable and
  filterable, each runnable in the Sandbox with one tap, plus copy / favourite / rate.
- **Guided Learning Paths** — short, gentle lessons that each end in a hands-on task.
- **Community** — topic circles (Mothers, Job-seekers, Entrepreneurs, Beginners),
  posts, replies, and a Success-stories wall.
- **30-Day AI Challenge** — one small task a day, with a streak.
- **Accounts & tiers** — Free (daily Sandbox limit + community read) vs Premium
  (unlimited + everything), via Supabase auth + Stripe.

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres + Auth) ·
Stripe · Google Gemini via a **server-only streaming proxy** · deploys to Vercel.

---

## Quick start (demo mode — no keys)

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The whole app works: pick a Sandbox scenario and
you'll get a friendly sample answer streaming in Albanian, browse the library,
take lessons, post in the community (saved locally), and run the challenge.

> **Node:** works on Node 18.17+, but Node 18 is end-of-life — **Node 20 LTS is
> recommended**.

---

## Turn on real AI (Google Gemini)

1. Get a **free** API key at **[Google AI Studio](https://aistudio.google.com/apikey)**.
2. Copy `.env.example` to `.env.local` and set:

```
GEMINI_API_KEY=your-key-here
GEMINI_MODEL=gemini-3.5-flash
GEMINI_MAX_OUTPUT_TOKENS=2048
```

3. Restart `npm run dev`. Sandbox answers now come from Gemini, streaming live.

**About the model name.** `GEMINI_MODEL` is the *one* place to change models — no
code edits. The default is `gemini-3.5-flash`. Google rotates model availability,
so if you get a 404, switch to one your key can access. List your models with:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models" -H "x-goog-api-key: $GEMINI_API_KEY"
```

Good options: `gemini-2.5-flash` (safe fallback) · `gemini-3.1-flash-lite`
(cheapest, high volume) · `gemini-3.1-pro` (highest quality). Gemini 3.x
temperature/topP/topK defaults are intentionally left untouched.

### 🔒 Security — how the key is protected

- `GEMINI_API_KEY` is read **only** inside server routes (`src/app/api/sandbox`).
  It is **never** sent to the browser and **never** prefixed `NEXT_PUBLIC_`.
- The browser calls **your** server (`/api/sandbox`); your server calls Gemini with
  the key in the `x-goog-api-key` **header** (never the URL).
- Your CV / message text is **not stored** — it's used only to produce the reply.

Verify: open DevTools → Network while running the Sandbox. You'll see a request to
`/api/sandbox`, not to Google, and no key anywhere in the client bundle.

---

## Turn on accounts, tiers & community (Supabase)

See **[`supabase/README.md`](supabase/README.md)**. In short: create a project,
run `supabase/migrations/0001_init.sql` then `supabase/seed.sql` in the SQL editor,
and set:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # server-only
```

The free-tier daily Sandbox limit is server-enforced (`FREE_DAILY_SANDBOX_LIMIT`,
default 5).

---

## Turn on Premium payments (Stripe)

1. In Stripe (test mode), create a **recurring Price** for Premium and copy its id.
2. Set:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...
```

3. Forward webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

On checkout, the webhook flips `profiles.tier` to `premium`. Without Stripe keys,
the Premium button shows a clearly-labelled **demo upgrade**.

---

## Editing the Albanian copy (it's all yours to refine)

- **UI strings:** [`messages/sq.json`](messages/sq.json) (default) and
  [`messages/en.json`](messages/en.json).
- **Sandbox scenarios + their AI instructions:** [`src/lib/content/scenarios.ts`](src/lib/content/scenarios.ts).
- **The AI's voice & language rule:** [`src/lib/gemini/systemPrompt.ts`](src/lib/gemini/systemPrompt.ts).
- **Prompt library / lessons / challenge / circles:** `src/lib/content/*.ts`.

Each content item carries `{ sq, en }`, so the toggle just works.

---

## Deploy to Vercel

1. Push to GitHub and import the repo in Vercel.
2. Add every env var from `.env.example` you're using (Project → Settings → Environment Variables).
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL, and add it to Supabase Auth →
   URL Configuration and your Stripe webhook endpoint.

> **Streaming note:** the Sandbox streams from a Node-runtime route with
> `maxDuration = 60`. Vercel **Hobby** caps functions at **10s**, which can cut a
> long answer short — use **Pro** (60s) for production.

---

## Privacy (plain words)

We don't store the text you write (CV, messages, stories). AI requests pass through
our server to Google Gemini only to return your answer, then they're gone. Our keys
stay on the server, never in your browser. See `/privacy` in the app.

---

## What's stubbed / simplified for v1

- **Community** persistence is basic and **local-only in the app** (posts, replies,
  stories save to your browser). The Supabase tables + RLS exist for a real backend;
  moderation, notifications and rich text are deferred.
- **Favourites, ratings, saved answers, lesson/challenge progress** persist in
  `localStorage` (works in demo and signed-in); server sync is a future step.
- **Stripe** ships in test mode with a price id you create.
- **`GEMINI_MODEL`** default may need confirming against your Google account.
- **⚠️ Localized safety resources** (`src/lib/content/resources.ts`) ship with the
  universal emergency numbers pre-filled and `[VERIFIKO …]` placeholders for women's
  helplines / legal aid. **Replace the placeholders with verified, current contacts
  before launch** — the app shows safety contacts ONLY from this human-verified file
  and never lets the AI invent them.
- **Local Help grounding** needs a Gemini key (it uses the `google_search` tool);
  **country** is collected each time you use the tool, and a `profiles.country` column
  exists (`migrations/0002_country.sql`) — persisting it at signup is a small next step.
- Large uploads (>~4 MB) are rejected client-side; for bigger PDFs, switch the proxy
  to Gemini's Files API.
- Magic-link email uses Supabase defaults; ratings are a simple average; there's no
  admin dashboard yet; lessons/challenge are starter content to grow.

---

## Project structure

```
messages/            sq.json · en.json        (all UI copy)
supabase/            migrations/ · seed.sql · README.md
src/
  app/               pages + /api (sandbox proxy, stripe, me, auth callback)
  components/        layout · ui · sandbox · library
  lib/
    content/         scenarios · prompts · lessons · challenge · circles · community
    gemini/          client (server-only) · systemPrompt · demo
    supabase/        client · server · middleware · config
    i18n/            LanguageProvider
    auth.ts · tiers.ts · ratelimit.ts · stripe.ts · local.ts
```

Made with care for Albanian women. 💜
