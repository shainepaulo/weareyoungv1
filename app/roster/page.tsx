import type { Metadata } from "next";
import { SplitWords } from "@/components/motion/SplitWords";
import { ProjectExplorer, type Card } from "@/components/home/ProjectExplorer";
import { RosterBoard, type DirectorLink, type Tile } from "@/components/roster/RosterBoard";
import { DIRECTORS, SAMPLE } from "@/lib/directors";
import { PROJECT_LIST, SHUFFLED, STATS, YEAR_RANGE } from "@/lib/projects";
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

/** Only what the filtered grid paints; the case copy stays on the server. */
const cards: Card[] = PROJECT_LIST.map((p) => ({
  slug: p.slug,
  index: p.index,
  title: p.title,
  client: p.client,
  year: p.year,
  cover: p.cover,
  types: p.types,
  tags: p.tags,
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
          come forward, or filter the whole catalogue below.
        </p>
      </section>

      <RosterBoard directors={directors} tiles={tiles} sample={SAMPLE} />

      {/* The catalogue, moved off the landing page: same filters, same
          height-capped grid, same control to unroll it. */}
      <ProjectExplorer cards={cards} years={YEAR_RANGE} />
    </>
  );
}
