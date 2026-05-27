# Environment Variables

> This file documents all environment variables for this project.
> Never include actual values here — variable names only.
> Actual values live in .env.local (local) and Vercel dashboard (production).

---

## Rules

- `.env.local` is never committed to Git — it is in `.gitignore`
- `.env.example` is always committed — it contains variable names with empty values
- Add new variables to this file AND `.env.example` immediately when created
- Update Vercel dashboard before deploying any new variable
- `NEXT_PUBLIC_` prefix = available in browser (client + server)
- No prefix = server only (API routes, server components)
- Never log variable values — not even in development

---

## Variable Reference — Phase 1 (Active)

### Sanity CMS

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client + Server | Sanity project ID — from Sanity dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | Client + Server | Dataset name — `production` |
| `SANITY_API_TOKEN` | Server only | Read token for server-side fetching and ISR revalidation |

### Site

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Site URL — `https://ostendere.vercel.app` for Sprints 0–2. Swap to `https://ostendere.com` at Sprint 3 when domain is connected. |

### Contact Form

| Variable | Scope | Description |
|---|---|---|
| `DANIEL_CONTACT_EMAIL` | Server only | Daniel's email address — contact enquiry submissions forwarded here. **Never** add `NEXT_PUBLIC_` prefix — this must never appear in the client bundle. |

> SMTP transport credentials (if using nodemailer) will be determined and added in Sprint 2
> when the contact form API route is built. Placeholder entries are in `.env.example`.

### Vercel Analytics

> Vercel Analytics does not require a manual environment variable.
> It is enabled in the Vercel project dashboard and via the `@vercel/analytics` package.

---

## Variable Reference — Phase 2 (Deferred — E-commerce)

> **Not needed until Phase 2.** Do not add these to the project in Phase 1.
> Do not install Paystack or any payment library until Phase 2 begins.

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Client + Server | Paystack public key |
| `PAYSTACK_SECRET_KEY` | Server only | Paystack secret key — never client-side |

---

## Variable Reference — Phase 3 (Deferred — Client Portal)

> **Not needed until Phase 3.** Do not add these to the project in Phase 1 or Phase 2.
> Do not install Supabase or any auth library until Phase 3 begins.

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Public anon key — safe for browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Bypasses RLS — never client-side, ever |

---

## .env.example Template

Copy this into `.env.example` at project root:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=

# Contact Form
DANIEL_CONTACT_EMAIL=
# SMTP transport (to be confirmed in Sprint 2)
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=
```

---

## Vercel Environment Configuration

Variables must be set in the Vercel dashboard for each environment:

| Variable | Development | Preview | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | ✅ | ✅ |
| `SANITY_API_TOKEN` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | [Vercel preview URL] | `https://ostendere.com` |
| `DANIEL_CONTACT_EMAIL` | ✅ | ✅ | ✅ |

> Pull Vercel env vars to local with: `vercel env pull .env.local`

---

## Security Notes

- `SANITY_API_TOKEN` allows server-side reads from Sanity. Server only — never expose to browser or log.
  If accidentally committed: rotate immediately in Sanity dashboard → update Vercel → update `.env.local`.
- `DANIEL_CONTACT_EMAIL` contains Daniel's personal email address. Server only — never `NEXT_PUBLIC_` prefix,
  never log the value, never include in any client-side response body.
  If accidentally exposed: Daniel must be informed immediately and the address assessed for spam risk.
- If any server-only key is accidentally committed or exposed:
  1. Rotate or change the value immediately in the relevant service
  2. Update the value in Vercel
  3. Update `.env.local`
  4. Document the incident in known-issues.md
