# WAY — projects page, local clone + video intro

A local Next.js rebuild of [weareyoung-agency.com/projects/](https://www.weareyoung-agency.com/projects/),
served as the index route, with one addition: a full-screen video preloader that
plays the studio's clips inside the WAY logo.

```bash
npm run dev     # http://localhost:3000
npm run build   # static prerender, webpack
```

## What is a clone and what is not

The page is a faithful rebuild, not an interpretation. Every box, font size and
scroll height was measured against production at 1280×800 and matches exactly,
including the 6448px document height.

- `app/vendor/` — the production stylesheets, copied verbatim. Asset URLs are
  rewritten to `/way/*`; the only other change is a stray comment terminator in
  `way-theme.css` that browsers drop as an error token but Lightning CSS
  rejects. Do not hand-edit these.
- `components/way/` — the production DOM, rebuilt in React. The class names are
  the contract the vendored CSS addresses, so they are reproduced literally
  (`.scrollTool`, `.mixitup-control-active`, `.slick-track`, `nvisible1`…).
  The jQuery plugins behind them — mixitup, slick, viewportChecker,
  s4preload, the custom cursor — are reimplemented rather than loaded.
- `lib/way-data.ts` — the 5 featured slides, the filter tree and all 61
  projects, extracted from the production HTML.
- `app/globals.css` — the only hand-written stylesheet. Holds the preloader and
  a handful of rules the original got from a runtime side effect (the arrow SVG
  is inlined here instead of being fetched and injected by `main.js`).

Deliberate deviations, all invisible on screen:

- **Images** are local WebP at 1800px instead of the originals' PNG/JPEG:
  143 MB → 8.9 MB across 131 files.
- **Covers load lazily.** Production writes all 61 into the initial markup; here
  each waits until its tile is within 600px of the viewport (6 loaded at the top
  of the page instead of 61). The theme's own scroll reveal keeps its own,
  tighter threshold so the fade still fires exactly where the original's does.
- **Filtering unmounts** hidden tiles; mixitup keeps them at `display:none`.
- **Project links** still point at the live site — only `/projects/` was in
  scope, so the 61 detail pages do not exist locally.

## The preloader

`components/way/Preloader.tsx` + the `.preloader` rules in `app/globals.css`.
The only element on the page that is not in the original.

`public/way-logo-mask.png` is an alpha mask generated from `WAY LOGO B&W.jpg`
(trimmed, contrast-boosted, luminance moved into the alpha channel), used as a
`mask-image` so only the letterforms are ever painted. Two clips from
`public/videos/` play behind it.

Timeline, all in `Preloader.tsx`:

| t | |
|---|---|
| 0ms | hard cut in, TV glitch — chroma split, scanlines, one tracking bar |
| 0–2900ms | continuous slow zoom, `scale(1.02 → 1.16)` |
| 1350ms | hand off from the first clip to the second |
| 2400ms | fade out begins (380ms) |
| 2780ms | removed from the DOM |

The clock never waits on the videos: if the second clip has not buffered, the
first one simply keeps playing. Scroll is locked while it is up, and it is
unmounted rather than hidden, so nothing is left to intercept a click. Click or
press any key to skip. Honours `prefers-reduced-motion` (zoom only, no glitch).

## Regenerating from production

If the source page changes, re-scrape it and rebuild `lib/way-data.ts`. The
generator flattens `wp-content/uploads/<path>` to `/way/uploads/<path>.webp`;
watch for basename collisions across extensions (`on.jpg` and `on.png` already
collide and are disambiguated by hand).

## Previous build

The earlier immersive WAY.TV site is still on disk — `components/Hero.tsx`,
`SlidwaayBlock`, `PulseGrid`, `InfiniteMarquee`, `ManifestoFooter`, `Loader`,
`hooks/`, `lib/media.ts`, `lib/brands.ts`, `public/content/` — but nothing
imports it any more. Delete it, or move it behind its own route.
