// Illustrations isométriques en fil de fer, générées par projection.
// Chaque boîte est dessinée par ses faces visibles (dessus, droite, gauche),
// remplies de la couleur du fond pour masquer les arêtes cachées :
// on obtient un rendu « fil de fer » propre sans calcul d'occlusion.
// Les couleurs viennent des variables CSS (--fig-*), donc du thème.

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

// Projection isométrique : x vers la droite-bas, y vers la gauche-bas, z vers le haut.
const project = (x, y, z) => [(x - y) * COS, (x + y) * SIN - z];

const polygon = (points) =>
  points.map(([x, y, z], i) => {
    const [px, py] = project(x, y, z);
    return `${i ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)}`;
  }).join(" ") + " Z";

function boxFaces({ x, y, z, w, d, h }) {
  return {
    top: [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]],
    right: [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]],
    left: [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]],
  };
}

// Cercle posé sur un plan horizontal, échantillonné puis projeté.
function ring(cx, cy, z, r, steps = 72) {
  const pts = Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, z];
  });
  return polygon(pts);
}

// Étoile Sirius (même tracé que le logo) couchée sur le dessus d'une plaque.
const STAR = [
  ["M", 50, 14],
  ["C", 52.6, 37, 63, 47.4, 86, 50],
  ["C", 63, 52.6, 52.6, 63, 50, 86],
  ["C", 47.4, 63, 37, 52.6, 14, 50],
  ["C", 37, 47.4, 47.4, 37, 50, 14],
];

function star(cx, cy, z, scale) {
  const toWorld = (px, py) => {
    const u = (px - 50) * scale;
    const v = (py - 50) * scale;
    // Rotation de 45° : les branches pointent vers les coins de la plaque,
    // donc vers le haut, le bas, la gauche et la droite de l'écran.
    const r = Math.SQRT1_2;
    return project(cx + (u - v) * r, cy + (u + v) * r, z);
  };
  return STAR.map(([cmd, ...n]) => {
    const pts = [];
    for (let i = 0; i < n.length; i += 2) {
      const [px, py] = toWorld(n[i], n[i + 1]);
      pts.push(`${px.toFixed(2)} ${py.toFixed(2)}`);
    }
    return cmd + pts.join(" ");
  }).join(" ") + " Z";
}

// Petit rectangle inscrit sur le dessus d'une boîte (fente, pictogramme).
function inset({ x, y, z, w, d, h }, mx, my) {
  const t = z + h;
  return polygon([[x + mx, y + my, t], [x + w - mx, y + my, t], [x + w - mx, y + d - my, t], [x + mx, y + d - my, t]]);
}

/* ---------------------------------------------------------------- scènes */
// Chaque boîte peut porter ses propres motifs (marks), peints juste après
// elle : une boîte plus proche les recouvre correctement. `under` est peint
// avant toutes les boîtes (ombre au sol, trame).

function layersScene() {
  const size = 120;
  const boxes = Array.from({ length: 6 }, (_, i) => ({ x: 0, y: 0, z: i * 18, w: size, d: size, h: 7 }));
  const top = boxes[boxes.length - 1];
  const tz = top.z + top.h;
  top.marks = [
    { d: ring(size / 2, size / 2, tz, 40), cls: "iso-mark" },
    { d: ring(size / 2, size / 2, tz, 34), cls: "iso-dash" },
    { d: star(size / 2, size / 2, tz, 0.78), cls: "iso-mark--fill" },
  ];
  return { boxes, under: [] };
}

function modulesScene() {
  const s = 56;
  const g = 68;
  const boxes = [
    { x: 0, y: 0, z: 26, w: s, d: s, h: s },
    { x: g + 4, y: -2, z: 4, w: s, d: s, h: s },
    { x: -2, y: g + 6, z: 12, w: s, d: s, h: s },
    { x: g + 2, y: g + 2, z: -14, w: s, d: s, h: s },
  ];
  boxes[0].marks = [{ d: inset(boxes[0], 20, 20), cls: "iso-mark" }];
  boxes[1].marks = [{ d: inset(boxes[1], 14, 24), cls: "iso-dash" }];
  boxes[2].marks = [{ d: inset(boxes[2], 22, 16), cls: "iso-mark" }];
  boxes[3].marks = [{ d: star(boxes[3].x + s / 2, boxes[3].y + s / 2, boxes[3].z + s, 0.2), cls: "iso-mark--fill" }];
  return { boxes, under: [] };
}

function releasesScene() {
  const heights = [132, 116, 100, 86, 72, 60, 49, 39, 30, 22];
  const boxes = heights.map((h, i) => ({ x: i * 15, y: 0, z: 0, w: 3, d: 66, h }));
  return {
    boxes,
    under: [{ d: polygon([[-8, -8, 0], [150, -8, 0], [150, 74, 0], [-8, 74, 0]]), cls: "iso-dash" }],
  };
}

const SCENES = { layers: layersScene, modules: modulesScene, releases: releasesScene };

const Mark = ({ m }) => <path d={m.d} className={m.cls} vectorEffect="non-scaling-stroke" />;

export default function IsoFigure({ variant = "layers", title }) {
  const scene = (SCENES[variant] || layersScene)();

  // Ordre du peintre : du plus lointain au plus proche, puis de bas en haut.
  const ordered = [...scene.boxes].sort((a, b) => a.x + a.y - (b.x + b.y) || a.z - b.z);

  // Cadrage automatique sur l’ensemble des points projetés.
  const pts = [];
  for (const b of scene.boxes) {
    const f = boxFaces(b);
    for (const pt of [...f.top, ...f.right, ...f.left]) pts.push(project(...pt));
  }
  const xs = pts.map((q) => q[0]);
  const ys = pts.map((q) => q[1]);
  const pad = 12;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) - minX + pad;
  const h = Math.max(...ys) - minY + pad;

  return (
    <svg
      viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {scene.under.map((m, i) => <Mark key={`u${i}`} m={m} />)}
      {ordered.map((b, i) => {
        const f = boxFaces(b);
        return (
          <g key={i}>
            <path d={polygon(f.left)} className="iso-face" vectorEffect="non-scaling-stroke" />
            <path d={polygon(f.right)} className="iso-face" vectorEffect="non-scaling-stroke" />
            <path d={polygon(f.top)} className="iso-face iso-face--top" vectorEffect="non-scaling-stroke" />
            {(b.marks || []).map((m, j) => <Mark key={j} m={m} />)}
          </g>
        );
      })}
    </svg>
  );
}
