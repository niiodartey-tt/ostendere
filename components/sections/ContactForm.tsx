'use client'
import { useRef, useState, useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email required'),
  phone: z.union([
    z.string().regex(/^(\+233|0)[0-9]{9}$/, 'Use +233XXXXXXXXX or 0XXXXXXXXX'),
    z.literal(''),
  ]),
  service: z.enum(['bespoke', 'ready-to-wear', 'accessories', 'general']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  website: z.string().max(0).default(''),
})

type ContactFormValues = z.infer<typeof contactSchema>
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string | undefined
  children: React.ReactNode
}

function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-xs tracking-widest uppercase text-text-muted">
        {label}
      </label>
      {children}
      {error !== undefined && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-silver/80">
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  'w-full min-h-[44px] bg-transparent border-b border-[rgba(192,192,192,0.2)] text-sm text-[#E8E8E8] placeholder-[#606060] py-3 focus:outline-none focus:border-[rgba(192,192,192,0.6)] transition-colors duration-200'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const mountTime = useRef(0)

  useEffect(() => { mountTime.current = Date.now() }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    // Cast required: exactOptionalPropertyTypes + zodResolver has a known type mismatch
    resolver: zodResolver(contactSchema) as unknown as Resolver<ContactFormValues>,
    defaultValues: { website: '' },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _timestamp: mountTime.current }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      {/* Honeypot — hidden from real users */}
      <input
        {...register('website')}
        type="text"
        aria-hidden="true"
        tabIndex={-1}
        className="hidden"
        autoComplete="off"
      />

      <Field label="Full Name" htmlFor="name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          className={inputBase}
          aria-invalid={errors.name !== undefined}
          aria-describedby={errors.name !== undefined ? 'name-error' : undefined}
          {...register('name')}
        />
      </Field>

      <Field label="Email Address" htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputBase}
          aria-invalid={errors.email !== undefined}
          aria-describedby={errors.email !== undefined ? 'email-error' : undefined}
          {...register('email')}
        />
      </Field>

      <Field label="Phone Number (optional)" htmlFor="phone" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+233 XX XXX XXXX"
          className={inputBase}
          aria-invalid={errors.phone !== undefined}
          aria-describedby={errors.phone !== undefined ? 'phone-error' : undefined}
          {...register('phone')}
        />
      </Field>

      <Field label="Service Interest" htmlFor="service" error={errors.service?.message}>
        <select
          id="service"
          className={cn(inputBase, 'appearance-none cursor-pointer')}
          aria-invalid={errors.service !== undefined}
          aria-describedby={errors.service !== undefined ? 'service-error' : undefined}
          defaultValue=""
          {...register('service')}
        >
          <option value="" disabled>Select a service</option>
          <option value="bespoke">Bespoke Tailoring</option>
          <option value="ready-to-wear">Ready to Wear</option>
          <option value="accessories">Accessories</option>
          <option value="general">General Enquiry</option>
        </select>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about what you're looking for..."
          className={cn(inputBase, 'resize-none')}
          aria-invalid={errors.message !== undefined}
          aria-describedby={errors.message !== undefined ? 'message-error' : undefined}
          {...register('message')}
        />
      </Field>

      <div aria-live="polite" aria-atomic="true" className="text-xs text-text-secondary">
        {status === 'error' && 'Something went wrong. Please try again.'}
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className={cn(
          'w-full min-h-[44px] border text-xs tracking-widest uppercase',
          'transition-[background-color,border-color] duration-300',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60',
          status === 'success'
            ? 'border-silver/60 text-silver bg-silver/5 cursor-default'
            : 'border-[rgba(192,192,192,0.4)] text-[#E8E8E8] hover:bg-[rgba(192,192,192,0.08)] hover:border-silver'
        )}
      >
        {status === 'loading' && (
          <span className="flex items-center justify-center gap-2">
            <span
              className="h-3 w-3 rounded-full border border-silver/60 border-t-transparent animate-spin"
              aria-hidden="true"
            />
            Sending...
          </span>
        )}
        {status === 'success' && '✓ Message Sent'}
        {(status === 'idle' || status === 'error') && 'Send Message'}
      </button>
    </form>
  )
}
