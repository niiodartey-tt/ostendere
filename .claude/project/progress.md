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

---

## Sprint 2
[Claude populates this during the sprint]

---

## Sprint 3
[Claude populates this during the sprint]

---

## Sprint 4
[Claude populates this during the sprint]
