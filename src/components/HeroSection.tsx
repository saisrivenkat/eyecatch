"use client";

import { useEffect, useRef, useState } from "react";

function SplitText({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll-driven parallax — headline drifts up slower than the page,
  // subtitle drifts faster, layered against the fixed metallic banner.
  useEffect(() => {
    const headline = headlineRef.current;
    const sub = subRef.current;
    if (!headline) return;

    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      headline.style.transform = `translate3d(0, ${(y * 0.35).toFixed(2)}px, 0)`;
      headline.style.opacity = String(Math.max(0, 1 - y / 600));
      if (sub) {
        sub.style.transform = `translate3d(0, ${(y * 0.18).toFixed(2)}px, 0)`;
        sub.style.opacity = String(Math.max(0, 1 - y / 500));
      }
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative w-full h-screen"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Main container */}
      <div className="container relative z-2 mx-auto h-full flex flex-col justify-center px-6 md:px-10 pb-10">
        {/* Hero display text — parallax target */}
        <div
          ref={headlineRef}
          className="select-none will-change-transform"
          style={{
            fontSize: "clamp(48px, 9vw, 150px)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "white",
            perspective: "600px",
          }}
        >
          {mounted ? (
            <>
              <div>
                <SplitText text="Ordinary is seen." baseDelay={0.1} />
              </div>
              <div>
                <SplitText text="Legendary is" baseDelay={0.4} />
              </div>
              <div>
                <SplitText text="remembered." baseDelay={0.7} />
              </div>
            </>
          ) : (
            <>
              <div style={{ visibility: "hidden" }}>Ordinary is seen.</div>
              <div style={{ visibility: "hidden" }}>Legendary is</div>
              <div style={{ visibility: "hidden" }}>remembered.</div>
            </>
          )}
        </div>

        {/* Subtitle — bottom right */}
        <p
          ref={subRef}
          className="absolute right-6 md:right-10 bottom-10 text-white max-md:static max-md:mt-10 max-md:max-w-full will-change-transform"
          style={{
            fontSize: "clamp(18px, 1.4vw, 26px)",
            lineHeight: 1.35,
            maxWidth: "clamp(380px, 55vw, 900px)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 1.2s",
          }}
        >
          EyeCatch is a creative design and branding agency rooted in
          Hyderabad and Vijayawada, shaping bold, beautiful narratives for
          brands that{" "}
          <span className="font-bold">refuse to fade into the crowd.</span>
        </p>
      </div>
    </section>
  );
}
