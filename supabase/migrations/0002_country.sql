-- Adds the optional country to profiles (collected at signup with consent — GDPR).
-- Run after 0001_init.sql.
alter table public.profiles add column if not exists country text;
