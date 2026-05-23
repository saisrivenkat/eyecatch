"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Project } from "@/data/projects";

const INITIAL_VISIBLE = 3;
const REVEAL_STEP = 3;

function ProjectCardComponent({ project }: { project: Project }) {
  const isLarge = project.size === "large";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card group relative block overflow-hidden"
      style={{
        borderRadius: "16px",
        minHeight: isLarge ? "500px" : "400px",
      }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={isLarge ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
        priority={false}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: "10px",
          }}
        >
          {project.category}
        </p>
        <h3
          className="text-white"
          style={{
            fontSize: isLarge ? "clamp(32px, 4vw, 56px)" : "26px",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            marginBottom: "12px",
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-white/80"
          style={{
            fontSize: isLarge ? "18px" : "15px",
            lineHeight: 1.45,
            maxWidth: "640px",
          }}
        >
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  if (projects.length === 0) {
    return (
      <p
        className="text-white/55"
        style={{ fontSize: "15px", padding: "40px 0" }}
      >
        No projects to show yet.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px" }}>
        {visibleProjects.map((project, i) => (
          <ScrollReveal
            key={project.slug}
            className={project.size === "large" ? "md:col-span-2" : ""}
            delay={(i % REVEAL_STEP) * 0.05}
          >
            <ProjectCardComponent project={project} />
          </ScrollReveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((c) =>
                Math.min(projects.length, c + REVEAL_STEP),
              )
            }
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/5"
            style={{
              fontSize: "14px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            See more
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
            >
              &darr;
            </span>
          </button>
        </div>
      )}
    </>
  );
}
