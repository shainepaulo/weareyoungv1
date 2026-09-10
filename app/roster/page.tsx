import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { ROSTER, STATS } from "@/lib/projects";
import "../pages.css";

export const metadata: Metadata = {
  title: "Roster",
  description: `${STATS.brands} brands, ${STATS.projects} projects. The brands who went their own way with WAY.`,
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
          <SplitWords text={`${STATS.projects} projects.`} hero start={3} />
        </h1>
        <p className="mono-l measure muted">
          The brands who went their own way with us — every project, sorted by name, so the roster reads like one.
        </p>
        <nav className="roster__index mono-xs" aria-label="Jump to letter">
          {letters.map((l) => (
            <a key={l} href={`#brand-${l}`}>
              {l}
            </a>
          ))}
        </nav>
      </section>

      <div className="tone-dark roster">
        {ROSTER.map((group, gi) => {
          const letter = letterOf(group.brand);
          const first = ROSTER.findIndex((g) => letterOf(g.brand) === letter) === gi;
          return (
            <Reveal as="section" kind="fade" className="roster__group" key={group.brand} id={first ? `brand-${letter}` : undefined}>
              <div className="gridlines" />
              <header className="roster__brand">
                <h2 className="display d2">{group.brand}</h2>
                <span className="mono-xs muted">
                  {String(group.projects.length).padStart(2, "0")} {group.projects.length > 1 ? "projects" : "project"}
                </span>
              </header>
              <ul className="roster__strip">
                {group.projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="tile" data-cursor="View">
                      <figure className="tile__media">
                        <Image src={p.cover} alt={p.name} fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 80vw" style={{ objectFit: "cover" }} />
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
