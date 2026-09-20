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
| `/` | Intro → grid hero to the design comp: a still, the partner credits tight against it and HOW ARE WE at the right edge; below, WHAT WE DO and the rotating claim, a square still, and WHAT WE DO drifting past it → the slogan in full, white, closed by the mark. The landing ends there. |
| `/roster` | The directors as a small four-column list, then every project as one flat wall of equal tiles in no order — hovering a name greys the wall down to that director's work — then ALL WORK: the filters and the height-capped catalogue. |
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
- `components/brand/` — `Wordmark` (inline SVG, currentColor — also what closes the slogan), `Mark` (the stacked logo painted through its alpha mask), `Pulse` (the cardio mark parked in the nav, not yet wired).
- `components/chrome/` — `Nav`, `Footer`, `Cursor`, `Intro`.
- `components/motion/` — `Reveal`, `SplitWords`, `PulseBand` (the slogan band; `logoTail` swaps the last word for the mark), `useIntroDone`.
- `components/home/` — `GridHero`, `ProjectExplorer` (filtering runs inside a View Transition when the browser has one; the grid is height-capped until unrolled).
- `components/about/WayTo.tsx` — OUR WAY TO and its eight endings.
- `components/roster/RosterBoard.tsx` — the names and the wall, sharing one hover.
- `lib/taxonomy.ts` — the six disciplines and the per-project tagging. **See below.**
- `lib/type-metrics.ts` — measured per-character advance widths for the display face, so a case title can be sized to its own longest word. Druk Wide is wide enough that TOUTÂNKHAMON is one unbreakable 12.6em token; CSS cannot size type to its content, so the fit is computed here and handed to the stylesheet as a length.
- `lib/brands.ts` + `public/brands/` — the four client marks in the roster's footer strip, drawn as CSS masks so one flat path takes `currentColor`.
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

Replace `SEED` with the real roster and each director's real `projects`. The
pages carry no "sample" notice: nothing on screen tells a visitor these people
are invented, so treat the roster as demo-only until that swap happens.

## The taxonomy was rebuilt

The old site filtered on 360, Brand Influence, Creative Content, Event Design,
Roadshow and Shopper Experience. The six now are **360, Brand Content,
Entertainment & Culture, Event Design, Sport, Retail Activation** — and they
could not be reached by renaming: Sport and Entertainment & Culture did not
exist in the old data at all. So every one of the 61 projects was re-read from
its own case copy and re-tagged by what it actually is, in `lib/taxonomy.ts`.
Shopper Experience folded into Event Design; retail work — stores, pop-ups,
facades, in-store — became Retail Activation.

That tagging is a reading, not a record. It is one file, one line per project,
made to be argued with.

## Other copy and facts to validate

- The manifesto on `/about` and the eight OUR WAY TO endings are verbatim from
  the current `/agency/` page. Nothing there was written for the reboot.
- The landing's HOW ARE WE and WHAT WE DO paragraphs come from the design comp,
  not from the current site. Approved as final. The comp's duplicated "restore
  value the value of content" was a typo in the source and is corrected to
  "restore the value of content", on the client's call.
- The pulse mark in the nav is deliberately inert; it has no destination yet.
- The seven client marks in the roster's footer strip are registered trademarks
  of their owners, shown the way an agency shows a client list. Point
  `lib/brands.ts` at the brands' own supplied files if legal wants the
  official assets. Sony Music France, Levi's and Vans are cut-out PNGs rather
  than vector paths; supply SVGs if the strip ever needs to scale further.
- "15+ years" is the brief's figure; no founding year is stated anywhere.
- The filter list on the current site holds **32** client entries, not 33.
- Project years are inferred from image upload dates; a few may be a year out.

## Regenerating from production

`lib/way-data.ts` and `lib/way-projects.json` come from scraping the live
site; the scripts are described in the git history of `reboot/foundation`.
Basename collisions across extensions (`on.jpg` / `on.png`) are handled by
hand.
