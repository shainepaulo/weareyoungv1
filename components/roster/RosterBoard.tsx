"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./roster.css";

export interface DirectorLink {
  slug: string;
  name: string;
  /** Project slugs they signed — what stays lit when their name is hovered. */
  projects: string[];
}

export interface Tile {
  slug: string;
  cover: string;
  /** Alt text only; nothing is printed under the tile. */
  label: string;
}

/**
 * The roster board: the signed names, then every project as one flat wall of
 * equal tiles in no particular order.
 *
 * Hovering a name is the whole interaction — the wall dims except for that
 * director's work, so a roster of twelve people can be read by pointing at it
 * rather than by clicking through twelve pages. Clicking still opens the
 * director, for the long version.
 */
export function RosterBoard({
  directors,
  tiles,
}: {
  directors: DirectorLink[];
  tiles: Tile[];
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const lit = hovered ? new Set(directors.find((d) => d.slug === hovered)?.projects ?? []) : null;

  return (
    <section className="board tone-dark" aria-labelledby="directors-title">
      <header className="board__head">
        <h2 id="directors-title" className="eyebrow">
          Directors
        </h2>
      </header>

      <div className="board__names mono" onMouseLeave={() => setHovered(null)}>
        {directors.map((d) => (
          <Link
            key={d.slug}
            href={`/roster/${d.slug}`}
            className="director"
            data-dim={hovered !== null && hovered !== d.slug}
            onMouseEnter={() => setHovered(d.slug)}
            onFocus={() => setHovered(d.slug)}
            onBlur={() => setHovered(null)}
          >
            {d.name}
          </Link>
        ))}
      </div>

      <ul className="wall" aria-label="All projects">
        {tiles.map((t) => (
          <li key={t.slug} className="wall__cell" data-dim={lit !== null && !lit.has(t.slug)}>
            <Link href={`/projects/${t.slug}`} className="wall__link" data-cursor="View">
              <Image
                src={t.cover}
                alt={t.label}
                fill
                sizes="(min-width: 1280px) 17vw, (min-width: 900px) 25vw, (min-width: 600px) 33vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
