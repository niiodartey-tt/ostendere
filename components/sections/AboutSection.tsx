import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const STATS = [
  { value: '2014',  label: 'Established' },
  { value: '11/cm', label: 'Hand stitches' },
  { value: '2',     label: 'Fittings minimum' },
]

export function AboutSection() {
  return (
    <>
      <div className="w-full h-px" style={{ background: 'rgba(236,227,210,0.08)' }} aria-hidden="true" />

      <section
        id="about"
        aria-labelledby="about-heading"
        className="panel-sticky grid place-items-center"
        style={{ background: '#1c1611' }}
      >
        <div
          className="relative z-[10] w-full max-w-site mx-auto grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] items-center gap-[clamp(40px,6vw,100px)]"
          style={{ padding: 'clamp(60px,8vh,120px) clamp(24px,5vw,72px)' }}
        >
          {/* Portrait */}
          <RevealOnScroll direction="left">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/5', background: '#2f231a' }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Daniel Cofie, founder and head cutter of Ostendere, Accra"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
            </div>
          </RevealOnScroll>

          {/* Copy */}
          <RevealOnScroll delay={0.08}>
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
              09 — The Atelier
            </span>

            <blockquote
              id="about-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px,3.4vw,54px)',
                lineHeight: 1.12,
                fontWeight: 500,
                color: '#ece3d2',
                marginTop: 24,
              }}
            >
              A suit should{' '}
              <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>arrive</em>{' '}
              before you speak — and keep its silence after.
            </blockquote>

            <p
              className="mt-7 max-w-[46ch]"
              style={{ color: '#b9ac97', fontSize: 19 }}
            >
              Ostendere was founded in Accra — each garment drafted by hand, canvassed in horsehair, and finished over no fewer than two fittings. The house dresses men who would rather be remembered than noticed.
            </p>

            <p
              className="mt-[34px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 30,
                color: '#ece3d2',
              }}
            >
              Daniel Cofie
            </p>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#8a7d6b',
              }}
            >
              Founder &amp; Head Cutter
            </span>

            {/* Stats */}
            <dl className="flex gap-12 mt-10 flex-wrap">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <dt
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 44,
                      lineHeight: 1,
                      color: '#ece3d2',
                    }}
                  >
                    {value}
                  </dt>
                  <dd
                    className="mt-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.32em',
                      textTransform: 'uppercase',
                      color: '#8a7d6b',
                    }}
                  >
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </div>

        <div className="panel-cover" aria-hidden="true" />
      </section>
    </>
  )
}
