import Icon from "@/components/Icon";
import { TEAM } from "@/data/site";

// Les deux personnes derrière SSD Sirius.
// Le visage, le rôle, l'école : rien d'autre. La crédibilité vient de
// l'information vérifiable, pas d'un effet de style.
export default function TeamGrid({ members = TEAM }) {
  return (
    <div className="team-grid">
      {members.map((member) => (
        <article className="team-member" key={member.name}>
          <div className="team-member__photo">
            <img
              src={member.photo}
              alt={`Portrait de ${member.name}, ${member.role} de SSD Sirius`}
              width={800}
              height={1000}
              loading="lazy"
            />
          </div>

          <div className="team-member__body">
            <div className="team-member__head">
              <h3 className="team-member__name">{member.name}</h3>
              <span className="pill">{member.role}</span>
            </div>

            <p className="team-member__focus">{member.focus}</p>
            <p className="team-member__bio">{member.bio}</p>

            <div className="team-member__foot">
              {member.education && (
                <span className="team-member__school">
                  <Icon name="GraduationCap" />
                  {member.education}
                </span>
              )}

              {member.linkedin && (
                <a
                  className="link-arrow"
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Profil LinkedIn de ${member.name}`}
                >
                  LinkedIn
                  <Icon name="ArrowUpRight" />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
