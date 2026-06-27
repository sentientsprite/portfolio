-- Anonymous Feedback Board realtime schema.
--
-- This is already applied to the linked Supabase project. Keep this file as the
-- source-of-truth reference if the project is recreated or moved later.

create extension if not exists pgcrypto;

create table if not exists public.feedback_messages (
  id uuid primary key default gen_random_uuid(),
  room_id text not null check (
    length(room_id) between 3 and 80
    and room_id ~ '^[a-zA-Z0-9_-]+$'
  ),
  body text not null check (length(btrim(body)) between 1 and 1000),
  color jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists feedback_messages_room_created_idx
  on public.feedback_messages (room_id, created_at desc);

alter table public.feedback_messages enable row level security;

drop policy if exists "Anyone can read feedback messages"
  on public.feedback_messages;
create policy "Anyone can read feedback messages"
  on public.feedback_messages
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can post feedback messages"
  on public.feedback_messages;
create policy "Anyone can post feedback messages"
  on public.feedback_messages
  for insert
  to anon, authenticated
  with check (
    length(room_id) between 3 and 80
    and room_id ~ '^[a-zA-Z0-9_-]+$'
    and length(btrim(body)) between 1 and 1000
    and jsonb_typeof(color) = 'object'
  );

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'feedback_messages'
  ) then
    alter publication supabase_realtime add table public.feedback_messages;
  end if;
end $$;
