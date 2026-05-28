export function HeroVideo() {
  return (
    <div className="fixed inset-0 [z-index:-2] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgba(10,13,26,0.55)] [z-index:-1]" />
    </div>
  )
}
