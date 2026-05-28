import { HeroContent } from '@/components/sections/HeroContent'
import { HeroInteractive } from '@/components/sections/HeroInteractive'

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen w-full">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <HeroContent />
      </div>
      <HeroInteractive />
    </main>
  )
}
