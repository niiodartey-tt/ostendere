'use client'

const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      style={{ clipPath: isOpen ? 'circle(150% at 50% 100%)' : 'circle(0% at 50% 100%)' }}
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#060810] transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? '' : 'pointer-events-none'}`}
    >
      <nav>
        <ul className="flex flex-col items-center gap-8 sm:gap-10">
          {navLinks.map(({ label, href }, index) => (
            <li
              key={label}
              className={`transition-[opacity,transform] duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: isOpen ? `${0.25 + index * 0.08}s` : '0s' }}
            >
              <a
                href={href}
                onClick={onClose}
                className="font-display text-5xl sm:text-7xl md:text-8xl font-light text-silver-light tracking-widest uppercase hover:text-platinum transition-colors duration-300 focus-visible:outline-none focus-visible:underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p
        className={`absolute bottom-12 text-xs tracking-[0.4em] uppercase text-text-muted transition-[opacity,transform] duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        style={{ transitionDelay: isOpen ? '0.57s' : '0s' }}
      >
        Ostendere
      </p>
    </div>
  )
}
