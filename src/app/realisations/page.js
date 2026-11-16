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
    "Découvrez les prestations clients, produits Sirius, projets en cadrage et concepts illustratifs : applications, plateformes et logiciels sur mesure au Mali et en Afrique.",
  openGraph: {
    title: "Réalisations — SSD Sirius",
    description: "Découvrez les références BAMA, MK Auto, Flash Market, Picasso Resolve et MaliLink, le cadrage d’ImpotMali et nos concepts de logiciels métier.",
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
    name: "Portfolio SSD Sirius — références, cadrage et concepts",
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
            Parcourez nos prestations clients et produits Sirius, puis découvrez les projets en
            cadrage et les concepts illustratifs. Le statut de chaque fiche distingue les références
            existantes des scénarios fictifs proposés pour explorer un besoin métier.
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
