# AGENTS.md — EB French Tutoring v3

## Project type

Single-page static marketing site for a French tutoring business. Deploys via Netlify with a Tailwind CSS build step.

## Tech stack (CDN-only, no npm)

- **HTML5** — vanilla, single `index.html` (shared CSS/JS extracted to `css/` and `js/`)
- **Tailwind CSS v3** via CLI — custom tokens in `tailwind.config.js`, compiled to `css/styles.css`
- **GSAP 3.12 + ScrollTrigger** via CDN — scroll animations, pinning, carousels
- **Fonts** — Cabinet Grotesk (Fontshare CDN) for headings, Outfit (Google Fonts) for body

## Build & Deploy

- **Netlify** auto-runs `npx tailwindcss -i ./css/input.css -o ./css/styles.css --minify` on deploy
- **Local dev**: `npm run watch` to rebuild CSS on file changes, or `npm run build` for a one-off build
- Open `index.html` directly in a browser — no dev server required

## Source of truth

`design.md` is the complete design system, component spec, and style guide. Read it before touching any markup, styles, or JS. It defines tokens, breakpoints, banned patterns (section 11.3), AIDA section order, and every component pattern.

## Future file split (not yet done)

`design.md` specifies `css/styles.css` and `js/main.js` as shared files, but the current implementation has everything inline in `index.html`. When creating new pages, extract shared styles/JS into those files per `design.md` section 2.

## Key constraints

- **No external image URLs in production** — all images must be local in `assets/`. Current picsum.photos placeholders must be replaced before deploy.
- **GSAP pin only at >= 1024px** — ScrollTrigger `pin: true` is guarded by `window.innerWidth >= 1024`. Never pin on mobile/tablet.
- **`overflow-x-hidden w-full max-w-full`** on `<main>` — prevents horizontal scrollbars.
- **`grid-auto-flow: dense`** on bento grids — zero empty cells required, column spans must sum to 12 per row.
- **H1 max 3 lines** on any viewport — use `max-w-5xl` and adjust clamp values if needed.
- **Section spacing** — all major sections use `py-32 md:py-48`.
- **Banned patterns** — see `design.md` section 11.3: no emojis, no stamp badges, no pill tags, no "SECTION 01" labels, no `text-brand-accent` for body copy.
- **Forms** — use Netlify Forms (`<form netlify>`) with hidden `form-name` input.

## No development commands

There is no `npm run dev`, no lint, no typecheck, no test, no build. Open `index.html` directly in a browser.
