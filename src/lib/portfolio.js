// La publication d'une fiche ne signifie pas que le logiciel est livré.
// Cette distinction est partagée par la grille, les cartes et les pages projet.
export const PORTFOLIO_GROUPS = [
  { key: "all", label: "Tout le portfolio" },
  { key: "client", label: "Prestations clients" },
  { key: "sirius", label: "Produits Sirius" },
  { key: "cadrage", label: "En cadrage" },
  { key: "development", label: "En développement" },
  { key: "proposal", label: "À l’étude" },
];

const PROJECT_STAGES = {
  cadrage: {
    label: "En cadrage",
    cardNote: "Périmètre à l’étude · Aucune fonctionnalité livrée",
    actorLabel: "Cadrage par",
    solutionTitle: "Le périmètre à l’étude",
    descriptionTitle: "État d’avancement",
    featuresTitle: "Fonctionnalités envisagées",
    actionLabel: "Découvrir le cadrage",
  },
  development: {
    label: "En développement",
    cardNote: "Développement en cours",
    actorLabel: "Développement par",
    solutionTitle: "Le produit en développement",
    descriptionTitle: "État d’avancement",
    featuresTitle: "Fonctionnalités en développement",
    actionLabel: "Découvrir le projet",
  },
  proposal: {
    label: "À l’étude",
    cardNote: "Périmètre proposé · Partenaire visé",
    actorLabel: "Périmètre proposé par",
    solutionTitle: "Le périmètre proposé",
    descriptionTitle: "Périmètre et partenariat",
    featuresTitle: "Fonctionnalités proposées",
    actionLabel: "Découvrir le projet",
  },
};

export function getProjectStage(project) {
  return PROJECT_STAGES[project.delivery_stage] || null;
}

export function isUndeliveredProject(project) {
  return Boolean(getProjectStage(project));
}

export function getPortfolioGroup(project) {
  if (getProjectStage(project)) return project.delivery_stage;
  return project.own_product ? "sirius" : "client";
}

export function getPortfolioLabel(project) {
  const group = getPortfolioGroup(project);
  if (PROJECT_STAGES[group]) return PROJECT_STAGES[group].label;
  return group === "sirius" ? "Produit Sirius" : "Prestation client";
}
