'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { PackageModal } from '@/components/ui/PackageModal'
import { Toast } from '@/components/ui/Toast'
import { PACKAGES, type Package } from '@/lib/catalog-data'

export function PackagesSection() {
  const [openPkg, setOpenPkg] = useState<Package | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const handleInquire = useCallback(() => {
    setOpenPkg(null)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3200)
  }, [])

  return (
    <>
      <section
        id="packages"
        aria-labelledby="packages-heading"
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
                02 — The Edit
              </span>
              <h2
                id="packages-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(40px,6vw,92px)',
                  lineHeight: 0.95,
                  letterSpacing: '0.01em',
                  color: '#ece3d2',
                }}
              >
                Dressed, <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>by character</em>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <p style={{ fontSize: 'clamp(18px,1.5vw,22px)', color: '#b9ac97', maxWidth: '38ch', lineHeight: 1.5 }}>
                Four curated accessory boxes — tie, square and hardware — each composed for a different way of being seen. Open one to see what's inside.
              </p>
            </RevealOnScroll>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(12px,1.2vw,20px)]">
            {PACKAGES.map((pkg, i) => (
              <RevealOnScroll key={pkg.id} delay={i * 0.06}>
                <article
                  className="relative overflow-hidden cursor-pointer isolation-isolate group"
                  style={{ background: '#ece2d0' }}
                  onClick={() => setOpenPkg(pkg)}
                  onKeyDown={(e) => e.key === 'Enter' && setOpenPkg(pkg)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${pkg.name}`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={pkg.hero}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                    {/* Shade */}
                    <div
                      className="absolute inset-0 z-[2]"
                      style={{ background: 'linear-gradient(to top, rgba(12,9,6,0.92) 8%, rgba(12,9,6,0.1) 55%, transparent)' }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Info overlay */}
                  <div className="absolute left-0 right-0 bottom-0 z-[3] px-5 pb-[22px] pt-0">
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#c79a6b',
                      }}
                    >
                      {pkg.tag}
                    </div>
                    <div
                      className="mt-2 mb-[10px]"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(22px,1.8vw,28px)',
                        lineHeight: 1.04,
                        color: '#ece3d2',
                      }}
                    >
                      {pkg.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.1em',
                        color: '#b9ac97',
                      }}
                    >
                      Contact for pricing
                    </div>
                    {/* M2: always visible on mobile, hover-reveal on desktop */}
                    <div
                      className="mt-[14px] inline-flex items-center gap-2 opacity-100 sm:opacity-0 sm:translate-y-2 transition-[opacity,transform] duration-[400ms] sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#ece3d2',
                      }}
                    >
                      Open the box →
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <PackageModal
        pkg={openPkg}
        onClose={() => setOpenPkg(null)}
        onInquire={handleInquire}
      />

      <Toast visible={toastVisible} message="Noted — our studio will be in touch within two business days." />
    </>
  )
}
