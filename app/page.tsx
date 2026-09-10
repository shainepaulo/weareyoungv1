import { GridHero } from "@/components/home/GridHero";
import { ProjectExplorer, type Card } from "@/components/home/ProjectExplorer";
import { PulseBand } from "@/components/motion/PulseBand";
import { FEATURED_PROJECTS, PROJECT_LIST, YEAR_RANGE } from "@/lib/projects";

/** Only what the grid paints; the case copy stays on the server. */
const CARDS: Card[] = PROJECT_LIST.map((p) => ({
  slug: p.slug,
  index: p.index,
  title: p.title,
  client: p.client,
  year: p.year,
  cover: p.cover,
  types: p.types,
  tags: p.tags,
}));

export default function HomePage() {
  return (
    <>
      <GridHero projects={FEATURED_PROJECTS} />

      {/* The claim, given the full Kalkbrenner treatment: white on black, a dot
          in front of every fragment, and the mark itself closing the sentence. */}
      <PulseBand
        tone="dark"
        perRow={2}
        amplitude={0.06}
        logoTail
        words={["Creative", "agency", "for brands", "who dare", "to go their", "own"]}
      />

      <ProjectExplorer cards={CARDS} years={YEAR_RANGE} />
    </>
  );
}
