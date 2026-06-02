'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { FilterBar } from '@/components/ui/FilterBar'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { POCKET_SQUARES, SQUARE_FILTERS } from '@/lib/catalog-data'

interface LightboxState { src: string; name: string }

export function PocketSquaresSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const filtered = activeFilter === 'all'
    ? POCKET_SQUARES
    : POCKET_SQUARES.filter((s) => s.color === activeFilter)

  const filterOptions = SQUARE_FILTERS.map((f) => ({
    key: f.key,
    label: f.label,
    count: f.key === 'all' ? POCKET_SQUARES.length : POCKET_SQUARES.filter((s) => s.color === f.key).length,
  })).filter((o) => (o.count ?? 0) > 0 || o.key === 'all')

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() },
    [closeLightbox]
  )

  return (
    <>
      <section
        id="squares"
        aria-labelledby="squares-heading"
        className="relative z-[20] bg-espresso"
        style={{ padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}
      >
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
                onClick={() => setLightbox({ src: sq.img, name: sq.name })}
                onKeyDown={(e) => e.key === 'Enter' && setLightbox({ src: sq.img, name: sq.name })}
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
          lightbox ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={lightbox ? `${lightbox.name} pocket square` : 'Pocket square'}
        onKeyDown={handleKey}
        tabIndex={-1}
      >
        <div className="absolute inset-0 cursor-zoom-out"
          style={{ background: 'rgba(10,7,4,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={closeLightbox} aria-hidden="true" />

        {/* M5: close button */}
        <button type="button" aria-label="Close" onClick={closeLightbox}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[70] w-11 h-11 flex items-center justify-center opacity-100 hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="4" y1="4" x2="20" y2="20" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </button>

        <div className={['relative z-[2] max-w-[min(620px,86vw)] max-h-[80svh]',
          'shadow-[0_40px_90px_rgba(0,0,0,0.6)] transition-transform duration-500',
          lightbox ? '[transform:none]' : '[transform:scale(0.9)]'].join(' ')}>
          {lightbox && (
            <Image src={lightbox.src} alt={lightbox.name} width={620} height={620}
              className="block w-full h-full object-contain" sizes="min(620px, 86vw)" />
          )}
        </div>

        {lightbox && (
          <p className="absolute bottom-[6svh] left-1/2 -translate-x-1/2 z-[2]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b9ac97', whiteSpace: 'nowrap' }}>
            {lightbox.name}
          </p>
        )}
      </div>
    </>
  )
}
