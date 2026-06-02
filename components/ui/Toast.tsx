interface ToastProps {
  visible: boolean
  message: string
}

export function Toast({ visible, message }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={[
        'fixed left-1/2 bottom-[34px] z-[1100] flex items-center gap-3',
        'border px-[26px] py-4 transition-[opacity,transform] duration-[400ms]',
        visible
          ? 'opacity-100 -translate-x-1/2 translate-y-0'
          : 'opacity-0 -translate-x-1/2 translate-y-[30px] pointer-events-none',
      ].join(' ')}
      style={{
        background: '#3b2c20',
        borderColor: '#c79a6b',
        color: '#ece3d2',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.14em',
      }}
    >
      <span className="w-[7px] h-[7px] rounded-full bg-brass flex-none" aria-hidden="true" />
      {message}
    </div>
  )
}
