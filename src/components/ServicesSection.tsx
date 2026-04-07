"use client";

import { useEffect, useRef } from "react";
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
    heading: "Web design & development",
    tags: [
      "Creative web design",
      "Web development",
      "Copywriting",
      "E-Commerce",
      "WordPress",
    ],
    description:
      "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
    video: "/videos/homepage.mp4",
  },
  {
    heading: "Branding",
    tags: ["Brand strategy", "Tone of voice", "Visual identity"],
    description:
      "Building brands that cut through the noise. Bold identities that own their space and make competitors nervous.",
    video: "/videos/homepage.mp4",
  },
  {
    heading: "Digital Marketing",
    tags: ["SEO", "Content marketing", "Social media", "Paid media"],
    description:
      "Strategic marketing that puts your brand where your audience actually is. Data-driven, creatively led, results-obsessed.",
    video: "/videos/homepage.mp4",
  },
];

function ServicePanel({ heading, tags, description, video }: ServicePanelData) {
  return (
    <div className="relative flex min-h-[580px] overflow-hidden max-lg:flex-col">
      <div
        className="absolute bg-white"
        style={{
          inset: "-45px",
          borderRadius: "64px",
          zIndex: 1,
        }}
      />
      <div className="relative z-2 flex flex-1 flex-col justify-between p-8 md:p-[50px] md:pl-[70px]">
        <div>
          <h3
            className="font-normal leading-none text-black"
            style={{ fontSize: "clamp(48px, 7vw, 101px)" }}
          >
            {heading}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-black/20 px-4 py-2 text-[13px] text-black"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-[500px] text-[20px] leading-[28px] text-black">
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const triggers: ScrollTrigger[] = [];

    // "Our Services" parallax — scrolls away with parallax as you continue
    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=600",
      pin: title,
      pinSpacing: false,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(title, {
          opacity: 1 - p * 1.5,
          y: -p * 200,
        });
      },
    });
    triggers.push(titleTrigger);

    // Stacked card animation
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return;

      const st = ScrollTrigger.create({
        trigger: panel,
        start: "top 30px",
        end: () => `+=${panel.offsetHeight + 250}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 - progress * 0.2;
          const opacity = 1 - progress;
          gsap.set(panel, {
            scale,
            opacity,
            transformOrigin: "center top",
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#efefef]" style={{ zIndex: 2, paddingBottom: "40px" }}>
      {/* Our Services title — centered, parallax fades out on scroll */}
      <h2
        ref={titleRef}
        className="flex items-center justify-center text-black"
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

      {/* Service cards */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col">
          {services.map((service, i) => (
            <div
              key={service.heading}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="mb-6"
            >
              <ServicePanel {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
