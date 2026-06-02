'use client'
import { useState } from 'react'
import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AccItem } from '@/components/ui/AccItem'
import { ACCESSORIES } from '@/lib/catalog-data'

export function AccessoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  /* Issue 3 fix: hover previews image, click persists selection */
  const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex

  return (
    <section
      id="accessories"
      aria-labelledby="accessories-heading"
      className="relative z-[20] bg-espresso"
      style={{ padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}
    >
      <div className="max-w-site mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-8 flex-wrap mb-[clamp(40px,6vh,80px)]">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-3 mb-[22px]"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c79a6b' }}>
              <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
              03 — The Details
            </span>
            <h2 id="accessories-heading"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(40px,6vw,92px)', lineHeight: 0.95, letterSpacing: '0.01em', color: '#ece3d2' }}>
              The <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>finishing</em> hand
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
              Pins, chains and solid hardware, plus belts and braces. Hover to preview — click to select.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-[clamp(24px,4vw,72px)] items-center">
          {/* Stage */}
          <RevealOnScroll direction="left">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', background: '#ece2d0' }} aria-hidden="true">
              {ACCESSORIES.map((item, i) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ${i === displayIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'}`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                >
                  <Image src={item.img} alt={item.name} fill
                    className="object-contain mix-blend-multiply"
                    style={{ padding: '9%' }}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    loading="lazy"
                  />
                </div>
              ))}
              <span className="absolute left-[22px] bottom-[22px] z-[3] px-[10px] py-[6px]"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#1c1611', background: 'rgba(236,227,210,0.7)', backdropFilter: 'blur(2px)' }}
                aria-hidden="true">
                {ACCESSORIES[displayIndex]?.badge}
              </span>
            </div>
          </RevealOnScroll>

          {/* List */}
          <RevealOnScroll delay={0.08}>
            <ul className="flex flex-col" aria-label="Accessory categories">
              {ACCESSORIES.map((item, i) => (
                <AccItem
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={i === activeIndex}
                  isLast={i === ACCESSORIES.length - 1}
                  onHoverEnter={() => setHoverIndex(i)}
                  onHoverLeave={() => setHoverIndex(null)}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
