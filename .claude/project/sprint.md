# Sprint Status

> This is the most frequently updated file in the project.
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 0 — Project Setup
**Started:** 27/05/2026
**Target completion:** 28/05/2026
**Branch:** `sprint-0`
**Vercel preview:** [to be added once Vercel project is created]

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| Fill .claude/project/ documentation | `task/documentation` | 🔄 In progress |
| Create GitHub repository | `task/github-setup` | ⏳ Not started |
| Create Vercel project and link to GitHub | `task/vercel-setup` | ⏳ Not started |
| Create Sanity project and configure dataset | `task/sanity-setup` | ⏳ Not started |
| Configure CORS origins in Sanity dashboard (ostendere.com, staging.ostendere.com, localhost:3000 only — no wildcard) | `task/sanity-setup` | ⏳ Not started |
| Add Daniel's email as only Sanity project member — no other users | `task/sanity-setup` | ⏳ Not started |
| Scaffold Next.js 16 — TypeScript, Tailwind, ESLint, App Router | `task/nextjs-scaffold` | ⏳ Not started |
| Install ApexSource standard stack (Framer Motion, Lenis, Tailwind Animate, Three.js, Sanity, react-hook-form, zod, clsx, tailwind-merge, lucide-react, date-fns) | `task/stack-install` | ⏳ Not started |
| Run npm audit after stack install — resolve any high or critical issues before Sprint 1 | `task/stack-install` | ⏳ Not started |
| Configure tailwind.config.js with Ostendere colour tokens (dark navy, silver/platinum) | `task/tailwind-config` | ⏳ Not started |
| Configure next.config.js (Ostendere CSP headers, all security headers, cdn.sanity.io remotePatterns, scrollRestoration: false) | `task/next-config` | ⏳ Not started |
| Create base layout with LenisProvider and root fonts | `task/base-layout` | ⏳ Not started |
| Commit .nvmrc and .env.example | `task/env-files` | ⏳ Not started |
| Confirm .env.local is in .gitignore before first commit | `task/env-files` | ⏳ Not started |
| Set all environment variables in Vercel dashboard (development, preview, production) | `task/vercel-env` | ⏳ Not started |
| Initial commit — merge sprint-0 to main | `task/initial-commit` | ⏳ Not started |

### Sprint 0 Definition of Done

- [ ] GitHub repository created with main as default branch
- [ ] Vercel project linked to GitHub — auto-deploy on main confirmed
- [ ] Staging environment configured on Vercel (staging branch)
- [ ] Sanity project created — dataset: production
- [ ] Sanity CORS origins locked — ostendere.com, staging.ostendere.com, localhost:3000 only
- [ ] Daniel's email is the only Sanity project member
- [ ] Next.js 16 scaffolded — TypeScript, Tailwind, ESLint, App Router, @/* alias
- [ ] ApexSource standard stack installed and verified (`npm run build` passes)
- [ ] npm audit passes — zero high or critical vulnerabilities
- [ ] tailwind.config.js configured with Ostendere colour tokens (dark navy background, silver/platinum accent)
- [ ] next.config.js configured (Ostendere CSP headers, full security headers, cdn.sanity.io remotePatterns, scrollRestoration: false)
- [ ] Base layout created with LenisProvider and root fonts committed
- [ ] .nvmrc committed (Node LTS version)
- [ ] .env.local confirmed in .gitignore before first commit
- [ ] .env.example committed with all Phase 1 variable names
- [ ] All .claude/project/ documentation files complete — no [TODO] markers remaining
- [ ] All Phase 1 environment variables set in Vercel dashboard (development, preview, production)
- [ ] `npm run lint && npx tsc --noEmit && npm run build && npm audit` passes
- [ ] Initial commit on main — Vercel production deployment succeeds

**Approved by Naa:** [ ]
**Merged to main:** [ ]
**Merged date:** [to be filled]

---

## Sprint History

> No completed sprints yet. Entries added here as sprints are merged to main.

---

## Upcoming Sprints

### ⏳ Sprint 1 — Three.js Hero and Navigation
**Planned start:** 29/05/2026

> Sprint 1 is complete only when the hero experience is exceptional — all components below
> must work together perfectly before any Sprint 2 work begins. Do not rush past Sprint 1.

Planned tasks:
- [ ] Three.js dark navy hero scene (dynamically imported — `ssr: false`, never blocks LCP)
- [ ] Lenis smooth scroll integration and LenisProvider confirmed working
- [ ] Animated Celtic SVG nav trigger component (`CelticNavTrigger.tsx`)
- [ ] Full-screen menu overlay with Framer Motion parallax reveal (`MenuOverlay.tsx`)
- [ ] Hero section complete — Three.js scene, brand statement, and Celtic SVG trigger assembled

### ⏳ Sprint 2 — Content, Lookbook, Sections, Contact
**Planned start:** 12/06/2026 (approximately — after Sprint 1 review and Naa approval)

Planned tasks:
- [ ] Sanity schemas — Look, Service, About, SiteSettings — defined and deployed
- [ ] Sanity Studio configuration and `npx sanity deploy`
- [ ] Lookbook grid with Sanity integration and category filter (suit / accessory / bespoke)
- [ ] Lightbox modal component — images and video loops
- [ ] About section — Daniel's story, craft, philosophy
- [ ] Services section — bespoke, ready-to-wear, accessories
- [ ] Contact section — enquiry form + Next.js API route email forwarding to `DANIEL_CONTACT_EMAIL`
- [ ] Contact form: Zod validation, rate limiting (3/IP/hour), honeypot field, timestamp check

### ⏳ Sprint 3 — Polish, SEO, Launch
**Planned start:** 19/06/2026 (approximately — after Sprint 2 review and Naa approval)

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

> Sprint 0 is infrastructure and setup only. No component files exist yet.
> Once the base layout is committed in Sprint 0 it must not be modified until Sprint 1 begins.

- `app/layout.tsx` — once committed in Sprint 0, do not modify until Sprint 1 begins

---

## Sprint Notes

- Primary traffic source is Instagram — mobile-first is critical across every component
- Three.js hero scene must be dynamically imported with `ssr: false` — this is a hard constraint for LCP
- Navigation is Celtic SVG trigger + full-screen overlay — there is no traditional Navbar component
- Daniel manages lookbook content independently via Sanity Studio — schemas must be simple and well-labelled
- Domain purchase (ostendere.com) is a Sprint 3 task — ostendere.vercel.app is used for development, staging, and preview throughout Sprints 0–2
- Phase 1 has no Supabase, Paystack, Resend, or auth — reject any code suggestion that introduces these
- `DANIEL_CONTACT_EMAIL` is always server-side only — never `NEXT_PUBLIC_` prefix under any circumstances

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
