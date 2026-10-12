import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import IsoFigure from "@/components/IsoFigure";
import MockShot from "@/components/MockShot";
import ProjectCard from "@/components/ProjectCard";
import { PaymentWindows, ProjectBoard } from "@/components/Mockups";
import { getProjects } from "@/lib/content";
import { FIGURES, GUARANTEES, HERO, MEETING, TECH } from "@/data/site";

export const metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 300;

function FeatureHead({ title, children, link }) {
  return (
    <div className="feature-head">
      <h2 className="title-1">{title}</h2>
      <div>
        <p className="text-lg">{children}</p>
        {link && (
          <Link href={link.href} className="link-more">
            {link.label} <Icon name="ArrowRight" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const projects = await getProjects();
  const flash = projects.find((p) => p.slug === "flash-market");
  const malilink = projects.find((p) => p.slug === "malilink");
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const phones = (flash?.screens || []).slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="hero">
        <div className="container">
          <Link href={HERO.announce.href} className="chip-link">
            <span className="chip-link__tag">{HERO.announce.tag}</span>
            {HERO.announce.label}
            <Icon name="ArrowRight" />
          </Link>
          <h1 className="title-hero">
            <span className="strong">{HERO.strong}</span> <span className="soft">{HERO.soft}</span>
          </h1>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--primary">
              {MEETING.ctaLabel}
              <Icon name="ArrowRight" />
            </Link>
            <Link href="/realisations" className="btn btn--secondary">
              Découvrir nos réalisations
            </Link>
          </div>
          <p className="hero__note">{HERO.note}</p>
        </div>
      </section>

      {/* ------------------------------------------- Méthode + technologies */}
      <section aria-label="Notre méthode">
        <div className="container">
          <div className="figs">
            {FIGURES.map((f) => (
              <figure className="fig" key={f.variant}>
                <figcaption className="mono fig__label">{f.label}</figcaption>
                <IsoFigure variant={f.variant} />
              </figure>
            ))}
          </div>

          <div className="logos" aria-label="Technologies utilisées">
            {TECH.map((t) => (
              <span className="logo-word" key={t}>
                {t}
              </span>
            ))}
          </div>
          <p className="mono logos-caption">Les technologies derrière nos produits</p>
        </div>
      </section>

      {/* -------------------------------------------- Applications mobiles */}
      {flash && (
        <section className="section">
          <div className="container">
            <FeatureHead
              title={
                <>
                  Applications
                  <br />
                  mobiles
                </>
              }
              link={{ href: `/realisations/${flash.slug}`, label: "Découvrir Flash Market" }}
            >
              Des applications iOS et Android complètes, publiées sur les stores. Flash Market,
              notre marketplace mobile, en est la preuve : comptes, messagerie en temps réel,
              espace professionnel et paiement Mobile Money.
            </FeatureHead>
            <Reveal className="feature-visual">
              <div className="showcase showcase--crop fade-b">
                <div className="phones">
                  {phones.map((s, i) => (
                    <MockShot key={i} src={s.url} tone={s.tone} label={s.label} alt={s.label} phone />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ------------------------------------------------ Plateformes web */}
      {malilink && (
        <section className="section section--line">
          <div className="container">
            <FeatureHead
              title={
                <>
                  Plateformes
                  <br />
                  web
                </>
              }
              link={{ href: `/realisations/${malilink.slug}`, label: "Découvrir MaliLink" }}
            >
              Des plateformes rapides et solides, pensées pour les usages réels. MaliLink relie
              les talents maliens — et la diaspora — aux recruteurs : inscription par téléphone,
              coffre-fort de documents, employeurs vérifiés.
            </FeatureHead>
            <Reveal className="feature-visual">
              <div className="showcase showcase--pad showcase--float">
                <MockShot src={malilink.cover_url} label="Accueil de MaliLink" alt="Page d’accueil de MaliLink" />
                <div className="float-card" aria-hidden="true">
                  <div className="float-card__title">
                    <Icon name="Lock" /> Candidature prête en un clic
                  </div>
                  <div className="float-card__rows">
                    <div className="float-card__row">
                      <Icon name="Check" /> CV — depuis le coffre-fort
                    </div>
                    <div className="float-card__row">
                      <Icon name="Check" /> Diplômes — depuis le coffre-fort
                    </div>
                    <div className="float-card__row">
                      <Icon name="Check" /> Employeur vérifié par NIF et RCCM
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ------------------------------------------ Paiement Mobile Money */}
      <section className="section section--line">
        <div className="container">
          <FeatureHead
            title={
              <>
                Paiements
                <br />
                Mobile Money
              </>
            }
            link={{ href: "/services#mobile-money", label: "Notre expertise paiement" }}
          >
            Le paiement mobile au cœur de vos produits : agrégateur, choix du pays et de
            l’opérateur, confirmation et suivi de chaque transaction — jusqu’à la validation.
          </FeatureHead>
          <Reveal className="feature-visual">
            <div className="fade-x">
              <PaymentWindows />
            </div>
            <p className="mono visual-caption">Parcours réel de Flash Market, reproduit en maquette</p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ Suivi de projet */}
      <section className="section section--line">
        <div className="container">
          <FeatureHead
            title={
              <>
                Un suivi à
                <br />
                chaque étape
              </>
            }
            link={{ href: "#engagements", label: "Nos engagements" }}
          >
            Des premiers résultats dès la première semaine, un point d’avancement journalier ou
            hebdomadaire, et un échange direct avec l’équipe qui construit votre produit.
          </FeatureHead>
          <Reveal className="feature-visual">
            <ProjectBoard />
            <p className="mono visual-caption">Exemple de suivi — illustration</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- Engagements */}
      <section className="section section--line" id="engagements">
        <div className="container">
          <div className="section-head">
            <h2 className="title-1">
              <span className="strong">Ce que Sirius garantit.</span>{" "}
              <span className="soft">Vous validez, on s’occupe de tout le reste.</span>
            </h2>
          </div>
          <div className="cells">
            {GUARANTEES.map((g, i) => (
              <div className="cell" key={g.title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={g.icon} className="cell__icon" />
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Réalisations */}
      <section className="section section--line">
        <div className="container">
          <div className="feature-head">
            <h2 className="title-1">Réalisations</h2>
            <div>
              <p className="text-lg">
                Des produits conçus, développés et mis en ligne par l’équipe Sirius.
              </p>
              <Link href="/realisations" className="link-more">
                Toutes les réalisations <Icon name="ArrowRight" />
              </Link>
            </div>
          </div>
          <div className="stories">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
            <article className="story">
              <Link href="/contact" className="story__media story__media--empty" aria-label="Parlez-nous de votre projet">
                <span className="story__word">Votre projet</span>
              </Link>
              <p className="mono story__meta">Prochaine réalisation</p>
              <h3 className="story__title">
                <Link href="/contact">Une application en ligne dans un mois — la vôtre ?</Link>
              </h3>
              <Link href="/contact" className="link-more">
                {MEETING.ctaLabel} <Icon name="ArrowRight" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
