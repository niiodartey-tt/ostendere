# 08 — Accessibility (WCAG 2.1 AA)

## Core Principle

All ApexSource sites must meet WCAG 2.1 AA. This is non-negotiable
and applies to every component. Accessibility affects SEO rankings,
international client trust, and user experience for everyone.

A site must be:
- **Perceivable** — users can see or hear the content
- **Operable** — users can navigate using keyboard or assistive tech
- **Understandable** — content and interactions make sense
- **Robust** — works across browsers and assistive technologies

---

## Rule 1 — Semantic HTML

Use the right HTML element for the right job. Never wrap everything in divs.

```tsx
// WRONG
<div onClick={handleClick}>
  <div className="text-2xl">Our Services</div>
  <div>We offer three services...</div>
  <div onClick={navigateToServices}>Learn more</div>
</div>

// CORRECT
<section aria-labelledby="services-heading">
  <h2 id="services-heading">Our Services</h2>
  <p>We offer three services...</p>
  <a href="/services">Learn more</a>
</section>
```

### Correct element usage

```
<header>      → site header, contains nav and logo
<nav>         → navigation links
<main>        → primary page content — one per page
<section>     → thematic grouping of content
<article>     → self-contained content (blog post, card)
<aside>       → supplementary content (sidebar)
<footer>      → site footer
<h1>–<h6>    → headings in correct hierarchy
<button>      → clickable actions that do something
<a>           → navigation to a URL
<ul> / <ol>  → lists
<figure>      → image with caption
<figcaption>  → caption for a figure
```

### Button vs anchor — critical distinction

```tsx
// Use <a> when navigating somewhere
<a href="/services">View Services</a>

// Use <button> when performing an action
<button onClick={openModal}>Book Consultation</button>

// WRONG — div as a button (keyboard users cannot use this)
<div onClick={handleClick}>Click me</div>
```

---

## Rule 2 — Heading Hierarchy

Every page must have exactly one `<h1>`. Headings flow in order.
Never skip a level. Never use headings for visual sizing.

```tsx
// WRONG — skipped heading levels
<h1>Hopefront Foundation</h1>
<h3>Our Programs</h3>      // skipped h2
<h5>Children's Health</h5> // skipped h4

// CORRECT — logical hierarchy
<h1>Hopefront Foundation</h1>
  <h2>Our Programs</h2>
    <h3>Children's Health</h3>
    <h3>Education Support</h3>
    <h3>Community Engagement</h3>

// WRONG — heading used for visual size only
<h4 className="text-4xl">Big visual text</h4>

// CORRECT — use p with Tailwind for visual sizing
<p className="text-4xl font-bold">Big visual text</p>
```

---

## Rule 3 — Image Alt Text

Every image needs a meaningful `alt` attribute.

```tsx
// WRONG — no alt
<Image src={hero} width={1200} height={600} />

// WRONG — meaningless alt
<Image src={hero} alt="image" width={1200} height={600} />

// CORRECT — describes content and context
<Image
  src={hero}
  alt="Children at a Hopefront Foundation health outreach event in Accra"
  width={1200}
  height={600}
/>

// CORRECT — decorative images get empty alt
<Image
  src={decorativeLine}
  alt=""
  aria-hidden="true"
  width={100}
  height={4}
/>

// CORRECT — Adinkra symbols (decorative)
<Image
  src={adinkrahene}
  alt=""
  aria-hidden="true"
  width={80}
  height={80}
/>
```

### Alt text by image type

```
Client photos         → "Rosemary Amarh-Kwantreng, Managing Director at IHR Ghana"
Service images        → "Professional HR advisory meeting in Accra"
Client logos          → "Access Bank logo"
Icons with function   → handled via aria-label on parent button
Decorative images     → alt="" aria-hidden="true"
Adinkra symbols       → alt="" aria-hidden="true"
```

---

## Rule 4 — Colour Contrast

```
Normal text (below 18px):   4.5:1 contrast ratio minimum
Large text (18px+ or bold): 3:1 contrast ratio minimum
UI components / focus:      3:1 minimum
```

**Never use text opacity below 80%:**
```tsx
// RISKY — may fail contrast
<p className="text-white/50">  // white at 50% opacity — fails
<p className="text-gray-400 bg-gray-100">  // check this combination

// SAFE
<p className="text-gray-900 bg-white">  // always passes
<p className="text-white bg-gray-900">  // always passes

// If muted text is needed — use darker colour at full opacity
<p className="text-gray-500">  // not text-gray-900/50
```

Verify colour combinations at: **webaim.org/resources/contrastchecker**

---

## Rule 5 — Keyboard Navigation

Every interactive element must be reachable and operable by keyboard.

```tsx
// WRONG — not keyboard accessible
<div onClick={openMenu} className="cursor-pointer">Menu</div>

// CORRECT — button is keyboard accessible by default
<button onClick={openMenu}>Menu</button>

// If you must use a non-button element as interactive
<div
  role="button"
  tabIndex={0}
  onClick={openMenu}
  onKeyDown={(e) => e.key === "Enter" && openMenu()}
>
  Menu
</div>
```

### Focus indicators — never remove

```tsx
// WRONG — removes focus ring entirely
<button className="outline-none focus:outline-none">

// CORRECT — style it but never remove it
// focus-visible shows ring for keyboard only, not mouse clicks
<button className="focus:outline-none focus-visible:ring-2
                   focus-visible:ring-primary focus-visible:ring-offset-2">
```

### Modal focus trapping
When a modal opens, focus must be trapped inside it.
Use a library like `focus-trap-react` or implement manually.
Escape key must close the modal.

---

## Rule 6 — ARIA Labels

When semantic HTML alone is not enough to communicate purpose:

```tsx
// Multiple nav elements — distinguish them
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>

// Icon-only buttons — always need label
<button aria-label="Close menu">
  <XIcon aria-hidden="true" />
</button>

// Search input
<input
  type="search"
  aria-label="Search programs"
  placeholder="Search..."
/>

// Section with heading
<section aria-labelledby="programs-heading">
  <h2 id="programs-heading">Our Programs</h2>
</section>

// Live regions — for dynamic content updates
<div aria-live="polite" aria-atomic="true">
  {formSuccessMessage}
</div>
```

---

## Rule 7 — Form Accessibility

Every input must have an associated label. Placeholder is not a label.

```tsx
// WRONG — placeholder disappears on type, not accessible
<input type="email" placeholder="Enter your email" />

// WRONG — label not associated with input
<label>Email</label>
<input type="email" />

// CORRECT — label associated via htmlFor/id
<div className="flex flex-col gap-1">
  <label htmlFor="email" className="text-sm font-medium">
    Email address
  </label>
  <input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-describedby="email-error"
    aria-invalid={!!errors.email}
    className={cn(
      "px-3 py-2 border rounded-lg",
      errors.email && "border-red-500"
    )}
  />
  {errors.email && (
    <p
      id="email-error"
      className="text-sm text-red-600"
      role="alert"
    >
      {errors.email.message}
    </p>
  )}
</div>
```

---

## Rule 8 — Reduced Motion

Some users have vestibular disorders where motion causes physical discomfort.

```tsx
// Framer Motion — built-in hook
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
/* globals.css — stop ticker for reduced motion users */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

---

## Rule 9 — Skip Navigation Link

A hidden link at the top of every page letting keyboard users skip
straight to main content — bypassing navigation they've heard many times.

```tsx
// app/layout.tsx — first element in the body, every project
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4
             focus:left-4 focus:z-50 focus:px-4 focus:py-2
             focus:bg-primary focus:text-white focus:rounded-lg"
>
  Skip to main content
</a>

// Every page.tsx
<main id="main-content">
  ...
</main>
```

---

## Rule 10 — Screen Reader Only Text

Text visible to screen readers but hidden visually:

```tsx
// Icon button with screen reader label
<button>
  <SearchIcon aria-hidden="true" className="h-5 w-5" />
  <span className="sr-only">Search the site</span>
</button>

// Additional context for screen readers
<a href="/programs/childrens-health">
  Learn more
  <span className="sr-only">about Children's Health program</span>
</a>
```

---

## Checklist Before Marking Any Component Complete

- [ ] Correct semantic HTML elements used
- [ ] Heading hierarchy correct — no skipped levels
- [ ] All images have meaningful alt text
- [ ] All icon-only buttons have aria-label
- [ ] All form inputs have associated labels via htmlFor/id
- [ ] All form errors use role="alert" and aria-describedby
- [ ] Colour contrast verified for text on backgrounds
- [ ] All interactive elements reachable by keyboard
- [ ] Focus indicators visible — not removed
- [ ] Animations respect useReducedMotion
- [ ] Skip navigation link present in layout
- [ ] Dynamic content updates use aria-live