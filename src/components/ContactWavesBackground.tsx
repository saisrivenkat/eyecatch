"use client";

import { useEffect, useRef } from "react";

/**
 * Slow, atmospheric background for the contact section.
 * Two layers:
 *   1. A flow-field of soft drifting silver curves (like ink in water / silk fabric).
 *   2. A pair of large, lazily orbiting blurred orbs that breathe in/out.
 * Cool slate / silver palette to match the rest of the site — no electric blue, no chrome.
 */
export function ContactWavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const t0 = performance.now();

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Fast 2D value-noise based field for direction
    function hash(x: number, y: number) {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    }
    function noise(x: number, y: number) {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const a = hash(xi, yi);
      const b = hash(xi + 1, yi);
      const c = hash(xi, yi + 1);
      const d = hash(xi + 1, yi + 1);
      return (
        a * (1 - u) * (1 - v) +
        b * u * (1 - v) +
        c * (1 - u) * v +
        d * u * v
      );
    }

    function drawCurve(
      sx: number,
      sy: number,
      length: number,
      time: number,
      seed: number,
      alpha: number
    ) {
      if (!ctx) return;
      ctx.beginPath();
      let x = sx;
      let y = sy;
      const step = 5;
      ctx.moveTo(x, y);
      for (let i = 0; i < length; i++) {
        const n = noise(
          x * 0.0035 + seed,
          y * 0.0035 + seed * 0.7 + time * 0.04
        );
        const angle = n * Math.PI * 2;
        x += Math.cos(angle) * step;
        y += Math.sin(angle) * step * 0.85;
        if (x < -50 || x > width + 50 || y < -50 || y > height + 50) break;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(210, 215, 222, ${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    function frame() {
      if (!ctx) return;
      const now = performance.now();
      const t = (now - t0) / 1000;

      // Trail effect: instead of clearing, fade the previous frame slightly so curves leave a soft tail.
      ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
      ctx.fillRect(0, 0, width, height);

      // ── Drifting silver curves (flow-field) ──
      const curveCount = Math.round(
        Math.min(28, Math.max(10, (width * height) / 70000))
      );
      for (let i = 0; i < curveCount; i++) {
        // Anchor curves around evolving seeds so the field shifts over time
        const seed = i * 0.91 + Math.sin(t * 0.18 + i) * 0.6;
        const sx = ((Math.sin(t * 0.07 + i * 1.31) + 1) * 0.5) * width;
        const sy = ((Math.cos(t * 0.05 + i * 0.83) + 1) * 0.5) * height;
        const length = 80 + Math.floor(noise(i * 0.31, t * 0.1) * 60);
        const alpha = 0.06 + noise(i, t * 0.2) * 0.05;
        drawCurve(sx, sy, length, t, seed, alpha);
      }

      // ── Large lazy orbs — sets the mood, blurred via radial gradient ──
      const orbA = {
        x: width * (0.32 + Math.sin(t * 0.18) * 0.08),
        y: height * (0.40 + Math.cos(t * 0.15) * 0.10),
        r: Math.max(width, height) * 0.45,
      };
      const gA = ctx.createRadialGradient(orbA.x, orbA.y, 0, orbA.x, orbA.y, orbA.r);
      gA.addColorStop(0, "rgba(195, 200, 210, 0.10)");
      gA.addColorStop(0.5, "rgba(140, 148, 160, 0.04)");
      gA.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gA;
      ctx.fillRect(0, 0, width, height);

      const orbB = {
        x: width * (0.72 + Math.cos(t * 0.13) * 0.07),
        y: height * (0.62 + Math.sin(t * 0.20) * 0.08),
        r: Math.max(width, height) * 0.50,
      };
      const gB = ctx.createRadialGradient(orbB.x, orbB.y, 0, orbB.x, orbB.y, orbB.r);
      gB.addColorStop(0, "rgba(225, 230, 240, 0.09)");
      gB.addColorStop(0.5, "rgba(170, 178, 188, 0.035)");
      gB.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gB;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(frame);
    }

    resize();
    frame();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
