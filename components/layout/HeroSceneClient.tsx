'use client'
import { lazy, Suspense } from 'react'

const LazyHeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene }))
)

export function HeroSceneClient() {
  return (
    <Suspense fallback={null}>
      <LazyHeroScene />
    </Suspense>
  )
}
