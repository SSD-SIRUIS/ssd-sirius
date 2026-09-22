"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import MockShot from "@/components/MockShot";

// Galerie de captures avec visionneuse (Échap pour fermer, flèches pour naviguer).
export default function ProjectGallery({ items = [], phone = false }) {
  const [active, setActive] = useState(null);
  const count = items.length;
  const touchStart = useRef(null);

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

  // La visionneuse couvre l'écran : la page derrière ne doit plus défiler,
  // sinon on referme sur une position différente de celle qu'on avait quittée.
  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  // Au doigt, les flèches du clavier n'existent pas : le balayage est le
  // geste attendu pour passer d'une capture à l'autre.
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    const start = touchStart.current;
    if (!start) return;
    touchStart.current = null;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Un geste franc et horizontal, sinon c'est un tap ou un défilement
    // vertical — on ne veut pas changer d'image sur une hésitation.
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    setActive((v) => (dx < 0 ? (v + 1) % count : (v - 1 + count) % count));
  };

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
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
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
