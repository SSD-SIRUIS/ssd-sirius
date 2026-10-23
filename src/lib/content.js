// Accès au contenu : Supabase si configuré, sinon repli sur les données de démo locales.
// Toutes les pages publiques passent par ces fonctions.

import { getSupabaseServer, hasSupabase } from "@/lib/supabase";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { CONTACT, SOCIAL, SITE, STATS } from "@/data/site";

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

/** Normalise une ligne Supabase ou un objet local vers une forme unique. */
function normalizeProject(row) {
  if (!row) return null;
  return {
    slug: row.slug,
    title: row.title,
    client_name: row.client_name || "",
    own_product: Boolean(row.own_product),
    type: row.type || "site",
    category: row.category || "",
    featured: Boolean(row.featured),
    flagship: Boolean(row.flagship),
    status: row.status || "published",
    link_url: row.link_url || "",
    link_label: row.link_label || "",
    store_links: row.store_links || null,
    credits: asArray(row.credits),
    cover: row.cover || row.cover_url || "commerce",
    cover_url: row.cover_url || "",
    logo_url: row.logo_url || "",
    headline: row.headline || row.summary || "",
    card_tone: row.card_tone || "",
    card_image: row.card_image || "",
    card_icon: row.card_icon || "",
    platforms: asArray(row.platforms),
    payment: row.payment || null,
    summary: row.summary || "",
    description: row.description || "",
    context: row.context || "",
    problem: row.problem || "",
    solution: row.solution || "",
    features: asArray(row.features),
    featureGroups: asArray(row.feature_groups || row.featureGroups),
    principles: asArray(row.principles),
    highlights: asArray(row.highlights),
    screens: asArray(row.screens),
    techGroups: asArray(row.tech_groups || row.techGroups),
    technologies: asArray(row.technologies),
    metrics: asArray(row.metrics),
    gallery: asArray(row.gallery),
    images: asArray(row.project_images).sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    ),
    sort_order: row.sort_order || 0,
  };
}

// Les couvertures et marques sont des assets du dépôt : elles restent donc
// cohérentes même quand le contenu principal vient de Supabase.
function applyLocalProjectPresentation(project) {
  if (!project) return project;
  const local = PROJECTS.find((item) => item.slug === project.slug);
  if (!local) return project;
  return {
    ...project,
    card_tone: local.card_tone || project.card_tone,
    card_image: local.card_image || "",
    card_icon: local.card_icon || "",
    logo_url: local.logo_url || project.logo_url,
    store_links: local.store_links || project.store_links,
    platforms: local.platforms?.length ? local.platforms : project.platforms,
    featured: local.featured,
    sort_order: local.sort_order ?? project.sort_order,
  };
}

// Le catalogue local complète Supabase pour les réalisations ajoutées au site
// avant leur éventuelle saisie dans la base de contenu.
function mergeProjectRows(rows, featuredOnly = false) {
  const normalized = rows
    .map((row) => applyLocalProjectPresentation(normalizeProject(row)))
    .filter(Boolean);
  const knownSlugs = new Set(normalized.map((project) => project.slug));
  const localOnly = PROJECTS
    .filter((project) => project.status === "published")
    .filter((project) => !featuredOnly || project.featured)
    .filter((project) => !knownSlugs.has(project.slug))
    .map((project) => applyLocalProjectPresentation(normalizeProject(project)));

  return [...normalized, ...localOnly].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );
}

/** Liste des réalisations publiées. */
export async function getProjects({ featuredOnly = false } = {}) {
  if (hasSupabase) {
    try {
      const supabase = getSupabaseServer();
      let query = supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (featuredOnly) query = query.eq("featured", true);
      const { data, error } = await query;
      if (error) throw error;
      if (data && data.length) return mergeProjectRows(data, featuredOnly);
    } catch (e) {
      console.warn("[content] Supabase getProjects a échoué, repli local :", e.message);
    }
  }
  return mergeProjectRows([], featuredOnly);
}

/** Une réalisation par slug, avec sa galerie. */
export async function getProject(slug) {
  if (hasSupabase) {
    try {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (data) return applyLocalProjectPresentation(normalizeProject(data));
    } catch (e) {
      console.warn("[content] Supabase getProject a échoué, repli local :", e.message);
    }
  }
  return applyLocalProjectPresentation(normalizeProject(getProjectBySlug(slug)));
}

/** Slugs pour generateStaticParams / sitemap. */
export async function getProjectSlugs() {
  const list = await getProjects();
  return list.map((p) => p.slug);
}

/** Coordonnées et infos publiques. */
export async function getSettings() {
  const fallback = {
    contact: {
      email: CONTACT.email,
      phone: CONTACT.phone,
      phoneAlt: CONTACT.phoneAlt,
      whatsapp: CONTACT.whatsapp,
      cities: CONTACT.cities,
      city: CONTACT.city,
    },
    social: SOCIAL,
    company: { name: SITE.legalName, tagline: SITE.tagline },
    stats: STATS,
  };
  if (hasSupabase) {
    try {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase
        .from("settings")
        .select("key, value")
        .in("key", ["contact", "social", "company", "stats"]);
      if (error) throw error;
      if (data && data.length) {
        const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
        const socialFromDb = map.social || {};
        return {
          contact: { ...fallback.contact, ...(map.contact || {}) },
          // Le lien LinkedIn de la vitrine reste disponible même si l'ancien
          // réglage Supabase contient encore une chaîne vide.
          social: {
            ...fallback.social,
            ...socialFromDb,
            linkedin: socialFromDb.linkedin || fallback.social.linkedin,
          },
          company: { ...fallback.company, ...(map.company || {}) },
          stats: Array.isArray(map.stats) && map.stats.length ? map.stats : fallback.stats,
        };
      }
    } catch (e) {
      console.warn("[content] Supabase getSettings a échoué, repli local :", e.message);
    }
  }
  return fallback;
}
