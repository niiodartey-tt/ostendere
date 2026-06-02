'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export function LookbookPanel() {
  const sectionRef = useRef<HTMLElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    /* M4: disable parallax on mobile and for users who prefer reduced motion */
    if (window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number

    function onScroll() {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const progress = -rect.top / window.innerHeight
        setOffset(progress * window.innerHeight * 0.12)
      })
    }

    /* Reset offset when resizing below mobile threshold */
    function onResize() {
      if (window.innerWidth < 768) {
        setOffset(0)
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      aria-labelledby="lookbook-heading"
      className="panel-sticky grid place-items-center"
      style={{ background: '#2f231a' }}
    >
      <div
        ref={layerRef}
        className="panel-layer"
        style={{ transform: `translateY(${offset}px)` }}
        aria-hidden="true"
      >
        <Image src="/catalog/alpha/al_eb.jpg" alt="" fill
          className="object-cover"
          style={{ filter: 'brightness(0.62) saturate(0.95)' }}
          sizes="100vw" priority />
      </div>

      <div className="grade-overlay" aria-hidden="true" />

      <div className="relative z-[10] text-center max-w-[900px] reveal is-in"
        style={{ padding: '0 clamp(24px,5vw,72px)' }}>
        <span className="inline-flex items-center justify-center gap-3 mb-[22px]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c79a6b' }}>
          <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
          08 — Lookbook
          <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
        </span>

        <h2 id="lookbook-heading"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(38px,6.5vw,104px)', lineHeight: 1.0, letterSpacing: '0.01em', color: '#ece3d2' }}>
          Cut from<br />shadow &amp; light
        </h2>

        <p className="mt-7"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#8a7d6b' }}>
          Autumn / Winter MMXXVI · 24 looks
        </p>

        <a href="#suits"
          className="mt-10 inline-flex items-center gap-[14px] border px-7 py-4 transition-[background,color,gap] duration-[400ms] hover:bg-cream hover:text-espresso hover:gap-[22px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#ece3d2', borderColor: 'rgba(236,227,210,0.14)' }}>
          View the Collection →
        </a>
      </div>

      <div className="panel-cover" aria-hidden="true" />
    </section>
  )
}
