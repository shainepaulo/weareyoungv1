/**
 * Advance widths for the display face, in em, measured from the loaded font
 * for every character that appears in a project title.
 *
 * Why this exists: Druk Wide Extended is very wide — "TOUTÂNKHAMON" is one
 * unbreakable 12.6em token, which at the display size is 1800px against 1323px
 * of page. CSS cannot size type to its own content, so the fit is computed
 * here and handed to the stylesheet as a length.
 *
 * Regenerate by measuring `canvas.measureText(ch).width / fontSize` against
 * the same font stack if the typeface ever changes.
 */
const ADVANCE: Record<string, number> = {
  " ": 0.308, "-": 0.391, ".": 0.305, "–": 0.885, "_": 0.815, "@": 1.323,
  "0": 1.096, "1": 0.479, "2": 0.965, "3": 0.966, "4": 0.948, "5": 0.93,
  A: 1.038, B: 1.019, C: 1.083, D: 1.092, E: 0.885, F: 0.861, G: 1.115,
  H: 1.074, I: 0.341, J: 0.89, K: 0.962, L: 0.83, M: 1.273, N: 1.073,
  O: 1.138, P: 0.976, Q: 1.137, R: 1.012, S: 0.975, T: 0.926, U: 1.047,
  V: 1.007, W: 1.417, X: 1.008, Y: 0.968, Z: 0.907, x: 0.785,
  "À": 1.038, "Â": 1.038, "É": 0.885, "Ö": 1.138,
};

/** `.display` carries letter-spacing: -0.01em. */
const TRACKING = -0.01;

/** Anything unmeasured falls back to the widest glyph, so we never under-size. */
const FALLBACK = 1.417;

function widthEm(token: string): number {
  let sum = 0;
  for (const ch of token) sum += ADVANCE[ch] ?? ADVANCE[ch.toUpperCase()] ?? FALLBACK;
  // Tracking applies between characters; counting one fewer keeps the estimate
  // on the safe side of the real advance.
  return sum + Math.max(0, token.length - 1) * TRACKING;
}

/** The widest run that can never be broken across lines. */
export function longestTokenEm(text: string): number {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .reduce((widest, token) => Math.max(widest, widthEm(token)), 0);
}

/**
 * A CSS length: the largest font-size at which `text`'s longest word still
 * fits the page's content width. Feed it to `font-size: min(var(--d1), …)`.
 */
export function fitFontSize(text: string, safety = 0.98): string {
  const em = longestTokenEm(text) / safety;
  return `calc((100vw - 2 * var(--gutter)) / ${em.toFixed(3)})`;
}
