import { NextRequest, NextResponse } from "next/server";
import { getUserContext } from "@/lib/auth";
import { checkLimit, incrementUsage } from "@/lib/ratelimit";
import { getScenario } from "@/lib/content/scenarios";
import { buildSystemInstruction } from "@/lib/gemini/systemPrompt";
import { isGeminiConfigured, streamGeminiText } from "@/lib/gemini/client";
import { demoReply } from "@/lib/gemini/demo";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { ChatTurn, Lang, UploadFile } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_TURN_CHARS = 8000;
const MAX_TURNS = 30;
const MAX_FILES = 4;
const MAX_FILE_B64 = 6_000_000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function sanitizeMessages(raw: unknown): ChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatTurn[] = [];
  for (const m of raw.slice(-MAX_TURNS)) {
    const role = m?.role === "model" ? "model" : "user";
    const text = typeof m?.text === "string" ? m.text.slice(0, MAX_TURN_CHARS) : "";
    out.push({ role, text });
  }
  return out;
}

function sanitizeFiles(raw: unknown): UploadFile[] {
  if (!Array.isArray(raw)) return [];
  const out: UploadFile[] = [];
  for (const f of raw.slice(0, MAX_FILES)) {
    const mimeType = typeof f?.mimeType === "string" ? f.mimeType : "";
    const data = typeof f?.data === "string" ? f.data : "";
    const name = typeof f?.name === "string" ? f.name : "file";
    if (!mimeType || !data || data.length > MAX_FILE_B64) continue;
    out.push({ name, mimeType, data });
  }
  return out;
}

export async function POST(req: NextRequest) {
  const ctx = await getUserContext();

  // Require registration: when Supabase is set up, only signed-in users may run.
  if (isSupabaseConfigured && (ctx.isDemo || !ctx.userId)) {
    return NextResponse.json({ code: "auth_required" }, { status: 401 });
  }

  const { allowed } = checkLimit(ctx);
  if (!allowed) {
    return NextResponse.json({ code: "limit", limit: ctx.limit }, { status: 429 });
  }

  let payload: { scenarioId?: string; lang?: string; messages?: unknown; files?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ code: "bad_request" }, { status: 400 });
  }

  const lang: Lang = payload?.lang === "en" ? "en" : "sq";
  const scenario = payload?.scenarioId ? getScenario(payload.scenarioId) : undefined;
  const messages = sanitizeMessages(payload?.messages);
  const files = sanitizeFiles(payload?.files);
  const grounded = Boolean(scenario?.grounded);

  const last = messages[messages.length - 1];
  if (!last || last.role !== "user" || (!last.text.trim() && files.length === 0)) {
    return NextResponse.json({ code: "bad_request" }, { status: 400 });
  }

  const systemInstruction = buildSystemInstruction(scenario?.systemInstruction, lang);
  const isFollowup = messages.filter((m) => m.role === "user").length > 1;

  // Count this run. We do NOT store the user's text or uploaded files.
  await incrementUsage(ctx);

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (obj: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        if (!isGeminiConfigured) {
          send({ type: "demo" });
          for await (const chunk of demoReply(scenario?.id, lang, isFollowup)) {
            send({ type: "chunk", text: chunk });
            await sleep(16);
          }
          send({ type: "done" });
          return;
        }
        for await (const ev of streamGeminiText({ systemInstruction, messages, files, grounded })) {
          if (ev.type === "text") send({ type: "chunk", text: ev.text });
          else if (ev.type === "sources") send({ type: "sources", sources: ev.sources });
        }
        send({ type: "done" });
      } catch {
        send({ type: "error" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      // Disable proxy buffering so tokens stream to the browser immediately (Vercel/nginx).
      "X-Accel-Buffering": "no",
    },
  });
}
