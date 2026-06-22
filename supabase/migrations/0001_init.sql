-- VASHA — initial schema. Run this in the Supabase SQL editor (or via the CLI).
-- Row Level Security is ON everywhere: users read public content and write only
-- their own rows. Public content (circles, posts, stories) is world-readable.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles (one per auth user) — holds tier + Stripe customer id
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  tier text not null default 'free' check (tier in ('free', 'premium')),
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Daily usage (free-tier Sandbox cap)
-- ---------------------------------------------------------------------------
create table if not exists public.usage_daily (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  sandbox_count integer not null default 0,
  primary key (user_id, day)
);

alter table public.usage_daily enable row level security;
create policy "usage_rw_own" on public.usage_daily
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Per-user data: favourites, ratings, progress, saved answers
-- ---------------------------------------------------------------------------
create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  prompt_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);
alter table public.favorites enable row level security;
create policy "favorites_rw_own" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.prompt_ratings (
  user_id uuid not null references auth.users (id) on delete cascade,
  prompt_id text not null,
  rating smallint not null check (rating between 1 and 5),
  primary key (user_id, prompt_id)
);
alter table public.prompt_ratings enable row level security;
create policy "ratings_rw_own" on public.prompt_ratings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);
alter table public.lesson_progress enable row level security;
create policy "lesson_progress_rw_own" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.challenge_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  day_number smallint not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, day_number)
);
alter table public.challenge_progress enable row level security;
create policy "challenge_progress_rw_own" on public.challenge_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.saved_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  scenario_id text,
  title text,
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.saved_outputs enable row level security;
create policy "saved_outputs_rw_own" on public.saved_outputs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Community (read = public, write = signed-in author)
-- ---------------------------------------------------------------------------
create table if not exists public.circles (
  slug text primary key,
  name_sq text not null,
  name_en text not null,
  description_sq text,
  description_en text,
  icon text,
  sort integer not null default 0
);
alter table public.circles enable row level security;
create policy "circles_read_all" on public.circles for select using (true);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  circle_slug text not null references public.circles (slug) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.posts enable row level security;
create policy "posts_read_all" on public.posts for select using (true);
create policy "posts_insert_own" on public.posts for insert with check (auth.uid() = user_id);
create policy "posts_delete_own" on public.posts for delete using (auth.uid() = user_id);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.replies enable row level security;
create policy "replies_read_all" on public.replies for select using (true);
create policy "replies_insert_own" on public.replies for insert with check (auth.uid() = user_id);
create policy "replies_delete_own" on public.replies for delete using (auth.uid() = user_id);

create table if not exists public.success_stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.success_stories enable row level security;
create policy "stories_read_all" on public.success_stories for select using (true);
create policy "stories_insert_own" on public.success_stories for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Functions: auto-create a profile on signup; atomic usage increment
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.increment_sandbox_usage()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.usage_daily (user_id, day, sandbox_count)
  values (auth.uid(), current_date, 1)
  on conflict (user_id, day)
  do update set sandbox_count = public.usage_daily.sandbox_count + 1
  returning sandbox_count into new_count;
  return new_count;
end;
$$;

grant execute on function public.increment_sandbox_usage() to authenticated;
