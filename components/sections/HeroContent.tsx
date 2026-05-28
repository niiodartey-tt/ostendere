'use client'
import { motion } from 'framer-motion'

const ease = [0.33, 1, 0.68, 1] as const

export function HeroContent() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="mb-8 h-px w-12 origin-center bg-[#C0C0C0]/40 sm:w-16"
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.5, ease }}
        className="font-display text-5xl font-light tracking-[0.35em] uppercase text-[#E8E8E8] sm:text-7xl md:text-8xl lg:text-9xl"
      >
        Ostendere
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.72, ease }}
        className="mt-6 font-sans text-xs font-light tracking-[0.3em] uppercase text-[#A0A0A0] sm:text-sm"
      >
        Premium Menswear · Accra
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease }}
        className="mt-8 h-px w-12 origin-center bg-[#C0C0C0]/40 sm:w-16"
      />
    </>
  )
}
