"use client";

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
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const id = window.setTimeout(() => {
      setAnimating(false);
      // The wrapper's transform created a containing block for descendants —
      // any pinned ScrollTriggers measured the wrong positions while it was
      // active. Refresh now that the transform is gone.
      ScrollTrigger.refresh();
    }, TRANSITION_MS + 50);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={animating ? "page-transition" : undefined}>{children}</div>
  );
}
