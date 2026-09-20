import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import TeamGrid from "@/components/TeamGrid";
import { DIFFERENTIATORS } from "@/data/services";
import { SITE, TEAM, STATS } from "@/data/site";

export const metadata = {
  title: "À propos",
  description:
    "Qui est SSD Sirius : deux associés entre Bamako et Paris qui conçoivent, développent et publient des produits numériques sur mesure pour le Mali et l'Afrique francophone.",
  alternates: { canonical: "/a-propos" },
};

export const revalidate = 300;

const VALUES = [
  {
    icon: "PenTool",
    title: "Exécution",
    text: "Le même soin est porté au parcours utilisateur et au déploiement.",
  },
  {
    icon: "ShieldCheck",
    title: "Fiabilité",
    text: "Les règles d'accès sont appliquées en base, les parcours critiques sont testés.",
  },
  {
    icon: "Globe",
    title: "Ancrage local",
    text: "Les produits sont conçus pour les usages du Mali et de l'Afrique francophone.",
  },
  {
    icon: "LifeBuoy",
    title: "Interlocuteur direct",
    text: "L'échange se fait avec les personnes qui conçoivent et développent le produit.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* ------------------------------------------------------ Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <div className="section-head__meta">
              <span className="label">À propos</span>
            </div>
            <div className="section-head__body">
              <h1 className="display" style={{ maxWidth: "16ch" }}>
                Deux associés, entre Bamako et Paris.
              </h1>
              <p className="lead">
                {SITE.legalName} conçoit, développe et publie des applications et des produits
                digitaux sur mesure. Le périmètre couvre {SITE.scope}.
              </p>
            </div>
          </div>

          <div className="proofbar" style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
            {STATS.map((stat) => (
              <div className="proofbar__item" key={stat.label}>
                <strong className="stats__value">{stat.value}</strong>
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Équipe */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">01</span>
              <span className="label">L&apos;équipe</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Qui sommes-nous&nbsp;?</h2>
              <p className="lead">
                Deux associés, ingénieurs logiciels en cycle ingénieur à EFREI Paris,
                spécialité cybersécurité. Ils conçoivent, développent et déploient
                l&apos;ensemble des projets.
              </p>
            </div>
          </div>

          <TeamGrid members={TEAM} />
        </div>
      </section>

      {/* --------------------------------------------- Vision & méthode */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">02</span>
              <span className="label">Notre position</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Vision et approche.</h2>
            </div>
          </div>

          <div className="grid grid-2">
            <Reveal className="card">
              <span className="label">Vision</span>
              <h3 className="h3">Des standards techniques internationaux, des tarifs locaux</h3>
              <p className="muted">
                Les mêmes choix d&apos;architecture, de sécurité et de performance que sur les
                produits internationaux, appliqués aux projets menés ici, avec une
                tarification calibrée sur le marché local.
              </p>
            </Reveal>

            <Reveal className="card" delay={80}>
              <span className="label">Approche</span>
              <h3 className="h3">Partir du besoin réel, avancer par itérations courtes</h3>
              <p className="muted">
                Les parcours sont conçus avant d&apos;être développés, le travail avance par
                cycles courts avec une version démontrable à chaque étape, et le produit
                livré est pilotable par vos équipes. Mobile d&apos;abord, y compris en
                connexion instable.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Valeurs */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">03</span>
              <span className="label">Nos valeurs</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">{SITE.tagline}</h2>
            </div>
          </div>

          <div className="grid grid-4">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 60} className="card">
                <span className="icon-orbit">
                  <Icon name={value.icon} />
                </span>
                <h3 className="h3">{value.title}</h3>
                <p className="muted">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Différence */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div className="section-head__meta">
              <span className="index">04</span>
              <span className="label">Notre approche</span>
            </div>
            <div className="section-head__body">
              <h2 className="h2">Comment nous travaillons.</h2>
            </div>
          </div>

          <div className="proofbar">
            {DIFFERENTIATORS.map((item) => (
              <div className="proofbar__item" key={item.title}>
                <Icon name={item.icon} />
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <Link href="/realisations" className="link-arrow">
              Voir ce que nous avons construit
              <Icon name="ArrowUpRight" />
            </Link>
          </div>
        </div>
      </section>

      <CTA
        label="05 / Contact"
        title="Nous présenter votre projet"
        secondary={{ href: "/services", label: "Voir nos expertises" }}
      />
    </>
  );
}
