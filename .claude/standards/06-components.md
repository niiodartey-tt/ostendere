# 06 — Component Architecture

## The Mental Model

Every piece of UI falls into one of three categories:

```
UI Primitives          → smallest building blocks
  ↓
Section Components     → groups of primitives forming a page section
  ↓
Page Components        → sections assembled into a full page
```

- **Primitives** — Button, Input, Badge, Card, Avatar. One thing, used everywhere.
- **Sections** — HeroSection, ServicesGrid, TestimonialsCarousel. Built from primitives.
- **Pages** — assemble sections, fetch data, pass it down. No UI logic themselves.

---

## Folder Structure

```
/components
  /ui              → primitives (Button, Input, Badge, Card)
  /sections        → section components (HeroSection, ServicesGrid)
  /layout          → structural (Navbar, Footer, Sidebar)
  /providers       → context and providers (LenisProvider, ThemeProvider)

/hooks             → custom hooks (use-section-animation.ts)

/app
  /(site)          → public pages
  /api             → API routes
```

Every component Claude creates must land in the correct folder.
This is not optional.

---

## Rule 1 — One Component Per File. Always.

```tsx
// WRONG — two components in one file
export function ServiceCard() { ... }
export function ServiceCardGrid() { ... }

// CORRECT — two separate files
// ServiceCard.tsx
export function ServiceCard() { ... }

// ServiceCardGrid.tsx
export function ServiceCardGrid() { ... }
```

**Exception:** Small internal sub-components never exported may live
in the same file but must not be exported.

```tsx
// Acceptable — internal only, not exported
function CardIcon({ name }: { name: string }) { ... }

export function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div>
      <CardIcon name={icon} />
      ...
    </div>
  )
}
```

---

## Rule 2 — Named Exports. Always.

```tsx
// WRONG
export default function HeroSection() { ... }

// CORRECT
export function HeroSection() { ... }
```

**Only exception:** Next.js page files and layout files require default exports.

```tsx
// app/page.tsx — default export required by Next.js
export default function HomePage() {
  return <HeroSection /> // HeroSection still uses named export
}
```

---

## Rule 3 — Props Interface in Same File

Every component with props must have a TypeScript interface defined
directly above the component, named `[ComponentName]Props`.

```tsx
// ServiceCard.tsx
interface ServiceCardProps {
  number: string
  title: string
  description: string
  deliverables: string[]
  href: string
  className?: string // always optional — accept external className on primitives
}

export function ServiceCard({
  number,
  title,
  description,
  deliverables,
  href,
  className
}: ServiceCardProps) {
  return (...)
}
```

- Never use `any` on props
- Never pass more than 6–7 props — group into objects if needed
- Always accept optional `className` prop on primitive components

---

## Rule 4 — Server vs Client Decision

```
Default to server component.

Only add "use client" when you specifically need:
  - useState
  - useEffect
  - useRef
  - Event handlers (onClick, onChange, onSubmit)
  - Browser APIs (window, document, localStorage)
  - Framer Motion
  - Any third-party library that uses hooks
```

### The thin client wrapper pattern

Keep server components server-side. Create a thin client wrapper for animation only.

```tsx
// HeroSection.tsx — stays a server component
import { HeroAnimations } from "./HeroAnimations"

export function HeroSection({ title, subtitle, cta }: HeroSectionProps) {
  return (
    <section>
      <HeroAnimations>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <CTAButton href={cta.href}>{cta.label}</CTAButton>
      </HeroAnimations>
    </section>
  )
}

// HeroAnimations.tsx — thin client wrapper for motion only
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
```

---

## Rule 5 — File Naming

```
Component files:     PascalCase.tsx      HeroSection.tsx
Hook files:          camelCase.ts        useScrollAnimation.ts
Utility files:       kebab-case.ts       format-date.ts
Constant files:      kebab-case.ts       site-config.ts
```

---

## Rule 6 — Custom Hooks for Reusable Logic

Any hook logic used in more than one component becomes a custom hook.

```tsx
// WRONG — animation logic copy-pasted in every section
"use client"
export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // same 3 lines repeated in HeroSection, AboutSection, etc.
}

// CORRECT — extracted to a reusable hook
// /hooks/use-section-animation.ts
import { useRef } from "react"
import { useInView } from "framer-motion"

export function useSectionAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return { ref, isInView }
}

// Used cleanly in any section
"use client"
import { useSectionAnimation } from "@/hooks/use-section-animation"

export function ServicesSection() {
  const { ref, isInView } = useSectionAnimation()
  ...
}
```

Custom hooks:
- Live in `/hooks/`
- Always prefixed with `use`
- Named in camelCase: `useScrollAnimation.ts`

---

## Rule 7 — Component Size Limit

**Maximum 150 lines per component file.**

If a component exceeds 150 lines it is doing too much. Split it.

```
// A 300-line ServicesSection is wrong.
// Split into:

ServicesSection.tsx      → parent, assembles the section (~40 lines)
ServiceCard.tsx          → individual card (~60 lines)
ServiceCardGrid.tsx      → grid layout (~30 lines)
ServicesHeader.tsx       → section heading and intro (~30 lines)
```

---

## Rule 8 — Prop Drilling Limit

Maximum 2 levels of prop passing.

```
Page → SectionA → ComponentB ✅ (2 levels — acceptable)
Page → SectionA → ComponentB → ComponentC ❌ (3 levels — refactor)
```

Beyond 2 levels — use React Context or restructure the component tree.

---

## Rule 9 — Single Responsibility

Each component does one thing.

If you find yourself describing a component with the word **"and"** — it is doing too much.

```
❌ "A card that shows service info AND handles hover animation
    AND tracks click events AND fetches related data"

✅ "A card that displays service information"
```

---

## Complete Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Component files | PascalCase.tsx | HeroSection.tsx |
| Custom hooks | camelCase.ts | useScrollAnimation.ts |
| Utilities | kebab-case.ts | format-date.ts |
| Constants | SCREAMING_SNAKE | MAX_UPLOAD_SIZE |
| Types / Interfaces | PascalCase | ServiceCardProps |
| API routes | kebab-case | /api/contact-form |
| Supabase tables | snake_case | contact_submissions |
| Sanity schemas | camelCase | programCard |
| Git branches | kebab-case | task/hero-section |
| Env variables | SCREAMING_SNAKE | NEXT_PUBLIC_SUPABASE_URL |

---

## Comment Standard

### When to comment
- Complex business logic not obvious from the code
- Workarounds for known bugs or browser quirks
- Performance-critical sections
- Security-sensitive areas

### When NOT to comment
- Obvious code — never explain what the code clearly does
- Tailwind classes — never explain what `p-4` means
- Standard React patterns — no need to explain `useState`

### JSDoc for reusable utilities
```tsx
/**
 * Formats a date for display in Ghanaian context
 * @param date - ISO date string from Supabase
 * @returns Formatted string e.g. "12 January 2026"
 */
export function formatGhanaDate(date: string): string {
  ...
}
```