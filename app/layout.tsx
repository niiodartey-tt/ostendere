import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Cormorant_Garamond } from 'next/font/google'
import { HeroSceneClient } from '@/components/layout/HeroSceneClient'
import { LenisProvider } from '@/components/layout/LenisProvider'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ostendere',
  description:
    'Premium menswear — suits, accessories, bespoke fashion design by Daniel Cofie',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${cormorant.variable}`}>
      <body className="bg-background text-text-primary antialiased">
        <HeroSceneClient />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
