"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { useIntroDone } from "@/components/motion/useIntroDone";
import type { Project } from "@/lib/projects";
import "./home.css";

const DWELL = 5200;

/**
 * Five projects, one screen. The list is the interface: hover or focus a
 * title and the image behind it changes with a wipe along the grid. Left
 * alone, it walks through the five by itself — a room that moves when nobody
 * touches it is what a CEO sees first.
 */
export function FeaturedHero({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  // The words wait for the intro to lift; with no intro this is true from the first frame.
  const ready = useIntroDone();
  // Bumped on every manual pick so the dwell timer and progress bar restart from there.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!ready || held || projects.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const step = () => setActive((i) => (i + 1) % projects.length);
    const timer = window.setInterval(step, DWELL);
    return () => window.clearInterval(timer);
  }, [ready, held, projects.length, cycle]);

  const select = useCallback((i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  }, []);

  const current = projects[active];

  return (
    <section
      className="hero tone-dark"
      data-ready={ready}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      aria-label="Featured projects"
    >
      <div className="gridlines" />

      <div className="hero__media" aria-hidden="true">
        {projects.map((p, i) => (
          <div className="hero__img" data-active={i === active} key={p.slug}>
            <Image
              src={p.hero}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 62vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
        <div className="hero__shade" />
      </div>

      <div className="hero__head">
        <span className="eyebrow">Featured</span>
        <span className="mono-xs hero__count">
          {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <ol className="hero__list">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="hero__item"
              data-active={i === active}
              data-cursor="Open"
              onMouseEnter={() => select(i)}
              onFocus={() => select(i)}
            >
              <span className="hero__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="hero__title display d2">
                <SplitWords text={p.name} hero start={i * 3} />
              </span>
              <span className="hero__meta mono-xs">
                {p.client}
                {p.year ? ` — ${p.year}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="hero__foot">
        <div className="hero__progress" key={`${active}-${cycle}`} data-paused={held} />
        <span className="mono-xs muted">{current.typology || current.types.join(" · ")}</span>
        <a href="#work" className="hero__scroll mono-xs" aria-label="Scroll to all projects">
          Scroll <span className="dot dot--live" />
        </a>
      </div>
    </section>
  );
}
