# Project Overview

## Basic Information

| Field | Value |
|---|---|
| Project name | Ostendere |
| Client | Daniel Cofie |
| Domain | ostendere.com (to be purchased Sprint 3 — ostendere.vercel.app used for Sprints 0–2) |
| Project type | Premium menswear brand presence website |
| Purpose | Portfolio showcase and lead generation for a premium menswear and bespoke fashion design studio |
| Primary audience | Working professionals and executives (25–45), wedding and event clients, fashion-forward creatives, corporate organisations, high-net-worth individuals |
| Secondary audience | International fashion audience — Instagram referral traffic (predominantly mobile) |
| Started | 27/05/2026 |
| Target launch | 25/06/2026 |
| Delivered | [to be filled on handoff] |

---

## Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 16 | App Router — single-page, all sections on homepage |
| Language | TypeScript | Latest stable | Strict mode always |
| Styling | Tailwind CSS | Latest stable | Utility-first |
| 3D / Parallax | Three.js | Latest stable | Hero scene, section transition parallax — lazy loaded always |
| Animation | Framer Motion | Latest stable | Section animations, menu overlay parallax reveal |
| Animation | Lenis | Latest stable | Smooth scroll throughout — only scroll library used |
| Animation | tailwindcss-animate | Latest stable | Simple UI states |
| CMS | Sanity v5 | Latest stable | Hosted Studio — Daniel manages lookbook content independently |
| Database | Supabase | Phase 3 only | Client consultation portal — not in Phase 1 or Phase 2 |
| Auth | Supabase Auth | Phase 3 only | Client portal auth — not in Phase 1 or Phase 2 |
| Forms | react-hook-form + zod | Latest stable | Contact enquiry form |
| Icons | lucide-react | Latest stable | Only icon library |
| Deployment | Vercel | — | Auto-deploy on push to main and staging |
| Package manager | npm | — | Linux (Ubuntu/Debian) |
| Node.js | LTS | — | Managed via nvm — see .nvmrc |

---

## Sanity CMS Configuration

**Project ID:** [to be filled after Sanity project created in Sprint 0]
**Dataset:** production
**Studio URL:** [to be filled after `npx sanity deploy` in Sprint 0]

### Content Types (Schemas)

| Schema | Type | Description |
|---|---|---|
| look | document | Individual lookbook entry — title, category (suit / accessory / bespoke), photos[], video (optional), featured (boolean), date |
| service | document | Service offering — name, description, display order |
| about | document | Daniel's bio, craft philosophy, portrait image |
| siteSettings | document | Global settings — tagline, contactEmail, social links (Instagram, WhatsApp) |

> All GROQ queries must live in `/sanity/lib/queries.ts` — never inline.
> All lookbook images served from Sanity CDN via `urlFor()` — never from `/public`.

---

## Supabase Configuration

> **Phase 3 only — Client Consultation Portal.**
> Supabase is not used in Phase 1 (brand presence) or Phase 2 (e-commerce).
> Do not add Supabase code, clients, or environment variables to the project until Phase 3 begins.

---

## Third Party Integrations

| Service | Purpose | Notes |
|---|---|---|
| Vercel Analytics | Page view tracking — lightweight, no GDPR complexity | Enabled in Vercel dashboard — no manual env var required |
| Google Drive | Photography source — images downloaded, optimised, uploaded to Sanity | Workflow only — not a code integration |

> **Phase 2 addition (E-commerce):**
> Paystack — Ghana payment gateway for ready-to-wear and accessories. Not in Phase 1.

---

## Security Architecture

### Attack Surface (Phase 1)

| Surface | Risk Level | Mitigation |
|---|---|---|
| Contact form | High — sole user-input surface | Zod validation, rate limiting (3/IP/hour), honeypot, timestamp check |
| Next.js API route `/api/contact` | High — processes input, forwards email | Server-side validation, input sanitisation, rate limiting, generic errors |
| Sanity Studio `studio.ostendere.com` | Medium — CMS access | Sanity authentication, single authorised user, locked CORS origins |
| Three.js / client-side bundle | Low | Bundled via npm (no external CDN), audited every sprint |
| Vercel environment variables | Critical if exposed | No `NEXT_PUBLIC_` on secrets, `.env.local` never committed |
| Sanity CDN | Low — public read only | Read-only, no write access from public site |

### Contact Form

- Zod schema validates all fields server-side: name (max 100), email (valid format), message (max 2000), phone (optional, Ghana format `+233` or `0XX`)
- Rate limiting: 3 submissions per IP per hour — overrides the base standard of 5 per minute
- Honeypot field (`_honeypot`): if filled, return 200 silently without sending email — bot never learns it was blocked
- Timestamp check: submissions arriving faster than 3 seconds after page load are silently blocked
- `DANIEL_CONTACT_EMAIL` is server-side only — never prefixed with `NEXT_PUBLIC_`
- All user input sanitised before inclusion in email body — HTML stripped, no raw user strings
- `Reply-To` set to the user's submitted email so Daniel can reply directly
- Generic error messages only returned to client — no stack traces, provider errors, or internal details ever

### Sanity Studio

- Studio hosted at `studio.ostendere.com` — a separate subdomain, never a route on `ostendere.com`
- Protected by Sanity's own authentication — Daniel's account is the only authorised user
- CORS origins locked in Sanity dashboard: `ostendere.com`, `staging.ostendere.com`, `localhost:3000` only — no wildcard `*`
- `SANITY_API_TOKEN` is server-side only (read token for ISR) — never `NEXT_PUBLIC_`
- Public read uses `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` only — safe to expose

### Security Headers

Configured in `next.config.js` and applied to all routes. Full CSP in `.claude/standards/12-security.md`:
- `Content-Security-Policy` — `script-src 'self'` only (Three.js bundled, never loaded from CDN), Sanity CDN whitelisted for images and media
- `X-Frame-Options: DENY` — site cannot be embedded in an iframe
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Data Privacy

- No personal data stored in Phase 1 — contact submissions emailed directly, never written to a database
- No cookies beyond Vercel Analytics, which is cookieless by default
- No third-party tracking scripts in Phase 1
- Footer note required: "We do not store your personal data"

---

## Audience and Context

**Is this a dual-audience site?** Aspirationally international, Ghana-based primary

- **Local audience:** Ghana-based executives, professionals, wedding and event clients, corporate organisations
- **International audience:** Fashion-forward creatives and high-net-worth individuals worldwide — especially from Instagram

**Currency display:** Not applicable in Phase 1 (no e-commerce). GHS + USD in Phase 2.
**Language tag:** `en` — international-facing (per standard, `en-GH` is for Ghanaian-primary only)
**Phone format:** Not displayed on site in Phase 1

> Primary traffic source: Instagram → site → validate brand → contact Daniel.
> The site must communicate world-class trust within 10 seconds of landing.
> Mobile-first is critical — Instagram traffic is predominantly mobile.

---

## Project-Specific Rules

Rules specific to Ostendere that extend or override the ApexSource standard:

- Three.js hero scene must be dynamically imported — never block the initial page render or LCP
- All parallax and smooth scroll effects run through Lenis exclusively — never use any other scroll library or native scroll events alongside Lenis
- Navigation is an animated Celtic SVG trigger at the bottom-centre of statement sections. On click it opens a full-screen menu overlay with Framer Motion parallax reveal. There is no traditional Navbar component.
- All lookbook images served from Sanity CDN exclusively via `urlFor()` — never stored in or served from `/public`
- Video loops in the lookbook are lazy loaded via Intersection Observer — never autoplaying on page load
- No Supabase, Paystack, Resend, or authentication of any kind in Phase 1. Flag and reject any code suggestion that introduces these.
- Logo asset is client-provided — never recreate, resize, or modify `/public/images/logo.png`
- `lang="en"` on the root layout always — international audience
- Sanity content uses ISR with `revalidate` — content updates must appear without a full redeploy
- `next-sitemap` for automatic sitemap generation — configured in Sprint 3
- Vercel Analytics only — no Google Analytics, no Tag Manager, no other third-party scripts in Phase 1

---

## Key Contacts

| Role | Name | Contact |
|---|---|---|
| Client primary | Daniel Cofie | [to be confirmed] |
| ApexSource lead | Naa | naa@apexsourceventures.com |
