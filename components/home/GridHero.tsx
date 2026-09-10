"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { WayTo } from "@/components/about/WayTo";
import { useIntroDone } from "@/components/motion/useIntroDone";
import { SITE, type Project } from "@/lib/projects";
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
                {/* Non-breaking: a lone space collapses away and the blank line
                    loses its line box, which flattens the whole rhythm. */}
                {on ? word : " "}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Alternating runs of marks and blank lines: rhythm(3, 4, 1) is three marks,
 * four empty lines, one mark. The comp's rhythm is tight clusters with a lot
 * of air between them, so each pattern is cut to roughly its column's height.
 */
const rhythm = (...runs: number[]) =>
  runs.flatMap((n, i) => Array.from({ length: n }, () => (i % 2 === 0 ? 1 : 0)));

const CREATIVE = rhythm(3, 4, 1, 6, 2, 8, 1, 13);
const PARTNER = rhythm(3, 4, 1, 6, 2, 3);
const WHAT = rhythm(1, 3, 2, 4, 1, 8);

/**
 * The landing, laid out to the design comp.
 *
 * Top band: a still, the partner credits pulled in tight against it, and the
 * agency's answer to "how are we" out at the right edge. Bottom band: what we
 * do and the rotating claim on the left, a square still, and the same words
 * drifting past it. Most of the grid is deliberately empty — the space is what
 * the comp is actually about.
 *
 * The two stills carry the five featured projects, one leading and one a step
 * behind, so the diagonal is never static and both tiles lead somewhere.
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

  const still = (project: Project, index: number, area: string, variant: string, priority: boolean) => (
    <Link
      href={`/projects/${project.slug}`}
      className={`ghero__cell ghero__cell--media ghero__cell--${variant}`}
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
        <TextColumn word="Creative agency" area="ca" pattern={CREATIVE} seconds={40} />

        {still(lead, active, "ma", "wide", true)}

        <TextColumn word="Production partner" area="pp" pattern={PARTNER} reverse seconds={46} />

        <div className="ghero__cell ghero__note" style={{ gridArea: "hw" }}>
          <h2 className="mono-xs">How are we</h2>
          <p className="mono-s muted">{SITE.how}</p>
        </div>

        <div className="ghero__cell ghero__note" style={{ gridArea: "wd" }}>
          <h2 className="mono-xs">What we do</h2>
          <p className="mono-s muted">{SITE.what}</p>
        </div>

        <div className="ghero__cell ghero__cell--claim" style={{ gridArea: "wt" }}>
          <WayTo variant="hero" />
          <Link href="/roster#work" className="ghero__scroll mono-xs">
            All work <span className="dot dot--live" />
          </Link>
        </div>

        {still(echo, (active + 1) % projects.length, "mb", "square", false)}

        <TextColumn word="What we do" area="wq" pattern={WHAT} seconds={34} />
      </div>
    </section>
  );
}
