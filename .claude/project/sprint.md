# Sprint Status

> This is the most frequently updated file in the project.
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 3 — Polish, SEO, Security, Launch Prep
**Started:** 02/06/2026
**Target completion:** 25/06/2026
**Branch:** `sprint-3` (to be created)
**Vercel preview:** [to be added once sprint-3 branch is deployed]

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| Nonce-based CSP middleware — replace `unsafe-inline` in script-src | `sprint-3` | ✅ Done — proxy.ts, merged to main 02/06/2026 |
| Purchase ostendere.com domain — register and verify ownership | `sprint-3` | 🔴 Active task |
| SEO metadata on all sections via Next.js Metadata API | `sprint-3` | ⏳ Not started |
| Sitemap via next-sitemap | `sprint-3` | ⏳ Not started |
| Core Web Vitals audit — all green on mobile | `sprint-3` | ⏳ Not started |
| Security headers verified at securityheaders.com — A or A+ | `sprint-3` | ⏳ Not started |
| Sanity Studio deploy + CORS origins locked | `sprint-3` | ⏳ Not started |
| Contact form email forwarding via Resend to DANIEL_CONTACT_EMAIL | `sprint-3` | ⏳ Not started |
| Domain registration — ostendere.com | `sprint-3` | ⏳ Not started |
| Production deploy + DNS configuration | `sprint-3` | ⏳ Not started |
| Client handoff walkthrough with Daniel | `sprint-3` | ⏳ Not started |

### Sprint 3 Definition of Done

- [ ] Nonce-based CSP middleware replacing `'unsafe-inline'` in script-src
- [ ] Security headers A or A+ at securityheaders.com
- [ ] `npm audit` — zero high or critical vulnerabilities
- [ ] No secrets in git history: `git log --all --full-history -- .env*`
- [ ] `DANIEL_CONTACT_EMAIL` not in client bundle
- [ ] Contact form rate limiting tested — 4th submission blocked
- [ ] Honeypot field tested — bot submission returns 200, no email
- [ ] Malicious input validation tested (SQL, HTML, script tags)
- [ ] Sanity CORS origins locked — no wildcard
- [ ] Contact form email forwarding working to DANIEL_CONTACT_EMAIL
- [ ] SEO metadata on all pages
- [ ] Core Web Vitals green on pagespeed.web.dev mobile
- [ ] ostendere.com domain registered and pointed to Vercel
- [ ] Production deploy live
- [ ] Daniel walkthrough and sign-off

**Approved by Naa:** [ ]
**Merged to main:** [ ]
**Merged date:** [to be filled]

---

## Sprint History

### ✅ Sprint 0 — Project Setup
**Started:** 27/05/2026
**Merged:** 27/05/2026

- GitHub repository created with main as default branch
- Vercel project linked to GitHub — auto-deploy on main confirmed
- Staging and sprint-1 branches created
- Next.js 16 scaffolded — TypeScript, Tailwind, ESLint, App Router, @/* alias
- ApexSource standard stack installed (Framer Motion, Lenis, Tailwind Animate, Sanity, react-hook-form, zod, clsx, tailwind-merge, lucide-react, date-fns)
- npm audit: 18 moderate CVEs in Sanity CLI tooling only — runtime-safe, accepted
- tailwind.config.ts configured with Ostendere colour tokens (dark navy, silver, platinum, gold)
- next.config.mjs configured (CSP headers, full security headers, cdn.sanity.io remotePatterns, scrollRestoration: false)
- Base layout created with LenisProvider and root fonts committed
- .nvmrc committed (Node 22.22.3 LTS)
- .env.local confirmed in .gitignore
- .env.example committed with all Phase 1 variable names
- Sanity schemas (Look, Service, About, SiteSettings) scaffolded
- Initial commit on main — Vercel production deployment confirmed

### ✅ Sprint 2 — Full Site Rebuild from Design File
**Started:** 28/05/2026
**Merged:** 02/06/2026

- Full design implementation from OSTENDERE.html (claude.ai/design export)
- Palette: warm espresso (#1c1611) / cream (#ece3d2) / brass (#c79a6b) — replaced navy/silver
- Typography: EB Garamond (body) + Jost (mono labels) added via next/font alongside Cormorant
- Intro overlay: letter-by-letter CSS animation, sessionStorage skip, reduced-motion bypass
- Sticky navbar: IntersectionObserver active-section tracking, wordmark, CTA
- Mobile hamburger: clip-path circle animation, focus trap, Escape close, all 6 nav links
- Suits: 16-item filterable grid (colour filters) + quickview modal + inquiry toast
- Packages: 4 editorial boxes + gallery modal with thumbnail strip
- Accessories: hover/touch image swap (hoverIndex → activeIndex), swatch circles
- Pin drawer: 12 ivory tiles with hover caption reveal + lightbox with prev/next nav
- Pocket squares: 18-item colour-filtered grid + lightbox with prev/next + keyboard nav
- Watches: drag-scroll rail (pointer capture) + lightbox with prev/next navigation
- GRWM: 4 lazy-loaded video reels, IntersectionObserver load, touch play/pause
- Lookbook panel: full-bleed sticky parallax (disabled below 768px + reduced-motion)
- About: Daniel Cofie portrait (profile.jpg), quote, stats, bespoke type treatment
- Bespoke form: Zod + react-hook-form, occasion dropdown, security features preserved
- Footer: newsletter, 4-column links, Celtic compass watermark, OSTENDERE text mark
- Scroll to top button: appears after 400px, 44px touch target
- Full mobile audit: 4 critical + 6 moderate + 7 minor issues identified and fixed
- 176 files changed; all catalog images + GRWM videos committed to public/
- tsc --noEmit: 0 errors | npm build: clean | npm audit: 0 high/critical
- No Framer Motion anywhere — CSS animations and IntersectionObserver throughout

### ✅ Sprint 1 — Three.js Hero and Navigation
**Started:** 27/05/2026
**Merged:** 28/05/2026

- Lenis smooth scroll integration — manual RAF loop, duration 1.2s, anchors:true, LenisProvider wrapping app
- GeistSans + Cormorant Garamond fonts configured via CSS variables
- Three.js HeroScene built then dropped — BailoutToCSR trap with next/dynamic({ ssr: false }) in React 19; irrecoverable on Vercel production
- HTML5 video hero replacing Three.js — WebM (VP9, 851KB) + MP4 fallback (H.264, 1.2MB), fixed fullscreen, dark overlay
- CelticNavTrigger — Celtic compass SVG, CSS rotation animation (12s idle / 3s hover), fixed bottom-centre, full a11y
- MenuOverlay — CSS clip-path reveal, staggered nav links, role="dialog", aria-modal
- Hero section assembled: HeroVideo (Server Component) + HeroContent (Server Component, CSS animations) + HeroInteractive (Client Component, state only)
- Framer Motion 12.40.0 removed from all public-facing components — deduped against @sanity/ui@3.2.0, incompatible with React 19 production hydration on Vercel; replaced with CSS keyframe animations in tailwind.config.ts
- CSP updated: 'unsafe-inline' added to script-src for Next.js 16 Turbopack hydration (Sprint 3 nonce migration required before production launch)
- Z-index stack resolved: video z-0, overlay z-[1] inside stacking context, content z-[2], menu z-40, Celtic trigger z-50
- Body background set to transparent — video is the visual background; html retains #0a0d1a as pre-load fallback
- 4 placeholder sections committed: #collection, #about, #services, #contact
- `npm run lint && npx tsc --noEmit && npm run build && npm audit` — all clean

---

## Upcoming Sprints

### ⏳ Sprint 3 — Polish, SEO, Security, Launch Prep
**Planned start:** 12/06/2026 (approximately — after Sprint 2 review and Naa approval)

Planned tasks:
- [ ] Animation refinement across all sections
- [ ] SEO metadata on all sections via Next.js Metadata API
- [ ] Sitemap generated via next-sitemap
- [ ] Core Web Vitals audit — all scores green on mobile (pagespeed.web.dev)
- [ ] Mobile QA at 375px, 390px, 768px, 1280px
- [ ] Security: implement nonce-based CSP middleware — replace 'unsafe-inline' in script-src before production launch (see known-issues.md — Sprint 1 CSP entry)
- [ ] Security: `npm audit` — zero high or critical vulnerabilities
- [ ] Security: all headers verified at securityheaders.com — A or A+ rating
- [ ] Security: no secrets in git history — `git log --all --full-history -- .env*`
- [ ] Security: `DANIEL_CONTACT_EMAIL` not exposed in client bundle
- [ ] Security: contact form rate limiting tested (4th submission within 1 hour blocked)
- [ ] Security: honeypot field tested (bot submission returns 200, Daniel receives no email)
- [ ] Security: form validation tested with malicious input (SQL, HTML, script tags)
- [ ] Security: Sanity CORS origins verified — no wildcard `*` origin
- [ ] Security: studio.ostendere.com inaccessible without Sanity login
- [ ] Security: `X-Frame-Options: DENY` confirmed — site cannot be iframed
- [ ] Security: Lighthouse security audit run on Vercel preview URL
- [ ] Staging deploy and Daniel's full review and sign-off
- [ ] Register ostendere.com domain — purchase and verify ownership
- [ ] Update `NEXT_PUBLIC_SITE_URL` in Vercel dashboard from ostendere.vercel.app to https://ostendere.com
- [ ] Production deploy — merge staging to main
- [ ] DNS configuration — ostendere.com pointed to Vercel
- [ ] Handoff documentation and client walkthrough

---

## Do Not Touch During Current Sprint

- `app/layout.tsx` — LenisProvider and font configuration — do not modify during Sprint 2
- `components/sections/HeroVideo.tsx` — video layer is correct; do not adjust z-index or background
- `components/sections/HeroContent.tsx` — CSS animations are production-confirmed; do not reintroduce Framer Motion
- `components/ui/CelticNavTrigger.tsx` — CSS rotation confirmed working; do not reintroduce Framer Motion
- `components/ui/MenuOverlay.tsx` — CSS clip-path transition confirmed working; do not reintroduce Framer Motion
- `next.config.mjs` — CSP headers are intentionally set; do not tighten script-src until Sprint 3 nonce migration

---

## Sprint Notes

- Primary traffic source is Instagram — mobile-first is critical across every component
- Framer Motion 12.40.0 is PERMANENTLY banned from public-facing components — deduped against @sanity/ui@3.2.0, breaks React 19 hydration on Vercel production. Use CSS animations only.
- Navigation is Celtic SVG trigger + full-screen overlay — there is no traditional Navbar component
- Daniel manages lookbook content independently via Sanity Studio — schemas must be simple and well-labelled
- Domain purchase (ostendere.com) is a Sprint 3 task — ostendere.vercel.app is used for development, staging, and preview throughout Sprints 0–2
- Phase 1 has no Supabase, Paystack, Resend, or auth — reject any code suggestion that introduces these
- `DANIEL_CONTACT_EMAIL` is always server-side only — never `NEXT_PUBLIC_` prefix under any circumstances
- CSP: 'unsafe-inline' in script-src is temporary — must be replaced with nonce-based middleware in Sprint 3 before production launch

---

## How to Update This File

### At sprint start
1. Move current sprint to Sprint History with ✅
2. Create new Current Sprint section
3. List all tasks from the backlog for this sprint
4. Create the sprint branch: `git checkout -b sprint-N`
5. Update `CLAUDE.md` Quick Reference with new sprint number

### During sprint
1. Update task status as work progresses
2. Add new tasks discovered mid-sprint
3. Note any decisions or blockers in Sprint Notes

### At sprint end
1. Work through Definition of Done checklist
2. Get Naa's approval on Vercel preview URL
3. Mark approval checkbox
4. Merge sprint branch to main
5. Mark merged checkbox and add merge date
6. Begin next sprint setup
