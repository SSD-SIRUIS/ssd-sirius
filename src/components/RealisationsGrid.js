"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { PORTFOLIO_GROUPS, getPortfolioGroup } from "@/lib/portfolio";

const FILTERS = [
  { key: "all", label: "Tout" },
  { key: "application", label: "Applications mobiles" },
  { key: "plateforme", label: "Plateformes web" },
  { key: "site", label: "Sites web" },
];

// Onglets de filtre par type de projet ; seuls les onglets non vides s'affichent.
export default function RealisationsGrid({ projects }) {
  const [group, setGroup] = useState("all");
  const [filter, setFilter] = useState("all");

  const availableGroups = useMemo(
    () => PORTFOLIO_GROUPS.filter((g) => g.key === "all" || projects.some((p) => getPortfolioGroup(p) === g.key)),
    [projects]
  );
  const grouped = group === "all" ? projects : projects.filter((p) => getPortfolioGroup(p) === group);
  const available = useMemo(
    () => FILTERS.filter((f) => f.key === "all" || grouped.some((p) => p.type === f.key)),
    [grouped]
  );

  const visible = filter === "all" ? grouped : grouped.filter((p) => p.type === filter);

  return (
    <>
      {availableGroups.length > 1 && (
        <div className="portfolio-filters" role="group" aria-label="Filtrer par nature du projet">
          {availableGroups.map((g) => (
            <button
              key={g.key}
              type="button"
              aria-pressed={group === g.key}
              onClick={() => { setGroup(g.key); setFilter("all"); }}
            >
              {g.label}
              <span>{g.key === "all" ? projects.length : projects.filter((p) => getPortfolioGroup(p) === g.key).length}</span>
            </button>
          ))}
        </div>
      )}
      {available.length > 1 && (
        <div className="tabs" role="group" aria-label="Filtrer par type de solution">
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

      <p className="portfolio-count mono" role="status" aria-live="polite" aria-atomic="true">
        {visible.length} {visible.length === 1 ? "fiche présentée" : "fiches présentées"}
      </p>
      <div className="stories portfolio-stories">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
