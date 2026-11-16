// La publication d'une fiche ne signifie pas que le logiciel est livré.
// Cette distinction est partagée par la grille, les cartes et les pages projet.
export const PORTFOLIO_GROUPS = [
  { key: "all", label: "Tout le portfolio" },
  { key: "client", label: "Prestations clients" },
  { key: "sirius", label: "Produits Sirius" },
  { key: "cadrage", label: "En cadrage" },
  { key: "concept", label: "Concepts illustratifs" },
];

export function isScopingProject(project) {
  return project.delivery_stage === "cadrage";
}

export function isConceptProject(project) {
  return project.delivery_stage === "concept";
}

export function isUndeliveredProject(project) {
  return isScopingProject(project) || isConceptProject(project);
}

export function getPortfolioGroup(project) {
  if (isScopingProject(project)) return "cadrage";
  if (isConceptProject(project)) return "concept";
  return project.own_product ? "sirius" : "client";
}

export function getPortfolioLabel(project) {
  const group = getPortfolioGroup(project);
  if (group === "cadrage") return "Projet en cadrage";
  if (group === "concept") return "Concept illustratif";
  return group === "sirius" ? "Produit Sirius" : "Prestation client";
}
