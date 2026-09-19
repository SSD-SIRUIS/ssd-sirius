"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import MockShot from "@/components/MockShot";

// Galerie de captures avec visionneuse (Échap pour fermer, flèches pour naviguer).
export default function ProjectGallery({ items = [], phone = false }) {
  const [active, setActive] = useState(null);
  const count = items.length;

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((v) => (v + 1) % count);
      if (e.key === "ArrowLeft") setActive((v) => (v - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, count]);

  if (!count) return null;

  const shots = items.map((it) => ({
    src: it.url || "",
    tone: it.tone,
    label: it.label || it.alt || "",
    alt: it.alt || it.label || "",
  }));

  return (
    <>
      <div className={`gallery ${phone ? "gallery--phones" : ""}`}>
        {shots.map((shot, i) => (
          <button
            key={i}
            type="button"
            className="gallery__item"
            onClick={() => setActive(i)}
            aria-label={`Agrandir : ${shot.label || `visuel ${i + 1}`}`}
          >
            <MockShot {...shot} phone={phone} />
            {shot.label && <span>{shot.label}</span>}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="btn btn--secondary btn--sm lightbox__close"
            onClick={() => setActive(null)}
            autoFocus
          >
            Fermer <Icon name="X" />
          </button>
          <div
            className={`lightbox__inner ${phone ? "lightbox__inner--phone" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <MockShot {...shots[active]} phone={phone} />
            <p className="lightbox__caption">
              {shots[active].label} — {active + 1} / {count}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
