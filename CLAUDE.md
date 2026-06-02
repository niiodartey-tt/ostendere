# CLAUDE.md — ApexSource Ventures

> **Read this file fully before touching any code.**
> State the project, current sprint, and active task before writing anything.
> If any rule here conflicts with a request — this file wins.

---

## Session Opening

Before every session state:
1. What project this is
2. Current sprint and active task
3. Any constraints relevant to today's work

---

## Critical Rules — Always Apply Without Reading Reference Files

These apply to every task, every session, every project. No exceptions.

- Mobile-first always — Tailwind breakpoints on every component
- Tailwind CSS only — no inline styles except dynamic runtime values
- Named exports only — except Next.js `page.tsx` and `layout.tsx`
- `"use client"` on any component using hooks, events, or Framer Motion
- Never fetch data in client components for initial page render
- Every image uses `next/image` with meaningful `alt` text
- Every Supabase query destructures `{ data, error }`
- `SUPABASE_SERVICE_ROLE_KEY` never in client components — ever
- Always handle loading, error, and empty states on every fetch
- `viewport={{ once: true }}` on all `whileInView` animations
- Counters use `useInView` — never animate on mount
- `AnimatePresence` wraps every component with an `exit` prop
- One component per file — maximum 150 lines
- Every `.map()` has a unique `key` — never use array index
- Run `npm run lint && npx tsc --noEmit && npm run build && npm audit` before every sprint merge
- After every group update `.claude/project/progress.md` automatically
- After each group passes TypeScript check, commit and push to the current sprint branch automatically — do not wait to be asked

---

## Project Quick Reference

**Project:** Ostendere
**Client:** Daniel Cofie
**Domain:** ostendere.com (purchase — Sprint 0 task)
**Stack:** Next.js 16 · TypeScript · Tailwind CSS · Framer Motion · Lenis · Sanity v5 · Vercel
**Current sprint:** Sprint 3 — Polish, SEO, Security, Launch Prep
**Active task:** Nonce-based CSP middleware (replace `unsafe-inline` in script-src)

→ Full details: `.claude/project/overview.md`
→ File structure: `.claude/project/structure.md`
→ Environment variables: `.claude/project/env.md`
→ Sprint status: `.claude/project/sprint.md`
→ Build progress log: `.claude/project/progress.md`
→ Do not touch: `.claude/project/do-not-touch.md`
→ Known issues: `.claude/project/known-issues.md`

---

## Reference Map — Read When the Task Requires It

| Task involves | Read this file |
|---|---|
| Any component or UI work | `.claude/standards/01-presentation.md` |
| Layout, spacing, breakpoints | `.claude/standards/02-responsive.md` |
| Tailwind, styling decisions | `.claude/standards/03-styling.md` |
| Any animation | `.claude/standards/04-animation.md` |
| Known error patterns, bugs | `.claude/standards/05-breaking-points.md` |
| Creating or refactoring components | `.claude/standards/06-components.md` |
| Supabase, Sanity, API routes | `.claude/standards/07-data-fetching.md` |
| Any interactive element | `.claude/standards/08-accessibility.md` |
| Images, fonts, scripts, speed | `.claude/standards/09-performance.md` |
| Git, commits, sprint merges | `.claude/standards/10-git.md` |
| TypeScript types, interfaces | `.claude/standards/11-typescript.md` |
| API routes, auth, env vars | `.claude/standards/12-security.md` |
| Installing any package | `.claude/standards/13-dependencies.md` |
| Debugging any bug | `.claude/standards/14-debugging.md` |
| Any terminal command | `.claude/standards/15-terminal.md` |
| Dates, currency, phone format | `.claude/standards/16-ghana.md` |
| Client delivery | `.claude/standards/17-handoff.md` |

---

*ApexSource Ventures · Accra, Ghana · Version 1.0 · May 2026*