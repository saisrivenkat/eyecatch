"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

interface ProjectCard {
  title: string;
  year: string;
  description: string;
  tags: string[];
  video: string;
  size: "large" | "small";
}

const projects: ProjectCard[] = [
  {
    title: "UPP",
    year: "2025",
    description:
      "We crafted a cinematic web experience for a Hollywood powerhouse.",
    tags: ["Web design & development", "Agencies"],
    video: "/videos/Featured2-Compressed.mp4",
    size: "large",
  },
  {
    title: "The Goat Agency",
    year: "2025",
    description:
      "Influence everywhere: a future-ready website for The Goat Agency.",
    tags: ["Web design & development", "Agencies"],
    video: "/videos/GOAT-FeatureVideo.mp4",
    size: "small",
  },
  {
    title: "ISI Global",
    year: "2025",
    description:
      "We revamped this global design agency\u2019s digital identity.",
    tags: ["Branding", "Web design & development", "Agencies", "Retail"],
    video: "/videos/isi-vid2-1.mp4",
    size: "small",
  },
  {
    title: "Degroof Petercam",
    year: "2025",
    description:
      "A premium digital experience for Europe\u2019s leading private bank.",
    tags: ["Web design & development", "Finance"],
    video: "/videos/Featured2-Compressed.mp4",
    size: "large",
  },
  {
    title: "SIRCLO",
    year: "2024",
    description: "Powering e-commerce across Southeast Asia.",
    tags: ["Web design & development", "SaaS"],
    video: "/videos/GOAT-FeatureVideo.mp4",
    size: "small",
  },
];

function ProjectCardComponent({ project }: { project: ProjectCard }) {
  const isLarge = project.size === "large";

  return (
    <div
      className="project-card group relative overflow-hidden"
      style={{
        borderRadius: "16px",
        minHeight: isLarge ? "500px" : "400px",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={project.video} type="video/mp4" />
      </video>

      <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p style={{ fontSize: "20px", marginBottom: "8px", opacity: 0.7 }}>
          {project.year}
        </p>
        <h3
          style={{
            fontSize: isLarge ? "clamp(32px, 4vw, 60px)" : "26px",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {project.description}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "13px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "999px",
                padding: "6px 14px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkSection() {
  return (
    <section className="bg-black text-white" style={{ padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        <ScrollReveal distance={60}>
          <div style={{ marginBottom: "60px" }}>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>Our</p>
            <h2
              style={{
                fontSize: "clamp(48px, 7vw, 101px)",
                fontWeight: 400,
                lineHeight: 1.0,
                marginBottom: "40px",
              }}
            >
              Work
            </h2>

            <p
              style={{
                fontSize: "36px",
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: "20px",
                maxWidth: "700px",
              }}
            >
              Making brands a damn site better.
            </p>
            <p
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: 400,
                maxWidth: "700px",
                opacity: 0.7,
              }}
            >
              Let&apos;s face it, first impressions matter. Your website&apos;s an
              opportunity to wow your audience, so why choose bad design? Brands
              win over fans when they&apos;re brave enough to go beyond their
              creative comfort zone.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px" }}>
          {/* Row 1: large card full width */}
          <ScrollReveal className="md:col-span-2" delay={0}>
            <ProjectCardComponent project={projects[0]} />
          </ScrollReveal>

          {/* Row 2: two small cards */}
          <ScrollReveal delay={0.1}>
            <ProjectCardComponent project={projects[1]} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <ProjectCardComponent project={projects[2]} />
          </ScrollReveal>

          {/* Row 3: large card full width */}
          <ScrollReveal className="md:col-span-2" delay={0}>
            <ProjectCardComponent project={projects[3]} />
          </ScrollReveal>

          {/* Row 4: one small card */}
          <ScrollReveal delay={0}>
            <ProjectCardComponent project={projects[4]} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
