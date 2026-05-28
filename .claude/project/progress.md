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

## Sprint 2
[Claude populates this during the sprint]

---

## Sprint 3
[Claude populates this during the sprint]

---

## Sprint 4
[Claude populates this during the sprint]
