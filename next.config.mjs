/** @type {import('next').NextConfig} */
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const nextConfig = {
  // Conteneur reproductible pour Google Cloud Run
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  redirects() {
    // Les anciennes fiches ont été remplacées par les projets sectoriels.
    return [
      "concept-gestion-stocks",
      "concept-suivi-clients-devis",
      "concept-reservation-rendez-vous",
      "concept-support-informatique",
      "concept-automatisation-rapports",
    ].map((slug) => ({
      source: `/realisations/${slug}`,
      destination: "/realisations",
      permanent: true,
    }));
  },
  images: {
    // Supabase Storage + placeholders distants éventuels
    remotePatterns: [
      ...(supabaseHost
        ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
        : []),
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
