'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Suit } from '@/lib/catalog-data'

interface SuitQuickviewProps {
  suit: Suit | null
  onClose: () => void
  onInquire: () => void
}

export function SuitQuickview({ suit, onClose, onInquire }: SuitQuickviewProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  /* focus trap & keyboard navigation */
  useEffect(() => {
    if (!suit) return
    const prev = document.activeElement as HTMLElement | null
    closeBtnRef.current?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusable = panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault()
          ;(e.shiftKey ? last : first)?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [suit, onClose])

  /* body scroll lock */
  useEffect(() => {
    if (suit) document.documentElement.style.overflow = 'hidden'
    else document.documentElement.style.overflow = ''
    return () => { document.documentElement.style.overflow = '' }
  }, [suit])

  return (
    <div
      className={[
        'fixed inset-0 z-[900] grid place-items-center p-4 sm:p-8 md:p-12',
        'transition-[opacity,visibility] duration-[450ms]',
        suit ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={suit ? `${suit.name} — suit detail` : 'Suit detail'}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{ background: 'rgba(10,7,4,0.86)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={[
          'relative z-[2] w-full max-w-[1040px] max-h-[90svh] overflow-hidden',
          'border grid grid-cols-1 md:grid-cols-2',
          'transition-[transform] duration-500',
          suit ? '[transform:none]' : '[transform:translateY(26px)_scale(0.98)]',
        ].join(' ')}
        style={{
          background: '#241b14',
          borderColor: 'rgba(236,227,210,0.14)',
        }}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-[5] w-[42px] h-[42px] rounded-full grid place-items-center border transition-[background,transform] duration-300 hover:bg-brass hover:text-espresso hover:rotate-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
          style={{
            background: 'rgba(20,15,11,0.6)',
            borderColor: 'rgba(236,227,210,0.14)',
            color: '#ece3d2',
            fontSize: 18,
            backdropFilter: 'blur(6px)',
          }}
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative min-h-[320px] md:min-h-[460px]" style={{ background: '#ece2d0' }}>
          {suit && (
            <Image
              src={suit.img}
              alt={suit.name}
              fill
              className="object-cover"
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Body */}
        <div
          className="flex flex-col overflow-y-auto max-h-[90svh] md:max-h-none"
          style={{ padding: 'clamp(28px,3.2vw,52px)' }}
        >
          {suit && (
            <>
              {/* Eyebrow */}
              <span
                className="mb-[18px] inline-flex items-center gap-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#c79a6b',
                }}
              >
                <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
                {suit.code !== '—' ? `Style ${suit.code}` : 'House Cut'}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(30px,3vw,46px)',
                  lineHeight: 1,
                  color: '#ece3d2',
                }}
              >
                {suit.name}
              </h3>

              {/* Chips */}
              <div className="flex gap-[10px] flex-wrap mt-[18px] mb-[22px]">
                {[suit.colorLabel, suit.cut, suit.pieces].map((chip) => (
                  <span
                    key={chip}
                    className="border px-3 py-[7px]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#b9ac97',
                      borderColor: 'rgba(236,227,210,0.14)',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Note */}
              <p
                style={{
                  color: '#b9ac97',
                  fontSize: 18,
                  lineHeight: 1.55,
                  maxWidth: '42ch',
                }}
              >
                {suit.note}
              </p>

              {/* Price */}
              <div
                className="mt-auto pt-[26px]"
                style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: '#c79a6b' }}
              >
                <small
                  className="block mb-1"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: '#8a7d6b',
                    textTransform: 'uppercase',
                  }}
                >
                  Made to measure
                </small>
                Contact for pricing
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-5 flex-wrap">
                <button
                  type="button"
                  onClick={onInquire}
                  className="min-h-[44px] px-[22px] py-[14px] border cursor-pointer transition-all duration-[350ms] hover:bg-brass hover:border-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    background: '#ece3d2',
                    color: '#1c1611',
                    borderColor: '#ece3d2',
                  }}
                >
                  Reserve a Fitting
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-[22px] py-[14px] border cursor-pointer transition-all duration-[350ms] hover:border-brass hover:text-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    color: '#ece3d2',
                    borderColor: 'rgba(236,227,210,0.14)',
                  }}
                >
                  Keep Browsing
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
