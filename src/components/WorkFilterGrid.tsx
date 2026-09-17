"use client";

import { useMemo, useState } from "react";
import { WorkGrid } from "@/components/WorkGrid";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const ALL = "All";

export function WorkFilterGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(ALL);

  /* Categories in first-appearance order, deduped */
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const project of projects) {
      if (project.category && !seen.includes(project.category)) {
        seen.push(project.category);
      }
    }
    return [ALL, ...seen];
  }, [projects]);

  const filtered = useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((p) => p.category === active),
    [projects, active],
  );

  return (
    <>
      {categories.length > 2 && (
        <nav
          className="flex flex-wrap items-center"
          style={{ gap: "8px", marginBottom: "clamp(28px, 6vw, 48px)" }}
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex cursor-pointer items-center transition-colors duration-200",
                  isActive
                    ? "bg-white text-[#0e0e0e] border-white"
                    : "bg-transparent text-white/85 border-white/25 hover:bg-white/10 hover:border-white/50",
                )}
                style={{
                  fontSize: "clamp(14px, 3.4vw, 16px)",
                  lineHeight: 1,
                  padding: "10px 16px",
                  borderRadius: "33px",
                  borderWidth: "1.6px",
                  borderStyle: "solid",
                }}
              >
                {category}
              </button>
            );
          })}
        </nav>
      )}

      <WorkGrid
        key={active}
        projects={filtered}
        emptyMessage={`No ${active.toLowerCase()} projects to show yet.`}
      />
    </>
  );
}
