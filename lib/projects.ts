import { FEATURED, FILTER_LISTS, PROJECTS } from "./way-data";
import details from "./way-projects.json";
import { PROJECT_TYPES, TYPES } from "./taxonomy";

export interface Block {
  side: "left" | "right";
  image: string | null;
  caption: string;
}

export interface Project {
  slug: string;
  /** 1-based position in the chronological grid (most recent first). */
  index: number;
  /** Short grid title ("ARENA"). */
  title: string;
  /** Full title from the case page ("ADIDAS ARENA"). */
  name: string;
  client: string;
  /** Canonical client label from the filter list, when the project is tagged. */
  brand: string;
  types: string[];
  typology: string;
  year: number | null;
  cover: string;
  hero: string;
  intro: string;
  videos: string[];
  blocks: Block[];
  gallery: string[];
  prev: string | null;
  next: string | null;
  featured: boolean;
  tags: string[];
}

interface Detail {
  slug: string;
  title: string;
  client: string;
  typology: string;
  year: number | null;
  hero: string | null;
  intro: string;
  videos: string[];
  blocks: Block[];
  gallery: (string | null)[];
  prev: string | null;
  next: string | null;
}

const slugOf = (href: string) => /\/projects\/([^/]+)\/?$/.exec(href)?.[1] ?? href;

const tagLabel = (list: string) =>
  new Map(FILTER_LISTS[list].map((o) => [o.filter.slice(1), o.label]));

const CLIENT_BY_TAG = tagLabel("12");

const DETAIL = new Map((details as Detail[]).map((d) => [d.slug, d]));
const FEATURED_SLUGS = new Set(FEATURED.map((f) => slugOf(f.href)));

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|\s|-)\S/g, (c) => c.toUpperCase());

export const PROJECT_LIST: Project[] = PROJECTS.map((p, i) => {
  const slug = slugOf(p.href);
  const d = DETAIL.get(slug);
  const brandTag = p.tags.find((t) => CLIENT_BY_TAG.has(t));
  const client = (d?.client || p.client.replace(/^_\s*/, "")).trim();

  return {
    slug,
    index: i + 1,
    title: p.title,
    name: d?.title || p.title,
    client: titleCase(client),
    brand: brandTag ? CLIENT_BY_TAG.get(brandTag)! : titleCase(client),
    // Disciplines come from the re-tagged taxonomy, not the old filter list.
    types: PROJECT_TYPES[slug] ?? [],
    typology: d?.typology ?? "",
    year: d?.year ?? null,
    cover: p.image,
    hero: d?.hero ?? p.image,
    intro: d?.intro ?? "",
    videos: d?.videos ?? [],
    blocks: (d?.blocks ?? []).filter((b) => b.image),
    gallery: (d?.gallery ?? []).filter((g): g is string => Boolean(g)),
    prev: d?.prev ?? null,
    next: d?.next ?? null,
    featured: FEATURED_SLUGS.has(slug),
    tags: p.tags,
  };
});

export const BY_SLUG = new Map(PROJECT_LIST.map((p) => [p.slug, p]));

export const FEATURED_PROJECTS: Project[] = FEATURED.map((f) => BY_SLUG.get(slugOf(f.href))!).filter(Boolean);

export { TYPES } from "./taxonomy";
export const BRANDS = FILTER_LISTS["12"].map((o) => o.label);

/** Projects grouped by brand, alphabetical, for the roster. */
export const ROSTER: { brand: string; projects: Project[] }[] = [...new Set(PROJECT_LIST.map((p) => p.brand))]
  .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
  .map((brand) => ({ brand, projects: PROJECT_LIST.filter((p) => p.brand === brand) }));

export const YEARS = PROJECT_LIST.map((p) => p.year).filter((y): y is number => Boolean(y));
export const YEAR_RANGE = { from: Math.min(...YEARS), to: Math.max(...YEARS) };

export interface BrandStats {
  client: string;
  projects: number;
  yearFrom: number;
  yearTo: number;
  videos: number;
  photos: number;
  disciplines: { label: string; count: number }[];
}

/**
 * The relationship with one client, in numbers — for the "technical" section
 * requested on the adidas-pulse case (see presaddidas). Matches on the
 * display client name rather than the roster's `brand` grouping, so "adidas"
 * and "adidas Originals" count as one relationship, the way a client reads
 * their own history with the agency.
 */
export function getBrandStats(clientName: string): BrandStats | null {
  const needle = clientName.toLowerCase();
  const projects = PROJECT_LIST.filter((p) => p.client.toLowerCase().includes(needle));
  if (projects.length === 0) return null;

  const years = projects.map((p) => p.year).filter((y): y is number => Boolean(y));
  const disciplineCounts = new Map<string, number>();
  projects.forEach((p) => p.types.forEach((t) => disciplineCounts.set(t, (disciplineCounts.get(t) ?? 0) + 1)));

  return {
    client: clientName,
    projects: projects.length,
    yearFrom: Math.min(...years),
    yearTo: Math.max(...years),
    videos: projects.reduce((n, p) => n + p.videos.length, 0),
    photos: projects.reduce((n, p) => n + p.gallery.length, 0),
    disciplines: [...disciplineCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export const STATS = {
  projects: PROJECT_LIST.length,
  brands: ROSTER.length,
  services: TYPES.length,
  years: "15+",
};

export const SITE = {
  name: "We Are Young",
  short: "WAY",
  claim: "A creative agency for brands who dare to go their own WAY",
  address: ["17 Quai des Grands Augustins", "75006 Paris"],
  phone: "+33 1 82 15 61 99",
  phoneHref: "tel:+33182156199",
  mail: "contact@weareyoung-agency.com",
  studio: { label: "WAY.TV", href: "https://www.waytv.paris/" },
  instagram: "https://www.instagram.com/wayagency.paris/",
  vimeo: "https://vimeo.com/waytv",
  maps: "https://maps.google.com/?q=17+Quai+des+Grands+Augustins+75006+Paris",

  /**
   * Landing copy. Unlike the /about manifesto this is NOT from the current
   * site — it's from the client's approved final PDF comp (WAY AGENCY -
   * Arborescence.pdf). The comp's duplicated "restore value the value" was a
   * typo in the source and is corrected here, on the client's call.
   */
  how: "A collective of rebellious minds moving as one, driven to push boundaries and make provocative ideas happen.",
  what: "Aiming to restore the value of content in sport, brands and culture.",
};

/**
 * The project list in a fixed shuffle — the roster wall is meant to read as
 * one body of work, not as a ranking or an alphabet. Seeded so the server and
 * the browser agree and the page stays prerenderable.
 */
export const SHUFFLED: Project[] = (() => {
  const out = [...PROJECT_LIST];
  let seed = 0x5eed;
  const next = () => {
    // xorshift: small, deterministic, good enough to break up the order.
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return Math.abs(seed) / 0x7fffffff;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
})();
