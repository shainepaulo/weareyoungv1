import { GridHero } from "@/components/home/GridHero";
import { PulseBand } from "@/components/motion/PulseBand";
import { FEATURED_PROJECTS } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <GridHero projects={FEATURED_PROJECTS} />

      {/* The claim, given the full Kalkbrenner treatment: white on black, a dot
          in front of every fragment, and the mark itself closing the sentence.
          The work itself now lives on /roster. */}
      <PulseBand
        tone="dark"
        perRow={2}
        amplitude={0.06}
        logoTail
        words={["Creative", "agency", "for brands", "who dare", "to go their", "own"]}
      />
    </>
  );
}
