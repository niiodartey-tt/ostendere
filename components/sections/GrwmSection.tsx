'use client'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { GrwmReel } from '@/components/ui/GrwmReel'
import { GRWM_REELS } from '@/lib/catalog-data'

export function GrwmSection() {
  return (
    <section
      id="grwm"
      aria-labelledby="grwm-heading"
      className="relative z-[20]"
      style={{ background: '#241b14', padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}
    >
      <div className="max-w-site mx-auto">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-[clamp(40px,6vh,80px)]">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-3 mb-[22px]"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c79a6b' }}>
              <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
              07 — Get Ready With Me
            </span>
            <h2 id="grwm-heading"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(40px,6vw,92px)', lineHeight: 0.95, letterSpacing: '0.01em', color: '#ece3d2' }}>
              Dressing, <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>in real time</em>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            {/* m5: updated copy from "Hover to preview" to touch-correct wording */}
            <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
              Tap to watch, drag to browse.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div
            className="flex gap-[clamp(16px,1.6vw,26px)] overflow-x-auto pb-[18px] hide-scrollbar"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            aria-label="GRWM video series — tap to watch, drag to browse"
            role="region"
          >
            {GRWM_REELS.map((reel) => (
              <GrwmReel key={reel.id} reel={reel} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
