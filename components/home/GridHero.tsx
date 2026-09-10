"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { WayTo } from "@/components/about/WayTo";
import { useIntroDone } from "@/components/motion/useIntroDone";
import type { Project } from "@/lib/projects";
import "./hero.css";

const DWELL = 4600;

/**
 * A column of drifting text. `pattern` is the rhythm: 1 prints the word, 0
 * leaves the line empty. The gaps are what stop it reading as a paragraph and
 * make it read as texture.
 */
function TextColumn({
  word,
  area,
  pattern,
  reverse = false,
  seconds = 30,
}: {
  word: string;
  area: string;
  pattern: number[];
  reverse?: boolean;
  seconds?: number;
}) {
  return (
    <div className="ghero__cell ghero__cell--text" style={{ gridArea: area }} aria-hidden="true">
      <div
        className="ghero__track"
        data-reverse={reverse}
        style={{ "--dur": `${seconds}s` } as CSSProperties}
      >
        {/* Two copies so the loop closes on itself. */}
        {[0, 1].map((copy) => (
          <div className="ghero__run" key={copy}>
            {pattern.map((on, i) => (
              <span className="ghero__line" key={i}>
                {on ? word : " "}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Eleven marks down the left edge, spaced — the count the sketch calls for. */
const CREATIVE = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1];
/** Far fewer on the right, in Skin and Bones' sparse rhythm. */
const PARTNER = [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0];

/**
 * The home, as a grid that breathes.
 *
 * Top band: a still on the left, the partner credits drifting on the right.
 * Bottom band inverts it — the rotating claim on the left, a wider still
 * pushed to the right edge. The two stills are the five featured projects,
 * one leading and one a step behind, so the diagonal is never static and
 * both tiles always lead somewhere.
 */
export function GridHero({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const ready = useIntroDone();

  useEffect(() => {
    if (!ready || held || projects.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => setActive((i) => (i + 1) % projects.length), DWELL);
    return () => window.clearInterval(timer);
  }, [ready, held, projects.length]);

  const lead = projects[active];
  const echo = projects[(active + 1) % projects.length];

  const still = (project: Project, index: number, area: string, priority: boolean) => (
    <Link
      href={`/projects/${project.slug}`}
      className="ghero__cell ghero__cell--media"
      style={{ gridArea: area }}
      data-cursor="Open"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      {projects.map((p, i) => (
        <span className="ghero__frame" data-on={i === index} key={p.slug}>
          <Image
            src={p.hero}
            alt=""
            fill
            priority={priority && i === 0}
            sizes="(min-width: 900px) 42vw, 92vw"
            style={{ objectFit: "cover" }}
          />
        </span>
      ))}
      <span className="ghero__tag mono-xs">
        {project.name} <span className="muted">— {project.client}</span>
      </span>
    </Link>
  );

  return (
    <section className="ghero tone-dark" data-ready={ready}>
      {/* The claim is set in full by the band below; the page still needs one
          heading, and it should be the sentence rather than a section label. */}
      <h1 className="sr-only">Creative agency for brands who dare to go their own WAY</h1>

      <div className="ghero__grid">
        <TextColumn word="Creative agency" area="ca" pattern={CREATIVE} seconds={38} />
        {still(lead, active, "ma", true)}
        <TextColumn word="Production partner" area="pp" pattern={PARTNER} reverse seconds={46} />

        <div className="ghero__cell ghero__cell--claim" style={{ gridArea: "wt" }}>
          <WayTo variant="hero" />
          <a href="#work" className="ghero__scroll mono-xs">
            All work <span className="dot dot--live" />
          </a>
        </div>

        {still(echo, (active + 1) % projects.length, "mb", false)}
      </div>
    </section>
  );
}
