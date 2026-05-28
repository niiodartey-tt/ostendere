'use client'
import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { LookbookCard } from '@/components/ui/LookbookCard'
import { LookbookLightbox } from '@/components/ui/LookbookLightbox'
import { LOOKS, type LookCategory } from '@/lib/lookbook-data'

export function LookbookGrid() {
  const [activeCategory, setActiveCategory] = useState<'all' | LookCategory>('all')
  const [visibleCategory, setVisibleCategory] = useState<'all' | LookCategory>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleFilter = useCallback((cat: 'all' | LookCategory) => {
    setActiveCategory(cat)
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current)
    transitionTimeout.current = setTimeout(() => setVisibleCategory(cat), 300)
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + LOOKS.length) % LOOKS.length))
  }, [])

  const goToNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % LOOKS.length))
  }, [])

  return (
    <>
      <CategoryFilter active={activeCategory} onChange={handleFilter} />

      <div
        className={cn(
          'columns-2 sm:columns-3 lg:columns-4 gap-3 px-4 sm:px-8 lg:px-16 pt-6',
        )}
        aria-label="Lookbook collection"
      >
        {LOOKS.map((look, index) => {
          const isActive = activeCategory === 'all' || look.category === activeCategory
          const isDisplayed = visibleCategory === 'all' || look.category === visibleCategory

          return (
            <LookbookCard
              key={look.id}
              look={look}
              onClick={() => openLightbox(index)}
              isActive={isActive}
              isDisplayed={isDisplayed}
            />
          )
        })}
      </div>

      <LookbookLightbox
        looks={LOOKS}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  )
}
