-- ==================================================================
-- SSD Sirius Solutions Digitales — Initialisation Supabase
-- Postgres + Auth + Storage
-- Exécuter dans le SQL Editor du projet Supabase.
-- ==================================================================

-- ------------------------------------------------------------------
-- Extensions
-- ------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------
-- Fonction utilitaire : updated_at auto
-- ------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------------
-- Table : profiles (rôles admin)
-- ------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users (id) on delete cascade,
  role        text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role in ('admin', 'editor')
  );
$$;

drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
  for select using (auth.uid() = user_id or public.is_admin());

-- ------------------------------------------------------------------
-- Table : projects (catalogue des réalisations)
-- ------------------------------------------------------------------
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  client_name   text,
  type          text not null default 'site' check (type in ('site', 'application', 'plateforme')),
  category      text,
  summary       text,
  description   text,
  context       text,
  problem       text,
  solution      text,
  features      jsonb not null default '[]'::jsonb,
  technologies  jsonb not null default '[]'::jsonb,
  metrics       jsonb not null default '[]'::jsonb,
  -- Champs de présentation enrichie (projet phare / application)
  platforms     jsonb not null default '[]'::jsonb,   -- ["iOS","Android"]
  highlights    jsonb not null default '[]'::jsonb,   -- [{icon,title,text}]
  screens       jsonb not null default '[]'::jsonb,   -- [{tone|url,label}]
  tech_groups   jsonb not null default '[]'::jsonb,   -- [{label,items:[]}]
  flagship      boolean not null default false,       -- projet mis en tête de portfolio
  featured      boolean not null default false,
  status        text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  cover_url     text,
  link_url      text,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_featured_idx on public.projects (featured);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read" on public.projects
  for select using (status = 'published' or public.is_admin());

drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write" on public.projects
  for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------
-- Table : project_images (galerie)
-- ------------------------------------------------------------------
create table if not exists public.project_images (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects (id) on delete cascade,
  url         text not null,
  alt         text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists project_images_project_idx on public.project_images (project_id);

alter table public.project_images enable row level security;

drop policy if exists "project_images_public_read" on public.project_images;
create policy "project_images_public_read" on public.project_images
  for select using (
    exists (
      select 1 from public.projects p
      where p.id = project_images.project_id
        and (p.status = 'published' or public.is_admin())
    )
  );

drop policy if exists "project_images_admin_write" on public.project_images;
create policy "project_images_admin_write" on public.project_images
  for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------
-- Table : leads (demandes de contact)
-- ------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  message     text not null,
  project_id  uuid references public.projects (id) on delete set null,
  source      text default 'contact_form',
  status      text not null default 'new' check (status in ('new', 'in_progress', 'won', 'lost', 'spam')),
  created_at  timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Insertion publique (validation minimale côté application + honeypot)
drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert" on public.leads
  for insert with check (
    char_length(name) between 2 and 120
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and char_length(message) between 10 and 4000
  );

drop policy if exists "leads_admin_read" on public.leads;
create policy "leads_admin_read" on public.leads
  for select using (public.is_admin());

drop policy if exists "leads_admin_update" on public.leads;
create policy "leads_admin_update" on public.leads
  for update using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------
-- Table : settings (coordonnées / infos publiques)
-- ------------------------------------------------------------------
create table if not exists public.settings (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

drop trigger if exists settings_set_updated_at on public.settings;
create trigger settings_set_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

alter table public.settings enable row level security;

-- Seul un sous-ensemble de clés est lisible publiquement
drop policy if exists "settings_public_read" on public.settings;
create policy "settings_public_read" on public.settings
  for select using (
    key in ('contact', 'social', 'company', 'stats') or public.is_admin()
  );

drop policy if exists "settings_admin_write" on public.settings;
create policy "settings_admin_write" on public.settings
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.settings (key, value) values
  ('contact', '{"email":"contact@sirius-mali.tech","phone":"+33 6 98 43 36 02","phoneAlt":"+33 7 51 41 90 26","whatsapp":"33698433602","cities":["Bamako, Mali","Paris, France"]}'::jsonb),
  ('social', '{"linkedin":"","facebook":"","instagram":""}'::jsonb),
  ('company', '{"name":"SSD Sirius Solutions Digitales","tagline":"Conçu au Mali. Pensé pour l''Afrique."}'::jsonb),
  ('stats', '[]'::jsonb)
on conflict (key) do nothing;

-- ------------------------------------------------------------------
-- Storage : bucket public pour les médias du portfolio
-- ------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "portfolio_public_read" on storage.objects;
create policy "portfolio_public_read" on storage.objects
  for select using (bucket_id = 'portfolio');

drop policy if exists "portfolio_admin_write" on storage.objects;
create policy "portfolio_admin_write" on storage.objects
  for all using (bucket_id = 'portfolio' and public.is_admin())
  with check (bucket_id = 'portfolio' and public.is_admin());

-- ------------------------------------------------------------------
-- Bootstrap admin :
-- 1. Créer l'utilisateur dans Auth (Dashboard > Authentication > Users)
-- 2. Récupérer son UUID puis exécuter :
--    insert into public.profiles (user_id, role) values ('<uuid>', 'admin');
-- ------------------------------------------------------------------
