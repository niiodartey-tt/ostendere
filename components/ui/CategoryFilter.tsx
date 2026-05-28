'use client'
import { cn } from '@/lib/utils'
import { ALL_CATEGORIES, CATEGORY_LABELS, type LookCategory } from '@/lib/lookbook-data'

interface CategoryFilterProps {
  active: 'all' | LookCategory
  onChange: (category: 'all' | LookCategory) => void
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-0 z-10 bg-[#0a0d1a] py-4">
      <div
        role="tablist"
        aria-label="Filter lookbook by category"
        className="flex gap-2 overflow-x-auto hide-scrollbar px-4 sm:px-8 lg:px-16 sm:flex-wrap"
      >
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => onChange(cat)}
            className={cn(
              'flex-none px-4 py-2 min-h-[44px] text-xs tracking-widest uppercase transition-colors duration-200',
              'border rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-silver/60',
              active === cat
                ? 'border-silver/60 text-silver-light'
                : 'border-silver/30 text-text-muted hover:border-silver/60 hover:text-text-secondary'
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
    </div>
  )
}
