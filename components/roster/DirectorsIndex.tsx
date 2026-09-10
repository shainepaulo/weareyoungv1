"use client";

import Link from "next/link";
import { useState } from "react";
import "./roster.css";

export interface DirectorLink {
  slug: string;
  name: string;
}

/**
 * The roster's directors, set the way a signed list should be set: small,
 * in columns, nothing but names. Hovering one dims the rest — the only
 * decoration the list needs, and the fastest way to read a long roster.
 */
export function DirectorsIndex({
  directors,
  sample,
}: {
  directors: DirectorLink[];
  sample: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="directors tone-dark" aria-labelledby="directors-title">
      <div className="gridlines" />

      <header className="directors__head">
        <h2 id="directors-title" className="eyebrow">
          Directors
        </h2>
        {sample && <span className="mono-xs muted">Sample names — to be replaced</span>}
      </header>

      <div className="directors__names mono" onMouseLeave={() => setHovered(null)}>
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
    </section>
  );
}
