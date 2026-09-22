import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { SERVICES, PROCESS, VALUE_PROPOSITION } from "@/data/services";
import { MEETING } from "@/data/site";

export const metadata = {
  title: "Services & expertises",
  description:
    "E-commerce, Mobile Money, Web & Mobile, API & Systèmes : les expertises de SSD Sirius pour concevoir des produits digitaux sur mesure au Mali.",
  alternates: { canonical: "/services" },
};

export const revalidate = 300;

export default function ServicesPage() {
  return (
    <>
      {/* ------------------------------------------------------ Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <div className="section-head__meta">
              <span className="label">Nos expertises</span>
            </div>
            <div className="section-head__body">
              <h1 className="display" style={{ maxWidth: "15ch" }}>
                Ce que nous savons construire.
              </h1>
              <p className="lead">
                Quatre domaines d&apos;intervention, du cadrage au déploiement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Expertises */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">01</span>
              <span className="label">Domaines</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Quatre domaines d&apos;intervention.</h2>
            </div>
          </div>

          {SERVICES.map((service, i) => (
            <Reveal
              key={service.slug}
              id={service.slug}
              className="section-head"
              style={{
                scrollMarginTop: 100,
                marginBottom: i === SERVICES.length - 1 ? 0 : "clamp(40px, 5vw, 72px)",
              }}
            >
              <div className="section-head__meta">
                <span className="index index--sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="icon-orbit">
                  <Icon name={service.icon} />
                </span>
              </div>

              <div className="section-head__body">
                <h3 className="h2" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
                  {service.title}
                </h3>
                <p className="muted" style={{ maxWidth: "60ch" }}>
                  {service.description}
                </p>

                <ul className="feature-list">
                  {service.points.map((point) => (
                    <li key={point}>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 4 }}>
                  <Link href="/contact" className="link-arrow">
                    {MEETING.ctaLabel}
                    <Icon name="ArrowUpRight" />
                  </Link>
                  {service.proof && (
                    <Link href={service.proof.href} className="link-arrow">
                      {service.proof.label}
                      <Icon name="ArrowUpRight" />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------- Prix & exécution */}
      <section className="section section--tight" id="tarifs">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">02</span>
              <span className="label">{VALUE_PROPOSITION.eyebrow}</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">{VALUE_PROPOSITION.title}</h2>
              <p className="lead">{VALUE_PROPOSITION.intro}</p>
            </div>
          </div>

          <div className="grid grid-2">
            {VALUE_PROPOSITION.columns.map((column, i) => (
              <Reveal key={column.title} delay={i * 80} className="card">
                <span className="icon-orbit">
                  <Icon name={column.icon} />
                </span>
                <h3 className="h3">{column.title}</h3>
                <p className="muted">{column.text}</p>
                <ul className="feature-list">
                  {column.points.map((point) => (
                    <li key={point}>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Méthode */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">03</span>
              <span className="label">Notre approche</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Le déroulé d&apos;un projet.</h2>
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

      <CTA
        label="04 / Contact"
        title="Parlons-en de vive voix."
        text={MEETING.short}
        primary={{ href: "/contact", label: MEETING.ctaLabel }}
        secondary={{ href: "/realisations", label: "Voir les réalisations" }}
      />
    </>
  );
}
