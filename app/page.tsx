import { HeroVideo } from '@/components/sections/HeroVideo'
import { HeroContent } from '@/components/sections/HeroContent'
import { HeroInteractive } from '@/components/sections/HeroInteractive'

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <HeroContent />
      <HeroInteractive />

      <section
        id="collection"
        className="flex h-screen w-full items-center justify-center bg-[#0a0d1a]"
        aria-label="Collection"
      >
        <p className="font-display text-2xl font-light tracking-[0.3em] uppercase text-[#A0A0A0]/40">
          Collection
        </p>
      </section>

      <section
        id="about"
        className="flex h-screen w-full items-center justify-center bg-[#0d1020]"
        aria-label="About"
      >
        <p className="font-display text-2xl font-light tracking-[0.3em] uppercase text-[#A0A0A0]/40">
          About
        </p>
      </section>

      <section
        id="services"
        className="flex h-screen w-full items-center justify-center bg-[#0a0d1a]"
        aria-label="Services"
      >
        <p className="font-display text-2xl font-light tracking-[0.3em] uppercase text-[#A0A0A0]/40">
          Services
        </p>
      </section>

      <section
        id="contact"
        className="flex h-screen w-full items-center justify-center bg-[#0d1020]"
        aria-label="Contact"
      >
        <p className="font-display text-2xl font-light tracking-[0.3em] uppercase text-[#A0A0A0]/40">
          Contact
        </p>
      </section>
    </main>
  )
}
