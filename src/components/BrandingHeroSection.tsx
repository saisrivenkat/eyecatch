"use client";

import Link from "next/link";

export function BrandingHeroSection() {
  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: "transparent", paddingTop: "180px", paddingBottom: "100px" }}
    >
      <div className="container relative z-2 mx-auto px-6 md:px-10">
        <p
          className="uppercase tracking-[2px] text-white/60"
          style={{ fontSize: "13px", marginBottom: "24px" }}
        >
          A service from EyeCatch
        </p>

        <h1
          className="select-none text-white"
          style={{
            fontSize: "clamp(48px, 9vw, 150px)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
          }}
        >
          Branding that
          <br />
          earns attention.
        </h1>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p
            className="text-white/80"
            style={{
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1.45,
              maxWidth: "620px",
            }}
          >
            We build brands that own a room before they say a word — strategy,
            voice, and visual systems that move from boardroom decks to billboards
            without losing a beat.
          </p>

          <div className="flex md:justify-end">
            <Link
              href="#pillars"
              className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-black"
            >
              See how we build brands
              <span aria-hidden="true" className="btn-arrow">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
