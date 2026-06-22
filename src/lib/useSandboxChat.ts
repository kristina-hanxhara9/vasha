"use client";

import { useCallback, useRef, useState } from "react";
import type { Lang, Source, UploadFile } from "@/lib/types";

export type ChatStatus = "idle" | "streaming" | "error" | "limit";

export interface ChatMsg {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
  demo?: boolean;
}

/** A multi-turn Sandbox conversation backed by the /api/sandbox SSE stream. */
export function useSandboxChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const convoRef = useRef<ChatMsg[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const setConvo = (next: ChatMsg[]) => {
    convoRef.current = next;
    setMessages(next);
  };

  const send = useCallback(
    async (
      userText: string,
      opts: { scenarioId?: string; files?: UploadFile[]; lang: Lang; fresh?: boolean },
    ) => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      const prior = opts.fresh ? [] : convoRef.current;
      const withUser: ChatMsg[] = [...prior, { role: "user", text: userText }];
      setConvo([...withUser, { role: "assistant", text: "" }]);
      setStatus("streaming");

      const apiMessages = withUser.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        text: m.text,
      }));

      try {
        const res = await fetch("/api/sandbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scenarioId: opts.scenarioId,
            lang: opts.lang,
            messages: apiMessages,
            files: opts.fresh ? opts.files : undefined,
          }),
          signal: ac.signal,
        });

        if (res.status === 429) {
          setConvo(withUser);
          setStatus("limit");
          return;
        }
        if (!res.ok || !res.body) {
          setConvo(withUser);
          setStatus("error");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let acc = "";
        let demo = false;
        let sources: Source[] | undefined;
        const update = () => setConvo([...withUser, { role: "assistant", text: acc, demo, sources }]);

        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data) continue;
            try {
              const evt = JSON.parse(data);
              if (evt.type === "demo") {
                demo = true;
                update();
              } else if (evt.type === "chunk") {
                acc += evt.text;
                update();
              } else if (evt.type === "sources") {
                sources = evt.sources;
                update();
              } else if (evt.type === "error") {
                setStatus("error");
              }
            } catch {
              /* ignore */
            }
          }
        }
        setStatus((s) => (s === "streaming" ? "idle" : s));
      } catch (e) {
        if ((e as { name?: string })?.name === "AbortError") return;
        setConvo(withUser);
        setStatus("error");
      }
    },
    [],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setConvo([]);
    setStatus("idle");
  }, []);

  return { messages, status, send, reset };
}
