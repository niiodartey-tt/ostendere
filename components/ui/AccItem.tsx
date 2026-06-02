'use client'
import { cn } from '@/lib/utils'
import type { AccessoryItem } from '@/lib/catalog-data'

interface AccItemProps {
  item: AccessoryItem
  isActive: boolean
  isLast: boolean
  onActivate: () => void
}

export function AccItem({ item, isActive, isLast, onActivate }: AccItemProps) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          'w-full flex items-center gap-[22px] py-6 px-[6px] border-t border-line-soft text-left cursor-pointer',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60',
          isLast && 'border-b border-line-soft',
          isActive
            ? 'pl-[18px] border-l-2 border-brass bg-brass/[0.08]'
            : 'hover:pl-[18px] hover:border-l-2 hover:border-brass hover:bg-brass/[0.08]'
        )}
        onMouseEnter={onActivate}
        aria-current={isActive ? 'true' : undefined}
      >
        <span
          className={cn(
            'w-[46px] h-[46px] rounded-full flex-none border transition-[transform,box-shadow] duration-200',
            isActive && 'scale-[1.12] shadow-[0_0_0_3px_#1c1611,0_0_0_4px_#c79a6b]'
          )}
          style={{ background: item.swatch, borderColor: 'rgba(236,227,210,0.14)' }}
          aria-hidden="true"
        />
        <div className="flex-1">
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px,2.4vw,36px)',
              lineHeight: 1.05,
              color: isActive ? '#c79a6b' : '#ece3d2',
              transition: 'color 200ms ease',
            }}
          >
            {item.name}
          </h3>
          <p className="mt-1" style={{ color: '#8a7d6b', fontSize: 16 }}>{item.desc}</p>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#b9ac97', whiteSpace: 'nowrap' }}>
          Contact for pricing
        </span>
      </button>
    </li>
  )
}
