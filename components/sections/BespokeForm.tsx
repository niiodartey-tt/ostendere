'use client'
import { useRef, useState, useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const bespokeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  email: z.string().email('Valid email required').trim(),
  occasion: z.enum(
    ['everyday', 'wedding', 'wardrobe', 'outerwear', 'general'] as const
  ).refine((v) => !!v, { message: 'Please select an occasion' }),
  phone: z.union([
    z.string().regex(/^(\+233|0)[0-9]{9}$/, 'Use +233XXXXXXXXX or 0XXXXXXXXX'),
    z.literal(''),
  ]),
  message: z.string().max(2000).optional().default(''),
  website: z.string().max(0).default(''),
})

type BespokeFormValues = z.infer<typeof bespokeSchema>
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(236,227,210,0.14)',
  color: '#ece3d2',
  fontFamily: 'var(--font-serif)',
  fontSize: 19,
  padding: '10px 0',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.4s cubic-bezier(0.22,1,0.36,1)',
}

const labelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.32em',
  textTransform: 'uppercase' as const,
  color: '#8a7d6b',
  display: 'block',
}

export function BespokeForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const mountTime = useRef(0)

  useEffect(() => { mountTime.current = Date.now() }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BespokeFormValues>({
    resolver: zodResolver(bespokeSchema) as unknown as Resolver<BespokeFormValues>,
    defaultValues: { website: '', phone: '', message: '' },
  })

  const onSubmit = async (data: BespokeFormValues) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _timestamp: mountTime.current }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  /* success state */
  if (status === 'success') {
    return (
      <div
        className="text-center border px-[clamp(28px,3vw,44px)] py-12"
        style={{
          background: 'rgba(20,15,11,0.6)',
          backdropFilter: 'blur(14px)',
          borderColor: 'rgba(236,227,210,0.14)',
        }}
      >
        <Image
          src="/images/mark-brass.png"
          alt=""
          width={46}
          height={46}
          className="mx-auto mb-4"
        />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            color: '#ece3d2',
          }}
        >
          Thank you.
        </p>
        <p
          className="mt-[10px]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#c79a6b',
          }}
        >
          Our studio will write within two business days.
        </p>
      </div>
    )
  }

  return (
    <div
      className="border"
      style={{
        background: 'rgba(20,15,11,0.6)',
        backdropFilter: 'blur(14px)',
        borderColor: 'rgba(236,227,210,0.14)',
        padding: 'clamp(28px,3vw,44px)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 30,
          fontWeight: 500,
          marginBottom: 24,
          color: '#ece3d2',
        }}
      >
        Request an appointment
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot */}
        <input
          {...register('website')}
          type="text"
          aria-hidden="true"
          tabIndex={-1}
          className="hidden"
          autoComplete="off"
        />

        <div className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label htmlFor="bespoke-name" style={labelStyle}>Full name</label>
            <input
              id="bespoke-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              style={inputStyle}
              aria-invalid={errors.name !== undefined}
              aria-describedby={errors.name ? 'bespoke-name-error' : undefined}
              {...register('name')}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#c79a6b' }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(236,227,210,0.14)' }}
            />
            {errors.name && (
              <p id="bespoke-name-error" role="alert" className="mt-1 text-xs text-brass/80">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="bespoke-email" style={labelStyle}>Email</label>
            <input
              id="bespoke-email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              style={inputStyle}
              aria-invalid={errors.email !== undefined}
              aria-describedby={errors.email ? 'bespoke-email-error' : undefined}
              {...register('email')}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#c79a6b' }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(236,227,210,0.14)' }}
            />
            {errors.email && (
              <p id="bespoke-email-error" role="alert" className="mt-1 text-xs text-brass/80">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Occasion */}
          <div>
            <label htmlFor="bespoke-occasion" style={labelStyle}>The occasion</label>
            <select
              id="bespoke-occasion"
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
              aria-invalid={errors.occasion !== undefined}
              aria-describedby={errors.occasion ? 'bespoke-occasion-error' : undefined}
              defaultValue=""
              {...register('occasion')}
            >
              <option value="" disabled style={{ background: '#2f231a' }}>Select…</option>
              <option value="everyday"  style={{ background: '#2f231a' }}>Everyday suiting</option>
              <option value="wedding"   style={{ background: '#2f231a' }}>Wedding / black tie</option>
              <option value="wardrobe"  style={{ background: '#2f231a' }}>Full wardrobe</option>
              <option value="outerwear" style={{ background: '#2f231a' }}>Outerwear</option>
              <option value="general"   style={{ background: '#2f231a' }}>General enquiry</option>
            </select>
            {errors.occasion && (
              <p id="bespoke-occasion-error" role="alert" className="mt-1 text-xs text-brass/80">
                {errors.occasion.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="bespoke-phone" style={labelStyle}>Phone (optional)</label>
            <input
              id="bespoke-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+233 XX XXX XXXX"
              style={inputStyle}
              aria-invalid={errors.phone !== undefined}
              aria-describedby={errors.phone ? 'bespoke-phone-error' : undefined}
              {...register('phone')}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#c79a6b' }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(236,227,210,0.14)' }}
            />
            {errors.phone && (
              <p id="bespoke-phone-error" role="alert" className="mt-1 text-xs text-brass/80">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="bespoke-message" style={labelStyle}>Message (optional)</label>
            <textarea
              id="bespoke-message"
              rows={3}
              placeholder="Anything else you'd like us to know…"
              style={{ ...inputStyle, resize: 'none' }}
              {...register('message')}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#c79a6b' }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(236,227,210,0.14)' }}
            />
          </div>

          {/* Error state */}
          <div aria-live="polite" aria-atomic="true" className="text-xs" style={{ color: '#b9ac97' }}>
            {status === 'error' && 'Something went wrong. Please try again.'}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className={cn(
              'w-full min-h-[44px] mt-2 border-none cursor-pointer transition-[background] duration-[400ms]',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60',
              status === 'loading' ? 'opacity-60 cursor-not-allowed' : 'hover:bg-brass'
            )}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: '#ece3d2',
              color: '#1c1611',
              padding: 18,
            }}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="h-3 w-3 rounded-full border border-espresso/60 border-t-transparent animate-spin"
                  aria-hidden="true"
                />
                Sending…
              </span>
            ) : (
              'Request Appointment'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
