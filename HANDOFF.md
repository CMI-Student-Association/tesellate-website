# Tesellate website: handoff

Status as of 11 November 2026. This file records what exists, why it was built this way, what is still placeholder, and the problems already hit, so the next person can continue without the original conversation.

## 1. Current state

- Repository: `CMI-Student-Association/tesellate-website`.
- All work is on branch `claude/gracious-keller-8wc5un` (commit `7611412`, plus the commit adding this file). Nothing is merged into `main` yet, and no pull request has been opened.
- CI has never run on GitHub, because the workflow triggers on pull requests and on pushes to `main` only. It will run for the first time when a pull request is opened.
- The site has never been deployed. Deployment needs the branch merged into `main` and GitHub Pages enabled (see section 7).
- Locally, type check, lint, build, all 7 Playwright tests and the Lighthouse budget pass.

## 2. Pages

| Route      | File                              | Contents                                                                                                          |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `/`        | `src/routes/+page.svelte`         | Animated hero (`Hero.svelte`) and the first three events as highlights                                            |
| `/about`   | `src/routes/about/+page.svelte`   | Placeholder text and a four-number stats grid (all values are "—")                                                |
| `/events`  | `src/routes/events/+page.svelte`  | All events sorted by day and time, with category filter buttons and animated reordering                           |
| `/gallery` | `src/routes/gallery/+page.svelte` | Masonry grid of every image in `src/lib/assets/gallery/`, a lightbox (Escape, arrow keys) and the Instagram embed |
| `/merch`   | `src/routes/merch/+page.svelte`   | Showcase cards only, with no cart or checkout                                                                     |

Shared layout (`src/routes/+layout.svelte`): skip link, sticky nav with a mobile menu, footer, and a cross-fade between pages using the browser's View Transitions API where supported.

## 3. Stack and the reasons for it

Versions are the ones in the lockfile at the time of writing.

- SvelteKit 3.1.1 with Svelte 5.57 (runes mode) and TypeScript 6. Svelte compiles components to small JavaScript, which suits a site with many animated components, and the syntax is close to plain HTML, so students who rotate yearly can pick it up quickly.
- `@sveltejs/adapter-static` 4.0.1. Every page is prerendered to HTML at build time (`export const prerender = true` in `src/routes/+layout.ts`). The fest site has no server-side data, so static hosting is fastest and free.
- Tailwind CSS 4.3.3 through `@tailwindcss/vite`. Colours and fonts are defined once as tokens in `src/routes/layout.css`.
- GSAP 3.15.0 with ScrollTrigger, used only for scroll-driven animation. GSAP, including the former paid plugins such as SplitText, has been free for commercial use since April 2025.
- `@sveltejs/enhanced-img` 1.0.0, which converts images to AVIF and WebP at several widths during the build.
- Inter Variable font, self-hosted through `@fontsource-variable/inter`, so there is no request to Google Fonts.
- Vite 8.3, pnpm 10.28.0 (pinned in `package.json` under `packageManager`), Node 22 or later.
- Quality tools: Prettier, ESLint, `svelte-check`, Playwright 1.64 and Lighthouse CI 0.15.1.

The project was generated with `sv create` 1.2.0 (template "minimal", add-ons prettier, eslint, playwright, tailwindcss, enhanced-img and the static adapter) and then adjusted.

## 4. File layout

```
.github/workflows/
  ci.yml             lint, type check, build, Playwright, Lighthouse on PRs and pushes to main
  deploy.yml         build and deploy to GitHub Pages on pushes to main
src/
  app.html           HTML shell
  app.d.ts           global types, including window.instgrm for the Instagram script
  lib/
    assets/gallery/  drop gallery photos here
    assets/merch/    drop merch photos here
    components/      EventCard, Footer, Hero, InstagramEmbed, Logo, MerchCard, Nav, PageHeader, Section
    content/         site.ts, events.ts, merch.ts, gallery.ts (editable data)
    motion/          reveal.ts (CSS fade-in), gsap.ts (lazy GSAP helper)
  routes/            one folder per page, plus +layout.svelte, +layout.ts, layout.css
  routes/page.svelte.e2e.ts   Playwright tests
static/              robots.txt, .nojekyll (needed for GitHub Pages to serve the _app folder)
lighthouserc.json    Lighthouse URLs and score thresholds
vite.config.ts       Vite and SvelteKit config, including the adapter and BASE_PATH
playwright.config.ts Playwright config
```

In SvelteKit 3 the SvelteKit options (adapter, paths) live inside `sveltekit({...})` in `vite.config.ts`. There is no `svelte.config.js`.

## 5. Editing content

Most yearly updates need no component changes.

- `src/lib/content/site.ts`: name, tagline, dates, venue, contact email, Instagram handle and `instagram.embedPermalink`. The footer Instagram link and the email link appear only when those fields are filled. The Instagram embed appears on the gallery page only when `embedPermalink` holds a post or reel URL.
- `src/lib/content/events.ts`: one object per event. `category` must be one of the values in the `FestEvent` type. Add `registerUrl` to show a Register button. The home page shows the first three entries in the array.
- `src/lib/content/merch.ts`: one object per item. To show a photo, put the file in `src/lib/assets/merch/` and set `image` to its file name, for example `image: 'tee-black.jpg'`.
- Gallery: put JPG, PNG, WebP or AVIF files in `src/lib/assets/gallery/`. They appear sorted by file name, and the alt text is built from the file name (`opening-night_stage.jpg` becomes "opening night stage"), so name files descriptively.
- Brand colours and fonts: the `@theme` block in `src/routes/layout.css`. Tailwind classes such as `bg-brand` and `text-muted` follow these tokens.
- Logo: `src/lib/components/Logo.svelte`. Replace the text wordmark with the real logo as inline SVG, so it can be animated and costs no extra request. It is used in the nav, hero and footer.
- Favicon: currently an empty data URI in `+layout.svelte` (`<link rel="icon" href="data:," />`) to avoid a 404. Replace it once the logo exists.
- About page text and stats: edit `src/routes/about/+page.svelte` directly.

## 6. Animation and performance rules

- For simple appearance effects use `reveal` from `src/lib/motion/reveal.ts`: `<div {@attach reveal({ delay: 100 })}>`. It uses IntersectionObserver and CSS, with no library.
- For scroll-driven or timeline work use `gsapAnimate` from `src/lib/motion/gsap.ts`. It downloads GSAP only on pages that use it, skips everything when the user has reduced motion enabled, and reverts all tweens and ScrollTriggers when the component is removed. `Hero.svelte` is the working example.
- The hero entrance is pure CSS on purpose: the headline must paint without waiting for JavaScript, which keeps Largest Contentful Paint low. Do not move it to GSAP.
- Animate only `transform` and `opacity`.
- Every new animation must respect reduced motion. In components use `prefersReducedMotion.current` from `svelte/motion` (see the events page for an example).
- The Instagram script (`embed.js`) is large, so `InstagramEmbed.svelte` loads it only when the embed comes within 400px of the viewport. Until then, or if the script is blocked, a plain "View this post on Instagram" link is shown.
- Images: always go through `enhanced:img` with a `sizes` attribute and `loading="lazy"` for anything below the fold.

Local Lighthouse results on the finished scaffold: home 98 performance, events 98, gallery 100, and 100 for accessibility, best practices and SEO on all three. The CI budget fails the build if performance drops below 90 or accessibility below 95 on home, events or gallery.

## 7. Workflow, CI and deployment

- Work on a branch and open a pull request into `main`.
- `ci.yml` runs `pnpm lint`, `pnpm check`, `pnpm build`, installs Chromium, runs `pnpm test`, then `pnpm lighthouse`, and uploads the Lighthouse reports as an artifact.
- `deploy.yml` runs on every push to `main` (and can be started by hand). It builds with `BASE_PATH` taken from GitHub Pages, so links work under `https://cmi-student-association.github.io/tesellate-website/`, then publishes the `build/` folder.
- One-time setup still needed: in the repository go to Settings, Pages, and set Source to "GitHub Actions". Without this the deploy job fails.
- With a custom domain later, set it in the same Pages settings. `BASE_PATH` then becomes empty automatically.
- Action versions used: `actions/checkout@v7`, `pnpm/action-setup@v6`, `actions/setup-node@v7`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`, `actions/upload-artifact@v7`.

## 8. Local setup

```bash
git clone https://github.com/CMI-Student-Association/tesellate-website.git
cd tesellate-website
git switch claude/gracious-keller-8wc5un   # until it is merged into main
```

Enable pnpm through Corepack. If Node is installed system-wide, `corepack enable` fails with `EACCES ... symlink ... /usr/bin/pnpm`. Install the link into a folder you own instead:

```bash
mkdir -p ~/.local/bin
corepack enable --install-directory ~/.local/bin
pnpm -v
```

If `pnpm -v` says "command not found", add `export PATH="$HOME/.local/bin:$PATH"` to `~/.bashrc` (or `~/.zshrc`) and open a new terminal.

```bash
pnpm install
pnpm dev                                   # http://localhost:5173
pnpm exec playwright install chromium      # once, before the first test run
```

| Command           | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| `pnpm dev`        | Dev server with hot reload                                  |
| `pnpm build`      | Static build into `build/`                                  |
| `pnpm preview`    | Serve the build at http://localhost:4173                    |
| `pnpm check`      | Type check                                                  |
| `pnpm lint`       | Prettier check and ESLint                                   |
| `pnpm format`     | Auto-format all files                                       |
| `pnpm test`       | Build, start preview and run Playwright                     |
| `pnpm lighthouse` | Lighthouse budget against `build/` (run `pnpm build` first) |

## 9. Problems already hit, and their fixes

- Imports through the `#lib` alias must include the `.ts` extension for TypeScript files, for example `import { site } from '#lib/content/site.ts'`. Without it `svelte-check` reports "Cannot find module". Svelte components already carry `.svelte`.
- Internal links must go through `resolve()` from `$app/paths` (`href={resolve('/events')}`), otherwise they break under the GitHub Pages sub-path, and ESLint's `svelte/no-navigation-without-resolve` rule fails. External links built from variables are exempted with an `eslint-disable` comment; see `EventCard.svelte` and `InstagramEmbed.svelte`.
- Playwright reuses a server already listening on port 4173 when not in CI. If an old `pnpm preview` is still running, the tests hit stale JavaScript and fail in confusing ways (in our case the events filter "did not work"). Stop any old preview server before running `pnpm test`.
- Tests that click interactive elements wait for `networkidle` first, because clicks before hydration do nothing on a prerendered page.
- The first brand purple (`#7b5cff`) failed the WCAG contrast check with dark text on buttons. It was changed to `#9b82ff`. When the real brand colours arrive, check text on `bg-brand` buttons again (Lighthouse in CI will flag it).
- A heading level was skipped on the events page (h1 then h3 in cards), which Lighthouse flags. A visually hidden `<h2>` was added. Keep heading levels in order on new pages.
- Global types (such as `window.instgrm`) must be declared in `src/app.d.ts`, not inside a component.
- At first Claude could read but not write the repository, so pushes failed with 403 until the Claude GitHub App was given write access on the organisation.

## 10. Placeholders and open work

Placeholders that must be replaced before launch:

- Logo (`Logo.svelte`) and favicon.
- Brand colours and display font (`layout.css`).
- Tagline and dates (`site.ts`, currently "Tagline to be decided" and "Dates to be announced").
- Venue is set to "Chennai Mathematical Institute", inferred from the organisation name. Confirm it.
- Contact email and Instagram handle (empty in `site.ts`).
- Instagram post URL for the embed (`site.ts`, `instagram.embedPermalink`).
- The three sample events in `events.ts`.
- The three sample merch items and prices in `merch.ts`.
- About page text and stats.
- Gallery photos (the folder is empty, so the page shows an empty-state message).
- Social preview image and Open Graph tags (not added yet).

Not yet verified:

- The Instagram embed has not been tested against a real post, because there is no URL yet.
- The CI and deploy workflows have not run on GitHub.

Next steps, in order:

1. Open a pull request from `claude/gracious-keller-8wc5un` into `main` and check that CI passes.
2. Enable GitHub Pages (Settings, Pages, Source: GitHub Actions), merge, and confirm the deployed site loads.
3. Add the logo and brand tokens, then the real content.
4. Add Open Graph tags and a social preview image in `+layout.svelte`.
