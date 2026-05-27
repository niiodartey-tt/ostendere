# Do Not Touch

> This file lists files and areas that are stable, sensitive, or off-limits.
> Claude must not modify anything listed here without explicit instruction from Naa.
> Update this file as the project evolves — add entries when something is finalised.

---

## Core Rule

If a file or folder is listed here:
- Do not modify it during unrelated tasks
- Do not refactor it to "clean it up"
- Do not rename it or move it
- Do not change its exports or API
- Flag it in the plan if a task genuinely requires touching it
- Wait for Naa's explicit confirmation before proceeding

---

## Always Off-Limits (Every Project)

These are off-limits on every ApexSource project without exception:

| File | Reason |
|---|---|
| `.env.local` | Never read, log, or expose env var values |
| `package-lock.json` | Never manually edit — managed by npm |
| `.gitignore` | Only modify if adding a new pattern |
| `next.config.js` | Only modify if you understand current settings |
| `tsconfig.json` | Only modify with explicit instruction |
| `tailwind.config.js` | Only add tokens — never remove existing ones |

---

## Project-Specific — Do Not Touch

### Logo and Brand Assets

| File | Status | Reason |
|---|---|---|
| `/public/images/logo.png` | Always off-limits | Client-provided asset — Celtic compass mark and serif wordmark. Never recreate, resize, or modify under any circumstances. |

### Configuration Files

> These become stable after Sprint 0. Do not modify without explicit instruction once confirmed.

| File | Status | Reason |
|---|---|---|
| `/next.config.js` | Stable after Sprint 0 | Three.js compatibility, security headers, cdn.sanity.io remotePatterns, and scrollRestoration: false are all configured here |
| `/tailwind.config.js` | Stable after Sprint 0 | Ostendere colour tokens (dark navy background, silver/platinum accent) — never remove existing tokens |
| `/sanity/lib/client.ts` | Stable after Sprint 0 | Sanity client and sanityFetch() with ISR configuration — do not reconfigure |

### Security Configuration — Do Not Modify Without Security Review

> Once configured in Sprint 0, the following must not be changed without an explicit security review.
> Incorrect modifications can silently open vulnerabilities or break Sanity CDN access.

| Configuration | Location | Risk if changed |
|---|---|---|
| Content Security Policy | `/next.config.js` — `cspHeader` array | Modifying CSP can break Three.js rendering, Sanity image loading, or open XSS vectors |
| Security headers (X-Frame-Options, HSTS, etc.) | `/next.config.js` — `securityHeaders` array | Removing or weakening headers removes clickjacking and MITM protection |
| Sanity CORS origins | Sanity dashboard → API → CORS Origins | Adding a `*` wildcard origin exposes the Sanity API to any domain — critical misconfiguration |
| `DANIEL_CONTACT_EMAIL` scope | Vercel environment variables | Must remain server-side only — adding `NEXT_PUBLIC_` prefix exposes Daniel's personal email in the client bundle |

### Completed Components — Do Not Refactor

> Add entries here as each sprint is reviewed, approved by Naa, and merged to main.
> These are finished — do not touch unless a specific bug requires it.

| Component | Sprint completed | Notes |
|---|---|---|
| [None yet — to be added after Sprint 1 review and Naa approval] | — | — |

### Three.js Hero Scene — Lock After Sprint 1

> Once `HeroScene.tsx` and `SceneCanvas.tsx` are approved in Sprint 1, they go here.

| Component | Sprint completed | Notes |
|---|---|---|
| `/components/three/HeroScene.tsx` | Sprint 1 (pending) | Three.js dark navy scene — performance-tuned and approved. Do not modify camera, scene setup, or lighting without explicit instruction. |
| `/components/three/SceneCanvas.tsx` | Sprint 1 (pending) | Reusable canvas wrapper with resize handling — do not change canvas lifecycle |

### Sanity Schemas — Do Not Modify Without Confirmation

> Once a Sanity schema is deployed and content has been entered by Daniel,
> changing field names, removing fields, or changing field types will break existing content.
> Add entries here when each schema goes live with real content in Sprint 2.

| Schema | Status | Risk if changed |
|---|---|---|
| `/sanity/schemas/look.ts` | To be locked after Sprint 2 content entry | Breaks existing lookbook entries in Sanity Studio |
| `/sanity/schemas/service.ts` | To be locked after Sprint 2 content entry | Breaks service section content |
| `/sanity/schemas/about.ts` | To be locked after Sprint 2 content entry | Breaks About section content and Daniel's portrait |
| `/sanity/schemas/siteSettings.ts` | To be locked after Sprint 2 content entry | Breaks global tagline, contact email, and social links |

### Supabase Tables

> Not applicable in Phase 1 or Phase 2. Supabase is Phase 3 only.
> This section will be populated when Phase 3 (client consultation portal) begins.

---

## In-Progress — Do Not Interfere

> These are being actively worked on in Sprint 0.
> Only the assigned task branch should touch these files.

| File / Area | Active task | Sprint |
|---|---|---|
| `.claude/project/` files | `task/documentation` | Sprint 0 |
| `tailwind.config.js` | `task/tailwind-config` | Sprint 0 |
| `next.config.js` | `task/next-config` | Sprint 0 |

> Clear this section at the end of each sprint once tasks are merged.

---

## How to Handle a Conflict

If a task genuinely requires touching a do-not-touch file:

1. Flag it clearly in the plan phase
2. State exactly what change is needed and why
3. State what the risk is if it goes wrong
4. Wait for Naa's explicit confirmation
5. Make the minimum change necessary
6. Test thoroughly before merging
7. Update this file if the status of the file changes
