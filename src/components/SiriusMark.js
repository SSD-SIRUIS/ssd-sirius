// Symbole Sirius — version géométrique plate.
// Un carré au filet, une étoile à quatre branches à arêtes droites.
// Aucun dégradé, aucun halo : le signe tient par sa construction.

export default function SiriusMark({ size = 36, className = "", title = "SSD Sirius", withGlow = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
      data-glow={withGlow ? "" : undefined}
    >
      <rect x="2" y="2" width="96" height="96" fill="none" stroke="currentColor" strokeWidth="5" />
      {/* Étoile à quatre branches, arêtes rectilignes */}
      <path d="M50 16 L61 39 L84 50 L61 61 L50 84 L39 61 L16 50 L39 39 Z" fill="currentColor" />
    </svg>
  );
}

// Grand visuel de marque : le signe, posé sur un cadre, sans animation.
export function SiriusVisual() {
  return (
    <div className="sirius-visual" aria-hidden="true">
      <SiriusMark size={160} />
    </div>
  );
}
