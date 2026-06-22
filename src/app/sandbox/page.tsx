"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { getScenario } from "@/lib/content/scenarios";
import { getPrompt } from "@/lib/content/prompts";
import { findResources } from "@/lib/content/resources";
import { ScenarioPicker } from "@/components/sandbox/ScenarioPicker";
import { ScenarioForm } from "@/components/sandbox/ScenarioForm";
import { SandboxChat } from "@/components/sandbox/SandboxChat";
import { SectionHeading } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { useSandboxChat } from "@/lib/useSandboxChat";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Scenario, UploadFile } from "@/lib/types";

const FREE_SCENARIO: Scenario = {
  id: "free",
  icon: "Wand2",
  category: "career",
  title: { sq: "Kërkesë e lirë", en: "Free request" },
  description: {
    sq: "Shkruaj çfarëdo që të duhet me fjalët e tua.",
    en: "Write whatever you need, in your own words.",
  },
  fields: [
    {
      name: "request",
      type: "textarea",
      required: true,
      label: { sq: "Çfarë të duhet?", en: "What do you need?" },
      placeholder: {
        sq: "p.sh. më ndihmo të shkruaj një mesazh për mësuesen e fëmijës…",
        en: "e.g. help me write a message to my child's teacher…",
      },
    },
  ],
  systemInstruction: "",
};

/** Build the first user message from the scenario fields (Albanian canonical labels). */
function composeInput(scenario: Scenario, values: Record<string, string>): string {
  if (scenario.id === "free") return values.request?.trim() || "";
  return scenario.fields
    .filter((f) => f.type !== "file")
    .map((f) => (values[f.name]?.trim() ? `${f.label.sq}: ${values[f.name].trim()}` : null))
    .filter(Boolean)
    .join("\n");
}

function LocalResources({ country }: { country?: string }) {
  const { loc } = useI18n();
  const r = findResources(country);
  if (!r) return null;
  return (
    <div className="vasha-card mt-4 p-5">
      <div className="flex items-center gap-2">
        <Icon name="ShieldCheck" className="h-5 w-5 text-plum-500" aria-hidden="true" />
        <h3 className="font-medium text-plum-700">
          {loc({ sq: "Burime të verifikuara", en: "Verified resources" })} · {loc(r.name)}
        </h3>
      </div>
      <ul className="mt-3 space-y-2">
        {r.items.map((it, i) => (
          <li key={i} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">{loc(it.label)}</span>
            <span className="font-medium text-plum-700">{it.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted">
        {loc({
          sq: "Kontaktet e sigurisë tregohen vetëm nga lista jonë e verifikuar.",
          en: "Safety contacts are shown only from our verified list.",
        })}
      </p>
    </div>
  );
}

function SandboxInner() {
  const { t, lang, loc } = useI18n();
  const { refresh, ready, supabaseConfigured, isAuthed } = useAuth();
  const params = useSearchParams();
  const chat = useSandboxChat();

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [activeId, setActiveId] = useState<string | undefined>();
  const [activeTitle, setActiveTitle] = useState("VASHA");
  const [initialValues, setInitialValues] = useState<Record<string, string> | undefined>();
  const [localCountry, setLocalCountry] = useState<string | undefined>();

  const startConversation = useCallback(
    (sc: Scenario, values: Record<string, string>, files?: UploadFile[]) => {
      let text = composeInput(sc, values);
      if (!text && files && files.length) text = loc({ sq: "Ndihmomë me këtë.", en: "Help me with this." });
      setActiveId(sc.id);
      setActiveTitle(loc(sc.title));
      if (sc.id === "localized") setLocalCountry(values.country);
      void chat.send(text, { scenarioId: sc.id, files, lang, fresh: true });
      setTimeout(() => void refresh(), 1200);
    },
    [chat, lang, loc, refresh],
  );

  useEffect(() => {
    const p = params.get("p");
    if (p) {
      const prompt = getPrompt(p);
      if (prompt) {
        // Prefill the editable box — she reviews/edits, then clicks to run.
        setScenario(FREE_SCENARIO);
        setInitialValues({ request: loc(prompt.body) });
        return;
      }
    }
    const q = params.get("q");
    if (q) {
      setScenario(FREE_SCENARIO);
      setInitialValues({ request: q });
      return;
    }
    const s = params.get("s");
    if (s) {
      const sc = getScenario(s);
      if (sc) setScenario(sc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePick = (id: string) => {
    chat.reset();
    setInitialValues(undefined);
    setLocalCountry(undefined);
    setScenario(id === "free" ? FREE_SCENARIO : getScenario(id) ?? null);
  };
  const handleBack = () => {
    chat.reset();
    setScenario(null);
    setActiveId(undefined);
    setInitialValues(undefined);
    setLocalCountry(undefined);
  };
  const handleSubmit = (values: Record<string, string>, files: UploadFile[]) => {
    if (scenario) startConversation(scenario, values, files);
  };
  const handleContinue = (text: string) => {
    void chat.send(text, { scenarioId: activeId, lang });
    setTimeout(() => void refresh(), 1200);
  };

  if (ready && supabaseConfigured && !isAuthed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-rose-100 text-rose-600">
          <Icon name="Heart" className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-semibold text-plum-700">
          {loc({ sq: "Regjistrohu për të filluar", en: "Register to get started" })}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {loc({
            sq: "Krijo një llogari falas me email-in tënd për të përdorur praktikën dhe mjetet. Zgjat 30 sekonda.",
            en: "Create a free account with your email to use the practice and tools. It takes 30 seconds.",
          })}
        </p>
        <Link href="/login?next=/sandbox" className={cn(buttonClasses("rose"), "mt-5")}>
          {loc({ sq: "Regjistrohu falas", en: "Register free" })}
          <Icon name="ArrowRight" className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SectionHeading title={t("sandbox.title")} subtitle={t("sandbox.subtitle")} />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="vasha-card h-fit p-5 sm:p-6">
          {scenario ? (
            <ScenarioForm
              key={scenario.id}
              scenario={scenario}
              busy={chat.status === "streaming"}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          ) : (
            <ScenarioPicker onPick={handlePick} />
          )}
        </div>
        <div>
          <SandboxChat
            messages={chat.messages}
            status={chat.status}
            title={activeTitle}
            scenarioId={activeId}
            onSend={handleContinue}
            onReset={handleBack}
          />
          {activeId === "localized" && chat.messages.length ? <LocalResources country={localCountry} /> : null}
        </div>
      </div>
    </div>
  );
}

export default function SandboxPage() {
  return (
    <Suspense fallback={null}>
      <SandboxInner />
    </Suspense>
  );
}
