"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRANSITION_MS = 850;

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const skipTransition = pathname?.startsWith("/admin") ?? false;
  const [animating, setAnimating] = useState(!skipTransition);

  useEffect(() => {
    if (skipTransition) return;
    window.scrollTo(0, 0);

    const id = window.setTimeout(() => {
      setAnimating(false);
      ScrollTrigger.refresh();
    }, TRANSITION_MS + 50);

    return () => window.clearTimeout(id);
  }, [skipTransition]);

  return (
    <div className={animating && !skipTransition ? "page-transition" : undefined}>
      {children}
    </div>
  );
}
