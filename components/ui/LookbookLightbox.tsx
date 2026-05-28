'use client'
import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LightboxInfoPanel } from '@/components/ui/LightboxInfoPanel'
import type { Look } from '@/lib/lookbook-data'

interface LookbookLightboxProps {
  looks: Look[]
  activeIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function LookbookLightbox({ looks, activeIndex, onClose, onPrev, onNext }: LookbookLightboxProps) {
  const isOpen = activeIndex !== null
  const activeLook = activeIndex !== null ? looks[activeIndex] : null
  const touchStartX = useRef<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.classList.toggle('lightbox-open', isOpen)
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    }
    return () => { document.body.classList.remove('lightbox-open') }
  }, [isOpen])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [isOpen, onClose, onPrev, onNext])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    if (Math.abs(delta) > 50) {
      delta < 0 ? onNext() : onPrev()
    }
    touchStartX.current = null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Lookbook image viewer"
      aria-hidden={!isOpen}
      className={cn(
        'fixed inset-0 z-[60] flex bg-[rgba(6,8,16,0.97)]',
        'transition-[opacity,visibility] duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image zone */}
      <div className="relative flex-1 md:w-[60%] md:flex-none">
        {activeLook && (
          <Image
            src={activeLook.image}
            alt={`${activeLook.title} — Ostendere`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        )}

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close lightbox"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-11 h-11 text-silver/80 hover:text-silver transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
            <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Previous image"
          onClick={onPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 text-silver/70 hover:text-silver transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M13 3L6 10L13 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={onNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 text-silver/70 hover:text-silver transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Info panel — desktop only */}
      <div className="hidden md:block md:w-[40%]">
        {activeLook && (
          <LightboxInfoPanel look={activeLook} isOpen={isOpen} onClose={onClose} />
        )}
      </div>
    </div>
  )
}
