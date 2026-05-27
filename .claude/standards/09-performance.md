# 09 — Performance Standard

## Core Principle

Performance is built in from the start — not fixed after launch.
Your clients are visited by people in Ghana on mobile data connections
and by international clients who judge quality by how fast a site loads.

---

## Core Web Vitals Targets

| Metric | Target | What It Measures |
|---|---|---|
| LCP | < 2.5 seconds | Largest element load time |
| INP | < 200ms | Response to user interaction |
| CLS | < 0.1 | Layout shift during load |
| JS Bundle | < 300KB compressed | JavaScript weight |
| Total page weight | < 1MB (excluding images) | Overall page size |

Check every site before delivery at: **pagespeed.web.dev**

---

## Rule 1 — Images

### Always use next/image — never img

```tsx
// WRONG — unoptimised, causes CLS, no lazy loading
<img src="/hero.jpg" alt="Hero" />

// CORRECT
import Image from "next/image"

<Image
  src="/hero.jpg"
  alt="Children at Hopefront outreach event in Accra"
  width={1200}
  height={600}
  priority           // add ONLY for above-the-fold images
  className="object-cover"
/>
```

Next.js `<Image />` automatically:
- Converts to WebP format — 30% smaller than JPEG
- Lazy loads below-fold images
- Prevents layout shift by reserving space
- Serves correct size per device

### The priority prop — important

```tsx
// Above the fold — hero images, logo — add priority
<Image src={hero} priority alt="..." width={1200} height={600} />

// Below the fold — omit priority (lazy loads automatically)
<Image src={serviceImage} alt="..." width={800} height={500} />
```

Only the first image the user sees should have `priority`.
Adding it everywhere defeats lazy loading.

### Responsive image sizes

```tsx
// Always specify sizes prop — mobile gets smaller file
<Image
  src={hero}
  alt="..."
  sizes="(max-width: 768px) 100vw, 50vw"
  width={1200}
  height={600}
/>
```

### Fill pattern for flexible containers

```tsx
<div className="relative w-full h-64 md:h-96">
  <Image
    src={hero}
    alt="..."
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 1280px"
  />
</div>
```

### External image domains — whitelist in next.config.js

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // add project-specific domains here
    ],
  },
}
```

Without this, Next.js blocks external images and the build fails.

---

## Rule 2 — Fonts

### Always use next/font — never link to Google Fonts

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",        // show fallback while loading — prevents FOIT
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```js
// tailwind.config.js — reference via CSS variables
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
}
```

Next.js font optimisation:
- Self-hosts Google Fonts — no external request
- Preloads fonts so they arrive faster
- Prevents layout shift from font loading
- Eliminates the Google Fonts privacy concern

---

## Rule 3 — Bundle Size — Dynamic Imports

Heavy components load only when needed.

```tsx
// WRONG — loads entire modal JavaScript on every page load
import { VideoModal } from "@/components/ui/VideoModal"

// CORRECT — loads only when needed
import dynamic from "next/dynamic"

const VideoModal = dynamic(
  () => import("@/components/ui/VideoModal"),
  {
    loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded-lg" />,
    ssr: false, // modals don't need server rendering
  }
)
```

### Always dynamically import

- Video players
- Map embeds (Google Maps, Mapbox)
- Complex chart components
- Rich text editors
- Any third-party widget that is heavy
- Any component only visible after user interaction

### Never dynamically import

- Anything visible above the fold on page load
- Navigation and layout components
- Core UI primitives used everywhere

---

## Rule 4 — Preventing Layout Shift (CLS)

Layout shift is when elements jump as the page loads. Penalised by Google.

### Always specify image dimensions

```tsx
// WRONG — no dimensions, causes layout shift
<Image src={hero} alt="..." />

// CORRECT — dimensions reserved, no shift
<Image src={hero} alt="..." width={1200} height={600} />
```

### Skeleton loaders must match real content dimensions

```tsx
// The skeleton must match the exact space the real content will occupy
function ProgramCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-t-lg" />  // matches image
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />   // matches title
        <div className="h-4 bg-gray-200 rounded w-full" />  // matches text
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}
```

---

## Rule 5 — Third Party Scripts

```tsx
// WRONG — blocks page render
<script src="https://analytics.example.com/script.js" />

// CORRECT — Next.js Script with loading strategy
import Script from "next/script"

// Analytics — loads after page is interactive
<Script
  src="https://www.googletagmanager.com/gtag/js"
  strategy="afterInteractive"
/>

// Chat widgets, low priority tools
<Script
  src="https://chat.example.com/widget.js"
  strategy="lazyOnload"
/>
```

### Strategy guide

```
beforeInteractive  → critical polyfills only (rare)
afterInteractive   → analytics, tag managers
lazyOnload         → chat widgets, low priority tools
```

Never use raw `<script>` tags for third-party content.

---

## Rule 6 — Streaming with Suspense

Send parts of the page to the browser as they are ready —
the user sees something immediately even when data is slow.

```tsx
// app/programs/page.tsx
import { Suspense } from "react"
import { ProgramsList } from "@/components/sections/ProgramsList"
import { ProgramsListSkeleton } from "@/components/sections/ProgramsListSkeleton"

export default function ProgramsPage() {
  return (
    <main>
      {/* Renders immediately — no data dependency */}
      <ProgramsHero />

      {/* Streams in when Sanity responds */}
      <Suspense fallback={<ProgramsListSkeleton />}>
        <ProgramsList />
      </Suspense>
    </main>
  )
}
```

---

## Rule 7 — Metadata on Every Page

```tsx
// app/programs/page.tsx — static metadata
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Programs | Hopefront Foundation",
  description: "Three programs serving vulnerable children across Ghana.",
  openGraph: {
    title: "Our Programs | Hopefront Foundation",
    description: "Three programs serving vulnerable children across Ghana.",
    images: ["/og-programs.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Programs | Hopefront Foundation",
    description: "Three programs serving vulnerable children across Ghana.",
    images: ["/og-programs.jpg"],
  },
}
```

```tsx
// app/programs/[slug]/page.tsx — dynamic metadata
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const program = await getProgram(params.slug)

  if (!program) return { title: "Program Not Found" }

  return {
    title: `${program.title} | Hopefront Foundation`,
    description: program.description,
    openGraph: {
      images: [urlFor(program.image).width(1200).height(630).url()],
    },
  }
}
```

OG images must be 1200x630px.

---

## Rule 8 — Internal Navigation

```tsx
// WRONG — plain anchor, no prefetching
<a href="/services">Our Services</a>

// CORRECT — Next.js Link prefetches automatically
import Link from "next/link"

<Link href="/services">Our Services</Link>
```

Never use plain `<a>` tags for internal navigation.

---

## Rule 9 — Mobile Performance

```tsx
// Correct sizes prop — mobile gets smaller image file
<Image
  src={hero}
  alt="..."
  sizes="(max-width: 768px) 100vw, 50vw"
  width={1200}
  height={600}
/>

// Reduce animation on mobile via useReducedMotion
const prefersReducedMotion = useReducedMotion()
// then use in transition duration
```

---

## Pre-Launch Checklist

Run before every client delivery:

```bash
# Check scores on production URL
# Target: all green at pagespeed.web.dev

# Local build check
npm run build

# Bundle analysis (optional)
npx @next/bundle-analyzer
```

- [ ] LCP under 2.5 seconds on mobile
- [ ] CLS under 0.1
- [ ] INP under 200ms
- [ ] All images use next/image with alt text
- [ ] All images have width and height specified
- [ ] priority prop only on above-fold images
- [ ] Fonts loaded via next/font
- [ ] Heavy components dynamically imported
- [ ] All internal links use Next.js Link
- [ ] All pages have title and description metadata
- [ ] Third-party scripts use Next.js Script component
- [ ] External image domains whitelisted in next.config.js