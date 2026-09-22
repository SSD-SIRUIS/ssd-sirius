import Link from "next/link";
import Icon from "@/components/Icon";
import { MEETING } from "@/data/site";

// Appel à l'action de fin de page : titre en deux tons, puis deux boutons.
// Pas de devis ni d'estimation : on propose simplement d'en parler.
export default function CTA({
  title = "Parlez-nous de votre projet.",
  text = "Tout le reste, on s’en occupe — conception, développement, paiements et publication sur les stores.",
  primary = { href: "/contact", label: MEETING.ctaLabel },
  secondary = MEETING.bookingUrl
    ? { href: MEETING.bookingUrl, label: MEETING.bookingLabel, external: true }
    : { href: "/realisations", label: "Voir nos réalisations" },
}) {
  return (
    <section className="cta-final">
      <div className="container">
        <h2 className="title-1" style={{ maxWidth: 900 }}>
          <span className="strong">{title}</span> <span className="soft">{text}</span>
        </h2>
        <div className="btn-row">
          <Link href={primary.href} className="btn btn--primary">
            {primary.label}
            <Icon name="ArrowRight" />
          </Link>
          {secondary &&
            (secondary.external ? (
              <a href={secondary.href} target="_blank" rel="noreferrer" className="btn btn--secondary">
                {secondary.label}
                <Icon name="ArrowUpRight" />
              </a>
            ) : (
              <Link href={secondary.href} className="btn btn--secondary">
                {secondary.label}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
