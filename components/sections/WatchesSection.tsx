'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { WATCHES } from '@/lib/catalog-data'

export function WatchesSection() {
  const railRef = useRef<HTMLDivElement>(null)

  function initDrag(rail: HTMLDivElement) {
    let down = false
    let startX = 0
    let scrollStart = 0

    function onDown(e: PointerEvent) {
      down = true
      startX = e.clientX
      scrollStart = rail.scrollLeft
      rail.setPointerCapture(e.pointerId)
    }
    function onMove(e: PointerEvent) {
      if (!down) return
      rail.scrollLeft = scrollStart - (e.clientX - startX)
    }
    function onUp() { down = false }

    rail.addEventListener('pointerdown', onDown)
    rail.addEventListener('pointermove', onMove)
    rail.addEventListener('pointerup', onUp)
    rail.addEventListener('pointercancel', onUp)
  }

  return (
    <section
      id="watches"
      aria-labelledby="watches-heading"
      className="relative z-[20]"
      style={{ background: '#241b14', padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}
    >
      <div className="max-w-site mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-8 flex-wrap mb-[clamp(40px,6vh,80px)]">
          <RevealOnScroll>
            <span
              className="inline-flex items-center gap-3 mb-[22px]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#c79a6b',
              }}
            >
              <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
              06 — Timepieces
            </span>
            <h2
              id="watches-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(40px,6vw,92px)',
                lineHeight: 0.95,
                letterSpacing: '0.01em',
                color: '#ece3d2',
              }}
            >
              On <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>time</em>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
              A small, considered wall of watches to close the look. Drag to browse.
            </p>
          </RevealOnScroll>
        </div>

        {/* Drag rail */}
        <RevealOnScroll>
          <div
            ref={(el) => {
              if (el && !railRef.current) {
                (railRef as React.MutableRefObject<HTMLDivElement>).current = el
                initDrag(el)
              }
            }}
            className="flex gap-[clamp(12px,1.2vw,20px)] overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
            aria-label="Watch collection — drag to browse"
            role="region"
          >
            {WATCHES.map((watch) => (
              <article
                key={watch.id}
                className="flex-none overflow-hidden cursor-pointer group"
                style={{
                  width: 'clamp(200px,18vw,250px)',
                  scrollSnapAlign: 'start',
                  background: '#ece2d0',
                }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={watch.img}
                    alt={`${watch.name} watch — ${watch.desc}`}
                    fill
                    className="object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    sizes="clamp(200px,18vw,250px)"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 pt-[15px] pb-[17px]" style={{ background: '#2f231a' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#ece3d2' }}>
                    {watch.name}
                  </div>
                  <div
                    className="mt-[6px]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#8a7d6b',
                    }}
                  >
                    {watch.desc}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
