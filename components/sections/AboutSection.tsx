import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function AboutSection() {
  return (
    <>
      <div className="w-full h-px bg-[rgba(192,192,192,0.2)]" aria-hidden="true" />

      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative z-[2] bg-[#060810] px-4 py-24 sm:px-8 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 items-start">

          {/* Left — portrait image */}
          <RevealOnScroll direction="left" className="w-full md:w-[55%] shrink-0">
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[600px] border border-[rgba(192,192,192,0.15)]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop"
                alt="Daniel Cofie, founder and designer of Ostendere Premium Menswear, Accra"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </RevealOnScroll>

          {/* Right — copy */}
          <RevealOnScroll delay={0.15} className="w-full md:w-[45%]">
            <p className="mb-6 text-xs tracking-[0.4em] uppercase text-text-muted">
              About the Designer
            </p>

            <h2
              id="about-heading"
              className="font-sans font-light text-[clamp(2rem,4vw,3.5rem)] tracking-wide text-[#E8E8E8] leading-tight"
            >
              Daniel Cofie
            </h2>

            <div className="mt-6 mb-6 h-px w-15 bg-silver/40" aria-hidden="true" />

            <div className="space-y-5 text-sm leading-[2] text-text-secondary max-w-[480px]">
              <p>
                Daniel Cofie trained under some of West Africa's most rigorous master tailors before founding Ostendere in Accra. His work is shaped by a singular belief: that a well-made suit is not clothing — it is an argument for the man wearing it.
              </p>
              <p>
                Every Ostendere garment begins with a conversation about the life it will be worn in. A board presentation in Accra, a wedding in London, a negotiation in Abuja. The suit must work as hard as the man who wears it. Precision is the only acceptable standard.
              </p>
              <p>
                Ostendere serves the modern African gentleman who moves across continents without surrendering his identity. The craft is Ghanaian. The ambition is global. The result is a wardrobe that announces arrival without raising its voice.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[rgba(192,192,192,0.1)]">
              <p className="text-sm italic text-text-muted mb-3">
                Every suit begins with a conversation.
              </p>
              <a
                href="#contact"
                className="text-xs tracking-widest uppercase text-silver hover:text-silver-light transition-colors duration-200"
              >
                Book a Consultation →
              </a>
            </div>
          </RevealOnScroll>

        </div>
      </section>
    </>
  )
}
