"use client";

import { useState, useCallback, useRef, type CSSProperties } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const stats = [
  {
    bg: "#b9e6c9",
    number: "67.6%",
    description: "rise in engaged sessions per user after 1 month.",
  },
  {
    bg: "#a3d8ec",
    number: "70.8%",
    description: "increase in average engagement time after 3 months.",
  },
  {
    bg: "#c8b8f3",
    number: "83.14%",
    description: "increase in sales after 1 year.",
  },
  {
    bg: "#fbd5af",
    number: "104.9%",
    description: "increase in organic visits after 1 month",
  },
];

/* How far each card behind the front one peeks out. Kept in a custom property
   so the offset shrinks with the viewport — 30px of peek per card is a third of
   a phone screen. */
const STACK_SHIFT = "clamp(18px, 4.6vw, 30px)";

const arrowButton =
  "shrink-0 items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-white/30 bg-black/60 backdrop-blur-sm text-white transition-all duration-300 cursor-pointer hover:bg-white hover:text-black hover:border-white";

export function StatsSection() {
  const [order, setOrder] = useState(() => stats.map((_, i) => i));
  const [animating, setAnimating] = useState(false);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

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

  const goPrev = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setOrder((prev) => {
      const next = [...prev];
      const back = next.pop()!;
      next.unshift(back);
      return next;
    });
    setTimeout(() => setAnimating(false), 1000);
  }, [animating]);

  /* Swipe the stack on touch — the arrows stay, but flicking is what people
     actually reach for on a phone. */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) < 45) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <section
      className="section-y text-white"
      style={{ position: "relative", zIndex: 2 }}
    >
      <div className="container">
        <div className="flex items-start gap-12 max-lg:flex-col max-lg:gap-8">
          {/* Left side — title */}
          <div className="shrink-0 lg:w-[35%]">
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

          {/* Right side — stacked cards.
              `w-full` (not `flex-1`) matters below lg: once the row turns into a
              column, `flex-1` resolves the basis against the cross axis and the
              fixed-height stack collapses to nothing, taking every card with it. */}
          <div className="w-full min-w-0 lg:flex-1">
            {/* The 500px cap only makes sense at lg, where the deck sits beside
                the title. Stacked below that, it left the card marooned against
                the right edge of a full-width column. */}
            <div
              className="relative w-full [--stack-max:100%] lg:[--stack-max:500px]"
              style={
                {
                  height: "clamp(320px, 82vw, 500px)",
                  "--stack-shift": STACK_SHIFT,
                } as CSSProperties
              }
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {order.map((cardIdx, stackPos) => {
                const s = stats[cardIdx];
                const isExiting = exitingIdx === cardIdx;

                const scale = 1 - stackPos * 0.03;
                const zIndex = stats.length - stackPos;

                const transform = isExiting
                  ? "translateX(120%) scale(0.95)"
                  : `translateX(calc(var(--stack-shift) * -${stackPos})) scale(${scale})`;

                return (
                  <div
                    key={s.number}
                    className="absolute top-0 right-0"
                    style={{
                      width: `min(var(--stack-max), calc(100% - var(--stack-shift) * ${
                        stats.length - 1
                      }))`,
                      height: "100%",
                      transform,
                      transformOrigin: "right center",
                      zIndex,
                      transition: isExiting
                        ? "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease"
                        : "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      opacity: isExiting ? 0 : 1,
                    }}
                    aria-hidden={stackPos !== 0}
                  >
                    <div
                      className="relative flex h-full flex-col justify-between overflow-hidden text-black"
                      style={{
                        backgroundColor: s.bg,
                        borderRadius: "24px",
                        padding: "clamp(24px, 6.5vw, 50px)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(52px, 15vw, 120px)",
                          fontWeight: 400,
                          lineHeight: 1.0,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.number}
                      </p>

                      <div>
                        <p
                          style={{
                            fontSize: "clamp(16px, 4.2vw, 20px)",
                            lineHeight: 1.4,
                            marginBottom: "clamp(16px, 4vw, 24px)",
                          }}
                        >
                          {s.description}
                        </p>
                        <a
                          href="#"
                          tabIndex={stackPos === 0 ? undefined : -1}
                          className="inline-flex items-center gap-2 rounded-full border border-black/30 px-5 py-2.5 text-sm transition-colors hover:bg-black/5"
                        >
                          View Project
                          <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Desktop — arrow floats over the card's empty bottom-right */}
              <button
                onClick={goNext}
                className={`absolute bottom-8 right-8 z-50 hidden lg:flex ${arrowButton}`}
                aria-label="Next result"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Below lg — controls sit under the stack instead of on top of the
                card copy, with a position readout so the stack reads as a deck */}
            <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
              <div className="flex items-center gap-2" aria-hidden>
                {stats.map((s, i) => (
                  <span
                    key={s.number}
                    className="block h-[3px] rounded-full transition-all duration-500"
                    style={{
                      width: i === order[0] ? "28px" : "10px",
                      backgroundColor:
                        i === order[0]
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button onClick={goPrev} className={`flex ${arrowButton}`} aria-label="Previous result">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button onClick={goNext} className={`flex ${arrowButton}`} aria-label="Next result">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
