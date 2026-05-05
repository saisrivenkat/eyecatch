"use client";

import { useEffect, useRef } from "react";

interface UseParallaxOptions {
  /**
   * Multiplier applied to the element's distance from the viewport center.
   * Negative values push the element against the scroll direction (typical
   * "back layer" parallax). Positive values pull with the scroll.
   * Default: -0.15
   */
  speed?: number;
  /** Optional extra scale applied alongside the translation. Default 1. */
  scale?: number;
  /** Disable on small screens where parallax tends to hurt more than help. */
  disableUnder?: number;
}

/**
 * Drive a vertical parallax transform on a target element based on its
 * position relative to the viewport center. Uses requestAnimationFrame and
 * passive scroll listeners so it cooperates with Lenis smooth scrolling.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = -0.15, scale = 1, disableUnder = 0 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (disableUnder && window.innerWidth < disableUnder) return;

    let raf = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const y = center * speed;
      node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)${
        scale !== 1 ? ` scale(${scale})` : ""
      }`;
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
  }, [speed, scale, disableUnder]);

  return ref;
}
