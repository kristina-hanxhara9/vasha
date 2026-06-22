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

export default function HomePage() {
  const { loc } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const featured = PROMPTS.slice(0, 3);

  return (
    <div>
      {/* ---------------- Hero (photo background) ---------------- */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] sm:rounded-b-[3rem]">
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
              <span className="block bg-gradient-to-r from-rose-500 to-plum-500 bg-clip-text font-serif text-[1.08em] italic text-transparent">
                {loc({ sq: "Ne të mbështesim.", en: "We support you." })}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-balance text-lg leading-relaxed text-charcoal/80">
              {loc({
                sq: "Ndihmojmë gratë shqiptare të mësojnë inteligjencën artificiale lehtë dhe shpejt.",
                en: "We help Albanian women learn artificial intelligence — easily and fast.",
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
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
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
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-plum-700 sm:text-4xl">
            {loc({ sq: "Zgjidh atë që të duhet më shumë", en: "Choose what you need most" })}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-muted">
            {loc({ sq: "Gjashtë fusha të mëdha. Zgjidh njërën dhe nis.", en: "Six big areas. Pick one and begin." })}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MACROS.map((m, i) => {
            const accent = ACCENTS[m.accent];
            return (
              <Reveal key={m.id} delay={i * 70}>
                <Link
                  href={m.cat ? `/library?cat=${m.cat}` : "/library"}
                  className="group flex h-full flex-col rounded-3xl border border-plum-100 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-200 hover:shadow-soft"
                >
                  <span className={cn("font-display text-5xl font-semibold leading-none tabular-nums", accent.icon)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-plum-700">{loc(m.name)}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{loc(m.subtitle)}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-rose-600">
                    {loc({ sq: "Shiko", en: "Explore" })}
                    <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- Mission (dark plum, besa-style curved separation) ---------------- */}
      <section className="zone-dark text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-rose-200">
            {loc({ sq: "Misioni ynë", en: "Our mission" })}
          </span>
          <p className="mx-auto mt-6 max-w-3xl font-display text-3xl font-semibold leading-snug sm:text-4xl">
            {loc({
              sq: "Të mbështesim gratë shqiptare që duan të rriten, të punojnë dhe ",
              en: "To support Albanian women who want to grow, work and ",
            })}
            <span className="font-serif italic text-gold-400">
              {loc({ sq: "të ndërtojnë jetën që ëndërrojnë.", en: "build the life they dream of." })}
            </span>
          </p>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="rounded-[2.5rem] bg-gradient-to-b from-rose-100/70 via-rose-50 to-white px-6 py-16 shadow-card sm:px-12 sm:py-20">
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
            <div className="h-full rounded-3xl bg-gradient-to-br from-rose-100 to-rose-50 p-7">
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
      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Reveal>
          <div className="rounded-[2.5rem] border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-rose-50 px-6 py-14">
            <p className="text-center font-serif text-3xl italic text-rose-500 sm:text-4xl">
              {loc({ sq: "Ti je e zonja. Ti je e pathyeshme.", en: "You are capable. You are unbreakable." })}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-500 to-plum-700 px-6 py-14 text-center text-white sm:px-12">
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
