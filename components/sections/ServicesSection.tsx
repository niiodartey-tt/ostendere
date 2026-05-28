import { ServiceCard } from '@/components/ui/ServiceCard'

function ScissorsIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="4" />
      <circle cx="8" cy="24" r="4" />
      <line x1="11.5" y1="10.5" x2="24" y2="24" />
      <line x1="11.5" y1="21.5" x2="17" y2="16" />
      <line x1="20" y1="12" x2="28" y2="4" />
    </svg>
  )
}

function HangerIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8 C16 8 19 8 19 11 C19 13 16 14 16 14" />
      <path d="M16 14 L4 24 L28 24" />
      <path d="M14 8 C14 6 15 5 16 5 C17 5 18 6 18 7" />
    </svg>
  )
}

function PocketSquareIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="14" width="20" height="14" />
      <path d="M6 14 L16 4 L26 14" />
      <path d="M11 14 L16 9 L21 14" />
    </svg>
  )
}

export function ServicesSection() {
  return (
    <>
      <div className="w-full h-px bg-[rgba(192,192,192,0.2)]" aria-hidden="true" />

      <section
        id="services"
        aria-labelledby="services-label"
        className="relative z-[2] bg-[#0a0d1a] px-4 py-24 sm:px-8 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <p
            id="services-label"
            className="mb-16 text-xs tracking-[0.4em] uppercase text-text-muted"
          >
            What We Offer
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(192,192,192,0.1)]">
            <ServiceCard
              icon={<ScissorsIcon />}
              title="Bespoke Tailoring"
              description="Every garment is cut and crafted to your exact measurements, personality, and occasion. From the first consultation to the final fitting — your suit, your story."
              ctaLabel="Book a Consultation"
              ctaHref="#contact"
              delay={0}
            />
            <ServiceCard
              icon={<HangerIcon />}
              title="Ready to Wear"
              description="A curated selection of premium suits and separates, available for immediate purchase. Refined silhouettes for the modern gentleman who moves with purpose."
              ctaLabel="View Collection"
              ctaHref="#collection"
              delay={0.15}
            />
            <ServiceCard
              icon={<PocketSquareIcon />}
              title="Accessories"
              description="Pocket squares, watches, cufflinks, and ties — the details that define a look. Each piece selected for the man who understands that excellence lives in the particulars."
              ctaLabel="View Collection"
              ctaHref="#collection"
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </>
  )
}
