"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactWavesBackground } from "@/components/ContactWavesBackground";

export function BrandingContactSection() {
  return (
    <section
      className="bg-black text-white"
      style={{
        padding: "140px 0",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <ContactWavesBackground />

      <div
        className="container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <ScrollReveal distance={50}>
          <div className="mx-auto" style={{ maxWidth: "880px", textAlign: "center" }}>
            <p
              className="uppercase text-white/55"
              style={{
                fontSize: "13px",
                letterSpacing: "1.5px",
                marginBottom: "20px",
              }}
            >
              Let&rsquo;s talk
            </p>

            <h2
              style={{
                fontSize: "clamp(40px, 6vw, 84px)",
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                marginBottom: "28px",
              }}
            >
              Interested in working
              <br />
              with EyeCatch?
            </h2>

            <p
              className="mx-auto text-white/70"
              style={{
                fontSize: "20px",
                lineHeight: "30px",
                maxWidth: "560px",
                marginBottom: "40px",
              }}
            >
              Drop us a line and tell us what the brand needs to do next. We
              reply the same week.
            </p>

            <a
              href="mailto:hello@eyecatch.in"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-black transition-all duration-200 hover:-translate-y-0.5"
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
              hello@eyecatch.in
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </a>

            <p
              className="text-white/45"
              style={{
                fontSize: "14px",
                lineHeight: "22px",
                marginTop: "32px",
              }}
            >
              Hyderabad &middot; Vijayawada &middot; Anywhere your brand needs to land.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
