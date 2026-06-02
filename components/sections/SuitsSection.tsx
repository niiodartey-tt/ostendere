'use client'
import { useState, useCallback } from 'react'
import { FilterBar } from '@/components/ui/FilterBar'
import { SuitCard } from '@/components/ui/SuitCard'
import { SuitQuickview } from '@/components/ui/SuitQuickview'
import { Toast } from '@/components/ui/Toast'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { SUITS, SUIT_FILTERS, type Suit } from '@/lib/catalog-data'

export function SuitsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [openSuit, setOpenSuit] = useState<Suit | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const filtered = activeFilter === 'all'
    ? SUITS
    : SUITS.filter((s) => s.color === activeFilter)

  const filterOptions = SUIT_FILTERS.map((f) => ({
    key: f.key,
    label: f.label,
    count: f.key === 'all' ? SUITS.length : SUITS.filter((s) => s.color === f.key).length,
  }))

  const handleInquire = useCallback(() => {
    setOpenSuit(null)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3200)
  }, [])

  return (
    <>
      <section
        id="suits"
        aria-labelledby="suits-heading"
        className="relative z-[20] bg-espresso"
        style={{ padding: 'clamp(90px,12vh,180px) clamp(24px,5vw,72px)' }}
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
                01 — The Collection
              </span>
              <h2
                id="suits-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(40px,6vw,92px)',
                  lineHeight: 0.95,
                  letterSpacing: '0.01em',
                  color: '#ece3d2',
                }}
              >
                Suiting, <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>cut to be seen</em>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <p
                style={{
                  fontSize: 'clamp(18px,1.5vw,22px)',
                  color: '#b9ac97',
                  maxWidth: '38ch',
                  lineHeight: 1.5,
                }}
              >
                Single- and double-breasted houses in worsted, drafted by hand and finished over two fittings. Filter by cloth — open any piece for the full cut.
              </p>
            </RevealOnScroll>
          </div>

          {/* Filter bar */}
          <RevealOnScroll>
            <FilterBar
              options={filterOptions}
              active={activeFilter}
              onChange={setActiveFilter}
              className="mb-[clamp(32px,4vh,54px)]"
            />
          </RevealOnScroll>

          {/* Grid */}
          {/* C3 Fix A: single column on mobile so suit cards have full width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(14px,1.4vw,24px)]">
            {filtered.map((suit, i) => (
              <SuitCard key={suit.id} suit={suit} index={i} onOpen={(id) => {
                const found = SUITS.find((s) => s.id === id) ?? null
                setOpenSuit(found)
              }} />
            ))}
          </div>
        </div>
      </section>

      <SuitQuickview
        suit={openSuit}
        onClose={() => setOpenSuit(null)}
        onInquire={handleInquire}
      />

      <Toast visible={toastVisible} message="Noted — our studio will be in touch within two business days." />
    </>
  )
}
