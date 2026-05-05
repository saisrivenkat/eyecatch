"use client";

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
  },
  {
    number: "02/",
    title: "Nail the process.",
    description:
      "Collaborative, decisive, clear from day one. You\u2019ll feel the momentum, know where you stand, and have a crew that knows when to lead and when to listen.",
  },
  {
    number: "03/",
    title: "Build to flex.",
    description:
      "Ready for your growth. Whether it\u2019s a new campaign, product, or pivot, we ensure your digital presence flexes with you.",
  },
  {
    number: "04/",
    title: "Invest for ROI.",
    description:
      "We don\u2019t just make things look good\u2014we make them work. Every digital experience is crafted to deliver measurable results, because your growth is our benchmark.",
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

      // Each ethos item: heading fades 0.18 → 1, line animates. Description stays
      // hidden by default and only reveals on hover (handled via CSS).
      itemRefs.current.forEach((item) => {
        if (!item) return;
        const heading = item.querySelector(".ethos-heading");
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
      className="text-white"
      style={{ padding: "120px 0", position: "relative", zIndex: 2, backgroundColor: "rgba(0,0,0,0.28)" }}
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
              className="ethos-row group relative border-t border-white/10 first:border-t last:border-b py-12 md:py-16"
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

                {/* MIDDLE: empty gap */}
                <div aria-hidden className="hidden md:block" />

                {/* RIGHT: description — hidden by default, revealed on row hover */}
                <div
                  className="ethos-desc z-10 md:max-w-[360px] md:text-right md:justify-self-end text-lg leading-7 font-normal text-white/80 opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
                >
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
