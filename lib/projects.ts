import { FEATURED, FILTER_LISTS, PROJECTS } from "./way-data";
import details from "./way-projects.json";

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
const TYPE_BY_TAG = tagLabel("11");

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
    types: p.tags.filter((t) => TYPE_BY_TAG.has(t)).map((t) => TYPE_BY_TAG.get(t)!),
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

export const TYPES = FILTER_LISTS["11"].map((o) => o.label);
export const BRANDS = FILTER_LISTS["12"].map((o) => o.label);

/** Projects grouped by brand, alphabetical, for the roster. */
export const ROSTER: { brand: string; projects: Project[] }[] = [...new Set(PROJECT_LIST.map((p) => p.brand))]
  .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
  .map((brand) => ({ brand, projects: PROJECT_LIST.filter((p) => p.brand === brand) }));

export const YEARS = PROJECT_LIST.map((p) => p.year).filter((y): y is number => Boolean(y));
export const YEAR_RANGE = { from: Math.min(...YEARS), to: Math.max(...YEARS) };

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
  maps: "https://maps.google.com/?q=17+Quai+des+Grands+Augustins+75006+Paris",
};
