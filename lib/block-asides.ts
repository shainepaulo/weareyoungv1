/**
 * The second image that sits beside each caption word on a case page.
 *
 * Every block already carries one wide still. The word next to it — CASTING,
 * SCENOGRAPHY, TALENT — is only ~50px tall in a 380px band, so the rest of
 * that column reads as a hole. This fills it with a frame from the project's
 * own gallery chosen *because* it shows the thing the word names: the stage
 * rig for SCENOGRAPHY, a face for TALENT, the crowd for EXPERIENCE.
 *
 * Keyed by project slug; the array runs in the same order as the project's
 * `blocks`, and the comment on each line is the word it answers. `null` means
 * nothing in that gallery earns the slot — better an honest gap than a stock
 * pairing.
 */
export const BLOCK_ASIDES: Record<string, (string | null)[]> = {
  "adidas-arena": [
    // BRAND CONTENT — the campaign portraits, shot for the campaign itself.
    "/way/projects/adidas-arena/gallery-1-adidas-arena-x-we-are-young-agency-1.webp",
    // PR STUNT — the line taken to the street: "UN FLOW, UNE SCÈNE, TON ARENA".
    "/way/projects/adidas-arena/gallery-2-adidas-arena-x-we-are-young-agency-2.webp",
    // EVENT — the arena itself, and the show hung inside it.
    "/way/projects/adidas-arena/gallery-5-adidas-arena-x-we-are-young-agency-5.webp",
  ],
  "adidas-this-is-new-rugby": [
    // TV SPOT — the film's money shot, the dive over the line.
    "/way/projects/adidas-this-is-new-rugby/gallery-5-adidas-this-is-new-rugby-x-way-agencyc-5.webp",
    // SOCIAL — the camera in close on the talent, where the short form comes from.
    "/way/projects/adidas-this-is-new-rugby/gallery-3-adidas-this-is-new-rugby-x-way-agencyc-3.webp",
    // EVENT — the whole squad out on the pitch.
    "/way/projects/adidas-this-is-new-rugby/gallery-4-adidas-this-is-new-rugby-x-way-agencyc-4.webp",
  ],
  "quai-54": [
    // TOURNAMENT — contested jump shot, scoreboard behind.
    "/way/projects/quai-54/gallery-3-julien-jolivet-quai54-jordan-3.webp",
    // DUNK CONTEST — the dunk itself, judges' table in frame.
    "/way/projects/quai-54/gallery-5-julien-jolivet-quai54-jordan-5.webp",
    // SHOWCASES — a showcase game, stands full.
    "/way/projects/quai-54/gallery-4-julien-jolivet-quai54-jordan-4.webp",
    // ARENA — the 20th-anniversary screen dressing the stands.
    "/way/projects/quai-54/gallery-1-julien-jolivet-quai54-jordan-1.webp",
  ],
  radar: [
    // SCENOGRAPHY — the rig itself: RADAR sign, LED wall, stacked speakers.
    "/way/projects/radar/gallery-3-we-are-young-x-desperados-radar3-1900x987.webp",
    // TALENT — Fianso alone on the mic.
    "/way/projects/radar/gallery-2-we-are-young-x-desperados-radar2-1900x987.webp",
    // EXPERIENCE — the crowd, from the stage.
    "/way/projects/radar/gallery-1-we-are-young-x-desperados-radar1-1900x987.webp",
  ],
};

/** The aside for one block, or null when that slot is deliberately empty. */
export function asideFor(slug: string, index: number): string | null {
  return BLOCK_ASIDES[slug]?.[index] ?? null;
}
