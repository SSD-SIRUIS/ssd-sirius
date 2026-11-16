import Link from "next/link";
import Icon from "@/components/Icon";
import { getPortfolioLabel, isScopingProject, isConceptProject, isUndeliveredProject } from "@/lib/portfolio";

const TYPE_LABEL = {
  site: "Site web",
  application: "Application mobile",
  plateforme: "Plateforme web",
};

// Carte de réalisation : un visuel (capture réelle, ou aplat de couleur
// portant le nom du projet), une phrase-titre et un lien.
export default function ProjectCard({ project }) {
  const href = `/realisations/${project.slug}`;
  const isScoping = isScopingProject(project);
  const isConcept = isConceptProject(project);
  const isUndelivered = isUndeliveredProject(project);
  const media = project.card_image ? (
    <img src={project.card_image} alt={`Aperçu de ${project.title}`} loading="lazy" />
  ) : (
    <span className="story__brand">
      {project.logo_url && <img src={project.logo_url} alt="" />}
      {project.card_icon && !project.logo_url && (
        <span className="story__brand-mark">
          <Icon name={project.card_icon} />
        </span>
      )}
      <span className="story__word">{project.title.replace(/-/g, "\u2011")}</span>
    </span>
  );

  return (
    <article className="story">
      <Link
        href={href}
        className="story__media"
        style={{ "--tone": project.card_tone || undefined }}
        aria-label={`${isConcept ? "Découvrir le concept" : isScoping ? "Découvrir le cadrage de" : "Voir la réalisation"} ${project.title}`}
      >
        {media}
      </Link>
      <p className={`story__kind${isUndelivered ? " story__kind--scoping" : ""}`}>
        {getPortfolioLabel(project)}
      </p>
      <p className="mono story__meta">
        {TYPE_LABEL[project.type] || "Projet"}
        {project.category ? ` · ${project.category}` : ""}
      </p>
      <h3 className="story__title">
        <Link href={href}>{project.headline || project.summary}</Link>
      </h3>
      {isScoping && <p className="story__stage">Périmètre à l’étude · Aucune fonctionnalité livrée</p>}
      {isConcept && <p className="story__stage">Scénario fictif · Exemple de besoin métier</p>}
      <Link href={href} className="link-more">
        {isConcept ? "Explorer le concept" : isScoping ? "Découvrir le cadrage" : "Voir le projet"} <Icon name="ArrowRight" />
      </Link>
    </article>
  );
}
