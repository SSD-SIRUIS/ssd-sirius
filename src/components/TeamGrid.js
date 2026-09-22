import Icon from "@/components/Icon";
import { TEAM } from "@/data/site";

// Les deux personnes derrière SSD Sirius.
// Le visage, le rôle, l'école : rien d'autre. La crédibilité vient de
// l'information vérifiable, pas d'un effet de style.
export default function TeamGrid({ members = TEAM }) {
  return (
    <div className="team">
      {members.map((m) => (
        <article className="team__member" key={m.name}>
          <div className="team__photo">
            <img
              src={m.photo}
              alt={`Portrait de ${m.name}, ${m.role} de SSD Sirius`}
              width={800}
              height={1000}
              loading="lazy"
            />
          </div>
          <div className="team__body">
            <h3 className="title-3">{m.name}</h3>
            <p className="mono">
              {m.role} · {m.focus}
            </p>
            <p className="team__bio">{m.bio}</p>
            <div className="team__foot">
              {m.education && (
                <span className="team__school">
                  <Icon name="GraduationCap" />
                  {m.education}
                </span>
              )}
              {m.linkedin && (
                <a className="link-more" href={m.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <Icon name="ArrowUpRight" />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
