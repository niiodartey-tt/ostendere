'use client'
import { useState } from 'react'
import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { PinLightbox } from '@/components/ui/PinLightbox'
import { PINS } from '@/lib/catalog-data'

export function PinDrawerSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const hasPrev = selectedIndex !== null && selectedIndex > 0
  const hasNext = selectedIndex !== null && selectedIndex < PINS.length - 1

  return (
    <>
      <section
        id="pins"
        aria-labelledby="pins-heading"
        className="relative z-[20]"
        style={{ background: '#241b14', padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}
      >
        <div className="max-w-site mx-auto">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-[clamp(40px,6vh,80px)]">
            <RevealOnScroll>
              <span className="inline-flex items-center gap-3 mb-[22px]"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c79a6b' }}>
                <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
                04 — The Pin Drawer
              </span>
              <h2 id="pins-heading"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(40px,6vw,92px)', lineHeight: 0.95, letterSpacing: '0.01em', color: '#ece3d2' }}>
                Forty ways to <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>finish</em>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
                Cast, enamelled and stone-set lapel pins — figural crests to quiet geometry. Tap any tile to open.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll>
            <ul
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-[clamp(10px,1vw,18px)]"
              aria-label="Lapel pin collection"
            >
              {PINS.map((pin, i) => (
                <li
                  key={pin.id}
                  /* Issue 2 fix: ivory bg + hover:white so mix-blend-mode:multiply composites correctly */
                  className="relative overflow-hidden cursor-pointer isolate group bg-[#ece3d0] hover:bg-white transition-colors duration-300"
                  style={{ aspectRatio: '4/5' }}
                  onClick={() => setSelectedIndex(i)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(i)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${pin.name}`}
                >
                  <Image
                    src={pin.img}
                    alt={`${pin.name} lapel pin — ${pin.material}`}
                    fill
                    className="object-contain mix-blend-multiply transition-[transform,padding] duration-[900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    style={{ padding: '16%' }}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-3 left-[13px] z-[2]"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: '#8a7d6b' }}
                    aria-hidden="true"
                  >
                    {pin.number}
                  </span>
                  {/* Caption — slides up on hover/focus */}
                  <div
                    className="absolute left-0 right-0 bottom-0 z-[2] translate-y-full transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0"
                    style={{ background: 'rgba(18,13,9,0.93)', padding: '13px 15px' }}
                  >
                    <p style={{ fontFamily: 'var(--font-display)', color: '#ece3d2', fontSize: 18, lineHeight: 1.08 }}>{pin.name}</p>
                    <span className="block mt-[5px]"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c79a6b' }}>
                      {pin.material}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      <PinLightbox
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex((i) => (i !== null ? i - 1 : null))}
        onNext={() => setSelectedIndex((i) => (i !== null ? i + 1 : null))}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </>
  )
}
