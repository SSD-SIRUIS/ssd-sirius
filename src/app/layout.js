import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/ThemeToggle";
import { SITE } from "@/data/site";

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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    areaServed: "ML",
    slogan: SITE.tagline,
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
