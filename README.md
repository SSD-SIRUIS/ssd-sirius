# SSD Sirius — Site vitrine

Site vitrine premium de **SSD Sirius Solutions Digitales** : présentation de l'agence,
portfolio de réalisations et prise de contact. Univers visuel sombre, spatial et technologique.

## Stack

| Élément | Choix |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: standalone`) |
| UI | React 19, JavaScript pur, alias `@/*` |
| Styles | CSS vanilla unique (`src/app/globals.css`) + variables CSS |
| Icônes | `lucide-react` |
| Backend | Supabase (Postgres + Auth + Storage) — **optionnel** |
| Police | Google Fonts — Outfit (`next/font`) |
| Déploiement | Docker multi-stage → Google Cloud Run (port 8080) |

Sans Supabase configuré, le site fonctionne avec des **données de démonstration locales**
(`src/data/`). Le formulaire de contact journalise alors les demandes côté serveur sans les stocker.

## Démarrage

```bash
npm install
cp .env.example .env.local   # facultatif : renseigner Supabase
npm run dev                  # http://localhost:3000
```

## Supabase (contenu réel + admin)

1. Créer un projet sur supabase.com.
2. Appliquer le schéma, au choix :
   - **Dashboard** : SQL Editor → coller et exécuter `supabase_init.sql`.
   - **CLI** : `supabase login` → `supabase link --project-ref <ref>` → `supabase db push`
     (applique `supabase/migrations/`).
3. Renseigner dans `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (serveur uniquement)
4. Créer l'utilisateur admin : Authentication → Users → Add user, puis dans le SQL Editor :
   ```sql
   insert into public.profiles (user_id, role) values ('<uuid-utilisateur>', 'admin');
   ```
5. Se connecter sur `/admin/login`.

### Admin (`/admin`)

- **Réalisations** — CRUD complet, statut brouillon/publié/archivé, mise en avant, galerie d'images (URLs Storage), technologies, indicateurs.
- **Demandes** — leads du formulaire de contact, changement de statut, lecture du message.
- **Paramètres** — coordonnées, réseaux sociaux, nom et signature de l'entreprise.

## Contenu

- Logo : `public/logo.svg` (recréation vectorielle). Déposer le PNG d'origine en `public/logo.png` si besoin.
- Images de réalisations : uploader dans le bucket Storage `portfolio`, coller l'URL publique dans l'admin.
- Les cadres de maquette (`MockShot`) servent de placeholder tant qu'aucune capture réelle n'est fournie.
- Ne publier que des chiffres vérifiables (voir `STATS` dans `src/data/site.js`).

## Déploiement

### Option A — Vercel (le plus rapide pour un lien public)

1. Importer le dépôt GitHub sur vercel.com.
2. Framework détecté automatiquement (Next.js), aucune config.
3. Ajouter les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, etc.).
4. Chaque `git push` sur `main` redéploie. URL de préproduction par branche.

### Option B — Google Cloud Run (conforme au doc technique, Docker)

Manuel :

```bash
gcloud run deploy ssd-sirius \
  --source . \
  --region=europe-west1 \
  --port=8080 \
  --allow-unauthenticated \
  --set-env-vars=NEXT_PUBLIC_SUPABASE_URL=...,NEXT_PUBLIC_SUPABASE_ANON_KEY=...,SUPABASE_SERVICE_ROLE_KEY=...,NEXT_PUBLIC_SITE_URL=https://votre-domaine
```

Automatisé : workflow `.github/workflows/deploy-cloudrun.yml` (déclenchement manuel via
l'onglet Actions ; secrets requis documentés en tête du fichier).

Le `Dockerfile` multi-stage produit une image minimale à partir de la sortie `standalone`.

## Structure

```
src/
├── app/                 # pages (App Router) + admin + api/leads + sitemap/robots
├── components/          # Header, Footer, SiriusMark, Starfield, ProjectCard, ContactForm...
├── lib/                 # supabase.js, content.js (Supabase → repli local), useSession.js
└── data/                # site.js, services.js, projects.js (repli local)
supabase_init.sql        # schéma + RLS + storage (copie dans supabase/migrations/)
supabase/                # config.toml + migrations pour la CLI Supabase
.github/workflows/       # deploy-cloudrun.yml (déploiement manuel Cloud Run)
Dockerfile               # build Cloud Run
```
