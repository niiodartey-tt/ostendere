'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Suit } from '@/lib/catalog-data'

interface SuitCardProps {
  suit: Suit
  index: number
  onOpen: (id: string) => void
}

export function SuitCard({ suit, index, onOpen }: SuitCardProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('scard-hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.animationDelay = `${index * 0.05}s`
          el.classList.remove('scard-hidden')
          el.classList.add('scard-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <article
      ref={ref}
      className="relative overflow-hidden cursor-pointer isolation-isolate group"
      style={{ background: '#ece2d0' }}
      onClick={() => onOpen(suit.id)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(suit.id)}
      tabIndex={0}
      role="button"
      aria-label={`View ${suit.name} — ${suit.colorLabel}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={suit.img}
          alt={`${suit.name} suit — ${suit.colorLabel}`}
          fill
          className="object-cover transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
          loading="lazy"
        />

        {/* Code badge */}
        {suit.code !== '—' && (
          <span
            className="absolute top-3 left-3 z-[3] px-[9px] py-[5px]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.16em',
              color: '#1c1611',
              background: 'rgba(236,226,208,0.82)',
              backdropFilter: 'blur(3px)',
            }}
          >
            {suit.code}
          </span>
        )}

        {/* View overlay */}
        <div
          className="absolute inset-0 z-[2] grid place-items-center transition-[background] duration-[400ms]"
          style={{ background: 'rgba(28,22,17,0)' }}
        >
          <span
            className="px-[18px] py-[11px] opacity-0 translate-y-2 border transition-[opacity,transform] duration-[400ms] group-hover:opacity-100 group-hover:translate-y-0 hover:!bg-brass hover:!text-espresso hover:!border-brass"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#ece3d2',
              borderColor: 'rgba(236,227,210,0.6)',
            }}
          >
            View the Cut
          </span>
        </div>
      </div>

      {/* Info bar — stacks on mobile to prevent overflow in 1-col grid */}
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-[10px] px-4 py-[14px] pb-[16px]"
        style={{ background: '#2f231a' }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(15px,3vw,19px)',
              lineHeight: 1.05,
              color: '#ece3d2',
            }}
          >
            {suit.name}
          </div>
          <div
            className="mt-[6px]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8a7d6b',
            }}
          >
            {suit.cut} · {suit.pieces}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#c79a6b',
          }}
        >
          Contact for pricing
        </div>
      </div>
    </article>
  )
}
