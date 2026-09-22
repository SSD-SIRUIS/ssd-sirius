import Link from "next/link";
import Icon from "@/components/Icon";
import SiriusMark from "@/components/SiriusMark";
import { getSettings } from "@/lib/content";
import { SITE, whatsappLink } from "@/data/site";

export default async function Footer() {
  const { contact, social, company } = await getSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="footer-col footer-col--brand">
            <Link href="/" className="brand" aria-label="SSD Sirius — accueil">
              <SiriusMark size={34} />
              <span className="brand__text">
                <span className="brand__name">Sirius</span>
                <span className="brand__sub">Solutions Digitales</span>
              </span>
            </Link>
            <p className="muted" style={{ marginTop: 18, maxWidth: "34ch" }}>
              {SITE.description}
            </p>
            {(social.linkedin || social.facebook || social.instagram) && (
              <div className="footer-social">
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Icon name="Linkedin" />
                  </a>
                )}
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                    <Icon name="Facebook" />
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                    <Icon name="Instagram" />
                  </a>
                )}
                <a href={`mailto:${contact.email}`} aria-label="E-mail">
                  <Icon name="Mail" />
                </a>
              </div>
            )}
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <Link href="/">Accueil</Link>
            <Link href="/services">Services</Link>
            <Link href="/realisations">Réalisations</Link>
            <Link href="/a-propos">À propos</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/mentions-legales">Mentions légales</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>
              <Icon name="MapPin" />
              {contact.city}
            </p>
            <a href={`mailto:${contact.email}`}>
              <Icon name="Mail" />
              {contact.email}
            </a>
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
              <Icon name="Phone" />
              {contact.phone}
            </a>
            <a href={whatsappLink("Bonjour SSD Sirius,")} target="_blank" rel="noreferrer">
              <Icon name="MessageCircle" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {company.name}. Tous droits réservés.
          </span>
          <span>{company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
