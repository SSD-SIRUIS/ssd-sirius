// Expertises SSD Sirius — section /services et bloc home.
// `icon` correspond à un nom d'icône lucide-react.
//
// TON : descriptif, jamais promotionnel. On décrit ce qui est fait et
// comment, sans superlatif ni engagement de délai.

export const SERVICES = [
  {
    slug: "e-commerce",
    icon: "ShoppingCart",
    title: "E-commerce",
    excerpt:
      "Plateformes e-commerce avec paiements intégrés et administration autonome.",
    description:
      "Boutiques en ligne conçues pour le marché africain : catalogue, panier, tunnel de commande et paiement. L'administration se fait sans écrire de code.",
    points: [
      "Catalogue, panier et tunnel de commande optimisés mobile",
      "Paiement carte et Mobile Money",
      "Back-office produits, stocks et commandes",
      "Suivi des ventes et exports",
    ],
  },
  {
    slug: "mobile-money",
    icon: "Wallet",
    title: "Mobile Money",
    excerpt:
      "Intégration des solutions de paiement mobile et des services financiers associés.",
    description:
      "Intégration des principaux services de paiement mobile de la région : initiation de transaction, callbacks, réconciliation et journalisation. Le parcours de paiement reste fonctionnel en connexion instable.",
    points: [
      "Intégration API des opérateurs Mobile Money",
      "Gestion des callbacks et des états de transaction",
      "Réconciliation et tableau de bord des encaissements",
      "Sécurité, journalisation et alertes",
    ],
  },
  {
    slug: "web-mobile",
    icon: "Smartphone",
    title: "Web & Mobile",
    excerpt:
      "Applications iOS et Android sur mesure, développées, hébergées et publiées sur les stores.",
    description:
      "Développement d'applications de bout en bout : conception des parcours, développement iOS et Android, back-end et base de données, puis publication sur l'App Store et le Google Play Store. Flash Market a été construit selon ce périmètre.",
    points: [
      "Applications iOS et Android à partir d'une base de code unique",
      "Back-end, API et base de données entièrement pris en charge",
      "Publication sur l'App Store et le Google Play Store incluse",
      "Notifications push, messagerie et mode dégradé hors-ligne",
      "Maintenance, mises à jour et suivi après la mise en ligne",
    ],
    proof: { label: "Voir Flash Market", href: "/realisations/flash-market" },
  },
  {
    slug: "api-systemes",
    icon: "Boxes",
    title: "API & Systèmes",
    excerpt:
      "Intégration d'API et développement de systèmes pour connecter vos services.",
    description:
      "Construction et connexion de systèmes : API internes, passerelles vers des services externes, automatisations et modélisation de bases de données.",
    points: [
      "Conception et documentation d'API",
      "Intégrations tierces (paiement, SMS, logistique...)",
      "Modélisation de bases de données et migrations",
      "Automatisations et tâches planifiées",
    ],
  },
];

export const DIFFERENTIATORS = [
  {
    icon: "PenTool",
    title: "Développement sur mesure",
    text: "Le point de départ est votre métier et vos usages, pas un modèle réutilisé.",
  },
  {
    icon: "Cpu",
    title: "Socle technique",
    text: "React Native, Next.js, PostgreSQL : des outils courants, documentés et maintenus.",
  },
  {
    icon: "ShieldCheck",
    title: "Sécurité côté serveur",
    text: "Les règles d'accès sont appliquées dans la base de données, pas seulement dans l'interface.",
  },
  {
    icon: "LifeBuoy",
    title: "Interlocuteur direct",
    text: "Les deux personnes qui répondent sont celles qui conçoivent et développent.",
  },
];

// Positionnement tarifaire et niveau d'exécution — section dédiée sur /services.
export const VALUE_PROPOSITION = {
  eyebrow: "Tarifs & niveau technique",
  title: "Comment les tarifs sont fixés",
  intro:
    "Les tarifs sont calibrés sur le marché local, pas sur les grilles européennes. Les choix d'architecture et de sécurité restent les mêmes quel que soit le budget.",
  columns: [
    {
      icon: "Wallet",
      title: "Tarification",
      text: "Le budget est établi à partir du périmètre réel du projet et annoncé avant le démarrage.",
      points: [
        "Un montant annoncé avant le démarrage, sans frais ajoutés en cours de route",
        "Un budget établi sur le périmètre réel du projet",
        "Paiement échelonné par étapes possible",
        "Aucune licence imposée : le produit et son code vous appartiennent",
      ],
    },
    {
      icon: "Cpu",
      title: "Exécution technique",
      text: "Les mêmes choix d'architecture et de sécurité s'appliquent sur tous les projets.",
      points: [
        "Architecture conçue pour monter en charge",
        "Règles d'accès appliquées au niveau de la base de données",
        "Fonctionnement testé en connexion instable",
        "Code documenté et transmis avec le projet",
      ],
    },
  ],
};

export const PROCESS = [
  { step: "01", title: "Cadrage", text: "Clarification du besoin métier, des objectifs et des priorités." },
  { step: "02", title: "Conception", text: "Définition des parcours, de l'interface et de l'architecture technique." },
  { step: "03", title: "Développement", text: "Itérations courtes, avec une version démontrable à chaque cycle." },
  { step: "04", title: "Livraison & suivi", text: "Déploiement, prise en main par vos équipes, puis maintenance." },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}
