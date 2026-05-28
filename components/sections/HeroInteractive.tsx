'use client'
import { useState } from 'react'
import { CelticNavTrigger } from '@/components/ui/CelticNavTrigger'
import { MenuOverlay } from '@/components/ui/MenuOverlay'

export function HeroInteractive() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CelticNavTrigger
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />
    </>
  )
}
