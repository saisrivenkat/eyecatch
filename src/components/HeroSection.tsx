"use client";

import { useEffect, useState } from "react";

function SplitText({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative w-full h-screen"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Bottom gradient fade to blend into next section */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 z-3 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #efefef)",
        }}
      />
      {/* Main container */}
      <div className="container relative z-2 mx-auto h-full flex flex-col justify-center px-6 md:px-10 pb-10">
        {/* Hero display text */}
        <div
          className="select-none"
          style={{
            fontSize: "clamp(48px, 9vw, 150px)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "black",
            perspective: "600px",
          }}
        >
          {mounted ? (
            <>
              <div>
                <SplitText text="Dont just" baseDelay={0.1} />
              </div>
              <div>
                <SplitText text="be seen be" baseDelay={0.4} />
              </div>
              <div>
                <SplitText text="remembered" baseDelay={0.7} />
              </div>
            </>
          ) : (
            <>
              <div style={{ visibility: "hidden" }}>Dont just</div>
              <div style={{ visibility: "hidden" }}>be seen be</div>
              <div style={{ visibility: "hidden" }}>remembered</div>
            </>
          )}
        </div>

        {/* Subtitle — bottom right */}
        <p
          className="absolute right-6 md:right-10 bottom-10 max-w-95 text-black max-md:static max-md:mt-10 max-md:max-w-full"
          style={{
            fontSize: "21px",
            lineHeight: "27px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s",
          }}
        >
          We&apos;re a creative web design and branding agency based in London
          that crafts beautiful work for brands who{" "}
          <span className="font-bold">refuse to blend in.</span>
        </p>
      </div>
    </section>
  );
}
