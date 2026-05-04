"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function BrandingVideoSection() {
  return (
    <section
      className="bg-[#0e0e0e]"
      style={{ padding: "60px 0 80px", position: "relative", zIndex: 2 }}
    >
      <div className="container">
        <ScrollReveal distance={50} duration={0.9}>
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[36px]"
            style={{
              aspectRatio: "16 / 9",
              backgroundColor: "#0a0a0a",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/Eyecatch-Branding-Video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.25) 100%)",
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
