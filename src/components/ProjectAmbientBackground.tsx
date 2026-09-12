"use client";

/**
 * Ambient layer for /work/[slug] pages.
 * Pure-CSS — black canvas with three large drifting glow orbs, a slow-rotating
 * conic ring, a periodic diagonal sweep, and a soft scrolling dot grid.
 * Strictly black/grey palette, no color casts.
 */
export function ProjectAmbientBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1, backgroundColor: "rgba(0,0,0,0.55)" }}
    >
      {/* Slow-rotating conic ring — large, low-contrast wash */}
      <div
        className="project-ambient-ring absolute"
        style={{
          top: "50%",
          left: "50%",
          width: "150vmax",
          height: "150vmax",
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.10) 90deg, rgba(255,255,255,0) 180deg, rgba(180,180,190,0.08) 270deg, rgba(255,255,255,0) 360deg)",
          filter: "blur(120px)",
          opacity: 0.8,
        }}
      />

      {/* dot grid drift */}
      <div className="project-ambient-grid absolute inset-0" />

      {/* Glow orb — top-left, brighter */}
      <div
        className="project-ambient-orb-1 absolute"
        style={{
          top: "-20%",
          left: "-15%",
          width: "85vw",
          height: "85vw",
          maxWidth: "1500px",
          maxHeight: "1500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,250,245,0.22) 0%, rgba(255,250,245,0) 60%)",
          filter: "blur(70px)",
        }}
      />

      {/* Glow orb — bottom-right, cool grey */}
      <div
        className="project-ambient-orb-2 absolute"
        style={{
          bottom: "-25%",
          right: "-20%",
          width: "95vw",
          height: "95vw",
          maxWidth: "1700px",
          maxHeight: "1700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(190,200,215,0.20) 0%, rgba(190,200,215,0) 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Glow orb — center wash, soft rotational pulse */}
      <div
        className="project-ambient-orb-3 absolute"
        style={{
          top: "25%",
          left: "30%",
          width: "60vw",
          height: "60vw",
          maxWidth: "900px",
          maxHeight: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Diagonal sweep highlight — sweeps across every 14s */}
      <div
        className="project-ambient-sweep absolute"
        style={{
          top: "0",
          left: "0",
          width: "40vw",
          height: "100vh",
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.07) 55%, rgba(255,255,255,0) 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top vignette so the fixed header reads cleanly over the motion */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "240px",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Bottom vignette to anchor the page foot */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "180px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}
