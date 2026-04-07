"use client";

import { useEffect, useRef } from "react";

interface Ribbon {
  lines: number;
  baseY: number;
  spreadMax: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  slope: number;
  r: number; g: number; b: number;
  alpha: number;
  lineWidth: number;
  twistFreq: number;
  twistPhase: number;
  narrowRatio: number;
  /** Parallax speed multiplier — higher = moves faster with scroll */
  parallaxFactor: number;
}

const RIBBONS: Ribbon[] = [
  {
    lines: 70, baseY: 0.50, spreadMax: 280, amplitude: 140, frequency: 0.9,
    phase: 0.0, speed: 0.20, slope: 0.18,
    r: 0, g: 220, b: 210, alpha: 0.7, lineWidth: 1.2,
    twistFreq: 0.0, twistPhase: 0.0, narrowRatio: 1.0,
    parallaxFactor: 0.3,
  },
  {
    lines: 60, baseY: 0.58, spreadMax: 240, amplitude: 130, frequency: 0.75,
    phase: 2.5, speed: 0.16, slope: 0.14,
    r: 0, g: 210, b: 205, alpha: 0.65, lineWidth: 1.2,
    twistFreq: 0.0, twistPhase: 0.0, narrowRatio: 1.0,
    parallaxFactor: 0.5,
  },
  {
    lines: 55, baseY: 0.68, spreadMax: 220, amplitude: 110, frequency: 0.85,
    phase: 1.5, speed: 0.14, slope: 0.10,
    r: 130, g: 100, b: 220, alpha: 0.65, lineWidth: 1.1,
    twistFreq: 0.0, twistPhase: 0.0, narrowRatio: 1.0,
    parallaxFactor: 0.7,
  },
];

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  rb: Ribbon,
  w: number,
  h: number,
  time: number,
  scrollOffset: number
) {
  const {
    lines, baseY, spreadMax, amplitude, frequency, phase, speed, slope,
    r, g, b, alpha, lineWidth, narrowRatio, parallaxFactor
  } = rb;

  // Parallax: each ribbon shifts at a different rate based on scroll
  const parallaxY = scrollOffset * parallaxFactor;

  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const edgeDist = Math.abs(t - 0.5) * 2;
    const edgeFade = 1.0 - edgeDist * edgeDist * 0.5;

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * edgeFade})`;
    ctx.lineWidth = lineWidth;

    const segs = 250;
    const xStart = -w * 0.15;
    const xEnd = w * 1.15;

    for (let s = 0; s <= segs; s++) {
      const p = s / segs;
      const x = xStart + (xEnd - xStart) * p;
      const nx = p * frequency * Math.PI * 2;

      const wave1 = Math.sin(nx + time * speed + phase) * amplitude;
      const wave2 = Math.sin(nx * 2.1 + time * speed * 0.6 + phase * 1.3) * amplitude * 0.22;
      const wave3 = Math.sin(nx * 0.5 + time * speed * 0.3 + phase * 0.7) * amplitude * 0.35;

      const currentSpread = spreadMax * narrowRatio;
      const yOffset = (t - 0.5) * currentSpread;
      const lineWobble = Math.sin(nx * 3.5 + t * 20.0 + phase * 2.0) * currentSpread * 0.02;

      const diag = p * h * slope;
      const baseYpx = h * baseY;
      const y = baseYpx + yOffset + wave1 + wave2 + wave3 + lineWobble + diag - parallaxY;

      if (s === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
}

export function GradientBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function render() {
      if (!canvas || !ctx) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      const dw = rect.width;
      const dh = rect.height;

      if (dw === 0 || dh === 0) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const cw = Math.round(dw * dpr);
      const ch = Math.round(dh * dpr);

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, dw, dh);

      const time = performance.now() / 1000;

      for (const ribbon of RIBBONS) {
        drawRibbon(ctx, ribbon, dw, dh, time, scrollRef.current);
      }

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
