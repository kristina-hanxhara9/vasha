"use client";

// Lessons are stored in Supabase (admin-editable). When Supabase isn't set up,
// or the table is empty, we fall back to the bundled starter lessons.
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/client";
import { LESSONS as STATIC_LESSONS } from "./content/lessons";
import type { Lesson } from "./types";

interface LessonRow {
  id: string;
  slug: string;
  icon: string | null;
  minutes: number | null;
  title: Lesson["title"];
  summary: Lesson["summary"];
  sections: Lesson["sections"] | null;
  task: Lesson["task"] | null;
}

function rowToLesson(r: LessonRow): Lesson {
  return {
    id: r.id,
    slug: r.slug,
    icon: r.icon || "BookOpen",
    minutes: r.minutes ?? 5,
    title: r.title,
    summary: r.summary,
    sections: Array.isArray(r.sections) ? r.sections : [],
    task: r.task || { prompt: { sq: "", en: "" } },
  };
}

function lessonToRow(l: Lesson, sort: number) {
  return {
    id: l.id,
    slug: l.slug,
    icon: l.icon,
    minutes: l.minutes,
    title: l.title,
    summary: l.summary,
    sections: l.sections,
    task: l.task,
    sort,
  };
}

export async function fetchLessons(): Promise<Lesson[]> {
  if (!isSupabaseConfigured) return STATIC_LESSONS;
  try {
    const s = createClient();
    const { data } = await s.from("lessons").select("*").order("sort", { ascending: true });
    if (!data || !data.length) return STATIC_LESSONS;
    return (data as LessonRow[]).map(rowToLesson);
  } catch {
    return STATIC_LESSONS;
  }
}

export async function fetchLesson(slug: string): Promise<Lesson | undefined> {
  const all = await fetchLessons();
  return all.find((l) => l.slug === slug);
}

export async function upsertLesson(l: Lesson, sort = 0): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const s = createClient();
    const { error } = await s.from("lessons").upsert(lessonToRow(l, sort));
    return !error;
  } catch {
    return false;
  }
}

export async function deleteLesson(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const s = createClient();
    const { error } = await s.from("lessons").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

/** Seed the DB with the bundled starter lessons (idempotent). */
export async function importStarterLessons(): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const s = createClient();
    const rows = STATIC_LESSONS.map((l, i) => lessonToRow(l, i));
    const { error } = await s.from("lessons").upsert(rows);
    return !error;
  } catch {
    return false;
  }
}
