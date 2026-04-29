"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01/",
    title: "Brand led. Strategy driven.",
    description:
      "Bespoke design that works. We build immersive, brand-led digital experiences that wow, spark emotion, and move people to act.",
    media:
      "linear-gradient(135deg, #2a2a2a 0%, #525252 45%, #a3a3a3 100%)",
  },
  {
    number: "02/",
    title: "Nail the process.",
    description:
      "Collaborative, decisive, clear from day one. You\u2019ll feel the momentum, know where you stand, and have a crew that knows when to lead and when to listen.",
    media:
      "linear-gradient(135deg, #0f0f0f 0%, #404040 50%, #8a8a8a 100%)",
  },
  {
    number: "03/",
    title: "Build to flex.",
    description:
      "Ready for your growth. Whether it\u2019s a new campaign, product, or pivot, we ensure your digital presence flexes with you.",
    media:
      "linear-gradient(135deg, #3a3a3a 0%, #737373 45%, #c7c7c7 100%)",
  },
  {
    number: "04/",
    title: "Invest for ROI.",
    description:
      "We don\u2019t just make things look good\u2014we make them work. Every digital experience is crafted to deliver measurable results, because your growth is our benchmark.",
    media:
      "linear-gradient(135deg, #050505 0%, #2e2e2e 55%, #d4d4d4 100%)",
  },
];

export function EthosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Each ethos item: heading fades 0.18 → 1, description fades in, line animates
      itemRefs.current.forEach((item) => {
        if (!item) return;
        const heading = item.querySelector(".ethos-heading");
        const desc = item.querySelector(".ethos-desc");
        const line = item.querySelector(".ethos-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.5,
          },
        });

        if (heading) {
          tl.fromTo(
            heading,
            { opacity: 0.18 },
            { opacity: 1, duration: 0.6 },
            0
          );
        }

        if (desc) {
          tl.fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.2
          );
        }

        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
            0
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0e0e0e] text-white"
      style={{ padding: "120px 0", position: "relative", zIndex: 2 }}
    >
      <div className="container">
        <h2
          ref={headingRef}
          style={{
            fontSize: "clamp(48px, 7vw, 101px)",
            fontWeight: 400,
            lineHeight: 1.0,
            marginBottom: "80px",
          }}
        >
          Brand led.
          <br />
          Strategy driven.
        </h2>

        <div className="flex flex-col">
          {principles.map((item, i) => (
            <div
              key={item.number}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="group relative isolate overflow-hidden border-t border-white/10 first:border-t last:border-b py-12 md:py-16"
              onMouseEnter={() => {
                const media = itemRefs.current[i]?.querySelector(
                  ".ethos-media"
                ) as HTMLDivElement | null;
                if (media) {
                  media.style.opacity = "1";
                  media.style.transform = "translate(-50%, -50%) scale(1)";
                }
                const desc = itemRefs.current[i]?.querySelector(
                  ".ethos-desc"
                ) as HTMLDivElement | null;
                if (desc) {
                  desc.style.opacity = "1";
                  desc.style.transform = "translateY(0)";
                }
              }}
              onMouseLeave={() => {
                const card = itemRefs.current[i];
                const media = card?.querySelector(
                  ".ethos-media"
                ) as HTMLDivElement | null;
                if (media) {
                  media.style.opacity = "0";
                  media.style.transform = "translate(-50%, -50%) scale(0.96)";
                }
                const desc = card?.querySelector(
                  ".ethos-desc"
                ) as HTMLDivElement | null;
                if (desc) {
                  desc.style.opacity = "0";
                  desc.style.transform = "translateY(12px)";
                }
                if (card) {
                  card.style.removeProperty("--mx");
                  card.style.removeProperty("--my");
                }
              }}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                const card = itemRefs.current[i];
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mx", `${x}px`);
                card.style.setProperty("--my", `${y}px`);
              }}
            >
              <div className="ethos-line mb-10 h-px origin-left bg-white/15" />

              <div className="relative grid gap-10 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] md:items-center">
                {/* LEFT: number + title */}
                <div className="ethos-heading z-10 md:max-w-[480px]">
                  <p className="mb-4 text-base opacity-50">{item.number}</p>
                  <h3
                    className="leading-[0.95] font-bold"
                    style={{
                      fontSize: "clamp(42px, 7vw, 88px)",
                      letterSpacing: "-0.02em",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* MIDDLE: empty gap — the floating media plays inside this open space */}
                <div aria-hidden className="hidden md:block" />

                {/* RIGHT: description, opposite end of the row */}
                <div className="ethos-desc z-10 md:max-w-[360px] md:text-right md:justify-self-end text-lg leading-7 font-normal text-white/80 opacity-0 translate-y-3 transition-all duration-200 ease-out">
                  {item.description}
                </div>

                {/* Floating cursor-following media — defined box, follows the cursor over the whole row */}
                <div
                  className="ethos-media pointer-events-none absolute left-[var(--mx,50%)] top-[var(--my,50%)] z-0 aspect-[5/6] w-[28vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl opacity-0 shadow-2xl transition-[opacity,transform] duration-200 ease-out"
                  style={{
                    background: item.media,
                    transform: "translate(-50%, -50%) scale(0.96)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-white/15" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
