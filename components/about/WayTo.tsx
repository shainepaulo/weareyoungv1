"use client";

import { useEffect, useRef, useState } from "react";
import "./about.css";

/**
 * The eight endings from the current /agency/ page, verbatim
 * (`<div class="typed" data-mots='[...]'>`).
 */
export const WAY_TO = [
  "CRAFT STORIES",
  "STAND OUT",
  "INSPIRE",
  "BRING PEOPLE TOGETHER",
  "MERGE CULTURES",
  "CLASH",
  "REASSEMBLE",
  "UNITE GENERATIONS",
] as const;

const EVERY = 2000;

/**
 * OUR WAY TO ___, the line rewriting itself every two seconds.
 *
 * The original types it out character by character with typed.js; here each
 * ending is a block that rises into place and the last one rises out, which
 * survives the long strings ("BRING PEOPLE TOGETHER") without the line
 * reflowing under itself. All endings stay in the DOM so the box is already
 * as tall as its tallest member and nothing below it ever moves.
 *
 * The timer only runs while the line is on screen.
 */
export function WayTo() {
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(true);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % WAY_TO.length), EVERY);
    return () => window.clearInterval(timer);
  }, [live]);

  return (
    <p ref={ref} className="wayto display" aria-label={`Our way to ${WAY_TO.join(", ")}`}>
      <span className="wayto__lead d2" aria-hidden="true">
        Our way to
      </span>

      <span className="wayto__slot" aria-hidden="true">
        {WAY_TO.map((word, i) => (
          <span
            key={word}
            className="wayto__word d2"
            data-state={i === index ? "in" : i === (index - 1 + WAY_TO.length) % WAY_TO.length ? "out" : "wait"}
          >
            {word}
            <span className="blink">_</span>
          </span>
        ))}
      </span>
    </p>
  );
}
