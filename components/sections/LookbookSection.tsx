import { LookbookGrid } from '@/components/ui/LookbookGrid'
import ParallaxBackground from '@/components/ui/ParallaxBackground'

export function LookbookSection() {
  return (
    <>
      {/* Silver rule separator */}
      <div className="w-full h-px bg-[rgba(192,192,192,0.2)]" aria-hidden="true" />

      <section
        id="collection"
        aria-label="Collection"
        className="relative z-[2] bg-[#0a0d1a] pt-24 pb-32"
      >
        <ParallaxBackground speed={0.1}>
          <LookbookGrid />
        </ParallaxBackground>
      </section>
    </>
  )
}
