'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Look } from '@/lib/lookbook-data'

interface LookbookCardProps {
  look: Look
  onClick: () => void
  isActive: boolean
  isDisplayed: boolean
}

const ASPECT_CLASSES: Record<Look['aspectRatio'], string> = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
}

export function LookbookCard({ look, onClick, isActive, isDisplayed }: LookbookCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const delayRef = useRef(Math.random() * 0.4)
  const observedRef = useRef(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const card = cardRef.current
    if (!wrapper || !card || observedRef.current) return

    card.classList.add('card-hidden')

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && !observedRef.current) {
          observedRef.current = true
          card.style.transitionDelay = `${delayRef.current}s`
          card.classList.remove('card-hidden')
          card.classList.add('card-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'mb-3 transition-[opacity,transform] duration-300',
        !isActive && 'opacity-0 [transform:scale(0.95)] pointer-events-none',
        !isDisplayed && 'hidden'
      )}
    >
      <div
        ref={wrapperRef}
        className="[perspective:1000px] cursor-pointer"
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        role="button"
        tabIndex={0}
        aria-label={`View ${look.title}`}
      >
        <div
          ref={cardRef}
          className={cn(
            '[transform-style:preserve-3d] group relative overflow-hidden',
            ASPECT_CLASSES[look.aspectRatio]
          )}
        >
          <Image
            src={look.image}
            alt={`${look.title} — ${look.category} by Ostendere`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-silver/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  )
}
