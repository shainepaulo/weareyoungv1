import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { DirectorsIndex } from "@/components/roster/DirectorsIndex";
import { DIRECTORS, SAMPLE } from "@/lib/directors";
import { ROSTER, STATS } from "@/lib/projects";
import "../pages.css";
import "@/components/roster/roster.css";

export const metadata: Metadata = {
  title: "Roster",
  description: `${DIRECTORS.length} directors, ${STATS.brands} brands, ${STATS.projects} projects.`,
};

const letterOf = (s: string) => s[0].toUpperCase();

export default function RosterPage() {
  const letters = [...new Set(ROSTER.map((g) => letterOf(g.brand)))];

  return (
    <>
      <section className="section tone-dark page-hero">
        <div className="gridlines" />
        <span className="eyebrow">Roster</span>
        <h1 className="display d1">
          <SplitWords text={`${STATS.brands} brands.`} hero />
          <br />
          <SplitWords text={`${STATS.projects} projects.`} hero start={2} />
        </h1>
        <p className="mono-l measure muted">
          The people who signed the work, and the brands who went their own way with us. Pick a
          director to read the roster through them.
        </p>
      </section>

      <DirectorsIndex
        directors={DIRECTORS.map((d) => ({ slug: d.slug, name: d.name }))}
        sample={SAMPLE}
      />

      <div className="tone-dark roster">
        <div className="roster__bar">
          <div className="row-between">
            <h2 className="display d3">
              By brand
              <span className="blink" aria-hidden="true">_</span>
            </h2>
            <span className="mono-xs muted">
              {String(ROSTER.length).padStart(2, "0")} brands ·{" "}
              {String(STATS.projects).padStart(3, "0")} projects
            </span>
          </div>
          <nav className="roster__index mono-xs" aria-label="Jump to letter">
            {letters.map((l) => (
              <a key={l} href={`#brand-${l}`}>
                {l}
              </a>
            ))}
          </nav>
        </div>

        {ROSTER.map((group, gi) => {
          const letter = letterOf(group.brand);
          const first = ROSTER.findIndex((g) => letterOf(g.brand) === letter) === gi;
          return (
            <Reveal
              as="section"
              kind="fade"
              className="roster__group"
              key={group.brand}
              id={first ? `brand-${letter}` : undefined}
            >
              <div className="gridlines" />
              <header className="roster__brand">
                <h3 className="display d2">{group.brand}</h3>
                <span className="mono-xs muted">
                  {String(group.projects.length).padStart(2, "0")}{" "}
                  {group.projects.length > 1 ? "projects" : "project"}
                </span>
              </header>
              <ul className="roster__strip">
                {group.projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="tile" data-cursor="View">
                      <figure className="tile__media">
                        <Image
                          src={p.cover}
                          alt={p.title}
                          fill
                          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 80vw"
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                      <span className="tile__title display d5">{p.title}</span>
                      <span className="tile__meta mono-xs muted">{p.year ?? "—"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
