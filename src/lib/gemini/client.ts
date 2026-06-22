// SERVER-ONLY. This module reads GEMINI_API_KEY and talks to Google Gemini.
// It must never be imported by a client component — the key would leak.

import type { ChatTurn, Source, UploadFile } from "@/lib/types";

export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MAX_OUTPUT_TOKENS = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 2048);

/** True when a real Gemini key is present. When false, the app uses demo replies. */
export const isGeminiConfigured = Boolean(GEMINI_API_KEY);

export class GeminiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "GeminiError";
  }
}

export type GeminiEvent = { type: "text"; text: string } | { type: "sources"; sources: Source[] };

/**
 * Stream from Gemini's streamGenerateContent SSE endpoint. Supports:
 *  - multimodal input: pass `files` (images/PDFs) → sent as inlineData parts
 *  - grounding: pass `grounded: true` → adds the google_search tool, and the
 *    web sources it cites are emitted as a final {type:"sources"} event.
 * The key is sent in the `x-goog-api-key` header (never the URL). Gemini 3.x
 * temperature/topP/topK defaults are intentionally left untouched.
 */
export async function* streamGeminiText({
  systemInstruction,
  messages,
  files,
  grounded,
}: {
  systemInstruction: string;
  messages: ChatTurn[];
  files?: UploadFile[];
  grounded?: boolean;
}): AsyncGenerator<GeminiEvent> {
  if (!GEMINI_API_KEY) throw new GeminiError(500, "GEMINI_API_KEY missing");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL,
  )}:streamGenerateContent?alt=sse`;

  // Build the multi-turn conversation; attach any files to the latest user turn.
  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }] as Array<Record<string, unknown>>,
  }));
  if (files && files.length && contents.length) {
    const last = contents[contents.length - 1];
    for (const f of files) last.parts.push({ inlineData: { mimeType: f.mimeType, data: f.data } });
  }

  const body: Record<string, unknown> = {
    contents,
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS },
  };
  if (grounded) body.tools = [{ google_search: {} }];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => "");
    console.error(`[gemini] ${res.status}: ${errText.slice(0, 500)}`);
    throw new GeminiError(res.status, errText || res.statusText);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const sources = new Map<string, Source>();

  const collectSources = (json: unknown) => {
    const chunks = (json as any)?.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (!Array.isArray(chunks)) return;
    for (const c of chunks) {
      const web = c?.web;
      if (web?.uri && !sources.has(web.uri)) sources.set(web.uri, { uri: web.uri, title: web.title });
    }
  };

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
      if (!data || data === "[DONE]") continue;
      try {
        const json = JSON.parse(data);
        const ps = json?.candidates?.[0]?.content?.parts;
        if (Array.isArray(ps)) {
          const text = ps.map((p: { text?: string }) => (typeof p?.text === "string" ? p.text : "")).join("");
          if (text) yield { type: "text", text };
        }
        if (grounded) collectSources(json);
      } catch {
        // partial/keepalive line — ignore
      }
    }
  }

  if (grounded && sources.size) {
    yield { type: "sources", sources: Array.from(sources.values()) };
  }
}
