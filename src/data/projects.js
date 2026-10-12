// ------------------------------------------------------------------
// Données des réalisations (repli local).
// Utilisées quand Supabase n'est pas configuré ou ne renvoie rien.
//
// Projets réels de SSD Sirius, et seulement eux :
//   1. FLASH MARKET (projet phare) — marketplace mobile iOS / Android
//   2. BAMA — marketplace e-commerce mobile à Bamako
//   3. MK AUTO — importation de véhicules du Canada en Afrique de l’Ouest
//   4. PICASSO RESOLVE — studio photo produit par intelligence artificielle
//   5. MALILINK — plateforme d’emploi web
// Contenu et stack fournis par l’équipe ou vérifiés sur le site en ligne.
// Aucun projet fictif : chaque fiche doit renvoyer à un produit qui existe.
// ------------------------------------------------------------------

// Passer à `false` pour revenir aux aperçus dégradés.
// Les vraies captures vont dans public/realisations/flash-market/
// (voir le README de ce dossier). Si un fichier manque, le site retombe
// automatiquement sur l'aperçu dégradé : rien ne casse.
const FLASH_SCREENSHOTS_READY = true;

const flashShot = (file, tone, label) => ({
  tone,
  label,
  url: FLASH_SCREENSHOTS_READY ? `/realisations/flash-market/${file}` : "",
});

export const PROJECTS = [
  {
    slug: "flash-market",
    headline: "Une application complète, publiée sur iOS et Android",
    card_tone: "linear-gradient(140deg, #22a653 0%, #0f6b33 100%)",
    title: "Flash Market",
    client_name: "",
    own_product: true,
    type: "application",
    category: "Marketplace mobile",
    featured: true,
    flagship: true,
    status: "published",
    sort_order: 1,
    link_url: "https://link-my.app/flash-market-install",
    link_label: "Installer Flash Market",
    cover: "flash",
    logo_url: "/realisations/flash-market/logo.jpg",
    platforms: ["iOS", "Android"],
    payment: {
      aggregator: "XPaye Africa",
      operators: ["Orange Money"],
      countries: ["Mali", "Côte d'Ivoire"],
    },
    credits: ["Sidi Oumar GANO", "Mohamed Lamine"],
    summary:
      "La marketplace mobile pensée pour acheter, vendre et trouver des professionnels au Mali. Conçue et développée intégralement par SSD Sirius.",
    context:
      "Flash Market met en relation particuliers, vendeurs et professionnels dans une expérience simple, rapide et adaptée aux usages locaux : interface en français, prix en FCFA, et échanges qui se poursuivent dans l'application ou via les coordonnées du vendeur.",
    problem:
      "Acheter et vendre localement passait par des canaux dispersés, sans recherche fiable, sans tri par proximité et sans vitrine durable pour les professionnels. Il fallait réunir la découverte, la mise en relation et la gestion d'une activité dans une seule application, utilisable sur des connexions modestes.",
    solution:
      "SSD Sirius a conçu, développé et publié Flash Market de bout en bout : application React Native / Expo en TypeScript, back-end Supabase (PostgreSQL, Auth, Realtime, Storage), politiques RLS pour isoler les données privées, notifications push, géolocalisation, interface d'administration et pages publiques — jusqu'aux builds et mises à jour EAS.",
    description:
      "Flash Market démontre toute la palette technique de SSD Sirius sur le développement d'application : une base de code unique pour iOS et Android, un back-end complet avec sécurité au niveau des lignes, du temps réel, du paiement mobile pour la promotion d'annonces, et une chaîne de publication maîtrisée jusqu'aux stores.",
    highlights: [
      {
        icon: "Smartphone",
        title: "Application iOS & Android",
        text: "Une base de code unique en React Native, Expo et TypeScript, livrée sur les deux plateformes.",
      },
      {
        icon: "ShieldCheck",
        title: "Données protégées côté serveur",
        text: "Politiques PostgreSQL RLS : les données privées sont isolées dans la base, pas seulement masquées dans l'interface.",
      },
      {
        icon: "RefreshCw",
        title: "Temps réel",
        text: "Messagerie et données synchronisées en direct via Supabase Realtime.",
      },
      {
        icon: "Store",
        title: "Espace professionnel complet",
        text: "Boutique, catalogue, vitrine de services, portfolio, tarifs, commandes, devis et statistiques de visibilité.",
      },
      {
        icon: "Wallet",
        title: "Paiement Mobile Money intégré",
        text: "Boost d'annonces et services payants réglés en Mobile Money via l'agrégateur XPaye Africa et Orange Money.",
      },
      {
        icon: "BellRing",
        title: "Notifications push",
        text: "Notifications transactionnelles et push via Expo Push API et pg_net.",
      },
    ],
    featureGroups: [
      {
        label: "Pour les acheteurs",
        items: [
          "Parcours d'annonces par catégorie et sous-catégorie",
          "Recherche et filtres par prix, état, localisation et type de vendeur",
          "Tri par proximité grâce à la géolocalisation",
          "Fiches détaillées avec photos, prix et informations vendeur",
          "Favoris pour retrouver facilement une annonce",
          "Messagerie en temps réel",
          "Découverte des boutiques et professionnels",
          "Demandes de devis pour les prestations de services",
          "Avis et signalement de contenus",
        ],
      },
      {
        label: "Pour les vendeurs et professionnels",
        items: [
          "Publication et modification d'annonces",
          "Gestion des annonces depuis un espace personnel",
          "Profil public avec photo, biographie et réseaux sociaux",
          "Boutique professionnelle avec catalogue de produits",
          "Vitrine de services, portfolio, disponibilités et tarifs",
          "Gestion des commandes et demandes clients",
          "Statistiques de visibilité et de contacts",
          "Notifications transactionnelles et push",
          "Programme de parrainage",
        ],
      },
      {
        label: "Plateforme",
        items: [
          "Connexion par e-mail, téléphone, Google ou Apple",
          "Données synchronisées en temps réel",
          "Stockage sécurisé des images",
          "Politiques PostgreSQL RLS pour isoler les données privées",
          "Outils de modération et d'administration",
          "Pages publiques de présentation, support et informations légales",
        ],
      },
    ],
    principles: [
      "L'accès reste gratuit pour les acheteurs.",
      "Les annonces pertinentes priment toujours sur la promotion payante.",
      "Les vendeurs professionnels disposent d'une présence durable et identifiable.",
      "La proximité, la confiance et la simplicité guident l'expérience.",
      "Les données privées sont protégées côté serveur, pas uniquement dans l'interface.",
    ],
    // Les 3 premières servent aussi de trio de tête sur la fiche projet.
    screens: [
      flashShot("01-recherche.jpg", "flash", "Recherche géolocalisée et catégories"),
      flashShot("05-accueil.jpg", "flash", "Accueil — pros et annonces récentes"),
      flashShot("06-espace-pro.jpg", "flash-2", "Espace pro — statistiques et contacts reçus"),
      flashShot("04-profil-vendeur.jpg", "flash-2", "Profil vendeur — annonces & espace pro"),
      flashShot("03-choix-operateur.jpg", "flash-pay", "Paiement — choix du pays et de l'opérateur"),
      flashShot("02-paiement-orange-money.jpg", "flash-pay", "Confirmation Orange Money"),
    ],
    techGroups: [
      { label: "Application mobile", items: ["React Native", "Expo", "TypeScript"] },
      { label: "Navigation", items: ["React Navigation"] },
      { label: "Backend", items: ["Supabase", "PostgreSQL"] },
      { label: "Authentification", items: ["Supabase Auth", "Google Sign-In", "Apple Sign-In"] },
      { label: "Temps réel", items: ["Supabase Realtime"] },
      { label: "Stockage", items: ["Supabase Storage"] },
      { label: "Notifications", items: ["Expo Notifications", "Expo Push API", "pg_net"] },
      { label: "Géolocalisation", items: ["Expo Location"] },
      { label: "Déploiement mobile", items: ["EAS Build", "EAS Update"] },
      { label: "Administration", items: ["HTML", "CSS", "JavaScript"] },
      { label: "Paiement", items: ["XPaye Africa", "Orange Money", "Mobile Money"] },
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL"],
    metrics: [
      { label: "Plateformes", value: "iOS + Android" },
      { label: "Connexion", value: "E-mail, téléphone, Google, Apple" },
      { label: "Sécurité des données", value: "PostgreSQL RLS" },
    ],
  },

  // ------------------------------------------------------------------
  // PICASSO RESOLVE — SaaS de photos produit par intelligence artificielle.
  // Visuels repris du site en ligne (public/realisations/picasso-resolve/).
  // ------------------------------------------------------------------
  {
    slug: "picasso-resolve",
    headline: "Des photos produit professionnelles à partir d’une simple photo",
    card_tone: "linear-gradient(140deg, #8f7aea 0%, #211b4e 100%)",
    card_icon: "Sparkles",
    title: "Picasso Resolve",
    client_name: "",
    own_product: true,
    type: "plateforme",
    category: "SaaS & intelligence artificielle",
    featured: true,
    status: "published",
    sort_order: 4,
    link_url: "https://picassoresolve.com",
    link_label: "Découvrir Picasso Resolve",
    cover: "picasso",
    cover_url: "/realisations/picasso-resolve/02-vue-principale.jpg",
    platforms: ["Web"],
    summary:
      "Un studio photo par intelligence artificielle : à partir d’une photo de produit brute, Picasso Resolve génère des visuels prêts pour une fiche e-commerce. Conçu et développé par SSD Sirius.",
    context:
      "Une boutique en ligne vend d’abord par ses photos. Les e-commerçants ont besoin de visuels cohérents pour chaque référence, sans organiser un shooting à chaque nouveau produit.",
    problem:
      "Produire plusieurs mises en scène de qualité demande du matériel, un photographe, parfois des modèles, et une direction artistique difficile à reproduire à grande échelle.",
    solution:
      "SSD Sirius a conçu et développé Picasso Resolve de bout en bout : l’utilisateur importe une photo de son produit, l’intelligence artificielle l’analyse, propose plusieurs directions visuelles (studio, mise en scène, lifestyle) et génère un lot d’images téléchargeables en haute définition.",
    description:
      "De la page de présentation au studio de génération, en passant par les comptes et le système de crédits, Picasso Resolve est un produit SaaS complet, en ligne et utilisable aujourd’hui.",
    highlights: [
      {
        icon: "Camera",
        title: "Une photo suffit",
        text: "Le point de départ est une photo de produit brute, prise au téléphone.",
      },
      {
        icon: "Sparkles",
        title: "Analyse par IA",
        text: "Le produit est identifié et décrit avant la génération, pour des visuels fidèles.",
      },
      {
        icon: "Layers",
        title: "Plusieurs directions",
        text: "Studio, mise en scène et lifestyle : un lot de visuels pour une même fiche produit.",
      },
      {
        icon: "PenTool",
        title: "Prompts modifiables",
        text: "Les instructions de génération sont consultables et ajustables avant de relancer.",
      },
      {
        icon: "Download",
        title: "Haute définition",
        text: "Les images générées se téléchargent en haute définition, prêtes à publier.",
      },
      {
        icon: "Wallet",
        title: "Système de crédits",
        text: "Chaque génération consomme des crédits : un modèle SaaS complet, facturation comprise.",
      },
    ],
    features: [
      "Import d’une photo produit brute",
      "Analyse du produit par intelligence artificielle",
      "Génération de plusieurs directions visuelles",
      "Prompts consultables et modifiables",
      "Téléchargement des images en haute définition",
      "Système de crédits intégré",
    ],
    screens: [
      { url: "/realisations/picasso-resolve/01-photo-brute.jpg", tone: "picasso", label: "Photo produit brute, avant traitement" },
      { url: "/realisations/picasso-resolve/02-vue-principale.jpg", tone: "picasso", label: "Vue principale générée" },
      { url: "/realisations/picasso-resolve/03-mise-en-scene.jpg", tone: "picasso", label: "Mise en scène générée" },
      { url: "/realisations/picasso-resolve/04-lifestyle.jpg", tone: "picasso", label: "Visuel lifestyle généré" },
    ],
    techGroups: [
      { label: "Application web", items: ["Next.js", "React"] },
      { label: "Intelligence artificielle", items: ["Gemini", "Replicate"] },
      { label: "Modèle SaaS", items: ["Comptes utilisateurs", "Système de crédits"] },
    ],
    technologies: ["Next.js", "Intelligence artificielle", "Gemini", "Replicate"],
    metrics: [
      { label: "Produit", value: "SaaS complet" },
      { label: "Parcours", value: "Photo brute → visuels e-commerce" },
    ],
  },

  {
    slug: "malilink",
    headline: "La plateforme qui connecte les talents maliens aux recruteurs",
    card_tone: "linear-gradient(140deg, #1c6a4a 0%, #0a1d2f 100%)",
    card_icon: "Users",
    title: "MaliLink",
    client_name: "",
    own_product: true,
    type: "plateforme",
    category: "Plateforme d'emploi",
    featured: true,
    status: "published",
    sort_order: 5,
    link_url: "https://malilink-web-779884436442.europe-west1.run.app",
    link_label: "Voir MaliLink en ligne",
    cover: "market",
    cover_url: "/realisations/malilink/01-accueil.jpg",
    platforms: ["Web", "Mobile & desktop"],
    summary:
      "La plateforme d'emploi qui connecte les talents maliens — et la diaspora — aux entreprises qui recrutent. Conçue et développée par SSD Sirius.",
    context:
      "Au Mali, chercher un emploi passe encore largement par le bouche-à-oreille, les groupes de discussion et des annonces dispersées. MaliLink rassemble l'offre et la demande sur une plateforme unique, en français, ouverte aux candidats du pays comme de la diaspora.",
    problem:
      "Trois obstacles à lever : des offres éparpillées et invérifiables, un dossier de candidature à reconstituer à chaque fois (CV, diplômes, acte de naissance), et une inscription qui suppose une adresse e-mail que tout le monde n'utilise pas au quotidien.",
    solution:
      "SSD Sirius a conçu et développé MaliLink de bout en bout : une inscription par numéro de téléphone (l'e-mail reste optionnel), un coffre-fort de documents réutilisable qui rend chaque candidature instantanée, des employeurs vérifiés par NIF et RCCM, et une recherche filtrée par région, secteur et type de contrat — diaspora incluse.",
    description:
      "L'architecture sépare l'interface et les données : un front Next.js prérendu pour la vitesse, et une API dédiée, chacun déployé comme un service indépendant sur Google Cloud Run. Les deux peuvent évoluer et monter en charge séparément.",
    highlights: [
      {
        icon: "Smartphone",
        title: "Inscription par téléphone",
        text: "Le numéro sert d'identifiant, l'e-mail reste optionnel : un parcours pensé pour les usages réels au Mali.",
      },
      {
        icon: "ShieldCheck",
        title: "Coffre-fort de documents",
        text: "CV, diplômes et acte de naissance déposés une seule fois, réutilisés à chaque candidature.",
      },
      {
        icon: "BadgeCheck",
        title: "Employeurs vérifiés",
        text: "Les entreprises sont validées par NIF et RCCM avant de pouvoir publier une offre.",
      },
      {
        icon: "Globe",
        title: "Mali & diaspora",
        text: "Les talents maliens de l'étranger postulent depuis leur pays de résidence.",
      },
      {
        icon: "Users",
        title: "Deux espaces distincts",
        text: "Un parcours candidat et un parcours recruteur, chacun avec ses propres écrans et ses propres droits.",
      },
      {
        icon: "Boxes",
        title: "Front et API séparés",
        text: "Deux services Cloud Run indépendants : l'interface et les données évoluent séparément.",
      },
    ],
    featureGroups: [
      {
        label: "Pour les candidats",
        items: [
          "Inscription en 2 minutes avec le numéro de téléphone comme identifiant",
          "Coffre-fort sécurisé pour CV, diplômes et pièces justificatives",
          "Candidature en un clic depuis les documents déjà déposés",
          "Recherche filtrée par région, secteur et type de contrat",
          "Offres accessibles depuis l'étranger pour la diaspora",
        ],
      },
      {
        label: "Pour les recruteurs",
        items: [
          "Espace recruteur distinct dès la création du compte",
          "Vérification de l'entreprise par NIF et RCCM",
          "Publication et gestion des offres d'emploi",
          "Réception des candidatures avec les pièces jointes",
        ],
      },
      {
        label: "Plateforme",
        items: [
          "Interface entièrement en français",
          "Couverture des régions du Mali et option diaspora",
          "Pages prérendues pour un affichage rapide en connexion modeste",
          "Front et API déployés comme deux services indépendants",
        ],
      },
    ],
    screens: [
      { url: "/realisations/malilink/01-accueil.jpg", tone: "market", label: "Accueil — l'emploi au Mali, repensé" },
      { url: "/realisations/malilink/02-processus.jpg", tone: "market-2", label: "Postuler en trois étapes" },
      { url: "/realisations/malilink/03-fonctionnalites.jpg", tone: "market-3", label: "Coffre-fort, diaspora et employeurs vérifiés" },
      { url: "/realisations/malilink/04-inscription.jpg", tone: "dark", label: "Création de compte candidat ou recruteur" },
    ],
    techGroups: [
      { label: "Interface web", items: ["Next.js", "React", "Rendu prérendu (ISR)"] },
      { label: "Back-end", items: ["API dédiée", "Service indépendant"] },
      { label: "Infrastructure", items: ["Google Cloud Run", "Conteneurs", "europe-west1"] },
    ],
    technologies: ["Next.js", "React", "API dédiée", "Google Cloud Run"],
    metrics: [
      { label: "Architecture", value: "Front + API séparés" },
      { label: "Identifiant", value: "Numéro de téléphone" },
      { label: "Portée", value: "Mali + diaspora" },
    ],
  },

  {
    slug: "bama",
    headline: "La place de marché de Bamako, dans votre poche",
    card_tone: "linear-gradient(140deg, #12c8c0 0%, #0b1e33 100%)",
    title: "BAMA",
    client_name: "BAMA",
    own_product: false,
    type: "application",
    category: "Marketplace e-commerce",
    featured: false,
    status: "published",
    sort_order: 2,
    link_url: "https://bama-mali.com/",
    link_label: "Voir BAMA en ligne",
    cover: "bama",
    cover_url: "/realisations/bama/01-accueil.jpeg",
    logo_url: "/realisations/bama/logo.png",
    platforms: ["Web", "Android / Google Play", "iOS bientôt"],
    payment: {
      aggregator: "Paiement intégré",
      operators: ["Orange Money", "Carte bancaire", "Espèces à la livraison"],
      countries: ["Mali"],
    },
    credits: ["Sidi Oumar GANO", "Mohamed Lamine"],
    summary:
      "La marketplace de Bamako qui réunit boutiques et restaurants vérifiés, paiement local et livraison sécurisée.",
    context:
      "BAMA rassemble les commerces de proximité et les restaurants de Bamako dans une expérience pensée pour les usages locaux : catalogue, commande, paiement et livraison au même endroit.",
    problem:
      "Acheter auprès de commerces locaux restait dispersé entre réseaux sociaux, appels et paiements difficiles à sécuriser. Il fallait une place de marché simple, fiable et accessible depuis le téléphone.",
    solution:
      "SSD Sirius a conçu et développé BAMA comme une plateforme e-commerce mobile : boutiques et restaurants vérifiés, panier, messagerie, paiement par Orange Money, carte ou espèces, suivi de commande et remise protégée par un code à 4 chiffres.",
    description:
      "BAMA est une marketplace locale qui permet d'acheter auprès de vendeurs vérifiés à Bamako. Le projet a été livré en environ deux semaines, avec une application déjà disponible sur Google Play et une disponibilité iOS prévue prochainement.",
    highlights: [
      { icon: "BadgeCheck", title: "Vendeurs vérifiés", text: "Chaque boutique et chaque restaurant est contrôlé avant de pouvoir vendre sur la plateforme." },
      { icon: "Wallet", title: "Paiement adapté au Mali", text: "Orange Money, carte bancaire ou espèces à la livraison selon les possibilités du vendeur." },
      { icon: "ShieldCheck", title: "Livraison sécurisée", text: "La commande est remise contre un code à 4 chiffres : pas de code, pas de remise." },
      { icon: "MessageCircle", title: "Messagerie intégrée", text: "Les acheteurs échangent directement avec les boutiques depuis l'application." },
      { icon: "BellRing", title: "Suivi de commande", text: "Des notifications accompagnent la préparation, la prise en charge et la livraison." },
      { icon: "Star", title: "Programme fidélité", text: "Les achats peuvent donner accès à des offres fidélité et à des cadeaux remis par l'équipe BAMA." },
    ],
    featureGroups: [
      {
        label: "Pour les acheteurs",
        items: [
          "Parcourir les boutiques, restaurants et catégories",
          "Ajouter des produits au panier et passer commande",
          "Payer par Orange Money, carte ou espèces à la livraison",
          "Suivre les étapes de préparation et de livraison",
          "Recevoir la commande contre un code de remise",
          "Échanger avec le vendeur dans la messagerie intégrée",
        ],
      },
      {
        label: "Pour les vendeurs",
        items: [
          "Créer gratuitement une vitrine sur BAMA",
          "Publier ses produits, ses prix et ses horaires",
          "Recevoir les commandes de clients à Bamako",
          "Organiser la livraison et confirmer la remise",
          "Recevoir ses gains en Mobile Money",
          "Mettre en avant ses offres dans les ventes flash",
        ],
      },
      {
        label: "Plateforme",
        items: [
          "Application mobile disponible sur Google Play",
          "Version iOS annoncée prochainement",
          "Boutiques et restaurants vérifiés par l'équipe BAMA",
          "Parcours de paiement et de livraison pensé pour Bamako",
        ],
      },
    ],
    principles: [
      "Rendre l'achat local aussi simple qu'une commande en ligne.",
      "Construire la confiance grâce à la vérification des vendeurs.",
      "Proposer des moyens de paiement adaptés aux usages maliens.",
      "Sécuriser la remise de chaque commande.",
    ],
    screens: [
      { url: "/realisations/bama/01-accueil.jpeg", tone: "bama", label: "Accueil — les boutiques de Bamako dans votre poche" },
      { url: "/realisations/bama/02-restaurants.jpeg", tone: "bama-2", label: "Restaurants et livraison à Bamako" },
      { url: "/realisations/bama/03-connexion.jpeg", tone: "bama-3", label: "Connexion BAMA" },
      { url: "/realisations/bama/04-profil.jpeg", tone: "bama-4", label: "Profil, commandes et services BAMA" },
    ],
    techGroups: [
      { label: "Produit", items: ["Application mobile", "Marketplace e-commerce"] },
      { label: "Paiement", items: ["Orange Money", "Carte bancaire", "Espèces à la livraison"] },
      { label: "Expérience", items: ["Messagerie intégrée", "Notifications", "Suivi de commande"] },
    ],
    technologies: ["Application mobile", "E-commerce", "Mobile Money"],
    metrics: [
      { label: "Réalisation", value: "Environ 2 semaines" },
      { label: "Disponibilité", value: "Google Play" },
      { label: "Zone de lancement", value: "Bamako, Mali" },
    ],
  },

  {
    slug: "mk-auto",
    headline: "L’importation de véhicules du Canada vers l’Afrique de l’Ouest",
    card_image: "/realisations/mk-auto/hero-car-bg.png",
    card_tone: "linear-gradient(140deg, #17130e 0%, #050607 100%)",
    title: "MK Auto",
    client_name: "MK AUTO",
    own_product: false,
    type: "site",
    category: "Vente de véhicules",
    featured: false,
    status: "published",
    sort_order: 3,
    link_url: "https://mk-auto.store/",
    link_label: "Visiter MK Auto",
    cover: "mk-auto",
    cover_url: "/realisations/mk-auto/hero-car-bg.png",
    logo_url: "/realisations/mk-auto/logo.jpg",
    platforms: ["Web"],
    payment: null,
    credits: ["Sirius Mali"],
    summary:
      "Une plateforme web dédiée à l’importation de véhicules d’occasion depuis le Canada vers le Mali, le Sénégal et la Côte d’Ivoire.",
    context:
      "MK AUTO accompagne les acheteurs ouest-africains dans la recherche et l’importation de véhicules inspectés au Canada, avec une présentation claire du service et des destinations desservies.",
    problem:
      "Importer un véhicule depuis l’Amérique du Nord demande de la confiance, des informations accessibles et un interlocuteur direct pour suivre le projet jusqu’à la livraison.",
    solution:
      "SSD Sirius a conçu le site MK AUTO comme une vitrine automobile et un point d’entrée commercial : catalogue de véhicules, parcours d’explication, couverture géographique, prise de contact et échange direct par WhatsApp.",
    description:
      "MK AUTO présente une offre d’importation automobile pensée pour l’Afrique de l’Ouest. Le site met en avant les véhicules disponibles, l’inspection au Canada et la livraison au Mali, au Sénégal et en Côte d’Ivoire.",
    highlights: [
      { icon: "ShoppingCart", title: "Catalogue automobile", text: "Une vitrine claire pour présenter les véhicules disponibles et faciliter la prise de décision." },
      { icon: "ShieldCheck", title: "Véhicules inspectés", text: "Le service met en avant des véhicules contrôlés avant leur expédition." },
      { icon: "Globe", title: "Canada vers l’Afrique de l’Ouest", text: "Une offre pensée pour le Mali, le Sénégal et la Côte d’Ivoire." },
      { icon: "MapPin", title: "Livraison accompagnée", text: "Le parcours explique les étapes jusqu’à la réception du véhicule." },
      { icon: "MessageCircle", title: "Contact direct", text: "Les visiteurs peuvent échanger rapidement avec l’équipe via WhatsApp." },
      { icon: "LayoutDashboard", title: "Espace de gestion", text: "Une base web structurée pour administrer le catalogue et les demandes." },
    ],
    featureGroups: [
      {
        label: "Pour les acheteurs",
        items: [
          "Découvrir les véhicules disponibles",
          "Comprendre le processus d’importation",
          "Vérifier les pays desservis",
          "Contacter l’équipe pour un projet de véhicule",
        ],
      },
      {
        label: "Pour MK AUTO",
        items: [
          "Présenter l’offre automobile en ligne",
          "Mettre en avant les véhicules inspectés",
          "Orienter chaque demande vers un contact direct",
          "Centraliser les informations utiles avant l’achat",
        ],
      },
      {
        label: "Plateforme",
        items: [
          "Site web responsive",
          "Catalogue de véhicules",
          "Parcours d’explication du service",
          "Contact WhatsApp et formulaire de demande",
        ],
      },
    ],
    principles: [
      "Rendre l’importation automobile plus lisible.",
      "Créer de la confiance avant le premier échange.",
      "Relier une offre canadienne aux besoins des acheteurs ouest-africains.",
    ],
    screens: [
      { url: "/realisations/mk-auto/hero-car-bg.png", tone: "mk-auto", label: "Accueil MK AUTO — véhicules du Canada vers l’Afrique de l’Ouest" },
      { url: "/realisations/mk-auto/map-bg.png", tone: "mk-auto-2", label: "Réseau de livraison en Afrique de l’Ouest" },
      { url: "/realisations/mk-auto/logo.jpg", tone: "mk-auto-3", label: "Identité MK AUTO" },
    ],
    techGroups: [
      { label: "Produit", items: ["Site vitrine", "Catalogue automobile"] },
      { label: "Acquisition", items: ["Contact WhatsApp", "Formulaire de demande"] },
      { label: "Expérience", items: ["Responsive", "Parcours d’importation"] },
    ],
    technologies: ["Site web", "Catalogue", "WhatsApp"],
    metrics: [
      { label: "Origine", value: "Canada" },
      { label: "Destinations", value: "Mali, Sénégal, Côte d’Ivoire" },
      { label: "Service", value: "Véhicules inspectés et livrés" },
    ],
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}
