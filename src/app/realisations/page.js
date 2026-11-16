import CTA from "@/components/CTA";
import Link from "next/link";
import Icon from "@/components/Icon";
import RealisationsGrid from "@/components/RealisationsGrid";
import { getProjects } from "@/lib/content";
import { SITE } from "@/data/site";
import { getPortfolioLabel, isUndeliveredProject } from "@/lib/portfolio";

export const metadata = {
  title: "Réalisations",
  description:
    "Découvrez les prestations clients, produits Sirius et projets sectoriels : pharmacie, cloud, agriculture, transport et maintenance informatique au Mali.",
  openGraph: {
    title: "Réalisations — SSD Sirius",
    description: "Références clients, produits Sirius et projets sectoriels : explorez le périmètre et l’état d’avancement de chaque solution informatique.",
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
    name: "Portfolio SSD Sirius — références et projets sectoriels",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/realisations/${p.slug}`,
      name: isUndeliveredProject(p) ? `${p.title} — ${getPortfolioLabel(p)}` : p.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 className="title-page">Réalisations</h1>
          <p className="text-lg" style={{ marginTop: 20, maxWidth: 820 }}>
            <span className="strong">Des produits Sirius et des solutions conçues pour nos clients.</span>{" "}
            <span className="soft">Applications mobiles, plateformes web et outils métier : découvrez le besoin, le périmètre et le travail de notre équipe.</span>
          </p>
          <p className="portfolio-intro">
            Parcourez nos prestations clients, nos produits et nos projets sectoriels. Chaque fiche
            précise son périmètre, le public concerné et son état d’avancement.
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

      <section className="section section--line">
        <div className="container">
          <div className="feature-head">
            <h2 className="title-2">Votre projet reste confidentiel.</h2>
            <div>
              <p className="text-md">
                Le nom de votre entreprise, vos écrans et vos données ne sont publiés qu’avec
                votre accord. Une étude de cas peut présenter le besoin et le travail réalisé
                en anonymisant les informations sensibles.
              </p>
              <Link href="/contact" className="link-more">
                Discuter d’un projet confidentiel <Icon name="ArrowRight" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA title="Un projet similaire ?" />
    </>
  );
}
