'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CelticNavTrigger } from '@/components/ui/CelticNavTrigger'
import { MenuOverlay } from '@/components/ui/MenuOverlay'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
)

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1] as const } },
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Three.js layer */}
      <HeroScene />

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pre-title rule */}
        <motion.div
          variants={lineVariants}
          className="mb-8 h-px w-12 bg-silver/40 sm:w-16"
        />

        {/* Wordmark */}
        <motion.h1
          variants={lineVariants}
          className="font-display text-5xl font-light tracking-[0.35em] uppercase text-silver-light sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Ostendere
        </motion.h1>

        {/* Brand statement */}
        <motion.p
          variants={lineVariants}
          className="mt-6 font-sans text-xs font-light tracking-[0.3em] uppercase text-text-secondary sm:text-sm"
        >
          Premium Menswear · Accra
        </motion.p>

        {/* Post-title rule */}
        <motion.div
          variants={lineVariants}
          className="mt-8 h-px w-12 bg-silver/40 sm:w-16"
        />
      </motion.div>

      {/* Navigation */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CelticNavTrigger
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />
    </main>
  )
}
