'use client'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { BespokeForm } from '@/components/sections/BespokeForm'

const STEPS = [
  { num: '01', text: 'Consultation & measure — 90 minutes' },
  { num: '02', text: 'Cloth & canvas selection' },
  { num: '03', text: 'Two fittings, baste & forward' },
  { num: '04', text: 'Delivery in six to eight weeks' },
]

export function BespokeSection() {
  return (
    <>
      <div className="w-full h-px" style={{ background: 'rgba(236,227,210,0.08)' }} aria-hidden="true" />

      <section
        id="bespoke"
        aria-labelledby="bespoke-heading"
        className="panel-sticky grid place-items-center relative"
        style={{ background: '#3b2c20' }}
      >
        <div
          className="relative z-[10] w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[clamp(40px,6vw,90px)]"
          style={{ padding: 'clamp(60px,8vh,120px) clamp(24px,5vw,72px)' }}
        >
          {/* Left — steps */}
          <RevealOnScroll>
            <span
              className="inline-flex items-center gap-3 mb-6"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#c79a6b',
              }}
            >
              <span className="block w-[34px] h-px bg-brass opacity-70" aria-hidden="true" />
              10 — Bespoke
            </span>

            <h2
              id="bespoke-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(44px,5.4vw,88px)',
                lineHeight: 0.96,
                color: '#ece3d2',
                marginTop: 22,
              }}
            >
              Book a{' '}
              <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>fitting</em>
            </h2>

            <ol className="mt-9 flex flex-col gap-[2px]" aria-label="Bespoke fitting process">
              {STEPS.map(({ num, text }) => (
                <li
                  key={num}
                  className="flex gap-[18px] py-4 border-t items-baseline"
                  style={{ borderColor: 'rgba(236,227,210,0.08)' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: '#c79a6b',
                      flexShrink: 0,
                    }}
                  >
                    {num}
                  </span>
                  <span style={{ fontSize: 19, color: '#b9ac97' }}>{text}</span>
                </li>
              ))}
            </ol>
          </RevealOnScroll>

          {/* Right — form */}
          <RevealOnScroll delay={0.08}>
            <BespokeForm />
          </RevealOnScroll>
        </div>

        <div className="panel-cover" aria-hidden="true" />
      </section>
    </>
  )
}
