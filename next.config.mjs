/** @type {import('next').NextConfig} */

// TODO Sprint 3: Replace 'unsafe-inline' with nonce-based CSP before production launch on ostendere.com
// See: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
// Next.js 16 Turbopack injects inline scripts during hydration — hash-based approach not viable
// (hashes change per build). Nonce-based middleware is the correct production solution.
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' cdn.sanity.io images.unsplash.com plus.unsplash.com data: blob:",
  "media-src 'self' cdn.sanity.io",
  "connect-src 'self' api.sanity.io cdn.sanity.io wss://ws-us3.pusher.com https://sockjs-us3.pusher.com",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  experimental: {
    scrollRestoration: false,
  },
}

export default nextConfig
