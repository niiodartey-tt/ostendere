'use client'
import { useParallax } from '@/hooks/useParallax'

interface Props {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function ParallaxBackground({ children, speed = 0.15, className }: Props) {
  const ref = useParallax(speed)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
