"use client";

import { useEffect, useRef } from "react";

/**
 * The theme's custom cursor: the real pointer is hidden and a blend-mode circle
 * follows it, swelling over anything interactive.
 *
 * Position is written straight to the node rather than held in state — this
 * runs on every mousemove, and a re-render per frame is the one thing that
 * would make it feel heavy.
 */
export function CircleCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No cursor to replace on touch, and the fixed element would just sit in a
    // corner. Bail before touching the document.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-circle-cursor");

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const node = ref.current;
      if (node) node.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const setHover = (over: boolean) => (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a, button, .circle_pointer")) return;
      ref.current?.classList.toggle("hover", over);
    };

    const onOver = setHover(true);
    const onOut = setHover(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      root.classList.remove("has-circle-cursor");
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div id="circle_cursor" ref={ref} aria-hidden="true" />;
}
