export function HeroContent() {
  return (
    <section className="relative z-[2] flex h-[100svh] w-full flex-col items-center justify-start pt-[38vh] text-center">
      <div className="mb-8 h-px w-16 origin-left bg-[#C0C0C0]/40 sm:w-24 animate-scale-x motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:[transform:none]" />

      <h1 className="font-display font-light uppercase tracking-[0.35em] text-[#E8E8E8] text-[clamp(1.8rem,7vw,6.5rem)] animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:[transform:none]">
        Ostendere
      </h1>

      <p className="mt-5 font-sans text-[0.65rem] font-light tracking-[0.5em] uppercase text-[#A0A0A0] sm:text-xs animate-fade-up-delay motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:[transform:none]">
        Precision. Craft. Distinction.
      </p>

      <div className="mt-8 h-px w-16 origin-left bg-[#C0C0C0]/40 sm:w-24 animate-scale-x motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:[transform:none]" />

      <div
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 animate-fade-in motion-reduce:animate-none motion-reduce:opacity-100"
        aria-hidden="true"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#A0A0A0]/60">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-[#C0C0C0]/20">
          <div className="absolute inset-x-0 top-0 h-full origin-top bg-[#C0C0C0]/60 animate-scroll-pulse motion-reduce:animate-none motion-reduce:opacity-0" />
        </div>
      </div>
    </section>
  )
}
