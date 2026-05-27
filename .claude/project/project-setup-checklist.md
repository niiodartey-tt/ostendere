# Project Setup Checklist

> Complete this checklist at the start of every new ApexSource project.
> Work through it in order — each step builds on the previous one.
> Do not start building until Steps 1–5 are complete.

---

## Step 1 — Discovery & Design (Claude Chat)

Use Claude chat to think through the project before writing a single line of code.

- [ ] **Project brief discussion**
  - What is the site for?
  - Who is the audience?
  - What problem does it solve?
  - What does success look like for the client?

- [ ] **Tech stack decision**
  - Does this project need a CMS? → Sanity
  - Does this project need a database? → Supabase
  - Does this project need auth? → Supabase Auth
  - Does this project need payments? → Paystack
  - Any other integrations?

- [ ] **Site map agreed**
  - List every page the site needs
  - Define what content lives on each page
  - Identify which pages need dynamic data vs static content

- [ ] **Design direction agreed**
  - Colour palette defined
  - Typography agreed (font choices)
  - Key UI patterns identified (ticker, counters, animations)
  - Reference sites or mood board shared with client

**Deliverable:** A clear picture of what is being built before any code starts.

---

## Step 2 — Architecture Document

Create a formal architecture document before touching the codebase.
File: `docs/architecture.md` (create this in the project root)

- [ ] **Project overview** — one paragraph describing the site
- [ ] **Tech stack** — every technology with version and reason for choice
- [ ] **Page inventory** — every page, its route, and its data sources
- [ ] **Component inventory** — major components needed across the site
- [ ] **Data architecture**
  - Supabase tables and columns (if applicable)
  - Sanity schemas and fields (if applicable)
  - API routes needed
- [ ] **Third-party integrations** — every external service
- [ ] **Environment variables** — every variable needed and what it does
- [ ] **Infrastructure** — Vercel project, custom domain, DNS setup

**Deliverable:** `docs/architecture.md` — the blueprint for the build.

---

## Step 3 — Backlog & Sprint Planning

Break the architecture into deliverable sprints.
File: `docs/backlog.md` (create this in the project root)

- [ ] **Sprint 0 — Project setup** (always the first sprint)
  - Repository setup
  - Next.js scaffolding
  - Standard stack installation
  - Vercel project and environment variables
  - CLAUDE.md and .claude/ folder
  - Supabase project and tables
  - Sanity project and schemas
  - Base layout with Lenis
  - Navbar and Footer

- [ ] **Sprint 1 — Core pages**
  - What are the most critical pages?
  - What does the client need to see first?

- [ ] **Sprint 2 — Secondary pages and features**
  - Remaining pages
  - Dynamic features
  - CMS integration

- [ ] **Sprint 3+ — Polish and launch**
  - Forms and submissions
  - Animations and interactions
  - SEO and metadata
  - Performance optimisation
  - Pre-launch checklist

**Rules for sprint planning:**
- Each sprint should be completable in 1–2 weeks
- Each task should be completable in one Claude Code session
- No task should touch more than 5–6 files
- Assign tasks to specific sprint branches

**Deliverable:** `docs/backlog.md` — every sprint and every task defined.

---

## Step 4 — Fill in CLAUDE.md Project Section

With architecture and backlog complete, fill in the project-specific
files in `.claude/project/`:

- [ ] **`overview.md`** — fill in all TODO markers
  - Project name, client, domain, purpose, audience
  - Complete tech stack table with versions
  - Supabase tables and RLS status
  - Sanity schemas
  - Third-party integrations
  - Project-specific rules

- [ ] **`structure.md`** — update with actual folder structure
  - App directory routes
  - Components planned for this project
  - Sanity directory (or remove if not using)

- [ ] **`env.md`** — list all environment variables
  - One row per variable
  - Scope (client or server)
  - Description of what it does

- [ ] **`sprint.md`** — set up Sprint 0
  - Current sprint details
  - Sprint 0 tasks listed
  - Definition of done checklist

- [ ] **`do-not-touch.md`** — add project-specific entries
  - Any files that should not be touched

- [ ] **`known-issues.md`** — leave empty for now
  - Will be populated as bugs are found

- [ ] **`CLAUDE.md`** — update Quick Reference section
  - Project name, client, domain
  - Stack summary
  - Current sprint

**Deliverable:** All `.claude/project/` files filled in — Claude is fully briefed.

---

## Step 5 — Infrastructure Setup

Set up the technical infrastructure before Sprint 0 build begins.

### GitHub
- [ ] Create repository on GitHub
- [ ] Set default branch to `main`
- [ ] Add `.gitignore` (Next.js template)
- [ ] Make initial commit with scaffolded project

### Vercel
- [ ] Create Vercel project
- [ ] Link to GitHub repository
- [ ] Configure auto-deploy on `main` branch
- [ ] Set custom domain (if available)
- [ ] Add all environment variables to Vercel dashboard
  - Development environment
  - Preview environment
  - Production environment
- [ ] Confirm first deployment succeeds

### Supabase (if applicable)
- [ ] Create Supabase project
- [ ] Create all tables defined in architecture doc
- [ ] Enable RLS on every table
- [ ] Write RLS policies for each table
- [ ] Generate TypeScript types: `npx supabase gen types typescript`
- [ ] Test connection from local dev environment

### Sanity (if applicable)
- [ ] Create Sanity project at sanity.io
- [ ] Run `npx sanity@latest init --env` in project root
- [ ] Define all schemas from architecture doc
- [ ] Deploy Sanity Studio: `npx sanity deploy`
- [ ] Add client as team member in Sanity dashboard
- [ ] Test content creation in Studio

### DNS (if domain available)
- [ ] Point domain to Vercel nameservers or add CNAME
- [ ] Confirm SSL certificate issued
- [ ] Confirm `www` redirect configured

**Deliverable:** Infrastructure live, all services connected, first deployment verified.

---

## Step 6 — Sprint 0 Build

With all setup complete, begin the actual build with Sprint 0.

- [ ] Create `sprint-0` branch from `main`
- [ ] Install ApexSource standard stack
  ```bash
  npm install --save-exact framer-motion lenis tailwindcss-animate
  npm install --save-exact @supabase/supabase-js @supabase/ssr
  npm install --save-exact next-sanity @sanity/image-url
  npm install --save-exact react-hook-form zod @hookform/resolvers
  npm install --save-exact clsx tailwind-merge lucide-react date-fns
  ```
- [ ] Configure `tailwind.config.js` with project colour tokens
- [ ] Configure `next.config.js` with security headers and image domains
- [ ] Set up `LenisProvider` in root layout
- [ ] Set up fonts via `next/font`
- [ ] Create `lib/utils.ts` with `cn()` utility
- [ ] Create `lib/supabase-client.ts`
- [ ] Create `sanity/lib/client.ts` and `sanity/lib/queries.ts`
- [ ] Create `sanity/lib/image.ts` with `urlFor()` helper
- [ ] Create `types/supabase.ts` from generated types
- [ ] Create `types/sanity.ts` with content interfaces
- [ ] Create `types/env.d.ts` with environment variable types
- [ ] Create `components/layout/Navbar.tsx`
- [ ] Create `components/layout/Footer.tsx`
- [ ] Create `app/layout.tsx` with all providers
- [ ] Create `app/not-found.tsx`
- [ ] Create `app/error.tsx`
- [ ] Add skip navigation link to layout
- [ ] Run pre-merge sequence and confirm all pass
  ```bash
  npm run lint && npx tsc --noEmit && npm run build && npm audit
  ```
- [ ] Merge `sprint-0` to `main`
- [ ] Confirm Vercel production deployment succeeds
- [ ] Update `sprint.md` — Sprint 0 complete

**Deliverable:** Clean, configured, deployed foundation ready for Sprint 1.

---

## Step 7 — Client Onboarding

Before Sprint 1 build begins:

- [ ] Share Vercel preview URL with client for reference
- [ ] Invite client to Sanity Studio (if applicable)
- [ ] Walk client through Sanity Studio basics
- [ ] Agree on content delivery timeline
  - When will client provide real copy?
  - When will client provide real photography?
  - When will client provide real logos?
- [ ] Agree on review cadence — how often client reviews progress
- [ ] Agree on approval process — how client signs off each sprint

**Deliverable:** Client is onboarded, content plan agreed, review process defined.

---

## Documents Created by End of Setup

At the end of this checklist you should have:

| Document | Location | Purpose |
|---|---|---|
| Architecture doc | `docs/architecture.md` | Blueprint for the build |
| Backlog | `docs/backlog.md` | Every sprint and task defined |
| CLAUDE.md | `/CLAUDE.md` | AI session briefing |
| Project overview | `.claude/project/overview.md` | Stack and project details |
| File structure | `.claude/project/structure.md` | Where everything lives |
| Environment vars | `.claude/project/env.md` | All variable documentation |
| Sprint status | `.claude/project/sprint.md` | Current sprint tracking |
| Do not touch | `.claude/project/do-not-touch.md` | Off-limits files |
| Known issues | `.claude/project/known-issues.md` | Bug log (empty at start) |
| .env.example | `/.env.example` | Variable names for team |
| .nvmrc | `/.nvmrc` | Node.js version |

---

## Ongoing — Every Sprint

Repeat these steps for every sprint after Sprint 0:

- [ ] Create sprint branch from `main`
- [ ] Add sprint to GitHub branch description with checklist
- [ ] Update `sprint.md` with new sprint details
- [ ] Build tasks on individual task branches
- [ ] Merge task branches into sprint branch
- [ ] Work through Definition of Done checklist
- [ ] Review on Vercel preview URL
- [ ] Get Naa's approval
- [ ] Run pre-merge sequence
- [ ] Merge sprint branch to `main`
- [ ] Update `sprint.md` — mark sprint complete
- [ ] Update `CLAUDE.md` Quick Reference with new sprint number
- [ ] Update `do-not-touch.md` with newly completed components