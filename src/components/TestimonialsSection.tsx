"use client";

import { useRef, useState, useCallback } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const testimonials = [
  {
    company: "tangerine",
    quote:
      'As a design agency ourselves, handing responsibility for our web re-design to another creative agency needed to be well considered. We were immediately impressed by their designs and their interpretation of our brief. Nice bunch of people to work with too!',
    name: "Laurie Bushe",
    role: "Head of Marketing",
    bg: "#f2b8e0",
  },
  {
    company: "Jetvault",
    quote:
      "Kota have been brilliant from day one to work with. Very quick to respond to any queries, a lovely group of people, with a great eye for design and detail. I\u2019ve loved working with them so far.",
    name: "Laura Wogan",
    role: "Third Generation Director",
    bg: "#a8e1ec",
  },
  {
    company: "Everflow",
    quote:
      "It was our brand positioning work that really made everything click. KOTA were empathetic, patient, flexible, quick, and, most importantly, incredibly talented.",
    name: "Shanice Daeche",
    role: "CMO",
    bg: "#c4b5f3",
  },
  {
    company: "Ridgewell",
    quote:
      "Beyond the stunning visuals, KOTA brought strategic thinking that elevated our entire brand. They didn\u2019t just design a website\u2014they created an experience.",
    name: "James Collins",
    role: "Creative Director",
    bg: "#d7e1d3",
  },
];

export function TestimonialsSection() {
  // order tracks the card indices in stack order: [front, ..., back]
  const [order, setOrder] = useState(() => testimonials.map((_, i) => i));
  const [animating, setAnimating] = useState(false);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    // The front card (order[0]) will fly out to the right
    setExitingIdx(order[0]);

    // After the exit animation, move it to the back of the stack
    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        const front = next.shift()!;
        next.push(front);
        return next;
      });
      setExitingIdx(null);
      setAnimating(false);
    }, 1000);
  }, [animating, order]);

  return (
    <section className="bg-kota-gray" style={{ padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        <ScrollReveal>
          <h2 style={{ fontSize: "20px", marginBottom: "60px" }}>
            What our clients say
          </h2>
        </ScrollReveal>
      </div>

      <div className="container">
        <div
          ref={containerRef}
          className="relative"
          style={{ height: "560px" }}
        >
          {order.map((cardIdx, stackPos) => {
            const t = testimonials[cardIdx];
            const isExiting = exitingIdx === cardIdx;

            // Stack position: 0 = front, 1 = behind, etc.
            // Each card behind shifts LEFT and is slightly smaller
            const shiftLeft = stackPos * 30;
            const scale = 1 - stackPos * 0.03;
            const zIndex = testimonials.length - stackPos;

            let transform: string;
            if (isExiting) {
              // Fly out to the right
              transform = "translateX(120%) scale(0.95)";
            } else {
              transform = `translateX(-${shiftLeft}px) scale(${scale})`;
            }

            return (
              <div
                key={t.company}
                className="absolute top-0 right-0"
                style={{
                  width: "min(700px, 80%)",
                  height: "100%",
                  transform,
                  transformOrigin: "right center",
                  zIndex,
                  transition: isExiting
                    ? "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease"
                    : "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: isExiting ? 0 : 1,
                }}
              >
                <div
                  className="relative h-full text-black flex flex-col justify-between"
                  style={{
                    backgroundColor: t.bg,
                    borderRadius: "24px",
                    padding: "50px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(28px, 4vw, 42px)",
                        fontWeight: 700,
                        marginBottom: "24px",
                      }}
                    >
                      {t.company}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(16px, 2vw, 22px)",
                        lineHeight: 1.5,
                        maxWidth: "560px",
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "2px" }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: "16px", opacity: 0.7 }}>{t.role}</p>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 mt-6 rounded-full border border-black/30 px-5 py-2.5 text-sm hover:bg-black/5 transition-colors"
                    >
                      View project
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Next arrow button */}
          <button
            onClick={goNext}
            className="absolute bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full border-2 border-black/30 bg-white/80 backdrop-blur-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
