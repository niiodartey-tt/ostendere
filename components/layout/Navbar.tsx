'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Suiting',     href: '#suits' },
  { label: 'The Edit',    href: '#packages' },
  { label: 'Accessories', href: '#accessories' },
  { label: 'Squares',     href: '#squares' },
  { label: 'GRWM',        href: '#grwm' },
  { label: 'Atelier',     href: '#about' },
]

/* Map every tracked section to its nearest nav link href */
const SECTION_NAV_MAP: Record<string, string> = {
  suits:       '#suits',
  packages:    '#packages',
  accessories: '#accessories',
  pins:        '#accessories',
  squares:     '#squares',
  watches:     '#squares',
  grwm:        '#grwm',
  lookbook:    '#about',
  about:       '#about',
  bespoke:     '#about',
}

const SECTION_IDS = Object.keys(SECTION_NAV_MAP)

export function Navbar() {
  const [stuck, setStuck] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const sentinelRef = useRef<HTMLDivElement>(null)

  /* Scroll-stuck state */
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(!(entry?.isIntersecting ?? true)),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Active section tracking — fires when a section enters the upper-middle viewport band */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(SECTION_NAV_MAP[entry.target.id] ?? '')
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 left-0 h-px w-full pointer-events-none" aria-hidden="true" />

      <nav
        aria-label="Main navigation"
        className={cn(
          'fixed inset-x-0 top-0 z-[100] flex items-center justify-between',
          'px-[clamp(24px,5vw,72px)] transition-[background,padding,border-color] duration-500',
          stuck
            ? 'py-4 bg-[rgba(20,15,11,0.72)] backdrop-blur-[18px] border-b border-line-soft'
            : 'py-[26px] border-b border-transparent',
        )}
      >
        {/* Brand */}
        <a href="#top"
          className="flex items-center gap-[14px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40"
          aria-label="Ostendere home">
          <Image src="/images/mark-cream.png" alt="" width={34} height={34} className="w-auto h-[34px]" priority />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, letterSpacing: '0.42em', paddingLeft: '0.42em', color: '#ece3d2' }}>
            <span style={{ fontWeight: 400 }}>OSTEN</span><span style={{ fontWeight: 700 }}>DERE</span>
          </span>
        </a>

        {/* Nav links — hidden below lg (1024px) */}
        <div className="hidden lg:flex items-center gap-[clamp(20px,2.4vw,44px)]">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = href === activeHref
            return (
              <a
                key={label}
                href={href}
                className={cn(
                  'relative py-[6px] transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40',
                  /* Active: brass colour + brass underline persisted */
                  isActive
                    ? 'text-brass border-b border-brass'
                    : 'border-b border-transparent hover:text-cream',
                  /* Hover underline animation only when not already active */
                  !isActive && [
                    'after:absolute after:left-0 after:bottom-[-1px] after:h-px after:w-full after:bg-brass',
                    'after:scale-x-0 after:origin-left after:transition-transform after:duration-[400ms]',
                    'after:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100',
                  ].join(' ')
                )}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: isActive ? '#c79a6b' : '#b9ac97',
                }}
                aria-current={isActive ? 'true' : undefined}
              >
                {label}
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <a href="#bespoke"
          className="transition-[background] duration-[350ms] hover:bg-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 min-h-[44px] flex items-center"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1c1611', background: '#ece3d2', padding: '11px 20px' }}>
          Book a Fitting
        </a>
      </nav>
    </>
  )
}
