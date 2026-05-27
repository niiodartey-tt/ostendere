# 13 — Dependency Management

## Core Principle

Claude's training data has a cutoff date. This means Claude may
recommend library versions that were current during training but are
now outdated, deprecated, or have known vulnerabilities.

Claude must never silently install a version it cannot confirm is
current and supported. Always verify at npmjs.com before installing.

---

## Before Installing Any Package

Claude must state in the plan:

- Package name and exact purpose
- Version being installed — verified at npmjs.com
- Last publish date — must be within 12 months
- Weekly downloads — signals active community
- Whether it is on the approved library list
- Compatibility with current Next.js and Node.js version
- Whether an approved library could do the job instead

If Claude is uncertain about the current version it must state:

```
"I am not certain this is the current version.
Please verify at npmjs.com/package/[name] before installing."
```

---

## Approved Libraries — Use Freely

| Category | Package | Notes |
|---|---|---|
| Animation | framer-motion | Verify latest stable |
| Animation | lenis | Verify latest stable |
| Animation | tailwindcss-animate | Verify latest stable |
| Icons | lucide-react | Only icon library allowed |
| Utilities | clsx | Class merging |
| Utilities | tailwind-merge | Tailwind class deduplication |
| Forms | react-hook-form | Form state management |
| Validation | zod | Schema validation |
| Form resolver | @hookform/resolvers | Connects zod to react-hook-form |
| Database | @supabase/supabase-js | Supabase client |
| Database | @supabase/ssr | Supabase SSR support |
| CMS | next-sanity | Next.js Sanity integration |
| CMS | @sanity/image-url | Sanity image URL builder |
| Dates | date-fns | Lightweight date formatting |
| Images | sharp | Image processing |

---

## Requires Approval Before Installing

Any library not on the approved list must be proposed in the plan phase
and confirmed before installation. Claude must state:

1. Package name and purpose
2. Bundle size impact
3. Whether an approved library could do the job instead
4. Last publish date and weekly downloads

---

## Never Install

| Package | Use Instead |
|---|---|
| moment.js | date-fns (much smaller) |
| lodash | Native JavaScript or specific lodash functions |
| axios | Native fetch |
| jquery | Never |
| styled-components | Tailwind CSS |
| emotion | Tailwind CSS |
| Multiple icon libraries | lucide-react only |
| react-query / tanstack-query | Requires approval — discuss first |
| next-auth | Requires approval — Supabase Auth preferred |

---

## Installation Commands

### Standard dependency
```bash
npm install framer-motion
```

### Development only tool
```bash
npm install --save-dev @types/node eslint prettier
```

### Exact version — pinned (preferred for core dependencies)
```bash
npm install --save-exact framer-motion@11.3.0
```

### Multiple packages at once
```bash
npm install framer-motion lenis tailwindcss-animate
```

### Never use sudo
```bash
# WRONG — corrupts file permissions on Ubuntu
sudo npm install framer-motion

# CORRECT
npm install framer-motion
```

---

## Version Pinning

Pin exact versions for core dependencies to prevent silent breaking changes.

```json
// package.json — exact versions, no ^ or ~
{
  "dependencies": {
    "framer-motion": "11.3.0",
    "lenis": "1.1.14",
    "next": "16.0.0",
    "react": "19.0.0"
  }
}
```

Install with exact version flag:
```bash
npm install --save-exact framer-motion@11.3.0
```

**Why this matters:** With `^`, running `npm install` on a different machine
or after a major release could install a breaking version silently.
Pinning means `npm install` produces identical results everywhere.

`package-lock.json` must always be committed to Git.

---

## Node.js Version Management

Always manage Node.js via nvm on Ubuntu. Never use apt to install Node.js
— apt gives outdated versions.

```bash
# Install nvm (once per machine)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest LTS
nvm install --lts
nvm use --lts

# Set as default
nvm alias default node
```

### .nvmrc — per project
```bash
# Create in project root
echo "20.11.0" > .nvmrc

# When opening the project
nvm use  # reads .nvmrc automatically
```

Commit `.nvmrc` to Git. Vercel automatically uses the Node.js version
specified in `.nvmrc`.

### package.json engines field
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## Red Flags — Never Install a Package That Has

- Last publish date over 12 months ago
- Open critical or high severity vulnerabilities (check npm audit)
- Fewer than 1,000 weekly downloads unless niche/specific
- No TypeScript types and no `@types/` package available
- Peer dependency conflicts with current React or Next.js
- Marked as deprecated on npmjs.com
- README that says "no longer maintained" or "use X instead"
- No GitHub repository or abandoned GitHub repository

---

## Dependency Audit — Per Sprint

Run before every sprint merge to main:

```bash
npm audit
```

### Required results before merge

```
found 0 vulnerabilities ✅ — merge is allowed

found 2 high severity vulnerabilities ❌ — fix before merging
```

### Fixing vulnerabilities

```bash
# Attempt automatic fix
npm audit fix

# If npm audit fix introduces breaking changes
npm audit fix --dry-run  # preview what would change

# If cannot fix automatically
# 1. Check if a newer version of the package resolves it
# 2. Evaluate actual risk of the vulnerability
# 3. Document in known-issues.md if accepting the risk
# 4. Never merge with critical or high vulnerabilities unresolved
```

---

## Outdated Packages — Per Sprint

```bash
npm outdated
```

Review the output before each sprint merge. Packages more than one
major version behind should be evaluated for upgrade.

Do not upgrade major versions mid-sprint. Create a dedicated
`chore: upgrade [package] to v[N]` task in the next sprint backlog.

---

## When a Deprecated API is Discovered Mid-Project

1. Stop and flag immediately — do not work around it
2. Identify the replacement API from the package documentation
3. Update all usages in one dedicated task
4. Commit as: `chore: migrate [package] from deprecated API`
5. Document in `known-issues.md`

---

## Legacy Code from Previous Sprints

If Claude encounters code from a previous sprint using a deprecated pattern:

- Flag it in the plan phase — never silently rewrite
- Propose a migration task for the backlog
- Never leave deprecated patterns alongside new patterns in the same file
- Never fix deprecated code during an unrelated task — separate task only

---

## Verify Installation Succeeded

After installing any package:

```bash
# Confirm it appears in package.json
cat package.json | grep "framer-motion"

# Confirm it installed correctly
npm run build

# Confirm no new vulnerabilities introduced
npm audit
```