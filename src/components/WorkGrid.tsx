"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Project } from "@/data/projects";

const REVEAL_STEP = 3;

function ProjectCardComponent({ project }: { project: Project }) {
  const isLarge = project.size === "large";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card group relative block overflow-hidden"
      style={{
        borderRadius: "16px",
        /* The covers are 1920x780 banners, and several put the logo hard against
           one edge. Matching the card to that exact ratio is the only way the
           art fills the card edge to edge with nothing cropped off — any taller
           box and object-cover starts eating the logo. Height follows width, so
           the card stays in proportion at every breakpoint. */
        aspectRatio: "1920 / 780",
        width: "100%",
      }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={isLarge ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
        priority={false}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Several covers are near-white artwork, so the caption needs a real
          ramp behind it rather than Tailwind's even two-stop fade. */}
      <div
        className="project-overlay absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.74) 32%, rgba(0,0,0,0.32) 62%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            opacity: 0.75,
            marginBottom: "8px",
          }}
        >
          {project.category}
        </p>
        <h3
          className="text-white"
          style={{
            fontSize: isLarge
              ? "clamp(26px, 4vw, 56px)"
              : "clamp(22px, 5.5vw, 26px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            marginBottom: "8px",
          }}
        >
          {project.title}
        </h3>
        {/* A banner-shaped card is short on a phone, so the blurb steps aside
            there and the category + title carry the card. */}
        <div className="hidden sm:block">
          <p
            className="line-clamp-2 text-white/80 xl:line-clamp-3"
            style={{
              fontSize: isLarge ? "clamp(15px, 3.6vw, 18px)" : "15px",
              lineHeight: 1.45,
              maxWidth: "640px",
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface WorkGridProps {
  projects: Project[];
  /** Max cards to render. Omit to render every project. */
  limit?: number;
  /** Where the "See more" button points. */
  moreHref?: string;
  /**
   * Force the "See more" button on or off. Omit to show it only when the
   * limit actually hides projects.
   */
  showMore?: boolean;
  /** Copy shown when there is nothing to render. */
  emptyMessage?: string;
}

export function WorkGrid({
  projects,
  limit,
  moreHref = "/work",
  showMore,
  emptyMessage = "No projects to show yet.",
}: WorkGridProps) {
  const visibleProjects =
    typeof limit === "number" ? projects.slice(0, limit) : projects;
  const hasMore = showMore ?? visibleProjects.length < projects.length;

  if (projects.length === 0) {
    return (
      <p
        className="text-white/55"
        style={{ fontSize: "15px", padding: "40px 0" }}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ gap: "clamp(14px, 3.5vw, 20px)" }}
      >
        {visibleProjects.map((project, i) => (
          <ScrollReveal
            key={project.slug}
            className={project.size === "large" ? "lg:col-span-2" : ""}
            delay={(i % REVEAL_STEP) * 0.05}
          >
            <ProjectCardComponent project={project} />
          </ScrollReveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center md:mt-14">
          <Link
            href={moreHref}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/5 md:px-7 md:py-3"
            style={{
              fontSize: "clamp(13px, 3.4vw, 14px)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            See more
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>
      )}
    </>
  );
}
