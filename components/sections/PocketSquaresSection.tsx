'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { FilterBar } from '@/components/ui/FilterBar'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { POCKET_SQUARES, SQUARE_FILTERS } from '@/lib/catalog-data'

export function PocketSquaresSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedSquare = selectedIndex !== null ? POCKET_SQUARES[selectedIndex] ?? null : null
  const hasPrev = selectedIndex !== null && selectedIndex > 0
  const hasNext = selectedIndex !== null && selectedIndex < POCKET_SQUARES.length - 1

  const filtered = activeFilter === 'all'
    ? POCKET_SQUARES
    : POCKET_SQUARES.filter((s) => s.color === activeFilter)

  const filterOptions = SQUARE_FILTERS.map((f) => ({
    key: f.key,
    label: f.label,
    count: f.key === 'all' ? POCKET_SQUARES.length : POCKET_SQUARES.filter((s) => s.color === f.key).length,
  })).filter((o) => (o.count ?? 0) > 0 || o.key === 'all')

  /* keyboard nav + close */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft' && hasPrev) setSelectedIndex((i) => (i !== null ? i - 1 : null))
      if (e.key === 'ArrowRight' && hasNext) setSelectedIndex((i) => (i !== null ? i + 1 : null))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [hasPrev, hasNext])

  return (
    <>
      <section id="squares" aria-labelledby="squares-heading"
        className="relative z-[20] bg-espresso"
        style={{ padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}>
        <div className="max-w-site mx-auto">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-[clamp(40px,6vh,80px)]">
            <RevealOnScroll>
              <span className="inline-flex items-center gap-3 mb-[22px]"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c79a6b' }}>
                <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
                05 — Pocket Squares
              </span>
              <h2 id="squares-heading"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(40px,6vw,92px)', lineHeight: 0.95, letterSpacing: '0.01em', color: '#ece3d2' }}>
                A pocket of <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>colour</em>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
                Florals, foulards and the occasional wink. Filter by tone — tap any square to see the weave up close.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll>
            <FilterBar options={filterOptions} active={activeFilter} onChange={setActiveFilter}
              className="mb-[clamp(32px,4vh,54px)]" />
          </RevealOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-[clamp(8px,0.9vw,16px)]">
            {filtered.map((sq, i) => (
              <figure
                key={sq.id}
                className="relative overflow-hidden cursor-zoom-in isolation-isolate group m-0"
                style={{ aspectRatio: '1', background: '#ece2d0', opacity: 0, transform: 'translateY(20px)',
                  animation: 'scardIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards', animationDelay: `${i * 0.03}s` }}
                /* navigate within full POCKET_SQUARES array so prev/next works across filters */
                onClick={() => setSelectedIndex(POCKET_SQUARES.findIndex((s) => s.id === sq.id))}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(POCKET_SQUARES.findIndex((s) => s.id === sq.id))}
                tabIndex={0}
                role="button"
                aria-label={`View ${sq.name} pocket square`}
              >
                <Image src={sq.img} alt={`${sq.name} pocket square`} fill
                  className="object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw" loading="lazy" />
                <figcaption
                  className={cn('absolute left-0 right-0 bottom-0 z-[2] translate-y-full transition-transform duration-[400ms]',
                    '[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0')}
                  style={{ background: 'rgba(18,13,9,0.9)', color: '#ece3d2', fontFamily: 'var(--font-mono)',
                    fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: 10 }}>
                  {sq.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={[
          'fixed inset-0 z-[950] grid place-items-center',
          'transition-[opacity,visibility] duration-[400ms]',
          selectedSquare ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={selectedSquare ? `${selectedSquare.name} pocket square` : 'Pocket square'}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 cursor-zoom-out"
          style={{ background: 'rgba(10,7,4,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={() => setSelectedIndex(null)} aria-hidden="true" />

        {/* Close */}
        <button type="button" aria-label="Close" onClick={() => setSelectedIndex(null)}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[70] w-11 h-11 flex items-center justify-center opacity-100 hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="4" y1="4" x2="20" y2="20" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </button>

        {/* Prev */}
        {hasPrev && (
          <button type="button" aria-label="Previous square"
            onClick={() => setSelectedIndex((i) => (i !== null ? i - 1 : null))}
            className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" stroke="#ffffff" />
            </svg>
          </button>
        )}

        {/* Next */}
        {hasNext && (
          <button type="button" aria-label="Next square"
            onClick={() => setSelectedIndex((i) => (i !== null ? i + 1 : null))}
            className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
              <polyline points="9 6 15 12 9 18" stroke="#ffffff" />
            </svg>
          </button>
        )}

        {/* Image — key remounts on navigation, fadeIn plays */}
        <div className={[
          'relative z-[2] max-w-[min(620px,86vw)] max-h-[80svh]',
          'shadow-[0_40px_90px_rgba(0,0,0,0.6)] transition-transform duration-500',
          selectedSquare ? '[transform:none]' : '[transform:scale(0.9)]'].join(' ')}>
          {selectedSquare && (
            <Image
              key={selectedIndex}
              src={selectedSquare.img}
              alt={selectedSquare.name}
              width={620}
              height={620}
              className="block w-full h-full object-contain"
              sizes="min(620px, 86vw)"
              style={{ animation: 'fadeIn 0.25s ease both' }}
            />
          )}
        </div>

        {/* Name + position indicator */}
        {selectedSquare && (
          <div className="absolute bottom-[6svh] left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b9ac97', whiteSpace: 'nowrap' }}>
              {selectedSquare.name}
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
              {(selectedIndex ?? 0) + 1} / {POCKET_SQUARES.length}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
