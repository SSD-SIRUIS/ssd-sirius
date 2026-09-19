import CTA from "@/components/CTA";
import RealisationsGrid from "@/components/RealisationsGrid";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Réalisations",
  description:
    "Les réalisations de SSD Sirius : Flash Market, marketplace mobile iOS et Android, MaliLink, plateforme d’emploi, et nos autres projets web.",
  alternates: { canonical: "/realisations" },
};

export const revalidate = 300;

export default async function RealisationsPage() {
  const projects = await getProjects();

  return (
    <>
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
