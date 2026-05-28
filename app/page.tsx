import { HeroVideo } from '@/components/sections/HeroVideo'
import { HeroContent } from '@/components/sections/HeroContent'
import { HeroInteractive } from '@/components/sections/HeroInteractive'
import { LookbookSection } from '@/components/sections/LookbookSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main id="main-content">
      <HeroVideo />
      <HeroContent />
      <HeroInteractive />
      <LookbookSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
