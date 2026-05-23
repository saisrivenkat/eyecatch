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
      <div
        className="overflow-hidden"
        style={{ aspectRatio: "16 / 9", marginTop: "120px", width: "100%" }}
      >
        <video
          ref={videoRef}
          className="block h-full w-full object-cover will-change-transform"
          src="/videos/Eyecatch-Branding-Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
