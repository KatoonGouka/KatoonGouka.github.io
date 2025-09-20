import { useEffect, useState } from 'react'
import bgHero from '../assets/bgHero.png'
import partnerLogos from '../assets/partnerLogos.png'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(t)
  }, [])
  return (
    <section id="home" className="relative isolate scroll-mt-24 md:scroll-mt-24">
      {/* Top banner with ribbon background */}
      <div
        className="relative w-full h-[900px] bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover' }}
      >
        {/* Make overlay subtle so image stays bright */}
        <div className="absolute inset-0 bg-black/10" />
        {/* Bottom fade to black */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 pb-12 md:px-6 md:pt-20 lg:pt-24 lg:pb-16">
          <h1
            className={`pt-56 font-display text-[128px] font-medium leading-none tracking-tight text-white drop-shadow md:text-[150px] lg:text-[200px] transform-gpu motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-150 motion-reduce:transition-none ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            CELED
          </h1>
          <p
            className={`mt-3 text-[16px] font-medium text-[#ff3b5c] md:text-[24px] transform-gpu motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-300 motion-reduce:transition-none ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            digital design and video production studio
          </p>
        </div>
        {/* Set explicit banner height across breakpoints */}
        <div className="h-[420px] md:h-[560px] lg:h-[736px]" />
      </div>

      {/* Content below the image */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <p
            className={`text-pretty self-center font-semibold text-base text-white md:text-[24px] transform-gpu motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-500 motion-reduce:transition-none ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            We don’t just design, we smash hyperreality. At Celed Studio, we
            create fiercely functional solutions that hit with impact.
          </p>
          <div className="flex items-center justify-center md:justify-end">
            <img
              src={partnerLogos}
              alt="Partners"
              className={`max-w-[360px] opacity-90 transform-gpu motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-700 motion-reduce:transition-none ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            />
          </div>
        </div>

        <div id="about" className="h-24 scroll-mt-24 md:scroll-mt-24" />
      </div>
    </section>
  )
}
