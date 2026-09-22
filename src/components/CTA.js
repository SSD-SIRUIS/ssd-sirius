import Link from "next/link";
import Icon from "@/components/Icon";
import { MEETING } from "@/data/site";

// Bloc de conversion réutilisable en fin de page.
// Composition alignée au filet, jamais centrée : même grammaire que la home.
export default function CTA({
  label = "Contact",
  title = "Nous présenter votre projet",
  text = MEETING.short,
  primary = { href: "/contact", label: MEETING.ctaLabel },
  secondary = { href: "/realisations", label: "Voir les réalisations" },
}) {
  return (
    <section className="section section--tight section--invert">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <div className="section-head__meta">
            <span className="label">{label}</span>
          </div>

          <div className="section-head__body">
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              {title}
            </h2>
            <p className="lead">{text}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
              <Link href={primary.href} className="btn btn--primary">
                {primary.label}
                <Icon name="ArrowUpRight" />
              </Link>
              {secondary && (
                <Link href={secondary.href} className="btn btn--ghost">
                  {secondary.label}
                  <Icon name="ArrowUpRight" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
