// Informations publiques de repli (utilisées si la table `settings` Supabase est vide
// ou si Supabase n'est pas configuré). Les valeurs d'environnement priment.
//
// TON ÉDITORIAL — règle unique, valable pour tout ce fichier et pour les pages :
// on présente, on ne convainc pas. Pas de promesse, pas de superlatif, pas de
// formule qui cherche l'adhésion (« vous validez, on livre », « aucune zone
// d'ombre », « de très haut niveau »). On énonce ce qui existe et ce qui est fait.

export const SITE = {
  name: "SSD Sirius",
  legalName: "SSD Sirius Solutions Digitales",
  tagline: "Conçu au Mali. Pensé pour l'Afrique.",
  // Périmètre d'intervention, énoncé comme un fait — pas comme un engagement.
  scope:
    "conception, développement, base de données, paiements et publication sur les stores",
  description:
    "SSD Sirius Solutions Digitales conçoit, développe et publie des applications et produits digitaux sur mesure : base de données, paiements Mobile Money, App Store et Play Store.",
  // Domaine public officiel. Surchargeable via NEXT_PUBLIC_SITE_URL au build.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sirius-mali.tech",
  locale: "fr_FR",
  foundedYear: 2024,
};

// Contenu du hero de la page d'accueil.
export const HERO = {
  label: "Agence de développement web & mobile",
  place: "Bamako · Paris",
  lines: ["Sites", "Apps", "Logiciels"], // les points sont ajoutés par la CSS
  lead:
    "SSD Sirius conçoit, développe et met en ligne des produits numériques sur mesure. Trois sont actuellement en production : une marketplace mobile, un studio photo par intelligence artificielle et une plateforme d’emploi.",
};

// Prise de contact. Description du déroulé, sans argumentaire.
export const MEETING = {
  ctaLabel: "Parler de votre projet",
  altLabel: "Nous présenter votre projet",
  short:
    "Présentez-nous votre projet en quelques lignes. Nous revenons vers vous avec un périmètre, un délai et un budget.",
  long: "Présentez-nous votre projet, par écrit ou lors d'un échange en visio : ce que vous souhaitez construire, pour quels usages et dans quel délai. Nous revenons vers vous avec un périmètre, un calendrier et un budget.",
  // Lien de réservation Google Agenda (visio Meet).
  // Tant qu'il est vide, les boutons renvoient vers /contact.
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendar.app.google/fhvf1aoL6gvsn7Kz7",
  bookingLabel: "Choisir un créneau",
  bookingHint: "Le créneau choisi génère automatiquement un lien visio.",
};

// Ce que couvre une intervention. Descriptif, pas d'engagement chiffré.
export const GUARANTEES = [
  {
    icon: "PenTool",
    title: "Développement sur mesure",
    text: "Chaque projet part du métier et des usages visés, pas d'un modèle préexistant.",
  },
  {
    icon: "RefreshCw",
    title: "Itérations courtes",
    text: "Le travail avance par cycles courts, avec des versions démontrables à chaque étape.",
  },
  {
    icon: "Database",
    title: "Base de données et API",
    text: "Modélisation, API, authentification et hébergement font partie du périmètre.",
  },
  {
    icon: "Wallet",
    title: "Paiements Mobile Money",
    text: "Intégration des opérateurs, gestion des callbacks et réconciliation des transactions.",
  },
  {
    icon: "BadgeCheck",
    title: "Publication sur les stores",
    text: "Mise en ligne sur l'App Store et le Google Play Store, builds et mises à jour compris.",
  },
  {
    icon: "LifeBuoy",
    title: "Suivi après mise en ligne",
    text: "Maintenance, corrections et évolutions une fois le produit en production.",
  },
];

export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@sirius-mali.tech",
  // Numéro principal : appels + WhatsApp
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+33 6 98 43 36 02",
  // Second numéro joignable
  phoneAlt: process.env.NEXT_PUBLIC_CONTACT_PHONE_ALT || "+33 7 51 41 90 26",
  // Format international sans « + » ni espaces, pour les liens wa.me
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "33698433602",
  cities: ["Bamako, Mali", "Paris, France"],
  get city() {
    return this.cities.join(" · ");
  },
};

// ------------------------------------------------------------------
// Équipe — affichée sur /a-propos et en version courte sur la home.
// Les photos vivent dans public/equipe/.
// Les deux associés suivent le même cursus : cycle ingénieur à EFREI Paris,
// spécialité cybersécurité, avec un profil d'ingénieur logiciel généraliste
// (back-end, front-end, mobile). Ne pas réduire l'un à la cybersécurité
// et l'autre au développement : le profil est le même, les rôles diffèrent.
// ------------------------------------------------------------------
export const TEAM = [
  {
    name: "Sidi Oumar Gano",
    role: "Cofondateur",
    focus: "Produit & développement",
    school: "EFREI Paris",
    education: "Élève-ingénieur à EFREI Paris — cycle ingénieur, spécialité cybersécurité",
    photo: "/equipe/sidi-oumar-gano.jpg",
    linkedin: "https://www.linkedin.com/in/sidi-gano/",
    bio: "Ingénieur logiciel, spécialisé en cybersécurité. Sur les produits SSD Sirius : conception produit, architecture applicative et développement mobile. Il a mené Flash Market de la base de données à la publication sur les stores.",
  },
  {
    name: "Mohamed Lamine Koné",
    role: "Cofondateur",
    focus: "Ingénierie & plateformes",
    school: "EFREI Paris",
    education: "Élève-ingénieur à EFREI Paris — cycle ingénieur, spécialité cybersécurité",
    photo: "/equipe/mohamed-lamine.jpg",
    linkedin: "https://www.linkedin.com/in/mlkon%C3%A9-3ac5/",
    bio: "Ingénieur logiciel, spécialisé en cybersécurité. Sur les produits SSD Sirius : développement web, back-end et infrastructure. Il construit les plateformes, les API et la chaîne de mise en production.",
  },
];

// ------------------------------------------------------------------
// Informations légales de l'entité qui édite le site.
// Source : certificat d'immatriculation INSTAT / API-Mali du 04/06/2025.
//
// À NOTER : la personne morale s'appelle SHEPHERD. « SSD Sirius Solutions
// Digitales » est le nom commercial sous lequel elle exerce — c'est lui qui
// s'affiche partout sur le site, et c'est normal. Seule la page des mentions
// légales doit nommer l'entité immatriculée.
//
// L'adresse complète du siège figure au certificat : KOKO, rue 268, porte 14.
// Seuls la localité et la commune sont publiés ici : pour une entreprise
// individuelle, le siège est souvent le domicile du dirigeant, et une adresse
// publiée est une adresse indexée. Compléter `address` si la mention complète
// est souhaitée.
// ------------------------------------------------------------------
export const LEGAL = {
  entity: "SHEPHERD",
  tradeName: "SSD Sirius Solutions Digitales",
  form: "Entreprise individuelle",
  manager: "Mohamed Lamine Koné",
  // Le responsable de l'entreprise individuelle est de droit directeur de la publication.
  publicationDirector: "Mohamed Lamine Koné",
  rccm: "MA.BKO.2025.A.5032",
  rccmDate: "2 juin 2025",
  nina: "32509196496135C",
  activity: "Commerce général ; prestation de services",
  address: "Niamakoro, Commune VI, Bamako, Mali",
  country: "Mali",
};

// Réseaux de l'entreprise : les icônes restent masquées tant que ces champs sont vides.
export const SOCIAL = {
  linkedin: "",
  facebook: "",
  instagram: "",
};

// Indicateurs affichés sur la home — uniquement des faits vérifiables,
// jamais un délai ou un pourcentage présenté comme un engagement.
export const STATS = [
  { label: "Produits en production", value: "03" },
  { label: "Plateformes", value: "iOS · Android · Web" },
  { label: "Implantation", value: "Bamako · Paris" },
  { label: "Création", value: "2024" },
];

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
];

export function whatsappLink(message) {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
