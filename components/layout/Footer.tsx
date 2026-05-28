export function Footer() {
  return (
    <footer className="relative z-[2] bg-[#060810] border-t border-[rgba(192,192,192,0.08)] py-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs tracking-[0.4em] text-text-muted uppercase">
          Ostendere
        </p>
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} Ostendere. All rights reserved.
        </p>
        <p className="text-xs text-text-muted">
          We do not store your personal data.
        </p>
      </div>
    </footer>
  )
}
