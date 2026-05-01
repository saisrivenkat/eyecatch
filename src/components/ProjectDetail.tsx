"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  fontWeight: 500,
};

/* Hook: fire `visible=true` once when element scrolls into view */
function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* Render a string with per-character staggered entrance */
function StaggeredTitle({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="project-title-char"
          style={{ animationDelay: `${0.04 * i + 0.15}s` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const story = project.fullDescription ?? project.description;

  /* Reveal hooks for each major block */
  const meta = useReveal<HTMLDivElement>();
  const video = useReveal<HTMLDivElement>();
  const storyBlock = useReveal<HTMLDivElement>();
  const banner = useReveal<HTMLDivElement>();

  /* Scroll progress for the thin top bar */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(1, h.scrollTop / total) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Marquee text — title repeated */
  const marqueeText = `${project.title} • ${project.category} • `;
  const marqueeRow = marqueeText.repeat(8);

  return (
    <div className="relative text-white">
      {/* Scroll progress bar */}
      <div
        className="fixed left-0"
        style={{
          top: 0,
          width: "100%",
          height: "2px",
          backgroundColor: "rgba(255,255,255,0.04)",
          zIndex: 40,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: "rgba(255,255,255,0.85)",
            transition: "width 0.08s linear",
          }}
        />
      </div>

      {/* ----------- HERO ----------- */}
      <section
        className="relative w-full"
        style={{
          paddingTop: "180px",
          paddingBottom: "100px",
        }}
      >
        <div className="container">
          <p
            className="text-white/55 project-fade-up"
            style={{
              ...eyebrowStyle,
              marginBottom: "32px",
              animationDelay: "0.1s",
            }}
          >
            EyeCatch &nbsp;&middot;&nbsp; Case study &nbsp;&mdash;&nbsp;{" "}
            {project.category}
          </p>

          {/* Big animated title */}
          <h1
            className="text-white"
            style={{
              fontSize: "clamp(56px, 11vw, 184px)",
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              perspective: "800px",
            }}
          >
            <StaggeredTitle text={project.title} />
          </h1>

          {/* hairline that draws in under the title */}
          <div
            className="project-line-extend"
            style={{
              height: "1px",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.12)",
              marginTop: "60px",
              animationDelay: `${0.04 * project.title.length + 0.4}s`,
            }}
          />
        </div>
      </section>

      {/* ----------- MARQUEE STRIP ----------- */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          padding: "28px 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <div
          className="project-marquee whitespace-nowrap"
          style={{
            fontSize: "clamp(28px, 4vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.015em",
            color: "rgba(255,255,255,0.22)",
          }}
          aria-hidden
        >
          <span style={{ paddingRight: "60px" }}>{marqueeRow}</span>
          <span style={{ paddingRight: "60px" }}>{marqueeRow}</span>
        </div>
      </section>

      {/* ----------- META GRID ----------- */}
      <section
        ref={meta.ref}
        className="relative w-full"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="container">
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ minHeight: "120px" }}
          >
            <MetaCell
              label="Discipline"
              value={project.category}
              visible={meta.visible}
              delay={0}
            />
            <MetaCell
              label="Services"
              value={
                project.services && project.services.length > 0
                  ? project.services.join(" · ")
                  : "Brand identity"
              }
              visible={meta.visible}
              delay={0.1}
              divider
            />
            <MetaCell
              label="Studio"
              value="EyeCatch — HYD / VJA"
              visible={meta.visible}
              delay={0.2}
              divider
            />
          </div>
        </div>
      </section>

      {/* ----------- VIDEO ----------- */}
      {project.videoSrc && (
        <section
          ref={video.ref}
          className="relative w-full"
          style={{
            backgroundColor: "rgba(10,10,10,0.55)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            className={video.visible ? "project-scale-in" : ""}
            style={{
              opacity: video.visible ? undefined : 0,
              animationDelay: "0.05s",
            }}
          >
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <video
                src={project.videoSrc}
                poster={project.videoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div
            className="container"
            style={{ padding: "20px 26px" }}
          >
            <span className="text-white/45" style={eyebrowStyle}>
              Reel &nbsp;&mdash;&nbsp; in motion
            </span>
          </div>
        </section>
      )}

      {/* ----------- STORY ----------- */}
      <section
        ref={storyBlock.ref}
        className="relative w-full"
        style={{
          padding: "160px 0",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: "880px", padding: "0 26px" }}
        >
          <p
            className={
              "text-white/45 " + (storyBlock.visible ? "project-fade-up" : "")
            }
            style={{
              ...eyebrowStyle,
              marginBottom: "40px",
              opacity: storyBlock.visible ? undefined : 0,
            }}
          >
            The brief
          </p>

          <p
            className={storyBlock.visible ? "project-fade-up" : ""}
            style={{
              fontSize: "clamp(26px, 3vw, 40px)",
              lineHeight: 1.32,
              fontWeight: 300,
              letterSpacing: "-0.012em",
              color: "rgba(255,255,255,0.95)",
              opacity: storyBlock.visible ? undefined : 0,
              animationDelay: "0.15s",
            }}
          >
            {story}
          </p>
        </div>
      </section>

      {/* ----------- BANNER ----------- */}
      {project.bannerImage && (
        <section
          ref={banner.ref}
          className="relative w-full"
          style={{
            backgroundColor: "rgba(10,10,10,0.55)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            className={banner.visible ? "project-scale-in" : ""}
            style={{
              opacity: banner.visible ? undefined : 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.bannerImage}
              alt={`${project.title} — campaign banner`}
              loading="lazy"
              className="block w-full h-auto"
            />
          </div>
          <div
            className="container"
            style={{ padding: "20px 26px" }}
          >
            <span className="text-white/45" style={eyebrowStyle}>
              Stills &nbsp;&mdash;&nbsp; on display
            </span>
          </div>
        </section>
      )}

      {/* ----------- TAIL: a single subtle return-to-work link ----------- */}
      <section
        className="relative w-full"
        style={{
          padding: "100px 0 120px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container flex items-center justify-between">
          <span className="text-white/35" style={eyebrowStyle}>
            End of case study
          </span>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-3 text-white/70 transition-colors duration-200 hover:text-white"
            style={eyebrowStyle}
          >
            All work
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function MetaCell({
  label,
  value,
  divider = false,
  visible,
  delay = 0,
}: {
  label: string;
  value: string;
  divider?: boolean;
  visible: boolean;
  delay?: number;
}) {
  return (
    <div
      className={visible ? "project-fade-up" : ""}
      style={{
        padding: "32px 0",
        borderLeft: divider ? "1px solid rgba(255,255,255,0.08)" : "none",
        paddingLeft: divider ? "32px" : "0",
        paddingRight: "32px",
        opacity: visible ? undefined : 0,
        animationDelay: `${delay}s`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p
        className="text-white/40"
        style={{
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {label}
      </p>
      <p
        className="text-white"
        style={{
          fontSize: "17px",
          lineHeight: 1.4,
          fontWeight: 400,
        }}
      >
        {value}
      </p>
    </div>
  );
}
