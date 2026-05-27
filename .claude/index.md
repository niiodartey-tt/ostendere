# ApexSource Claude System — Master Index

> This file is your map. It lists every file in the .claude/ system,
> what it contains, when to read it, and when to update it.
> Keep this file in sync if you ever add new standards files.

---

## How the System Works

```
CLAUDE.md                    ← Claude reads this every session
    ↓ references
.claude/standards/           ← Claude reads these when the task requires it
.claude/project/             ← You fill these in per project at kickoff
```

**You copy this entire folder into every new project root.**
Then fill in the `.claude/project/` files using your architecture doc and backlog.
The `.claude/standards/` files never change — they are the ApexSource standard.

---

## Root File

| File | Purpose | Updated when |
|---|---|---|
| `CLAUDE.md` | Main briefing file — read every session. Contains critical rules, project quick reference, and reference map. | Sprint changes, project details change |

---

## Standards Files — `.claude/standards/`

These files are permanent. They apply to every project.
They almost never change unless the ApexSource standard evolves.

| File | Contains | Claude reads it when... |
|---|---|---|
| `01-presentation.md` | How Claude plans, presents code, and structures responses to Naa | Any component or UI task |
| `02-responsive.md` | Mobile-first rules, Tailwind breakpoints, touch targets, test sizes | Layout, spacing, or breakpoint work |
| `03-styling.md` | Tailwind-only rule, cn() utility, class ordering, config tokens | Any styling decision |
| `04-animation.md` | Framer Motion, Lenis, Tailwind Animate — responsibilities, code patterns, reduced motion | Any animation |
| `05-breaking-points.md` | Common failure patterns and defensive rules for Next.js, Framer Motion, Lenis, Supabase, Sanity, React | Bug or unexpected behaviour |
| `06-components.md` | Folder structure, naming, exports, props, server vs client, size limit, custom hooks | Creating or refactoring components |
| `07-data-fetching.md` | SSG, SSR, client fetching, API routes, Sanity patterns, Supabase patterns, state handling | Supabase, Sanity, or API route work |
| `08-accessibility.md` | WCAG 2.1 AA — semantic HTML, headings, alt text, contrast, keyboard nav, ARIA, forms, reduced motion | Any interactive element or form |
| `09-performance.md` | Core Web Vitals, images, fonts, dynamic imports, CLS, scripts, streaming, metadata, Link | Images, fonts, scripts, or speed |
| `10-git.md` | Branch structure, sprint workflow, hotfix workflow, commit messages, sprint checklist, pre-merge sequence | Git commits, merges, or sprint transitions |
| `11-typescript.md` | Strict mode, type vs interface, no any, async return types, Supabase types, Sanity types, env types | TypeScript types or interfaces |
| `12-security.md` | Env var rules, input validation, error handling, rate limiting, auth, CSP headers, RLS, sensitive data | API routes, auth, or env vars |
| `13-dependencies.md` | Approved library list, version pinning, red flags, Node.js via nvm, npm audit, deprecated API handling | Installing any package |
| `14-debugging.md` | 8-stage debugging process, Claude behaviour on bug reports, common bug quick reference | Any bug or unexpected behaviour |
| `15-terminal.md` | All terminal commands for Ubuntu/npm — project setup, git workflow, troubleshooting, Vercel CLI | Any terminal command needed |
| `16-ghana.md` | Date format, currency, phone numbers, timezone, address format, dual audience, cultural context | Dates, currency, phone, or content for Ghanaian sites |
| `17-handoff.md` | Pre-handoff checklist, client CMS training, Vercel documentation, post-handoff check-in | Client delivery |

---

## Project Files — `.claude/project/`

These files are filled in per project at kickoff.
They change regularly throughout the project lifecycle.

| File | Contains | Updated when |
|---|---|---|
| `overview.md` | Project name, client, domain, full tech stack, Supabase tables, Sanity schemas, integrations, project-specific rules | Project kickoff, new integrations added |
| `structure.md` | Complete file and folder structure — every directory and key file | New components added, structure changes |
| `env.md` | All environment variable names, scope, and descriptions | New variable added to the project |
| `sprint.md` | Current sprint status, active tasks, sprint history, upcoming sprints, do-not-touch during sprint | Start and end of every sprint |
| `do-not-touch.md` | Stable and off-limits files, in-progress areas, completed components | Component completed and approved, new stable file |
| `known-issues.md` | Bug log — every resolved bug with cause, fix, and prevention rule | Bug discovered and resolved |
| `project-setup-checklist.md` | Step-by-step setup process for a new project — discovery through Sprint 0 | Reference only — not edited during project |
| `progress.md` | Build diary — Claude updates after every group automatically. Files created, key decisions, errors caught, build status. | After every group in every sprint |

---

## Quick Reference — What to Fill in at Kickoff

When starting a new project, complete these in order:

```
1. overview.md       → stack, schemas, tables, rules
2. structure.md      → actual folder structure
3. env.md            → all variable names
4. sprint.md         → Sprint 0 setup
5. do-not-touch.md   → initial entries
6. CLAUDE.md         → Quick Reference section
```

`known-issues.md` and `project-setup-checklist.md` need no editing at kickoff.

---

## Quick Reference — What to Update Each Sprint

```
sprint.md            → new sprint details, task status, completion
do-not-touch.md      → newly completed components
CLAUDE.md            → current sprint number and active task
known-issues.md      → add any bugs resolved during the sprint
```

---

## Adding a New Standards File

If a new recurring standard is identified:

1. Create the file in `.claude/standards/` with the next number
   e.g. `18-newstandard.md`
2. Add a row to the Standards Files table in this index
3. Add a row to the Reference Map table in `CLAUDE.md`
4. Document the standard fully — follow the format of existing files

---

## The Copy Command — Starting a New Project

When a new project starts, copy this entire system into the project root:

```bash
cp -r ~/Projects/Claude/. ~/Projects/[project-name]/
```

Then immediately:

```bash
cd ~/Projects/[project-name]
git init
git add .
git commit -m "chore: add ApexSource Claude standard"
```

Fill in `.claude/project/` files, update `CLAUDE.md` Quick Reference,
then begin infrastructure setup per the project-setup-checklist.md.

---

## File Count

```
Total files in system:    26
Standards files:          17  (.claude/standards/)
Project template files:    7  (.claude/project/)
Root files:                2  (CLAUDE.md, this index)
```

---

*ApexSource Ventures · Accra, Ghana · Version 1.0 · May 2026*