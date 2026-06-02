'use client'
import { useState, useRef, useEffect } from 'react'
import type { GrwmReel as GrwmReelData } from '@/lib/catalog-data'

interface GrwmReelProps {
  reel: GrwmReelData
}

export function GrwmReel({ reel }: GrwmReelProps) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLElement>(null)

  /* lazy-load: only load video when visible */
  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) { video.load(); observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  function handleClick() {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
      setPlaying(false)
    } else {
      video.play().catch(() => undefined)
      setPlaying(true)
    }
  }

  return (
    <article
      ref={wrapRef}
      className="reel-wrap relative flex-none overflow-hidden cursor-pointer group"
      style={{ width: 'clamp(240px,22vw,320px)', aspectRatio: '9/16', background: '#000', scrollSnapAlign: 'start' }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-[transform,filter] duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        style={{ filter: 'brightness(0.78) saturate(0.92)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'brightness(0.95)'
          e.currentTarget.play().catch(() => undefined)
          setPlaying(true)
        }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(0.78) saturate(0.92)' }}
        aria-label={reel.title}
      >
        <source src={reel.src} type="video/mp4" />
      </video>

      {/* Grade */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,7,4,0.92) 4%, transparent 42%, transparent 70%, rgba(10,7,4,0.4) 100%)' }}
        aria-hidden="true" />

      {/* Mobile play indicator — visible on mobile when not playing */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] sm:hidden transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      >
        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center" style={{ backdropFilter: 'blur(4px)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white" className="ml-1">
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
        </div>
      </div>

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 z-[3] flex justify-between items-center">
        <span className="inline-flex items-center gap-[7px]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ece3d2' }}>
          <span className="w-[7px] h-[7px] rounded-full bg-brass" style={{ animation: 'pulse-brass 1.8s infinite' }} aria-hidden="true" />
          New
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: '#b9ac97' }}>
          {reel.duration}
        </span>
      </div>

      <div className="reel-bar absolute left-0 bottom-0 h-[3px] w-full z-[4]"
        style={{ background: 'rgba(236,227,210,0.18)' }} aria-hidden="true" />

      {/* Info */}
      <div className="absolute left-4 right-4 bottom-[18px] z-[3]">
        <span className="block mb-[6px]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c79a6b' }}>
          {reel.episode}
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px,1.6vw,22px)', lineHeight: 1.08, color: '#ece3d2' }}>
          {reel.title}
        </h3>
      </div>
    </article>
  )
}
