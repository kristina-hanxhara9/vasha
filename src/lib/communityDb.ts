"use client";

// Live community backed by Supabase (reads public, writes require sign-in via RLS).
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/client";

export interface DbPost {
  id: string;
  title: string;
  body: string;
  author: string;
  ts: number;
}
export interface DbReply {
  id: string;
  body: string;
  author: string;
  ts: number;
}
export interface DbStory {
  id: string;
  body: string;
  author: string;
  ts: number;
}

export const communityLive = isSupabaseConfigured;

type SupaUser = { id: string; email?: string; user_metadata?: { full_name?: string } } | null;
function authorOf(user: SupaUser): string {
  return user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Anonime";
}

export async function fetchPosts(circle: string): Promise<DbPost[]> {
  if (!isSupabaseConfigured) return [];
  const s = createClient();
  const { data } = await s
    .from("posts")
    .select("id,title,body,author_name,created_at")
    .eq("circle_slug", circle)
    .order("created_at", { ascending: false });
  return (data || []).map((p) => ({
    id: p.id as string,
    title: (p.title as string) || "",
    body: p.body as string,
    author: (p.author_name as string) || "Anonime",
    ts: Date.parse(p.created_at as string),
  }));
}

export async function addPost(circle: string, title: string, body: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const s = createClient();
  const {
    data: { user },
  } = await s.auth.getUser();
  if (!user) return false;
  const { error } = await s
    .from("posts")
    .insert({ circle_slug: circle, user_id: user.id, title, body, author_name: authorOf(user) });
  return !error;
}

export async function fetchReplies(postId: string): Promise<DbReply[]> {
  if (!isSupabaseConfigured) return [];
  const s = createClient();
  const { data } = await s
    .from("replies")
    .select("id,body,author_name,created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  return (data || []).map((r) => ({
    id: r.id as string,
    body: r.body as string,
    author: (r.author_name as string) || "Anonime",
    ts: Date.parse(r.created_at as string),
  }));
}

export async function addReply(postId: string, body: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const s = createClient();
  const {
    data: { user },
  } = await s.auth.getUser();
  if (!user) return false;
  const { error } = await s
    .from("replies")
    .insert({ post_id: postId, user_id: user.id, body, author_name: authorOf(user) });
  return !error;
}

export async function fetchStories(): Promise<DbStory[]> {
  if (!isSupabaseConfigured) return [];
  const s = createClient();
  const { data } = await s
    .from("success_stories")
    .select("id,body,author_name,created_at")
    .order("created_at", { ascending: false });
  return (data || []).map((r) => ({
    id: r.id as string,
    body: r.body as string,
    author: (r.author_name as string) || "Anonime",
    ts: Date.parse(r.created_at as string),
  }));
}

export async function addStory(body: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const s = createClient();
  const {
    data: { user },
  } = await s.auth.getUser();
  if (!user) return false;
  const { error } = await s
    .from("success_stories")
    .insert({ user_id: user.id, body, author_name: authorOf(user) });
  return !error;
}
