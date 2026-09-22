import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import MockShot from "@/components/MockShot";
import ProjectGallery from "@/components/ProjectGallery";
import CTA from "@/components/CTA";
import { getProject, getProjectSlugs } from "@/lib/content";
import { SITE, MEETING } from "@/data/site";

export const revalidate = 300;
export const dynamicParams = true;

const TYPE_LABEL = { site: "Site web", application: "Application", plateforme: "Plateforme" };

export async function generateStaticParams() {
  try {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Réalisation introuvable" };
  return {
    title: project.title,
    description: project.summary || project.solution?.slice(0, 155),
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${SITE.name}`,
      description: project.summary,
      url: `${SITE.url}/realisations/${project.slug}`,
      type: "article",
    },
  };
}

function Block({ title, children }) {
  if (!children) return null;
  return (
    <div className="stack" style={{ "--gap": "10px" }}>
      <h2 className="h3">{title}</h2>
      <p className="muted">{children}</p>
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const isPhone = project.type === "application";
  const pay = project.payment;

  const screenItems =
    project.screens?.length > 0
      ? project.screens.map((s) => ({ url: s.url, tone: s.tone, label: s.label }))
      : [];
  const galleryItems =
    project.images?.length > 0
      ? project.images.map((im) => ({ url: im.url, alt: im.alt, label: im.alt }))
      : project.gallery || [];
  const mediaItems = screenItems.length > 0 ? screenItems : galleryItems;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.category,
    creator: { "@type": "Organization", name: SITE.legalName },
    abstract: project.summary,
    keywords: project.technologies?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/realisations">Réalisations</Link>
            <span aria-hidden="true">/</span>
            <span>{project.title}</span>
          </nav>

          <div className="page-hero__grid">
            <div className="section-head__meta">
              <span className="label">
                {TYPE_LABEL[project.type] || "Projet"}
              </span>
              {project.category && <span className="label">{project.category}</span>}
              {project.flagship && (
                <span className="badge-flagship" style={{ alignSelf: "flex-start" }}>
                  <Icon name="Star" />
                  Projet phare
                </span>
              )}
            </div>

            <div className="section-head__body">
              <div className="project-title-row">
                {project.logo_url && (
                  <img
                    src={project.logo_url}
                    alt={`Logo ${project.title}`}
                    className="project-logo"
                    width={72}
                    height={72}
                  />
                )}
                <h1 className="display" style={{ margin: 0 }}>
                  {project.title}
                </h1>
              </div>

              <p className="lead">{project.summary}</p>

              <div className="tag-row">
                {project.own_product && <span className="tag">Produit SSD Sirius</span>}
                {project.client_name && <span className="tag">Client : {project.client_name}</span>}
                {project.platforms?.map((platform) => (
                  <span key={platform} className="tag">{platform}</span>
                ))}
                {project.technologies?.slice(0, 6).map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>

              {project.link_url && (
                <a
                  href={project.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                  style={{ alignSelf: "flex-start" }}
                >
                  {project.link_label || "Voir la réalisation en ligne"}
                  <Icon name="ArrowUpRight" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {isPhone && screenItems.length >= 3 ? (
            <div className="hero-phones">
              {screenItems.slice(0, 3).map((s, i) => (
                <MockShot key={i} tone={s.tone} label={s.label} src={s.url} alt={s.label} phone />
              ))}
            </div>
          ) : (
            <MockShot
              {...(project.cover_url ? { src: project.cover_url } : { tone: project.cover })}
              label={project.title}
              phone={isPhone}
            />
          )}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "clamp(24px, 4vw, 44px)" }}>
            <Block title="Contexte">{project.context}</Block>
            <Block title="Problématique">{project.problem}</Block>
            <Block title="Solution SSD Sirius">{project.solution}</Block>
            <Block title="Description">{project.description}</Block>
          </div>
        </div>
      </section>

      {project.highlights?.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Points techniques</span>
            </div>
            <div className="grid grid-3">
              {project.highlights.map((h) => (
                <div className="card" key={h.title}>
                  <span className="icon-orbit">
                    <Icon name={h.icon || "Sparkles"} />
                  </span>
                  <h3 className="h3">{h.title}</h3>
                  <p className="muted">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pay && (
        <section className="section section--tight">
          <div className="container">
            <div className="mm-callout">
              <span className="icon-orbit">
                <Icon name="Wallet" />
              </span>
              <div className="stack" style={{ "--gap": "10px" }}>
                <h2 className="h3">Paiements Mobile Money intégrés</h2>
                <p className="muted">
                  Le boost d&apos;annonces et les services payants sont réglés directement dans
                  l&apos;application, via l&apos;agrégateur <strong>{pay.aggregator}</strong>
                  {pay.operators?.length > 0 && <> et {pay.operators.join(", ")}</>} : sélection du
                  pays et de l&apos;opérateur, initiation du paiement, confirmation par code USSD ou
                  QR, et suivi de la transaction jusqu&apos;à la validation.
                </p>
                <div className="tag-row">
                  <span className="tag">{pay.aggregator}</span>
                  {pay.operators?.map((o) => (
                    <span key={o} className="tag">{o}</span>
                  ))}
                  {pay.countries?.map((c) => (
                    <span key={c} className="tag">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {project.featureGroups?.length > 0 ? (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Fonctionnalités</span>
              <h2 className="h2" style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>
                Tout ce que fait l&apos;application
              </h2>
            </div>
            <div className="grid grid-3" style={{ alignItems: "start" }}>
              {project.featureGroups.map((g) => (
                <div className="panel" key={g.label} style={{ padding: "clamp(20px, 3vw, 28px)" }}>
                  <h3 className="h3" style={{ marginBottom: 16 }}>{g.label}</h3>
                  <ul className="feature-list">
                    {(g.items || []).map((it) => (
                      <li key={it}>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        project.features?.length > 0 && (
          <section className="section section--tight">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">Fonctionnalités clés</span>
              </div>
              <div className="grid grid-2">
                {project.features.map((f) => (
                  <div className="panel" key={f} style={{ padding: "16px 18px", display: "flex", gap: 12 }}>
                    <Icon
                      name="Check"
                      width={18}
                      height={18}
                      style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }}
                    />
                    <span className="muted">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {mediaItems.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Aperçus</span>
              <h2 className="h2" style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>
                {isPhone ? "L'application en images" : "Galerie du projet"}
              </h2>
            </div>
            <ProjectGallery items={mediaItems} phone={isPhone} />
          </div>
        </section>
      )}

      {project.techGroups?.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Stack technique</span>
            </div>
            <div className="tech-groups">
              {project.techGroups.map((g) => (
                <div className="panel tech-group" key={g.label} style={{ padding: "20px 22px" }}>
                  <h4>{g.label}</h4>
                  <div className="tag-row">
                    {(g.items || []).map((it) => (
                      <span key={it} className="tag">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.principles?.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="mission" style={{ textAlign: "left" }}>
              <span className="eyebrow">Principes produit</span>
              <ul className="feature-list feature-list--lg" style={{ marginTop: 22 }}>
                {project.principles.map((p) => (
                  <li key={p}>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {project.metrics?.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="grid grid-3">
              {project.metrics.map((m) => (
                <div className="panel" key={m.label} style={{ padding: "22px 20px" }}>
                  <span className="stats__label">{m.label}</span>
                  <p style={{ fontSize: "1.05rem", marginTop: 6 }}>{m.value}</p>
                </div>
              ))}
            </div>

            {project.credits?.length > 0 && (
              <p className="muted" style={{ marginTop: 26, fontSize: "0.88rem" }}>
                Conçu et développé par {project.credits.join(" et ")} — {SITE.legalName}.
              </p>
            )}

            {project.link_url && (
              <a
                href={project.link_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost"
                style={{ marginTop: 20 }}
              >
                {project.link_label || "Voir la réalisation en ligne"}
                <Icon name="ExternalLink" />
              </a>
            )}
          </div>
        </section>
      )}

      <CTA
        title="Vous voulez la même chose pour votre activité ?"
        text={MEETING.long}
        primary={{ href: "/contact", label: MEETING.ctaLabel }}
        secondary={{ href: "/realisations", label: "Autres réalisations" }}
      />
    </>
  );
}
