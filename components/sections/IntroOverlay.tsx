'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const CHARS = 'OSTENDERE'.split('')
const LIGHT_COUNT = 5

export function IntroOverlay() {
  const [state, setState] = useState<'playing' | 'done'>('playing')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const seen = sessionStorage.getItem('ost_intro_seen')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (seen || reduced) {
      setState('done')
      return
    }

    document.documentElement.style.overflow = 'hidden'

    const t = setTimeout(() => {
      setState('done')
      document.documentElement.style.overflow = ''
      sessionStorage.setItem('ost_intro_seen', '1')
    }, 3600)

    return () => clearTimeout(t)
  }, [])

  function skip() {
    setState('done')
    document.documentElement.style.overflow = ''
    sessionStorage.setItem('ost_intro_seen', '1')
  }

  if (state === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[1000] bg-espresso grid place-items-center overflow-hidden"
      aria-hidden="true"
    >
      {/* brass glow */}
      <div
        className="absolute inset-0 z-[1] opacity-0"
        style={{
          background: 'radial-gradient(40vmax 40vmax at 50% 50%, rgba(199,154,107,0.14), transparent 70%)',
          animation: 'introGlow 2.6s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',
        }}
      />

      {/* centre content */}
      <div className="relative z-[2] text-center">
        {/* mark emblem */}
        <div
          className="w-[clamp(70px,9vw,120px)] mx-auto mb-8 opacity-0"
          style={{ animation: 'introEmblem 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards', transform: 'scale(0.6) rotate(-25deg)' }}
        >
          <Image
            src="/images/mark-cream.png"
            alt=""
            width={120}
            height={120}
            className="w-full"
            style={{ filter: 'drop-shadow(0 0 22px rgba(199,154,107,0.5))' }}
            priority
          />
        </div>

        {/* wordmark letter-by-letter */}
        <div
          className="flex justify-center overflow-hidden"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(40px,9vw,132px)',
            letterSpacing: '0.04em',
            lineHeight: 1,
            color: '#ece3d2',
          }}
          aria-label="Ostendere"
        >
          {CHARS.map((char, i) => (
            <span
              key={i}
              className="inline-block opacity-0"
              style={{
                fontWeight: i < LIGHT_COUNT ? 400 : 700,
                transform: 'translateY(110%)',
                animation: 'introChar 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
                animationDelay: `${0.9 + i * 0.08}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* brass rule */}
        <div
          className="h-px bg-brass mx-auto mt-6 mb-[18px] w-0"
          style={{ animation: 'introRule 0.9s cubic-bezier(0.22,1,0.36,1) 1.7s forwards' }}
        />

        {/* tagline */}
        <p
          className="opacity-0"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(10px,1vw,12px)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: '#8a7d6b',
            animation: 'introTag 0.9s cubic-bezier(0.22,1,0.36,1) 2s forwards',
          }}
        >
          The Art of Being Seen
        </p>
      </div>

      {/* skip button */}
      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 right-8 z-[3] flex items-center gap-2 bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#8a7d6b',
        }}
      >
        Skip <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
