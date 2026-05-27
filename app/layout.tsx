import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body style={{ backgroundColor: 'var(--background)' }}>{children}</body>
    </html>
  )
}
