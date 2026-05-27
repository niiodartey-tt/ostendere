# 14 — Debugging Process

## Core Principle

Never fix what you have not diagnosed.
The fix is always the last step — not the first.
Before any code changes, understand what is happening,
where it is happening, and why it is happening.

---

## The 8-Stage Process

### Stage 1 — Reproduce Reliably

A bug you cannot reproduce consistently is a bug you cannot fix confidently.

Before touching any code, answer:
- Can I reproduce this every time?
- What exact steps trigger it?
- Does it happen in development only, preview only, or production?
- Does it happen on all browsers or one specific browser?
- Does it happen on mobile only, desktop only, or both?
- Does it happen for all users or only specific conditions?
- When did it start? What changed before it appeared?

**If you cannot reproduce it reliably — stop.**
Do not attempt a fix. A fix for a bug you cannot reproduce is a guess.

---

### Stage 2 — Isolate the Layer

Work top to bottom through each layer:

```
UI Layer
  → Visual/styling issue? (wrong layout, broken animation)
  → Rendering issue? (component not showing, showing wrong data)
  → Interaction issue? (click not working, form not submitting)

Data Layer
  → Is the data reaching the component correctly?
  → Is the API returning what you expect?
  → Is the database query returning correct results?

Integration Layer
  → Sanity content issue? (missing field, draft not published)
  → Supabase RLS issue? (query returning empty due to permissions)
  → Environment variable issue? (undefined in wrong environment)

Build Layer
  → Only happens after build, not in development?
  → TypeScript error caught at build time?
  → Missing dependency or version conflict?

Network Layer
  → CORS issue? (blocked API request)
  → Timeout? (slow connection, partial load)
  → Environment-specific? (works locally, fails on Vercel)
```

---

### Stage 3 — Read the Evidence

Before changing any code, collect all available evidence:

**Browser DevTools:**
```
Console tab     → any errors or warnings?
Network tab     → any failed requests? What status code?
Elements tab    → is the HTML structure what you expect?
Application tab → are environment variables reaching the browser?
```

**Terminal:**
```bash
npm run build       # any build errors?
npx tsc --noEmit    # any TypeScript errors?
npm run lint        # any lint errors?
```

**Vercel Dashboard:**
```
Function logs    → any server-side errors?
Build logs       → did the build succeed?
Environment vars → are they set correctly in production?
```

**Supabase Dashboard:**
```
Table editor     → is the data actually there?
API logs         → is the query reaching Supabase?
Auth logs        → is authentication working?
```

**Sanity Studio:**
```
Is the document published? (not just saved as draft)
Is the field populated? (not empty)
Does the field name match the GROQ query?
```

---

### Stage 4 — Form a Hypothesis

Based on the evidence, form one specific hypothesis.

```
GOOD hypothesis:
"The counter animation is stuck at zero because useInView
is not firing — the ref is not attached to the correct DOM
element. The component is likely a server component missing
'use client'."

BAD hypothesis:
"Something is wrong with the animation."
```

A good hypothesis names:
- The specific component or file
- The specific behaviour that is wrong
- The suspected cause

Write it down before testing it. This prevents drift.

---

### Stage 5 — Test the Hypothesis

Test **one thing at a time**.
Never change multiple things simultaneously.

```
If you change two things and the bug disappears →
you do not know which one fixed it.

If you change two things and it gets worse →
you do not know which one caused the regression.
```

**Testing methods:**
```tsx
// Add a console.log to verify the suspected value
console.log("isInView:", isInView) // is it firing?
console.log("ref.current:", ref.current) // is it attached?

// Comment out the suspected code to isolate it
// const { isInView } = useInView(ref) // disabled temporarily

// Replace with simplest possible version to confirm
// <div ref={ref} style={{ minHeight: "10px" }}>
```

---

### Stage 6 — Apply the Fix

Once the hypothesis is confirmed:

- Apply the **minimal fix** — change only what needs changing
- Never refactor surrounding code during a bug fix
- Never add new features during a bug fix
- Never clean up unrelated code during a bug fix
- Never rename variables or restructure files during a bug fix

The fix should be surgical. In and out.
Scope creep during debugging creates new bugs.

---

### Stage 7 — Verify the Fix

After the fix:

- Reproduce the original steps — confirm bug is gone
- Test related functionality — confirm nothing else broke
- Test on mobile (375px) and desktop (1280px)
- Test in development AND run `npm run build`
- If bug was in production — test on Vercel preview URL
- Check browser console — no new errors introduced
- Check network tab — no new failed requests

---

### Stage 8 — Document It

Every bug that took more than 30 minutes to fix gets documented
in `.claude/project/known-issues.md`:

```markdown
---
BUG:     AnimatedCounter stuck at zero on Hopefront impact section
CAUSE:   useInView ref not attached to DOM — component was a server
         component missing "use client" directive
FIX:     Added "use client" as line 1, ref now attached correctly
PREVENT: All components using useRef must be client components.
         Added to breaking points standard.
DATE:    12 January 2026
---
```

This turns every bug into a permanent improvement to the standard.
The same bug never happens twice.

---

## Claude's Behaviour on Bug Reports

### Claude must NEVER do this
- Immediately suggest a fix without asking questions
- Change multiple files at once during debugging
- Assume the cause without evidence
- Rewrite the component from scratch to avoid debugging

### Claude must ALWAYS do this

**Step 1 — Ask the reproduction questions:**
```
Can you reproduce this consistently?
What exact steps trigger it?
Does it happen in dev, preview, or production?
What do you see in the browser console?
```

**Step 2 — Request the evidence:**
```
Can you share:
- The browser console output
- The component file where it occurs
- The network tab output if it is a data issue
```

**Step 3 — State a hypothesis before fixing:**
```
Based on what you have shared, I believe the issue is:
[specific hypothesis]

I am going to test this by [specific action]
before making any changes.
```

**Step 4 — Propose a surgical fix:**
```
The fix is [specific change] in [specific file].
This change does [X] and should not affect [Y] or [Z].
Shall I proceed?
```

**Step 5 — After fix, state verification steps:**
```
To confirm this is resolved:
1. [Step to reproduce original bug — should not occur now]
2. [Related functionality to verify still works]
3. Check browser console for new errors
```

---

## Common Bugs — Quick Reference

| Symptom | Likely Cause | First Check |
|---|---|---|
| Counter stuck at zero | `useInView` not firing, server component | `"use client"` present? Ref on outermost element? |
| Blank section on page | Sanity content not published | Sanity Studio — is document published? |
| Form silently fails | API route error, Supabase RLS blocking | Supabase API logs, browser network tab |
| Animation not playing | `once: true` already triggered, wrong ref | Remove `once: true` temporarily, verify ref |
| Images not loading in production | Domain not whitelisted in `next.config.js` | Check `remotePatterns` |
| Works dev, breaks production | Env var missing in Vercel | Vercel dashboard → environment variables |
| Lenis scroll erratic after navigation | Multiple Lenis instances stacking | Verify `lenis.destroy()` in `useEffect` cleanup |
| Exit animation not playing | Missing `AnimatePresence` wrapper | Is component wrapped in `AnimatePresence`? |
| Supabase query returns empty, no error | RLS blocking unauthenticated access | Supabase table editor — data exists? |
| TypeScript error only in build | Strict config difference, stale types | Run `npx tsc --noEmit` locally |
| Anchor links not scrolling | Lenis installed, plain `href="#"` used | Replace with `lenis.scrollTo()` |
| Page jumps on navigation | Lenis + Next.js scroll restoration conflict | Set `scrollRestoration: false` in `next.config.js` |

---

## What Never To Do During Debugging

- Never rewrite a component to fix a bug — fix the bug
- Never add new features while fixing a bug
- Never refactor unrelated code during a bug fix
- Never push a fix without verifying it resolves the issue
- Never fix a bug you have not diagnosed
- Never change multiple files simultaneously during debugging
- Never skip the verification step after fixing