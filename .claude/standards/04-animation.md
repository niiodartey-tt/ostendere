# 04 — Animation Standard

## Three Tools — One Responsibility Each

Never mix responsibilities between tools.
Each tool has a defined job. Use the correct tool for each animation type.

| Tool | Responsibility | Never Use For |
|---|---|---|
| Framer Motion | Entrance, scroll, stagger, counters, page transitions, hover/tap | Simple UI states, loading spinners |
| Lenis | Smooth scroll feel only — installed globally in root layout | Component animations of any kind |
| Tailwind Animate | Skeletons, spinners, tickers, dropdowns, toasts, modals | Scroll-triggered or scroll-aware animations |

---

## Decision Rule

```
Does this animation need to know about:
  - Scroll position?
  - React state?
  - User interaction beyond hover/focus?

YES → Framer Motion
NO  → Tailwind Animate
```

---

## Framer Motion

### Installation
```bash
npm install framer-motion
```

### The 6 responsibilities

**1. Entrance animations — above the fold, on page load**
```tsx
"use client"
import { motion } from "framer-motion"

<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  Every Child Deserves a Chance
</motion.h1>
```

**2. Scroll animations — elements entering the viewport**
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <ServiceCard />
</motion.div>
```

**3. Staggered animations — list items appearing in sequence**
```tsx
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {services.map(service => (
    <motion.div key={service.id} variants={item}>
      <ServiceCard {...service} />
    </motion.div>
  ))}
</motion.div>
```

**4. Counter animations — counts from 0 to target on scroll**
```tsx
"use client"
import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

interface AnimatedCounterProps {
  target: number
  suffix?: string
}

export function AnimatedCounter({ target, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (isInView) motionValue.set(target)
  }, [isInView, motionValue, target])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}
```

**5. Page transitions — animating between routes**
```tsx
// app/layout.tsx
"use client"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**6. Hover and tap interactions — UI feedback**
```tsx
// Card that lifts on hover
<motion.div
  whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  <ServiceCard />
</motion.div>

// Button press feedback
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
>
  Book a Consultation
</motion.button>
```

### Framer Motion rules
- Always use `viewport={{ once: true }}` on all `whileInView` — no exceptions
- Animation duration: 0.4s–0.7s for entrances, 0.2s–0.3s for interactions
- Always use `ease: "easeOut"` for entrances unless specified otherwise
- Counters use `useInView` — never animate on mount
- All components using Framer Motion hooks must have `"use client"`
- Always wrap animated lists in `variants` — never animate each item independently
- `exit` animations always require `AnimatePresence` wrapper — no exceptions
- Stagger delay between children: 0.08s–0.12s maximum

### Standard entrance animation
```tsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

---

## Lenis

### Installation
```bash
npm install lenis
```

### Setup — install once in root layout, never per page
```tsx
// components/providers/LenisProvider.tsx
"use client"
import { useEffect } from "react"
import Lenis from "lenis"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // never override mobile touch scroll
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy() // always destroy on unmount
  }, [])

  return <>{children}</>
}
```

```tsx
// app/layout.tsx — wrap the entire app
import { LenisProvider } from "@/components/providers/LenisProvider"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

```js
// next.config.js — required when Lenis is installed
experimental: {
  scrollRestoration: false
}
```

### Anchor link navigation with Lenis
```tsx
// Standard href="#section" stops working with Lenis
// Use lenis.scrollTo() instead

"use client"
import { useLenis } from "lenis/react"

export function ScrollLink({ target, children }: { target: string, children: React.ReactNode }) {
  const lenis = useLenis()

  return (
    <button onClick={() => lenis?.scrollTo(target, { offset: -80, duration: 1.2 })}>
      {children}
    </button>
  )
}
```

### Lenis rules
- Install in root layout as `LenisProvider` — once only, never per page
- `duration: 1.2` — do not change unless client requests otherwise
- `smoothTouch: false` always — never override mobile touch scroll
- Always return `lenis.destroy()` in `useEffect` cleanup
- Set `scrollRestoration: false` in `next.config.js`
- All in-page anchor navigation uses `lenis.scrollTo()` not `href="#section"`

---

## Tailwind Animate

### Installation
```bash
npm install tailwindcss-animate
```

Add to `tailwind.config.js`:
```js
plugins: [require("tailwindcss-animate")]
```

### What to use it for

**Skeleton loading placeholders:**
```tsx
<div className="animate-pulse">
  <div className="h-48 bg-gray-200 rounded-t-lg" />
  <div className="p-4 space-y-2">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-3 bg-gray-200 rounded w-full" />
  </div>
</div>
```

**Loading spinners:**
```tsx
<div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full" />
```

**Scrolling ticker — the ApexSource signature pattern:**
```tsx
<div className="overflow-hidden whitespace-nowrap">
  <div className="animate-marquee inline-flex gap-8">
    {items.map((item, i) => (
      <span key={i}>{item} <span className="text-primary">◆</span></span>
    ))}
    {/* Duplicate for seamless loop */}
    {items.map((item, i) => (
      <span key={`dup-${i}`}>{item} <span className="text-primary">◆</span></span>
    ))}
  </div>
</div>
```

**Dropdowns and tooltips:**
```tsx
<div className="animate-in fade-in zoom-in-95 duration-200">
  <DropdownMenu />
</div>
```

**Toasts and alerts:**
```tsx
<div className="animate-in slide-in-from-top-4 duration-300">
  <Toast message="Saved successfully" />
</div>
```

**Scroll bounce indicator:**
```tsx
<div className="animate-bounce flex flex-col items-center gap-1">
  <span className="text-sm text-white/70">Scroll</span>
  <ChevronDown className="h-4 w-4 text-white/70" />
</div>
```

### Class reference
```
animate-in fade-in                   → fades in
animate-in fade-in zoom-in-95        → fades in while scaling up
animate-in slide-in-from-top-4       → slides in from above
animate-in slide-in-from-bottom-4    → slides in from below
animate-in slide-in-from-left-4      → slides in from left
animate-in slide-in-from-right-4     → slides in from right
duration-150                         → very fast (tooltip)
duration-200                         → fast (dropdown)
duration-300                         → standard (modal)
animate-pulse                        → skeleton loaders
animate-spin                         → loading spinners
animate-bounce                       → scroll indicators
animate-marquee                      → scrolling ticker (custom)
```

---

## Reduced Motion — All Tools

```tsx
// Framer Motion — useReducedMotion hook
"use client"
import { motion, useReducedMotion } from "framer-motion"

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

```css
/* globals.css — stop marquee for reduced motion users */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

Never autoplay video with motion unless user initiated.