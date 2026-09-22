import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/ThemeToggle";
import { SITE, CONTACT } from "@/data/site";

// Une seule famille pour tout le site : titres, texte, étiquettes, chiffres.
// Inter en version variable — le système s'appuie sur des graisses
// intermédiaires (450, 500, 560) que seule une fonte variable rend possibles.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
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
    "développement application Mali",
    "e-commerce Mobile Money Mali",
    "solutions digitales Mali",
    "création site web Bamako",
  ],
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
  robots: { index: true, follow: true },
};

export const viewport = {
  // Le site est sombre par défaut : la barre du navigateur suit.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    areaServed: "ML",
    slogan: SITE.tagline,
    foundingDate: String(SITE.foundedYear),
  };

  return (
    <html lang="fr" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
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
