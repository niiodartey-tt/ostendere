'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Package } from '@/lib/catalog-data'

interface PackageModalProps {
  pkg: Package | null
  onClose: () => void
  onInquire: () => void
}

export function PackageModal({ pkg, onClose, onInquire }: PackageModalProps) {
  const [activeShot, setActiveShot] = useState(0)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveShot(0)
  }, [pkg])

  useEffect(() => {
    if (!pkg) return
    const prev = document.activeElement as HTMLElement | null
    closeBtnRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusable = panel.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
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
      document.documentElement.style.overflow = ''
      prev?.focus()
    }
  }, [pkg, onClose])

  return (
    <div
      className={[
        'fixed inset-0 z-[900] grid place-items-center p-4 sm:p-8 md:p-12',
        'transition-[opacity,visibility] duration-[450ms]',
        pkg ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={pkg ? `${pkg.name} — package detail` : 'Package detail'}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10,7,4,0.86)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={[
          'relative z-[2] w-full max-w-[1120px] max-h-[90svh] overflow-hidden',
          'border grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]',
          'transition-[transform] duration-500',
          pkg ? '[transform:none]' : '[transform:translateY(26px)_scale(0.98)]',
        ].join(' ')}
        style={{ background: '#241b14', borderColor: 'rgba(236,227,210,0.14)' }}
      >
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-[5] w-11 h-11 rounded-full grid place-items-center border transition-[background,transform] duration-300 hover:bg-brass hover:text-espresso hover:rotate-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
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

        {/* Gallery */}
        {pkg && (
          <div className="flex flex-col" style={{ background: '#ece2d0' }}>
            <div className="flex-1 relative min-h-[280px]">
              {pkg.shots.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${pkg.name} ${i + 1}`}
                  fill
                  className={[
                    'object-cover transition-opacity duration-[600ms]',
                    i === activeShot ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                  sizes="(max-width: 760px) 100vw, 55vw"
                />
              ))}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 p-[10px]" style={{ background: '#ddd2bd' }}>
              {pkg.shots.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveShot(i)}
                  className={[
                    'w-16 h-16 border overflow-hidden flex-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60',
                    i === activeShot ? 'border-brass' : 'border-transparent',
                  ].join(' ')}
                  aria-label={`View shot ${i + 1}`}
                  style={{ background: '#fff', padding: 0 }}
                >
                  <Image
                    src={src}
                    alt=""
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div
          className="flex flex-col overflow-y-auto max-h-[90svh] md:max-h-none"
          style={{ padding: 'clamp(28px,3.2vw,52px)' }}
        >
          {pkg && (
            <>
              <span
                className="inline-flex items-center gap-3 mb-[18px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#c79a6b',
                }}
              >
                <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
                {pkg.tag}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(30px,3vw,46px)',
                  lineHeight: 1,
                  color: '#ece3d2',
                }}
              >
                {pkg.name}
              </h3>
              <p
                className="mt-4"
                style={{ color: '#b9ac97', fontSize: 18, lineHeight: 1.55 }}
              >
                {pkg.blurb}
              </p>
              <ul className="mt-2 flex flex-col">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-[11px] border-t"
                    style={{
                      borderColor: 'rgba(236,227,210,0.08)',
                      fontSize: 16,
                      color: '#b9ac97',
                    }}
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-brass flex-none" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
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
                  Boxed set
                </small>
                Contact for pricing
              </div>
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
                  Reserve This Edit
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
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
