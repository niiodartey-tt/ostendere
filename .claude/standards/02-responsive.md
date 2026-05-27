# 02 — Responsive Design & Mobile

## Core Principle

Mobile-first always. Every component is built for mobile first,
then scaled up to larger screens. Never build desktop first and shrink down.

---

## Tailwind Breakpoint System

```
Default (no prefix) → mobile:  0px – 639px
sm:                 → small:   640px and up
md:                 → medium:  768px and up
lg:                 → large:   1024px and up
xl:                 → xlarge:  1280px and up
```

---

## Rules — Apply to Every Component

### Layout
- Always start with the mobile layout, then scale up with breakpoint prefixes
- Grid columns must stack on mobile, expand on larger screens
  ```
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  ```
- Flex layouts must wrap on mobile
  ```
  flex flex-wrap md:flex-nowrap
  ```
- Never use fixed widths on layout containers — use `w-full` and `max-w-*`

### Spacing
- Padding and margin must scale — tighter on mobile, generous on desktop
  ```
  px-4 md:px-8 lg:px-16
  py-12 md:py-20 lg:py-28
  ```

### Typography
- Font sizes must scale — smaller on mobile, larger on desktop
  ```
  text-2xl md:text-4xl lg:text-6xl
  text-base md:text-lg
  ```
- Line height and letter spacing adjust at breakpoints where needed

### Navigation
- Every site must have a mobile hamburger menu
- Desktop nav hidden on mobile: `hidden md:flex`
- Mobile nav hidden on desktop: `flex md:hidden`
- Mobile menu must be fully accessible — keyboard navigable, focus trapped when open

### Images
- Always use responsive sizing with the `sizes` prop
  ```tsx
  sizes="(max-width: 768px) 100vw, 50vw"
  ```
- Never use fixed pixel widths on images
- Hero images use `fill` with a relative parent container

### Touch Targets
- All interactive elements minimum 44px height on mobile
- Buttons and links must have sufficient padding for touch
  ```
  min-h-[44px] px-4 py-3
  ```

### Overflow
- No horizontal scrolling on any screen size — ever
- Check `overflow-x-hidden` is set on root layout if needed
- Scrolling tickers use `overflow-hidden` on the container

---

## Test Breakpoints Before Marking Any Task Complete

Test every component at these sizes before marking done:

| Size | Device |
|---|---|
| 375px | iPhone SE / small phones |
| 390px | iPhone 14 |
| 768px | iPad |
| 1280px | Desktop |

**How to test in Chrome:**
1. Right click → Inspect
2. Click the phone/tablet icon in DevTools
3. Select device preset or enter custom width
4. Scroll through every section

---

## Mobile Performance

- `sizes` prop on all images — mobile receives a smaller file
- Animation complexity reduced via `useReducedMotion`
- Heavy below-fold sections dynamically imported
- Never load desktop-only resources on mobile

---

## Common Mistakes to Avoid

- Using `px-8` without a mobile-first `px-4` — always define mobile first
- Fixed pixel widths on containers — use percentages or `max-w-*`
- Forgetting `md:hidden` / `hidden md:flex` pairs on nav elements
- Images without `sizes` prop — causes oversized files on mobile
- Touch targets under 44px — buttons that are hard to tap on phones
- Horizontal overflow from wide elements — always check on 375px