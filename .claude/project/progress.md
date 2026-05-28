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

## Sprint 2 — Content, Lookbook, Sections, Contact

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

---

## Sprint 3
[Claude populates this during the sprint]

---

## Sprint 4
[Claude populates this during the sprint]
