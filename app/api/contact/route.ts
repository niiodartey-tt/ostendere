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
  service: z.enum(['bespoke', 'ready-to-wear', 'accessories', 'general']),
  message: z.string().min(10).max(2000).trim(),
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
  // Reject non-JSON content type
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  // Rate limiting — 3 per IP per hour
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

  // Honeypot check — silent success for bots
  if ('website' in body && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true })
  }

  // Timestamp check — silent success for submissions under 3 seconds
  const ts = (body as Record<string, unknown>)._timestamp
  if (typeof ts === 'number' && Date.now() - ts < 3000) {
    return NextResponse.json({ success: true })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Please check your submission and try again.' }, { status: 400 })
  }

  const { name, service } = result.data

  try {
    // TODO Phase 2: Replace with Resend email forwarding to DANIEL_CONTACT_EMAIL
    console.log('Contact enquiry received', { name, service, submittedAt: new Date().toISOString() })

    return NextResponse.json({ success: true })
  } catch {
    console.error('Contact route error')
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function GET(): Promise<Response> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
