import type { Metadata } from "next";
import { ProjectExplorer, type Card } from "@/components/home/ProjectExplorer";
import { RosterBoard, type DirectorLink, type Tile } from "@/components/roster/RosterBoard";
import { DIRECTORS } from "@/lib/directors";
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
      {/* No hero: the page opens straight on the names and the wall. The page
          still needs one heading, so it is carried for assistive tech only. */}
      <h1 className="sr-only">
        Roster — {DIRECTORS.length} directors, {STATS.projects} projects
      </h1>

      <RosterBoard directors={directors} tiles={tiles} />

      {/* The catalogue, moved off the landing page: same filters, same
          height-capped grid, same control to unroll it. */}
      <ProjectExplorer cards={cards} years={YEAR_RANGE} />
    </>
  );
}
