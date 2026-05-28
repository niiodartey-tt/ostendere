import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Cormorant_Garamond } from 'next/font/google'
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
      <body className="text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0a0d1a] focus:text-silver focus:border focus:border-silver/60"
        >
          Skip to main content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
