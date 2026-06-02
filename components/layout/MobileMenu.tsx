'use client'
import { useEffect, useRef } from 'react'

const LINKS = [
  { label: 'Suiting',     href: '#suits' },
  { label: 'The Edit',    href: '#packages' },
  { label: 'Accessories', href: '#accessories' },
  { label: 'Squares',     href: '#squares' },
  { label: 'GRWM',        href: '#grwm' },
  { label: 'Atelier',     href: '#about' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* focus trap + Escape */
  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement as HTMLElement | null
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const menu = menuRef.current
      if (!menu) return
      const focusable = menu.querySelectorAll<HTMLElement>('a, button')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault()
        ;(e.shiftKey ? last : first)?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      className="fixed inset-0 z-[80] lg:hidden flex flex-col justify-center px-8"
      style={{
        background: '#1c1611',
        clipPath: isOpen
          ? 'circle(150% at calc(100% - 44px) 32px)'
          : 'circle(0% at calc(100% - 44px) 32px)',
        transition: 'clip-path 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <nav aria-label="Mobile navigation">
        <ul className="flex flex-col">
          {LINKS.map(({ label, href }) => (
            <li key={label} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <a
                href={href}
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className="block py-4 text-cream hover:text-brass transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px,8vw,40px)',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#bespoke"
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
        className="mt-8 self-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#c79a6b',
        }}
      >
        Book a Fitting →
      </a>
    </div>
  )
}
