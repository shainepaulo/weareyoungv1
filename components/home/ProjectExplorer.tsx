"use client";

import Image from "next/image";
import Link from "next/link";
import { flushSync } from "react-dom";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { FILTER_LISTS } from "@/lib/way-data";
import { TYPES } from "@/lib/taxonomy";
import "./home.css";

export interface Card {
  slug: string;
  index: number;
  title: string;
  client: string;
  year: number | null;
  cover: string;
  types: string[];
  tags: string[];
}

/** What the current selection matches against. */
type Filter =
  | { kind: "all" }
  /** A class from the old data model — client names and the curated "most recent". */
  | { kind: "tag"; value: string }
  /** One of the studio's disciplines. */
  | { kind: "type"; value: string };

const GROUPS = [
  { key: "all", label: "All" },
  { key: "client", label: "Client" },
  { key: "recent", label: "Most recent" },
  { key: "type", label: "Type of work" },
] as const;

type GroupKey = (typeof GROUPS)[number]["key"];

const CLIENTS = FILTER_LISTS["12"];

export function ProjectExplorer({ cards }: { cards: Card[] }) {
  const [group, setGroup] = useState<GroupKey>("all");
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [open, setOpen] = useState(false);

  const grid = useRef<HTMLOListElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  /** Whether the collapsed grid actually hides anything worth a button. */
  const [truncated, setTruncated] = useState(false);

  const visible = useMemo(() => {
    if (filter.kind === "all") return cards;
    if (filter.kind === "tag") return cards.filter((c) => c.tags.includes(filter.value));
    return cards.filter((c) => c.types.includes(filter.value));
  }, [cards, filter]);

  // The grid is capped by height, not by a count, so "two screens" means the
  // same thing on a phone and on a desktop. Whether that cap is actually
  // cutting anything off is the only thing the button needs to know.
  useEffect(() => {
    const node = grid.current;
    if (!node) return;

    const measure = () => setTruncated(node.scrollHeight > node.clientHeight + 8);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, open]);

  /**
   * Commit a state change inside a view transition when the browser has one.
   * The snapshot the browser takes first normally costs a frame; if it takes
   * longer than a tap should, the transition is skipped and the change lands
   * anyway — the filter must never feel slower than the animation.
   */
  const transition = (apply: () => void) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => {
        skipTransition: () => void;
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    let applied = false;
    const once = () => {
      if (applied) return;
      applied = true;
      apply();
    };
    const vt = doc.startViewTransition(() => flushSync(once));
    vt.ready.catch(() => {});
    vt.finished.catch(() => {});
    window.setTimeout(() => {
      if (applied) return;
      vt.skipTransition();
      once();
    }, 150);
  };

  const pickGroup = (key: GroupKey) => {
    transition(() => {
      setGroup(key);
      setFilter(key === "recent" ? { kind: "tag", value: "n9" } : { kind: "all" });
    });
  };

  const pickTag = (value: string) =>
    transition(() =>
      setFilter((f) => (f.kind === "tag" && f.value === value ? { kind: "all" } : { kind: "tag", value })),
    );

  const pickType = (value: string) =>
    transition(() =>
      setFilter((f) => (f.kind === "type" && f.value === value ? { kind: "all" } : { kind: "type", value })),
    );

  /** Rolling the grid back up must not strand the reader below the fold. */
  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      anchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setOpen(true);
    }
  };

  const activeLabel =
    filter.kind === "all"
      ? "All"
      : filter.kind === "type"
        ? filter.value
        : (CLIENTS.find((o) => o.filter === `.${filter.value}`)?.label ?? "Most recent");

  return (
    <section id="work" className="explorer tone-dark section section--tight">
      <div className="gridlines" />

      <header className="explorer__head">
        <h2 className="display d3">All work</h2>
      </header>

      <div className="filters" ref={anchor}>
        <div className="filters__row" role="tablist" aria-label="Filter projects">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              className="filters__btn"
              aria-selected={group === g.key}
              onClick={() => pickGroup(g.key)}
            >
              <span className="dot" aria-hidden="true" />
              {g.label}
            </button>
          ))}
          <span className="filters__count mono-xs">
            {activeLabel} <span className="muted">/ {String(visible.length).padStart(3, "0")}</span>
          </span>
        </div>

        <div className="filters__panel" data-open={group === "client" || group === "type"}>
          <div>
            <ul className="filters__chips">
              {group === "client" &&
                CLIENTS.map((o) => {
                  const tag = o.filter.slice(1);
                  return (
                    <li key={tag}>
                      <button
                        type="button"
                        className="chip"
                        aria-pressed={filter.kind === "tag" && filter.value === tag}
                        onClick={() => pickTag(tag)}
                      >
                        {o.label}
                      </button>
                    </li>
                  );
                })}

              {group === "type" &&
                TYPES.map((type) => (
                  <li key={type}>
                    <button
                      type="button"
                      className="chip"
                      aria-pressed={filter.kind === "type" && filter.value === type}
                      onClick={() => pickType(type)}
                    >
                      {type}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <ol className="cards" ref={grid} data-collapsed={!open}>
        {visible.map((c, i) => (
          <li
            key={c.slug}
            className="card"
            data-col={(i % 3) + 1}
            style={{ viewTransitionName: `card-${c.slug}` } as CSSProperties}
          >
            <Link href={`/projects/${c.slug}`} className="card__link" data-cursor="View">
              <figure className="card__media">
                <Image
                  src={c.cover}
                  alt={`${c.title} — ${c.client}`}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw"
                  loading={i < 3 ? "eager" : "lazy"}
                  style={{ objectFit: "cover" }}
                />
              </figure>
              <div className="card__body">
                <span className="card__index mono-xs">{String(c.index).padStart(3, "0")}</span>
                <h3 className="card__title display d4">{c.title}</h3>
                <span className="card__meta mono-xs muted">
                  {c.client}
                  {c.year ? ` — ${c.year}` : ""}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {visible.length === 0 && <p className="mono-l muted explorer__empty">Nothing here yet_</p>}

      {(truncated || open) && (
        <button type="button" className="more" onClick={toggleOpen} aria-expanded={open}>
          <span className="more__label">
            {open ? "Show fewer" : `Show all ${String(visible.length).padStart(3, "0")} projects`}
          </span>
          <span className="more__arrow" aria-hidden="true" data-open={open}>
            ↓
          </span>
        </button>
      )}
    </section>
  );
}
