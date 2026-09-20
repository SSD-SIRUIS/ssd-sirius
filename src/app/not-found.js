import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "64dvh" }}>
      <div className="container">
        <div className="page-hero__grid">
          <div className="section-head__meta">
            <span className="index">404</span>
            <span className="label">Page introuvable</span>
          </div>

          <div className="section-head__body">
            <h1 className="display" style={{ maxWidth: "14ch" }}>
              Cette page n&apos;existe pas.
            </h1>
            <p className="lead">
              Le lien est peut-être obsolète, ou l&apos;adresse a été mal recopiée. Revenez à
              l&apos;accueil ou parcourez nos réalisations.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
              <Link href="/" className="btn btn--primary">
                Retour à l&apos;accueil
                <Icon name="ArrowUpRight" />
              </Link>
              <Link href="/realisations" className="btn btn--ghost">
                Voir les réalisations
                <Icon name="ArrowUpRight" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
