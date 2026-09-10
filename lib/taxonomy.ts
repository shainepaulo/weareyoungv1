/**
 * The studio's disciplines, replacing the six the old site filtered on.
 *
 * The old taxonomy (360, Brand Influence, Creative Content, Event Design,
 * Roadshow, Shopper Experience) could not simply be renamed: Sport and
 * Entertainment & Culture did not exist in it at all, and Roadshow and
 * Shopper Experience are gone. So every project was re-read from its own
 * case copy and re-tagged by what it actually is. Shopper Experience folded
 * into Event Design as instructed; retail — stores, pop-ups, facades,
 * in-store — became Retail Activation.
 *
 * Order is the order they appear in the filters and on /about.
 */
export const TYPES = [
  "360",
  "Brand Content",
  "Entertainment & Culture",
  "Event Design",
  "Sport",
  "Retail Activation",
] as const;

export type WayType = (typeof TYPES)[number];

/**
 * Project slug → disciplines, in the order they matter for that project.
 * Read off each case's client, typology and opening paragraph.
 */
export const PROJECT_TYPES: Record<string, WayType[]> = {
  "adidas-arena": ["360", "Sport", "Event Design"],
  "adidas-this-is-new-rugby": ["360", "Sport", "Brand Content"],
  "women-in-tech-beyond-ceiling": ["Brand Content"],
  "quai-54": ["Event Design", "Sport", "Entertainment & Culture"],
  "saison-xi": ["Event Design", "Sport"],
  "sns-paris-football-week": ["Event Design", "Sport", "Entertainment & Culture"],
  "adidas-this-is-new-rugby-flagship": ["Retail Activation", "Sport"],
  "euroleague-off-court": ["Event Design", "Sport"],
  ucl: ["Event Design", "Sport"],
  "radar-red-house": ["Event Design", "Entertainment & Culture"],
  "bose-x-jain-2": ["Entertainment & Culture", "Brand Content", "Retail Activation"],
  "mr-a-adidas-originals": ["Entertainment & Culture", "Event Design", "Brand Content"],
  "feel-the-alps-edelweiss": ["Event Design", "Brand Content"],
  "henry-jacques": ["Event Design", "Retail Activation"],
  "adidas-originals-confirmed": ["Event Design", "Brand Content"],
  "adidas-originals-paris-basketball": ["Sport", "Brand Content"],
  "gorillas-x-all-star-game": ["Sport", "Event Design", "Brand Content"],
  "messi-goats": ["Sport", "Brand Content", "Event Design"],
  "reebok-x-jul": ["Entertainment & Culture", "Brand Content", "Retail Activation"],
  "bose-x-jain": ["Entertainment & Culture", "Brand Content", "Retail Activation"],
  "go-crazy-in-fortnite": ["Entertainment & Culture", "Brand Content", "Sport"],
  "mon-dressing-soupline": ["Brand Content"],
  "netflix-en-passant-pecho-hackday": ["Entertainment & Culture", "Brand Content"],
  "adidas-originals-zx-x-13-block": ["Entertainment & Culture", "Brand Content", "Retail Activation"],
  "courir-40ans": ["360", "Brand Content"],
  "adidas-originals-zx-x-vald": ["Entertainment & Culture", "Brand Content", "Retail Activation"],
  "reebok-lahaine": ["360", "Entertainment & Culture", "Brand Content"],
  "radar-drive-in": ["Event Design", "Entertainment & Culture"],
  bape_fr: ["Brand Content", "Entertainment & Culture"],
  "citadium-good-games": ["Retail Activation", "Entertainment & Culture"],
  radar: ["Event Design", "Entertainment & Culture"],
  "pmu-le-grand-prix-des-heros": ["Event Design", "Sport", "Brand Content"],
  "premiere-vision": ["Event Design", "Brand Content"],
  "adidas-take-on-summer-paris-2019": ["Event Design", "Sport"],
  "levis-x-ag2r-la-mondiale-off-road": ["Retail Activation", "Brand Content"],
  "undiz-unexpected-beach-party": ["Event Design"],
  "reebok-doner-kebab": ["Event Design", "Entertainment & Culture"],
  "clairefontaine-toutankhamon": ["Brand Content", "Entertainment & Culture"],
  "adidas-tango-arena": ["Event Design", "Sport"],
  "undiz-xmas-market": ["Event Design", "Retail Activation"],
  "the-timberland-studio": ["Retail Activation", "Event Design"],
  "adidas-tango-league": ["Event Design", "Sport"],
  "adidas-playground-zz10": ["Sport", "Event Design"],
  "desperados-festivals": ["Event Design", "Entertainment & Culture"],
  "heineken-beer-factory": ["Event Design"],
  "desperados-patch-edition": ["Retail Activation", "Event Design"],
  "reebok-24-hours-boxing": ["Sport", "Brand Content", "Retail Activation"],
  "reebok-24-hours-training": ["Sport", "Brand Content", "Retail Activation"],
  "adidas-glitch": ["Sport", "Brand Content"],
  "jordan-quai-54": ["Event Design", "Sport", "Entertainment & Culture"],
  "adidas-pulse": ["Retail Activation", "Sport"],
  "adidas-challenge-my-game": ["Sport", "Brand Content"],
  "adidas-project-harden": ["Sport", "Brand Content"],
  "get-fresh-touch": ["Event Design"],
  "galeries-lafayette-summer-break": ["Retail Activation", "Event Design"],
  "adidas-creators-arena": ["Sport", "Event Design"],
  "villa-schweppes-bpm-contest": ["Entertainment & Culture", "Event Design", "Brand Content"],
  "mort-subite-baraque-a-lambics": ["Event Design"],
  "adidas-tango-league-saison-2": ["Event Design", "Sport"],
  "vans-weatherized": ["Retail Activation", "Brand Content", "Entertainment & Culture"],
  "desperados-blacklisted": ["Event Design"],
};

/** Filter token for a discipline — stable, URL-safe, used by the explorer. */
export const typeSlug = (type: WayType) =>
  type
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
