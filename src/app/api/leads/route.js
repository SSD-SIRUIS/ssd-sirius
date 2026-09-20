import { NextResponse } from "next/server";
import { getSupabaseServer, getSupabaseService, hasSupabase } from "@/lib/supabase";
import { CONTACT } from "@/data/site";
import { envoyerAFormspree, normaliserLead, validerLead } from "@/lib/lead";

export const runtime = "nodejs";

// ------------------------------------------------------------------
// Route d'appoint du formulaire de contact.
//
// Le canal principal est l'envoi direct du navigateur vers Formspree
// (voir src/lib/lead.js : le filtre anti-spam de Formspree a besoin du
// contexte navigateur). Cette route couvre deux cas :
//
// 1. `archive_only: true` — l'e-mail est déjà parti depuis la page. On se
//    contente d'archiver dans Supabase pour /admin/leads. Un échec ici n'a
//    aucune conséquence visible : le message est arrivé.
// 2. Sans ce drapeau — repli : l'envoi depuis la page a échoué (réseau coupé,
//    bloqueur de publicités, requête tierce filtrée). On retente côté serveur.
//    Moins fiable vis-à-vis de l'anti-spam, mais préférable à perdre la demande.
//
// Si rien n'a pu être ni envoyé ni archivé, on renvoie une vraie erreur avec
// l'adresse e-mail : jamais de faux « message envoyé ».
// ------------------------------------------------------------------

// Copie de la notification vers d'autres adresses, séparées par des virgules.
// Vide = aucune copie. Le réglage fiable reste la liste des destinataires du
// tableau de bord Formspree ; cette variable n'en est qu'un complément.
const LEAD_NOTIFY_CC = (process.env.LEAD_NOTIFY_CC || "").trim();

/** Archive la demande dans Supabase. Ne lève pas : l'archivage est secondaire. */
async function archiverDansSupabase(lead) {
  const client = getSupabaseService() || getSupabaseServer();
  if (!client || !hasSupabase) return false;

  try {
    let project_id = null;
    if (lead.projectSlug) {
      const { data: proj } = await client
        .from("projects")
        .select("id")
        .eq("slug", lead.projectSlug)
        .maybeSingle();
      project_id = proj?.id || null;
    }

    const { error } = await client.from("leads").insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      company: lead.company || null,
      message: lead.message,
      project_id,
      source: "contact_form",
    });
    if (error) throw error;
    return true;
  } catch (e) {
    console.error("[leads] archivage Supabase échoué :", e.message);
    return false;
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un bot remplit ce champ. On répond « ok » sans rien traiter.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const lead = normaliserLead(body);
  const probleme = validerLead(lead);
  if (probleme) {
    return NextResponse.json({ error: probleme }, { status: 422 });
  }

  // --- Cas 1 : l'e-mail est déjà parti depuis la page, on archive seulement.
  if (body.archive_only) {
    const archive = await archiverDansSupabase(lead);
    return NextResponse.json({ ok: true, archived: archive });
  }

  // --- Cas 2 : repli serveur.
  try {
    await envoyerAFormspree(lead, {
      cc: LEAD_NOTIFY_CC,
      signal: AbortSignal.timeout(10000),
    });
  } catch (e) {
    console.error("[leads] repli serveur vers Formspree échoué :", e.message);
    const archive = await archiverDansSupabase(lead);
    if (!archive) {
      return NextResponse.json(
        {
          error: `Envoi impossible pour le moment. Écrivez-nous directement à ${CONTACT.email}.`,
        },
        { status: 502 }
      );
    }
    console.warn("[leads] demande archivée sans notification e-mail.");
    return NextResponse.json({ ok: true, notified: false });
  }

  await archiverDansSupabase(lead);
  return NextResponse.json({ ok: true, notified: true });
}
