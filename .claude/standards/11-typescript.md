# 11 — TypeScript Standard

## Core Principle

TypeScript strict mode always. No `any`. No guessing at types.
If the type is unknown, use `unknown` with a type guard.
TypeScript is not optional — it is the standard across every file.

---

## tsconfig.json — Required Settings

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Type vs Interface

```tsx
// Use interface for object shapes and component props
interface ServiceCardProps {
  number: string
  title: string
  description: string
  deliverables: string[]
  href: string
  className?: string
}

// Use type for unions, primitives, and computed types
type ButtonVariant = "primary" | "outline" | "ghost"
type Status = "idle" | "loading" | "success" | "error"
type Nullable<T> = T | null
```

---

## Never Use any

```tsx
// WRONG — defeats the purpose of TypeScript
function processData(data: any) { ... }
const result: any = await fetch(url)

// CORRECT — use unknown with type guard
function processData(data: unknown) {
  if (typeof data === "string") {
    // TypeScript now knows data is a string
    return data.toUpperCase()
  }
  throw new Error("Expected string")
}

// CORRECT — type the response properly
interface ApiResponse {
  programs: Program[]
  total: number
}
const result = await fetch(url)
const data: ApiResponse = await result.json()
```

---

## Component Props — Always Typed

```tsx
// Every component with props has an interface above it

interface HeroSectionProps {
  title: string
  subtitle: string
  cta: {
    label: string
    href: string
  }
  image: SanityImage
  className?: string  // always optional on primitives
}

export function HeroSection({
  title,
  subtitle,
  cta,
  image,
  className,
}: HeroSectionProps) {
  return (...)
}
```

---

## Async Functions — Always Typed Return

```tsx
// WRONG — no return type
async function getPrograms() {
  const { data, error } = await supabase.from("programs").select("*")
  return data
}

// CORRECT — explicit return type
async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase
    .from("programs")
    .select("*")

  if (error) throw new Error(error.message)
  return data ?? []
}

// CORRECT — API route handler
export async function POST(request: Request): Promise<Response> {
  ...
  return NextResponse.json({ success: true })
}
```

---

## Supabase Type Safety

Generate types from your Supabase schema:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts
```

Use generated types in queries:

```tsx
import type { Database } from "@/types/supabase"

type Program = Database["public"]["Tables"]["programs"]["Row"]
type ProgramInsert = Database["public"]["Tables"]["programs"]["Insert"]

// Typed Supabase client
import { createClient } from "@supabase/supabase-js"
const supabase = createClient<Database>(url, key)

// Query is now fully typed
const { data, error } = await supabase
  .from("programs")
  .select("*")
// data is Program[] | null — fully typed
```

---

## Sanity Type Safety

Define types matching your Sanity schemas:

```tsx
// types/sanity.ts
export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
  caption?: string
}

export interface Program {
  _id: string
  _type: "program"
  title: string
  description: string
  slug: { current: string }
  image: SanityImage
  stats: {
    label: string
    value: string
  }[]
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  image: SanityImage
  email?: string
}
```

---

## Non-null Assertion — Use Sparingly

```tsx
// WRONG — unsafe, will crash if undefined
const title = program!.title

// CORRECT — check first, then access
if (!program) return <NotFound />
const title = program.title

// Acceptable — when you are 100% certain the value exists
// and TypeScript cannot infer it (e.g. environment variables)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
// This is acceptable because Next.js guarantees env vars
// defined in .env.local exist — but document why
```

---

## Optional Chaining and Nullish Coalescing

```tsx
// Prefer optional chaining over null checks
// VERBOSE
if (user && user.profile && user.profile.name) {
  return user.profile.name
}

// CLEAN
return user?.profile?.name ?? "Anonymous"

// Nullish coalescing for defaults
const count = data?.length ?? 0
const title = program?.title ?? "Untitled"
const items = response?.items ?? []
```

---

## Environment Variable Types

```tsx
// /types/env.d.ts — declare env var types once
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    SUPABASE_SERVICE_ROLE_KEY: string
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    NEXT_PUBLIC_SANITY_DATASET: string
    SANITY_API_TOKEN: string
    NEXT_PUBLIC_SITE_URL: string
  }
}
```

This eliminates `string | undefined` on all env vars in the codebase.

---

## Generic Types for Reusable Patterns

```tsx
// Generic API response wrapper
interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Generic empty state props
interface EmptyStateProps {
  message: string
  action?: {
    label: string
    href: string
  }
}

// Generic paginated response
interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
```

---

## Common Type Patterns

```tsx
// Children prop
interface ProviderProps {
  children: React.ReactNode
}

// Class name prop (always optional on primitives)
interface ButtonProps {
  className?: string
}

// Event handlers
interface FormProps {
  onSubmit: (data: FormData) => Promise<void>
  onChange?: (field: string, value: string) => void
}

// Ref forwarding
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn("...", className)} {...props} />
  }
)
Input.displayName = "Input"
```

---

## Pre-Merge TypeScript Check

Always run before every sprint merge:

```bash
npx tsc --noEmit
```

Zero errors required. Fix all TypeScript errors before merging.
TypeScript errors in development become runtime crashes in production.

---

## Never Do

- Never use `any` — use `unknown` with type guards
- Never use `@ts-ignore` — fix the underlying type issue
- Never use `@ts-expect-error` unless adding a comment explaining why
- Never use `as any` casting — type the value properly
- Never skip typing async function return values
- Never use `object` type — define the exact shape
- Never use `Function` type — use specific function signatures