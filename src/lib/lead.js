// ------------------------------------------------------------------
// Acheminement d'une demande de contact — partagé par le formulaire
// (navigateur) et par la route /api/leads (serveur).
//
// POURQUOI L'ENVOI PART DU NAVIGATEUR
// Formspree classe les soumissions avec un filtre anti-spam qui s'appuie sur
// le contexte de la requête : en-tête Referer, adresse IP, user-agent. Une
// requête émise par le serveur Next.js n'a rien de tout cela — pas de Referer
// du domaine, une IP de centre de données, un user-agent Node. Elle ressemble
// à un robot, et finit en spam : c'est ce qui est arrivé aux deux premières
// soumissions de test.
//
// Envoyée depuis la page, la requête porte le Referer du site, l'IP réelle du
// visiteur et son vrai navigateur. C'est aussi l'usage documenté par Formspree,
// dont l'extrait d'intégration est un simple <form action="...">.
// La route serveur ne sert plus que de repli et d'archivage.
// ------------------------------------------------------------------

// L'identifiant Formspree n'est pas un secret : il figure normalement en clair
// dans l'attribut `action` du formulaire HTML.
export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mzezdroe";

/** Normalise et tronque les champs reçus du formulaire. */
export function normaliserLead(source) {
  const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
  return {
    name: clip(source.name, 120),
    email: clip(source.email, 160),
    phone: clip(source.phone, 40),
    company: clip(source.company, 160),
    message: clip(source.message, 4000),
    projectSlug: clip(source.project_slug ?? source.projectSlug, 120),
  };
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Renvoie un message d'erreur, ou "" si la demande est valide. */
export function validerLead(lead) {
  if (lead.name.length < 2) return "Merci d'indiquer votre nom.";
  if (!EMAIL_RE.test(lead.email)) return "L'adresse e-mail semble invalide.";
  if (lead.message.length < 10)
    return "Votre message doit contenir au moins 10 caractères.";
  return "";
}

/** Corps JSON attendu par Formspree. Les clés deviennent les libellés du mail.
 *  `cc` : adresses supplémentaires, séparées par des virgules. Le champ est
 *  omis si elle est vide — et `_cc` dépend du plan Formspree, donc le réglage
 *  fiable reste la liste des destinataires du tableau de bord. */
export function payloadFormspree(lead, cc = "") {
  // L'objet doit se lire dans une liste d'e-mails sans ouvrir le message.
  const sujet = lead.projectSlug
    ? `Site Sirius — ${lead.name} à propos de ${lead.projectSlug}`
    : `Site Sirius — ${lead.name} (nouveau projet)`;

  return {
    // `email` sert de répondre-à côté Formspree.
    email: lead.email,
    _replyto: lead.email,
    _subject: sujet,
    ...(cc ? { _cc: cc } : {}),
    Nom: lead.name,
    "E-mail": lead.email,
    Téléphone: lead.phone || "—",
    "Entreprise / organisation": lead.company || "—",
    "Projet concerné": lead.projectSlug || "Nouveau projet / autre",
    Message: lead.message,
  };
}

/** Envoie la demande à Formspree. Lève une erreur en cas d'échec. */
export async function envoyerAFormspree(lead, { signal, cc = "" } = {}) {
  const reponse = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payloadFormspree(lead, cc)),
    signal,
  });

  if (!reponse.ok) {
    const detail = await reponse.text().catch(() => "");
    throw new Error(`Formspree a répondu ${reponse.status} ${detail.slice(0, 200)}`);
  }
}
