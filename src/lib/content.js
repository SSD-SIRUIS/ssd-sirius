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
    credits: asArray(row.credits),
    cover: row.cover || row.cover_url || "commerce",
    cover_url: row.cover_url || "",
    logo_url: row.logo_url || "",
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
      if (data && data.length) return data.map(normalizeProject);
    } catch (e) {
      console.warn("[content] Supabase getProjects a échoué, repli local :", e.message);
    }
  }
  let list = PROJECTS.filter((p) => p.status === "published");
  if (featuredOnly) list = list.filter((p) => p.featured);
  return list
    .slice()
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map(normalizeProject);
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
      if (data) return normalizeProject(data);
    } catch (e) {
      console.warn("[content] Supabase getProject a échoué, repli local :", e.message);
    }
  }
  return normalizeProject(getProjectBySlug(slug));
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
        return {
          contact: { ...fallback.contact, ...(map.contact || {}) },
          social: { ...fallback.social, ...(map.social || {}) },
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
