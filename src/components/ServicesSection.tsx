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
    <div className="relative flex min-h-[580px] overflow-hidden max-lg:flex-col">
      <div
        className="absolute"
        style={{
          inset: "-45px",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const tweens: gsap.core.Tween[] = [];

    // "Our Services" parallax — scrubbed timeline for smooth motion
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
    tweens.push(titleTween);

    // Stacked card animation — scrubbed for smooth scaling/fading
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return;

      gsap.set(panel, { transformOrigin: "center top", force3D: true, willChange: "transform, opacity" });

      const tween = gsap.to(panel, {
        scale: 0.8,
        opacity: 0,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: panel,
          start: "top 30px",
          end: () => `+=${panel.offsetHeight + 250}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0e0e0e]" style={{ zIndex: 2, paddingBottom: "40px" }}>
      {/* Our Services title — centered, parallax fades out on scroll */}
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
