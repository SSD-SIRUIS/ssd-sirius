"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { envoyerAFormspree, normaliserLead, validerLead } from "@/lib/lead";

export default function ContactForm({ projects = [], defaultProject = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    project_slug: defaultProject,
    website: "", // honeypot
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Archivage dans Supabase pour /admin/leads. L'e-mail étant déjà parti,
  // un échec ici ne regarde pas le visiteur : on n'attend même pas la réponse.
  function archiverEnArrierePlan(donnees) {
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...donnees, archive_only: true }),
      keepalive: true,
    }).catch(() => {});
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Honeypot : un robot remplit ce champ. On simule l'envoi sans rien faire.
    if (form.website) {
      setStatus("success");
      return;
    }

    const lead = normaliserLead(form);
    const probleme = validerLead(lead);
    if (probleme) {
      setStatus("error");
      setError(probleme);
      return;
    }

    setStatus("loading");
    setError("");

    let envoye = false;
    try {
      // Canal principal : envoi direct depuis le navigateur. C'est ce qui
      // donne à Formspree le contexte dont son filtre anti-spam a besoin.
      await envoyerAFormspree(lead);
      envoye = true;
      archiverEnArrierePlan(form);
    } catch (errDirect) {
      // Repli : la requête tierce a pu être bloquée (extension, réseau
      // d'entreprise). La route serveur retente et archive.
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Envoi impossible pour le moment.");
        envoye = true;
      } catch (errRepli) {
        setStatus("error");
        setError(errRepli.message);
        return;
      }
    }

    if (envoye) {
      setStatus("success");
      setForm((f) => ({
        ...f,
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      }));
    }
  }

  if (status === "success") {
    return (
      <div className="panel" style={{ padding: 28 }}>
        <span className="icon-orbit">
          <Icon name="CheckCircle2" />
        </span>
        <h3 className="h3" style={{ marginTop: 16 }}>
          Demande envoyée
        </h3>
        <p className="muted" style={{ marginTop: 8 }}>
          Merci, votre message est bien arrivé. L'équipe SSD Sirius vous recontacte rapidement.
        </p>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          style={{ marginTop: 18 }}
          onClick={() => setStatus("idle")}
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form className="panel" style={{ padding: "clamp(20px, 3vw, 32px)" }} onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Nom complet *</label>
          <input id="cf-name" value={form.name} onChange={update("name")} autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="cf-email">E-mail *</label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-phone">Téléphone</label>
          <input
            id="cf-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            autoComplete="tel"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-company">Entreprise / organisation</label>
          <input id="cf-company" value={form.company} onChange={update("company")} autoComplete="organization" />
        </div>
      </div>

      {projects.length > 0 && (
        <div className="field">
          <label htmlFor="cf-project">Projet concerné</label>
          <select id="cf-project" value={form.project_slug} onChange={update("project_slug")}>
            <option value="">Nouveau projet / autre</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor="cf-message">Votre projet *</label>
        <textarea
          id="cf-message"
          value={form.message}
          onChange={update("message")}
          placeholder="Décrivez votre besoin, vos objectifs et vos délais."
          required
        />
      </div>

      {/* Honeypot anti-spam — ne pas remplir */}
      <div className="field--hp" aria-hidden="true">
        <label htmlFor="cf-website">Site web</label>
        <input
          id="cf-website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      {status === "error" && (
        <p className="form-note form-note--err" style={{ marginBottom: 16 }}>
          {error}
        </p>
      )}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            Envoi en cours
            <Icon name="Loader2" className="spin" />
          </>
        ) : (
          <>
            Envoyer ma demande
            <Icon name="Send" />
          </>
        )}
      </button>

      <p className="muted" style={{ fontSize: "0.78rem", marginTop: 14 }}>
        Vos informations servent uniquement à traiter votre demande. Voir les{" "}
        <a href="/mentions-legales" style={{ textDecoration: "underline" }}>
          mentions légales
        </a>
        .
      </p>
    </form>
  );
}
