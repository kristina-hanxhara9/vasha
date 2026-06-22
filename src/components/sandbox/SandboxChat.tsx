"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/misc";
import { saved as savedStore } from "@/lib/local";
import { copyText } from "@/lib/clipboard";
import { FormattedText } from "@/components/ui/FormattedText";
import { localId, cn } from "@/lib/utils";
import type { ChatMsg, ChatStatus } from "@/lib/useSandboxChat";

function AssistantBubble({
  msg,
  streaming,
  scenarioId,
  title,
}: {
  msg: ChatMsg;
  streaming: boolean;
  scenarioId?: string;
  title: string;
}) {
  const { t, loc } = useI18n();
  const [copied, setCopied] = useState(false);
  const [didSave, setDidSave] = useState(false);

  return (
    <div className="max-w-[92%]">
      {msg.demo ? (
        <div className="mb-1.5 rounded-lg bg-gold-100 px-2.5 py-1 text-[11px] leading-relaxed text-gold-800">
          {t("sandbox.demoNotice")}
        </div>
      ) : null}
      <div className="rounded-2xl rounded-tl-sm border border-plum-100 bg-ivory px-3.5 py-3">
        <div className="vasha-output">
          <FormattedText text={msg.text} />
          {streaming ? <span className="vasha-caret" /> : null}
        </div>
        {msg.sources && msg.sources.length ? (
          <div className="mt-3 border-t border-plum-100 pt-2">
            <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-plum-700">
              <Icon name="Globe" className="h-3 w-3" aria-hidden="true" />
              {loc({ sq: "Burime", en: "Sources" })}
            </p>
            <ul className="space-y-0.5">
              {msg.sources.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-1 text-[11px] text-plum-600 hover:underline"
                  >
                    <Icon name="ExternalLink" className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">{s.title || s.uri}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {!streaming && msg.text ? (
        <div className="mt-1.5 flex gap-3 text-xs text-muted">
          <button
            type="button"
            onClick={async () => {
              await copyText(msg.text);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="inline-flex items-center gap-1 hover:text-plum-700"
          >
            <Icon name={copied ? "Check" : "Copy"} className="h-3.5 w-3.5" aria-hidden="true" />
            {copied ? t("common.copied") : t("common.copy")}
          </button>
          <button
            type="button"
            onClick={() => {
              savedStore.add({ id: localId("out"), scenarioId, title, content: msg.text, ts: Date.now() });
              setDidSave(true);
            }}
            className="inline-flex items-center gap-1 hover:text-plum-700"
          >
            <Icon name={didSave ? "Check" : "Heart"} className="h-3.5 w-3.5" aria-hidden="true" />
            {didSave ? t("common.saved") : t("common.save")}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function SandboxChat({
  messages,
  status,
  title,
  scenarioId,
  onSend,
  onReset,
}: {
  messages: ChatMsg[];
  status: ChatStatus;
  title: string;
  scenarioId?: string;
  onSend: (text: string) => void;
  onReset: () => void;
}) {
  const { t, loc } = useI18n();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  if (!messages.length) {
    return <EmptyState icon="Sparkles" title={t("sandbox.emptyTitle")} body={t("sandbox.emptyBody")} />;
  }

  const streaming = status === "streaming";
  const submit = () => {
    const v = input.trim();
    if (v && !streaming) {
      onSend(v);
      setInput("");
    }
  };

  return (
    <div className="vasha-card flex h-[72vh] max-h-[680px] flex-col !p-0">
      <div className="flex items-center justify-between border-b border-plum-100 px-4 py-3">
        <h3 className="truncate font-display text-base font-semibold text-plum-700">{title}</h3>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex shrink-0 items-center gap-1 text-xs text-muted transition-colors hover:text-plum-700"
        >
          <Icon name="RefreshCw" className="h-3.5 w-3.5" aria-hidden="true" />
          {t("sandbox.newRequest")}
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div
              key={i}
              className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-plum-100 px-3.5 py-2.5 text-sm text-plum-800"
            >
              {m.text}
            </div>
          ) : (
            <AssistantBubble
              key={i}
              msg={m}
              streaming={streaming && i === messages.length - 1}
              scenarioId={scenarioId}
              title={title}
            />
          ),
        )}
        {status === "error" ? (
          <p className="text-sm text-red-700">{t("sandbox.errorGeneric")}</p>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-end gap-2 border-t border-plum-100 p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder={loc({ sq: "Shkruaj një mesazh… (p.sh. bëje më të shkurtër)", en: "Type a message… (e.g. make it shorter)" })}
          className="max-h-32 flex-1 resize-none rounded-2xl border border-plum-200 px-3.5 py-2.5 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200"
        />
        <Button type="submit" disabled={!input.trim() || streaming} size="sm" className="!px-3">
          <Icon name="ArrowRight" className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}
