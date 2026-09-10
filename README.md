# WAY — We Are Young, V1 reboot

A ground-up art direction for [weareyoung-agency.com](https://www.weareyoung-agency.com),
built to be shown to the CEO. Next.js 16 App Router, React 19, TypeScript, no
backend, no CRUD: every page is prerendered from data scraped off the current
site.

```bash
npm run dev     # http://localhost:3000
npm run build   # static export of all 66 routes
npm run lint
```

## Branches

| branch | what it is |
|---|---|
| `main` | The pixel-matched clone of the current `/projects/` page, with the video preloader. The safe baseline. |
| `reboot/foundation` | Design system, fonts, brand components, nav + menu, cursor, intro v2, footer. |
| `reboot/home` | Featured hero, pulse band, filters + chronological grid. |
| `reboot/pages` | Roster, About, Contact, the 61 case pages, 404. |
| `reboot/v1` | Integration of the three above — **the branch to present.** |

Each `reboot/*` branch builds on the previous one, so any layer can be
rolled back without losing the others.

## The direction

Two voices. **Druk Wide** (kept from the current site — it *is* the identity)
for anything that shouts: titles, nav, buttons, the pulse band. **Monospace
Typewriter** (the small-text face of skinandbonesfilm.com) for anything that
whispers: meta, body copy, labels. Black or white, one accent (`#FF3D00`),
and an 8-column grid whose lines are allowed to show — sections flip tone
rather than change colour.

The claim, *a creative agency for brands who dare to go their own WAY*, is
the interaction model: the cursor is a dot that leaves a trail; the pulse
band's words travel along grid lines as you scroll (the Kalkbrenner move, in
the studio's voice); the studio's blinking `_` marks wherever you are.

### Routes

| route | |
|---|---|
| `/` | Intro → featured five (hover / focus swaps the image with a wipe; walks by itself when idle) → pulse band → filters (All / Client / Most recent / Type of work) → chronological grid of 61. |
| `/roster` | Every brand, alphabetical, with its projects. |
| `/about` | Manifesto, story, the six disciplines with live counts, numbers, address. |
| `/contact` | The address card, phone, mail, maps, studio. |
| `/projects/[slug]` | Hero, intro, Vimeo (poster first, player on click), blocks, gallery, prev / next. |

### Navigation

Desktop: the wordmark and three links — ROSTER · ABOUT · CONTACT. Mobile: the
wordmark and a burger, top right, opening a full-screen menu with the same
three. The nav is `mix-blend-mode: difference`, so one nav serves both tones;
it slides away on scroll down and back on scroll up.

## Where things live

- `app/globals.css` — tokens, type scale, layout, motion primitives (`[data-reveal]`, `.words`, `.u`, `.dot`).
- `components/brand/` — `Wordmark` (inline SVG, currentColor), `Mark` (the stacked logo painted through its alpha mask, so it recolours).
- `components/chrome/` — `Nav`, `Footer`, `Cursor`, `Intro`.
- `components/motion/` — `Reveal` (intersection → `.is-in`), `SplitWords`, `PulseBand`, `useIntroDone`.
- `components/home/` — `FeaturedHero`, `ProjectExplorer` (filtering runs inside a View Transition when the browser has one).
- `lib/way-data.ts` — featured five, filter tree, grid order, from the current `/projects/` page.
- `lib/way-projects.json` — the 61 cases (title, client, typology, copy, Vimeo ids, blocks, gallery, prev/next), from their pages. `year` is inferred from the hero's upload date.
- `lib/projects.ts` — the two merged into one typed list plus `ROSTER`, `STATS`, `SITE`.
- `public/way/uploads/`, `public/way/projects/` — 713 images, WebP, ≤1800px.

## Intro

`components/chrome/Intro.tsx`. The studio's two clips play inside the mark
(an alpha mask cut from `WAY LOGO B&W.jpg`), the grid draws in behind, the
claim types itself, a counter runs, and the whole thing lifts like a curtain
at 2.6s. Plays once per session; click or any key skips. Honours
`prefers-reduced-motion`.

## Copy and facts to validate

- About-page story copy is V1 — written from what the site says about the
  work. To be read by the agency.
- "15+ years" is the brief's figure; no founding year is stated anywhere.
- The filter list on the current site holds **32** client entries, not 33.
- Project years are inferred from image upload dates; a few may be a year out.

## Regenerating from production

`lib/way-data.ts` and `lib/way-projects.json` come from scraping the live
site; the scripts are described in the git history of `reboot/foundation`.
Basename collisions across extensions (`on.jpg` / `on.png`) are handled by
hand.
