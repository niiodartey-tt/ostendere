'use client'
import { useEffect, useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CATEGORY_LABELS, type Look } from '@/lib/lookbook-data'

interface Props { looks: Look[]; activeIndex: number | null; onClose: () => void; onPrev: () => void; onNext: () => void }
type Anim = 'lb-open' | 'lb-exit-left' | 'lb-exit-right' | 'lb-enter-right' | 'lb-enter-left'
const DETAILS: Array<[string, 'fabric' | 'craftsmanship' | 'care']> = [
  ['FABRIC', 'fabric'], ['CRAFTSMANSHIP', 'craftsmanship'], ['CARE', 'care'],
]

export function LookbookLightbox({ looks, activeIndex, onClose, onPrev, onNext }: Props) {
  const isOpen = activeIndex !== null
  const [shownIdx, setShownIdx] = useState<number | null>(null)
  const [anim, setAnim] = useState<Anim>('lb-open')
  const shownRef = useRef<number | null>(null)
  const busy = useRef(false)
  const touchX = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.classList.toggle('lightbox-open', isOpen)
    if (isOpen) setTimeout(() => closeRef.current?.focus(), 50)
    return () => { document.body.classList.remove('lightbox-open') }
  }, [isOpen])

  useEffect(() => {
    if (activeIndex === null) { shownRef.current = null; return }
    if (shownRef.current === null) {
      shownRef.current = activeIndex; setShownIdx(activeIndex); setAnim('lb-open'); return
    }
    if (activeIndex === shownRef.current || busy.current) return
    busy.current = true
    const isNext = activeIndex === (shownRef.current + 1) % looks.length
    setAnim(isNext ? 'lb-exit-left' : 'lb-exit-right')
    setTimeout(() => {
      shownRef.current = activeIndex; setShownIdx(activeIndex)
      setAnim(isNext ? 'lb-enter-right' : 'lb-enter-left'); busy.current = false
    }, 260)
  }, [activeIndex, looks.length])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [isOpen, onClose, onPrev, onNext])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const goConsult = () => { onClose(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 250) }
  const look = shownIdx !== null ? looks[shownIdx] : null

  return (
    <div
      role="dialog" aria-modal="true" aria-label="Lookbook image viewer" aria-hidden={!isOpen}
      onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const d = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
        if (Math.abs(d) > 50) { if (d < 0) onNext(); else onPrev() }
        touchX.current = null
      }}
      className={cn(
        'fixed inset-0 z-[60] flex flex-col md:items-center md:justify-center',
        'bg-[rgba(6,8,16,0.97)] transition-[opacity,visibility] duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
    >
      <button ref={closeRef} type="button" aria-label="Close lightbox" onClick={onClose}
        className="fixed top-6 right-6 z-10 flex items-center justify-center w-11 h-11 text-silver/80 hover:text-silver transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button type="button" aria-label="Previous image" onClick={onPrev}
        className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 text-silver/70 hover:text-silver transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13 3L6 10L13 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <button type="button" aria-label="Next image" onClick={onNext}
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 text-silver/70 hover:text-silver transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {look && (
        <>
          <div className={cn('relative flex-shrink-0 w-full md:w-auto', anim)}>
            <Image src={look.image} alt={`${look.title} — Ostendere`}
              width={800} height={1000} priority
              className="object-contain w-full max-h-[60vh] md:max-h-[90vh] md:max-w-[65vw]" />
            <div className="hidden md:block absolute bottom-0 left-0 right-0 px-8 pb-8 pt-20"
              style={{ background: 'linear-gradient(to top, rgba(6,8,16,0.97) 0%, rgba(6,8,16,0.85) 50%, transparent 100%)' }}>
              <span className="inline-block mb-4 px-3 py-1 text-[0.6rem] tracking-widest uppercase border border-silver/30 text-text-muted">{CATEGORY_LABELS[look.category]}</span>
              <h2 className="font-display font-light text-[2rem] tracking-wide text-[#E8E8E8] leading-tight mb-3">{look.title}</h2>
              <p className="font-display text-[0.95rem] leading-[1.8] text-text-secondary mb-5 max-w-[420px]">{look.description}</p>
              <div className="mb-5 h-px w-10 bg-silver/40" aria-hidden="true" />
              <div className="grid gap-3 mb-7 max-w-[420px]">
                {DETAILS.map(([label, key]) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-[0.6rem] tracking-widest uppercase text-text-muted w-[90px] shrink-0 mt-[2px]">{label}</span>
                    <span className="text-xs text-text-secondary leading-[1.6]">{look[key]}</span>
                  </div>
                ))}
              </div>
              <button type="button" onClick={goConsult}
                className="w-full max-w-[420px] py-4 border border-silver/50 text-xs tracking-widest uppercase text-[#E8E8E8] bg-transparent transition-colors duration-300 hover:bg-silver/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60">
                Book a Consultation
              </button>
            </div>
          </div>

          <div className="md:hidden w-full px-6 py-6 overflow-y-auto flex-1 bg-[#060810]">
            <span className="inline-block mb-3 px-3 py-1 text-[0.6rem] tracking-widest uppercase border border-silver/30 text-text-muted">{CATEGORY_LABELS[look.category]}</span>
            <h2 className="font-display font-light text-[1.5rem] tracking-wide text-[#E8E8E8] leading-tight mb-3">{look.title}</h2>
            <p className="font-display text-sm leading-[1.8] text-text-secondary mb-4">{look.description}</p>
            <div className="mb-4 h-px w-10 bg-silver/40" aria-hidden="true" />
            <div className="grid gap-3 mb-6">
              {DETAILS.map(([label, key]) => (
                <div key={label} className="flex gap-3">
                  <span className="text-[0.6rem] tracking-widest uppercase text-text-muted w-[90px] shrink-0 mt-[2px]">{label}</span>
                  <span className="text-xs text-text-secondary leading-[1.6]">{look[key]}</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={goConsult}
              className="w-full min-h-[44px] border border-silver/50 text-xs tracking-widest uppercase text-[#E8E8E8] bg-transparent transition-colors duration-300 hover:bg-silver/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60">
              Book a Consultation
            </button>
          </div>
        </>
      )}
    </div>
  )
}
