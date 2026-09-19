import Link from "next/link";
import SiriusMark from "@/components/SiriusMark";
import { getProjects, getSettings } from "@/lib/content";
import { MEETING, SITE, whatsappLink } from "@/data/site";

export default async function Footer() {
  const [{ contact, social, company }, projects] = await Promise.all([getSettings(), getProjects()]);
  const year = new Date().getFullYear();
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const socials = [
    ["LinkedIn", social.linkedin],
    ["Facebook", social.facebook],
    ["Instagram", social.instagram],
  ].filter(([, url]) => url);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="footer-col footer-col--brand">
            <Link href="/" className="brand" aria-label="SSD Sirius — accueil">
              <SiriusMark size={20} />
              <span className="brand__name">Sirius</span>
            </Link>
            <p>{SITE.description}</p>
            <p className="mono" style={{ marginTop: 18 }}>
              {(contact.cities || [contact.city]).join(" · ")}
            </p>
          </div>

          <div className="footer-col">
            <h4>Agence</h4>
            <Link href="/services">Services</Link>
            <Link href="/realisations">Réalisations</Link>
            <Link href="/a-propos">À propos</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Réalisations</h4>
            {featured.map((p) => (
              <Link key={p.slug} href={`/realisations/${p.slug}`}>
                {p.title}
              </Link>
            ))}
            <Link href="/realisations">Tout voir</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
            <a href={whatsappLink("Bonjour SSD Sirius,")} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            {MEETING.bookingUrl && (
              <a href={MEETING.bookingUrl} target="_blank" rel="noreferrer">
                Prendre rendez-vous
              </a>
            )}
            {socials.map(([label, url]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {company.name}
          </span>
          <span>
            <Link href="/mentions-legales">Mentions légales</Link>
            {"  ·  "}
            {company.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
