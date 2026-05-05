"use client";

import { useEffect, useRef } from "react";

export function BrandingVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Subtle parallax — the video lifts a touch slower than the page so it
  // appears anchored to the metallic background behind it.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const factor = -0.08;
      video.style.transform = `translate3d(0, ${center * factor}px, 0) scale(1.08)`;
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "60px 0 80px",
        position: "relative",
        zIndex: 2,
        backgroundColor: "transparent",
      }}
    >
      <div className="container">
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            // Soft alpha mask so the video edges dissolve into the metallic
            // background behind it instead of sitting in a hard frame.
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
          }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            src="/videos/Eyecatch-Branding-Video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {/* Subtle vignette to deepen the blend with the background tone */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(14,14,14,0.55) 100%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </div>
    </section>
  );
}
