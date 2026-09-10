"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import "./pulse.css";

/** Sentinel standing in for the mark inside the word list. */
const LOGO = "__WAY_LOGO__";

/**
 * The Kalkbrenner move, in the studio's voice: words dropped into an 8-column
 * grid in a staircase, a dot in front of each, the rows sliding along their
 * grid lines as the page scrolls. Rows alternate direction and the whole band
 * leans with scroll velocity, so it feels driven rather than played back.
 *
 * Scroll position is read once per frame and the offset is eased towards it —
 * that lag is what makes it feel like mass rather than a scrubbed timeline.
 */
export function PulseBand({
  words,
  tone = "light",
  perRow = 2,
  amplitude = 0.35,
  logoTail = false,
  className,
}: {
  words: string[];
  tone?: "light" | "dark";
  /** Close the sentence with the WAY mark instead of a last word. */
  logoTail?: boolean;
  /** Words per row before stepping to the next line of the staircase. */
  perRow?: number;
  /** Horizontal travel as a fraction of the band width, over the full scroll. */
  amplitude?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // LOGO is a sentinel the renderer swaps for the mark; it travels with the
  // words so it lands in the staircase like any other item.
  const items = logoTail ? [...words, LOGO] : words;
  const rows: string[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));

  useEffect(() => {
    const band = ref.current;
    if (!band) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = [...band.querySelectorAll<HTMLElement>(".pulse__track")];
    let target = 0;
    let current = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let frame = 0;
    let active = false;

    const measure = () => {
      const rect = band.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      // 0 when the band's top meets the viewport bottom, 1 when its bottom leaves the top.
      target = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
      active = rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const tick = () => {
      const y = window.scrollY;
      velocity = velocity * 0.85 + (y - lastY) * 0.15;
      lastY = y;

      current += (target - current) * 0.08;
      const lean = Math.max(-6, Math.min(6, velocity * 0.08));
      const width = band.clientWidth;

      tracks.forEach((track, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const x = (current - 0.5) * width * amplitude * dir;
        track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${(-lean).toFixed(2)}deg)`;
      });

      if (active || Math.abs(target - current) > 0.001) frame = requestAnimationFrame(tick);
      else frame = 0;
    };

    const wake = () => {
      measure();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    measure();
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);

    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amplitude]);

  return (
    <div
      ref={ref}
      className={`pulse tone-${tone} ${className ?? ""}`}
      style={{ "--rows": rows.length } as CSSProperties}
      aria-label={`${words.join(" ")}${logoTail ? " WAY" : ""}`}
    >
      <div className="gridlines gridlines--rows" style={{ "--row": "calc(100% / var(--rows))" } as CSSProperties} />
      {rows.map((row, r) => (
        <div className="pulse__row" key={r} style={{ "--step": r } as CSSProperties}>
          <div className="pulse__track">
            {row.map((word, i) => (
              <span className="pulse__el" key={`${word}-${i}`} aria-hidden="true">
                <span className="pulse__dot" />
                {word === LOGO ? (
                  <Wordmark className="pulse__logo" />
                ) : (
                  <span className="pulse__word display">{word}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
