"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServicePanelData {
  heading: string;
  tags: string[];
  description: string;
  video: string;
}

const services: ServicePanelData[] = [
  {
    heading: "Design & Development",
    tags: [
      "Creative ideation",
      "Aesthetic and functional design",
      "Design development",
      "Copywriting",
      "E-Commerce",
    ],
    description:
      "Crafting digital experiences where aesthetics meets ROI — turning heads and unlocking revenue with every click.",
    video: "/videos/homepage.mp4",
  },
  {
    heading: "Branding",
    tags: ["Brand strategy", "Tone of voice", "Visual identity"],
    description:
      "Building brands that cut through the noise. Bold identities that claim their space.",
    video: "/videos/homepage.mp4",
  },
  {
    heading: "Digital Marketing",
    tags: ["SEO & content marketing", "Social media", "Paid media"],
    description:
      "Strategic marketing that meets your audience where they are. Data driven, creatively led, results oriented.",
    video: "/videos/homepage.mp4",
  },
];

function ServicePanel({ heading, tags, description, video }: ServicePanelData) {
  return (
    <div className="relative flex h-full overflow-hidden max-lg:flex-col">
      <div
        className="absolute"
        style={{
          inset: "-12px",
          borderRadius: "64px",
          zIndex: 1,
          backgroundColor: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      <div className="relative z-2 flex flex-1 flex-col justify-between p-8 md:p-[50px] md:pl-[70px]">
        <div>
          <h3
            className="font-normal leading-none text-white"
            style={{ fontSize: "clamp(48px, 7vw, 101px)" }}
          >
            {heading}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/20 px-4 py-2 text-[13px] text-white/80"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-[500px] text-[20px] leading-[28px] text-white/75">
          {description}
        </p>
      </div>
      <div className="relative z-2 flex-1">
        <video
          className="h-full w-full object-cover"
          src={video}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stage = stageRef.current;
    if (!section || !title || !stage) return;

    const triggers: ScrollTrigger[] = [];

    // "Our Services" parallax — fades up as the title leaves the viewport
    const titleTween = gsap.to(title, {
      opacity: 0,
      y: -200,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=600",
        pin: title,
        pinSpacing: false,
        scrub: 0.6,
      },
    });
    if (titleTween.scrollTrigger) triggers.push(titleTween.scrollTrigger);

    // Card stage — pin and snap so a single scroll tick lands on the next card.
    const cardCount = services.length;
    const stageTrigger = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: () => `+=${(cardCount - 1) * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      snap: {
        snapTo: 1 / (cardCount - 1),
        duration: { min: 0.3, max: 0.6 },
        ease: "power2.inOut",
        delay: 0.05,
      },
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (cardCount - 1));
        setActiveIdx(idx);
      },
      invalidateOnRefresh: true,
    });
    triggers.push(stageTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
      titleTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ zIndex: 2, backgroundColor: "rgba(0,0,0,0.2)" }}
    >
      {/* Our Services title — pinned at viewport center, fades out as you scroll */}
      <h2
        ref={titleRef}
        className="flex items-center justify-center text-white"
        style={{
          height: "100vh",
          fontSize: "clamp(48px, 9vw, 150px)",
          fontWeight: 400,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
        }}
      >
        Our Services
      </h2>

      {/* Pinned card stage — one scroll tick = one card */}
      <div ref={stageRef} className="relative h-screen overflow-hidden">
        <div className="container mx-auto h-full px-6 flex items-center">
          <div
            className="relative w-full"
            style={{ height: "min(580px, 80vh)" }}
          >
            {services.map((s, i) => {
              const offset = i - activeIdx;
              const isActive = offset === 0;
              return (
                <div
                  key={s.heading}
                  className="absolute inset-0 will-change-transform"
                  style={{
                    transform: isActive
                      ? "translate3d(0, 0, 0) scale(1)"
                      : `translate3d(0, ${
                          offset > 0 ? 100 : -80
                        }px, 0) scale(${offset > 0 ? 0.9 : 0.94})`,
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                    transition:
                      "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  <ServicePanel {...s} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Card pagination indicator */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {services.map((s, i) => (
            <span
              key={s.heading}
              className="block h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i === activeIdx ? "32px" : "12px",
                backgroundColor:
                  i === activeIdx
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
