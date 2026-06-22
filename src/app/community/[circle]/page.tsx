"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { getCircle } from "@/lib/content/circles";
import { SAMPLE_POSTS } from "@/lib/content/community";
import { fetchPosts, addPost, fetchReplies, addReply, type DbPost, type DbReply } from "@/lib/communityDb";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

function ReplyRow({ body, author }: { body: string; author: string }) {
  const { t } = useI18n();
  return (
    <div className="rounded-xl bg-plum-50/60 px-3 py-2 text-sm">
      <p className="text-charcoal/80">{body}</p>
      <p className="mt-0.5 text-xs text-muted">
        {t("community.by")} {author}
      </p>
    </div>
  );
}

function PostCard({
  dbId,
  title,
  body,
  author,
  sample,
  sampleReplies = [],
  canPost,
}: {
  dbId?: string;
  title: string;
  body: string;
  author: string;
  sample?: boolean;
  sampleReplies?: { body: string; author: string }[];
  canPost: boolean;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState<DbReply[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => {
    if (dbId) fetchReplies(dbId).then(setReplies).catch(() => {});
  };
  useEffect(() => {
    if (open) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const send = async () => {
    if (!text.trim() || !dbId) return;
    setBusy(true);
    const ok = await addReply(dbId, text.trim());
    setBusy(false);
    if (ok) {
      setText("");
      load();
    }
  };

  const replyCount = replies.length + sampleReplies.length;

  return (
    <div className="vasha-card p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-plum-700">{title}</h3>
        {sample ? (
          <span className="shrink-0 rounded-full bg-plum-50 px-2 py-0.5 text-[11px] text-plum-600">
            {t("community.sampleData")}
          </span>
        ) : null}
      </div>
      <p className="mt-1 whitespace-pre-wrap text-sm text-charcoal/80">{body}</p>
      <div className="mt-2 flex items-center gap-3 text-xs text-muted">
        <span>
          {t("community.by")} {author}
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1 transition-colors hover:text-plum-600"
        >
          <Icon name="MessageCircle" className="h-3.5 w-3.5" aria-hidden="true" /> {replyCount}{" "}
          {t("community.replies")}
        </button>
      </div>

      {open ? (
        <div className="mt-3 space-y-2 border-t border-plum-100 pt-3">
          {sampleReplies.map((r, i) => (
            <ReplyRow key={`s${i}`} body={r.body} author={r.author} />
          ))}
          {replies.map((r) => (
            <ReplyRow key={r.id} body={r.body} author={r.author} />
          ))}
          {dbId && canPost ? (
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("community.replyPlaceholder")}
                className="flex-1 rounded-full border border-plum-200 px-3 py-1.5 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200"
              />
              <Button size="sm" variant="secondary" onClick={send} disabled={busy}>
                {t("community.reply")}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function CirclePage({ params }: { params: { circle: string } }) {
  const { t, loc } = useI18n();
  const auth = useAuth();
  const circle = getCircle(params.circle);
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => {
    if (circle) fetchPosts(circle.slug).then(setPosts).catch(() => {});
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circle]);

  if (!circle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Link href="/community" className={buttonClasses("secondary")}>
          {t("nav.community")}
        </Link>
      </div>
    );
  }

  const samples = SAMPLE_POSTS.filter((p) => p.circle === circle.slug);

  const publish = async () => {
    if (!body.trim() && !title.trim()) return;
    setBusy(true);
    const ok = await addPost(circle.slug, title.trim() || "—", body.trim());
    setBusy(false);
    if (ok) {
      setTitle("");
      setBody("");
      load();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        href="/community"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-plum-700"
      >
        <Icon name="ChevronRight" className="h-4 w-4 rotate-180" aria-hidden="true" /> {t("nav.community")}
      </Link>

      <div className="mt-3 flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-500">
          <Icon name={circle.icon} className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-plum-700">{loc(circle.name)}</h1>
          <p className="text-sm text-muted">{loc(circle.description)}</p>
        </div>
      </div>

      {auth.isAuthed ? (
        <div className="vasha-card mt-6 p-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("community.postTitlePlaceholder")}
            className="w-full rounded-xl border border-plum-200 px-3 py-2 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder={t("community.postBodyPlaceholder")}
            className="mt-2 w-full rounded-xl border border-plum-200 px-3 py-2 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200"
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm" onClick={publish} disabled={busy}>
              <Icon name="PenLine" className="h-4 w-4" aria-hidden="true" /> {t("community.publish")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="vasha-card mt-6 p-4 text-sm text-muted">
          {t("community.signInToPost")}{" "}
          <Link href="/login" className="font-medium text-plum-700 hover:underline">
            {t("common.signIn")}
          </Link>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {posts.map((p) => (
          <PostCard
            key={p.id}
            dbId={p.id}
            title={p.title || "—"}
            body={p.body}
            author={p.author}
            canPost={auth.isAuthed}
          />
        ))}
        {samples.map((p) => (
          <PostCard
            key={p.id}
            title={loc(p.title)}
            body={loc(p.body)}
            author={p.author}
            sample
            canPost={auth.isAuthed}
            sampleReplies={(p.replies || []).map((r) => ({ body: loc(r.body), author: r.author }))}
          />
        ))}
        {!posts.length && !samples.length ? (
          <p className="text-sm text-muted">{t("community.beFirst")}</p>
        ) : null}
      </div>
    </div>
  );
}
