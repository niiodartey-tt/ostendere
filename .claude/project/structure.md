# File & Folder Structure

> This is the Ostendere Phase 1 file structure.
> Claude reads this file to know exactly where every file lives.
> Correct file placement is enforced by this document.

---

## Root Structure

```
/
├── app/                        Next.js App Router
├── components/                 React components
├── hooks/                      Custom React hooks
├── lib/                        Utilities and client setup
├── types/                      TypeScript type definitions
├── public/                     Static assets — logos, OG images only
├── sanity/                     Sanity CMS schemas and client
├── .claude/                    ApexSource AI standard (this folder)
├── .env.local                  Local env vars — never committed
├── .env.example                Env var names — always committed
├── .nvmrc                      Node.js version specification
├── .gitignore                  Git ignore rules
├── next.config.js              Next.js configuration
├── tailwind.config.js          Tailwind configuration with Ostendere tokens
├── tsconfig.json               TypeScript configuration
├── package.json                Dependencies and scripts
└── CLAUDE.md                   AI session briefing
```

---

## App Directory (Next.js App Router)

```
app/
├── (site)/
│   └── page.tsx                Homepage — all 5 sections in sequence
├── api/
│   └── contact/
│       └── route.ts            Contact enquiry form email forwarding
├── layout.tsx                  Root layout — LenisProvider, fonts, metadata
├── not-found.tsx               404 page
├── error.tsx                   Global error boundary
└── globals.css                 Tailwind base + global styles
```

> Ostendere is a single-page experience — all sections (Hero, Lookbook, About, Services, Contact)
> are rendered on the homepage at `(site)/page.tsx`. No additional public routes in Phase 1.

---

## Components Directory

```
components/
├── ui/                         Primitive components
│   ├── Button.tsx              Primary button component
│   ├── Input.tsx               Form input
│   └── Lightbox.tsx            Lookbook image/video lightbox modal
├── sections/                   Page section components
│   ├── HeroSection.tsx         Three.js dark navy scene + brand statement
│   ├── LookbookSection.tsx     Editorial grid — filter, lightbox, video loops
│   ├── AboutSection.tsx        Daniel's story, craft, philosophy
│   ├── ServicesSection.tsx     Bespoke, ready-to-wear, accessories
│   └── ContactSection.tsx      Enquiry form
├── three/                      Three.js scene components — always dynamically imported
│   ├── HeroScene.tsx           Dark navy hero scene (dynamic import with ssr: false)
│   └── SceneCanvas.tsx         Reusable Three.js canvas wrapper
├── layout/                     Structural components
│   ├── CelticNavTrigger.tsx    Animated Celtic SVG — nav trigger at section bottoms
│   └── MenuOverlay.tsx         Full-screen menu overlay with Framer Motion parallax
└── providers/                  Context providers
    └── LenisProvider.tsx       Smooth scroll provider
```

> There is no traditional Navbar. Navigation is triggered by `CelticNavTrigger` and handled
> entirely by `MenuOverlay`. These are the only navigation components in the project.

---

## Hooks Directory

```
hooks/
├── use-section-animation.ts    Reusable whileInView animation hook
├── use-three-scene.ts          Three.js scene lifecycle — init, resize, dispose
└── use-lookbook-filter.ts      Lookbook category filter state
```

---

## Lib Directory

```
lib/
├── utils.ts                    cn() utility (clsx + tailwind-merge)
└── email.ts                    Contact form email helper (used by API route)
```

---

## Sanity Directory

```
sanity/
├── schemas/                    Content type definitions
│   ├── index.ts                Schema registry — all schemas registered here
│   ├── look.ts                 Lookbook entry: title, category, photos[], video, featured, date
│   ├── service.ts              Service offering: name, description, order
│   ├── about.ts                Daniel's bio, philosophy, portrait image
│   └── siteSettings.ts         Global: tagline, contactEmail, social links
└── lib/
    ├── client.ts               Sanity client + sanityFetch()
    ├── queries.ts              ALL GROQ queries — never write inline
    └── image.ts                urlFor() image URL builder
```

---

## Types Directory

```
types/
├── sanity.ts                   Sanity content type interfaces (Look, Service, About, SiteSettings)
└── env.d.ts                    Environment variable type declarations
```

> No `supabase.ts` in Phase 1 — Supabase is Phase 3 only.

---

## Public Directory

```
public/
├── images/
│   ├── logo.png                Celtic compass mark + serif wordmark — client-provided, never modify
│   └── og-default.jpg          Default Open Graph image (1200x630) — Ostendere brand
└── fonts/                      Self-hosted fonts if needed (decision made in Sprint 1)
```

> All lookbook photography lives in Sanity — not `/public`.
> `/public` is strictly for the logo, OG images, favicons, and site-level static assets.

---

## Key File Rules

### Files Claude must never modify without explicit instruction
See `do-not-touch.md` for the full list. Core entries:
- `/public/images/logo.png` — client-provided asset, always off-limits
- `/tailwind.config.js` — only add tokens, never remove existing ones
- `/sanity/schemas/*.ts` — once live with content, only modify after explicit confirmation

### Files Claude must always update when adding new features
- `types/sanity.ts` — when adding or changing a Sanity schema
- `sanity/schemas/index.ts` — when registering a new schema
- `sanity/lib/queries.ts` — when adding new GROQ queries
- `.env.example` — when adding new environment variables
- `CLAUDE.md` sprint status — when completing tasks

---

## Import Alias

All imports use the `@/` alias pointing to the project root:

```tsx
// Always use alias imports — never relative paths from deep folders
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { looksQuery } from "@/sanity/lib/queries"
import type { Look } from "@/types/sanity"

// Never use deep relative imports
import { Button } from "../../../components/ui/Button"  // wrong
```
