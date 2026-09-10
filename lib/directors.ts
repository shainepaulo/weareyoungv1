import { PROJECT_LIST, type Project } from "./projects";

export interface Director {
  slug: string;
  name: string;
  role: string;
  /** Two or three sentences, first person plural avoided — the roster voice. */
  bio: string;
  /** Slugs of the projects they signed, most recent first. */
  projects: string[];
}

/**
 * ⚠ SAMPLE ROSTER — invented people.
 *
 * The agency publishes no director credits anywhere we could scrape, so these
 * names, roles and bios are written to give the page something true to its
 * shape. They are placeholders in the way lorem ipsum is a placeholder: nobody
 * here exists, and the projects are dealt out to them, not credited.
 *
 * To make it real: replace `SEED` with the actual roster and each director's
 * `projects`, then set SAMPLE to false — the notice in the roster header goes
 * away with it.
 */
export const SAMPLE = true;

const SEED: Omit<Director, "slug" | "projects">[] = [
  {
    name: "Amaya Okonjo",
    role: "Director",
    bio: "Amaya builds films around the people already in the room. She came to directing from documentary and never quite left it: her sets are small, her takes are long, and the thing she is waiting for is usually the moment after everyone assumes the shot is over.",
  },
  {
    name: "Basile Renard",
    role: "Director / DOP",
    bio: "Basile shoots what he directs, which is why his work reads as one continuous gesture rather than a sequence of setups. He is happiest on a roadshow, in a city he does not know, with a camera that fits in one hand.",
  },
  {
    name: "Chloé Vandamme",
    role: "Director",
    bio: "Chloé works in scale. Arenas, façades, crowds of several thousand — she treats an audience as a material and choreographs it. Every project of hers starts with a floor plan before it ever gets a storyboard.",
  },
  {
    name: "Dario Sperti",
    role: "Director",
    bio: "Dario has an editor's brain and a photographer's eye, and the argument between the two is where his films live. He cuts fast, holds longer than is comfortable, and always knows exactly which frame the whole thing hangs on.",
  },
  {
    name: "Faye Lindqvist",
    role: "Director / Photographer",
    bio: "Faye moves between stills and motion without changing register. Her lighting is flat, deliberate and unforgiving, and it makes brands look like they have nothing to hide — which is usually the point.",
  },
  {
    name: "Gaspard Ruiz",
    role: "Director",
    bio: "Gaspard directs sport the way other people direct music: rhythm first, result second. He spent years around courts and pitches before he ever held a camera, and it shows in how early he knows where to point it.",
  },
  {
    name: "Inès Bacharel",
    role: "Director",
    bio: "Inès makes things that only work once. Stunts, takeovers, one-night installations — the brief she likes is the one where the film is the only thing that will survive the evening, so it had better be worth keeping.",
  },
  {
    name: "Jonas Weil",
    role: "Director",
    bio: "Jonas came out of shopper and retail and kept the discipline: no shot that does not do a job. What he added is a sense of humour, which turns out to be the fastest way through a crowded aisle.",
  },
  {
    name: "Léonie Trân",
    role: "Director",
    bio: "Léonie writes before she shoots, and it shows — her films have an argument, not just a mood. She is drawn to work that has to convince someone of something, and to the kind of brief other directors call difficult.",
  },
  {
    name: "Malik Sissoko",
    role: "Director",
    bio: "Malik grew up in the culture most brands are trying to borrow, and he is careful with it. His films put the people first and the logo last, and the brands who trust him with that have never regretted it.",
  },
  {
    name: "Noor Al-Rashid",
    role: "Director",
    bio: "Noor treats a campaign as one object across every screen it will land on. She storyboards the sixteen-by-nine and the nine-by-sixteen in the same pass, and neither one ever feels like the offcut.",
  },
  {
    name: "Tomas Berg",
    role: "Director",
    bio: "Tomas is the one you call when it has to be built. Practical effects, in-camera tricks, things on wires — he would rather spend a day in a workshop than an afternoon in post, and the footage is better for it.",
  },
];

/** "Léonie Trân" -> "leonie-tran"; the character class is the combining-marks range. */
const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const DIRECTORS: Director[] = SEED.map((d, i) => ({
  ...d,
  slug: slugify(d.name),
  projects: PROJECT_LIST.filter((_, p) => p % SEED.length === i).map((p) => p.slug),
}));

export const DIRECTOR_BY_SLUG = new Map(DIRECTORS.map((d) => [d.slug, d]));

/** The projects a director signed, in the site's chronological order. */
export function projectsOf(director: Director): Project[] {
  const owned = new Set(director.projects);
  return PROJECT_LIST.filter((p) => owned.has(p.slug));
}

/** The disciplines their work covers, most frequent first. */
export function disciplinesOf(director: Director): string[] {
  const tally = new Map<string, number>();
  for (const project of projectsOf(director)) {
    for (const type of project.types) tally.set(type, (tally.get(type) ?? 0) + 1);
  }
  return [...tally.entries()].sort((a, b) => b[1] - a[1]).map(([type]) => type);
}
