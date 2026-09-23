-- ==================================================================
-- SSD Sirius — installation complète de la base (projet vide)
-- À coller en une fois dans le SQL Editor de Supabase.
-- = migrations/0001_init.sql puis migrations/0002_projets_reels.sql
-- ==================================================================

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


-- ==================================================================
-- SSD Sirius — mise à jour des réalisations (Supabase SQL Editor)
--
-- Généré depuis src/data/projects.js : la base contient exactement les
-- mêmes projets que le site, et seulement les projets réels :
-- Flash Market, Picasso Resolve, MaliLink.
--
-- Rejouable sans risque : chaque instruction est idempotente.
-- ==================================================================

begin;

-- 1. Colonnes utilisées par le site mais absentes de la migration initiale.
alter table public.projects
  add column if not exists own_product    boolean not null default false,
  add column if not exists headline       text,
  add column if not exists feature_groups jsonb not null default '[]'::jsonb,
  add column if not exists principles     jsonb not null default '[]'::jsonb,
  add column if not exists gallery        jsonb not null default '[]'::jsonb,
  add column if not exists credits        jsonb not null default '[]'::jsonb,
  add column if not exists payment        jsonb,
  add column if not exists cover          text,
  add column if not exists card_image     text,
  add column if not exists card_tone      text,
  add column if not exists logo_url       text,
  add column if not exists link_label     text;

-- 2. Suppression de tout projet qui n'est pas un des trois projets réels
--    (plateforme-e-commerce, passerelle-paiement, marketplace-locale…).
--    Leurs images (project_images) partent avec eux (on delete cascade),
--    et les demandes de contact liées sont conservées (on delete set null).
delete from public.projects
where slug not in ('flash-market', 'picasso-resolve', 'malilink');

-- 3. Insertion ou mise à jour des trois projets réels.
insert into public.projects (slug, title, client_name, own_product, type, category, headline, summary, description, context, problem, solution, features, feature_groups, principles, highlights, screens, gallery, tech_groups, technologies, metrics, platforms, credits, payment, flagship, featured, status, cover, cover_url, card_image, card_tone, logo_url, link_url, link_label, sort_order)
values
  ('flash-market', 'Flash Market', null, true, 'application', 'Marketplace mobile', 'Une application complète, publiée sur iOS et Android', 'La marketplace mobile pensée pour acheter, vendre et trouver des professionnels au Mali. Conçue et développée intégralement par SSD Sirius.', 'Flash Market démontre toute la palette technique de SSD Sirius sur le développement d''application : une base de code unique pour iOS et Android, un back-end complet avec sécurité au niveau des lignes, du temps réel, du paiement mobile pour la promotion d''annonces, et une chaîne de publication maîtrisée jusqu''aux stores.', 'Flash Market met en relation particuliers, vendeurs et professionnels dans une expérience simple, rapide et adaptée aux usages locaux : interface en français, prix en FCFA, et échanges qui se poursuivent dans l''application ou via les coordonnées du vendeur.', 'Acheter et vendre localement passait par des canaux dispersés, sans recherche fiable, sans tri par proximité et sans vitrine durable pour les professionnels. Il fallait réunir la découverte, la mise en relation et la gestion d''une activité dans une seule application, utilisable sur des connexions modestes.', 'SSD Sirius a conçu, développé et publié Flash Market de bout en bout : application React Native / Expo en TypeScript, back-end Supabase (PostgreSQL, Auth, Realtime, Storage), politiques RLS pour isoler les données privées, notifications push, géolocalisation, interface d''administration et pages publiques — jusqu''aux builds et mises à jour EAS.', '[]'::jsonb, '[{"label":"Pour les acheteurs","items":["Parcours d''annonces par catégorie et sous-catégorie","Recherche et filtres par prix, état, localisation et type de vendeur","Tri par proximité grâce à la géolocalisation","Fiches détaillées avec photos, prix et informations vendeur","Favoris pour retrouver facilement une annonce","Messagerie en temps réel","Découverte des boutiques et professionnels","Demandes de devis pour les prestations de services","Avis et signalement de contenus"]},{"label":"Pour les vendeurs et professionnels","items":["Publication et modification d''annonces","Gestion des annonces depuis un espace personnel","Profil public avec photo, biographie et réseaux sociaux","Boutique professionnelle avec catalogue de produits","Vitrine de services, portfolio, disponibilités et tarifs","Gestion des commandes et demandes clients","Statistiques de visibilité et de contacts","Notifications transactionnelles et push","Programme de parrainage"]},{"label":"Plateforme","items":["Connexion par e-mail, téléphone, Google ou Apple","Données synchronisées en temps réel","Stockage sécurisé des images","Politiques PostgreSQL RLS pour isoler les données privées","Outils de modération et d''administration","Pages publiques de présentation, support et informations légales"]}]'::jsonb, '["L''accès reste gratuit pour les acheteurs.","Les annonces pertinentes priment toujours sur la promotion payante.","Les vendeurs professionnels disposent d''une présence durable et identifiable.","La proximité, la confiance et la simplicité guident l''expérience.","Les données privées sont protégées côté serveur, pas uniquement dans l''interface."]'::jsonb, '[{"icon":"Smartphone","title":"Application iOS & Android","text":"Une base de code unique en React Native, Expo et TypeScript, livrée sur les deux plateformes."},{"icon":"ShieldCheck","title":"Données protégées côté serveur","text":"Politiques PostgreSQL RLS : les données privées sont isolées dans la base, pas seulement masquées dans l''interface."},{"icon":"RefreshCw","title":"Temps réel","text":"Messagerie et données synchronisées en direct via Supabase Realtime."},{"icon":"Store","title":"Espace professionnel complet","text":"Boutique, catalogue, vitrine de services, portfolio, tarifs, commandes, devis et statistiques de visibilité."},{"icon":"Wallet","title":"Paiement Mobile Money intégré","text":"Boost d''annonces et services payants réglés en Mobile Money via l''agrégateur XPaye Africa et Orange Money."},{"icon":"BellRing","title":"Notifications push","text":"Notifications transactionnelles et push via Expo Push API et pg_net."}]'::jsonb, '[{"tone":"flash","label":"Recherche géolocalisée et catégories","url":"/realisations/flash-market/01-recherche.jpg"},{"tone":"flash","label":"Accueil — pros et annonces récentes","url":"/realisations/flash-market/05-accueil.jpg"},{"tone":"flash-2","label":"Espace pro — statistiques et contacts reçus","url":"/realisations/flash-market/06-espace-pro.jpg"},{"tone":"flash-2","label":"Profil vendeur — annonces & espace pro","url":"/realisations/flash-market/04-profil-vendeur.jpg"},{"tone":"flash-pay","label":"Paiement — choix du pays et de l''opérateur","url":"/realisations/flash-market/03-choix-operateur.jpg"},{"tone":"flash-pay","label":"Confirmation Orange Money","url":"/realisations/flash-market/02-paiement-orange-money.jpg"}]'::jsonb, '[]'::jsonb, '[{"label":"Application mobile","items":["React Native","Expo","TypeScript"]},{"label":"Navigation","items":["React Navigation"]},{"label":"Backend","items":["Supabase","PostgreSQL"]},{"label":"Authentification","items":["Supabase Auth","Google Sign-In","Apple Sign-In"]},{"label":"Temps réel","items":["Supabase Realtime"]},{"label":"Stockage","items":["Supabase Storage"]},{"label":"Notifications","items":["Expo Notifications","Expo Push API","pg_net"]},{"label":"Géolocalisation","items":["Expo Location"]},{"label":"Déploiement mobile","items":["EAS Build","EAS Update"]},{"label":"Administration","items":["HTML","CSS","JavaScript"]},{"label":"Paiement","items":["XPaye Africa","Orange Money","Mobile Money"]}]'::jsonb, '["React Native","Expo","TypeScript","Supabase","PostgreSQL"]'::jsonb, '[{"label":"Plateformes","value":"iOS + Android"},{"label":"Connexion","value":"E-mail, téléphone, Google, Apple"},{"label":"Sécurité des données","value":"PostgreSQL RLS"}]'::jsonb, '["iOS","Android"]'::jsonb, '["Sidi Oumar GANO","Mohamed Lamine"]'::jsonb, '{"aggregator":"XPaye Africa","operators":["Orange Money"],"countries":["Mali","Côte d''Ivoire"]}'::jsonb, true, true, 'published', 'flash', null, null, 'linear-gradient(140deg, #22a653 0%, #0f6b33 100%)', '/realisations/flash-market/logo.jpg', 'https://link-my.app/flash-market-install', 'Installer Flash Market', 1),
  ('picasso-resolve', 'Picasso Resolve', null, true, 'plateforme', 'SaaS & intelligence artificielle', 'Des photos produit professionnelles à partir d’une simple photo', 'Un studio photo par intelligence artificielle : à partir d’une photo de produit brute, Picasso Resolve génère des visuels prêts pour une fiche e-commerce. Conçu et développé par SSD Sirius.', 'De la page de présentation au studio de génération, en passant par les comptes et le système de crédits, Picasso Resolve est un produit SaaS complet, en ligne et utilisable aujourd’hui.', 'Une boutique en ligne vend d’abord par ses photos. Les e-commerçants ont besoin de visuels cohérents pour chaque référence, sans organiser un shooting à chaque nouveau produit.', 'Produire plusieurs mises en scène de qualité demande du matériel, un photographe, parfois des modèles, et une direction artistique difficile à reproduire à grande échelle.', 'SSD Sirius a conçu et développé Picasso Resolve de bout en bout : l’utilisateur importe une photo de son produit, l’intelligence artificielle l’analyse, propose plusieurs directions visuelles (studio, mise en scène, lifestyle) et génère un lot d’images téléchargeables en haute définition.', '["Import d’une photo produit brute","Analyse du produit par intelligence artificielle","Génération de plusieurs directions visuelles","Prompts consultables et modifiables","Téléchargement des images en haute définition","Système de crédits intégré"]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[{"icon":"Camera","title":"Une photo suffit","text":"Le point de départ est une photo de produit brute, prise au téléphone."},{"icon":"Sparkles","title":"Analyse par IA","text":"Le produit est identifié et décrit avant la génération, pour des visuels fidèles."},{"icon":"Layers","title":"Plusieurs directions","text":"Studio, mise en scène et lifestyle : un lot de visuels pour une même fiche produit."},{"icon":"PenTool","title":"Prompts modifiables","text":"Les instructions de génération sont consultables et ajustables avant de relancer."},{"icon":"Download","title":"Haute définition","text":"Les images générées se téléchargent en haute définition, prêtes à publier."},{"icon":"Wallet","title":"Système de crédits","text":"Chaque génération consomme des crédits : un modèle SaaS complet, facturation comprise."}]'::jsonb, '[{"url":"/realisations/picasso-resolve/01-photo-brute.jpg","tone":"picasso","label":"Photo produit brute, avant traitement"},{"url":"/realisations/picasso-resolve/02-vue-principale.jpg","tone":"picasso","label":"Vue principale générée"},{"url":"/realisations/picasso-resolve/03-mise-en-scene.jpg","tone":"picasso","label":"Mise en scène générée"},{"url":"/realisations/picasso-resolve/04-lifestyle.jpg","tone":"picasso","label":"Visuel lifestyle généré"}]'::jsonb, '[]'::jsonb, '[{"label":"Application web","items":["Next.js","React"]},{"label":"Intelligence artificielle","items":["Gemini","Replicate"]},{"label":"Modèle SaaS","items":["Comptes utilisateurs","Système de crédits"]}]'::jsonb, '["Next.js","Intelligence artificielle","Gemini","Replicate"]'::jsonb, '[{"label":"Produit","value":"SaaS complet"},{"label":"Parcours","value":"Photo brute → visuels e-commerce"}]'::jsonb, '["Web"]'::jsonb, '[]'::jsonb, null, false, true, 'published', 'picasso', '/realisations/picasso-resolve/02-vue-principale.jpg', '/realisations/picasso-resolve/02-vue-principale.jpg', null, null, 'https://picassoresolve.com', 'Découvrir Picasso Resolve', 2),
  ('malilink', 'MaliLink', null, true, 'plateforme', 'Plateforme d''emploi', 'La plateforme qui connecte les talents maliens aux recruteurs', 'La plateforme d''emploi qui connecte les talents maliens — et la diaspora — aux entreprises qui recrutent. Conçue et développée par SSD Sirius.', 'L''architecture sépare l''interface et les données : un front Next.js prérendu pour la vitesse, et une API dédiée, chacun déployé comme un service indépendant sur Google Cloud Run. Les deux peuvent évoluer et monter en charge séparément.', 'Au Mali, chercher un emploi passe encore largement par le bouche-à-oreille, les groupes de discussion et des annonces dispersées. MaliLink rassemble l''offre et la demande sur une plateforme unique, en français, ouverte aux candidats du pays comme de la diaspora.', 'Trois obstacles à lever : des offres éparpillées et invérifiables, un dossier de candidature à reconstituer à chaque fois (CV, diplômes, acte de naissance), et une inscription qui suppose une adresse e-mail que tout le monde n''utilise pas au quotidien.', 'SSD Sirius a conçu et développé MaliLink de bout en bout : une inscription par numéro de téléphone (l''e-mail reste optionnel), un coffre-fort de documents réutilisable qui rend chaque candidature instantanée, des employeurs vérifiés par NIF et RCCM, et une recherche filtrée par région, secteur et type de contrat — diaspora incluse.', '[]'::jsonb, '[{"label":"Pour les candidats","items":["Inscription en 2 minutes avec le numéro de téléphone comme identifiant","Coffre-fort sécurisé pour CV, diplômes et pièces justificatives","Candidature en un clic depuis les documents déjà déposés","Recherche filtrée par région, secteur et type de contrat","Offres accessibles depuis l''étranger pour la diaspora"]},{"label":"Pour les recruteurs","items":["Espace recruteur distinct dès la création du compte","Vérification de l''entreprise par NIF et RCCM","Publication et gestion des offres d''emploi","Réception des candidatures avec les pièces jointes"]},{"label":"Plateforme","items":["Interface entièrement en français","Couverture des régions du Mali et option diaspora","Pages prérendues pour un affichage rapide en connexion modeste","Front et API déployés comme deux services indépendants"]}]'::jsonb, '[]'::jsonb, '[{"icon":"Smartphone","title":"Inscription par téléphone","text":"Le numéro sert d''identifiant, l''e-mail reste optionnel : un parcours pensé pour les usages réels au Mali."},{"icon":"ShieldCheck","title":"Coffre-fort de documents","text":"CV, diplômes et acte de naissance déposés une seule fois, réutilisés à chaque candidature."},{"icon":"BadgeCheck","title":"Employeurs vérifiés","text":"Les entreprises sont validées par NIF et RCCM avant de pouvoir publier une offre."},{"icon":"Globe","title":"Mali & diaspora","text":"Les talents maliens de l''étranger postulent depuis leur pays de résidence."},{"icon":"Users","title":"Deux espaces distincts","text":"Un parcours candidat et un parcours recruteur, chacun avec ses propres écrans et ses propres droits."},{"icon":"Boxes","title":"Front et API séparés","text":"Deux services Cloud Run indépendants : l''interface et les données évoluent séparément."}]'::jsonb, '[{"url":"/realisations/malilink/01-accueil.jpg","tone":"market","label":"Accueil — l''emploi au Mali, repensé"},{"url":"/realisations/malilink/02-processus.jpg","tone":"market-2","label":"Postuler en trois étapes"},{"url":"/realisations/malilink/03-fonctionnalites.jpg","tone":"market-3","label":"Coffre-fort, diaspora et employeurs vérifiés"},{"url":"/realisations/malilink/04-inscription.jpg","tone":"dark","label":"Création de compte candidat ou recruteur"}]'::jsonb, '[]'::jsonb, '[{"label":"Interface web","items":["Next.js","React","Rendu prérendu (ISR)"]},{"label":"Back-end","items":["API dédiée","Service indépendant"]},{"label":"Infrastructure","items":["Google Cloud Run","Conteneurs","europe-west1"]}]'::jsonb, '["Next.js","React","API dédiée","Google Cloud Run"]'::jsonb, '[{"label":"Architecture","value":"Front + API séparés"},{"label":"Identifiant","value":"Numéro de téléphone"},{"label":"Portée","value":"Mali + diaspora"}]'::jsonb, '["Web","Mobile & desktop"]'::jsonb, '[]'::jsonb, null, false, true, 'published', 'market', '/realisations/malilink/01-accueil.jpg', '/realisations/malilink/01-accueil.jpg', null, null, 'https://malilink-web-779884436442.europe-west1.run.app', 'Voir MaliLink en ligne', 3)
on conflict (slug) do update set
  title = excluded.title,
  client_name = excluded.client_name,
  own_product = excluded.own_product,
  type = excluded.type,
  category = excluded.category,
  headline = excluded.headline,
  summary = excluded.summary,
  description = excluded.description,
  context = excluded.context,
  problem = excluded.problem,
  solution = excluded.solution,
  features = excluded.features,
  feature_groups = excluded.feature_groups,
  principles = excluded.principles,
  highlights = excluded.highlights,
  screens = excluded.screens,
  gallery = excluded.gallery,
  tech_groups = excluded.tech_groups,
  technologies = excluded.technologies,
  metrics = excluded.metrics,
  platforms = excluded.platforms,
  credits = excluded.credits,
  payment = excluded.payment,
  flagship = excluded.flagship,
  featured = excluded.featured,
  status = excluded.status,
  cover = excluded.cover,
  cover_url = excluded.cover_url,
  card_image = excluded.card_image,
  card_tone = excluded.card_tone,
  logo_url = excluded.logo_url,
  link_url = excluded.link_url,
  link_label = excluded.link_label,
  sort_order = excluded.sort_order,
  updated_at = now();

commit;

-- 4. Vérification : doit renvoyer exactement 3 lignes.
select slug, title, status, featured, sort_order
from public.projects
order by sort_order;
