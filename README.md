# WAY — We Are Young, V2 reboot

A ground-up art direction for [weareyoung-agency.com](https://www.weareyoung-agency.com),
built to be shown to the CEO. Next.js 16 App Router, React 19, TypeScript, no
backend, no CRUD: all 81 routes are prerendered from data scraped off the
current site.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Branches

| branch | what it is |
|---|---|
| `main` | The pixel-matched clone of the current `/projects/` page, with the video preloader. The safe baseline. |
| `reboot/foundation` | Design system, fonts, brand components, nav + menu, cursor, intro v2, footer. |
| `reboot/home` | Hero, pulse band, filters + chronological grid. |
| `reboot/pages` | Roster, About, Contact, the 61 case pages, 404. |
| `reboot/v1` | First integration. |
| `reboot/v2` | Grid hero, OUR WAY TO, directors — **the branch to present.** |

Each branch builds on the previous one, so any layer can be rolled back
without losing the others.

## The direction

Two voices. **Druk Wide** (kept from the current site — it *is* the identity)
for anything that shouts: the slogan, section titles, nav, buttons. **Monospace
Typewriter** (the small-text face of skinandbonesfilm.com) for anything that
whispers: the directors list, meta, body copy, labels. Black or white, one
accent (`#FF3D00`), and an 8-column grid whose lines are allowed to show —
sections flip tone rather than change colour.

### Routes

| route | |
|---|---|
| `/` | Intro → grid hero (two large stills, the five featured set small, "Creative agency" drifting past in mono columns) → the slogan in full, white, dot before each fragment, closed by the mark → filters (All / Client / Most recent / Type of work) → chronological grid of 61. |
| `/roster` | The directors as a small four-column list — hover dims the rest — then all the work grouped by brand. |
| `/roster/[director]` | Bio and role on a sticky rail, every project they signed in a two-column grid. |
| `/about` | OUR WAY TO ___, the eight endings from the current site rewriting themselves every two seconds; then the manifesto verbatim, the six disciplines with live counts, numbers, address. |
| `/contact` | The address card, phone, mail, maps, studio. |
| `/projects/[slug]` | Hero, intro, Vimeo (poster first, player on click), blocks, gallery, prev / next. |

### Navigation

Desktop: the wordmark and three links — ROSTER · ABOUT · CONTACT. Mobile: the
wordmark and a burger, top right, opening a full-screen menu with the same
three. The nav is `mix-blend-mode: difference`, so one nav serves both tones;
it slides away on scroll down and back on scroll up.

## Where things live

- `app/globals.css` — tokens, type scale, layout, motion primitives (`[data-reveal]`, `.words`, `.u`, `.dot`, `.sr-only`).
- `components/brand/` — `Wordmark` (inline SVG, currentColor — also what closes the slogan), `Mark` (the stacked logo painted through its alpha mask).
- `components/chrome/` — `Nav`, `Footer`, `Cursor`, `Intro`.
- `components/motion/` — `Reveal`, `SplitWords`, `PulseBand` (the slogan band; `logoTail` swaps the last word for the mark), `useIntroDone`.
- `components/home/` — `GridHero`, `ProjectExplorer` (filtering runs inside a View Transition when the browser has one).
- `components/about/WayTo.tsx` — OUR WAY TO and its eight endings.
- `components/roster/DirectorsIndex.tsx` — the names.
- `lib/way-data.ts` — featured five, filter tree, grid order, from the current `/projects/` page.
- `lib/way-projects.json` — the 61 cases, from their pages. `year` is inferred from the hero's upload date.
- `lib/projects.ts` — the two merged into one typed list plus `ROSTER`, `STATS`, `SITE`.
- `lib/directors.ts` — the roster of directors. **See below.**
- `public/way/uploads/`, `public/way/projects/` — 713 images, WebP, ≤1800px.

## Intro

`components/chrome/Intro.tsx`. The studio's two clips play inside the mark
(an alpha mask cut from `WAY LOGO B&W.jpg`), the grid draws in behind, the
claim types itself, a counter runs, and the whole thing lifts like a curtain
at 2.6s. Plays once per session; click or any key skips. Honours
`prefers-reduced-motion`.

## The one thing that is not real

`lib/directors.ts` holds **twelve invented directors** — names, roles, bios —
and deals the real projects out among them. The agency publishes no director
credits anywhere we could scrape, so this is placeholder content in the way
lorem ipsum is placeholder content: nobody in that file exists, and none of
those credits are true.

Replace `SEED` with the real roster and each director's real `projects`, then
set `SAMPLE = false` — the two "sample" notices (roster header, director page)
disappear with it.

## Other copy and facts to validate

- The manifesto on `/about` and the eight OUR WAY TO endings are verbatim from
  the current `/agency/` page. Nothing there was written for the reboot.
- "15+ years" is the brief's figure; no founding year is stated anywhere.
- The filter list on the current site holds **32** client entries, not 33.
- Project years are inferred from image upload dates; a few may be a year out.

## Regenerating from production

`lib/way-data.ts` and `lib/way-projects.json` come from scraping the live
site; the scripts are described in the git history of `reboot/foundation`.
Basename collisions across extensions (`on.jpg` / `on.png`) are handled by
hand.
