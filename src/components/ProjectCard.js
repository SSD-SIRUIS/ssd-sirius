import Link from "next/link";
import Icon from "@/components/Icon";
import MockShot from "@/components/MockShot";

const TYPE_LABEL = {
  site: "Site web",
  application: "Application",
  plateforme: "Plateforme",
};

export default function ProjectCard({ project }) {
  const cover = project.cover_url
    ? { src: project.cover_url }
    : { tone: project.cover || "dark" };

  return (
    <Link href={`/realisations/${project.slug}`} className="card project-card">
      <div className="project-card__shot">
        <MockShot {...cover} label={project.title} phone={project.type === "application"} />
      </div>

      {project.flagship && (
        <span className="badge-flagship" style={{ alignSelf: "flex-start" }}>
          <Icon name="Star" />
          Projet phare
        </span>
      )}

      <div className="project-card__meta">
        <span>{TYPE_LABEL[project.type] || "Projet"}</span>
        {project.category && <span aria-hidden="true">•</span>}
        {project.category && <span>{project.category}</span>}
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="muted">{project.summary}</p>

      {project.technologies?.length > 0 && (
        <div className="tag-row">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}

      <span className="link-arrow" style={{ marginTop: "auto" }}>
        Découvrir le projet
        <Icon name="ArrowRight" />
      </span>
    </Link>
  );
}
