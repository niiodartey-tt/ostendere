'use client'
import { cn } from '@/lib/utils'

interface FilterOption {
  key: string
  label: string
  count?: number
}

interface FilterBarProps {
  options: FilterOption[]
  active: string
  onChange: (key: string) => void
  className?: string
}

export function FilterBar({ options, active, onChange, className }: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap gap-[10px]', className)}>
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className={cn(
            'min-h-[44px] px-[18px] py-[11px] border transition-all duration-[350ms] cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60',
            active === opt.key
              ? 'text-espresso bg-brass border-brass'
              : 'text-cream-dim bg-transparent border-line hover:text-cream hover:border-cream-faint'
          )}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          {opt.label}
          {opt.count !== undefined && (
            <span className="ml-[6px] text-cream-faint">{opt.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}
