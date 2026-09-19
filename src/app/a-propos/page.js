import Icon from "@/components/Icon";
import CTA from "@/components/CTA";
import IsoFigure from "@/components/IsoFigure";
import { DIFFERENTIATORS } from "@/data/services";
import { SITE } from "@/data/site";

export const metadata = {
  title: "À propos",
  description:
    "SSD Sirius Solutions Digitales : structure technologique basée entre Bamako et Paris, qui conçoit, développe et publie des applications et produits digitaux sur mesure.",
  alternates: { canonical: "/a-propos" },
};

export const revalidate = 300;

const VALUES = [
  { icon: "PenTool", title: "Exigence", text: "Nous soignons l’exécution, du parcours utilisateur jusqu’au déploiement." },
  { icon: "ShieldCheck", title: "Fiabilité", text: "Des solutions sécurisées, testées et pensées pour durer." },
  { icon: "Globe", title: "Ancrage local", text: "Nous concevons pour les usages réels du Mali et de l’Afrique francophone." },
  { icon: "LifeBuoy", title: "Proximité", text: "Un interlocuteur disponible et un accompagnement dans la durée." },
];

export default function AProposPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="title-page">À propos</h1>
          <p className="title-hero" style={{ marginTop: 32 }}>
            <span className="strong">Une structure technologique, entre Bamako et Paris.</span>{" "}
            <span className="soft">
              Nous transformons une idée métier en produit digital fiable, moderne et évolutif —
              puis nous le mettons en ligne.
            </span>
          </p>
        </div>
      </section>

      <section className="section section--line">
        <div className="container">
          <div className="feature-head">
            <h2 className="title-1">Notre vision</h2>
            <p className="text-lg">
              Le numérique doit être un levier concret de croissance pour les entreprises
              africaines, pas une couche de complexité. Les standards des meilleurs produits
              internationaux ont leur place ici, à un prix pensé pour le marché local.
            </p>
          </div>
          <div className="feature-head" style={{ marginTop: "clamp(56px, 8vw, 96px)" }}>
            <h2 className="title-1">Notre approche</h2>
            <p className="text-lg">
              Nous partons du besoin réel, concevons des parcours simples, développons par
              itérations courtes et livrons des produits que vos équipes pilotent en autonomie.
              Mobile d’abord, performance et sécurité à chaque étape.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="container">
          <div className="section-head">
            <h2 className="title-1">
              <span className="strong">Nos valeurs.</span>{" "}
              <span className="soft">Ce qui guide chaque ligne de code.</span>
            </h2>
          </div>
          <div className="cells cells--4">
            {VALUES.map((v) => (
              <div className="cell" key={v.title}>
                <Icon name={v.icon} className="cell__icon" />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="container">
          <div className="feature-head" style={{ alignItems: "center" }}>
            <div>
              <h2 className="title-1">{SITE.tagline}</h2>
              <ul className="checklist" style={{ marginTop: 32 }}>
                {DIFFERENTIATORS.map((d) => (
                  <li key={d.title}>
                    <Icon name="Check" />
                    <span>
                      <span className="strong">{d.title}.</span>{" "}
                      <span className="muted">{d.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="fig" style={{ minHeight: 320 }}>
              <figcaption className="mono fig__label">FIG 1.0 — Sirius</figcaption>
              <IsoFigure variant="layers" />
            </figure>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
