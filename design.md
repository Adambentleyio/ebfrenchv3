# EB French Tutoring -- Design System & Architecture Standard

## 1. Overview

**Brand:** EB French Tutoring by Emma Bolland. 1-to-1 French tutoring and conversational classes in Nantwich, Cheshire.  
**Tone:** Professional, warm, encouraging. Medium energy.  
**Audience:** Students of all ages, from children to retirees, beginners to advanced.  
**Design Direction:** Minimalist luxury with editorial French flair. Clean typography, generous whitespace, warm rose accents, dark anchoring elements. Motion is intentional and restrained -- never decorative for its own sake.

### AIDA Page Structure

Every page follows the AIDA framework. Section order is canonical and must not be reordered without explicit approval:

| Phase | Purpose | Typical Section Type |
|---|---|---|
| **Attention** | Cinematic, wide hero with 2-3 line heading | Hero |
| **Interest** | High-density bento grid or interactive components | Bento Grid / Cards |
| **Desire** | Pinned scroll sections, carousels, accordions | Pinned Split / Accordion |
| **Action** | High-contrast CTA block + footer with contact | CTA + Footer |

### Section Spacing Rule

All major sections use `py-32 md:py-48` (128px mobile, 192px desktop). Sections must breathe as distinct cinematic chapters. Never cram adjacent sections together.

---

## 2. Architecture

### Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| **Markup** | Vanilla HTML5 | No build step, instant deploys |
| **Styling** | Tailwind CSS v3 (CDN) | Utility-first, custom tokens via `tailwind.config` |
| **Motion** | GSAP 3.12 + ScrollTrigger (CDN) | Scroll-driven animations, pinning |
| **Fonts** | Cabinet Grotesk (Fontshare) + Outfit (Google Fonts) | Display + body pairing, both CDN-hosted |
| **Images** | Local only (`assets/`) | No external image CDNs in production |
| **Forms** | Netlify Forms hook | `netlify` attribute on `<form>`, no backend |

### File Structure

```
/
  index.html              # Homepage
  contact.html            # Contact page (future)
  [page].html             # Additional pages
  css/
    styles.css            # Shared styles (buttons, nav, cards, marquee, accordion)
  js/
    main.js               # Shared JS (GSAP init, scroll pinning, carousels, nav)
  assets/
    logo.jpg              # Brand logo
    headshot.png          # Emma's headshot
    ...                    # All local photography (no external image URLs)
  design.md               # This file
```

**Rule:** New pages share `css/styles.css` and `js/main.js`. Page-specific styles belong in a `<style>` block in the page's `<head>` only if truly single-use.

### Dependencies (CDN)

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Cabinet Grotesk -->
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400,300&display=swap" rel="stylesheet">

<!-- Outfit -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 3. Design Tokens

### 3.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `brand.primary` | `#0C0C18` | Primary button bg, footer bg, dark card bg, nav CTA |
| `brand.secondary` | `#1A1A2E` | Hover states, secondary dark surfaces |
| `brand.text` | `#283338` | Body text, headings, link color |
| `brand.muted` | `#6B6768` | Secondary labels, muted metadata |
| `brand.surface` | `#F8F7F4` | Light card backgrounds, testimonial section bg |
| `brand.accent` | `#A7636D` | French rose accent lines, label text, decorative elements, marquee dots |

**Contrast requirements (WCAG AA):**
- Text on white (`#283338` on `#FFFFFF`): ratio 9.6:1 -- passes AAA
- White text on dark (`#FFFFFF` on `#0C0C18`): ratio 18.2:1 -- passes AAA
- Muted on white (`#6B6768` on `#FFFFFF`): ratio 5:1 -- passes AA (use only for secondary text)
- White at 50% opacity on dark: ratio ~3:1 -- use only for footer secondary text, never for interactive elements
- Rose accent on white (`#A7636D` on `#FFFFFF`): ratio 4.7:1 -- passes AA; suitable for decorative text and labels
- **Never** use `text-brand-accent` for body copy (small paragraphs). Labels and decorative emphasis only.

### 3.2 Typography

| Role | Font Family | Weights | Source |
|---|---|---|---|
| **Display** (h1, h2, h3, nav brand) | Cabinet Grotesk | 300, 400, 500, 600, 700, 800 | Fontshare CDN |
| **Body** (p, span, a, input, label) | Outfit | 300, 400, 500, 600, 700 | Google Fonts |

**Tailwind config:**
```js
fontFamily: {
  display: ['"Cabinet Grotesk"', 'sans-serif'],
  body: ['"Outfit"', 'sans-serif'],
}
```

**Usage:**
- Headings: `class="font-display"` -- always bold (`font-bold`), tight tracking (`tracking-[-0.02em]`)
- Body text: `class="font-body"` -- uses Outfit automatically as the default
- Never use Cabinet Grotesk for body copy, never use Outfit for headings

### 3.3 Typography Scale

| Level | Font Size (clamp) | Usage |
|---|---|---|
| Hero h1 | `clamp(2.2rem, 3.8vw, 4.2rem)` | Homepage hero only |
| Page h1 | `clamp(2rem, 3vw, 3.5rem)` | Inner page titles |
| Section h2 | `clamp(2.2rem, 3.5vw, 3.5rem)` | All section headings |
| Card h3 | `text-3xl md:text-4xl` (hero card), `text-2xl` (standard) | Bento grid card titles |
| Card h4 | `text-xl` | Community card titles |
| Body lg | `text-lg md:text-xl` | Hero/CTA subtitles |
| Body base | `text-base` (16px) | Standard paragraph |
| Body sm | `text-sm` (14px) | Card body, footer text, testimonials |
| Labels | `text-xs` (12px) | Card eyebrow labels, metadata |
| Nav links | `text-sm font-medium` | Desktop navigation |

**H1 Line Rule:** The H1 must never exceed 3 lines on any viewport. Use `max-w-5xl` container and adjust the clamp values if needed. If a headline wraps to 4+ lines, widen the container or reduce font size.

### 3.4 Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| Section padding | `py-32 md:py-48` | Every major section |
| Section margin-bottom | `mb-16` | Heading-to-content gap within sections |
| Card gap (bento) | `gap-4` | Grid gap for bento cards |
| Card padding | `p-8 md:p-12` | Internal card padding |
| Button padding | `14px 36px` (default), `px-10 py-4` (large) | CTA buttons |
| Container max-width | `max-w-7xl` | Standard section content width |
| Narrow container | `max-w-4xl` | CTA section only |
| Content line length | `max-w-xl` (for body), `max-w-sm` (for card text) | Prevents over-wide reading lines |

### 3.5 Border Radius

| Element | Radius |
|---|---|
| Buttons, inputs | `rounded-[4.5px]` (4.5px) |
| Bento cards | `rounded-2xl` (16px) |
| Hero image | `rounded-3xl` (24px) |
| Navigation pill | `rounded-full` |
| Avatar images | `rounded-full` |
| Floating accent images | `rounded-2xl` (16px) |
| Accordion panels | `rounded-2xl` (16px) |
| Testimonial cards | `rounded-2xl` (16px) |

### 3.6 Shadows

| Element | Shadow |
|---|---|
| Primary button | `box-shadow: 7px 7px 0px 0px rgba(4,18,31,0.12)` |
| Primary button hover | `box-shadow: 10px 10px 0px 0px rgba(4,18,31,0.18)` |
| Navigation glass | `box-shadow: 0 4px 30px rgba(0,0,0,0.04)` |
| Cards (light bg) | `shadow-sm border border-black/[0.04]` |
| Hero image | `shadow-2xl` |
| Carousel buttons | `shadow-lg border border-black/[0.06]` |

---

## 4. Breakpoint System

| Breakpoint | Min Width | Primary Use |
|---|---|---|
| Default | 0px | Mobile-first single column |
| `sm` | 640px | Inline logo text, nav CTA, horizontal CTA buttons |
| `md` | 768px | Desktop nav links visible, 12-col grid activates, testimonial 3-per-view, accordion horizontal layout |
| `lg` | 1024px | Pinned split sections, floating hero images, accordion side-labels rotate |

**Pin activation rule:** GSAP `pin: true` only at `window.innerWidth >= 1024`. Below lg, elements stack in normal document flow. Never pin on mobile or tablet.

**Horizontal scroll prevention:** Every `<main>` element must use `class="overflow-x-hidden w-full max-w-full"`.

---

## 5. Component Patterns

### 5.1 Navigation

Fixed position, glass-morphism pill centered at top of viewport.

**Structure:**
```html
<nav class="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
  <div class="glass-nav rounded-full px-6 py-3 flex items-center gap-8 mx-auto shadow-lg">
    <!-- Logo + brand name -->
    <!-- Desktop links (hidden on mobile) -->
    <!-- CTA button (hidden on mobile) -->
    <!-- Mobile hamburger (hidden on desktop) -->
  </div>
  <!-- Mobile dropdown menu -->
</nav>
```

**Mobile:** Logo + hamburger in pill. Hamburger toggles a dropdown with glass-nav styling.  
**Desktop:** Logo, 4 nav links (Expertise, Reviews, Community, Services), CTA button.

### 5.2 Hero

Layout is chosen by design randomization. Current: **Artistic Asymmetry**.

**Structure:** 12-column grid. Text occupies `md:col-span-8 lg:col-span-7`. Image occupies `md:col-span-4 lg:col-span-5` with floating offset decorative elements.

**Requirements:**
- H1 uses `max-w-5xl` and `clamp()` font sizing
- No stamp badges, no pill tags, no data/stats in the hero
- Two CTAs: one primary (dark fill), one secondary (outline)
- Inline typography image: a small pill-shaped image embedded inside the H1 text
- Background ambient: radial gradient in accent color, positioned off-screen
- Fade-in animation on all hero content (CSS keyframes with staggered delays)

### 5.3 Bento Grid

12-column CSS grid with `grid-auto-flow: dense`. Used for expertise/features display.

**Requirements:**
- All column spans must sum to 12 per row, zero empty cells
- 3-5 cards maximum (never 8+)
- Card backgrounds alternate: dark fill, light fill, transparent with border, image-background
- Each card has: eyebrow label (uppercase, `tracking-[0.2em]`), heading, body text
- Large hero card (span-7, row-span-2) has ambient radial gradient decoration
- Cards animate in staggered on scroll via `data-gsap-card`

**Entrance animation (GSAP):**
- `opacity: 0 -> 1`, `y: 52 -> 0`, `scale: 0.94 -> 1`
- Duration: 0.85s, ease: `power3.out`, start: `top 92%`
- Stagger: 0.06s per card

### 5.4 Testimonial Carousel

Horizontal scroll track with manual prev/next controls.

**Structure:**
- Track with `flex` layout, each slide is `min-w-full md:min-w-[33.333%]`
- 3 slides visible on desktop, 1 on mobile
- Each slide: avatar (grayscale), name, testimonial text
- Navigation: circular buttons positioned at left/right edges
- GSAP-powered translate for smooth sliding (`duration: 0.55s, ease: power3.out`)
- Buttons disable at track boundaries

### 5.5 Pinned Split Section (GSAP)

Left column pinned in viewport center, right column scrolls past.

**Structure:**
```html
<div class="flex flex-col lg:flex-row" id="pinned-split-container">
  <div class="lg:w-[42%] lg:h-screen lg:flex lg:items-center" id="pinned-left">
    <!-- Heading + subtitle, vertically centered -->
  </div>
  <div class="lg:w-[58%] flex flex-col gap-12" id="pinned-right">
    <!-- Scrolling cards -->
  </div>
</div>
```

**GSAP config:**
- Trigger: `#pinned-split-container`
- Start: `'top top'`, End: `'bottom bottom'`
- Pin: `#pinned-left`, `pinSpacing: false`
- Only activates at `window.innerWidth >= 1024`
- Mobile: heading stacks above cards in normal flow (`flex-col`)

### 5.6 Horizontal Accordion

6-panel horizontal bar that expands on hover.

**Structure:**
- Flex container: `flex flex-col md:flex-row`, height `md:h-[500px]`
- Each panel: `accordion-panel` class, default `flex-[0.6]`, active `flex-[3]`
- Default active: first panel
- Each panel has: background image (low opacity, grayscale), number label, hidden content
- Content reveals with opacity transition on `.active`
- Side labels rotate vertically on inactive panels (desktop only)

**Interaction:**
- Trigger: `mouseenter` on any panel
- GSAP animates flex values over 0.65s with `power3.inOut`
- Pause on hover (not needed, mouseenter handles it)

### 5.7 Infinite Marquee

Full-width dark bar with scrolling French vocabulary.

**Structure:**
- Container: `overflow-hidden bg-brand-primary`
- Track: `marquee-track` with `flex`, CSS animation `marquee 40s linear infinite`
- Content duplicated via JS for seamless loop
- Items: large display text in white at 80% opacity, separated by accent-colored bullet dots
- Pauses on hover

### 5.8 CTA Section

Centered, high-impact contact prompt.

**Structure:**
- Container: `max-w-4xl mx-auto text-center`
- Background: radial ambient glow in accent color
- Heading: `clamp(2.5rem, 5vw, 4.5rem)`
- Subtitle with `data-scrub-text` for GSAP word-by-word reveal
- Two buttons: primary (Let's Go), secondary (Call to Discuss)
- Buttons stack vertically on mobile, horizontal on sm+

### 5.9 Footer

Dark background (`bg-brand-primary`) with 3-column grid.

**Columns:**
1. Brand: logo + description + copyright
2. Navigation: 5 links (Expertise, Reviews, Community, Services, Contact)
3. Newsletter: email input + subscribe button

**Contact info:**
- Phone: `07751 145465`
- Email: via contact form only (never expose email address in HTML)
- Physical location: Nantwich, Cheshire

### 5.10 Forms (Netlify)

All forms use Netlify's form detection hook.

**Required attributes:**
```html
<form name="contact" method="POST" netlify>
  <input type="hidden" name="form-name" value="contact">
  <!-- form fields -->
</form>
```

**Style:** Inputs use `border border-white/10 rounded-[4.5px]` on dark backgrounds, or `border border-black/[0.06] rounded-[4.5px]` on light backgrounds. Focus state: `focus:border-white/30` (dark) or `focus:border-brand-primary/30` (light).

---

## 6. Motion & Interaction Standards

### 6.1 When to Use CSS vs GSAP

| Type | Technology | Reason |
|---|---|---|
| Hover scale on images | CSS (`group-hover:scale-105 transition-transform duration-1000 ease-out`) | Simple, GPU-composited |
| Hover color changes | CSS (`hover:bg-* transition-colors duration-300`) | No layout impact |
| Button hover effects | CSS (`transition: all 0.35s cubic-bezier(...)`) | Contained, predictable |
| Scroll-triggered entrances | GSAP + ScrollTrigger | Needs trigger/scrub control |
| Pinning elements | GSAP ScrollTrigger `pin: true` | Only GSAP handles this robustly |
| Carousel sliding | GSAP `.to()` | Smoother easing than CSS |
| Accordion flex animation | GSAP `.to()` | Multi-element coordinated tween |
| Text scrubbing | GSAP + ScrollTrigger | Word-by-word sequential opacity |
| Marquee loop | CSS `@keyframes` | Infinite, no JS overhead |

### 6.2 Transition Values

**CSS transitions:**
- Fast (color changes): `transition-colors duration-300`
- Medium (transforms): `transition-transform duration-700 ease-out`
- Slow (image zoom): `transition-transform duration-1000 ease-out`
- Button hover: `transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**GSAP easing:**
- Entrance reveals: `power3.out`, duration 0.7-0.85s
- Carousel slides: `power3.out`, duration 0.55s
- Accordion flex: `power3.inOut`, duration 0.65s
- Scrubbing: `scrub: 0.8`, individual word duration 0.15s, stagger 0.04s

### 6.3 Hover Physics

Every clickable card or image container must use:
```html
<div class="overflow-hidden group">
  <img class="transition-transform duration-1000 ease-out group-hover:scale-105">
</div>
```

The `overflow-hidden` parent is required to prevent scale overflow. The `group`/`group-hover` pattern is standard across all cards.

---

## 7. Image & Asset Conventions

### 7.1 Source Rule

All images must be local files in `assets/`. Never use external URLs (picsum, unsplash, CDN) in production markup.

### 7.2 Placeholder Workflow

During development, use `https://picsum.photos/seed/{keyword}/{width}/{height}` with descriptive seed keywords matching the image context. Replace with local files before production deploy.

### 7.3 Image Styling

Apply consistent filters for editorial cohesion:
- **Grayscale**: `filter: grayscale(1)` on avatar images, background decorative images
- **Desaturated**: `filter: contrast(1.1) saturate(0.85)` on section photography
- **Low opacity overlays**: `opacity-[0.03]` to `opacity-20` for background textures

### 7.4 File Naming

`{subject}_{variant}.{ext}` -- lowercase, hyphen-separated. Example: `ebfrench_headshot_test_1.png`

---

## 8. CSS Class Naming

### 8.1 Custom Classes

Custom classes are prefixed with no namespace and use kebab-case. They exist only for patterns that Tailwind cannot express:

| Class | Purpose |
|---|---|
| `.glass-nav` | Navigation backdrop blur + border + shadow |
| `.btn-primary` | Primary CTA button (dark fill) |
| `.btn-secondary` | Secondary CTA button (outline) |
| `.mesh-bg` | Page-level radial gradient ambient background |
| `.accordion-panel` | Accordion panel base styles |
| `.accordion-panel.active` | Active/expanded panel state |
| `.panel-content` | Accordion reveal content |
| `.panel-label` | Accordion number/side-label |
| `.marquee-track` | Marquee animation + layout |
| `.testimonial-track` | Carousel track transition |
| `.scrub-word` | Scrubbing text individual words |
| `.animate-fade-in` | CSS keyframe fade-in-up trigger |

### 8.2 Tailwind Classes

All other styling uses Tailwind utility classes. Custom values use arbitrary syntax:
- `rounded-[4.5px]`, `tracking-[-0.02em]`, `[grid-auto-flow:dense]`, `lg:w-[42%]`

### 8.3 Data Attributes

Prefix for JS targets:
- `data-gsap-card` -- Bento grid cards (staggered entrance)
- `data-scrub-text` -- Paragraphs with scrolling word reveals
- `data-accordion` -- Accordion panels

---

## 9. JavaScript Conventions

### 9.1 Initialization

`main.js` must:
1. Call `gsap.registerPlugin(ScrollTrigger)` at the top
2. Check for element existence before creating ScrollTriggers
3. Guard pin logic behind `window.innerWidth >= 1024`
4. Use `once: true` on one-time entrance animations
5. Duplicate marquee content for seamless looping

### 9.2 Selector Strategy

- Use IDs (`#id`) for unique structural elements (nav, pinned containers, carousel track)
- Use `data-*` attributes for collections of similar elements that need GSAP targeting
- Never use class selectors for JS behavior unless the class is exclusive to JS

### 9.3 ScrollTrigger Rules

- All ScrollTriggers must refresh on `window.resize` (automatic with GSAP)
- Pinned elements must have `pinSpacing: false` when pinning a child of a flex container
- `start`/`end` positions use relative keywords (`'top top'`, `'bottom bottom'`), not pixel values

---

## 10. Accessibility (WCAG AA)

### 10.1 Contrast

- All body text: minimum 4.5:1 ratio against background
- All button text: minimum 4.5:1 ratio against button background
- Decorative elements (accent lines, ambient gradients): exempt

### 10.2 Focus States

All interactive elements must have visible focus indicators:
- Links: default browser outline or `focus-visible:ring-2`
- Buttons: `focus-visible:ring-2 focus-visible:ring-offset-2`
- Inputs: `focus:border-white/30` or `focus:border-brand-primary/30`

### 10.3 Semantic HTML

- Use `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `<form>` appropriately
- Images must have descriptive `alt` attributes
- ARIA labels on icon-only buttons (hamburger menu, carousel arrows)
- Form inputs must have associated `<label>` elements or `aria-label`

### 10.4 Reduced Motion

Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Content & Copy Standards

### 11.1 Section Naming

Sections use French titles to maintain brand identity:
- L'expertise (Expertise)
- Les Recommendations (Testimonials)
- L'amitié (Community)
- L'aventure (Services/Offerings)

### 11.2 Voice

- Warm, personal, encouraging
- Use "I" for Emma, "you" for the learner
- French phrases sprinkled naturally (`Salut!`, `C'est parti!`, `Bonjour`)
- No marketing jargon, no pressure tactics

### 11.3 Strictly Banned

These patterns must never appear in any page:

| Banned | Replace With |
|---|---|
| Meta-labels: "SECTION 01", "QUESTION 05", "ABOUT US" | Delete entirely, or use content-aware labels |
| Emojis in code or copy | Remove |
| Stamp/badge icons on hero text | Delete |
| Pill-tags under the hero | Delete |
| Raw data/stats in the hero | Move to a dedicated stats section if needed |
| 4+ line H1 headings | Widen container, reduce font size |
| Empty grid cells in bento layouts | Use `grid-auto-flow: dense` and verify column math |
| Invisible button text | Ensure contrast ratio >= 4.5:1 |
| `text-brand-accent` for body copy | Rose accent passes AA on white; use for labels and decorative emphasis only, not paragraphs |
| External image URLs in production | All images must be local in `assets/` |
| Horizontal scrollbars | `overflow-x-hidden` on `<main>`, test at all breakpoints |

---

## 12. Development Workflow

### 12.1 Starting a New Page

1. Copy an existing page's HTML structure (`<head>` through footer)
2. Keep the shared `<link>` and `<script>` references to `css/styles.css` and `js/main.js`
3. Build sections following the AIDA order
4. Add page-specific `<style>` block only if truly single-use

### 12.2 Pre-Flight Checklist

Before considering a page complete, verify:
- [ ] No banned patterns present (see Section 11.3)
- [ ] H1 wraps to 2-3 lines on all viewports
- [ ] Bento grids have zero empty cells
- [ ] All buttons have visible text with proper contrast
- [ ] No horizontal scroll on 320px-1920px width
- [ ] `overflow-x-hidden` on `<main>`
- [ ] GSAP pin only activates at `>= 1024px`
- [ ] All images have `alt` attributes
- [ ] No external image URLs remain
- [ ] All forms have `netlify` attribute
- [ ] No `text-brand-accent` used for body text
- [ ] Reduced motion media query present

### 12.3 Testing

- Visual: test at 375px, 768px, 1024px, 1440px, 1920px
- Interaction: test carousel buttons, accordion hover, nav hamburger
- Motion: verify no jarring layout shifts, no horizontal overflow
- Accessibility: keyboard-navigate the page, verify focus rings visible

---

## 13. Change Log

| Date | Change | Author |
|---|---|---|
| 2026-05-01 | Initial design.md created | Design system audit |
