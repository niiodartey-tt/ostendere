'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Suiting',     href: '#suits' },
  { label: 'The Edit',    href: '#packages' },
  { label: 'Accessories', href: '#accessories' },
  { label: 'Squares',     href: '#squares' },
  { label: 'GRWM',        href: '#grwm' },
  { label: 'Atelier',     href: '#about' },
]

export function Navbar() {
  const [stuck, setStuck] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!(entry?.isIntersecting ?? true)),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* IntersectionObserver sentinel at very top of page */}
      <div ref={sentinelRef} className="absolute top-0 left-0 h-px w-full pointer-events-none" aria-hidden="true" />

      <nav
        aria-label="Main navigation"
        className={[
          'fixed inset-x-0 top-0 z-[100] flex items-center justify-between',
          'px-[clamp(24px,5vw,72px)]',
          'transition-[background,padding,border-color] duration-500',
          stuck
            ? 'py-4 bg-[rgba(20,15,11,0.72)] backdrop-blur-[18px] saturate-110 border-b border-line-soft'
            : 'py-[26px] border-b border-transparent',
        ].join(' ')}
      >
        {/* Brand */}
        <a
          href="#top"
          className="flex items-center gap-[14px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40"
          aria-label="Ostendere home"
        >
          <Image
            src="/images/mark-cream.png"
            alt=""
            width={34}
            height={34}
            className="w-auto h-[34px]"
            priority
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: '0.42em',
              paddingLeft: '0.42em',
              color: '#ece3d2',
            }}
          >
            <span style={{ fontWeight: 400 }}>OSTEN</span>
            <span style={{ fontWeight: 700 }}>DERE</span>
          </span>
        </a>

        {/* Nav links — hidden below 880px */}
        <div className="hidden items-center gap-[clamp(20px,2.4vw,44px)] xl:flex lg:flex md:hidden sm:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={[
                'relative py-[6px] transition-colors duration-300',
                'hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40',
                'after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-brass',
                'after:scale-x-0 after:origin-left after:transition-transform after:duration-[400ms] after:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
                'hover:after:scale-x-100',
              ].join(' ')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#b9ac97',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#bespoke"
          className="transition-[background] duration-[350ms] hover:bg-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 min-h-[44px] flex items-center"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#1c1611',
            background: '#ece3d2',
            padding: '11px 20px',
          }}
        >
          Book a Fitting
        </a>
      </nav>
    </>
  )
}
