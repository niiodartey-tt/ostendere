'use client'
import { cn } from '@/lib/utils'
import type { AccessoryItem } from '@/lib/catalog-data'

interface AccItemProps {
  item: AccessoryItem
  index: number
  isActive: boolean
  isLast: boolean
  onHoverEnter: () => void
  onHoverLeave: () => void
  onClick: () => void
}

export function AccItem({ item, index, isActive, isLast, onHoverEnter, onHoverLeave, onClick }: AccItemProps) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          'w-full flex items-center gap-[22px] py-6 px-[6px] border-t text-left cursor-pointer',
          'transition-[padding-left,background] duration-[400ms]',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60',
          isLast && 'border-b',
          isActive && 'pl-[18px] bg-[rgba(199,154,107,0.06)]'
        )}
        style={{ borderColor: 'rgba(236,227,210,0.08)' }}
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        onClick={onClick}
        aria-pressed={isActive}
      >
        <span
          className={cn(
            'w-[46px] h-[46px] rounded-full flex-none border transition-[transform,box-shadow] duration-[400ms]',
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
              transition: 'color 0.4s cubic-bezier(0.22,1,0.36,1)',
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
