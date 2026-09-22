import Link from "next/link";
import Icon from "@/components/Icon";
import IsoFigure from "@/components/IsoFigure";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="container">
        <figure className="fig" style={{ minHeight: 260, maxWidth: 360, padding: "40px 0 24px" }}>
          <figcaption className="mono fig__label" style={{ left: 0 }}>Erreur 404</figcaption>
          <IsoFigure variant="modules" />
        </figure>
        <h1 className="title-page" style={{ marginTop: 24 }}>Page introuvable</h1>
        <p className="text-lg" style={{ marginTop: 20, maxWidth: 560 }}>
          <span className="soft">Cette page n’existe pas, ou elle a été déplacée.</span>
        </p>
        <div className="btn-row" style={{ marginTop: 32 }}>
          <Link href="/" className="btn btn--primary">
            Retour à l’accueil
            <Icon name="ArrowRight" />
          </Link>
          <Link href="/realisations" className="btn btn--secondary">
            Voir les réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
