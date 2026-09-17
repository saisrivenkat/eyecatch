"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

interface ServicePanelData {
  heading: string;
  tags: string[];
  description: string;
  image: string;
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
    image: "/images/design-development.png",
  },
  {
    heading: "Branding",
    tags: ["Brand strategy", "Tone of voice", "Visual identity"],
    description:
      "Building brands that cut through the noise. Bold identities that claim their space.",
    image: "/images/branding.png",
  },
  {
    heading: "Digital Marketing",
    tags: ["SEO & content marketing", "Social media", "Paid media"],
    description:
      "Strategic marketing that meets your audience where they are. Data driven, creatively led, results oriented.",
    image: "/images/digital-marketing.png",
  },
];

/* ---------------------------------------------------------------------------
 * Desktop panel — text left, image right, inside the pinned card stack.
 * ------------------------------------------------------------------------ */
function ServicePanel({ heading, tags, description, image }: ServicePanelData) {
  return (
    <div className="relative flex h-full overflow-hidden">
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
      <div className="relative z-2 flex flex-1 flex-col justify-between p-[50px] pl-[70px]">
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
      <div className="relative z-2 flex-1 overflow-hidden">
        <Image
          src={image}
          alt={heading}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Compact card — used below `lg`, where pinning a full-height stack leaves no
 * room for the content and fights the touch scroller. Image on top, copy below,
 * each card revealing on scroll instead of scrubbing.
 * ------------------------------------------------------------------------ */
function ServiceCard({
  service,
  index,
  total,
}: {
  service: ServicePanelData;
  index: number;
  total: number;
}) {
  return (
    <ScrollReveal distance={50} duration={0.8} delay={0.05}>
      <article
        className="group relative overflow-hidden border border-white/10"
        style={{ backgroundColor: "#1a1a1a", borderRadius: "26px" }}
      >
        <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
          <Image
            src={service.image}
            alt={service.heading}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0.35) 35%, rgba(26,26,26,0) 70%)",
            }}
          />
          <span
            className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-white/85 backdrop-blur-md"
            style={{ fontSize: "11px", letterSpacing: "1.5px" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div style={{ padding: "clamp(20px, 5.5vw, 34px)" }}>
          <h3
            className="font-normal text-white"
            style={{
              fontSize: "clamp(30px, 7.5vw, 52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            {service.heading}
          </h3>

          <p
            className="mt-4 text-white/75"
            style={{ fontSize: "clamp(15px, 3.8vw, 18px)", lineHeight: 1.5 }}
          >
            {service.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/20 text-white/80"
                style={{
                  fontSize: "12px",
                  lineHeight: 1,
                  padding: "9px 14px",
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    /* The pinned scrub stack is a desktop-only affordance. Below `lg` the stage
       is display:none, so ScrollTrigger would measure a zero-height element and
       pin nothing — matchMedia keeps the whole timeline out of that range and
       rebuilds it cleanly when the viewport crosses the breakpoint. */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const stage = stageRef.current;
      if (!section || !title || !stage) return;

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (cards.length === 0) return;

      gsap.to(title, {
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
        tl.to(cards[i - 1], { yPercent: -30, opacity: 0, scale: 0.95 }, i - 1).to(
          cards[i],
          { yPercent: 0, opacity: 1, scale: 1 },
          i - 1
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ zIndex: 2 }}>
      {/* `lg:contents` dissolves the padded wrapper on desktop so the heading is
          a direct child of the section again and GSAP can pin it as before. */}
      <div className="container lg:contents">
        <h2
          ref={titleRef}
          className="flex items-center pt-[clamp(72px,16vw,112px)] pb-[clamp(32px,8vw,56px)] text-white lg:h-screen lg:justify-center lg:py-0"
          style={{
            fontSize: "clamp(40px, 9vw, 150px)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}
        >
          Our Services
        </h2>
      </div>

      {/* Below lg — plain vertical flow, no pinning, no scrub */}
      <div className="lg:hidden">
        <div
          className="container flex flex-col"
          style={{
            gap: "clamp(24px, 6vw, 40px)",
            paddingBottom: "clamp(24px, 6vw, 40px)",
          }}
        >
          {services.map((s, i) => (
            <ServiceCard
              key={s.heading}
              service={s}
              index={i}
              total={services.length}
            />
          ))}
        </div>
      </div>

      {/* lg and up — the pinned card stack */}
      <div
        ref={stageRef}
        className="relative hidden h-screen overflow-hidden lg:block"
      >
        <div className="container mx-auto flex h-full items-center">
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
