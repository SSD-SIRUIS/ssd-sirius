import Link from "next/link";
import Icon from "@/components/Icon";

const TYPE_LABEL = {
  site: "Site web",
  application: "Application mobile",
  plateforme: "Plateforme web",
};

// Carte de réalisation : un visuel (capture réelle, ou aplat de couleur
// portant le nom du projet), une phrase-titre et un lien.
export default function ProjectCard({ project }) {
  const href = `/realisations/${project.slug}`;
  const media = project.card_image ? (
    <img src={project.card_image} alt={`Aperçu de ${project.title}`} loading="lazy" />
  ) : (
    <span className="story__brand">
      {project.logo_url && <img src={project.logo_url} alt="" />}
      <span className="story__word">{project.title.replace(/-/g, "\u2011")}</span>
    </span>
  );

  return (
    <article className="story">
      <Link
        href={href}
        className="story__media"
        style={{ "--tone": project.card_tone || undefined }}
        aria-label={`Voir la réalisation ${project.title}`}
      >
        {media}
      </Link>
      <p className="mono story__meta">
        {TYPE_LABEL[project.type] || "Projet"}
        {project.category ? ` · ${project.category}` : ""}
      </p>
      <h3 className="story__title">
        <Link href={href}>{project.headline || project.summary}</Link>
      </h3>
      <Link href={href} className="link-more">
        Voir le projet <Icon name="ArrowRight" />
      </Link>
    </article>
  );
}
