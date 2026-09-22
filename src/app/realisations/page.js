import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import MockShot from "@/components/MockShot";
import CTA from "@/components/CTA";
import { getProjects } from "@/lib/content";
import { MEETING } from "@/data/site";

export const metadata = {
  title: "Réalisations",
  description:
    "Portfolio SSD Sirius : Flash Market, Picasso Resolve et MaliLink. Besoin métier, conception, technologies et résultat pour chaque projet.",
  alternates: { canonical: "/realisations" },
};

export const revalidate = 300;

export default async function RealisationsPage() {
  const projects = await getProjects();
  const flagship = projects.find((p) => p.flagship);
  const rest = flagship ? projects.filter((p) => p.slug !== flagship.slug) : projects;

  return (
    <>
      {/* ------------------------------------------------------ Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <div className="section-head__meta">
              <span className="label">Portfolio</span>
            </div>
            <div className="section-head__body">
              <h1 className="display" style={{ maxWidth: "14ch" }}>
                Ce que nous avons construit.
              </h1>
              <p className="lead">
                Trois produits en production. Pour chacun : le besoin de départ, la
                conception, l&apos;exécution technique et le résultat en ligne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Projet phare */}
      {flagship && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <div className="section-head__meta">
                <span className="index">01</span>
                <span className="label">Projet phare</span>
              </div>
              <div className="section-head__body">
                <h2 className="h2">{flagship.title}</h2>
                <p className="lead">{flagship.summary}</p>

                {flagship.platforms?.length > 0 && (
                  <div className="platform-badges">
                    {flagship.platforms.map((platform) => (
                      <span key={platform} className="tag">
                        {platform}
                      </span>
                    ))}
                  </div>
                )}

                <div className="tag-row">
                  {flagship.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/realisations/${flagship.slug}`}
                  className="btn btn--primary"
                  style={{ alignSelf: "flex-start" }}
                >
                  Découvrir le projet
                  <Icon name="ArrowUpRight" />
                </Link>
              </div>
            </div>

            {flagship.screens?.length > 0 ? (
              <div className="screens-row">
                {flagship.screens.slice(0, 4).map((screen, i) => (
                  <Reveal className="screen-item" key={i} delay={i * 60}>
                    <MockShot tone={screen.tone} label={screen.label} phone src={screen.url} />
                    <span>{screen.label}</span>
                  </Reveal>
                ))}
              </div>
            ) : (
              <MockShot
                {...(flagship.cover_url ? { src: flagship.cover_url } : { tone: flagship.cover })}
                label={flagship.title}
                phone={flagship.type === "application"}
              />
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------ Autres projets */}
      <section className="section section--tight">
        <div className="container">
          {rest.length === 0 ? (
            <p className="muted">D&apos;autres réalisations seront bientôt publiées.</p>
          ) : (
            <>
              <div className="section-head">
                <div className="section-head__meta">
                  <span className="index">{flagship ? "02" : "01"}</span>
                  <span className="label">{flagship ? "Autres projets" : "Projets"}</span>
                </div>
                <div className="section-head__body">
                  <h2 className="h2">Le reste du portfolio.</h2>
                </div>
              </div>

              <div className="grid grid-3">
                {rest.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 60}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTA
        label="03 / Contact"
        title="Un projet similaire ?"
        text={MEETING.short}
        primary={{ href: "/contact", label: MEETING.ctaLabel }}
        secondary={{ href: "/services", label: "Voir nos expertises" }}
      />
    </>
  );
}
