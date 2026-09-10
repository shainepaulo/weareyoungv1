"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
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

export function ProjectExplorer({ cards, years }: { cards: Card[]; years: { from: number; to: number } }) {
  const [group, setGroup] = useState<GroupKey>("all");
  const [tag, setTag] = useState<string | null>(null);

  const list = GROUPS.find((g) => g.key === group)?.list ?? null;
  const options = list ? FILTER_LISTS[list] : [];

  const visible = useMemo(() => (tag ? cards.filter((c) => c.tags.includes(tag)) : cards), [cards, tag]);

  const pick = (key: GroupKey) => {
    const g = GROUPS.find((x) => x.key === key)!;
    setGroup(key);
    setTag(g.tag);
  };

  const activeLabel = tag ? (options.find((o) => o.filter === `.${tag}`)?.label ?? GROUPS.find((g) => g.tag === tag)?.label) : "All";

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
            <button
              key={g.key}
              type="button"
              role="tab"
              className="filters__btn"
              aria-selected={group === g.key}
              onClick={() => pick(g.key)}
            >
              <span className="dot" aria-hidden="true" />
              {g.label}
              {g.list && <span className="filters__caret" aria-hidden="true">{group === g.key ? "−" : "+"}</span>}
            </button>
          ))}
          <span className="filters__count mono-xs">
            {activeLabel} <span className="muted">/ {String(visible.length).padStart(3, "0")}</span>
          </span>
        </div>

        <AnimatePresence initial={false}>
          {options.length > 0 && (
            <motion.div
              key={list}
              className="filters__panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
            >
              <ul className="filters__chips">
                {options.map((o) => {
                  const t = o.filter.slice(1);
                  return (
                    <li key={t}>
                      <button
                        type="button"
                        className="chip"
                        aria-pressed={tag === t}
                        onClick={() => setTag(tag === t ? GROUPS.find((g) => g.key === group)!.tag : t)}
                      >
                        {o.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LayoutGroup>
        <motion.ol className="cards" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.li
                key={c.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 8) * 0.03 }}
                className="card"
                data-col={(i % 3) + 1}
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
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ol>
      </LayoutGroup>

      {visible.length === 0 && <p className="mono-l muted explorer__empty">Nothing here yet_</p>}
    </section>
  );
}
