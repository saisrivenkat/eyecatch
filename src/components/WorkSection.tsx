"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { projects, type Project } from "@/data/projects";

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

export function WorkSection() {
  return (
    <section
      className="bg-black text-white"
      style={{ padding: "120px 0", position: "relative", zIndex: 2 }}
    >
      <div className="container">
        <ScrollReveal distance={60}>
          <div style={{ marginBottom: "60px" }}>
            <p
              className="uppercase text-white/55"
              style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                marginBottom: "12px",
              }}
            >
              Related Projects
            </p>
            <h2
              style={{
                fontSize: "clamp(48px, 7vw, 101px)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "32px",
              }}
            >
              Brands we&apos;ve
              <br />
              shaped lately.
            </h2>
            <p
              className="text-white/70"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: 400,
                maxWidth: "700px",
              }}
            >
              From boardrooms to billboards — a few of the brands EyeCatch has
              helped position, name, and dress for the room they&rsquo;re walking
              into next.
            </p>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "20px" }}
        >
          {/* Row 1: large card full width */}
          <ScrollReveal className="md:col-span-2" delay={0}>
            <ProjectCardComponent project={projects[0]} />
          </ScrollReveal>

          {/* Row 2: two small cards */}
          <ScrollReveal delay={0.05}>
            <ProjectCardComponent project={projects[1]} />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ProjectCardComponent project={projects[2]} />
          </ScrollReveal>

          {/* Row 3: large card full width */}
          <ScrollReveal className="md:col-span-2" delay={0}>
            <ProjectCardComponent project={projects[3]} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
