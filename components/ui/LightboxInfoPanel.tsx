'use client'
import { cn } from '@/lib/utils'
import { CATEGORY_LABELS, type Look } from '@/lib/lookbook-data'

interface LightboxInfoPanelProps {
  look: Look
  isOpen: boolean
  onClose: () => void
}

export function LightboxInfoPanel({ look, isOpen, onClose }: LightboxInfoPanelProps) {
  const handleConsultation = () => {
    onClose()
    setTimeout(() => {
      const target = document.getElementById('contact')
      target?.scrollIntoView({ behavior: 'smooth' })
    }, 250)
  }

  return (
    <div
      className={cn(
        'hidden md:flex flex-col w-full h-full px-10 py-12 bg-[rgba(6,8,16,0.95)]',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100 [animation-delay:0.3s]' : 'opacity-0'
      )}
    >
      <span className="inline-block mb-6 px-3 py-1 text-[0.6rem] tracking-widest uppercase border border-silver/30 text-text-muted w-fit">
        {CATEGORY_LABELS[look.category]}
      </span>

      <h2 className="font-sans text-2xl font-light tracking-wide text-[#E8E8E8] mb-4">
        {look.title}
      </h2>

      <div className="mb-4 h-px w-10 bg-silver/40" />

      <p className="text-sm leading-[1.8] text-text-secondary max-w-xs">
        {look.description}
      </p>

      <div className="flex-1" />

      <button
        type="button"
        onClick={handleConsultation}
        className="w-full py-4 border border-silver/50 text-xs tracking-widest uppercase text-[#E8E8E8] bg-transparent transition-colors duration-300 hover:bg-silver/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60"
      >
        Book a Consultation
      </button>
    </div>
  )
}

