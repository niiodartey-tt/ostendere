# 07 — Data Fetching Patterns

## The Decision Rule

```
Content doesn't change often (CMS, services, about)  → SSG (default)
Content must be fresh per request (user data, auth)   → SSR (force-dynamic)
User-driven interactive updates (search, filters)     → Client fetching
Write operations (forms, submissions, mutations)      → API routes
```

---

## Pattern 1 — Static Generation (SSG)

**When to use:** Sanity CMS content, service descriptions, about pages,
blog posts — anything that updates occasionally but not in real time.

Next.js App Router is static by default. No configuration needed.

```tsx
// app/programs/page.tsx — static by default
import { sanityFetch } from "@/sanity/lib/client"
import { programsQuery } from "@/sanity/lib/queries"
import type { Program } from "@/types/sanity"

export default async function ProgramsPage() {
  const programs = await sanityFetch<Program[]>(programsQuery)

  if (!programs || programs.length === 0) {
    return <EmptyState message="No programs yet" />
  }

  return (
    <main>
      {programs.map(program => (
        <ProgramCard key={program._id} {...program} />
      ))}
    </main>
  )
}
```

**Revalidation — keep content fresh without rebuilding:**
```tsx
// Revalidate every 60 seconds
export const revalidate = 60

export default async function ProgramsPage() { ... }
```

---

## Pattern 2 — Server Side Rendering (SSR)

**When to use:** User-specific data, authenticated content, data that
must be fresh on every request.

Use sparingly — SSR is slower than SSG because every request hits the database.

```tsx
// app/dashboard/page.tsx
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export const dynamic = "force-dynamic" // opt into SSR explicitly

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("user_id", user.id)

  if (error) return <ErrorState message="Failed to load submissions" />
  if (!data || data.length === 0) return <EmptyState message="No submissions yet" />

  return <SubmissionsList submissions={data} />
}
```

---

## Pattern 3 — Client Side Fetching

**When to use:** Search results as you type, user-driven filters,
real-time updates, infinite scroll. NOT for initial page content.

```tsx
// SearchResults.tsx
"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase-client"

export function SearchResults() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Program[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    // Debounce — wait 300ms after typing stops
    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)

      const supabase = createClient()
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .ilike("title", `%${query}%`)

      if (error) {
        setError("Search failed. Please try again.")
      } else {
        setResults(data ?? [])
      }

      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search programs..."
        aria-label="Search programs"
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorState message={error} />}
      {!loading && results.length === 0 && query && (
        <EmptyState message="No results found" />
      )}
      {results.map(result => <ResultCard key={result.id} {...result} />)}
    </div>
  )
}
```

---

## Pattern 4 — API Routes for Mutations

**When to use:** All write operations — form submissions, newsletter
signups, contact requests, creating or updating records.

Never write to Supabase directly from a client component for sensitive operations.

```tsx
// app/api/contact/route.ts
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    // Service role key — safe here, server-side only
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Submission failed. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
```

```tsx
// ContactForm.tsx — client component calls the API route
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  async function onSubmit(data: FormData) {
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
      }

      setStatus("success")
      reset()
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      {status === "success" && <p role="alert">Message sent successfully.</p>}
      {status === "error" && <p role="alert">Failed to send. Please try again.</p>}

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}
```

---

## Sanity Specific Pattern

### Client setup — one file, used everywhere
```tsx
// /sanity/lib/client.ts
import { createClient } from "next-sanity"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
})

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {})
}
```

### Queries — all GROQ in one file
```tsx
// /sanity/lib/queries.ts
import { groq } from "next-sanity"

export const programsQuery = groq`
  *[_type == "program" && !(_id in path('drafts.**'))] {
    _id,
    title,
    description,
    slug,
    image,
    stats
  } | order(_createdAt desc)
`

export const singleProgramQuery = groq`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    description,
    body,
    image,
    stats
  }
`
```

### Image helper
```tsx
// /sanity/lib/image.ts
import imageUrlBuilder from "@sanity/image-url"
import { sanityClient } from "./client"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Usage
<Image
  src={urlFor(program.image).width(800).height(600).url()}
  alt={program.image.alt ?? program.title}
  width={800}
  height={600}
/>
```

---

## State Handling — Mandatory on Every Fetch

Every data fetch must handle all three states before rendering:

```tsx
// 1. Loading
if (loading) return <SkeletonLoader />

// 2. Error
if (error) return <ErrorState message="Failed to load content" />

// 3. Empty
if (!data || data.length === 0) return <EmptyState message="Nothing here yet" />

// 4. Success — only now render
return data.map(item => <Card key={item.id} {...item} />)
```

### Next.js loading and error files — use for server components
```
app/
  programs/
    page.tsx          → the page
    loading.tsx       → shown automatically while page.tsx fetches
    error.tsx         → shown automatically if page.tsx throws
```

```tsx
// app/programs/loading.tsx
export default function ProgramsLoading() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-48 bg-gray-200 rounded-lg" />
      ))}
    </div>
  )
}
```

---

## Supabase Client Setup

```tsx
// /lib/supabase-client.ts — for client components (anon key)
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## HTTP Status Codes for API Routes

```
200 → success
400 → validation error (bad input from client)
401 → unauthorised (not logged in)
403 → forbidden (logged in but not allowed)
404 → not found
500 → server error (database failure, unexpected error)
```

---

## Forbidden Patterns

- Never fetch Supabase data in client components for initial render
- Never write inline GROQ queries outside `queries.ts`
- Never access `.asset.url` on Sanity images — always use `urlFor()`
- Never use `SUPABASE_SERVICE_ROLE_KEY` in client components
- Never render data without null and empty check first
- Never skip error handling on any async operation