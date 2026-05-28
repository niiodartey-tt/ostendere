'use client'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function HeroContent() {
  const reduced = useReducedMotion()
  const duration = reduced ? 0 : 1.4

  return (
    <section className="relative flex h-[100svh] w-full flex-col items-center justify-start pt-[38vh] text-center">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.9, ease: 'easeOut' }}
        className="mb-8 h-px w-16 origin-left bg-[#C0C0C0]/40 sm:w-24"
      />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay: reduced ? 0 : 0.3, ease }}
        className="font-display font-light uppercase tracking-[0.35em] text-[#E8E8E8] text-[clamp(1.8rem,7vw,6.5rem)]"
      >
        Ostendere
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 1.0, delay: reduced ? 0 : 0.55, ease }}
        className="mt-5 font-sans text-[0.65rem] font-light tracking-[0.5em] uppercase text-[#A0A0A0] sm:text-xs"
      >
        Precision. Craft. Distinction.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.75, ease: 'easeOut' }}
        className="mt-8 h-px w-16 origin-left bg-[#C0C0C0]/40 sm:w-24"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 1.0, delay: reduced ? 0 : 1.4 }}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#A0A0A0]/60">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-[#C0C0C0]/20">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-[#C0C0C0]/60"
            animate={{ scaleY: [0, 1, 1, 0], y: ['0%', '0%', '0%', '100%'] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: 'easeInOut',
              times: [0, 0.4, 0.6, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
