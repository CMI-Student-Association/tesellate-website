# tesellate-website

Website for Tesellate. Built with SvelteKit (Svelte 5), Tailwind CSS v4 and GSAP, and
prerendered to static HTML.

## Setup

Requires Node 22+ and pnpm (`corepack enable` installs the pinned version).

```bash
pnpm install
pnpm dev
```

## Scripts

| Command           | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| `pnpm dev`        | Dev server with hot reload                                   |
| `pnpm build`      | Static build into `build/`                                   |
| `pnpm preview`    | Serve the build locally                                      |
| `pnpm check`      | Type-check Svelte and TypeScript                             |
| `pnpm lint`       | Prettier and ESLint                                          |
| `pnpm format`     | Auto-format everything                                       |
| `pnpm test`       | Playwright smoke tests (`pnpm exec playwright install` once) |
| `pnpm lighthouse` | Lighthouse budget against `build/` (run `pnpm build` first)  |

## Editing content

Most yearly updates need no component changes:

- `src/lib/content/site.ts`: fest name, tagline, dates, venue, Instagram handle and the
  post to embed on the gallery page.
- `src/lib/content/events.ts`: the event list.
- `src/lib/content/merch.ts`: merch items; put images in `src/lib/assets/merch/`.
- `src/lib/assets/gallery/`: drop photos here and they appear on the gallery page,
  converted to AVIF/WebP at build time.
- `src/routes/layout.css`: brand colours and fonts (`@theme` block).
- `src/lib/components/Logo.svelte`: the logo.

## Structure

```
src/
  lib/components/  reusable UI (Hero, Nav, EventCard, InstagramEmbed, ...)
  lib/motion/      animation helpers: reveal (CSS) and gsapAnimate (lazy GSAP)
  lib/content/     editable data
  routes/          one folder per page: about, events, gallery, merch
```

## Animation rules

- Prefer CSS and Svelte transitions. Use `gsapAnimate` from `lib/motion/gsap.ts` for
  scroll-driven or timeline work; it loads GSAP only on pages that need it and cleans up
  when the component is removed.
- Animate `transform` and `opacity` only.
- Respect reduced motion. `reveal` and `gsapAnimate` already do; use
  `prefersReducedMotion` from `svelte/motion` in new code.

## Workflow

Work on a branch and open a pull request into `main`. CI runs lint, type-check, build,
Playwright and a Lighthouse budget (performance at least 90, accessibility at least 95).
Merging into `main` deploys to GitHub Pages.

To enable deploys once: repository Settings, Pages, Source: GitHub Actions.
