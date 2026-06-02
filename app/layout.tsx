import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Cormorant_Garamond, EB_Garamond, Jost } from 'next/font/google'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ostendere — The Art of Being Seen',
  description:
    'Premium menswear — bespoke suits, accessories and pocket squares by Daniel Cofie. Accra, Ghana.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${cormorant.variable} ${ebGaramond.variable} ${jost.variable}`}
    >
      <body className="bg-espresso text-cream antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-espresso focus:text-cream focus:border focus:border-cream/30"
        >
          Skip to main content
        </a>
        <LenisProvider>{children}</LenisProvider>
        <ScrollToTop />
      </body>
    </html>
  )
}
