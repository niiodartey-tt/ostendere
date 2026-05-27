# 03 — Styling Rules

## Core Principle

Tailwind CSS only. No inline styles except for dynamic runtime values
that cannot be expressed as Tailwind classes. No CSS-in-JS libraries.
No custom CSS unless absolutely necessary.

---

## The Rule

```
✅ Tailwind classes always
✅ Inline style only for dynamic runtime values
❌ style={{ }} for layout, spacing, colour, or typography
❌ styled-components, emotion, or any CSS-in-JS
❌ Custom CSS files except globals.css for base styles
```

---

## Acceptable Inline Style Exceptions

Only these two cases justify inline styles:

**1. Dynamic runtime values Tailwind cannot know at build time:**
```tsx
// Width calculated from JavaScript at runtime
<div style={{ width: `${progressPercentage}%` }}>

// Height determined by measured DOM element
<div style={{ height: `${measuredHeight}px` }}>
```

**2. CSS custom properties set dynamically:**
```tsx
// Animation duration controlled by props
<div style={{ '--animation-duration': `${speed}ms` }}>
```

Everything else — layout, spacing, colour, typography, borders,
shadows, transitions — uses Tailwind.

---

## Tailwind Class Ordering

Always order classes consistently within every element:

```
Layout → Spacing → Typography → Colour → Border → Animation → State
```

Example:
```tsx
className="flex flex-col gap-4 px-6 py-4 text-lg font-medium
           text-gray-900 bg-white border border-gray-200
           rounded-lg transition-all duration-200
           hover:bg-gray-50 focus:outline-none focus-visible:ring-2"
```

---

## The cn() Utility — Always Use for Conditional Classes

Never build className strings manually with template literals.
Always use the `cn()` utility from `clsx` + `tailwind-merge`:

```tsx
// Install once per project
npm install clsx tailwind-merge

// /lib/utils.ts — create this file once
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```tsx
// Usage — clean conditional classes
import { cn } from "@/lib/utils"

<button
  className={cn(
    "px-4 py-2 rounded-lg font-medium transition-colors",
    variant === "primary" && "bg-primary text-white hover:bg-primary/90",
    variant === "outline" && "border border-primary text-primary hover:bg-primary/10",
    disabled && "opacity-50 cursor-not-allowed",
    className  // always accept external className prop on primitives
  )}
>
```

```tsx
// WRONG — never do this
className={`px-4 py-2 ${variant === "primary" ? "bg-primary" : "bg-white"}`}
```

---

## Tailwind Configuration

### Colour tokens — define once in tailwind.config.js
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1A1A2E",
        accent: "#E94560",
        // Add project-specific colours here
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

Always use colour tokens in classes — never hardcode hex in className:
```tsx
✅ className="bg-primary text-accent"
❌ className="bg-[#1A1A2E] text-[#E94560]"
```

Arbitrary values `bg-[#hex]` are acceptable only for one-off values
not worth adding to the config.

---

## globals.css — Minimal Base Styles Only

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Only truly global base styles here */
  html {
    scroll-behavior: smooth; /* Lenis overrides this — fine to keep */
  }

  * {
    box-sizing: border-box;
  }

  /* Custom scrollbar — optional per project */
  ::-webkit-scrollbar {
    width: 6px;
  }
}
```

Never put component styles in globals.css.
Never use `@apply` to recreate Tailwind classes elsewhere.

---

## Dark Mode

If the project requires dark mode, configure in tailwind.config.js:
```js
darkMode: "class", // toggled by adding .dark to <html>
```

Always use paired dark classes:
```tsx
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
```

---

## Never Do

- `style={{ padding: '16px' }}` — use `className="p-4"`
- `style={{ color: 'red' }}` — use `className="text-red-500"`
- `style={{ display: 'flex' }}` — use `className="flex"`
- Manual string concatenation for conditional classes
- Import CSS modules for component styles
- Use `!important` — fix specificity issues with Tailwind utilities instead