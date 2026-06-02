export function HeroVideo() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c0907]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Cinematic grade */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: [
            'linear-gradient(rgba(8,6,4,0.46), rgba(8,6,4,0.46))',
            'radial-gradient(130% 100% at 50% 42%, transparent 18%, rgba(6,4,3,0.7) 100%)',
            'linear-gradient(to bottom, rgba(6,4,3,0.7) 0%, rgba(6,4,3,0.15) 32%, rgba(6,4,3,0.4) 62%, rgba(6,4,3,0.9) 100%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />
    </div>
  )
}
