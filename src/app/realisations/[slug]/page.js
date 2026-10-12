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

const TYPE_LABEL = { site: "Site web", application: "Application mobile", plateforme: "Plateforme web" };

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
  if (!project) return { title: "Réalisation introuvable", robots: { index: false } };
  const title = project.category ? `${project.title} — ${project.category}` : project.title;
  const description = project.summary || project.solution?.slice(0, 155);
  const image = shareImage(project);
  return {
    title,
    description,
    keywords: [project.title, project.category, ...(project.technologies || [])].filter(Boolean),
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: {
      title: `${project.title} — réalisation ${SITE.name}`,
      description,
      url: `/realisations/${project.slug}`,
      type: "article",
      siteName: SITE.legalName,
      locale: SITE.locale,
      ...(image ? { images: [{ url: image, alt: `Aperçu de ${project.title}` }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${SITE.name}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

// Visuel de partage : la couverture du projet, sinon sa première capture.
function shareImage(project) {
  return project.cover_url || project.card_image || project.screens?.find((s) => s.url)?.url || "";
}

function MetaRow({ label, children }) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;
  return (
    <div className="meta__row">
      <dt className="mono">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Story({ title, children }) {
  if (!children) return null;
  return (
    <div>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const isPhone = project.type === "application";
  const pay = project.payment;

  const screenItems = (project.screens || []).map((s) => ({ url: s.url, tone: s.tone, label: s.label }));
  const galleryItems =
    project.images?.length > 0
      ? project.images.map((im) => ({ url: im.url, alt: im.alt, label: im.alt }))
      : project.gallery || [];
  const mediaItems = screenItems.length > 0 ? screenItems : galleryItems;
  const heroScreens = isPhone ? screenItems.slice(0, 3) : [];

  const pageUrl = `${SITE.url}/realisations/${project.slug}`;
  const image = shareImage(project);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": project.type === "application" ? "MobileApplication" : "WebApplication",
        name: project.title,
        url: project.link_url || pageUrl,
        description: project.summary,
        applicationCategory: project.category,
        ...(project.type === "application" && project.platforms?.length
          ? { operatingSystem: project.platforms.join(", ") }
          : {}),
        ...(image ? { image: image.startsWith("http") ? image : `${SITE.url}${image}` } : {}),
        inLanguage: "fr",
        keywords: project.technologies?.join(", "),
        creator: { "@id": `${SITE.url}/#organization` },
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Réalisations", item: `${SITE.url}/realisations` },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ----------------------------------------------------------- En-tête */}
      <section className="hero project-hero" style={{ paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <div className="container">
          <nav className="crumbs mono" aria-label="Fil d’Ariane">
            <Link href="/realisations">Réalisations</Link>
            <span aria-hidden="true">/</span>
            <span>{project.title}</span>
          </nav>

          <div className="project-head">
            {project.logo_url && (
              <img src={project.logo_url} alt={`Logo ${project.title}`} className="project-logo" width={64} height={64} />
            )}
            <h1 className="title-page">{project.title}</h1>
          </div>

          <p className="text-lg project-lead">
            {project.headline && project.headline !== project.summary && (
              <>
                <span className="strong">{project.headline}.</span>{" "}
              </>
            )}
            <span className="soft">{project.summary}</span>
          </p>

          <div className="btn-row">
            {project.link_url && (
              <a href={project.link_url} target="_blank" rel="noreferrer" className="btn btn--primary">
                {project.link_label || "Voir la réalisation en ligne"}
                <Icon name="ArrowUpRight" />
              </a>
            )}
            <Link href="/contact" className={`btn ${project.link_url ? "btn--secondary" : "btn--primary"}`}>
              {MEETING.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Visuel */}
      <section>
        <div className="container">
          {heroScreens.length >= 3 ? (
            <div className="showcase showcase--crop fade-b">
              <div className="phones">
                {heroScreens.map((s, i) => (
                  <MockShot key={i} tone={s.tone} label={s.label} src={s.url} alt={s.label} phone />
                ))}
              </div>
            </div>
          ) : (
            <div className="showcase showcase--pad">
              <MockShot
                {...(project.cover_url ? { src: project.cover_url } : { tone: project.cover })}
                label={project.title}
                alt={`Aperçu de ${project.title}`}
                phone={isPhone}
              />
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------ Métadonnées + récit */}
      <section className="section">
        <div className="container story-layout">
          <aside>
            <dl className="meta">
              <MetaRow label="Type">{TYPE_LABEL[project.type] || "Projet"}</MetaRow>
              <MetaRow label="Catégorie">{project.category}</MetaRow>
              <MetaRow label="Réalisé par">
                {project.own_product ? "SSD Sirius — produit interne" : project.client_name}
              </MetaRow>
              <MetaRow label="Plateformes">{project.platforms?.join(" · ")}</MetaRow>
              {project.technologies?.length > 0 && (
                <MetaRow label="Technologies">
                  <span className="meta__chips">
                    {project.technologies.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </span>
                </MetaRow>
              )}
              <MetaRow label="Équipe">{project.credits?.join(", ")}</MetaRow>
              {project.link_url && (
                <MetaRow label="En ligne">
                  <a href={project.link_url} target="_blank" rel="noreferrer">
                    {project.link_label || "Voir le projet"}
                  </a>
                </MetaRow>
              )}
            </dl>
          </aside>

          <div className="prose-block">
            <Story title="Contexte">{project.context}</Story>
            <Story title="Le problème">{project.problem}</Story>
            <Story title="Ce que Sirius a construit">{project.solution}</Story>
            <Story title="Pourquoi c’est une référence">{project.description}</Story>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Points forts */}
      {project.highlights?.length > 0 && (
        <section className="section section--line">
          <div className="container">
            <div className="section-head">
              <h2 className="title-1">
                <span className="strong">Ce que démontre {project.title}.</span>{" "}
                <span className="soft">Les choix techniques qui font la différence.</span>
              </h2>
            </div>
            <div className="cells">
              {project.highlights.map((h) => (
                <div className="cell" key={h.title}>
                  <Icon name={h.icon || "Sparkles"} className="cell__icon" />
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>

            {pay && (
              <div className="callout" style={{ marginTop: 40 }}>
                <span className="callout__icon">
                  <Icon name="Wallet" />
                </span>
                <div>
                  <h3 className="title-3">Paiements Mobile Money intégrés</h3>
                  <p>
                    Le boost d’annonces et les services payants sont réglés directement dans
                    l’application, via l’agrégateur <strong>{pay.aggregator}</strong>
                    {pay.operators?.length > 0 && <> et {pay.operators.join(", ")}</>} : choix du
                    pays et de l’opérateur, initiation du paiement, confirmation par code USSD ou QR,
                    puis suivi de la transaction jusqu’à la validation.
                  </p>
                  <div className="meta__chips">
                    {[pay.aggregator, ...(pay.operators || []), ...(pay.countries || [])].map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------- Fonctionnalités */}
      {project.featureGroups?.length > 0 && (
        <section className="section section--line">
          <div className="container">
            <div className="section-head">
              <h2 className="title-1">Fonctionnalités</h2>
            </div>
            <div className={`cells ${project.featureGroups.length === 2 ? "cells--2" : ""}`}>
              {project.featureGroups.map((g) => (
                <div className="cell" key={g.label}>
                  <h3>{g.label}</h3>
                  <ul className="checklist">
                    {(g.items || []).map((it) => (
                      <li key={it}>
                        <Icon name="Check" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- Galerie */}
      {mediaItems.length > 0 && (
        <section className="section section--line">
          <div className="container">
            <div className="section-head">
              <h2 className="title-1">{isPhone ? "L’application en images" : "En images"}</h2>
            </div>
            <ProjectGallery items={mediaItems} phone={isPhone} />
          </div>
        </section>
      )}

      {/* ------------------------------------------------- Stack technique */}
      {project.techGroups?.length > 0 && (
        <section className="section section--line">
          <div className="container story-layout">
            <h2 className="title-2">Stack technique</h2>
            <dl>
              {project.techGroups.map((g) => (
                <div className="spec__row" key={g.label}>
                  <dt className="mono">{g.label}</dt>
                  <dd>
                    {(g.items || []).map((it) => (
                      <span key={it} className="chip">
                        {it}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ------------------------------------------------ Principes produit */}
      {project.principles?.length > 0 && (
        <section className="section section--line">
          <div className="container story-layout">
            <h2 className="title-2">Principes produit</h2>
            <ul className="checklist">
              {project.principles.map((p) => (
                <li key={p} style={{ fontSize: 17 }}>
                  <Icon name="Sparkles" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTA title="Vous voulez la même chose pour votre activité ?" />
    </>
  );
}
