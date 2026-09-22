import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { getProjects, getSettings } from "@/lib/content";
import { whatsappLink, MEETING } from "@/data/site";

export const metadata = {
  title: "Contact",
  description:
    "Contactez SSD Sirius Solutions Digitales : formulaire, e-mail, téléphone et WhatsApp. Entre Bamako et Paris, nous accompagnons vos projets digitaux.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 300;

export default async function ContactPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const { contact } = settings;
  const tel = contact.phone.replace(/\s+/g, "");

  return (
    <>
      {/* ------------------------------------------------------ Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <div className="section-head__meta">
              <span className="label">Contact</span>
            </div>
            <div className="section-head__body">
              <h1 className="display" style={{ maxWidth: "14ch" }}>
                Parlons de votre projet.
              </h1>
              <p className="lead">{MEETING.long}</p>

              {MEETING.bookingUrl && (
                <div className="hero__cta">
                  <a
                    href={MEETING.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--primary"
                  >
                    {MEETING.bookingLabel}
                    <Icon name="ArrowUpRight" />
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={whatsappLink("Bonjour SSD Sirius, je souhaite discuter d'un projet.")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Écrire sur WhatsApp
                    <Icon name="MessageCircle" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------- Formulaire & coordonnées */}
      <section className="section section--tight">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div
                style={{
                  borderTop: "1px solid var(--ink)",
                  paddingTop: 20,
                  marginBottom: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span className="label">01 / Votre message</span>
                <h2 className="h3">Décrivez votre besoin en quelques lignes</h2>
              </div>
              <ContactForm projects={projects} />
            </div>

            <div>
              <div
                style={{
                  borderTop: "1px solid var(--ink)",
                  paddingTop: 20,
                  marginBottom: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span className="label">02 / Nous joindre directement</span>
                <h2 className="h3">Coordonnées</h2>
              </div>

              <div className="contact-cards">
                {MEETING.bookingUrl && (
                  <a
                    className="booking-card"
                    href={MEETING.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon-orbit">
                      <Icon name="CalendarClock" />
                    </span>
                    <div>
                      <h3 className="h3">Réserver un échange</h3>
                      <p className="muted" style={{ fontSize: "0.9375rem" }}>
                        {MEETING.bookingHint}
                      </p>
                      <span className="link-arrow">
                        {MEETING.bookingLabel}
                        <Icon name="ArrowUpRight" />
                      </span>
                    </div>
                  </a>
                )}

                <a className="contact-line" href={`mailto:${contact.email}`}>
                  <Icon name="Mail" />
                  <div>
                    <span>E-mail</span>
                    {contact.email}
                  </div>
                </a>

                <a className="contact-line" href={`tel:${tel}`}>
                  <Icon name="Phone" />
                  <div>
                    <span>Téléphone</span>
                    {contact.phone}
                  </div>
                </a>

                {contact.phoneAlt && (
                  <a
                    className="contact-line"
                    href={`tel:${contact.phoneAlt.replace(/\s+/g, "")}`}
                  >
                    <Icon name="Phone" />
                    <div>
                      <span>Second numéro</span>
                      {contact.phoneAlt}
                    </div>
                  </a>
                )}

                <a
                  className="contact-line"
                  href={whatsappLink("Bonjour SSD Sirius, je souhaite discuter d'un projet.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="MessageCircle" />
                  <div>
                    <span>WhatsApp</span>
                    Discuter maintenant
                  </div>
                </a>

                <div className="contact-line">
                  <Icon name="MapPin" />
                  <div>
                    <span>Localisation</span>
                    {(contact.cities || [contact.city]).join(" · ")}
                  </div>
                </div>
              </div>

              <div className="mm-callout" style={{ marginTop: 28 }}>
                <p className="muted" style={{ fontSize: "0.9375rem" }}>
                  Basés entre Bamako et Paris, nous concevons, développons et publions des
                  applications et produits digitaux sur mesure pour le Mali et l&apos;Afrique
                  francophone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
