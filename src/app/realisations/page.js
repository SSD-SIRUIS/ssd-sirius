import CTA from "@/components/CTA";
import RealisationsGrid from "@/components/RealisationsGrid";
import { getProjects } from "@/lib/content";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Réalisations",
  description:
    "Trois produits conçus, développés et mis en ligne par SSD Sirius : Flash Market (marketplace mobile iOS et Android), Picasso Resolve (photos produit par IA) et MaliLink (plateforme d’emploi au Mali).",
  openGraph: {
    title: "Réalisations — SSD Sirius",
    description: "Flash Market, Picasso Resolve et MaliLink : trois produits en ligne, conçus et développés par SSD Sirius.",
    url: "/realisations",
    siteName: SITE.legalName,
    locale: SITE.locale,
  },
  alternates: { canonical: "/realisations" },
};

export const revalidate = 300;

export default async function RealisationsPage() {
  const projects = await getProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Réalisations SSD Sirius",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/realisations/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 className="title-page">Réalisations</h1>
          <p className="text-lg" style={{ marginTop: 20, maxWidth: 640 }}>
            <span className="strong">Des produits en ligne, utilisés tous les jours.</span>{" "}
            <span className="soft">Chacun raconte un besoin, une conception, une technologie et un résultat.</span>
          </p>

          {projects.length === 0 ? (
            <p className="muted" style={{ marginTop: 48 }}>
              Les réalisations seront bientôt publiées.
            </p>
          ) : (
            <RealisationsGrid projects={projects} />
          )}
        </div>
      </section>

      <CTA title="Un projet similaire ?" />
    </>
  );
}
