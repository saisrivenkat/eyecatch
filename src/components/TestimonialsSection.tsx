"use client";

import { useRef, useState, useCallback, type CSSProperties } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const testimonials = [
  {
    company: "Kieros",
    quote:
      "As a design agency ourselves, handing responsibility for our web re-design to another creative agency needed to be well considered. We were immediately impressed by EyeCatch designs and their interpretation of our brief. Nice bunch of people to work with too!",
    name: "Founder",
    role: "Kieros",
    bg: "#f4b8d8",
  },
  {
    company: "Margadarsi",
    quote:
      "EyeCatch team have been brilliant from day one to work with. Very quick to respond to any queries, a lovely group of people, with a great eye for design and detail. I’ve loved working with them so far.",
    name: "Mrs Sailaja Suman",
    role: "MD, Margadarsi",
    bg: "#a3d8ec",
  },
  {
    company: "Ismail Biryani",
    quote:
      "It was our brand positioning work that really made everything click. EyeCatch crew were empathetic, patient, flexible, quick, and, most importantly, incredibly talented.",
    name: "Tahir",
    role: "Ismail Biryani",
    bg: "#c8b8f3",
  },
];

/* Peek distance per card behind the front one — 60px of offset pushed the back
   cards clean off a phone screen, so it scales with the viewport now. */
const STACK_SHIFT = "clamp(12px, 3.2vw, 60px)";

const arrowButton =
  "shrink-0 items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-white/30 bg-black/60 backdrop-blur-sm text-white transition-all duration-300 cursor-pointer hover:bg-white hover:text-black hover:border-white";

export function TestimonialsSection() {
  // order tracks the card indices in stack order: [front, ..., back]
  const [order, setOrder] = useState(() => testimonials.map((_, i) => i));
  const [animating, setAnimating] = useState(false);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

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

  const goPrev = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    // Pull the back card forward to become the new front — it transitions
    // smoothly from its receded stack pose to the active position.
    setOrder((prev) => {
      const next = [...prev];
      const back = next.pop()!;
      next.unshift(back);
      return next;
    });
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  }, [animating]);

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
    <section className="section-y" style={{ position: "relative", zIndex: 2 }}>
      <div className="container">
        <ScrollReveal>
          <h2
            style={{
              fontSize: "clamp(40px, 9vw, 150px)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              marginBottom: "clamp(36px, 9vw, 80px)",
            }}
          >
            What our clients say
          </h2>
        </ScrollReveal>
      </div>

      <div className="container">
        <div
          className="relative"
          style={
            {
              height: "clamp(400px, 104vw, 560px)",
              "--stack-shift": STACK_SHIFT,
            } as CSSProperties
          }
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {order.map((cardIdx, stackPos) => {
            const t = testimonials[cardIdx];
            const isExiting = exitingIdx === cardIdx;

            // Stack position: 0 = front, 1 = behind, etc.
            const shiftY = stackPos * 10;
            const scale = 1 - stackPos * 0.02;
            const zIndex = testimonials.length - stackPos;

            const transform = isExiting
              ? "translateX(120%) scale(0.95)"
              : `translate(calc(var(--stack-shift) * -${stackPos}), ${shiftY}px) scale(${scale})`;

            return (
              <div
                key={t.company}
                className="absolute top-0 right-0"
                style={{
                  width: `calc(100% - var(--stack-shift) * ${
                    testimonials.length - 1
                  })`,
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
                    backgroundColor: t.bg,
                    borderRadius: "24px",
                    padding: "clamp(24px, 6.5vw, 50px)",
                  }}
                >
                  {/* Decorative animated layer — fills the empty right side of the wide card */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    {/* Big stylized quote mark */}
                    <span
                      className="testimonial-quote-mark absolute select-none font-bold leading-none"
                      style={{
                        right: "clamp(16px, 8vw, 60px)",
                        top: "10px",
                        fontSize: "clamp(120px, 26vw, 340px)",
                        color: "rgba(0,0,0,0.08)",
                      }}
                    >
                      &ldquo;
                    </span>

                    {/* Soft floating orbs */}
                    <div
                      className="testimonial-orb-1 absolute rounded-full"
                      style={{
                        right: "-8%",
                        bottom: "-12%",
                        width: "clamp(200px, 55vw, 380px)",
                        height: "clamp(200px, 55vw, 380px)",
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)",
                        filter: "blur(20px)",
                      }}
                    />
                    <div
                      className="testimonial-orb-2 absolute rounded-full"
                      style={{
                        right: "22%",
                        top: "30%",
                        width: "clamp(120px, 30vw, 200px)",
                        height: "clamp(120px, 30vw, 200px)",
                        background:
                          "radial-gradient(circle, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 70%)",
                        filter: "blur(28px)",
                      }}
                    />
                    <div
                      className="testimonial-orb-3 absolute rounded-full"
                      style={{
                        right: "10%",
                        top: "10%",
                        width: "clamp(90px, 22vw, 140px)",
                        height: "clamp(90px, 22vw, 140px)",
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                        filter: "blur(24px)",
                      }}
                    />

                    {/* Slow-rotating concentric outline rings — peek from the right edge */}
                    <div
                      className="testimonial-ring absolute hidden rounded-full border border-black/15 sm:block"
                      style={{
                        right: "-120px",
                        top: "50%",
                        width: "420px",
                        height: "420px",
                        marginTop: "-210px",
                      }}
                    />
                    <div
                      className="testimonial-ring absolute hidden rounded-full border border-black/10 sm:block"
                      style={{
                        right: "-60px",
                        top: "50%",
                        width: "300px",
                        height: "300px",
                        marginTop: "-150px",
                        animationDirection: "reverse",
                        animationDuration: "55s",
                      }}
                    />
                  </div>

                  {/* Content layer — on wide cards it stays left so the decoration
                      breathes on the right; on a phone the card is the column. */}
                  <div className="relative z-10 max-w-full lg:max-w-[min(620px,65%)]">
                    <h3
                      style={{
                        fontSize: "clamp(26px, 6.5vw, 42px)",
                        fontWeight: 700,
                        marginBottom: "clamp(14px, 3.5vw, 24px)",
                      }}
                    >
                      {t.company}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(15px, 3.9vw, 22px)",
                        lineHeight: 1.5,
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="relative z-10 mt-6">
                    <p style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 600, marginBottom: "2px" }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: "clamp(14px, 3.6vw, 16px)", opacity: 0.7 }}>{t.role}</p>

                    <a
                      href="#"
                      tabIndex={stackPos === 0 ? undefined : -1}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/30 bg-white/10 px-5 py-2.5 text-sm backdrop-blur-sm transition-colors hover:bg-black/5"
                    >
                      View project
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Desktop — arrows float over the card's decorative right side */}
          <div className="absolute bottom-8 right-8 z-50 hidden items-center gap-3 lg:flex">
            <button onClick={goPrev} className={`flex ${arrowButton}`} aria-label="Previous testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button onClick={goNext} className={`flex ${arrowButton}`} aria-label="Next testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Below lg — controls move under the deck so they stop covering the
            quote and the "View project" link */}
        <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
          <div className="flex items-center gap-2" aria-hidden>
            {testimonials.map((t, i) => (
              <span
                key={t.company}
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
            <button onClick={goPrev} className={`flex ${arrowButton}`} aria-label="Previous testimonial">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button onClick={goNext} className={`flex ${arrowButton}`} aria-label="Next testimonial">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
