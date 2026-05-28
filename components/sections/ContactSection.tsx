'use client'
import { ContactForm } from '@/components/sections/ContactForm'
import ParallaxBackground from '@/components/ui/ParallaxBackground'

export function ContactSection() {
  return (
    <>
      <div className="w-full h-px bg-[rgba(192,192,192,0.2)]" aria-hidden="true" />

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative z-[2] bg-[#060810] px-4 py-24 sm:px-8 lg:px-16 lg:py-32"
      >
        <ParallaxBackground speed={0.15} className="mx-auto max-w-6xl flex flex-col md:flex-row gap-16 lg:gap-24">

          {/* Left — heading + details */}
          <div className="w-full md:w-[45%] shrink-0">
            <p className="mb-6 text-xs tracking-[0.4em] uppercase text-text-muted">
              Get in Touch
            </p>

            <h2
              id="contact-heading"
              className="font-display font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-[#E8E8E8]"
            >
              Begin Your<br />
              Ostendere<br />
              Experience.
            </h2>

            <div className="mt-6 mb-8 h-px w-15 bg-silver/40" aria-hidden="true" />

            <p className="text-sm leading-[2] text-text-secondary max-w-[380px] mb-10">
              Whether you have a vision or need guidance — every great suit begins with a conversation. Reach out and let us create something remarkable together.
            </p>

            <address className="not-italic flex flex-col gap-3">
              <span className="text-xs tracking-widest uppercase text-text-muted">
                Accra, Ghana
              </span>
              <a
                href="https://instagram.com/ostendere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-text-muted hover:text-text-secondary transition-colors duration-200"
                aria-label="Ostendere on Instagram (opens in new tab)"
              >
                @ostendere
              </a>
              <a
                href="https://wa.me/233000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-text-muted hover:text-text-secondary transition-colors duration-200"
                aria-label="Contact Ostendere on WhatsApp (opens in new tab)"
              >
                WhatsApp →
              </a>
            </address>
          </div>

          {/* Right — form */}
          <div className="w-full md:w-[55%]">
            <ContactForm />
          </div>

        </ParallaxBackground>
      </section>
    </>
  )
}
