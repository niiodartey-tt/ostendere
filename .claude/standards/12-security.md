# 12 — Security Standard

## Core Principle

Security failures on client sites are not just technical problems —
they are professional and legal liabilities. IHR handles HR data.
Erano handles financial data. Hopefront handles donor data.
Every site is treated as if it holds sensitive information.

---

## Rule 1 — Environment Variables

### Never expose server-only keys client-side

```tsx
// WRONG — catastrophic — service role bypasses all RLS
"use client"
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY)

// CORRECT — anon key in client components
"use client"
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Service role key only in server components and API routes
// app/api/contact/route.ts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // safe — server only
)
```

### Prefix rules

```
NEXT_PUBLIC_  → available in browser (client + server)
No prefix     → server only (API routes, server components)
```

### Never do with environment variables

- Never log env var values — not even in development
- Never commit `.env.local` — it is in `.gitignore`
- Always keep `.env.example` up to date with variable names
- Never hardcode credentials anywhere in the codebase
- Add new env vars to `.env.example` immediately when created
- Update Vercel environment variables before deploying

---

## Rule 2 — Input Validation and Sanitisation

Always validate and sanitise all form input before writing to the database.
Use Zod for schema validation on all API routes.

```tsx
// app/api/contact/route.ts
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  message: z.string().min(10).max(2000).trim(),
  // Never trust the client — validate everything
})

export async function POST(request: Request) {
  const body = await request.json()

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    )
  }

  // Use result.data — not body — after validation
  const { name, email, message } = result.data
  ...
}
```

---

## Rule 3 — Never Expose Raw Errors to Client

```tsx
// WRONG — exposes internal stack trace and database info
catch (err) {
  return NextResponse.json({ error: err.message }, { status: 500 })
}

// CORRECT — log internally, return friendly message
catch (err) {
  console.error("Contact form error:", err) // internal log only
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 }
  )
}
```

---

## Rule 4 — Rate Limiting on Public API Routes

All public API routes must have rate limiting to prevent abuse.

```tsx
// Simple in-memory rate limiting (use Upstash Redis for production)
// app/api/contact/route.ts

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 }) // 1 minute window
    return true
  }

  if (limit.count >= 5) return false // max 5 requests per minute

  limit.count++
  return true
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }
  ...
}
```

For production use Upstash Redis with the `@upstash/ratelimit` package.

---

## Rule 5 — Authentication — Always Verify Server-Side

Never trust client-side authentication state for protected operations.

```tsx
// WRONG — client can manipulate this
"use client"
if (isLoggedIn) {
  // show protected content
}

// CORRECT — verify server-side on every request
// app/dashboard/page.tsx (server component)
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(...)

  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user || error) {
    redirect("/login") // not authenticated — redirect
  }

  // Now safe to show protected content
  return <Dashboard user={user} />
}
```

---

## Rule 6 — Content Security Policy

Add CSP headers in `next.config.js` for every project:

```js
// next.config.js
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## Rule 7 — Sensitive Data Handling

```tsx
// Never log sensitive data — not even in development
console.log("User:", user) // WRONG if user contains email/name
console.log("Form data:", formData) // WRONG — may contain passwords

// Log only what is necessary for debugging
console.log("Form submission received for user:", user.id) // ID only — safe
console.error("Submission failed:", error.code) // error code only — safe

// Never include sensitive data in error messages returned to client
// Never store passwords — use Supabase Auth which handles this
// Never store card numbers — use a payment processor (Paystack, Stripe)
```

---

## Rule 8 — Dependency Security

```bash
# Run before every sprint merge
npm audit

# Required results before merge
# found 0 vulnerabilities ✅

# If vulnerabilities found
npm audit fix

# If npm audit fix breaks something
# Document the vulnerability in known-issues.md
# Assess actual risk before accepting
```

Zero critical vulnerabilities allowed before merging to main.
Zero high vulnerabilities allowed before merging to main.
Medium and low — document and monitor.

---

## Rule 9 — CORS

Never use wildcard CORS in production.

```tsx
// app/api/contact/route.ts
export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const allowedOrigins = [
    "https://hopefrontfoundation.org",
    "https://www.hopefrontfoundation.org",
    // development only
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
  ].filter(Boolean)

  if (!allowedOrigins.includes(origin ?? "")) {
    return new Response("Forbidden", { status: 403 })
  }
  ...
}
```

---

## Rule 10 — Supabase Row Level Security

Always enable RLS on every Supabase table.
Never disable RLS to solve a data access problem — write a proper policy.

```sql
-- Enable RLS on every table
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Public read access (for public content)
CREATE POLICY "Public can read programs"
ON programs FOR SELECT
TO anon
USING (true);

-- Authenticated write access
CREATE POLICY "Authenticated users can insert contact submissions"
ON contact_submissions FOR INSERT
TO anon  -- allow anon for public contact forms
WITH CHECK (true);
```

Document which tables have RLS and what policies apply
in `.claude/project/overview.md`.

---

## Security Checklist — Every Project

- [ ] `.env.local` in `.gitignore`
- [ ] `.env.example` committed with all variable names
- [ ] `SUPABASE_SERVICE_ROLE_KEY` never in client components
- [ ] All API routes validate input with Zod
- [ ] Raw errors never returned to client
- [ ] Rate limiting on all public API routes
- [ ] Authentication verified server-side for protected routes
- [ ] Security headers configured in `next.config.js`
- [ ] RLS enabled on all Supabase tables
- [ ] `npm audit` — zero critical/high vulnerabilities
- [ ] No hardcoded credentials anywhere in codebase
- [ ] No sensitive data in console logs

---

## Project-Specific: Ostendere

> These rules apply to Ostendere Phase 1. Where they conflict with a base rule above,
> the Ostendere rule takes precedence. Read this section for any task touching the
> contact form API route, security headers, or Sanity configuration.

---

### Contact Form — Full Validation Schema

```tsx
// app/api/contact/route.ts
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: z.string().email("Valid email required").toLowerCase().trim(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000).trim(),
  phone: z
    .string()
    .regex(
      /^(\+233|0)[0-9]{9}$/,
      "Phone must be Ghanaian format (+233XXXXXXXXX or 0XXXXXXXXX)"
    )
    .optional()
    .or(z.literal(""))
    .transform(v => v || undefined),
  _honeypot: z.string().max(0).optional(),
  _timestamp: z.number().optional(),
})
```

---

### Rate Limiting — Ostendere Override

> **Overrides base Rule 4.** The base standard allows 5 requests per minute.
> Ostendere uses **3 submissions per IP per hour** — appropriate for a low-volume
> premium enquiry form where any automated abuse is unacceptable.

```tsx
const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3_600_000 }) // 1-hour window
    return true
  }

  if (limit.count >= 3) return false // max 3 per hour
  limit.count++
  return true
}
```

---

### Honeypot Field — Silent Block

Return 200 silently. Never reveal to the bot that it was blocked.

```tsx
// Check before Zod validation and before any other processing
if (body._honeypot) {
  return NextResponse.json({ success: true }) // silent — bot never learns
}
```

---

### Timestamp Check — Bot Detection

```tsx
// Reject submissions that arrive faster than 3 seconds after page load
const timeElapsed = Date.now() - (body._timestamp ?? 0)

if (timeElapsed < 3000) {
  return NextResponse.json({ success: true }) // silent — do not reveal the check
}
```

---

### Email Forwarding — Correct Pattern

```tsx
// CORRECT — server-side only env var, never NEXT_PUBLIC_
const danielEmail = process.env.DANIEL_CONTACT_EMAIL!

// CORRECT — fixed sender address, user email as Reply-To
const emailData = {
  from: "noreply@ostendere.com",    // never user's submitted email as From
  to: danielEmail,
  replyTo: data.email,              // Daniel can reply directly to enquirer
  subject: `New enquiry — ${data.name}`,
  text: [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone ?? "Not provided"}`,
    ``,
    `Message:`,
    `${data.message}`,
    ``,
    `---`,
    `Submitted: ${new Date().toISOString()}`,
    `IP: ${ip}`,
  ]
    .join("\n")
    .replace(/<[^>]*>/g, ""),       // strip any HTML before including in email
}

// WRONG — never use submitted email as From address
// from: data.email
```

---

### Content Security Policy — Ostendere Headers

> **Replaces** the generic CSP in base Rule 6. Use this exact configuration in `next.config.js`.
> Three.js must be bundled via npm — never loaded from an external CDN.

```js
// next.config.js
const cspHeader = [
  "default-src 'self'",
  "script-src 'self'",                          // Three.js bundled — never CDN
  "style-src 'self' 'unsafe-inline'",           // required for Tailwind
  "img-src 'self' cdn.sanity.io data: blob:",   // Sanity images + data URIs
  "media-src 'self' cdn.sanity.io",             // Sanity video loops
  "connect-src 'self' api.sanity.io cdn.sanity.io",
  "frame-ancestors 'none'",                     // no iframing of any kind
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]
```

---

### Three.js Security Rules

- Install Three.js via npm only: `npm install three @types/three` — never from an external CDN
- No user-controlled input may be passed into any Three.js scene, shader, or geometry parameter
- No `eval()` or `new Function()` anywhere in the codebase
- Always dynamically import Three.js components: `dynamic(() => import("@/components/three/HeroScene"), { ssr: false })`

---

### Sanity CORS Configuration

In the Sanity dashboard (manage.sanity.io → project → API → CORS Origins), allow only:

```
https://ostendere.com
https://www.ostendere.com
https://staging.ostendere.com
http://localhost:3000
```

Never add a `*` wildcard. Remove any default wildcard Sanity adds on project creation.
No credentials (cookies) should be allowed on CORS origins unless specifically required.

---

### Data Privacy — Phase 1

- No personal data written to any database in Phase 1 — contact submissions emailed directly
- Vercel Analytics is cookieless by default — no consent banner required
- No third-party scripts, pixels, or tracking libraries on the site in Phase 1
- Footer must include: "We do not store your personal data"
- If any cookie or tracking pixel is added in a future phase, a GDPR-compliant consent banner becomes mandatory

---

### Ostendere Pre-Launch Security Checklist — Sprint 3

Run every item before merging to main for production deploy:

- [ ] `npm audit` — zero high or critical vulnerabilities
- [ ] Security headers verified at securityheaders.com — A or A+ rating
- [ ] No secrets in git history: `git log --all --full-history -- .env*`
- [ ] `DANIEL_CONTACT_EMAIL` not in client bundle — check `.next/static/` output
- [ ] Contact form rate limiting verified — 4th submission within 1 hour is blocked
- [ ] Honeypot field verified — form with `_honeypot` filled returns 200, Daniel receives no email
- [ ] Form validation tested with malicious input: SQL injection, HTML tags, `<script>` tags, empty fields
- [ ] Sanity CORS origins locked — only allowed domains, no wildcard
- [ ] `studio.ostendere.com` requires Sanity login — content inaccessible without authentication
- [ ] `X-Frame-Options: DENY` confirmed — site cannot be embedded in an iframe
- [ ] Lighthouse security audit on production Vercel preview URL
- [ ] Vercel deployment logs reviewed — no secrets or sensitive values in build output