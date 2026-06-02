import { IntroOverlay } from '@/components/sections/IntroOverlay'
import { Navbar } from '@/components/layout/Navbar'
import { HeroVideo } from '@/components/sections/HeroVideo'
import { HeroContent } from '@/components/sections/HeroContent'
import { SuitsSection } from '@/components/sections/SuitsSection'
import { PackagesSection } from '@/components/sections/PackagesSection'
import { AccessoriesSection } from '@/components/sections/AccessoriesSection'
import { PinDrawerSection } from '@/components/sections/PinDrawerSection'
import { PocketSquaresSection } from '@/components/sections/PocketSquaresSection'
import { WatchesSection } from '@/components/sections/WatchesSection'
import { GrwmSection } from '@/components/sections/GrwmSection'
import { LookbookPanel } from '@/components/sections/LookbookPanel'
import { AboutSection } from '@/components/sections/AboutSection'
import { BespokeSection } from '@/components/sections/BespokeSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section
          id="top"
          className="relative h-svh w-full overflow-hidden"
          aria-label="Ostendere — The Art of Being Seen"
        >
          <HeroVideo />
          <HeroContent />
        </section>

        {/* Product catalogue */}
        <SuitsSection />
        <PackagesSection />
        <AccessoriesSection />
        <PinDrawerSection />
        <PocketSquaresSection />
        <WatchesSection />
        <GrwmSection />

        {/* Narrative stack — sticky parallax panels */}
        <div className="panel-stack">
          <LookbookPanel />
          <AboutSection />
          <BespokeSection />
        </div>
      </main>

      <Footer />
    </>
  )
}
