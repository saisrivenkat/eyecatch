"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { CelebrationBackground } from "@/components/CelebrationBackground";

export function CtaSection() {
  return (
    <section
      className="bg-black text-white"
      style={{ padding: "120px 0", textAlign: "center", position: "relative", zIndex: 2, overflow: "hidden" }}
    >
      <CelebrationBackground />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <ScrollReveal distance={40}>
          <p style={{ fontSize: "20px", marginBottom: "24px" }}>
            Celebrating 13 years
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 hover:bg-white hover:text-black"
            style={{
              padding: "16px 32px",
              border: "1px solid white",
              borderRadius: "999px",
              fontSize: "18px",
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
