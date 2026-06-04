'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const CHARS = 'OSTENDERE'.split('')
const LIGHT_COUNT = 5

const safeStorage = {
  get: (key: string): string | null => {
    try { return sessionStorage.getItem(key) } catch { return null }
  },
  set: (key: string, value: string): void => {
    try { sessionStorage.setItem(key, value) } catch { /* silent fail */ }
  },
}

export function IntroOverlay() {
  const [state, setState] = useState<'playing' | 'done'>('playing')
  const hasStarted = useRef(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('done')
      return
    }

    if (safeStorage.get('ost_intro_seen')) {
      setState('done')
      return
    }

    document.documentElement.style.overflow = 'hidden'

    setTimeout(() => {
      const el = overlayRef.current
      if (el) {
        el.style.transition = 'opacity 0.6s ease'
        el.style.opacity = '0'
        setTimeout(() => {
          safeStorage.set('ost_intro_seen', '1')
          document.documentElement.style.overflow = ''
          setState('done')
        }, 600)
      } else {
        safeStorage.set('ost_intro_seen', '1')
        document.documentElement.style.overflow = ''
        setState('done')
      }
    }, 5000)
  }, [])

  function skip() {
    const el = overlayRef.current
    if (el) {
      el.style.transition = 'opacity 0.4s ease'
      el.style.opacity = '0'
      setTimeout(() => {
        safeStorage.set('ost_intro_seen', '1')
        document.documentElement.style.overflow = ''
        setState('done')
      }, 400)
    } else {
      safeStorage.set('ost_intro_seen', '1')
      document.documentElement.style.overflow = ''
      setState('done')
    }
  }

  if (state === 'done') return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] min-h-[100dvh] bg-espresso grid place-items-center overflow-hidden"
      aria-hidden="true"
    >
      {/* brass glow */}
      <div
        className="absolute inset-0 z-[1] opacity-0"
        style={{
          background: 'radial-gradient(40vmax 40vmax at 50% 50%, rgba(199,154,107,0.14), transparent 70%)',
          animation: 'introGlow 2.6s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',
          animationPlayState: 'running',
        }}
      />

      {/* centre content */}
      <div className="relative z-[2] text-center w-full px-4 sm:px-0">
        {/* mark emblem */}
        <div
          className="w-[clamp(70px,9vw,120px)] mx-auto mb-8 opacity-0"
          style={{ animation: 'introEmblem 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards', animationPlayState: 'running', transform: 'scale(0.6) rotate(-25deg)' }}
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
            fontSize: 'clamp(2rem,8vw,6rem)',
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
                animationPlayState: 'running',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* brass rule */}
        <div
          className="h-px bg-brass mx-auto mt-6 mb-[18px] w-0"
          style={{ animation: 'introRule 0.9s cubic-bezier(0.22,1,0.36,1) 1.7s forwards', animationPlayState: 'running' }}
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
            animationPlayState: 'running',
          }}
        >
          The Art of Being Seen
        </p>
      </div>

      {/* skip button */}
      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 right-8 z-[3] flex items-center justify-end gap-2 min-w-[44px] min-h-[44px] px-2 bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60"
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
