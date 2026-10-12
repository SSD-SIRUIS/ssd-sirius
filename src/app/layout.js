import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/ThemeToggle";
import { SITE, CONTACT, SOCIAL } from "@/data/site";

// Inter : la typographie de référence de l esthétique retenue.
// Police variable : toutes les graisses intermédiaires (510, 590…) sont disponibles.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Chasse fixe pour les étiquettes techniques (FIG 0.1, identifiants, légendes).
const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.legalName} — Solutions digitales sur mesure au Mali`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "agence digitale Mali",
    "développement application mobile Mali",
    "création application Bamako",
    "création site web Bamako",
    "intégration Mobile Money",
    "paiement Orange Money application",
    "développeur React Native Mali",
    "solutions digitales Mali",
  ],
  applicationName: SITE.legalName,
  category: "technology",
  formatDetection: { telephone: false },
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.legalName,
    title: `${SITE.legalName} — Solutions digitales sur mesure`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.legalName,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  // Données structurées : l'organisation et le site, reliés par leur @id.
  const sameAs = Object.values(SOCIAL).filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.svg`,
        description: SITE.description,
        slogan: SITE.tagline,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: { "@type": "PostalAddress", addressLocality: "Bamako", addressCountry: "ML" },
        areaServed: ["ML", "CI", "SN", "FR"],
        knowsAbout: [
          "Développement d'applications mobiles",
          "Développement web",
          "Intégration Mobile Money",
          "Intelligence artificielle",
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.legalName,
        inLanguage: "fr",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${mono.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Applique le thème mémorisé avant le premier rendu (évite le flash) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="app-shell">
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
