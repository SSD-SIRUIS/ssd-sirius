"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

const FILTERS = [
  { key: "all", label: "Tout" },
  { key: "application", label: "Applications mobiles" },
  { key: "plateforme", label: "Plateformes web" },
  { key: "site", label: "Sites web" },
];

// Onglets de filtre par type de projet ; seuls les onglets non vides s'affichent.
export default function RealisationsGrid({ projects }) {
  const [filter, setFilter] = useState("all");

  const available = useMemo(
    () => FILTERS.filter((f) => f.key === "all" || projects.some((p) => p.type === f.key)),
    [projects]
  );

  const visible = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      {available.length > 2 && (
        <div className="tabs" role="group" aria-label="Filtrer les réalisations">
          {available.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="stories">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
