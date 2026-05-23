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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stage = stageRef.current;
    if (!section || !title || !stage) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const dots = dotsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

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

    gsap.set(cards[0], { yPercent: 0, opacity: 1, scale: 1 });
    for (let i = 1; i < cards.length; i++) {
      gsap.set(cards[i], { yPercent: 100, opacity: 0, scale: 0.92 });
    }

    const setDot = (idx: number) => {
      dots.forEach((dot, i) => {
        if (!dot) return;
        const active = i === idx;
        dot.style.width = active ? "32px" : "12px";
        dot.style.backgroundColor = active
          ? "rgba(255,255,255,0.85)"
          : "rgba(255,255,255,0.25)";
      });
    };
    setDot(0);

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: () => `+=${(cards.length - 1) * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            cards.length - 1,
            Math.round(self.progress * (cards.length - 1))
          );
          setDot(idx);
        },
      },
    });

    for (let i = 1; i < cards.length; i++) {
      tl.to(
        cards[i - 1],
        { yPercent: -30, opacity: 0, scale: 0.95 },
        i - 1
      ).to(
        cards[i],
        { yPercent: 0, opacity: 1, scale: 1 },
        i - 1
      );
    }

    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
      titleTween.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ zIndex: 2 }}
    >
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

      <div ref={stageRef} className="relative h-screen overflow-hidden">
        <div className="container mx-auto h-full px-6 flex items-center">
          <div
            className="relative w-full"
            style={{ height: "min(580px, 80vh)" }}
          >
            {services.map((s, i) => (
              <div
                key={s.heading}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
              >
                <ServicePanel {...s} />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {services.map((s, i) => (
            <span
              key={s.heading}
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              className="block h-[3px] rounded-full"
              style={{
                width: "12px",
                backgroundColor: "rgba(255,255,255,0.25)",
                transition: "width 0.4s ease, background-color 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
