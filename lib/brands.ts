/**
 * The client marks that run across the foot of the roster — four of WAY's own
 * clients, taken from the project data.
 *
 * They are drawn as CSS masks rather than <img>, so a single flat path follows
 * `currentColor` and comes out white on the dark footer without shipping a
 * recoloured copy of anyone's logo.
 *
 * These are registered trademarks of their owners, used here the way an agency
 * uses a client list. Swap `src` for the brand's own supplied asset if legal
 * ever asks for the official file.
 */
export interface BrandMark {
  name: string;
  /** Monochrome SVG in /public/brands, square viewBox. */
  src: string;
}

export const BRAND_MARKS: BrandMark[] = [
  { name: "adidas", src: "/brands/adidas.svg" },
  { name: "Jordan", src: "/brands/jordan.svg" },
  { name: "Reebok", src: "/brands/reebok.svg" },
  { name: "Netflix", src: "/brands/netflix.svg" },
];
