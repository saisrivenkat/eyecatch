"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  base: number;
  phase: number;
}

export function CelebrationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = [];
    const targetCount = () =>
      Math.round(Math.min(140, Math.max(48, (width * height) / 14000)));

    function spawnParticles() {
      particles.length = 0;
      const n = targetCount();
      for (let i = 0; i < n; i++) {
        const size = Math.random() * 1.6 + 0.4;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size,
          base: 0.35 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

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
      spawnParticles();
    }

    let animId = 0;
    let t0 = performance.now();

    const linkDist = 140;

    function draw() {
      if (!ctx) return;
      const now = performance.now();
      const t = (now - t0) / 1000;

      ctx.clearRect(0, 0, width, height);

      // Soft radial wash that breathes — adds depth behind the celebration text
      const cx = width * 0.5;
      const cy = height * 0.55;
      const breathe = 0.5 + Math.sin(t * 0.35) * 0.5;
      const glowR = Math.max(width, height) * (0.55 + breathe * 0.12);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glow.addColorStop(0, `rgba(220, 224, 232, ${0.07 + breathe * 0.04})`);
      glow.addColorStop(0.45, "rgba(120, 128, 140, 0.025)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Connection lines between nearby particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.18;
            ctx.strokeStyle = `rgba(200, 206, 216, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles — drifting silver dots with gentle twinkle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        const twinkle = 0.5 + Math.sin(t * 1.2 + p.phase) * 0.5;
        const alpha = p.base * (0.55 + twinkle * 0.45);
        const r = p.size * (0.85 + twinkle * 0.35);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        grad.addColorStop(0, `rgba(235, 238, 244, ${alpha})`);
        grad.addColorStop(0.4, `rgba(200, 206, 216, ${alpha * 0.35})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(245, 247, 250, ${Math.min(1, alpha + 0.15)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    t0 = performance.now();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
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
