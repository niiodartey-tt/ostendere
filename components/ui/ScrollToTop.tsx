'use client'
import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={[
        'fixed bottom-8 right-8 z-40',
        'w-11 h-11 flex items-center justify-center',
        'border transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/60',
        'hover:border-brass/80 hover:bg-[rgba(199,154,107,0.08)]',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      style={{ borderColor: 'rgba(199,154,107,0.4)', color: '#c79a6b' }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <polyline
          points="2 11 8 5 14 11"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
