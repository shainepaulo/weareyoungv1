"use client";

import Image from "next/image";
import Link from "next/link";
import { flushSync } from "react-dom";
import { useMemo, useState, type CSSProperties } from "react";
import { FILTER_LISTS } from "@/lib/way-data";
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

/** The four top-level controls, as on the current site: All, Client, Most recent, Type of work. */
const GROUPS = [
  { key: "all", label: "All", tag: null, list: null },
  { key: "client", label: "Client", tag: "n12", list: "12" },
  { key: "recent", label: "Most recent", tag: "n9", list: null },
  { key: "type", label: "Type of work", tag: "n11", list: "11" },
] as const;

type GroupKey = (typeof GROUPS)[number]["key"];

/**
 * Filters + the chronological grid. Filtering runs inside a view transition:
 * every card carries its own `view-transition-name`, so the browser moves the
 * survivors to their new cells and fades the rest — the mixitup shuffle of
 * the current site, with no library behind it. Browsers without the API just
 * swap.
 */
export function ProjectExplorer({ cards, years }: { cards: Card[]; years: { from: number; to: number } }) {
  const [group, setGroup] = useState<GroupKey>("all");
  const [tag, setTag] = useState<string | null>(null);

  const list = GROUPS.find((g) => g.key === group)?.list ?? null;
  const options = list ? FILTER_LISTS[list] : [];

  const visible = useMemo(() => (tag ? cards.filter((c) => c.tags.includes(tag)) : cards), [cards, tag]);

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
    // A skipped transition rejects both promises; that is the expected path, not an error.
    vt.ready.catch(() => {});
    vt.finished.catch(() => {});
    window.setTimeout(() => {
      if (applied) return;
      vt.skipTransition();
      once();
    }, 150);
  };

  const pick = (key: GroupKey) => {
    const g = GROUPS.find((x) => x.key === key)!;
    transition(() => {
      setGroup(key);
      setTag(g.tag);
    });
  };

  const toggle = (t: string) => {
    const fallback = GROUPS.find((g) => g.key === group)!.tag;
    transition(() => setTag(tag === t ? fallback : t));
  };

  const activeLabel = tag
    ? (options.find((o) => o.filter === `.${tag}`)?.label ?? GROUPS.find((g) => g.tag === tag)?.label)
    : "All";

  return (
    <section id="work" className="explorer tone-dark section section--tight">
      <div className="gridlines" />

      <header className="explorer__head">
        <h2 className="display d3">All work</h2>
        <span className="mono-s muted">
          {String(cards.length).padStart(3, "0")} projects — {years.from}→{years.to}
        </span>
      </header>

      <div className="filters">
        <div className="filters__row" role="tablist" aria-label="Filter projects">
          {GROUPS.map((g) => (
            <button key={g.key} type="button" role="tab" className="filters__btn" aria-selected={group === g.key} onClick={() => pick(g.key)}>
              <span className="dot" aria-hidden="true" />
              {g.label}
              {g.list && (
                <span className="filters__caret" aria-hidden="true">
                  {group === g.key ? "−" : "+"}
                </span>
              )}
            </button>
          ))}
          <span className="filters__count mono-xs">
            {activeLabel} <span className="muted">/ {String(visible.length).padStart(3, "0")}</span>
          </span>
        </div>

        <div className="filters__panel" data-open={options.length > 0}>
          <div>
            <ul className="filters__chips">
              {options.map((o) => {
                const t = o.filter.slice(1);
                return (
                  <li key={t}>
                    <button type="button" className="chip" aria-pressed={tag === t} onClick={() => toggle(t)}>
                      {o.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <ol className="cards">
        {visible.map((c, i) => (
          <li
            key={c.slug}
            className="card"
            data-col={(i % 3) + 1}
            style={{ viewTransitionName: `card-${c.slug}`, "--i": Math.min(i, 11) } as CSSProperties}
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
    </section>
  );
}
