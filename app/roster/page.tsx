import type { Metadata } from "next";
import { SplitWords } from "@/components/motion/SplitWords";
import { RosterBoard, type DirectorLink, type Tile } from "@/components/roster/RosterBoard";
import { DIRECTORS, SAMPLE } from "@/lib/directors";
import { SHUFFLED, STATS } from "@/lib/projects";
import "../pages.css";

export const metadata: Metadata = {
  title: "Roster",
  description: `${DIRECTORS.length} directors, ${STATS.projects} projects.`,
};

const directors: DirectorLink[] = DIRECTORS.map((d) => ({
  slug: d.slug,
  name: d.name,
  projects: d.projects,
}));

const tiles: Tile[] = SHUFFLED.map((p) => ({
  slug: p.slug,
  cover: p.cover,
  label: p.name,
}));

export default function RosterPage() {
  return (
    <>
      <section className="section tone-dark page-hero">
        <div className="gridlines" />
        <span className="eyebrow">Roster</span>
        <h1 className="display d1">
          <SplitWords text={`${STATS.projects} projects.`} hero />
        </h1>
        <p className="mono-l measure muted">
          Everything we have signed, in no particular order. Point at a director to see their work
          come forward.
        </p>
      </section>

      <RosterBoard directors={directors} tiles={tiles} sample={SAMPLE} />
    </>
  );
}
