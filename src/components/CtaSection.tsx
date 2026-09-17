"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function CtaSection() {
  return (
    <section
      className="section-y text-white"
      style={{
        textAlign: "center",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <ScrollReveal distance={40}>
          <p style={{ fontSize: "clamp(17px, 4.4vw, 20px)", marginBottom: "24px" }}>
            Celebrating 13 years
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 hover:bg-white hover:text-black"
            style={{
              padding: "15px 30px",
              border: "1px solid white",
              borderRadius: "999px",
              fontSize: "clamp(16px, 4.2vw, 18px)",
              color: "white",
              textDecoration: "none",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            Explore
            <span className="btn-arrow">&rarr;</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
