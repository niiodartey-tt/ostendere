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
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${pin.name} — lapel pin`}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Close */}
      <button type="button" aria-label="Close" onClick={onClose}
        className="fixed top-6 right-6 z-[70] w-11 h-11 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
          className="stroke-[#a0a0a0] group-hover:stroke-[#e8e8e8] transition-colors duration-200">
          <line x1="4" y1="4" x2="20" y2="20" strokeWidth="1.5" />
          <line x1="20" y1="4" x2="4" y2="20" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button type="button" aria-label="Previous pin" onClick={onPrev}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true"
            className="stroke-[#a0a0a0] group-hover:stroke-[#e8e8e8] transition-colors duration-200">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button type="button" aria-label="Next pin" onClick={onNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true"
            className="stroke-[#a0a0a0] group-hover:stroke-[#e8e8e8] transition-colors duration-200">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      )}

      {/* Image + info */}
      <div
        className="relative z-[2] flex flex-col items-center px-16"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'lightboxOpen 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
        key={selectedIndex}
      >
        {/* Ivory tile — mix-blend-mode:multiply requires light bg */}
        <div className="relative w-[min(280px,80vw)] bg-[#ece3d0]" style={{ aspectRatio: '4/5' }}>
          <Image src={pin.img} alt={`${pin.name} lapel pin — ${pin.material}`} fill
            className="object-contain mix-blend-multiply" style={{ padding: '12%' }}
            sizes="min(280px, 80vw)" priority />
        </div>
        <p className="font-display text-2xl text-cream mt-4 text-center">{pin.name}</p>
        <p className="font-display text-sm text-center mt-2" style={{ color: 'rgba(236,227,210,0.7)' }}>{pin.material}</p>
        <p className="font-sans text-xs tracking-widest text-center mt-3" style={{ color: 'rgba(236,227,210,0.4)' }}>
          {selectedIndex + 1} / {PINS.length}
        </p>
      </div>
    </div>
  )
}
