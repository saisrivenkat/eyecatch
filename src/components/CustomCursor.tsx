"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const interactiveSel =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      setHovering(Boolean(target.closest(interactiveSel)));
    };

    const tick = () => {
      const t = targetRef.current;
      const p = ringPosRef.current;
      // Ease ring toward target — softer than dot for satisfying lag
      p.x += (t.x - p.x) * 0.18;
      p.y += (t.y - p.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  if (!enabled) return null;

  const ringScale = pressed ? 0.85 : hovering ? 1.5 : 1;
  const dotScale = pressed ? 1.4 : hovering ? 0.5 : 1;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.25px solid rgba(255,255,255,0.85)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition:
            "opacity 0.2s ease, width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: `scale(${ringScale})`,
            transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.95)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: `scale(${dotScale})`,
            transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </>
  );
}
