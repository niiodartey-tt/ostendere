import Image from 'next/image'

export function HeroContent() {
  return (
    <div className="absolute inset-0 z-[2] w-full h-full">

      {/* Faint emblem watermark behind the wordmark */}
      <div
        className="absolute top-1/2 left-1/2 z-[4] pointer-events-none select-none"
        style={{
          width: 'clamp(280px,42vw,680px)',
          transform: 'translate(-50%,-54%)',
          opacity: 0.06,
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/emblem-cream.png"
          alt=""
          width={680}
          height={680}
          className="w-full"
          priority
        />
      </div>

      {/* Brass ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[6] rounded-full"
        style={{
          width: '60vmax',
          height: '60vmax',
          background: 'radial-gradient(circle, rgba(199,154,107,0.16), transparent 60%)',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      {/* Top metadata labels */}
      <div
        className="absolute z-[10] flex justify-between items-start w-full"
        style={{
          top: 128,
          left: 'clamp(24px,5vw,72px)',
          right: 'clamp(24px,5vw,72px)',
          paddingLeft: 0,
          paddingRight: 0,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#8a7d6b',
            fontWeight: 500,
          }}
        >
          Sartoria · Est. MMXIV
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#8a7d6b',
            fontWeight: 500,
          }}
        >
          Accra — London
        </span>
      </div>

      {/* Centre lockup */}
      <div
        className="relative z-[10] h-svh max-w-site mx-auto flex flex-col items-center justify-center text-center gap-[clamp(18px,3.2vh,40px)]"
        style={{ padding: '0 clamp(24px,5vw,72px)' }}
      >
        {/* Rule */}
        <span
          className="block"
          style={{ width: 92, height: 1, background: 'rgba(236,227,210,0.55)' }}
          aria-hidden="true"
        />

        {/* Wordmark */}
        <h1
          className="motion-reduce:opacity-100 motion-reduce:[transform:none]"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(34px,10.5vw,150px)',
            lineHeight: 1,
            letterSpacing: '0.14em',
            paddingLeft: '0.14em',
            color: '#ece3d2',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '95vw',
          }}
        >
          <span style={{ fontWeight: 400 }}>OSTEN</span><span style={{ fontWeight: 700 }}>DERE</span>
        </h1>

        {/* Tagline */}
        <p
          className="motion-reduce:opacity-100"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(11px,1vw,14px)',
            letterSpacing: '0.46em',
            color: '#b9ac97',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Precision. Craft. Distinction.
        </p>

        {/* Rule */}
        <span
          className="block"
          style={{ width: 92, height: 1, background: 'rgba(236,227,210,0.55)' }}
          aria-hidden="true"
        />
      </div>

      {/* Scroll cue — crosshair reticle */}
      <a
        href="#suits"
        className="absolute bottom-[34px] left-1/2 -translate-x-1/2 z-[12] flex flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40"
        aria-label="Scroll to collection"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#8a7d6b',
          }}
        >
          Scroll
        </span>

        {/* Drop-line scroll cue */}
        <div
          className="scrollcue-line"
          style={{
            width: 1,
            height: 54,
            background: 'linear-gradient(#c79a6b, transparent)',
          }}
          aria-hidden="true"
        />
      </a>

    </div>
  )
}
