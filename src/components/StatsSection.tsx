"use client";

import { useState, useCallback } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const stats = [
  {
    bg: "#d7e1d3",
    number: "67.6%",
    description: "rise in engaged sessions per user after 1 month.",
  },
  {
    bg: "#a8e1ec",
    number: "70.8%",
    description: "increase in average engagement time after 3 months.",
  },
  {
    bg: "#c4b5f3",
    number: "83.14%",
    description: "increase in sales after 1 year.",
  },
  {
    bg: "#f8e5cb",
    number: "104.9%",
    description: "increase in organic visits after 1 month",
  },
];

export function StatsSection() {
  const [order, setOrder] = useState(() => stats.map((_, i) => i));
  const [animating, setAnimating] = useState(false);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);

  const goNext = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setExitingIdx(order[0]);

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
    <section className="bg-black text-white" style={{ padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div className="container">
        <div className="flex items-start gap-12 max-lg:flex-col">
          {/* Left side — title */}
          <div className="flex-shrink-0 lg:w-[35%]">
            <ScrollReveal distance={60}>
              <p style={{ fontSize: "14px", marginBottom: "8px" }}>Our</p>
              <h2
                style={{
                  fontSize: "clamp(48px, 10vw, 151px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                }}
              >
                Results
              </h2>
            </ScrollReveal>
          </div>

          {/* Right side — stacked cards */}
          <div className="relative flex-1 w-full" style={{ height: "500px" }}>
            {order.map((cardIdx, stackPos) => {
              const s = stats[cardIdx];
              const isExiting = exitingIdx === cardIdx;

              const shiftLeft = stackPos * 30;
              const scale = 1 - stackPos * 0.03;
              const zIndex = stats.length - stackPos;

              let transform: string;
              if (isExiting) {
                transform = "translateX(120%) scale(0.95)";
              } else {
                transform = `translateX(-${shiftLeft}px) scale(${scale})`;
              }

              return (
                <div
                  key={s.number}
                  className="absolute top-0 right-0"
                  style={{
                    width: "min(500px, 85%)",
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
                      backgroundColor: s.bg,
                      borderRadius: "24px",
                      padding: "50px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(64px, 8vw, 120px)",
                        fontWeight: 400,
                        lineHeight: 1.0,
                      }}
                    >
                      {s.number}
                    </p>

                    <div>
                      <p style={{ fontSize: "20px", lineHeight: "28px", marginBottom: "24px" }}>
                        {s.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-full border border-black/30 px-5 py-2.5 text-sm hover:bg-black/5 transition-colors"
                      >
                        View Project
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
              className="absolute bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/30 bg-black/60 backdrop-blur-sm text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
              aria-label="Next result"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
