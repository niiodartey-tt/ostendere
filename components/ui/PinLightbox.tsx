'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { PINS } from '@/lib/catalog-data'

interface PinLightboxProps {
  selectedIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

export function PinLightbox({ selectedIndex, onClose, onPrev, onNext, hasPrev, hasNext }: PinLightboxProps) {
  const pin = selectedIndex !== null ? PINS[selectedIndex] ?? null : null

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  useEffect(() => {
    document.body.classList.toggle('lightbox-open', pin !== null)
    return () => { document.body.classList.remove('lightbox-open') }
  }, [pin])

  if (!pin || selectedIndex === null) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${pin.name} — lapel pin`}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Close — white stroke, visible on dark backdrop */}
      <button type="button" aria-label="Close" onClick={onClose}
        className="fixed top-4 right-4 lg:top-6 lg:right-6 z-[70] w-11 h-11 flex items-center justify-center opacity-100 hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <line x1="4" y1="4" x2="20" y2="20" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="20" y1="4" x2="4" y2="20" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Prev arrow */}
      {hasPrev && (
        <button type="button" aria-label="Previous pin" onClick={onPrev}
          className="fixed left-2 lg:left-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" stroke="#ffffff" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {hasNext && (
        <button type="button" aria-label="Next pin" onClick={onNext}
          className="fixed right-2 lg:right-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
            <polyline points="9 6 15 12 9 18" stroke="#ffffff" />
          </svg>
        </button>
      )}

      {/* White container — stopPropagation prevents backdrop close */}
      <div
        className="relative z-[2] flex flex-col w-[85vw] lg:w-[min(60vw,500px)]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'lightboxOpen 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
        key={selectedIndex}
      >
        {/* Pure white tile — pin image uses mix-blend-mode:multiply */}
        <div className="bg-white p-8">
          <div
            className="relative w-full"
            style={{ aspectRatio: '4/5', maxHeight: '65vh' }}
          >
            <Image
              key={selectedIndex}
              src={pin.img}
              alt={`${pin.name} lapel pin — ${pin.material}`}
              fill
              className="object-contain mix-blend-multiply"
              sizes="(max-width: 1024px) 85vw, min(60vw, 500px)"
              priority
            />
          </div>

          {/* Pin details — dark text on white */}
          <div className="pt-4 pb-2 text-center">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,1.4vw,20px)', color: '#1c1611' }}>
              {pin.name}
            </p>
            <p className="mt-1 lg:text-sm text-xs" style={{ fontFamily: 'var(--font-display)', color: '#706c64' }}>
              {pin.material}
            </p>
          </div>
        </div>

        {/* Position indicator — outside white container, on dark backdrop */}
        <p
          className="font-sans text-xs tracking-widest text-center mt-3"
          style={{ color: 'rgba(236,227,210,0.5)' }}
        >
          {selectedIndex + 1} / {PINS.length}
        </p>
      </div>
    </div>
  )
}
