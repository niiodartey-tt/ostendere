# 01 — How Claude Presents Work to Naa

## Rule 1 — Always Plan Before Building

Before writing any code Claude must present a plan containing:

- What is being built — one clear sentence
- Files that will be created or modified — full paths
- Key decisions — why specific approaches are chosen
- Assumptions made — things not specified in the prompt
- Questions — anything unclear that needs confirmation

**Claude waits for explicit confirmation before writing any code.**
"Looks good", "proceed", "yes" = confirmed.
No confirmation = no code written.

---

## Rule 2 — Explanation Standard

Moderate explanation with every component:

- What the component does — one sentence
- Key decisions explained — why this pattern, why this library
- Any gotchas or things Naa should know
- What to do next — what connects to this component

Do not explain standard Tailwind classes or obvious React patterns.
Only explain non-obvious decisions.

---

## Rule 3 — Multiple File Presentation

Claude states the tier at the start of every multi-file task:

| File Count | Tier | Approach |
|---|---|---|
| 2–3 files | Simple | All files delivered in one response |
| 4–6 files | Medium | File structure first → confirm → one file at a time |
| 7+ files | Complex | Structure first → confirm → deliver by logical group |

**Logical groups for complex tasks:**
- Group 1 → Layout files (Navbar, Footer, Layout)
- Group 2 → Page sections (Hero, Services, Testimonials)
- Group 3 → UI primitives (Button, Card, Badge)
- Group 4 → Data layer (queries, API routes)

Confirm each group before moving to the next.

---

## Rule 4 — Plan Format

Every plan follows this exact structure:

```
---
PLAN: [Task name]

WHAT: [One sentence description]

FILES:
- /components/sections/HeroSection.tsx [CREATE]
- /components/ui/CTAButton.tsx [CREATE]
- /app/page.tsx [MODIFY]

KEY DECISIONS:
- Using Framer Motion for entrance animation because...
- Server component — no interactivity needed
- CTAButton marked "use client" because onClick handler required

ASSUMPTIONS:
- Hero content hardcoded for now — Sanity integration in later sprint
- Using existing colour tokens from tailwind.config.js

QUESTIONS:
- Should the CTA open a modal or navigate to /contact?

Tier: Simple (2 files created, 1 modified) — delivering together on confirmation.
---

Awaiting confirmation to proceed.
```

---

## Rule 5 — Code Format

- Each file clearly labelled with full path before the code block
- File path format: `// components/sections/HeroSection.tsx`
- TypeScript always — no `.js` files in `app/` or `components/`
- Tailwind classes ordered: layout → spacing → typography → colour → animation
- Comments only on non-obvious logic — never on every line

---

## Rule 6 — After Delivering Code

After every code delivery Claude provides:

```
DELIVERED:
- List of files created or modified with full paths

NEXT STEPS:
- What needs to be done next
- What this connects to in the next task
- Any manual steps Naa needs to take (installs, env vars, imports)

TEST:
- How to verify this works correctly
- What to look for on mobile and desktop
- Any console errors to watch for
```