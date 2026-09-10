import type { CSSProperties } from "react";

/**
 * Wraps every word so it can rise out of its own line box. Server-safe: no
 * measuring, no JS — the parent's `.is-in` (from <Reveal />) or the intro
 * finishing lets the words through.
 */
export function SplitWords({
  text,
  className,
  hero = false,
  delay = 0,
  start = 0,
}: {
  text: string;
  className?: string;
  /** Hero copy animates off the intro finishing instead of scroll position. */
  hero?: boolean;
  delay?: number;
  /** Stagger index offset, so several lines can share one sequence. */
  start?: number;
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span
      className={`words ${hero ? "words--hero" : ""} ${className ?? ""}`}
      style={delay ? ({ "--delay": `${delay}ms` } as CSSProperties) : undefined}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span className="w" key={`${word}-${i}`} aria-hidden="true">
          <span style={{ "--i": start + i } as CSSProperties}>{word}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
