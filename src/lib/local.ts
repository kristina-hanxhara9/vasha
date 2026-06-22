"use client";

// Client-side persistence for v1: favourites, ratings, saved answers, and
// lesson/challenge progress live in localStorage so everything works with no
// backend. The matching Supabase tables exist for a future server-side sync.

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("vasha:storage"));
  } catch {
    /* storage unavailable */
  }
}

export const favorites = {
  list: () => read<string[]>("vasha_favs", []),
  has: (id: string) => favorites.list().includes(id),
  toggle: (id: string) => {
    const l = favorites.list();
    const next = l.includes(id) ? l.filter((x) => x !== id) : [...l, id];
    write("vasha_favs", next);
    return next.includes(id);
  },
};

export const ratings = {
  map: () => read<Record<string, number>>("vasha_ratings", {}),
  get: (id: string): number | undefined => ratings.map()[id],
  set: (id: string, value: number) => {
    const m = ratings.map();
    m[id] = value;
    write("vasha_ratings", m);
  },
};

export interface SavedOutput {
  id: string;
  scenarioId?: string;
  title: string;
  content: string;
  ts: number;
}

export const saved = {
  list: () => read<SavedOutput[]>("vasha_saved", []),
  add: (item: SavedOutput) => {
    const l = saved.list();
    write("vasha_saved", [item, ...l].slice(0, 100));
  },
  remove: (id: string) => {
    write(
      "vasha_saved",
      saved.list().filter((s) => s.id !== id),
    );
  },
};

export const progress = {
  // generic done-set keyed by namespace ("lessons" | "challenge")
  done: (ns: string) => read<string[]>(`vasha_progress_${ns}`, []),
  isDone: (ns: string, id: string) => progress.done(ns).includes(id),
  setDone: (ns: string, id: string, value: boolean) => {
    const l = progress.done(ns);
    const next = value ? Array.from(new Set([...l, id])) : l.filter((x) => x !== id);
    write(`vasha_progress_${ns}`, next);
    return next;
  },
};

// Community (v1 stub): posts/replies/stories persist locally only.
export interface CommunityPost {
  id: string;
  circle: string;
  title: string;
  body: string;
  author: string;
  ts: number;
}
export interface CommunityReply {
  id: string;
  postId: string;
  body: string;
  author: string;
  ts: number;
}
export interface Story {
  id: string;
  body: string;
  author: string;
  ts: number;
}

export const community = {
  posts: (circle: string) => read<CommunityPost[]>(`vasha_posts_${circle}`, []),
  addPost: (p: CommunityPost) => write(`vasha_posts_${p.circle}`, [p, ...community.posts(p.circle)]),
  replies: (postId: string) => read<CommunityReply[]>(`vasha_replies_${postId}`, []),
  addReply: (r: CommunityReply) => write(`vasha_replies_${r.postId}`, [...community.replies(r.postId), r]),
  stories: () => read<Story[]>("vasha_stories", []),
  addStory: (s: Story) => write("vasha_stories", [s, ...community.stories()]),
};
