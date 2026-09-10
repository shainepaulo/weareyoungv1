import { FeaturedHero } from "@/components/home/FeaturedHero";
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
      <FeaturedHero projects={FEATURED_PROJECTS} />

      <PulseBand
        tone="light"
        perRow={2}
        words={["A creative", "agency", "for brands", "who dare", "to go their", "own WAY"]}
      />

      <ProjectExplorer cards={CARDS} years={YEAR_RANGE} />
    </>
  );
}
