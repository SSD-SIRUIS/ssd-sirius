import { getSettings } from "@/lib/content";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité de SSD Sirius Solutions Digitales.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export const revalidate = 300;

export default async function MentionsPage() {
  const { contact, company } = await getSettings();

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
            {company.name}. Adresse : {contact.city}. Contact : {contact.email} — {contact.phone}.
          </p>
          <p>
            <em>
              Informations à compléter : forme juridique, numéro d'immatriculation, capital,
              directeur de la publication.
            </em>
          </p>

          <h2>Hébergement</h2>
          <p>
            Application déployée sous conteneur Docker sur Google Cloud Run (Google Cloud Platform).
            Données applicatives gérées via Supabase.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site (textes, visuels, logo Sirius, code) est la propriété
            de {company.name}, sauf mention contraire. Toute reproduction sans autorisation est
            interdite. Les projets présentés dans le portfolio restent la propriété de leurs
            commanditaires respectifs et sont publiés avec leur accord.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations transmises via le formulaire de contact (nom, e-mail, téléphone,
            entreprise, message) sont utilisées uniquement pour traiter votre demande et vous
            recontacter. Elles ne sont ni vendues ni cédées à des tiers.
          </p>
          <p>
            Vous pouvez demander l'accès, la rectification ou la suppression de vos données en
            écrivant à {contact.email}.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site n'utilise pas de cookies publicitaires ni de traceurs tiers. Seules des mesures
            techniques strictement nécessaires au fonctionnement peuvent être employées.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à ces mentions : {contact.email}.
          </p>
        </div>

        <p className="mono" style={{ marginTop: 48 }}>
          Dernière mise à jour : à compléter — {SITE.legalName}.
        </p>
      </div>
    </section>
  );
}
