# 17 — Project Handoff Standard

## Core Principle

A project is not complete when the last feature is built.
It is complete when the client can use it confidently,
the codebase is clean, and the next developer (or future Naa)
can pick it up without needing to ask questions.

---

## Pre-Handoff Checklist

Work through every item before marking a project as delivered.

### Code Quality
- [ ] `npm run lint` passes — zero errors
- [ ] `npx tsc --noEmit` passes — zero TypeScript errors
- [ ] `npm run build` passes — clean production build
- [ ] `npm audit` — zero critical or high vulnerabilities
- [ ] No `console.log` statements left in code
- [ ] No commented-out code blocks
- [ ] No TODO comments without a backlog ticket reference
- [ ] No placeholder content anywhere — lorem ipsum, picsum images, P1/P2 logos

### Content and Data
- [ ] All placeholder text replaced with real copy
- [ ] All placeholder images replaced with real photography
- [ ] All placeholder logos replaced with real client logos
- [ ] All partner/client logos on clientele pages are real
- [ ] All team member photos are real — no "Photo coming soon"
- [ ] All testimonials are real — no placeholder quotes
- [ ] All statistics are real and verified with client
- [ ] Counter animations completing to correct numbers
- [ ] All form submissions tested end to end — reaching the inbox

### Links and Navigation
- [ ] All internal links working — no 404s
- [ ] All external links working — no broken URLs
- [ ] No `href="#"` remaining — all anchor links functional
- [ ] Social media links pointing to real profiles
- [ ] Email links using correct email addresses
- [ ] Phone links using correct numbers in `tel:` format

### Performance
- [ ] pagespeed.web.dev — all scores green on production URL
- [ ] LCP under 2.5 seconds on mobile
- [ ] CLS under 0.1
- [ ] INP under 200ms
- [ ] All images use `next/image` with correct dimensions
- [ ] Hero images have `priority` prop
- [ ] Below-fold images do not have `priority` prop
- [ ] External image domains whitelisted in `next.config.js`

### Accessibility
- [ ] Skip navigation link present in every layout
- [ ] One `<h1>` per page — correct heading hierarchy
- [ ] All images have meaningful alt text
- [ ] All form inputs have associated labels
- [ ] All icon-only buttons have `aria-label`
- [ ] Keyboard navigation tested — all elements reachable
- [ ] Focus indicators visible on all interactive elements
- [ ] Colour contrast verified on all text

### Mobile and Cross-Browser
- [ ] Tested on real mobile device — not just DevTools
- [ ] Tested at 375px (iPhone SE)
- [ ] Tested at 390px (iPhone 14)
- [ ] Tested at 768px (iPad)
- [ ] Tested at 1280px (Desktop)
- [ ] No horizontal scrolling on any screen size
- [ ] Animations working correctly on mobile
- [ ] Touch targets minimum 44px on mobile

### SEO and Metadata
- [ ] Every page has a unique `title` tag
- [ ] Every page has a `description` meta tag
- [ ] Open Graph metadata on every page
- [ ] OG images created and specified (1200x630px)
- [ ] Twitter card metadata on every page
- [ ] `robots.txt` configured
- [ ] `sitemap.xml` generated

### Security
- [ ] `SUPABASE_SERVICE_ROLE_KEY` not in any client component
- [ ] All API routes validate input with Zod
- [ ] Rate limiting on all public API routes
- [ ] RLS enabled on all Supabase tables
- [ ] Security headers configured in `next.config.js`
- [ ] No hardcoded credentials in codebase
- [ ] `.env.local` not committed to Git

### Infrastructure
- [ ] Custom domain configured on Vercel
- [ ] SSL certificate active — HTTPS only
- [ ] Environment variables set in Vercel dashboard for production
- [ ] `.env.example` committed and up to date
- [ ] `www` redirect configured (www → non-www or vice versa)
- [ ] Vercel project settings reviewed — team access configured

### Documentation
- [ ] `CLAUDE.md` updated to reflect final delivered state
- [ ] Sprint status updated to all completed
- [ ] `.env.example` complete with all variable names
- [ ] `README.md` updated with setup instructions
- [ ] Known issues documented in `.claude/project/known-issues.md`

---

## Client Training — Sanity CMS

If the project uses Sanity CMS, train the client before handoff:

- [ ] Walk client through Sanity Studio — how to navigate
- [ ] Show client how to publish vs save as draft
- [ ] Demonstrate editing text fields, rich text, and images
- [ ] Show client how to add new items (blog posts, team members, etc.)
- [ ] Demonstrate what happens when they click Publish
- [ ] Explain that unpublished content (drafts) does not appear on the site
- [ ] Share Sanity Studio URL with client
- [ ] Add client as a Sanity team member with correct permissions
- [ ] Provide a short written guide if the client is non-technical

---

## Vercel Documentation for Client

Prepare this information for the client:

```markdown
## Your Website Infrastructure

**Hosting:** Vercel
**Auto-deploy:** Yes — any changes pushed to the `main` branch
  on GitHub will automatically deploy to your live site.

**Environment variables set:**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SANITY_PROJECT_ID
- [list all variable names — not values]

**To make content changes:**
Log in to Sanity Studio at: [studio URL]

**To request code changes:**
Contact ApexSource Ventures at hello@apexsourceventures.com
```

---

## Post-Handoff — 30-Day Check-In

30 days after handoff, check with the client:

- Is the site performing as expected?
- Are they able to update content in Sanity?
- Any broken links or errors discovered?
- Any feedback from their users or customers?
- Any new requirements for the next phase?

This check-in is part of the ApexSource client relationship standard —
not an optional extra.

---

## CLAUDE.md Final Update

Before handoff, update the project `CLAUDE.md` to reflect the final state:

```markdown
## Sprint Status

### ✅ Sprint 1 — Complete — [Date]
[List all delivered tasks]

### ✅ Sprint 2 — Complete — [Date]
[List all delivered tasks]

### ✅ Project Complete — Delivered [Date]
All sprints complete. Site live at [domain].
Client trained on Sanity CMS on [date].
```

This ensures that if the project is ever reopened for a new phase,
Claude Code has an accurate record of what was built and when.