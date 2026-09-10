"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useIntroDone } from "@/components/motion/useIntroDone";
import type { Project } from "@/lib/projects";
import "./hero.css";

const DWELL = 4600;
const LINES = 10;

/** One drifting column of repeated words. Two copies, so the loop is seamless. */
function TextColumn({
  word,
  area,
  reverse = false,
  seconds = 26,
}: {
  word: string;
  area: string;
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
        {[0, 1].map((copy) => (
          <div className="ghero__run" key={copy}>
            {Array.from({ length: LINES }, (_, i) => (
              <span className="ghero__line" key={i}>
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The home as a grid rather than a stage: two large stills, the five featured
 * projects set small and quiet, and columns of the claim drifting past at the
 * edges — the studio's own words used as texture.
 *
 * The two stills read as a pair. Hovering a title drives the first; the second
 * always shows the one after it, so the grid answers in two places at once and
 * there is never a dead tile. Left alone it walks the five by itself.
 */
export function GridHero({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [cycle, setCycle] = useState(0);
  const ready = useIntroDone();

  useEffect(() => {
    if (!ready || held || projects.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => setActive((i) => (i + 1) % projects.length), DWELL);
    return () => window.clearInterval(timer);
  }, [ready, held, projects.length, cycle]);

  const select = useCallback((i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  }, []);

  const lead = projects[active];
  const echo = projects[(active + 1) % projects.length];

  return (
    <section
      className="ghero tone-dark"
      data-ready={ready}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      {/* The claim is set in full by the band below; the page still needs one
          heading, and it should be the sentence rather than "Featured". */}
      <h1 className="sr-only">Creative agency for brands who dare to go their own WAY</h1>

      <div className="ghero__grid">
        <TextColumn word="Creative agency" area="ta" seconds={30} />
        <TextColumn word="Creative agency" area="tc" reverse seconds={34} />
        <TextColumn word="Creative agency" area="tb" seconds={38} />
        <TextColumn word="Creative agency" area="td" reverse seconds={44} />

        {/* Large still — follows the list. */}
        <Link
          href={`/projects/${lead.slug}`}
          className="ghero__cell ghero__cell--media"
          style={{ gridArea: "ma" }}
          data-cursor="Open"
        >
          {projects.map((p, i) => (
            <span className="ghero__frame" data-on={i === active} key={p.slug}>
              <Image
                src={p.hero}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 900px) 34vw, 92vw"
                style={{ objectFit: "cover" }}
              />
            </span>
          ))}
          <span className="ghero__tag mono-xs">
            {lead.client} <span className="dot" />
          </span>
        </Link>

        {/* Large still — always one ahead. */}
        <Link
          href={`/projects/${echo.slug}`}
          className="ghero__cell ghero__cell--media"
          style={{ gridArea: "mb" }}
          data-cursor="Open"
        >
          {projects.map((p, i) => (
            <span className="ghero__frame" data-on={i === (active + 1) % projects.length} key={p.slug}>
              <Image src={p.hero} alt="" fill sizes="(min-width: 900px) 34vw, 92vw" style={{ objectFit: "cover" }} />
            </span>
          ))}
          <span className="ghero__tag mono-xs">
            {echo.client} <span className="dot" />
          </span>
        </Link>

        {/* The five, small and quiet. */}
        <div className="ghero__cell ghero__cell--list" style={{ gridArea: "ls" }}>
          <div className="ghero__list-head mono-xs muted">
            <span>Featured</span>
            <span>
              {String(active + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <ol className="ghero__list">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="ghero__item"
                  data-on={i === active}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                >
                  <span className="ghero__num mono-xs">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ghero__name display d5">{p.name}</span>
                  <span className="ghero__year mono-xs muted">{p.year ?? "—"}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="ghero__progress" key={`${active}-${cycle}`} data-paused={held} />
          <a href="#work" className="ghero__scroll mono-xs">
            All work <span className="dot dot--live" />
          </a>
        </div>

        <TextColumn word="Creative agency" area="te" seconds={26} />
      </div>
    </section>
  );
}
