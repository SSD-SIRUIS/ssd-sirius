"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import MockShot from "@/components/MockShot";

// Galerie responsive avec visionneuse simple (clavier + fermeture).
export default function ProjectGallery({ items = [], phone = false }) {
  const [active, setActive] = useState(null);
  if (!items.length) return null;

  const shots = items.map((it) =>
    it.url ? { src: it.url, alt: it.alt || it.label, label: it.alt || it.label } : { tone: it.tone, label: it.label }
  );

  return (
    <>
      <div className={`gallery ${phone ? "gallery--phones" : ""}`}>
        {shots.map((shot, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            style={{ background: "none", border: 0, padding: 0, cursor: "zoom-in", textAlign: "left" }}
            aria-label={`Agrandir : ${shot.label || `visuel ${i + 1}`}`}
          >
            <MockShot {...shot} phone={phone} />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi"
          onClick={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActive(null);
            if (e.key === "ArrowRight") setActive((v) => (v + 1) % shots.length);
            if (e.key === "ArrowLeft") setActive((v) => (v - 1 + shots.length) % shots.length);
          }}
          tabIndex={-1}
          ref={(el) => el?.focus()}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "var(--overlay-bg)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            padding: "clamp(16px, 5vw, 60px)",
          }}
        >
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            style={{ position: "absolute", top: 20, right: 20 }}
            onClick={() => setActive(null)}
          >
            Fermer <Icon name="X" />
          </button>
          <div style={{ width: "min(900px, 100%)" }} onClick={(e) => e.stopPropagation()}>
            <MockShot {...shots[active]} phone={phone} />
            <p className="muted text-center" style={{ marginTop: 14 }}>
              {shots[active].label} — {active + 1} / {shots.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
