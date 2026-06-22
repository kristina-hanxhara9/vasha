-- VASHA — seed data. Run AFTER 0001_init.sql.
-- Seeds the community circles. (Sample posts & success stories ship in the app
-- as clearly-labelled content in src/lib/content/community.ts.)

insert into public.circles (slug, name_sq, name_en, description_sq, description_en, icon, sort)
values
  ('mothers', 'Nëna', 'Mothers',
   'Për nënat që po e balancojnë gjithçka. Pyet, ndaj, merr frymë.',
   'For mothers balancing everything. Ask, share, breathe.', 'Baby', 1),
  ('jobseekers', 'Kërkuese pune', 'Job-seekers',
   'CV, intervista dhe guximi për të aplikuar. Jemi bashkë.',
   'CVs, interviews and the courage to apply. We''re in it together.', 'Briefcase', 2),
  ('entrepreneurs', 'Sipërmarrëse', 'Entrepreneurs',
   'Nga ideja te klienti i parë. Ndaj fitoret dhe mësimet.',
   'From idea to first customer. Share the wins and the lessons.', 'Rocket', 3),
  ('beginners', 'Fillestare', 'Beginners',
   'E re me AI-në dhe teknologjinë? Ky është vendi yt i sigurt.',
   'New to AI and tech? This is your safe place.', 'Sprout', 4)
on conflict (slug) do nothing;
