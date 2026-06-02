'use client'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'none'
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealOnScrollProps) {
  const { ref, isVisible } = useInView(0.15)

  const hiddenTranslate =
    direction === 'up'
      ? 'translate-y-10'
      : direction === 'left'
        ? '-translate-x-10'
        : ''

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hiddenTranslate}`,
        className
      )}
    >
      {children}
    </div>
  )
}
