import Link from "next/link";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";
import { SERVICES, PROCESS, VALUE_PROPOSITION } from "@/data/services";
import { MEETING } from "@/data/site";

export const metadata = {
  title: "Services",
  description:
    "E-commerce, paiement Mobile Money, applications web et mobiles, API et systèmes : les expertises de SSD Sirius, à un tarif accessible et avec une exécution de très haut niveau.",
  alternates: { canonical: "/services" },
};

export const revalidate = 300;

export default function ServicesPage() {
  return (
    <>
      {/* ------------------------------------------------------------ En-tête */}
      <section className="hero">
        <div className="container">
          <h1 className="title-page">Services</h1>
          <p className="text-lg" style={{ marginTop: 20, maxWidth: 680 }}>
            <span className="strong">Ce que nous savons construire.</span>{" "}
            <span className="soft">
              Du cadrage à la mise en ligne, des produits fiables, pensés pour le marché malien et
              prêts à évoluer.
            </span>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- Expertises */}
      <section>
        <div className="container">
          {SERVICES.map((s, i) => (
            <div className="service-row" id={s.slug} key={s.slug}>
              <div className="service-row__title">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="title-2">{s.title}</h2>
                <p className="muted">{s.excerpt}</p>
              </div>
              <div className="service-row__body">
                <p>{s.description}</p>
                <ul className="checklist">
                  {s.points.map((p) => (
                    <li key={p}>
                      <Icon name="Check" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="btn-row" style={{ gap: 24 }}>
                  <Link href="/contact" className="link-more">
                    {MEETING.ctaLabel} <Icon name="ArrowRight" />
                  </Link>
                  {s.proof && (
                    <Link href={s.proof.href} className="link-more">
                      {s.proof.label} <Icon name="ArrowRight" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- Prix & exécution */}
      <section className="section" id="tarifs">
        <div className="container">
          <div className="section-head">
            <span className="mono">{VALUE_PROPOSITION.eyebrow}</span>
            <h2 className="title-1">
              <span className="strong">Un tarif accessible.</span>{" "}
              <span className="soft">Une exécution de très haut niveau.</span>
            </h2>
            <p className="text-md">{VALUE_PROPOSITION.intro}</p>
          </div>

          <div className="cells cells--2">
            {VALUE_PROPOSITION.columns.map((c) => (
              <div className="cell" key={c.title}>
                <Icon name={c.icon} className="cell__icon" />
                <h3 style={{ fontSize: 20 }}>{c.title}</h3>
                <p>{c.text}</p>
                <ul className="checklist">
                  {c.points.map((p) => (
                    <li key={p}>
                      <Icon name="Check" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Méthode */}
      <section className="section section--line">
        <div className="container">
          <div className="section-head">
            <h2 className="title-1">
              <span className="strong">Une méthode simple.</span>{" "}
              <span className="soft">Des résultats visibles dès la première semaine.</span>
            </h2>
          </div>
          <div className="cells cells--4">
            {PROCESS.map((p) => (
              <div className="cell" key={p.step}>
                <span className="mono">{p.step}</span>
                <h3 style={{ marginTop: 18 }}>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Parlons de votre projet." />
    </>
  );
}
