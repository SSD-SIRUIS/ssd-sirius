import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { getProjects, getSettings } from "@/lib/content";
import { MEETING, whatsappLink } from "@/data/site";

export const metadata = {
  title: "Contact",
  description:
    "Parlez-nous de votre projet : rendez-vous en visio, WhatsApp, e-mail ou téléphone. SSD Sirius Solutions Digitales, entre Bamako et Paris.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 300;

function ContactRow({ icon, label, value, href, external }) {
  const content = (
    <>
      <Icon name={icon} />
      <span>
        <span className="mono contact-row__label">{label}</span>
        <span className="contact-row__value">{value}</span>
      </span>
      {href && <Icon name="ArrowUpRight" className="contact-row__go" />}
    </>
  );
  return href ? (
    <a className="contact-row" href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {content}
    </a>
  ) : (
    <div className="contact-row">{content}</div>
  );
}

export default async function ContactPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const { contact } = settings;
  const tel = (n) => `tel:${n.replace(/\s+/g, "")}`;
  const wa = whatsappLink("Bonjour SSD Sirius, je souhaite discuter d’un projet.");

  return (
    <section className="hero">
      <div className="container contact-layout">
        <div>
          <h1 className="title-page">Contact</h1>
          <p className="text-lg" style={{ marginTop: 20 }}>
            <span className="strong">Parlez-nous de votre projet.</span>{" "}
            <span className="soft">
              Pas de dossier à monter : un simple échange en visio suffit. Tout le reste, on s’en
              occupe.
            </span>
          </p>

          <div className="btn-row" style={{ marginTop: 32 }}>
            {MEETING.bookingUrl && (
              <a href={MEETING.bookingUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
                {MEETING.bookingLabel}
                <Icon name="ArrowUpRight" />
              </a>
            )}
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn--secondary">
              Écrire sur WhatsApp
            </a>
          </div>
          {MEETING.bookingUrl && <p className="hero__note">{MEETING.bookingHint}</p>}

          <div className="contact-list">
            <ContactRow icon="Mail" label="E-mail" value={contact.email} href={`mailto:${contact.email}`} />
            <ContactRow icon="Phone" label="Téléphone" value={contact.phone} href={tel(contact.phone)} />
            {contact.phoneAlt && (
              <ContactRow icon="Phone" label="Second numéro" value={contact.phoneAlt} href={tel(contact.phoneAlt)} />
            )}
            <ContactRow icon="MessageCircle" label="WhatsApp" value="Discuter maintenant" href={wa} external />
            <ContactRow
              icon="MapPin"
              label="Localisation"
              value={(contact.cities || [contact.city]).join(" · ")}
            />
          </div>
        </div>

        <div>
          <p className="mono" style={{ marginBottom: 14 }}>
            Ou écrivez-nous
          </p>
          <ContactForm projects={projects} />
        </div>
      </div>
    </section>
  );
}
