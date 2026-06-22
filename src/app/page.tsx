"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import heroGirl from "@/images/hero-girl.png";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { MACROS, ACCENTS } from "@/lib/content/categories";
import { PROMPTS } from "@/lib/content/prompts";
import { cn } from "@/lib/utils";
import type { Localized } from "@/lib/types";

const STEPS: { title: Localized; body: Localized }[] = [
  { title: { sq: "Zgjidh çfarë problemi do të zgjidhësh", en: "Choose the problem to solve" }, body: { sq: "CV, intervistë, biznes — çfarë të duhet sot.", en: "CV, interview, business — whatever you need today." } },
  { title: { sq: "Plotëso pak detaje për ta personalizuar", en: "Add a few details to personalize it" }, body: { sq: "Disa fusha të vogla, asgjë e komplikuar.", en: "A few small fields, nothing complicated." } },
  { title: { sq: "Merre përgjigjen në shqip", en: "Get the answer in Albanian" }, body: { sq: "Bisedo me VASHA-n po aty, hap pas hapi.", en: "Chat with VASHA right there, step by step." } },
  { title: { sq: "Kopjoje për ta përdorur kudo", en: "Copy it to use anywhere" }, body: { sq: "Kopjoje dhe përdore kudo, edhe në ChatGPT nëse do.", en: "Copy it and use it anywhere, even in ChatGPT." } },
];

function StepArt({ n }: { n: number }) {
  const svg = { viewBox: "0 0 96 96", className: "h-full w-full", xmlns: "http://www.w3.org/2000/svg" } as const;
  if (n === 0) {
    return (
      <svg {...svg} aria-hidden="true">
        <rect x="6" y="6" width="84" height="84" rx="22" fill="#F9D9E6" />
        <rect x="20" y="24" width="26" height="20" rx="5" fill="#ffffff" stroke="#E7CDDD" strokeWidth="2" />
        <rect x="50" y="24" width="26" height="20" rx="5" fill="#D6488A" />
        <rect x="20" y="52" width="26" height="20" rx="5" fill="#ffffff" stroke="#E7CDDD" strokeWidth="2" />
        <rect x="50" y="52" width="26" height="20" rx="5" fill="#ffffff" stroke="#E7CDDD" strokeWidth="2" />
        <path d="M57 34 l4 4 l9 -9" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (n === 1) {
    return (
      <svg {...svg} aria-hidden="true">
        <rect x="6" y="6" width="84" height="84" rx="22" fill="#E7CDDD" />
        <rect x="22" y="20" width="52" height="56" rx="9" fill="#ffffff" />
        <rect x="30" y="32" width="36" height="5" rx="2.5" fill="#E7CDDD" />
        <rect x="30" y="44" width="26" height="5" rx="2.5" fill="#E7CDDD" />
        <rect x="30" y="56" width="32" height="5" rx="2.5" fill="#E7CDDD" />
        <path d="M60 60 l13 -13 l7 7 l-13 13 l-8 1 z" fill="#D6A148" />
        <path d="M60 60 l4 4 -5 1 z" fill="#6B3A5B" />
      </svg>
    );
  }
  if (n === 2) {
    return (
      <svg {...svg} aria-hidden="true">
        <rect x="6" y="6" width="84" height="84" rx="22" fill="#F9D9E6" />
        <rect x="14" y="24" width="46" height="26" rx="10" fill="#6B3A5B" />
        <path d="M24 50 l0 9 l9 -9 z" fill="#6B3A5B" />
        <rect x="24" y="33" width="26" height="4" rx="2" fill="#E7CDDD" />
        <rect x="24" y="41" width="18" height="4" rx="2" fill="#E7CDDD" />
        <rect x="40" y="50" width="42" height="22" rx="10" fill="#ffffff" stroke="#E7CDDD" strokeWidth="2" />
        <path d="M72 72 l0 8 l-9 -8 z" fill="#ffffff" />
        <rect x="48" y="58" width="26" height="4" rx="2" fill="#D3A9C2" />
        <rect x="48" y="65" width="16" height="4" rx="2" fill="#D3A9C2" />
      </svg>
    );
  }
  return (
    <svg {...svg} aria-hidden="true">
      <rect x="6" y="6" width="84" height="84" rx="22" fill="#FBF3E2" />
      <rect x="24" y="22" width="34" height="44" rx="8" fill="#ffffff" stroke="#E7CDDD" strokeWidth="2" />
      <rect x="38" y="32" width="40" height="44" rx="8" fill="#6B3A5B" />
      <rect x="45" y="42" width="26" height="4" rx="2" fill="#F6E6C5" />
      <rect x="45" y="51" width="20" height="4" rx="2" fill="#F6E6C5" />
      <path d="M47 62 l5 5 l12 -13" fill="none" stroke="#D6A148" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MacroArt({ id }: { id: string }) {
  const p = { viewBox: "0 0 40 40", fill: "currentColor", className: "h-7 w-7", xmlns: "http://www.w3.org/2000/svg" } as const;
  switch (id) {
    case "career":
      return (
        <svg {...p} aria-hidden="true">
          <path d="M15 13 v-1.5 a3 3 0 0 1 3-3 h4 a3 3 0 0 1 3 3 V13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <rect x="7" y="13" width="26" height="20" rx="5" />
          <rect x="7" y="20" width="26" height="3" opacity="0.35" />
          <rect x="17.5" y="19" width="5" height="5" rx="1.5" opacity="0.55" />
        </svg>
      );
    case "business":
      return (
        <svg {...p} aria-hidden="true">
          <path d="M7 16 l2.5 -6 h21 l2.5 6 z" opacity="0.55" />
          <rect x="9" y="16" width="22" height="17" rx="2.5" />
          <rect x="16" y="23" width="8" height="10" rx="1.5" opacity="0.4" />
        </svg>
      );
    case "english":
      return (
        <svg {...p} aria-hidden="true">
          <path d="M9 9 h22 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 H18 l-6 5 v-5 H9 a4 4 0 0 1 -4 -4 v-8 a4 4 0 0 1 4 -4 z" />
          <circle cx="14" cy="17" r="1.8" opacity="0.5" />
          <circle cx="20" cy="17" r="1.8" opacity="0.5" />
          <circle cx="26" cy="17" r="1.8" opacity="0.5" />
        </svg>
      );
    case "confidence":
      return (
        <svg {...p} aria-hidden="true">
          <ellipse cx="20" cy="11" rx="4.5" ry="6" />
          <ellipse cx="29" cy="20" rx="6" ry="4.5" />
          <ellipse cx="20" cy="29" rx="4.5" ry="6" />
          <ellipse cx="11" cy="20" rx="6" ry="4.5" />
          <circle cx="20" cy="20" r="3.8" opacity="0.5" />
        </svg>
      );
    case "motherhood":
      return (
        <svg {...p} aria-hidden="true">
          <path d="M16 31 C8 25.5 4.5 20.5 4.5 15.5 C4.5 12 7 9.7 10 9.7 C12.6 9.7 14.6 11.4 16 13.5 C17.4 11.4 19.4 9.7 22 9.7 C25 9.7 27.5 12 27.5 15.5 C27.5 20.5 24 25.5 16 31 Z" />
          <path d="M30 20 c2.8 -1.9 4.2 -3.6 4.2 -5.5 c0 -1.5 -1.1 -2.6 -2.5 -2.6 c-1 0 -1.7 0.6 -2.2 1.4 c-0.5 -0.8 -1.2 -1.4 -2.2 -1.4 c-1.4 0 -2.5 1.1 -2.5 2.6 c0 1.9 1.4 3.6 5.2 5.5 z" opacity="0.55" />
        </svg>
      );
    default:
      return (
        <svg {...p} aria-hidden="true">
          <path d="M20 5 c1.6 8 3.6 10 11.5 11.5 c-7.9 1.5 -9.9 3.5 -11.5 11.5 c-1.6 -8 -3.6 -10 -11.5 -11.5 c7.9 -1.5 9.9 -3.5 11.5 -11.5 z" />
          <circle cx="32" cy="31" r="2.4" opacity="0.6" />
          <circle cx="9" cy="10" r="1.8" opacity="0.5" />
        </svg>
      );
  }
}

export default function HomePage() {
  const { loc } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const featured = PROMPTS.slice(0, 3);

  return (
    <div>
      {/* ---------------- Hero (photo background) ---------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroGirl.src} alt="" className="h-full w-full object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/90 to-ivory/25 lg:via-ivory/80 lg:to-transparent" />
          <div className="absolute inset-0 bg-ivory/30 sm:bg-ivory/5 lg:bg-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[540px] max-w-6xl items-center px-4 py-16 sm:px-6 lg:min-h-[600px]">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100/90 px-3 py-1 text-xs font-medium text-rose-600 backdrop-blur-sm">
              <Icon name="Heart" className="h-3.5 w-3.5" aria-hidden="true" />
              {loc({ sq: "Inteligjenca artificiale. Mundësi pa fund.", en: "Artificial intelligence. Endless possibilities." })}
            </span>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.04] sm:text-6xl">
              <span className="block text-charcoal">{loc({ sq: "Ti mundesh.", en: "You can." })}</span>
              <span className="block bg-gradient-to-r from-rose-500 to-plum-500 bg-clip-text font-display italic text-transparent">
                {loc({ sq: "Ne të mbështesim.", en: "We support you." })}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-balance text-lg leading-relaxed text-charcoal/80">
              {loc({
                sq: "Mjete, komanda dhe burime, të bëra për gratë shqiptare që duan të rriten, të punojnë dhe të ndërtojnë jetën që ëndërrojnë.",
                en: "Tools, prompts and resources, made for Albanian women who want to grow, work and build the life they dream of.",
              })}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/sandbox" className={cn(buttonClasses("rose", "lg"), "shadow-card")}>
                {loc({ sq: "Fillo tani — falas", en: "Start now — free" })}
                <Icon name="ArrowRight" className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/library" className={cn(buttonClasses("secondary", "lg"), "bg-white/80 backdrop-blur-sm")}>
                {loc({ sq: "Shiko të gjitha komandat", en: "See all commands" })}
              </Link>
            </div>
            <div className="mt-7">
              <p className="max-w-[23rem] text-base font-semibold leading-snug text-plum-700">
                {loc({
                  sq: "Ndihmojmë gratë shqiptare të mësojnë inteligjencën artificiale lehtë dhe shpejt.",
                  en: "We help Albanian women learn artificial intelligence — easily and fast.",
                })}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { sq: "Plotësisht falas", en: "Completely free" },
                  { sq: "Në shqip", en: "In Albanian" },
                  { sq: "Pa njohuri teknike", en: "No tech skills" },
                ].map((it, i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/80">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-500 text-white">
                      <Icon name="Check" className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {loc(it)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </section>

      {/* ---------------- Macro categories ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-plum-700 sm:text-4xl">
            {loc({ sq: "Zgjidh atë që të duhet më shumë", en: "Choose what you need most" })}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MACROS.map((m, i) => {
            const accent = ACCENTS[m.accent];
            return (
              <Reveal key={m.id} delay={i * 70}>
                <Link
                  href={m.cat ? `/library?cat=${m.cat}` : "/library"}
                  className="vasha-card group block h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className={cn("grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110", accent.tile, accent.icon)}>
                    <MacroArt id={m.id} />
                  </span>
                  <h3 className="mt-4 font-semibold text-plum-700">{loc(m.name)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{loc(m.subtitle)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-rose-600">
                    {loc({ sq: "Shiko", en: "Explore" })}
                    <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="border-y border-plum-100 bg-gradient-to-b from-rose-50/60 to-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-plum-700 sm:text-4xl">
              {loc({ sq: "Si funksionon?", en: "How does it work?" })}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="text-center">
                  <div className="relative mx-auto h-24 w-24 transition-transform duration-300 hover:scale-105">
                    <StepArt n={i} />
                    <span className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-rose-500 text-xs font-semibold text-white shadow">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-plum-700">{loc(s.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/75">{loc(s.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Featured prompts + community ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-plum-700">
                  {loc({ sq: "Komandat më të përdorura", en: "Most-used commands" })}
                </h2>
                <Link href="/library" className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:underline">
                  {loc({ sq: "Shiko të gjitha", en: "See all" })}
                  <Icon name="ArrowRight" className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-4 space-y-3">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <div className="vasha-card flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-plum-50 text-plum-500">
                      <Icon name={p.icon} className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-plum-700">{loc(p.title)}</h3>
                      <p className="line-clamp-1 text-sm text-muted">{loc(p.description)}</p>
                    </div>
                    <Link href={`/sandbox?p=${p.id}`} className={cn(buttonClasses("secondary", "sm"), "shrink-0")}>
                      <Icon name="Sparkles" className="h-4 w-4" aria-hidden="true" />
                      {loc({ sq: "Provoje", en: "Try it" })}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="h-full rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 p-6">
              <h3 className="font-display text-lg font-semibold text-plum-700">
                {loc({ sq: "Bashkohu me komunitetin!", en: "Join the community!" })}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-charcoal/80">
                {[
                  { sq: "Komanda dhe ide çdo javë", en: "Commands and ideas every week" },
                  { sq: "Sfida javore dhe këshilla praktike", en: "Weekly challenges and practical tips" },
                  { sq: "Mbështetje nga gra si ti", en: "Support from women like you" },
                  { sq: "Mësime falas për t'u rritur", en: "Free lessons to grow" },
                ].map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <Icon name="Heart" className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
                    {loc(b)}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={cn(buttonClasses("rose"), "mt-5 w-full")}>
                {loc({ sq: "Bëhu anëtare — falas", en: "Become a member — free" })}
                <Icon name="Heart" className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Empowerment line ---------------- */}
      <section className="border-y border-plum-100 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Reveal>
            <p className="text-center font-display text-2xl italic text-rose-500 sm:text-3xl">
              {loc({ sq: "Ti je e zonja. Ti je e pathyeshme.", en: "You are capable. You are unbreakable." })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-plum-700 px-6 py-14 text-center text-white sm:px-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-500/20 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold-500/20 blur-2xl" aria-hidden="true" />
            <h2 className="relative font-display text-3xl font-semibold sm:text-4xl">
              {loc({ sq: "Gati ta ndryshosh jetën tënde?", en: "Ready to change your life?" })}
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-plum-100">
              {loc({ sq: "Bashkohu me mijëra gra që po ndërtojnë të ardhmen e tyre me AI.", en: "Join thousands of women building their future with AI." })}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/login");
              }}
              className="relative mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={loc({ sq: "Shkruaj email-in tënd…", en: "Enter your email…" })}
                className="flex-1 rounded-full border-0 px-4 py-3 text-sm text-charcoal outline-none focus:ring-2 focus:ring-gold-300"
              />
              <button type="submit" className={buttonClasses("gold", "lg")}>
                {loc({ sq: "Regjistrohu falas", en: "Sign up free" })}
                <Icon name="Heart" className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <p className="relative mt-3 flex items-center justify-center gap-1.5 text-xs text-plum-200">
              <Icon name="Lock" className="h-3.5 w-3.5" aria-hidden="true" />
              {loc({ sq: "Nuk e ndajmë email-in tënd me askënd.", en: "We never share your email." })}
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
