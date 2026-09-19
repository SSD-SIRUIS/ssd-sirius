// Symbole Sirius : anneau et étoile à quatre branches.
// Monochrome, il prend la couleur du texte (currentColor) et s'adapte
// donc tout seul aux thèmes clair et sombre.

export default function SiriusMark({ size = 20, title = "SSD Sirius", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
    >
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" />
      <path
        d="M50 14 C52.6 37 63 47.4 86 50 C63 52.6 52.6 63 50 86 C47.4 63 37 52.6 14 50 C37 47.4 47.4 37 50 14 Z"
        fill="currentColor"
      />
    </svg>
  );
}
