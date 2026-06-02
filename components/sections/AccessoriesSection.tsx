'use client'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ACCESSORIES } from '@/lib/catalog-data'

export function AccessoriesSection() {
  const [active, setActive] = useState(0)

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
              03 — The Details
            </span>
            <h2
              id="accessories-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(40px,6vw,92px)',
                lineHeight: 0.95,
                letterSpacing: '0.01em',
                color: '#ece3d2',
              }}
            >
              The <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>finishing</em> hand
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
              Pins, chains and solid hardware, plus belts and braces. Run your eye down the list — each one swaps the shot.
            </p>
          </RevealOnScroll>
        </div>

        {/* Swatch swap layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-[clamp(24px,4vw,72px)] items-center">

          {/* Stage */}
          <RevealOnScroll direction="left">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/5', background: '#ece2d0' }}
              aria-hidden="true"
            >
              {ACCESSORIES.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'absolute inset-0 transition-[opacity,transform] duration-700',
                    i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
                  )}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-contain mix-blend-multiply"
                    style={{ padding: '9%' }}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Badge */}
              <span
                className="absolute left-[22px] bottom-[22px] z-[3] px-[10px] py-[6px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#1c1611',
                  background: 'rgba(236,227,210,0.7)',
                  backdropFilter: 'blur(2px)',
                }}
                aria-hidden="true"
              >
                {ACCESSORIES[active]?.badge}
              </span>
            </div>
          </RevealOnScroll>

          {/* List */}
          <RevealOnScroll delay={0.08}>
            <ul className="flex flex-col" aria-label="Accessory categories">
              {ACCESSORIES.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={cn(
                      'w-full flex items-center gap-[22px] py-6 px-[6px] border-t text-left cursor-pointer',
                      'transition-[padding-left] duration-[400ms]',
                      'hover:pl-[18px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60',
                      i === ACCESSORIES.length - 1 && 'border-b',
                      i === active && 'pl-[18px]'
                    )}
                    style={{ borderColor: 'rgba(236,227,210,0.08)' }}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                  >
                    {/* Swatch circle */}
                    <span
                      className={cn(
                        'w-[46px] h-[46px] rounded-full flex-none border transition-[transform,box-shadow] duration-[400ms]',
                        i === active && 'scale-[1.12] shadow-[0_0_0_3px_#1c1611,0_0_0_4px_#c79a6b]'
                      )}
                      style={{ background: item.swatch, borderColor: 'rgba(236,227,210,0.14)' }}
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(24px,2.4vw,36px)',
                          lineHeight: 1.05,
                          color: i === active ? '#c79a6b' : '#ece3d2',
                          transition: 'color 0.4s cubic-bezier(0.22,1,0.36,1)',
                        }}
                      >
                        {item.name}
                      </h3>
                      <p className="mt-1" style={{ color: '#8a7d6b', fontSize: 16 }}>{item.desc}</p>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: '#b9ac97',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Contact for pricing
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
