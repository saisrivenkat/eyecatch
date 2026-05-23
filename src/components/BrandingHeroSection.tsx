"use client";

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

        <p
          className="text-white/80"
          style={{
            fontSize: "clamp(18px, 1.5vw, 26px)",
            lineHeight: 1.4,
            maxWidth: "clamp(620px, 60vw, 1000px)",
          }}
        >
          We build brands that own a room before they say a word — strategy,
          voice, and visual systems that move from boardroom decks to billboards
          without losing a beat.
        </p>
      </div>
    </section>
  );
}
