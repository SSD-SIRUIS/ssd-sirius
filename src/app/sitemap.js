import { getProjectSlugs } from "@/lib/content";
import { SITE } from "@/data/site";

export default async function sitemap() {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const routes = ["", "/services", "/realisations", "/garanties", "/a-propos", "/contact", "/mentions-legales"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })
  );

  let projectRoutes = [];
  try {
    const slugs = await getProjectSlugs();
    projectRoutes = slugs.map((slug) => ({
      url: `${base}/realisations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // ignore
  }

  return [...routes, ...projectRoutes];
}
