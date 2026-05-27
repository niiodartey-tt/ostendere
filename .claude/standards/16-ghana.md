# 16 — Ghana-Specific Standards

## Core Principle

ApexSource is a Ghanaian firm building for Ghanaian clients and their
audiences. Some clients also serve international audiences. Claude must
apply Ghanaian formatting standards by default and be aware of when
dual-audience formatting is required.

---

## Date Formatting

```
✅ Correct:   12 January 2026
✅ Correct:   12 Jan 2026 (abbreviated)
❌ Wrong:     01/12/2026 (ambiguous — MM/DD or DD/MM?)
❌ Wrong:     January 12, 2026 (American format)
❌ Wrong:     2026-01-12 (ISO — use only in code/APIs, not display)
```

### In code — use date-fns
```tsx
import { format } from "date-fns"

// Display format for Ghanaian audience
format(new Date(dateString), "d MMMM yyyy")   // "12 January 2026"
format(new Date(dateString), "d MMM yyyy")    // "12 Jan 2026"

// Never display raw ISO strings to users
// "2026-01-12T00:00:00.000Z" — never show this
```

### JSDoc utility function
```tsx
/**
 * Formats a date for display in Ghanaian context
 * @param date - ISO date string or Date object
 * @returns Formatted string e.g. "12 January 2026"
 */
export function formatGhanaDate(date: string | Date): string {
  return format(new Date(date), "d MMMM yyyy")
}
```

---

## Currency

```
Symbol:   GH₵ (Ghana Cedi)
Code:     GHS
Format:   GH₵ 1,500.00
          GH₵ 250,000
```

```tsx
// Currency formatting utility
export function formatCedi(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    currencyDisplay: "symbol",
  }).format(amount)
  // Returns: "GH₵1,500.00"
}

// For dual-audience sites showing both currencies
export function formatDualCurrency(ghs: number, usd: number): string {
  return `GH₵${ghs.toLocaleString()} (USD ${usd.toLocaleString()})`
}
```

Never assume dollar currency. Always clarify with client which
currency to display. For Erano — GHS. For international-facing
sections of IHR — may need both.

---

## Phone Numbers

```
International format:  +233 XX XXX XXXX
Local format:          0XX XXX XXXX

Examples:
+233 24 445 1806   (international — for international audiences)
024 445 1806       (local — for Ghanaian audiences)
```

```tsx
// Phone number display utility
export function formatGhanaPhone(phone: string, format: "local" | "international" = "international"): string {
  // Strip all non-digits
  const digits = phone.replace(/\D/g, "")

  // Handle both +233 and 0 prefixed numbers
  const number = digits.startsWith("233")
    ? digits.slice(3)
    : digits.startsWith("0")
    ? digits.slice(1)
    : digits

  if (format === "international") {
    return `+233 ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`
  }

  return `0${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`
}
```

For contact pages visible to international audiences — always use
international format with `+233`.

---

## Time Zone

```
Zone:    Africa/Accra
Offset:  GMT+0 (no daylight saving — always GMT+0)
```

```tsx
// Always specify timezone when displaying times
import { formatInTimeZone } from "date-fns-tz"

export function formatGhanaTime(date: string | Date): string {
  return formatInTimeZone(new Date(date), "Africa/Accra", "h:mm a")
  // Returns: "9:30 AM"
}

// For event times on Hopefront or IHR events pages
export function formatEventDateTime(date: string | Date): string {
  return formatInTimeZone(
    new Date(date),
    "Africa/Accra",
    "d MMMM yyyy 'at' h:mm a 'GMT'"
  )
  // Returns: "12 January 2026 at 9:30 AM GMT"
}
```

---

## Address Format

```
Format:   House number, Street name, Area/Neighbourhood, City, Region

Examples:
Hse #359/1, Nii Nortey Omaboe St, Osu, Accra, Greater Accra
GI-449-1284, Spintex Road, Spintex, Accra, Greater Accra
```

```tsx
interface GhanaAddress {
  houseNumber?: string
  street: string
  area: string
  city: string
  region: string
}

export function formatGhanaAddress(address: GhanaAddress): string {
  const parts = [
    address.houseNumber,
    address.street,
    address.area,
    address.city,
    address.region + ", Ghana",
  ].filter(Boolean)

  return parts.join(", ")
}
```

---

## HTML Language Attribute

```tsx
// app/layout.tsx
// Use en-GH for sites primarily serving Ghanaian audience
<html lang="en-GH">

// Use en for international-facing sites
<html lang="en">

// Current client sites:
// Erano — en-GH (Ghanaian business clients)
// IHR Ghana — en-GH (with awareness of international clients)
// Hopefront — en-GH (with awareness of international donors)
// ApexSource — en (global audience)
```

---

## Dual Audience Awareness

Some ApexSource client sites serve both local Ghanaian and
international audiences simultaneously. This applies to:

- **IHR Ghana** — local corporate clients + potential international investors
- **Erano** — local SMEs + embassies and multinational companies
- **Hopefront** — local community + international donors in UK, US, Europe

### For dual-audience sites

```tsx
// Show both currencies where relevant
<p>
  Annual retainer from <strong>GH₵ 12,000</strong>{" "}
  <span className="text-muted-foreground">(approx. USD 800)</span>
</p>

// Phone numbers in international format
<a href="tel:+233244451806">+233 24 445 1806</a>

// Dates in unambiguous long format
<time dateTime="2026-01-12">12 January 2026</time>

// Content clear to both audiences
// Avoid Ghanaian-only jargon without explanation
// Avoid overly Western references without context
```

---

## Ghanaian Cultural Considerations

### Language and tone
- Ghanaian professional communication tends to be formal and respectful
- Titles matter — "Managing Director", "Principal Consultant" — use them
- Relationship language is valued — "trusted partner", "we work alongside you"
- Direct but warm — not cold corporate language

### Content for IHR Ghana specifically
- Adinkra symbols are meaningful — each is permanently assigned to a value
- Never use Adinkra symbols decoratively without meaning
- The Akan leadership philosophy referenced in copy is authentic — maintain it
- "Glocal" mindset (global standards + local knowledge) is a core IHR concept

### Content for Hopefront specifically
- All child stories shared with full consent — note this on the site
- Use first names only for children — never full names
- Avoid poverty tourism language — focus on dignity and agency
- Measurable impact language — specific numbers, not vague claims

### Content for Erano specifically
- ICAG, GRA, CITG, SSNIT, PPA — these are real Ghanaian regulatory bodies
- Always spell out acronyms on first use for international audiences
- GRA = Ghana Revenue Authority
- ICAG = Institute of Chartered Accountants Ghana
- SSNIT = Social Security and National Insurance Trust
- RGD = Registrar General's Department

---

## Common Formatting Mistakes to Avoid

```
❌ "January 12, 2026" — use "12 January 2026"
❌ "$1,500" — use "GH₵ 1,500" unless explicitly USD
❌ "(233) 024-445-1806" — use "+233 24 445 1806"
❌ "9:30 AM EST" — use "9:30 AM GMT" (Accra is always GMT+0)
❌ Ambiguous date "01/12/26" — always use the long format
❌ Placeholder lorem ipsum in any Ghanaian cultural section
❌ Stock photos of non-African people on Ghana-focused sites
```