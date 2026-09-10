"use client";

import { useEffect, useRef } from "react";

const TRAIL = 5;

/**
 * The studio's custom cursor, second generation. Still a white dot in
 * difference blend; now it grows over anything interactive, carries a label
 * where an element asks for one (`data-cursor="view"`), and leaves a short
 * trail of smaller dots that catch up — the path behind the point.
 *
 * Positions are written straight to the nodes each frame; nothing here goes
 * through React state.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const trails = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const trailNodes = [...(trails.current?.children ?? [])] as HTMLElement[];
    const points = trailNodes.map(() => ({ x: 0, y: 0 }));
    let x = -100;
    let y = -100;
    let frame = 0;
    let seen = false;

    const paint = () => {
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // Each trail dot eases towards the one before it.
      let px = x;
      let py = y;
      points.forEach((p, i) => {
        p.x += (px - p.x) * 0.35;
        p.y += (py - p.y) * 0.35;
        trailNodes[i].style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${1 - i / (TRAIL + 1)})`;
        px = p.x;
        py = p.y;
      });
      frame = requestAnimationFrame(paint);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        points.forEach((p) => {
          p.x = x;
          p.y = y;
        });
        dot.current?.classList.remove("cursor--off");
        frame = requestAnimationFrame(paint);
      }
    };

    const onOver = (e: Event) => {
      const t = e.target;
      if (!(t instanceof Element) || !dot.current) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = labelled ?? t.closest("a, button, [role=button], label, input, select, textarea");
      dot.current.classList.toggle("cursor--hover", Boolean(interactive) && !labelled);
      dot.current.classList.toggle("cursor--label", Boolean(labelled));
      if (label.current) label.current.textContent = labelled?.dataset.cursor ?? "";
    };

    const onLeave = () => dot.current?.classList.add("cursor--off");
    const onEnter = () => dot.current?.classList.remove("cursor--off");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      root.classList.remove("has-cursor");
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor cursor--off" aria-hidden="true">
        <span ref={label} className="cursor__label" />
      </div>
      <div ref={trails} className="cursor__trails" aria-hidden="true">
        {Array.from({ length: TRAIL }, (_, i) => (
          <div className="cursor__trail" key={i} />
        ))}
      </div>
    </>
  );
}
