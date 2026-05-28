# Known Issues

> This file is a living log of bugs discovered, diagnosed, and fixed.
> Every bug that took more than 30 minutes to resolve gets documented here.
> This turns every bug into a permanent improvement to the project standard.
> Claude reads this to avoid repeating the same mistakes.

---

## How to Add an Entry

When a bug is resolved, add an entry using this format:

```markdown
---
BUG:     One sentence describing what the bug was
CAUSE:   What caused it — be specific
FIX:     What resolved it — be specific
PREVENT: Rule or check added to stop it recurring
DATE:    DD/MM/YYYY
SPRINT:  Sprint N
---
```

---

## Active Issues

> Bugs currently being investigated or worked around.
> Move to Resolved once fixed.

| Issue | Discovered | Status | Notes |
|---|---|---|---|
| None currently | — | — | — |

---

## Resolved Issues

> Document every resolved bug here. Newest first.

---
BUG:     CSP script-src 'unsafe-inline' added for development/staging — must be
         replaced with nonce-based middleware CSP before Sprint 3 production launch
CAUSE:   Next.js 16 Turbopack injects inline scripts during hydration. These scripts
         were blocked by the strict "script-src 'self'" CSP, causing all JavaScript
         to fail silently on Vercel preview. Hash-based approach is not viable because
         Turbopack-generated inline script hashes change with every build.
FIX:     Added 'unsafe-inline' and https://vercel.live to script-src temporarily.
         Added wss://ws-us3.pusher.com and https://sockjs-us3.pusher.com to
         connect-src for Vercel Live feedback websocket. This unblocks development
         and staging. The site is not live on ostendere.com yet — risk is accepted
         for Sprints 1–2 only.
PREVENT: Sprint 3 task: implement nonce-based CSP middleware before production launch.
         Next.js CSP nonce guide:
         https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
         Never merge to main (production) with 'unsafe-inline' in script-src.
DATE:    28/05/2026
SPRINT:  Sprint 1
---

---
BUG:     Three.js hero scene invisible on Vercel preview despite clean local build
CAUSE:   next/dynamic({ ssr: false }) inside a 'use client' page component throws
         BailoutToCSR in React 19 concurrent rendering. The bailout propagates to
         the route segment boundary (not just the Suspense around the dynamic
         component). React 19 then "adopts" the server-rendered DOM rather than
         fresh-mounting it. Framer Motion has already injected opacity:0 inline
         styles during the SSR pass. Since there is no fresh mount lifecycle,
         Framer Motion's useLayoutEffect never fires the animation to opacity:1.
         All animated elements stay permanently invisible.
         Confirmed via curl diagnostic: BAILOUT_TO_CLIENT_SIDE_RENDERING present
         in HTML, all text elements had style="opacity:0" baked in server HTML.
         next/dynamic({ ssr: false }) is also forbidden in Server Components
         (layout.tsx) in Next.js 16 — it must live in a 'use client' file.
         Architectural fix attempted (React.lazy + Suspense in a layout-level
         Client Component wrapper) eliminated the bailout but visual output
         still failed on Vercel preview.
FIX:     Three.js dropped entirely. Hero background replaced with a full-screen
         HTML5 video element (autoPlay muted loop playsInline). Zero architectural
         complexity, more on-brand for a fashion house, no WebGL dependency.
PREVENT: Do not use next/dynamic({ ssr: false }) inside any 'use client' route
         segment component (page.tsx, layout.tsx). If a client-only library is
         needed, isolate it in a dedicated Client Component wrapper using
         React.lazy + Suspense, and confirm no BailoutToCSR via:
         curl http://localhost:3000 | grep -o 'BAILOUT\|opacity:0'
DATE:    28/05/2026
SPRINT:  Sprint 1
---

---
BUG:     10 high-severity CVEs flagged by npm audit during Sprint 0 stack install
CAUSE:   next@14.2.35 (the originally specified version) falls within the vulnerable
         range next@9.3.4–16.3.0-canary.5. CVEs included DoS via Image Optimizer,
         RSC cache poisoning, HTTP request smuggling, SSRF via WebSocket upgrades,
         XSS with CSP nonces, and middleware/proxy bypasses.
         Additionally eslint-config-next@14 depended on a vulnerable glob version
         (CLI command injection via --cmd flag, high severity).
FIX:     Upgraded the full stack to Next.js 16 + React 19 before any project code
         was written. Updated all Sanity packages to compatible versions:
         next-sanity@13, sanity@5, @sanity/client@7, @sanity/ui@3.
         Upgraded eslint and eslint-config-next to v16. All 10 high CVEs resolved.
         19 moderate vulnerabilities remain in Sanity's internal CLI tooling
         (js-yaml, prismjs, uuid) — none affect the published website at runtime.
         Fix would require downgrading to sanity@2 which breaks v5 schemas.
PREVENT: Run npm audit as part of every sprint merge checklist.
         Do not install major version packages without checking audit immediately.
         Sprint 3 security checklist includes npm audit — zero high/critical gate.
DATE:    27/05/2026
SPRINT:  Sprint 0
---

---

## Example Entry (delete when first real entry is added)

---
BUG:     AnimatedCounter stuck at zero on impact section
CAUSE:   Component was a server component — useRef and useInView
         only work in client components. The ref was never attached
         to the DOM because the component never hydrated.
FIX:     Added "use client" as line 1 of AnimatedCounter.tsx.
         Confirmed ref attaches correctly in browser DevTools.
PREVENT: All components using useRef, useInView, or any Framer
         Motion hooks must have "use client" as line 1.
         Added to breaking-points standard.
DATE:    12 January 2026
SPRINT:  Sprint 2
---

---

## Recurring Patterns

> Patterns that have caused multiple bugs — extra vigilance required.

[TODO: Add patterns as they emerge — e.g. "Supabase RLS silently blocks
queries three times in Sprint 1 — always check RLS first when query
returns empty"]

---

## Dependency Issues

> Package-related problems — version conflicts, deprecated APIs, vulnerabilities.

| Package | Version | Issue | Resolution | Date |
|---|---|---|---|---|
| next | 14.2.35 | 10 high CVEs (DoS, cache poisoning, XSS, SSRF, smuggling) | Upgraded to 16.2.6 | 27/05/2026 |
| next-sanity | 9.x | Incompatible with Next.js 16 (peer: ^14.2) | Upgraded to 13.0.5 | 27/05/2026 |
| sanity | 3.x | Required by next-sanity v13 — upgraded to v5 | Upgraded to 5.27.0 | 27/05/2026 |
| eslint-config-next | 14.x | Depended on vulnerable glob (CLI injection, high CVE) | Upgraded to 16.2.6 | 27/05/2026 |
| @sanity/uuid, js-yaml, prismjs | various | 19 moderate CVEs in Sanity internal CLI tooling | Accepted — runtime safe, fix requires sanity@2 downgrade | 27/05/2026 |

---

## Environment Issues

> Problems caused by environment configuration — missing vars, wrong values.

| Variable | Environment | Issue | Resolution | Date |
|---|---|---|---|---|
| [TODO: VAR_NAME] | [TODO: Production] | [TODO: issue] | [TODO: resolution] | [TODO: date] |

---

## Notes for Future Phases

> Things that were not bugs but could become problems in future sprints.
> Technical debt and deferred decisions.

[TODO: Add notes as the project progresses]

- [TODO: e.g. The contact form uses in-memory rate limiting — upgrade
  to Upstash Redis if traffic increases significantly]
- [TODO: e.g. Sanity image URLs are not optimised for mobile —
  add width/height parameters in Sprint 3]