'use client'

interface CelticNavTriggerProps {
  onClick: () => void
  isOpen: boolean
}

export function CelticNavTrigger({ onClick, isOpen }: CelticNavTriggerProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      onClick={onClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver/60 [.lightbox-open_&]:hidden"
    >
      <svg
        viewBox="0 0 48 48"
        width={48}
        height={48}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          isOpen
            ? 'opacity-50 rounded-full ring-1 ring-silver/30'
            : 'animate-celtic-idle hover:animate-celtic-fast motion-reduce:animate-none'
        }
      >
        {/* Outer circle */}
        <circle cx="24" cy="24" r="21.5" stroke="#C0C0C0" strokeWidth="0.6" strokeOpacity="0.7" />

        {/* Mid rings */}
        <circle cx="24" cy="24" r="14" stroke="#C0C0C0" strokeWidth="0.4" strokeOpacity="0.45" />
        <circle cx="24" cy="24" r="9" stroke="#C0C0C0" strokeWidth="0.4" strokeOpacity="0.35" />

        {/* Cross spokes */}
        <line x1="24" y1="2.5" x2="24" y2="45.5" stroke="#C0C0C0" strokeWidth="0.4" strokeOpacity="0.4" />
        <line x1="2.5" y1="24" x2="45.5" y2="24" stroke="#C0C0C0" strokeWidth="0.4" strokeOpacity="0.4" />

        {/* Diagonal spokes */}
        <line x1="8.7" y1="8.7" x2="39.3" y2="39.3" stroke="#C0C0C0" strokeWidth="0.3" strokeOpacity="0.25" />
        <line x1="39.3" y1="8.7" x2="8.7" y2="39.3" stroke="#C0C0C0" strokeWidth="0.3" strokeOpacity="0.25" />

        {/* Cardinal circles */}
        <circle cx="24" cy="10" r="2.5" fill="#C0C0C0" fillOpacity="0.6" />
        <circle cx="38" cy="24" r="2.5" fill="#C0C0C0" fillOpacity="0.6" />
        <circle cx="24" cy="38" r="2.5" fill="#C0C0C0" fillOpacity="0.6" />
        <circle cx="10" cy="24" r="2.5" fill="#C0C0C0" fillOpacity="0.6" />

        {/* Quadrant arc segments */}
        <path d="M24 10 A14 14 0 0 1 38 24" stroke="#C0C0C0" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
        <path d="M38 24 A14 14 0 0 1 24 38" stroke="#C0C0C0" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
        <path d="M24 38 A14 14 0 0 1 10 24" stroke="#C0C0C0" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
        <path d="M10 24 A14 14 0 0 1 24 10" stroke="#C0C0C0" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />

        {/* Centre dot */}
        <circle cx="24" cy="24" r="1.5" fill="#C0C0C0" fillOpacity="0.8" />
      </svg>
    </button>
  )
}
