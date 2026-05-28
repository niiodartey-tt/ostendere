'use client'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  delay?: number
}

export function ServiceCard({ icon, title, description, ctaLabel, ctaHref, delay = 0 }: ServiceCardProps) {
  const { ref, isVisible } = useInView(0.15)

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'group flex flex-col p-6 sm:p-8 border transition-[opacity,transform,border-color,background-color] duration-300',
        'border-[rgba(192,192,192,0.1)] bg-[rgba(255,255,255,0.02)]',
        'hover:border-[rgba(192,192,192,0.25)] hover:bg-[rgba(255,255,255,0.04)]',
        'motion-reduce:transition-none',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="mb-6 text-silver" aria-hidden="true">
        {icon}
      </div>

      <h3 className="font-sans text-[1.1rem] font-light tracking-wide text-[#E8E8E8] mb-4">
        {title}
      </h3>

      <p className="text-sm leading-[1.8] text-text-secondary flex-1 mb-8">
        {description}
      </p>

      <a
        href={ctaHref}
        className="self-start text-xs tracking-widest uppercase text-silver hover:text-silver-light transition-colors duration-200 focus-visible:outline-none focus-visible:underline min-h-[44px] flex items-center"
      >
        {ctaLabel} →
      </a>
    </div>
  )
}
