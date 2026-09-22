import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import TeamGrid from "@/components/TeamGrid";
import { getProjects } from "@/lib/content";
import { PROJECTS } from "@/data/projects";
import { HERO, STATS, MEETING, SITE } from "@/data/site";
import { PROCESS } from "@/data/services";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata = {
  title: "Agence de développement web et mobile au Mali",
  description:
    "Agence de développement web et mobile à Bamako et Paris. SSD Sirius conçoit, développe et met en ligne sites web, applications mobiles et logiciels SaaS sur mesure.",
  alternates: { canonical: "/" },
};

const CAPABILITIES = [
  {
    number: "01",
    title: "Sites web professionnels",
    text: "Sites vitrines et plateformes de marque, avec une structure pensée pour le référencement naturel.",
  },
  {
    number: "02",
    title: "Applications web métier",
    text: "Outils de gestion, portails et plateformes construits autour de vos processus existants.",
  },
  {
    number: "03",
    title: "Logiciels SaaS",
    text: "Produits en ligne, de la définition fonctionnelle au paiement et au déploiement.",
  },
  {
    number: "04",
    title: "Applications mobiles",
    text: "Applications iOS et Android à partir d'une base de code unique, publiées sur les deux stores.",
  },
];

// Ordre d'affichage du portfolio. Les données Supabase priment,
// le fichier local sert de repli.
const PORTFOLIO_ORDER = ["flash-market", "picasso-resolve", "malilink"];

function mergePortfolio(remoteProjects) {
  return PORTFOLIO_ORDER.map(
    (slug) =>
      remoteProjects.find((project) => project.slug === slug) ||
      PROJECTS.find((project) => project.slug === slug)
  ).filter(Boolean);
}

/** Visuel propre à chaque réalisation : trois écrans, un avant/après, ou un aplat. */
function WorkVisual({ project }) {
  if (project.slug === "flash-market") {
    const screens = (project.screens || []).filter((s) => s.url).slice(0, 3);
    if (screens.length) {
      return (
        <div className={styles.workPhones}>
          {screens.map((screen) => (
            <div className={styles.workPhone} key={screen.url}>
              <img src={screen.url} alt={screen.label} loading="lazy" />
            </div>
          ))}
        </div>
      );
    }
  }

  if (project.slug === "picasso-resolve") {
    return (
      <div className={styles.workCompare}>
        <div className={styles.workCompareItem}>
          <figure>
            <img
              src="https://picassoresolve.com/landing/origine.jpg"
              alt="Photo produit brute, avant traitement"
              loading="lazy"
            />
          </figure>
          <figcaption>Avant</figcaption>
        </div>
        <div className={styles.workCompareItem}>
          <figure>
            <img
              src="https://picassoresolve.com/landing/4k-1.jpg"
              alt="Visuel e-commerce généré par Picasso Resolve"
              loading="lazy"
            />
          </figure>
          <figcaption>Après</figcaption>
        </div>
      </div>
    );
  }

  const cover = project.cover_url || (project.screens || []).find((s) => s.url)?.url;
  if (cover) {
    return (
      <div className={styles.workShot}>
        <img src={cover} alt={`Aperçu de ${project.title}`} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={styles.workPlaceholder}>
      <span>{project.title} — visuels à venir</span>
    </div>
  );
}

export default async function HomePage() {
  const projects = mergePortfolio(await getProjects());

  return (
    <>
      {/* ---------------------------------------------------- Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroBadge}>
              <span className={styles.heroDot} aria-hidden="true" />
              {HERO.label}
              <span className={styles.heroBadgeDiv} aria-hidden="true" />
              <span className={styles.heroBadgePlace}>{HERO.place}</span>
            </span>

            <h1 className={styles.heroTitle}>
              {HERO.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>

            <p className={styles.heroLead}>{HERO.lead}</p>

            <div className={styles.heroActions}>
              <Link href="/contact" className="btn btn--primary">
                {MEETING.ctaLabel}
                <Icon name="ArrowUpRight" />
              </Link>
              <Link href="#realisations" className="btn btn--ghost">
                Voir les réalisations
                <Icon name="ArrowDown" />
              </Link>
            </div>
          </div>

          <div className={styles.heroStats}>
            {STATS.map((stat) => (
              <div className={styles.heroStat} key={stat.label}>
                <span className={styles.heroStatValue}>{stat.value}</span>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------- Réalisations */}
      <section className={styles.workSection} id="realisations">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">01</span>
              <span className="label">Réalisations</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Trois produits en production.</h2>
              <p className="lead">
                Flash Market, Picasso Resolve et MaliLink. Conception, développement et mise
                en ligne assurés par l&apos;équipe.
              </p>
            </div>
          </div>

          <div className={styles.workList}>
            {projects.map((project, i) => (
              <Reveal
                as="article"
                className={styles.work}
                key={project.slug}
                data-flip={i % 2 === 1 ? "true" : "false"}
              >
                <div className={styles.workIndex}>
                  <span className={styles.workNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="label">{project.category}</span>
                </div>

                <div className={styles.workCopy}>
                  <h3 className={styles.workTitle}>{project.title}</h3>
                  <p className={styles.workSummary}>{project.summary}</p>

                  <div className={styles.workMeta}>
                    {(project.platforms?.length ? project.platforms : project.technologies || [])
                      .slice(0, 4)
                      .map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                  </div>

                  <Link href={`/realisations/${project.slug}`} className="link-arrow">
                    Voir le projet
                    <Icon name="ArrowUpRight" />
                  </Link>
                </div>

                <div className={styles.workVisual}>
                  <WorkVisual project={project} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Expertises */}
      <section className={styles.capabilities}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">02</span>
              <span className="label">Expertises</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Conception et développement de solutions sur mesure.</h2>
            </div>
          </div>

          <div className={styles.capabilityList}>
            {CAPABILITIES.map((capability) => (
              <div className={styles.capability} key={capability.number}>
                <span className={styles.capabilityNum}>{capability.number}</span>
                <h3 className={styles.capabilityTitle}>{capability.title}</h3>
                <p className={styles.capabilityText}>{capability.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Méthode */}
      <section className={styles.method}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">03</span>
              <span className="label">Méthode</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Quatre étapes, du cadrage à la mise en ligne.</h2>
            </div>
          </div>

          <div className="steps">
            {PROCESS.map((step, i) => (
              <Reveal className="step" key={step.step} delay={i * 60}>
                <span className="step__num">{step.step}</span>
                <h3 className="h3">{step.title}</h3>
                <p className="muted">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Équipe */}
      <section className={styles.team}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">04</span>
              <span className="label">Équipe</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Deux associés, ingénieurs logiciels.</h2>
              <p className="lead">
                Tous deux en cycle ingénieur à EFREI Paris, spécialité cybersécurité. Ils
                conçoivent et développent l&apos;ensemble des produits présentés ici.
              </p>
            </div>
          </div>

          <TeamGrid />

          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <Link href="/a-propos" className="link-arrow">
              En savoir plus sur nous
              <Icon name="ArrowUpRight" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Clôture */}
      <section className={styles.closing}>
        <div className="container">
          <div className={styles.closingGrid}>
            <span className={styles.closingLabel}>05 / Contact</span>
            <div className={styles.closingBody}>
              <h2 className={styles.closingTitle}>
                Nous présenter votre projet
              </h2>
              <p className="lead">{MEETING.short}</p>
              <div className={styles.closingActions}>
                <Link href="/contact" className="btn btn--primary">
                  {MEETING.ctaLabel}
                  <Icon name="ArrowUpRight" />
                </Link>
                {MEETING.bookingUrl && (
                  <a
                    href={MEETING.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--ghost"
                  >
                    {MEETING.bookingLabel}
                    <Icon name="CalendarClock" />
                  </a>
                )}
              </div>
              <div className={styles.closingMeta}>
                <span>Bamako · Paris</span>
                <span>Depuis {SITE.foundedYear}</span>
                <span>Trois produits en production</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
