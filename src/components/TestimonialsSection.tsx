"use client";

import { useRef, useState, useCallback } from "react";
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
      "EyeCatch team have been brilliant from day one to work with. Very quick to respond to any queries, a lovely group of people, with a great eye for design and detail. I\u2019ve loved working with them so far.",
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
          <h2
            style={{
              fontSize: "clamp(48px, 9vw, 150px)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              marginBottom: "80px",
            }}
          >
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
            // Wide cards need a bigger shift than narrow ones so the back cards
            // actually peek out (translate must exceed the shrink-from-scale)
            const shiftLeft = stackPos * 60;
            const shiftY = stackPos * 10;
            const scale = 1 - stackPos * 0.02;
            const zIndex = testimonials.length - stackPos;

            let transform: string;
            if (isExiting) {
              // Fly out to the right
              transform = "translateX(120%) scale(0.95)";
            } else {
              transform = `translate(-${shiftLeft}px, ${shiftY}px) scale(${scale})`;
            }

            return (
              <div
                key={t.company}
                className="absolute top-0 left-0 right-0"
                style={{
                  width: "100%",
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
                  className="relative h-full text-black flex flex-col justify-between overflow-hidden"
                  style={{
                    backgroundColor: t.bg,
                    borderRadius: "24px",
                    padding: "50px",
                  }}
                >
                  {/* Decorative animated layer — fills the empty right side of the wide card */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    {/* Big stylized quote mark */}
                    <span
                      className="testimonial-quote-mark absolute select-none font-bold leading-none"
                      style={{
                        right: "60px",
                        top: "20px",
                        fontSize: "clamp(180px, 22vw, 340px)",
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
                        width: "380px",
                        height: "380px",
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
                        width: "200px",
                        height: "200px",
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
                        width: "140px",
                        height: "140px",
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                        filter: "blur(24px)",
                      }}
                    />

                    {/* Slow-rotating concentric outline rings — peek from the right edge */}
                    <div
                      className="testimonial-ring absolute rounded-full border border-black/15"
                      style={{
                        right: "-120px",
                        top: "50%",
                        width: "420px",
                        height: "420px",
                        marginTop: "-210px",
                      }}
                    />
                    <div
                      className="testimonial-ring absolute rounded-full border border-black/10"
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

                  {/* Content layer — constrained to left so decoration breathes on the right */}
                  <div className="relative z-10" style={{ maxWidth: "min(620px, 65%)" }}>
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
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="relative z-10">
                    <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "2px" }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: "16px", opacity: 0.7 }}>{t.role}</p>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 mt-6 rounded-full border border-black/30 px-5 py-2.5 text-sm hover:bg-black/5 transition-colors backdrop-blur-sm bg-white/10"
                    >
                      View project
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Next arrow button — dark on dark canvas (matches Results) */}
          <button
            onClick={goNext}
            className="absolute bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/30 bg-black/60 backdrop-blur-sm text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
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
