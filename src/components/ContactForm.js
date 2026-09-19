"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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

  function validate() {
    if (form.name.trim().length < 2) return "Merci d'indiquer votre nom.";
    if (!EMAIL_RE.test(form.email)) return "L'adresse e-mail semble invalide.";
    if (form.message.trim().length < 10)
      return "Votre message doit contenir au moins 10 caractères.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setStatus("error");
      setError(v);
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Envoi impossible pour le moment.");
      setStatus("success");
      setForm((f) => ({
        ...f,
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      }));
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  if (status === "success") {
    return (
      <div className="panel panel--pad success" role="status">
        <Icon name="CheckCircle2" />
        <h3 className="title-3">Demande envoyée</h3>
        <p className="muted">
          Merci, votre message est bien arrivé. L'équipe SSD Sirius vous recontacte rapidement.
        </p>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          style={{ marginTop: 8 }}
          onClick={() => setStatus("idle")}
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form className="panel panel--pad" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Nom complet</label>
          <input id="cf-name" value={form.name} onChange={update("name")} autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="cf-email">E-mail</label>
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
        <label htmlFor="cf-message">Votre projet</label>
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

      <p className="form-legal">
        Vos informations servent uniquement à traiter votre demande. Voir les{" "}
        <a href="/mentions-legales">
          mentions légales
        </a>
        .
      </p>
    </form>
  );
}
