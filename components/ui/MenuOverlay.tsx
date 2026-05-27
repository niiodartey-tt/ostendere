'use client'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const overlayVariants = {
  closed: {
    clipPath: 'circle(0% at 50% 100%)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const },
  },
  open: {
    clipPath: 'circle(150% at 50% 100%)',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
  },
}

const listVariants = {
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
}

const itemVariants = {
  closed: { y: 20, opacity: 0 },
  open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const } },
}

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <nav>
            <motion.ul
              className="flex flex-col items-center gap-8 sm:gap-10"
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navLinks.map(({ label, href }) => (
                <motion.li key={label} variants={itemVariants}>
                  <a
                    href={href}
                    onClick={onClose}
                    className="font-display text-5xl sm:text-7xl md:text-8xl font-light text-silver-light tracking-widest uppercase hover:text-platinum transition-colors duration-300 focus-visible:outline-none focus-visible:underline"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* Subtle wordmark at bottom */}
          <motion.p
            className="absolute bottom-12 text-xs tracking-[0.4em] uppercase text-text-muted"
            variants={itemVariants}
          >
            Ostendere
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
