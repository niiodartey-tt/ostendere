import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID())

  /* Vercel Live feedback toolbar only needed in preview / dev */
  const isProd = process.env.VERCEL_ENV === 'production'

  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    ...(isProd ? [] : ["https://vercel.live"]),
  ].join(' ')

  const connectSrc = [
    "'self'",
    'api.sanity.io',
    'cdn.sanity.io',
    ...(isProd ? [] : ['wss://ws-us3.pusher.com', 'https://sockjs-us3.pusher.com']),
  ].join(' ')

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' cdn.sanity.io images.unsplash.com plus.unsplash.com data: blob:",
    "media-src 'self' cdn.sanity.io",
    `connect-src ${connectSrc}`,
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ')

  /* Pass nonce to Next.js App Router so it can apply it to its
     own generated inline <script> tags automatically */
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  matcher: [
    {
      /*
       * Run on all HTML page requests.
       * Skip: _next/static (built JS/CSS chunks), _next/image (optimiser),
       *       favicon.ico (static asset) — these don't need a nonce.
       * missing: skip prefetch requests — the nonce generated here would
       *          differ from the one used when the page actually loads.
       */
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
