# 05 — Breaking Points & Defensive Rules

## Core Principle

Apply these rules defensively on every component — not just when
explicitly reminded. These are the failure patterns that most commonly
break ApexSource projects in production.

---

## Next.js App Router

### "use client" missing
```tsx
// WRONG — build error
import { motion } from "framer-motion"
export function HeroSection() {
  return <motion.div>...</motion.div>
}

// CORRECT
"use client"
import { motion } from "framer-motion"
export function HeroSection() {
  return <motion.div>...</motion.div>
}
```

**Rule:** Any component using `motion.*`, `useState`, `useEffect`,
`useRef`, event handlers, or browser APIs must have `"use client"` as line 1.

---

### Fetching data in client components
```tsx
// WRONG — loses SSR, exposes keys, hurts SEO
"use client"
export function ProgramsList() {
  const [programs, setPrograms] = useState([])
  useEffect(() => {
    supabase.from("programs").select("*").then(...)
  }, [])
}

// CORRECT — fetch in server component, pass as props
// app/programs/page.tsx (server component)
export default async function ProgramsPage() {
  const { data } = await supabase.from("programs").select("*")
  return <ProgramsList programs={data} />
}

// ProgramsList.tsx (client component — interactivity only)
"use client"
export function ProgramsList({ programs }: { programs: Program[] }) {
  return programs.map(...)
}
```

---

### useSearchParams without Suspense
```tsx
// WRONG — build error in production
"use client"
import { useSearchParams } from "next/navigation"
export function SearchComponent() {
  const params = useSearchParams()
}

// CORRECT
import { Suspense } from "react"
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  )
}
```

---

## Framer Motion

### motion.* in server components
```tsx
// WRONG — build error
// No "use client" directive
export function HeroSection() {
  return <motion.div>...</motion.div> // error
}

// CORRECT — thin client wrapper pattern
// HeroAnimations.tsx
"use client"
import { motion } from "framer-motion"
export function HeroAnimations({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  )
}

// HeroSection.tsx — stays a server component
import { HeroAnimations } from "./HeroAnimations"
export function HeroSection({ title }: { title: string }) {
  return (
    <section>
      <HeroAnimations>
        <h1>{title}</h1>
      </HeroAnimations>
    </section>
  )
}
```

---

### Missing AnimatePresence for exit animations
```tsx
// WRONG — exit animation never plays
<motion.div exit={{ opacity: 0 }}>
  Content
</motion.div>

// CORRECT
import { AnimatePresence } from "framer-motion"
<AnimatePresence>
  {isVisible && (
    <motion.div exit={{ opacity: 0 }}>
      Content
    </motion.div>
  )}
</AnimatePresence>
```

---

### Counter animating on mount instead of scroll
```tsx
// WRONG — counter completes before user sees it
useEffect(() => {
  motionValue.set(target) // fires immediately on mount
}, [])

// CORRECT — fires only when element enters viewport
const isInView = useInView(ref, { once: true })
useEffect(() => {
  if (isInView) motionValue.set(target)
}, [isInView])
```

---

## Lenis

### Lenis not destroyed on route change
```tsx
// WRONG — multiple instances stack up, scroll breaks
useEffect(() => {
  const lenis = new Lenis({...})
  // no cleanup
}, [])

// CORRECT
useEffect(() => {
  const lenis = new Lenis({...})
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return () => lenis.destroy() // always clean up
}, [])
```

---

### Anchor links breaking silently
```tsx
// WRONG — stops working with Lenis installed (no error thrown)
<a href="#services">Our Services</a>

// CORRECT
<button onClick={() => lenis?.scrollTo("#services", { offset: -80 })}>
  Our Services
</button>
```

---

### Missing scrollRestoration config
```js
// next.config.js — required when Lenis is installed
module.exports = {
  experimental: {
    scrollRestoration: false
  }
}
```

---

## Supabase

### Service role key exposed client-side
```tsx
// WRONG — catastrophic security breach
"use client"
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY)

// CORRECT — anon key in client, service role only in server/API
// Client component
const supabase = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// API route only
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)
```

---

### No error handling on queries
```tsx
// WRONG — crashes if data is null
const { data } = await supabase.from("programs").select("*")
return data.map(...) // TypeError if data is null

// CORRECT
const { data, error } = await supabase.from("programs").select("*")

if (error) {
  console.error(error)
  return <ErrorState message="Failed to load programs" />
}

if (!data || data.length === 0) {
  return <EmptyState message="No programs found" />
}

return data.map(...)
```

---

### RLS blocking queries silently
Supabase RLS returns empty data instead of an error when access is blocked.
This is a silent failure — no error is thrown.

**Rule:** Note which tables have RLS enabled in `.claude/project/overview.md`.
When a query returns empty unexpectedly, check RLS policies first.

---

## Sanity

### Using .asset.url directly
```tsx
// WRONG — unoptimised URL, may not work
<img src={image.asset.url} />

// CORRECT — always use urlFor()
import { urlFor } from "@/sanity/lib/image"
<Image src={urlFor(image).width(800).url()} alt="..." width={800} height={600} />
```

---

### Inline GROQ queries
```tsx
// WRONG — scattered data layer
export default async function ProgramsPage() {
  const programs = await client.fetch(`*[_type == "program"]`)
}

// CORRECT — all queries in one file
// /sanity/lib/queries.ts
export const programsQuery = groq`
  *[_type == "program" && !(_id in path('drafts.**'))] {
    _id, title, description, slug, image
  }
`

// page.tsx
import { programsQuery } from "@/sanity/lib/queries"
const programs = await sanityFetch<Program[]>(programsQuery)
```

---

### No null check on Sanity returns
```tsx
// WRONG — crashes if content not published
const content = await getPageContent("home")
return <h1>{content.title}</h1>

// CORRECT
const content = await getPageContent("home")
if (!content) return <ComingSoonState />
return <h1>{content.title}</h1>
```

---

## General React

### Missing key props on mapped lists
```tsx
// WRONG — React reconciliation bugs
items.map((item, index) => <Card key={index} />) // index as key — wrong
items.map(item => <Card />) // no key — error

// CORRECT — always use stable unique ID
items.map(item => <Card key={item.id} />)
items.map(item => <Card key={item._id} />) // Sanity
```

---

### Images without alt text
```tsx
// WRONG — accessibility failure, build warning
<Image src={hero} width={1200} height={600} />

// CORRECT
<Image src={hero} alt="Children at Hopefront outreach event in Accra" width={1200} height={600} />

// Decorative image
<Image src={decoration} alt="" aria-hidden="true" width={100} height={100} />
```

---

### Environment variables without NEXT_PUBLIC_ prefix used client-side
```tsx
// WRONG — returns undefined in client component
"use client"
const url = process.env.SUPABASE_URL // undefined — server only

// CORRECT — prefix for client access
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
```

---

## Quick Reference — Common Bugs

| Symptom | Likely Cause | First Check |
|---|---|---|
| Counter stuck at zero | `useInView` not firing, server component | `"use client"` present? Ref on outermost element? |
| Blank section | Sanity content not published | Sanity Studio — is document published? |
| Form silently fails | API route error, Supabase RLS blocking | Supabase API logs, browser network tab |
| Animation not playing | `once: true` already triggered, wrong ref | Remove `once: true` temporarily |
| Images not loading in production | Domain not whitelisted in `next.config.js` | `remotePatterns` in next.config.js |
| Works dev, breaks production | Env var missing in Vercel | Vercel dashboard → environment variables |
| Lenis scroll erratic | Multiple instances stacking | Verify `lenis.destroy()` in cleanup |
| Exit animation not playing | Missing `AnimatePresence` wrapper | Is component wrapped in `AnimatePresence`? |
| Supabase query returns empty | RLS blocking unauthenticated access | Supabase table editor — data exists? |
| TypeScript error only in build | Strict config difference, stale types | Run `npx tsc --noEmit` locally |