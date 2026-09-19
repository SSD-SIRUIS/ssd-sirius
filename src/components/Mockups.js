// Maquettes d'interface construites en HTML/CSS (et non en images) :
// elles restent nettes, légères, et suivent le thème clair/sombre.
// Contenu illustratif mais fidèle : l'équipe réelle (Sidi, Mohamed Lamine)
// et le parcours de paiement réel de Flash Market.

import Icon from "@/components/Icon";

/* ------------------------------------------------------ Icônes d'état */
export function StatusIcon({ state }) {
  const c = 7;
  if (state === "todo") {
    return (
      <svg className="status" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx={c} cy={c} r="5.5" fill="none" stroke="var(--text-3)" strokeWidth="1.5" />
      </svg>
    );
  }
  if (state === "progress") {
    return (
      <svg className="status" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx={c} cy={c} r="5.5" fill="none" stroke="var(--yellow)" strokeWidth="1.5" />
        <path d="M7 3.5 A3.5 3.5 0 0 1 7 10.5 Z" fill="var(--yellow)" />
      </svg>
    );
  }
  if (state === "review") {
    return (
      <svg className="status" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx={c} cy={c} r="5.5" fill="none" stroke="var(--green)" strokeWidth="1.5" />
        <path d="M7 3.5 A3.5 3.5 0 1 1 3.5 7 L7 7 Z" fill="var(--green)" />
      </svg>
    );
  }
  if (state === "done") {
    return (
      <svg className="status" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx={c} cy={c} r="6.5" fill="var(--accent)" />
        <path d="M4.4 7.2 6.2 9 9.6 5.3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="status" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx={c} cy={c} r="5.5" fill="none" stroke="var(--text-4)" strokeWidth="1.5" strokeDasharray="1.6 2" />
    </svg>
  );
}

function Priority({ level = 2 }) {
  return (
    <svg className="status" viewBox="0 0 14 14" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={2 + i * 4}
          y={9 - i * 3}
          width="2.4"
          height={3 + i * 3}
          rx="0.6"
          fill={i < level ? "var(--text-3)" : "var(--line-3)"}
        />
      ))}
    </svg>
  );
}

const Chip = ({ label, dot }) => (
  <span className="chip">
    {dot && <span className="chip__dot" style={{ "--dot": dot }} />}
    {label}
  </span>
);

/* -------------------------------------------- Tableau de suivi projet */
const BOARD = [
  {
    name: "Cadrage",
    state: "todo",
    issues: [
      { id: "SIR-104", title: "Ateliers de cadrage et parcours clés", chips: [["Conception", "var(--accent)"], ["Semaine 1"]], who: "SG", prio: 3 },
      { id: "SIR-109", title: "Maquettes validées avec le client", chips: [["Design", "var(--blue)"]], who: "ML", prio: 2 },
    ],
  },
  {
    name: "En cours",
    state: "progress",
    issues: [
      { id: "SIR-121", title: "Base de données et API", chips: [["Back-end", "var(--green)"]], who: "ML", prio: 3 },
      { id: "SIR-126", title: "Intégration Mobile Money", chips: [["Paiement", "var(--yellow)"]], who: "SG", prio: 3 },
      { id: "SIR-131", title: "Écrans de l'application", chips: [["Mobile", "var(--blue)"]], who: "SG", prio: 2 },
    ],
  },
  {
    name: "En revue",
    state: "review",
    issues: [
      { id: "SIR-138", title: "Parcours de paiement", chips: [["Revue client"]], who: "SG", prio: 2 },
      { id: "SIR-142", title: "Notifications push", chips: [["Mobile", "var(--blue)"]], who: "ML", prio: 1 },
    ],
  },
  {
    name: "Publié",
    state: "done",
    issues: [
      { id: "SIR-150", title: "Version de test iOS", chips: [["App Store"]], who: "ML", prio: 2 },
      { id: "SIR-151", title: "Soumission Google Play", chips: [["Google Play"]], who: "SG", prio: 2 },
    ],
  },
];

const THREAD = [
  { who: "Vous", initials: "V", time: "09:12", text: "On peut déjà tester le paiement Orange Money ?" },
  { who: "Sidi · Sirius", initials: "SG", time: "09:14", text: "Oui : il est en revue, la démo est prête pour notre point de jeudi.", team: true },
  { who: "Vous", initials: "V", time: "09:15", text: "Parfait. Et la version iOS ?" },
  { who: "Mohamed · Sirius", initials: "ML", time: "09:16", text: "Envoyée en test cette semaine, vous recevez le lien ce soir.", team: true },
];

export function ProjectBoard() {
  return (
    <div className="board-wrap" role="img" aria-label="Exemple de tableau de suivi d'un projet Sirius, avec un fil d'échange entre le client et l'équipe">
      <div className="thread" aria-hidden="true">
        <div className="thread__bar">
          <Icon name="Hash" />
          Point hebdo <span>votre-projet</span>
        </div>
        <div className="thread__body">
          {THREAD.map((m, i) => (
            <div className="msg" key={i}>
              <span className={`avatar avatar--lg ${m.team ? "avatar--accent" : ""}`}>{m.initials}</span>
              <div>
                <div className="msg__who">
                  {m.who}
                  <time>{m.time}</time>
                </div>
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="composer">
          <span className="composer__mention">@Sirius</span> préparer la démo de la semaine
          <div className="composer__tools">
            <Icon name="Plus" />
            <Icon name="Type" />
            <Icon name="Smile" />
            <Icon name="AtSign" />
            <Icon name="Paperclip" />
            <span className="composer__send">
              <Icon name="SendHorizontal" />
            </span>
          </div>
        </div>
      </div>

      <div className="board fade-x" aria-hidden="true">
        {BOARD.map((col) => (
          <div className="board__col" key={col.name}>
            <div className="board__head">
              <StatusIcon state={col.state} />
              {col.name}
              <span className="board__count">{col.issues.length}</span>
              <span className="board__tools">
                <Icon name="Plus" />
                <Icon name="Ellipsis" />
              </span>
            </div>
            {col.issues.map((it) => (
              <div className="issue" key={it.id}>
                <div className="issue__top">
                  <span className="issue__id">{it.id}</span>
                  <span className="avatar">{it.who}</span>
                </div>
                <div className="issue__title">{it.title}</div>
                <div className="issue__meta">
                  <span className="chip chip--square">
                    <Priority level={it.prio} />
                  </span>
                  {it.chips.map(([label, dot]) => (
                    <Chip key={label} label={label} dot={dot} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Parcours de paiement Mobile Money */
function WindowBar({ icon, title, chip }) {
  return (
    <div className="window__bar">
      <Icon name={icon} />
      {title}
      {chip && <span className="chip">{chip}</span>}
      <span className="window__ctrl">
        <Icon name="Minus" />
        <Icon name="Maximize2" />
        <Icon name="X" />
      </span>
    </div>
  );
}

export function PaymentWindows() {
  return (
    <div
      className="windows"
      role="img"
      aria-label="Parcours de paiement Mobile Money de Flash Market : demande de boost, paiement via XPaye Africa et Orange Money, confirmation"
    >
      <div className="window" aria-hidden="true">
        <WindowBar icon="Megaphone" title="Flash Market" chip="Boost" />
        <div className="window__body">
          <div className="window__prompt">Booster mon annonce « Casque Apple »</div>
          <div className="window__ctx">
            <Icon name="FileText" /> Annonce ajoutée à la commande
          </div>
          <p className="window__log">
            Montant calculé : <strong>250 FCFA</strong>. Redirection vers le paiement Mobile Money.
          </p>
          <div className="row-item">
            <span className="issue__id">RÉF.</span>
            CC-1788…2616
          </div>
        </div>
      </div>

      <div className="window" aria-hidden="true">
        <WindowBar icon="Wallet" title="XPaye Africa" chip="Paiement" />
        <div className="window__body">
          <div className="window__group">D'où payez-vous ?</div>
          <div className="row-item">
            <StatusIcon state="done" /> Pays <span className="row-item__val">Mali</span>
          </div>
          <div className="row-item">
            <StatusIcon state="done" /> Opérateur <span className="row-item__val">Orange Money</span>
          </div>
          <div className="row-item">
            <StatusIcon state="progress" /> Code de paiement <span className="row-item__val">#144#77#</span>
          </div>
        </div>
      </div>

      <div className="window" aria-hidden="true">
        <WindowBar icon="Receipt" title="Confirmation" chip="Validé" />
        <div className="window__body">
          <p className="window__log">
            Paiement confirmé par l'opérateur. L'annonce est <strong>boostée</strong> et remonte dans les résultats.
          </p>
          <div className="window__group">Transaction</div>
          <div className="row-item">
            <StatusIcon state="done" /> Montant <span className="row-item__val">250 FCFA</span>
          </div>
          <div className="row-item">
            <StatusIcon state="done" /> Statut <span className="row-item__val">Validé</span>
          </div>
        </div>
      </div>
    </div>
  );
}
