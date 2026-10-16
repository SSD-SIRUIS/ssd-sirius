import Icon from "@/components/Icon";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Garanties techniques",
  description:
    "Disponibilité, cybersécurité, sauvegardes, supervision et continuité : les garanties techniques prévues par SSD Sirius pour vos produits numériques.",
  alternates: { canonical: "/garanties" },
};

export const revalidate = 300;

const GUARANTEES = [
  {
    icon: "Server",
    title: "Disponibilité H24/7",
    text: "Les produits destinés au public sont conçus pour rester accessibles en continu, avec une infrastructure cloud adaptée à la charge et aux usages réels.",
  },
  {
    icon: "ShieldCheck",
    title: "Cybersécurité par conception",
    text: "La sécurité est prise en compte dès l’architecture : accès contrôlés, secrets côté serveur, échanges chiffrés et séparation des données sensibles.",
  },
  {
    icon: "Database",
    title: "Données sauvegardées",
    text: "Les données critiques font l’objet d’une stratégie de sauvegarde et de restauration définie selon le niveau de sensibilité du produit.",
  },
  {
    icon: "BarChart3",
    title: "Supervision et alertes",
    text: "Les erreurs, performances et événements importants sont suivis pour détecter rapidement une anomalie et agir avant qu’elle ne devienne bloquante.",
  },
  {
    icon: "RefreshCw",
    title: "Maintenance continue",
    text: "Correctifs, dépendances, mises à jour de sécurité et évolutions sont planifiés pour garder un produit stable dans le temps.",
  },
  {
    icon: "Lock",
    title: "Accès et permissions",
    text: "Chaque rôle dispose uniquement des droits nécessaires. Les environnements, comptes administrateurs et données privées sont isolés.",
  },
  {
    icon: "Workflow",
    title: "Déploiements maîtrisés",
    text: "Les changements passent par des environnements et des vérifications avant mise en ligne, avec possibilité de revenir à une version stable.",
  },
  {
    icon: "LifeBuoy",
    title: "Réponse aux incidents",
    text: "En cas d’incident, nous identifions la cause, rétablissons le service, documentons l’événement et définissons les actions préventives.",
  },
];

const FOUNDATION = [
  "Architecture et hébergement adaptés au niveau de criticité du produit",
  "Authentification, gestion des rôles et protection des routes sensibles",
  "Validation des entrées, gestion des erreurs et limitation des abus",
  "Journalisation utile au diagnostic sans exposer les données privées",
  "Sauvegardes, restauration et procédure de reprise définies avec le client",
  "Mises à jour de sécurité et maintenance prévues après la mise en ligne",
];

const CONTRACT = [
  "Objectif de disponibilité et périmètre des services concernés",
  "Horaires de support, astreinte éventuelle et canal d’escalade",
  "Délais cibles de prise en compte, rétablissement et communication",
  "RPO/RTO, durée de conservation et fréquence des sauvegardes",
  "Niveaux d’accès, responsabilités du client et exigences réglementaires",
];

export default function GarantiesPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="mono">Fiabilité · sécurité · continuité</span>
          <h1 className="title-page" style={{ marginTop: 18 }}>
            Des produits qui restent fiables après leur mise en ligne.
          </h1>
          <p className="text-lg" style={{ marginTop: 24, maxWidth: 780 }}>
            <span className="strong">La disponibilité et la sécurité font partie du produit.</span>{" "}
            <span className="soft">
              Nous préparons le socle technique, les contrôles et les procédures nécessaires pour
              exploiter une application ou une plateforme dans la durée.
            </span>
          </p>
        </div>
      </section>

      <section className="section section--line">
        <div className="container">
          <div className="feature-head">
            <h2 className="title-1">Notre socle de garanties.</h2>
            <p className="text-lg">
              Un produit sérieux doit fonctionner quand vos utilisateurs en ont besoin, protéger
              leurs données et pouvoir évoluer sans fragiliser ce qui existe déjà.
            </p>
          </div>

          <div className="cells cells--4" style={{ marginTop: "clamp(48px, 7vw, 88px)" }}>
            {GUARANTEES.map((item) => (
              <div className="cell" key={item.title}>
                <Icon name={item.icon} className="cell__icon" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="container">
          <div className="section-head">
            <span className="mono">Ce qui est prévu</span>
            <h2 className="title-1">
              <span className="strong">Un socle concret.</span>{" "}
              <span className="soft">Pas une promesse vague.</span>
            </h2>
            <p className="text-md">
              Chaque projet reçoit une base de sécurité et d’exploitation proportionnée à ses
              enjeux, puis les niveaux de service sont documentés avec le client.
            </p>
          </div>

          <div className="cells cells--2">
            <div className="cell">
              <Icon name="CheckCircle2" className="cell__icon" />
              <h3>Socle technique Sirius</h3>
              <ul className="checklist">
                {FOUNDATION.map((item) => (
                  <li key={item}>
                    <Icon name="Check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cell">
              <Icon name="FileText" className="cell__icon" />
              <h3>Engagements cadrés avec vous</h3>
              <ul className="checklist">
                {CONTRACT.map((item) => (
                  <li key={item}>
                    <Icon name="Check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="muted" style={{ maxWidth: 820, marginTop: 28 }}>
            La disponibilité H24/7 est un objectif d’exploitation pour les services qui le
            nécessitent. Le SLA, les délais d’intervention et les responsabilités de chaque partie
            sont précisés projet par projet, selon l’infrastructure et le niveau de support retenus.
          </p>
        </div>
      </section>

      <section className="section section--line">
        <div className="container">
          <div className="feature-head" style={{ alignItems: "center" }}>
            <div>
              <span className="mono">Une exigence partagée</span>
              <h2 className="title-1" style={{ marginTop: 16 }}>
                La garantie commence par la clarté.
              </h2>
            </div>
            <p className="text-lg">
              Nous expliquons les choix techniques, les limites et les responsabilités avant la
              mise en ligne. Vous savez ce qui est surveillé, ce qui est sauvegardé, qui intervient
              et comment le service est rétabli.
            </p>
          </div>
        </div>
      </section>

      <CTA
        title="Besoin d’un produit fiable ?"
        text="Parlons disponibilité, sécurité et niveau de service dès le cadrage."
      />
    </>
  );
}
