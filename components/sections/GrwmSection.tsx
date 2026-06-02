'use client'
import { useEffect, useRef } from 'react'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { GRWM_REELS } from '@/lib/catalog-data'

function GrwmReel({ reel }: { reel: typeof GRWM_REELS[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLElement>(null)

  /* lazy-load: only play when visible */
  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.load()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={wrapRef}
      className="reel-wrap relative flex-none overflow-hidden cursor-pointer group"
      style={{
        width: 'clamp(240px,22vw,320px)',
        aspectRatio: '9/16',
        background: '#000',
        scrollSnapAlign: 'start',
      }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover transition-[transform,filter] duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        style={{ filter: 'brightness(0.78) saturate(0.92)' }}
        onMouseEnter={(e) => {
          const v = e.currentTarget
          v.style.filter = 'brightness(0.95)'
          v.play().catch(() => undefined)
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'brightness(0.78) saturate(0.92)'
        }}
        aria-label={reel.title}
      >
        <source src={reel.src} type="video/mp4" />
      </video>

      {/* Grade */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10,7,4,0.92) 4%, transparent 42%, transparent 70%, rgba(10,7,4,0.4) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 z-[3] flex justify-between items-center">
        <span
          className="inline-flex items-center gap-[7px]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#ece3d2',
          }}
        >
          <span
            className="w-[7px] h-[7px] rounded-full bg-brass"
            style={{ animation: 'pulse-brass 1.8s infinite' }}
            aria-hidden="true"
          />
          New
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            color: '#b9ac97',
          }}
        >
          {reel.duration}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="reel-bar absolute left-0 bottom-0 h-[3px] w-full z-[4]"
        style={{ background: 'rgba(236,227,210,0.18)' }}
        aria-hidden="true"
      />

      {/* Info */}
      <div className="absolute left-4 right-4 bottom-[18px] z-[3]">
        <span
          className="block mb-[6px]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#c79a6b',
          }}
        >
          {reel.episode}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            lineHeight: 1.08,
            color: '#ece3d2',
          }}
        >
          {reel.title}
        </h3>
      </div>
    </article>
  )
}

export function GrwmSection() {
  return (
    <section
      id="grwm"
      aria-labelledby="grwm-heading"
      className="relative z-[20]"
      style={{ background: '#241b14', padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}
    >
      <div className="max-w-site mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-8 flex-wrap mb-[clamp(40px,6vh,80px)]">
          <RevealOnScroll>
            <span
              className="inline-flex items-center gap-3 mb-[22px]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#c79a6b',
              }}
            >
              <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
              07 — Get Ready With Me
            </span>
            <h2
              id="grwm-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(40px,6vw,92px)',
                lineHeight: 0.95,
                letterSpacing: '0.01em',
                color: '#ece3d2',
              }}
            >
              Dressing, <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>in real time</em>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
              Short films on knots, cloth, and the rules worth breaking. Hover to preview, drag the rail to browse.
            </p>
          </RevealOnScroll>
        </div>

        {/* Rail */}
        <RevealOnScroll>
          <div
            className="flex gap-[clamp(16px,1.6vw,26px)] overflow-x-auto pb-[18px] hide-scrollbar"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            aria-label="GRWM video series — drag to browse"
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
