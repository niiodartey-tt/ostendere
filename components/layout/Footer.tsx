'use client'
import { useState } from 'react'

export function Footer() {
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!emailInput.trim()) return
    setSubscribed(true)
  }

  return (
    <footer
      className="relative z-[20] border-t"
      style={{ background: '#241b14', borderColor: 'rgba(236,227,210,0.08)' }}
    >
      {/* Newsletter */}
      <div
        className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[clamp(32px,5vw,90px)] border-b"
        style={{
          padding: 'clamp(70px,9vh,130px) clamp(24px,5vw,72px)',
          borderColor: 'rgba(236,227,210,0.08)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(34px,4vw,62px)',
            lineHeight: 1,
            color: '#ece3d2',
          }}
        >
          Notes from the<br />
          <em style={{ fontStyle: 'italic', color: '#c79a6b' }}>cutting room</em>
        </h3>

        <div>
          {subscribed ? (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#c79a6b',
              }}
            >
              You're on the list.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} noValidate>
              <div
                className="flex border-b"
                style={{ borderColor: 'rgba(236,227,210,0.14)' }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  aria-label="Email address for newsletter"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none py-[14px]"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 20,
                    color: '#ece3d2',
                  }}
                />
                <button
                  type="submit"
                  className="bg-transparent border-none cursor-pointer pl-5 pr-1 transition-colors duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60 min-h-[44px]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#c79a6b',
                  }}
                >
                  Subscribe →
                </button>
              </div>
              <p
                className="mt-[14px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#8a7d6b',
                }}
              >
                Cloth drops, trunk-show dates, and the occasional GRWM. No noise.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Main footer grid */}
      <div
        className="max-w-site mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10"
        style={{ padding: 'clamp(60px,7vh,100px) clamp(24px,5vw,72px) 40px' }}
      >
        {/* Brand */}
        <div>
          <p
            className="mb-[18px]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: '0.42em',
              color: '#ece3d2',
            }}
          >
            <span style={{ fontWeight: 400 }}>OSTEN</span>
            <span style={{ fontWeight: 700 }}>DERE</span>
          </p>
          <p style={{ color: '#8a7d6b', maxWidth: '32ch', fontSize: 17 }}>
            Tailoring for the moment you are seen. Drafted by hand in Accra, fitted with precision.
          </p>
        </div>

        {/* Atelier */}
        <div>
          <h4
            className="mb-5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8a7d6b',
            }}
          >
            Atelier
          </h4>
          {['#suits', '#packages', '#accessories', '#squares'].map((href, i) => {
            const labels = ['Suiting', 'The Edit', 'Accessories', 'Pocket Squares']
            return (
              <a
                key={href}
                href={href}
                className="block py-[7px] transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:underline"
                style={{ color: '#b9ac97', fontSize: 17 }}
              >
                {labels[i]}
              </a>
            )
          })}
        </div>

        {/* Studio */}
        <div>
          <h4
            className="mb-5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8a7d6b',
            }}
          >
            Studio
          </h4>
          {['#about', '#bespoke', '#grwm', '#watches'].map((href, i) => {
            const labels = ['The House', 'Bespoke', 'GRWM', 'Timepieces']
            return (
              <a
                key={href}
                href={href}
                className="block py-[7px] transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:underline"
                style={{ color: '#b9ac97', fontSize: 17 }}
              >
                {labels[i]}
              </a>
            )
          })}
        </div>

        {/* Connect */}
        <div>
          <h4
            className="mb-5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8a7d6b',
            }}
          >
            Connect
          </h4>
          {[
            { label: 'Instagram', href: 'https://instagram.com/ostendere' },
            { label: 'WhatsApp', href: 'https://wa.me/233000000000' },
            { label: 'hello@ostendere.com', href: 'mailto:hello@ostendere.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="block py-[7px] transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:underline"
              style={{ color: '#b9ac97', fontSize: 17 }}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div
        className="text-center select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(70px,19vw,320px)',
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(236,227,210,0.1)',
          letterSpacing: '0.04em',
          padding: '10px 0 30px',
        }}
        aria-hidden="true"
      >
        OSTENDERE
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-site mx-auto flex justify-between flex-wrap gap-[14px] border-t"
        style={{
          padding: '26px clamp(24px,5vw,72px) 40px',
          borderColor: 'rgba(236,227,210,0.08)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#8a7d6b',
          }}
        >
          © MMXXVI Ostendere
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#8a7d6b',
          }}
        >
          Accra, Ghana
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#8a7d6b',
          }}
        >
          We do not store your personal data.
        </span>
      </div>
    </footer>
  )
}
