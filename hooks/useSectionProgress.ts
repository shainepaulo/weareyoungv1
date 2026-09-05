"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue } from "framer-motion";

/** 0 → 1 as a taller-than-viewport section scrolls past its sticky range. */
export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) {
        progress.set(0);
        return;
      }
      progress.set(Math.min(1, Math.max(0, -rect.top / range)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, progress]);

  return progress;
}
