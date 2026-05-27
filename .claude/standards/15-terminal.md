# 15 — Terminal Commands Standard

## Environment

```
OS:              Linux (Ubuntu/Debian)
Package manager: npm
Node.js:         managed via nvm — always LTS version
Shell:           bash
```

---

## Command Presentation Format

All commands delivered in one code block first.
Explanation follows after the block.
Never scattered through prose.
Always specify what each command does and why.

---

## npm Rules

```bash
# CORRECT — standard install
npm install framer-motion

# CORRECT — dev dependency
npm install --save-dev @types/node

# CORRECT — exact version pinned
npm install --save-exact framer-motion@11.3.0

# CORRECT — multiple packages
npm install framer-motion lenis tailwindcss-animate

# WRONG — never use sudo with npm
sudo npm install framer-motion  # corrupts file permissions

# WRONG — --save is default since npm5, redundant
npm install --save framer-motion
```

---

## Project Setup — New Next.js Project

Run in this exact order:

```bash
npx create-next-app@latest project-name \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd project-name
npm install
```

Explanation:
- `create-next-app` scaffolds with TypeScript, Tailwind, ESLint, App Router, and `@/` import alias
- `cd` into the folder before any further commands
- `npm install` ensures all dependencies are installed fresh

---

## ApexSource Standard Stack — Install Order

```bash
# 1. Animation stack
npm install --save-exact framer-motion lenis tailwindcss-animate

# 2. Supabase
npm install --save-exact @supabase/supabase-js @supabase/ssr

# 3. Sanity (if using CMS)
npm install --save-exact next-sanity @sanity/image-url
npx sanity@latest init --env

# 4. Forms and validation
npm install --save-exact react-hook-form zod @hookform/resolvers

# 5. Utilities
npm install --save-exact clsx tailwind-merge lucide-react date-fns

# 6. Dev dependencies
npm install --save-dev --save-exact @types/node
```

Verify after each group:
```bash
npm run build  # catch errors early
npm audit      # check for vulnerabilities
```

---

## Verification Commands

Run these to confirm things are working:

```bash
npm run dev          # start local server on localhost:3000
npm run build        # production build — catches errors dev mode misses
npm run lint         # ESLint across the project
npx tsc --noEmit     # TypeScript check without generating files
npm audit            # check for security vulnerabilities
npm outdated         # list packages with newer versions available
```

---

## Pre-Sprint-Merge Sequence

Run in this exact order before every merge to main:

```bash
npm run lint && npx tsc --noEmit && npm run build && npm audit
```

All four must pass. Fix all failures before merging.
The `&&` means each command only runs if the previous one succeeds.
If lint fails — TypeScript check does not run.
If TypeScript fails — build does not run.
One command. Four checks. Stops at first failure.

---

## Git Commands — Sprint Workflow

### Starting a new sprint
```bash
git checkout main
git pull origin main
git checkout -b sprint-2
git push -u origin sprint-2
```

### Starting a new task
```bash
git checkout sprint-2
git pull origin sprint-2
git checkout -b task/hero-section
```

### Committing work
```bash
git add .
git status                                          # always verify before committing
git commit -m "feat: build hero section with scroll animation"
git push origin task/hero-section
```

### Checking what changed
```bash
git diff                    # line-by-line changes not yet staged
git status                  # modified, staged, and untracked files
git log --oneline -10       # last 10 commits
```

### Merging task into sprint
```bash
git checkout sprint-2
git pull origin sprint-2
git merge task/hero-section
git push origin sprint-2
```

### Merging sprint to main (after Naa confirms)
```bash
git checkout main
git pull origin main
git merge sprint-2
git push origin main
```

### Hotfix
```bash
git checkout main
git pull origin main
git checkout -b hotfix/counter-animation-fix
# make the fix
git add .
git commit -m "fix: resolve counter animation stuck at zero"
git push origin hotfix/counter-animation-fix
git checkout main
git merge hotfix/counter-animation-fix
git push origin main
git checkout sprint-3
git merge main
git push origin sprint-3
```

---

## Vercel CLI Commands

```bash
# Install Vercel CLI globally — once per machine
npm install --global vercel

# Link local project to Vercel — once per project
vercel link

# Deploy to preview URL manually
vercel

# Pull environment variables from Vercel to local
vercel env pull .env.local

# Check deployment logs
vercel logs

# Deploy to production manually (prefer pushing to main instead)
vercel --prod
```

`vercel env pull` is particularly useful — downloads production environment
variables into `.env.local` so local dev matches production exactly.
Run this whenever you add a new variable in the Vercel dashboard.

---

## Node.js Version Management (nvm)

```bash
# Install nvm — once per machine
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest LTS Node.js
nvm install --lts
nvm use --lts

# Set as default
nvm alias default node

# Check installed versions
nvm list

# Check which Node.js is active
which node   # should return /home/[user]/.nvm/versions/node/...
node --version
npm --version

# Use version specified in .nvmrc
nvm use      # reads .nvmrc automatically
```

---

## Troubleshooting Commands

### Dependency errors — nuclear option
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

Fixes the majority of mysterious dependency errors.
Nuclear but reliable. Use when normal install is failing.

### Clear Next.js build cache
```bash
rm -rf .next
npm run build
```

Use when builds produce stale or unexpected output.

### Port already in use
```bash
lsof -i :3000           # find what is using port 3000
kill -9 $(lsof -t -i:3000)   # kill the process
```

Use when `npm run dev` says port 3000 is already in use.

### Verify correct Node.js is active
```bash
which node
# Should return: /home/[username]/.nvm/versions/node/v20.x.x/bin/node
# NOT: /usr/bin/node — that is the system Node (outdated)
```

If `which node` returns `/usr/bin/node` run `nvm use --lts` to fix.

### Check disk space (if builds fail mysteriously)
```bash
df -h
```

Low disk space causes cryptic build failures.
Vercel deployments need space in `/tmp`.

---

## Sanity CLI Commands

```bash
# Initialise Sanity in a project
npx sanity@latest init --env

# Start Sanity Studio locally
npx sanity dev   # runs on http://localhost:3333

# Deploy Sanity Studio to production
npx sanity deploy

# Generate TypeScript types from schema
npx sanity schema extract
npx sanity typegen generate
```

---

## Supabase CLI Commands

```bash
# Install Supabase CLI globally
npm install --global supabase

# Generate TypeScript types from your schema
npx supabase gen types typescript \
  --project-id YOUR_PROJECT_ID \
  > types/supabase.ts

# Run database migrations locally
npx supabase db push
```

---

## Never Do

```bash
# Never sudo npm install
sudo npm install framer-motion  # corrupts permissions

# Never commit node_modules
git add node_modules  # add node_modules to .gitignore

# Never commit .env.local
git add .env.local  # add .env.local to .gitignore

# Never push directly to main
git push origin main  # work on branches, merge via review

# Never rm -rf without knowing exactly what it deletes
rm -rf /  # extreme example — always verify path before rm -rf
```