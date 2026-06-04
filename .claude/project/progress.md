# Build Progress — Ostendere

> Claude updates this file automatically after every group in every sprint.
> This is a build diary — not a planning document.
> For sprint planning see sprint.md.
> For project details see overview.md.

---

## How Claude Updates This File

After every group Claude adds an entry with:
- Group number and name
- Files created or modified
- Key decisions made and why
- Errors caught and how they were resolved
- Build/TypeScript status

Claude does this automatically — without being asked.

---

## Sprint 0 — Project Setup

### Group 1 — Environment & Scaffold
- `.nvmrc` created (Node 22.22.3 LTS)
- Scaffolded Next.js 16 via temp dir rsync (couldn't scaffold into existing dir with .claude/ files)
- Next.js 14→16 upgrade triggered by 10 high CVEs in next@14.2.35
- Full Sanity stack upgraded: next-sanity@13, sanity@5, @sanity/client@7, @sanity/ui@3

### Group 2 — Config & Design Tokens
- `tsconfig.json` — strict mode + noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitReturns, noFallthroughCasesInSwitch
- `tailwind.config.ts` — Ostendere design tokens (navy, silver, gold, text)
- `app/globals.css` — dark navy theme, CSS vars, Lenis scroll behaviour disabled on html element
- `lib/utils.ts` — cn() utility (clsx + tailwind-merge)

### Group 3 — Security & Environment
- `next.config.mjs` — full CSP (script-src 'self' only), HSTS, X-Frame-Options DENY, Sanity CDN whitelisted
- `.env.local` — created, gitignored
- `.env.example` — committed, all keys listed with comments

### Group 4 — Sanity & Data Layer
- `sanity.config.ts` — structureTool (v5 API)
- `sanity/lib/client.ts`, `sanity/lib/image.ts`
- `sanity/schemas/` — look.ts, service.ts, about.ts, siteSettings.ts, index.ts

### Group 5 — Cleanup, Audit & Initial Commit
- `app/layout.tsx`, `app/page.tsx` — placeholder state
- `types/index.ts` — stub
- `.gitignore` — added `__pycache__/`, `*.pyc` (Python bytecode from .claude/skills)
- 18 moderate CVEs remain in Sanity internal CLI tooling — accepted as runtime-safe
- Initial commit pushed to GitHub (`main` branch), `staging` and `sprint-1` branches created

---

## Sprint 1 — Core Visual Experience

### Group 1 — Smooth Scroll & Fonts
**Files created/modified:**
- `hooks/useLenis.ts` — Lenis hook, manual RAF loop, duration 1.2, custom easing, anchors:true, full cleanup
- `components/layout/LenisProvider.tsx` — React context wrapper exposing Lenis ref
- `app/layout.tsx` — GeistSans (geist npm package) + Cormorant Garamond (next/font/google), LenisProvider wrapping children
- `package.json` — added `geist` package; fixed `lint` script (`next lint` → `eslint . --ext .ts,.tsx` — Next.js 16 removed the lint command)
- `eslint.config.mjs` — created ESLint 9 flat config (ESLint 9 requires flat config, not `.eslintrc.json`)
- `.eslintrc.json` — superseded by `eslint.config.mjs` (kept for reference but ignored by ESLint 9)

**Key decisions:**
- `geist` npm package used instead of local font files (public/fonts/ was empty; Vercel's official package ships the woff2 files)
- Manual RAF loop in useLenis (not ReactLenis from lenis/react) as specified in brief
- `anchors: true` handles hash link interception automatically

### Group 2 — Three.js HeroScene
**Files created:**
- `components/three/HeroScene.tsx` — 5 EdgesGeometry planes (suit structure metaphor), LineSegments silver/platinum, slow Y/X rotation, lerped mouse tilt, `useReducedMotion` pauses animation, full cleanup (RAF, events, renderer, geometry, materials)

**Key decisions:**
- Dynamically imported in page.tsx with `ssr: false` — Three.js can't run on server
- Three.js bundle: **517KB** client-side chunk (loads after SSR/FCP, does not block paint)
- `useReducedMotion()` from Framer Motion controls animation pause (no JS disabled fallback needed)

### Group 3 — Navigation (CelticNavTrigger + MenuOverlay)
**Files created:**
- `components/ui/CelticNavTrigger.tsx` — Celtic compass SVG, Framer Motion rotation (12s idle → 3s hover), pulse on toggle, fixed bottom-centre, full a11y (aria-label, aria-expanded, focus-visible ring)
- `components/ui/MenuOverlay.tsx` — clip-path reveal (`circle(0% at 50% 100%)` → `circle(150%)`), staggered nav links (0.08s), AnimatePresence exit, role="dialog", aria-modal

### Group 4 — Hero Section, Quality Checks
**Files modified:**
- `app/page.tsx` — full hero: HeroScene (dynamic ssr:false), wordmark "Ostendere", brand statement "Premium Menswear · Accra", entry animation (stagger 0.18s), decorative h-px rules, CelticNavTrigger, MenuOverlay, isMenuOpen state

**Quality check results:**
- `npx tsc --noEmit` — CLEAN (0 errors)
- `eslint . --ext .ts,.tsx` — CLEAN (0 errors, 0 warnings)
- `npm run build` — CLEAN (Turbopack, static /, all routes pass)
- `npm audit` — 18 moderate (Sanity CLI tooling only, runtime-safe, unchanged from Sprint 0)

### Group 5 — Three.js Removal + Vercel Diagnostic
**Problem:** Vercel preview — wordmark and Three.js scene permanently invisible. Dark background and Celtic trigger visible only.

**Root cause confirmed via curl diagnostic:**
- `BAILOUT_TO_CLIENT_SIDE_RENDERING` present in SSR HTML
- All animated elements had `style="opacity:0"` baked into server HTML
- Cause: `next/dynamic({ ssr: false })` inside a 'use client' page.tsx causes BailoutToCSR in React 19 concurrent rendering. React "adopts" server DOM (no fresh mount lifecycle). Framer Motion's `useLayoutEffect` never fires → opacity:0 permanent.

**Architectural fix attempted:** page.tsx → Server Component; React.lazy + Suspense in a layout-level HeroSceneClient wrapper. Eliminated BailoutToCSR but visual still failed on Vercel preview.

**Resolution:** Three.js dropped entirely. Hero background replaced with HTML5 video (see Group 6).

**Files deleted:** `components/three/HeroScene.tsx`
**Packages removed:** `three`, `@types/three`
**Documentation:** Known-issues entry added with full BailoutToCSR post-mortem.

### Group 6 — Video Hero Section
**Files created/modified:**
- `components/sections/HeroVideo.tsx` — Server Component, fixed full-screen HTML5 video (WebM first, MP4 fallback), dark overlay rgba(10,13,26,0.55), aria-hidden, z-index -2/-1
- `components/sections/HeroContent.tsx` — rewritten: 100svh, content at 38vh, wordmark `clamp(1.8rem,7vw,6.5rem)` weight-300 tracking-[0.35em], brand statement "Precision. Craft. Distinction." tracking-[0.5em], looping scroll indicator (scaleY), `useReducedMotion` respected
- `app/page.tsx` — Server Component: HeroVideo + HeroContent + HeroInteractive + 4 placeholder sections (#collection, #about, #services, #contact)
- `public/images/hero-poster.jpg`, `public/videos/hero-bg.mp4`, `public/videos/hero-bg.webm` — hero assets committed

**Key decisions:**
- `HeroVideo` is a pure Server Component (no hooks needed — static HTML)
- Video fixed position (`fixed inset-0`) sits behind all content via `[z-index:-2]`
- Dark overlay at `[z-index:-1]` — allows content above at default z-index
- WebM served first (851KB VP9) — better compression for modern browsers; MP4 fallback (1.2MB H.264)
- Scroll indicator uses `times` array with Framer Motion keyframes for correct scaleY + translateY sequence

**Quality check results:**
- `npx tsc --noEmit` — CLEAN (0 errors)
- `npm run build` — CLEAN (static /, all routes pass)
- Diagnostic: 0 `BAILOUT_TO_CLIENT_SIDE_RENDERING` in SSR HTML — no BailoutToCSR
- `opacity:0` instances in SSR HTML: expected Framer Motion initial-state SSR injection; client hydrates and animates correctly

### Group 7 — Vercel Debugging, FM Removal, CSP Fix, Sprint Merge
**Files modified:**
- `components/sections/HeroContent.tsx` — Framer Motion removed entirely; promoted to pure Server Component; all animations replaced with Tailwind CSS keyframe classes (`animate-fade-up`, `animate-fade-up-delay`, `animate-scale-x`, `animate-fade-in`, `animate-scroll-pulse`); `motion-reduce:animate-none motion-reduce:opacity-100` on all animated elements
- `components/ui/CelticNavTrigger.tsx` — `motion.svg` removed; CSS `animate-celtic-idle` / `hover:animate-celtic-fast` on plain `<svg>`; `[touch-action:manipulation]` added to button; open-state styles via plain className conditionals
- `components/ui/MenuOverlay.tsx` — all Framer Motion removed (last remaining FM usage in public components); clip-path reveal via inline style (dynamic runtime value — allowed exception to no-inline-styles rule) + Tailwind `transition-[clip-path] duration-700`; nav link stagger via `transitionDelay` inline style (index-based); `pointer-events-none` when closed
- `app/layout.tsx` — `bg-background` removed from body className; body is now transparent — video is the visual background
- `app/globals.css` — `body { background-color: transparent }` confirmed; `html` retains `var(--background)` (#0a0d1a) as pre-load fallback
- `tailwind.config.ts` — keyframes and animation utilities added: `fadeUp`, `fadeIn`, `scaleX`, `scrollPulse`, `celtic-spin`; animations: `fade-up`, `fade-up-delay`, `scale-x`, `fade-in`, `scroll-pulse`, `celtic-idle`, `celtic-fast`
- `next.config.mjs` — CSP `script-src` updated: `'unsafe-inline' https://vercel.live` added; `connect-src` extended with `wss://ws-us3.pusher.com https://sockjs-us3.pusher.com` for Vercel Live; TODO comment added for Sprint 3 nonce migration
- `.claude/project/known-issues.md` — CSP entry added (Sprint 1 entry; Sprint 3 nonce migration required)

**Root cause — Framer Motion:**
Framer Motion 12.40.0 is deduped from `@sanity/ui@3.2.0 → motion@12.40.0`. Downgrade blocked by peer constraint. FM 12.40.0 fails to hydrate on React 19 concurrent rendering in Vercel production builds — `useLayoutEffect` in FM never fires, leaving all animated elements at opacity:0 permanently. Click handlers in FM-wrapped components also fail to attach, causing full subtree hydration failure. Resolution: FM permanently removed from all public-facing components; CSS animations used everywhere.

**Root cause — video invisible:**
`[z-index:-2]` on `position: fixed` wrapper placed video below body background in CSS paint order. Fixed by setting wrapper to `z-0`, removing `bg-background` from body, making body transparent.

**Root cause — CSP blocking hydration:**
Next.js 16 Turbopack injects inline scripts during hydration. `script-src 'self'` blocked these, causing silent JavaScript failure. Fixed with `'unsafe-inline'`; nonce-based middleware required before production launch (Sprint 3).

**Final z-index stack:** video `z-0` → overlay `z-[1]` (inside wrapper stacking context) → content/sections `z-[2]` → menu `z-40` → Celtic trigger `z-50`

**Quality check results:**
- `npx tsc --noEmit` — CLEAN (0 errors)
- `eslint . --ext .ts,.tsx` — CLEAN (0 errors, 0 warnings)
- `npm run build` — CLEAN (Turbopack, static /, all routes pass)
- `npm audit` — 18 moderate (Sanity CLI tooling only, runtime-safe, unchanged)
- Vercel preview confirmed: video visible, wordmark and brand statement animate in, Celtic trigger rotates, menu opens and closes, nav links navigate

**Sprint 1 merged to main:** 28/05/2026 — commit `7d9c339`

---

## Sprint 2 — Full Site Rebuild (Design File Implementation)
**Branch:** `sprint-2` | **Merged to main:** 02/06/2026 | **Commit:** `65b2f6b`

### Group A — Foundation

**Files modified:** `tailwind.config.ts`, `app/layout.tsx`, `app/globals.css`

- Palette switched from navy/silver to warm espresso (#1c1611) / cream (#ece3d2) / brass (#c79a6b) / coffee (#2f231a)
- Added EB Garamond (body serif, `--font-serif`) and Jost (mono labels, `--font-mono`) via `next/font/google`
- `globals.css` rewritten: new CSS custom properties, all keyframes added directly (scardIn, introEmblem, introGlow, introChar, introRule, introTag, pulse-brass, lightboxOpen, fadeIn, drop, scrub). Tailwind does not emit keyframes used only in inline `style={}` props — all must be in globals.css.
- CSS utility classes: `.panel-sticky`, `.panel-cover`, `.panel-layer`, `.grade-overlay`, `.reveal`, `.scard-hidden`, `.scard-visible`, `.filter-bar`, `.hide-scrollbar`, `.reel-bar`, `.reel-wrap`

### Group B — Asset Migration

**177 files added to** `public/catalog/` and `public/images/` and `public/videos/grwm/`

- 16 suit images, 11 package shots, 18 pocket squares, 7 watches, 12 alpha portraits, 15 pin/accessory photos
- 4 GRWM videos (grwm1–4.mp4) — Daniel replaces with production footage in Sprint 3
- Brand marks: mark-cream.png, mark-brass.png, emblem-cream.png
- Founder portrait: profile.jpg (Daniel Cofie, used in About section)

### Group C — Data Layer

**File created:** `lib/catalog-data.ts`

- Typed data for all product collections: SUITS (16), PACKAGES (4), POCKET_SQUARES (18), WATCHES (7), PINS (12), ACCESSORIES (5), GRWM_REELS (4)
- All prices removed — "Contact for pricing" throughout. Ostendere is Ghana-based; no Euro/dollar values on site.

### Group D — Navigation

**Files created:** `components/sections/IntroOverlay.tsx`, `components/layout/Navbar.tsx`

- IntroOverlay: letter-by-letter CSS animation, sessionStorage skip, skip button, prefers-reduced-motion bypass
- Navbar: sticky with IntersectionObserver scroll-state; logo, desktop nav links (hidden below lg), "Book a Fitting" CTA; active section tracking via rootMargin '-20% 0px -70% 0px' on 10 sections; maps pins→accessories, watches→squares, lookbook/bespoke→about

### Group E — Hero Update

**Files modified:** `components/sections/HeroContent.tsx`, `components/sections/HeroVideo.tsx`

- Emblem watermark (6% opacity), brass ambient glow, "Sartoria · Est. MMXIV / Accra — London" top labels
- OSTEN (weight 400) + DERE (weight 700) split wordmark; brass drop-line scroll cue
- Cinematic video grade matching design file

### Group F — Product Sections (7 sections, 8 UI components)

**Files created:** SuitsSection, PackagesSection, AccessoriesSection, PinDrawerSection, PocketSquaresSection, WatchesSection, GrwmSection (then split to GrwmReel.tsx), FilterBar, SuitCard, SuitQuickview, PackageModal, AccItem, WatchLightbox, PinLightbox, Toast

- Suits: 16-item grid (grid-cols-1 mobile, sm:2, lg:4), colour filter bar, quickview modal with focus trap
- Packages: 4-card grid, gallery modal with thumbnail strip
- Accessories: hover+click image swap (AccItem with onMouseEnter + onClick), swatch circles
- PinDrawer: ivory bg-[#ece3d0] hover:bg-white tiles, mix-blend-multiply images, caption slide-up, lightbox
- PocketSquares: 18-item colour-filtered grid, lightbox with prev/next navigation through full POCKET_SQUARES array regardless of active filter
- Watches: pointer-capture drag scroll rail, lightbox with navigation
- GRWM: lazy-loaded via IntersectionObserver (preload="metadata"), touch play/pause, mobile play indicator

**Critical fix:** Tailwind keyframes (scardIn etc.) not emitted if only used in inline `style={}` — moved all to globals.css

### Group G — Narrative Stack

**Files created/modified:** LookbookPanel.tsx, AboutSection.tsx (updated), BespokeSection.tsx, BespokeForm.tsx

- LookbookPanel: full-bleed sticky parallax, disabled below 768px + prefers-reduced-motion, resize listener resets offset
- AboutSection: profile.jpg portrait, quote, bio, signature, stats (2014/11cm/2 fittings)
- BespokeForm: Zod + react-hook-form, occasion dropdown, preserved rate-limiting/honeypot/timestamp from API route

### Group H — Footer

**File created:** `components/layout/Footer.tsx`

- Newsletter form, 4-column link grid (Atelier/Studio/Connect + brand)
- OSTENDERE text watermark: clamp(48px,13vw,320px) — reduced from 70px to prevent 375px overflow
- Celtic compass watermark: mark-cream.png centred at 15% opacity, scales w-[280px]→sm:w-[400px]→lg:w-[600px]
- mark-cream.png logo beside wordmark in brand column
- "We do not store your personal data" in bottom bar

### Group I — Page Assembly

**File modified:** `app/page.tsx`

- Full section order: IntroOverlay → Navbar → Hero → Suits → Packages → Accessories → Pins → Squares → Watches → GRWM → panel-stack (Lookbook → About → Bespoke) → Footer

### Mobile Audit + Fix Pass

**17 issues fixed across 20 files** — full pass documented:

**Critical (4):** No mobile hamburger → added MobileMenu.tsx (clip-path animation, focus trap); footer watermark overflow → clamp fixed; suit card info bar breakdown at 375px 2-col → grid-cols-1 mobile; hover-only accessories → onClick added to AccItem

**Moderate (6):** FilterBar flex-wrap → flex-nowrap overflow-x-auto + .filter-bar CSS; packages CTA hover-only → opacity-100 on mobile; GRWM videos onMouseEnter-only → GrwmReel.tsx with onClick play/pause; parallax all devices → 768px guard; squares lightbox no close button → X button added; watch lightbox px-16 overflow → px-4 sm:px-8 lg:px-16

**Minor (7):** skip button 44px, form inputs 45px, close buttons w-11 h-11, pin lightbox max-h-[65svh], GRWM copy fixed, reel title clamp, hero wordmark overflow safety

**Build status at merge:** tsc --noEmit: 0 errors | npm run build: clean | npm audit: 0 high/critical | No Framer Motion imports

---

## Sprint 2 — Pre-Rebuild Groups (kept for historical record)

### Group 1 — Config, Data, Shared Utilities
**Files created/modified:**
- `next.config.mjs` — added `images.unsplash.com` to remotePatterns for placeholder images
- `app/globals.css` — added `card-hidden`, `card-visible`, `hide-scrollbar` utility classes; `prefers-reduced-motion` block disables all animations; skip nav link support
- `lib/lookbook-data.ts` — 15 placeholder looks across 5 categories (alpha-man, suits, accessories, watches, pocket-squares); `CATEGORY_LABELS` and `ALL_CATEGORIES` exports
- `hooks/useInView.ts` — reusable IntersectionObserver hook; fires once at threshold 0.15, disconnects after trigger

**Key decisions:**
- `useInView` extracted as shared hook — used by LookbookCard (flip animation), ServiceCard (stagger), RevealOnScroll (About + Services)
- `card-hidden` / `card-visible` in `@layer utilities` so Tailwind can purge them safely
- Unsplash placeholder images will be replaced by Sanity CDN images in a future sprint when Daniel uploads his lookbook

### Group 2 — Lookbook Section
**Files created:**
- `components/sections/LookbookSection.tsx` — Server Component; silver rule separator + section wrapper; renders LookbookGrid
- `components/ui/CategoryFilter.tsx` — Client Component; pill row with `role="tablist"`, `aria-selected`; horizontally scrollable with `hide-scrollbar` on mobile; `sticky top-0` within section
- `components/ui/LookbookCard.tsx` — Client Component; IntersectionObserver flip animation (`card-hidden` → `card-visible`); random 0–400ms delay via `useRef`; `perspective:1000px` wrapper; `transform-style:preserve-3d` card; `scale-[1.02]` on hover; silver overlay fade
- `components/ui/LightboxInfoPanel.tsx` — Client Component; right panel for desktop lightbox; category pill, title, silver rule, description, CTA button that scrolls to #contact
- `components/ui/LookbookLightbox.tsx` — Client Component; full-screen lightbox z-[60]; CSS opacity/visibility transition; keyboard nav (Escape, ArrowLeft, ArrowRight); horizontal swipe detection (touchstart/touchend, >50px delta); `document.body.classList.toggle('lightbox-open')` for Celtic trigger hiding; focus managed to close button on open
- `components/ui/LookbookGrid.tsx` — Client Component; manages activeCategory + visibleCategory (300ms display:none delay post-filter-transition); lightboxIndex state; renders CategoryFilter + cards + LookbookLightbox

**Key decisions:**
- Filter UX: `activeCategory` triggers CSS opacity/scale transition immediately; `visibleCategory` updates after 300ms timeout to hide items from DOM (removes blank space in masonry)
- `[.lightbox-open_&]:hidden` Tailwind arbitrary variant on CelticNavTrigger button — CSS class on `document.body` hides trigger when lightbox is open, no prop drilling
- Two-state filter (activeCategory vs visibleCategory) avoids reflow during transition
- LightboxInfoPanel split into its own file to keep LookbookLightbox under 150 lines

### Group 3 — About, Services, Contact, Footer, API Route
**Files created:**
- `components/ui/RevealOnScroll.tsx` — Client Component; wraps children with IntersectionObserver reveal; supports `direction: 'up' | 'left' | 'none'` and `delay` prop; `motion-reduce:transition-none` applied
- `components/sections/AboutSection.tsx` — Server Component; two-column layout (55%/45%); RevealOnScroll on both columns with `direction="left"` on image and 150ms delay on copy; `h2` heading, three body paragraphs on Daniel's craft and Ostendere's identity; Accra/Ghana context per 16-ghana.md
- `components/ui/ServiceCard.tsx` — Client Component; IntersectionObserver stagger (0/0.15/0.3s delays); custom SVG icons (scissors, hanger, pocket square) drawn inline — no icon library
- `components/sections/ServicesSection.tsx` — Server Component; `grid-cols-1 md:grid-cols-3` with `gap-px bg-[rgba(192,192,192,0.1)]` divider between cards; three service cards
- `components/sections/ContactForm.tsx` — Client Component; react-hook-form + zod; honeypot field (website, aria-hidden, tabIndex=-1); timestamp injected on submit; four primary fields + phone optional; `Field` sub-component for label/input/error pattern; spinner loading state, success/error states; `zodResolver` cast workaround for `exactOptionalPropertyTypes` incompatibility
- `components/sections/ContactSection.tsx` — Client Component; two-column layout; left column: heading, copy, address block (Accra, Instagram @ostendere, WhatsApp); right column: ContactForm
- `components/layout/Footer.tsx` — Server Component; centred two lines; "We do not store your personal data" required by overview.md data privacy rules
- `app/api/contact/route.ts` — POST only (GET returns 405); JSON content-type check; in-memory rate limiting 3/IP/hour; honeypot check before Zod validation; timestamp check (silent success < 3000ms); Zod schema validation; Phase 1 logs name+service only (no PII in logs per security standard); TODO for Resend Phase 2
- `app/page.tsx` — updated: placeholder sections removed; LookbookSection, AboutSection, ServicesSection, ContactSection, Footer imported; `id="main-content"` on `<main>`
- `app/layout.tsx` — skip navigation link added as first body child per a11y standard
- `components/ui/CelticNavTrigger.tsx` — `[.lightbox-open_&]:hidden` class added to button

**TypeScript fix:** `zodResolver(contactSchema) as unknown as Resolver<ContactFormValues>` — `exactOptionalPropertyTypes` + `@hookform/resolvers/zod` type mismatch; cast is safe, schema validation remains intact

**Quality check results:**
- `npx tsc --noEmit` — CLEAN (0 errors)
- `npm run build` — CLEAN (/, /api/contact routes pass)
- `npm audit` — 18 moderate (Sanity CLI only, unchanged from Sprint 0)

### Group 4 — Sprint 2 Refinement Pass
**Files created:**
- `hooks/useParallax.ts` — scroll parallax hook; disabled on `window.innerWidth < 768` and `prefers-reduced-motion`; passive scroll listener; `translateY` applied via `el.style.transform`
- `components/ui/ParallaxBackground.tsx` — Client Component wrapper; accepts `speed` and `className` props; uses `useParallax` hook; renders as a `<div>`

**Files modified:**
- `next.config.mjs` — CSP `img-src` updated to include `plus.unsplash.com`; `plus.unsplash.com` added to remotePatterns
- `lib/lookbook-data.ts` — extended `Look` interface with `fabric`, `craftsmanship`, `care` string fields; all 15 looks updated with correct menswear Unsplash IDs and specific detail values (mill names, construction techniques, care instructions)
- `app/globals.css` — global smoothness: `body { -webkit-tap-highlight-color: transparent; text-rendering: optimizeLegibility }`; lightbox keyframes added (lbEnterFromRight, lbEnterFromLeft, lbExitToLeft, lbExitToRight, lbOpen, lbOverlayReveal); shimmer keyframe added; utility classes: `.lb-enter-right`, `.lb-enter-left`, `.lb-exit-left`, `.lb-exit-right`, `.lb-open`, `.lb-overlay-reveal`, `.shimmer`
- `components/ui/LookbookLightbox.tsx` — complete rewrite as Option D; full-viewport backdrop; `object-contain` image centred; floating gradient overlay at bottom of image (desktop only); `font-display` on title + description; details grid (FABRIC/CRAFTSMANSHIP/CARE); mobile stacked layout with scrollable info panel below image; CSS image transitions via lb-* keyframe classes; `shownIdx` / `shownRef` state machine decouples displayed look from activeIndex for smooth exit-then-enter animation; swipe gesture preserved; keyboard nav preserved
- `components/ui/LightboxInfoPanel.tsx` — deleted (functionality merged into LookbookLightbox floating overlay)
- `components/sections/AboutSection.tsx` — `font-sans` → `font-display` on h2; `font-display` added to body copy div; ParallaxBackground wrapper (speed 0.15) on inner content div; `Africa&apos;s` entity fix
- `components/ui/ServiceCard.tsx` — `font-sans` → `font-display` on h3; `font-display` added to description paragraph
- `components/sections/ServicesSection.tsx` — ParallaxBackground wrapper (speed 0.1) on inner content div
- `components/sections/ContactSection.tsx` — `font-sans` → `font-display` on h2; ParallaxBackground wrapper (speed 0.15) on inner content div
- `components/sections/LookbookSection.tsx` — ParallaxBackground wrapper (speed 0.1) around LookbookGrid
- `hooks/useLenis.ts` — `duration: 1.2 → 1.4`; `touchMultiplier: 1.5` added
- `components/ui/LookbookCard.tsx` — `min-h-[300px]` on portrait cards, `min-h-[200px]` on square/landscape; `shimmer` class on loading skeleton div (shown until `onLoad` fires); `Math.random()` moved inside IntersectionObserver callback (removed from `useRef` initializer to fix `react-hooks/purity` lint rule)
- `components/sections/ContactForm.tsx` — `useRef(Date.now()) → useRef(0)` with `useEffect` setter (fixes `react-hooks/purity`); `// eslint-disable-next-line react-hooks/refs` for `handleSubmit(onSubmit)` in JSX (known react-hook-form / React 19 lint rule false positive)

**Key decisions:**
- Lightbox Option D: floating overlay on the image itself (not a side panel). Simpler DOM, immersive, works at all viewport sizes. Mobile: image stacked above info panel with `overflow-y: auto` scroll.
- ParallaxBackground as a Client Component imported by Server Component sections — valid React 19 pattern (Server Components can render Client Components).
- HeroVideo skipped for parallax: `position: fixed` produces constant `getBoundingClientRect()` values — explicit parallax yields `offset = 0`. Fixed-position already creates natural depth as content scrolls over it.
- `shownRef` resets to `null` on lightbox close so next open always plays `lb-open` animation.

**Quality check results:**
- `npx tsc --noEmit` — CLEAN (0 errors)
- `eslint . --ext .ts,.tsx` — CLEAN (0 errors, 0 warnings)
- `npm run build` — CLEAN (Turbopack; static `/`, dynamic `/api/contact`)
- `npm audit` — 18 moderate (Sanity CLI only, runtime-safe, unchanged from Sprint 0)

---

## Sprint 3 — Polish, SEO, Security, Launch Prep
**Branch:** `sprint-3` | **Partial merge to main:** 04/06/2026 | **Commit:** `4e92589`

### Group A — CSP Nonce Middleware

**Files created/modified:** `proxy.ts`, `app/layout.tsx`

- `proxy.ts` — Next.js 16 proxy middleware (recognised as `proxy.ts`, not `middleware.ts`): per-request `crypto.randomUUID()` nonce, `strict-dynamic` for Turbopack chunk loading, `base-uri 'self'`, `object-src 'none'`, `unsafe-inline` removed from `script-src`. Sets `x-nonce` on request headers via `NextResponse.next({ request: { headers } })`.
- `app/layout.tsx` — made `async`; imports `headers` from `next/headers`; reads `x-nonce`; passes `nonce={nonce}` to `<html>` so Next.js 16 stamps its generated hydration scripts with the same nonce. Route `/` changed from `○` (static) to `ƒ` (dynamic) — required for per-request nonce.
- **Discovery:** Next.js 16 uses `proxy.ts` as the middleware filename. Creating `middleware.ts` caused a build error ("Both files detected"). Deleted `middleware.ts`; `proxy.ts` is correct and was already running.

**Build:** tsc --noEmit: 0 errors | npm run build: clean

### Group B — Intro Overlay: sessionStorage Crash Fix

**Files modified:** `components/sections/IntroOverlay.tsx`

- Wrapped all `sessionStorage` access in a `safeStorage` helper with `try/catch`. On iOS Safari Private Browsing and some Android WebViews, `sessionStorage` throws `SecurityError` — without the guard the `useEffect` aborted before registering the dismiss timer, leaving the overlay frozen permanently.
- `safeStorage.get()` returns `null` on error; `safeStorage.set()` silently fails. Timer and skip button now always execute regardless of storage availability.

**Build:** tsc --noEmit: 0 errors | npm run build: clean | Merged to main (commit `9178f0d` on sprint-3)

### Group C — Intro Overlay: Strict Mode Double-Mount Fix

**Files modified:** `components/sections/IntroOverlay.tsx`

- Root cause: `return () => clearTimeout(t)` in the cleanup function killed the timer on React Strict Mode's simulated unmount (mount → unmount → remount). The second mount's timer was also eventually cancelled in some environments, leaving the overlay frozen.
- Fix: `hasStarted = useRef(false)` guard. Effect bails immediately on second invocation. `setTimeout` not stored in a variable — no reference to cancel. Cleanup function removed entirely.
- Removed temporary diagnostic `console.log` calls added during the investigation.

**Build:** tsc --noEmit: 0 errors | npm run build: clean

### Group D — Intro Overlay: Mobile Viewport & Animation Fixes

**Files modified:** `components/sections/IntroOverlay.tsx`

- `min-h-[100dvh]` on container — defensive guard for Android browsers that under-fill the visual viewport during address-bar transitions. Container already uses `fixed inset-0` (not `h-screen`) so no `100vh` bug, but `dvh` makes it explicit.
- `w-full px-4 sm:px-0` on centre content div — constrains tagline and content to viewport width on narrow screens, preventing overflow clipping by parent `overflow-hidden`.
- Wordmark `fontSize` changed from `clamp(40px,9vw,132px)` to `clamp(2rem,8vw,6rem)` — rem-based minimum for pixel-rounding safety; scales proportionally across breakpoints.
- `animationPlayState: 'running'` added explicitly to all five animated elements (glow, emblem, each char span, rule, tagline) — prevents mobile browsers from suspending animations during viewport settle.

**Build:** tsc --noEmit: 0 errors | npm run build: clean

### Group E — Intro Overlay: Timer Extension + Fade-Out Transition

**Files modified:** `components/sections/IntroOverlay.tsx`

- Timer extended from 3 600 ms to **5 000 ms** — last animation ends at ~2 900 ms; previous 700 ms buffer was insufficient for slower mobile compositors. 5 000 ms provides 2 100 ms of headroom.
- `overlayRef = useRef<HTMLDivElement>(null)` added; `ref={overlayRef}` on outer container div.
- Auto-dismiss path: sets `transition: opacity 0.6s ease` → `opacity: 0` → waits 600 ms → cleans up and unmounts. Total visible duration: **5 600 ms**.
- Skip path: same fade at 0.4 s. Total from tap to unmount: **400 ms**.
- Both paths include null-ref fallback (instant dismiss) so overlay cannot get stuck.

**Known issue (deferred):** On some slow Android devices, GPU compositor lag during address-bar hide can briefly suspend CSS animations even with `animationPlayState: 'running'`. Visible as slight truncation on first load. Post-launch polish item — not blocking production.

**Build:** tsc --noEmit: 0 errors | npm run build: clean | Merged to main 04/06/2026 — commit `4e92589`

---

## Sprint 4
[Claude populates this during the sprint]
