# 10 — Git & Delivery Standard

## Branch Structure

```
main              → production, always deployable, auto-deploys to Vercel
sprint-N          → one branch per sprint (sprint-1, sprint-2, sprint-3)
task/description  → one branch per task, branched from sprint-N
hotfix/description → emergency fixes branched directly from main
```

---

## Branch Naming

```
Sprint branches:  sprint-1, sprint-2, sprint-3
Task branches:    task/hero-section, task/contact-form, task/navbar
Hotfix branches:  hotfix/counter-animation-fix, hotfix/missing-env-var

Never:            my-branch, test, fix, temp, wip, naa-branch
```

---

## The Sprint Workflow

### 1. Start a new sprint — branch from main

```bash
git checkout main
git pull origin main
git checkout -b sprint-2
git push -u origin sprint-2
```

### 2. Start a new task — branch from sprint

```bash
git checkout sprint-2
git pull origin sprint-2
git checkout -b task/hero-section
```

### 3. Work on task — commit regularly

```bash
git add .
git status          # always verify what you're committing
git commit -m "feat: build hero section with scroll animation"
git push origin task/hero-section
```

### 4. Task complete — merge into sprint branch

```bash
git checkout sprint-2
git pull origin sprint-2
git merge task/hero-section
git push origin sprint-2
```

### 5. All tasks done — review on Vercel preview URL

Review every page at the Vercel preview URL before merging.
Test on mobile and desktop. Check sprint checklist.

### 6. Naa confirms — merge sprint to main

```bash
git checkout main
git pull origin main
git merge sprint-2
git push origin main
# Vercel auto-deploys to production
```

### 7. Next sprint — branch from updated main

```bash
git checkout main
git pull origin main
git checkout -b sprint-3
git push -u origin sprint-3
```

---

## Hotfix Workflow

For bugs discovered in production that cannot wait for the next sprint:

```bash
# 1. Branch from main directly
git checkout main
git pull origin main
git checkout -b hotfix/counter-animation-fix

# 2. Make the fix — targeted change only
# No new features. No refactoring. Fix only.

# 3. Commit and push
git add .
git commit -m "fix: resolve counter animation stuck at zero on Hopefront"
git push origin hotfix/counter-animation-fix

# 4. Review on Vercel preview URL

# 5. Merge hotfix to main
git checkout main
git merge hotfix/counter-animation-fix
git push origin main

# 6. Bring fix into current sprint so it is not lost
git checkout sprint-3
git merge main
git push origin sprint-3
```

---

## Commit Message Standard

```
Format: type: short description (max 72 characters)
```

### Types

```
feat:     new feature or component
fix:      bug fix
style:    visual/styling change, no logic change
refactor: restructuring code without changing behaviour
perf:     performance improvement
a11y:     accessibility improvement
content:  copy or content update
chore:    config, dependencies, tooling
```

### Good examples

```
feat: add animated counter to Hopefront impact section
feat: build HeroSection with Framer Motion entrance animation
fix: resolve counter animation stuck at zero on scroll
fix: resolve lenis anchor link broken on services page
style: update hero section mobile padding and font sizes
a11y: add aria-labels to icon buttons in Navbar
perf: convert hero image to WebP with priority prop
content: update IHR Ghana services page copy
chore: install framer-motion lenis tailwindcss-animate
chore: add remotePatterns for cdn.sanity.io to next.config.js
refactor: extract AnimatedCounter to reusable component
```

### Never acceptable

```
fix
changes
update
asdfgh
wip
stuff
test
```

---

## Commit Frequency

- Commit after every meaningful unit of work
- Component built → commit
- Bug fixed → commit
- Copy updated → commit
- Config changed → commit
- Never go more than 2 hours without committing if actively building
- Never commit broken code that does not build

---

## Sprint Branch Checklist

Add this to the GitHub branch description when creating a sprint branch.
Tick off tasks as they complete.

```markdown
## Sprint N — [Project Name]
**Started:** DD/MM/YYYY
**Target completion:** DD/MM/YYYY

### Tasks
- [ ] task/component-name
- [ ] task/component-name
- [ ] task/component-name

### Definition of Done
- [ ] All tasks merged into sprint branch
- [ ] pagespeed.web.dev — all scores green on Vercel preview URL
- [ ] Tested on 375px (iPhone SE)
- [ ] Tested on 390px (iPhone 14)
- [ ] Tested on 768px (iPad)
- [ ] Tested on 1280px (Desktop)
- [ ] All links working — no href="#" remaining
- [ ] No console errors in browser DevTools
- [ ] Counter animations completing correctly
- [ ] All images have meaningful alt text
- [ ] Animations respect prefers-reduced-motion
- [ ] Lenis smooth scroll working correctly
- [ ] All forms have associated labels
- [ ] Skip navigation link present in layout
- [ ] Metadata on every page
- [ ] npm audit — zero critical/high vulnerabilities
- [ ] npm run lint passes
- [ ] npx tsc --noEmit passes
- [ ] npm run build passes
- [ ] Naa reviewed on Vercel preview URL
- [ ] Naa confirmed approval

**Approved by Naa:** [ ]
**Merged to main:** [ ]
```

---

## Pre-Merge Command Sequence

Run in this exact order before every merge to main:

```bash
npm run lint && npx tsc --noEmit && npm run build && npm audit
```

All four must pass. Fix all failures before merging.
The `&&` means each command only runs if the previous succeeded.

---

## Vercel Preview URLs

Every branch pushed to GitHub gets a Vercel preview URL automatically.
Use these to review work before merging.

```
main branch         → production URL (your domain)
sprint-2 branch     → preview URL (auto-generated by Vercel)
task/hero-section   → preview URL (auto-generated by Vercel)
```

Always review sprint work on the sprint preview URL — not localhost.
Real environment, real env vars, real behaviour.

---

## What Claude Must Never Do

- Never commit directly to `main`
- Never commit directly to a sprint branch
- Always work on task branches
- Never use generic commit messages
- Never push broken code that fails the build
- Never merge to `main` without Naa's explicit confirmation
- Never rebase shared branches — merge only

---

## Claude Code Auto-Commit Rule

After every group in a sprint Claude must automatically:

1. Run the TypeScript check
   npx tsc --noEmit

2. If clean — stage and commit
   git add .
   git commit -m "feat: Sprint N Group N — brief description"
   git push origin sprint-N

3. Update .claude/project/progress.md with the group entry

4. Then report completion and await confirmation for next group

Claude never asks permission to commit after a verified group.
Committing is part of completing a group — not a separate step.
If TypeScript check fails — fix errors first, then commit.
Never commit broken code.