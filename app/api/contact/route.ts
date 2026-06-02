import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  email: z.string().email('Valid email required').toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^(\+233|0)[0-9]{9}$/, 'Invalid phone format')
    .optional()
    .or(z.literal(''))
    .transform((v) => v || undefined),
  occasion: z
    .enum(['everyday', 'wedding', 'wardrobe', 'outerwear', 'general'])
    .optional(),
  /* legacy field kept for backwards-compat if old form submits */
  service: z
    .enum(['bespoke', 'ready-to-wear', 'accessories', 'general'])
    .optional(),
  message: z.string().max(2000).trim().optional().default(''),
  website: z.string().max(0).optional(),
  _timestamp: z.number().optional(),
})

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3_600_000 })
    return true
  }

  if (limit.count >= 3) return false
  limit.count++
  return true
}

export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  /* honeypot — silent success for bots */
  if ('website' in body && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true })
  }

  /* timestamp check — silent success for sub-3-second submissions */
  const ts = (body as Record<string, unknown>)._timestamp
  if (typeof ts === 'number' && Date.now() - ts < 3000) {
    return NextResponse.json({ success: true })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Please check your submission and try again.' }, { status: 400 })
  }

  const { name, occasion, service } = result.data
  const enquiryType = occasion ?? service ?? 'general'

  try {
    // TODO Phase 2: Replace with Resend email forwarding to DANIEL_CONTACT_EMAIL
    console.log('Bespoke enquiry received', { name, enquiryType, submittedAt: new Date().toISOString() })

    return NextResponse.json({ success: true })
  } catch {
    console.error('Contact route error')
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function GET(): Promise<Response> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
