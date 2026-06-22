"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { CIRCLES } from "@/lib/content/circles";
import { SUCCESS_STORIES } from "@/lib/content/community";
import { fetchStories, addStory, type DbStory } from "@/lib/communityDb";
import { SectionHeading } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

function StoryCard({ body, author, sample }: { body: string; author: string; sample?: boolean }) {
  const { t } = useI18n();
  return (
    <div className="vasha-card relative p-4">
      <Icon name="Quote" className="h-5 w-5 text-gold-400" aria-hidden="true" />
      <p className="mt-1.5 text-sm leading-relaxed text-charcoal/85">{body}</p>
      <p className="mt-2 text-xs font-medium text-plum-600">
        {t("community.by")} {author}
      </p>
      {sample ? (
        <span className="absolute right-3 top-3 rounded-full bg-plum-50 px-2 py-0.5 text-[11px] text-plum-600">
          {t("community.sampleData")}
        </span>
      ) : null}
    </div>
  );
}

export default function CommunityPage() {
  const { t, loc } = useI18n();
  const auth = useAuth();
  const [stories, setStories] = useState<DbStory[]>([]);
  const [composing, setComposing] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => fetchStories().then(setStories).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const share = async () => {
    if (!text.trim()) return;
    setBusy(true);
    const ok = await addStory(text.trim());
    setBusy(false);
    if (ok) {
      setText("");
      setComposing(false);
      load();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <SectionHeading title={t("community.title")} subtitle={t("community.subtitle")} />

      <h2 className="mt-6 font-display text-lg font-semibold text-plum-700">{t("community.circles")}</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {CIRCLES.map((c) => (
          <Link
            key={c.slug}
            href={`/community/${c.slug}`}
            className="vasha-card flex items-start gap-3 p-4 transition-colors hover:border-plum-300"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-500">
              <Icon name={c.icon} className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-medium text-plum-700">{loc(c.name)}</span>
              <span className="mt-0.5 block text-sm text-muted">{loc(c.description)}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-plum-700">{t("community.successStories")}</h2>
          <p className="text-sm text-muted">{t("community.successSubtitle")}</p>
        </div>
        {auth.isAuthed ? (
          <Button variant="secondary" size="sm" onClick={() => setComposing((v) => !v)}>
            <Icon name="PenLine" className="h-4 w-4" aria-hidden="true" /> {t("community.shareWin")}
          </Button>
        ) : (
          <Link href="/login" className="shrink-0 text-sm font-medium text-plum-700 hover:underline">
            {t("community.signInToPost")}
          </Link>
        )}
      </div>

      {composing && auth.isAuthed ? (
        <div className="vasha-card mt-3 p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder={t("community.postBodyPlaceholder")}
            className="w-full rounded-xl border border-plum-200 px-3 py-2 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200"
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm" onClick={share} disabled={busy}>
              {t("community.publish")}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {stories.map((s) => (
          <StoryCard key={s.id} body={s.body} author={s.author} />
        ))}
        {SUCCESS_STORIES.map((s) => (
          <StoryCard key={s.id} body={loc(s.body)} author={s.author} sample />
        ))}
      </div>
    </div>
  );
}
