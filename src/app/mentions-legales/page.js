import { getSettings } from "@/lib/content";
import { SITE, LEGAL } from "@/data/site";

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité de SSD Sirius Solutions Digitales.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export const revalidate = 300;

export default async function MentionsPage() {
  const { contact } = await getSettings();

  return (
    <section className="hero">
      <div className="container">
        <span className="mono">Conformité</span>
        <h1 className="title-page" style={{ margin: "16px 0 40px" }}>
          Mentions légales
        </h1>

        <div className="prose">
          <h2>Éditeur du site</h2>
          <p>
            Le site est édité par <strong>{LEGAL.entity}</strong>, {LEGAL.form.toLowerCase()}{" "}
            immatriculée au registre du commerce et du crédit mobilier de Bamako le{" "}
            {LEGAL.rccmDate} sous le numéro {LEGAL.rccm}, numéro d&apos;immatriculation national
            (NINA) {LEGAL.nina}. Activité déclarée : {LEGAL.activity}.
          </p>
          <p>
            {LEGAL.entity} exerce sous le nom commercial <strong>{LEGAL.tradeName}</strong>. Siège
            social : {LEGAL.address}.
          </p>
          <p>
            Responsable de l&apos;entreprise et directeur de la publication :{" "}
            {LEGAL.publicationDirector}. Contact : {contact.email} — {contact.phone}.
          </p>

          <h2>Hébergement</h2>
          <p>
            Application déployée sous conteneur Docker sur Google Cloud Run, service de Google
            Cloud Platform — Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Irlande.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de ce site (textes, visuels, logo Sirius, code) est la
            propriété de {LEGAL.entity} ({LEGAL.tradeName}), sauf mention contraire. Toute
            reproduction sans autorisation est interdite. Les produits présentés dans le portfolio
            sont des produits internes de {LEGAL.tradeName}.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations transmises via le formulaire de contact (nom, e-mail, téléphone,
            entreprise, message) sont utilisées uniquement pour traiter votre demande et vous
            recontacter. Elles ne sont ni vendues ni cédées à des tiers.
          </p>
          <p>
            L&apos;acheminement des demandes est assuré par Formspree, qui héberge le message le
            temps de sa transmission par e-mail.
          </p>
          <p>
            Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en
            écrivant à {contact.email}.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires ni de traceurs tiers. Seules des
            mesures techniques strictement nécessaires au fonctionnement peuvent être employées.
          </p>

          <h2>Contact</h2>
          <p>Pour toute question relative à ces mentions : {contact.email}.</p>
        </div>

        <p className="mono" style={{ marginTop: 48 }}>
          Dernière mise à jour : septembre 2026 — {SITE.legalName}
        </p>
      </div>
    </section>
  );
}
