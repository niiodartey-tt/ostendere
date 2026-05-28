# Sprint Status

> This is the most frequently updated file in the project.
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 2 — Content, Lookbook, Sections, Contact
**Started:** 28/05/2026
**Target completion:** 11/06/2026
**Branch:** `sprint-2`
**Vercel preview:** [to be added once sprint-2 branch is deployed]

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| Sanity schemas — Look, Service, About, SiteSettings — defined and deployed | `task/sanity-schemas` | ⏳ Not started |
| Sanity Studio configuration and `npx sanity deploy` | `task/sanity-studio` | ⏳ Not started |
| Lookbook grid with Sanity integration and category filter (suit / accessory / bespoke) | `task/lookbook` | ⏳ Not started |
| Lightbox modal component — images and video loops | `task/lightbox` | ⏳ Not started |
| About section — Daniel's story, craft, philosophy | `task/about` | ⏳ Not started |
| Services section — bespoke, ready-to-wear, accessories | `task/services` | ⏳ Not started |
| Contact section — enquiry form + Next.js API route email forwarding to `DANIEL_CONTACT_EMAIL` | `task/contact` | ⏳ Not started |
| Contact form: Zod validation, rate limiting (3/IP/hour), honeypot field, timestamp check | `task/contact` | ⏳ Not started |

### Sprint 2 Definition of Done

- [ ] Sanity schemas (Look, Service, About, SiteSettings) defined and deployed
- [ ] Sanity Studio deployed to studio.ostendere.com (or Vercel subdomain)
- [ ] Lookbook grid renders Sanity content with category filter working
- [ ] Lightbox modal opens on image/video click — closes on Escape and overlay click
- [ ] About section — copy and layout complete, mobile-first
- [ ] Services section — three service types, layout complete, mobile-first
- [ ] Contact section — form submits, API route forwards email to `DANIEL_CONTACT_EMAIL`
- [ ] Contact form: Zod validation passes on all inputs
- [ ] Contact form: rate limiting blocks 4th submission within 1 hour per IP
- [ ] Contact form: honeypot field present — bot submission returns 200, no email sent
- [ ] Contact form: timestamp check present — submissions under 3 seconds rejected
- [ ] `DANIEL_CONTACT_EMAIL` confirmed server-side only — not in client bundle
- [ ] `npm run lint && npx tsc --noEmit && npm run build && npm audit` passes
- [ ] Vercel preview confirmed working — all sections visible, form submits correctly

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

### ⏳ Sprint 3 — Polish, SEO, Launch
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
