/**
 * The client marks that run across the foot of the roster — seven of WAY's own
 * clients, taken from the project data.
 *
 * They are drawn as CSS masks rather than <img>, so a single flat shape follows
 * `currentColor` and comes out white on the dark footer without shipping a
 * recoloured copy of anyone's logo. Only the alpha channel is read, so a mark
 * can be a flat SVG path or a cut-out PNG; either way the artwork's own colour
 * is discarded.
 *
 * These are registered trademarks of their owners, used here the way an agency
 * uses a client list. Swap `src` for the brand's own supplied asset if legal
 * ever asks for the official file.
 */
export interface BrandMark {
  name: string;
  /** Monochrome SVG or transparent PNG in /public/brands. */
  src: string;
  /**
   * Width ÷ height of the artwork. The strip pins every mark to one height, so
   * a wide wordmark needs this to keep its proportions. Square marks omit it.
   */
  ratio?: number;
  /** The brand's own site — not a store or app-download page. */
  href: string;
}

export const BRAND_MARKS: BrandMark[] = [
  { name: "Netflix", src: "/brands/netflix.svg", href: "https://www.netflix.com/" },
  { name: "adidas", src: "/brands/adidas.svg", href: "https://www.adidas.com/" },
  { name: "Jordan", src: "/brands/jordan.svg", href: "https://www.nike.com/jordan" },
  { name: "Reebok", src: "/brands/reebok.svg", href: "https://www.reebok.com/" },
  {
    name: "Sony Music France",
    src: "/brands/sony-music-france.png",
    href: "https://www.sonymusic.fr/",
  },
  { name: "Levi's", src: "/brands/levis.png", ratio: 2.02, href: "https://www.levi.com/" },
  { name: "Vans", src: "/brands/vans.png", ratio: 2.69, href: "https://www.vans.com/" },
];
