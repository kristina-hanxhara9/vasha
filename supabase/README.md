# VASHA — Supabase setup

VASHA runs fully in **demo mode** with no database. Add Supabase to enable real
accounts, tiers, community persistence, and server-side usage limits.

## 1. Create a project

Go to [supabase.com](https://supabase.com) → **New project**. Note your project
URL and keys (Project Settings → API).

## 2. Run the schema

Open **SQL Editor** in the Supabase dashboard and run, in order:

1. `migrations/0001_init.sql` — tables, Row Level Security, the signup trigger,
   and the `increment_sandbox_usage()` function.
2. `seed.sql` — the community circles.

(Or with the [CLI](https://supabase.com/docs/guides/local-development):
`supabase db push` after linking your project.)

## 3. Set environment variables

In your `.env.local` (and in Vercel):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # SERVER ONLY — used by the Stripe webhook
```

## 4. Email sign-in

Auth → providers → Email is on by default (magic links). The redirect lands on
`/auth/callback`. For production, add your domain under Auth → URL Configuration.

## Notes

- All tables have RLS: users can read public content (circles/posts/stories) and
  write only their own rows.
- `increment_sandbox_usage()` is `security definer` so it can bump the daily
  counter atomically for the signed-in user.
- **V1 stub:** favourites, ratings, saved answers, and lesson/challenge progress
  currently persist in the browser (localStorage). The matching tables exist here
  for a future server-side sync.
