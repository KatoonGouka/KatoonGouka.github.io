import bgContact from '../assets/bgContact.png'
import nexusAgent from '../assets/nexusAgent.png'
import logo from '../assets/logo.png'
import calendar from '../assets/calendar.svg'
import Reveal from './Reveal'

export default function ContactCTA() {
  return (
    <section id="contact" className="relative isolate scroll-mt-24 md:scroll-mt-24">
      {/* Background image with subtle overlay and edge fade */}
      <div
        className="relative w-full h-full md:h-[700px] bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgContact})`, backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />

        {/* Centered copy */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center md:px-6 lg:py-36">
          <Reveal as="h2" delayMs={50} className="font-display text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Have an idea?
            <br />
            <span className="block">Let’s talk.</span>
          </Reveal>
          <Reveal as="p" delayMs={140} className="mx-auto mt-6 max-w-xl text-base md:text-lg text-white/80">
            We turn visions into realities.
          </Reveal>

          <Reveal delayMs={240} className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 rounded-full bg-white px-8 py-4 text-sm md:text-base font-semibold text-black shadow-lg shadow-black/20 transition hover:shadow-black/30"
            >
              <img src={calendar} alt="Calendar" className="h-6 w-6" />
              Free Consultation with our Avatar
            </a>
          </Reveal>
        </div>

        {/* Bottom-right avatar and brand mark */}
        <Reveal delayMs={200} className="pointer-events-none absolute -right-12 md:right-0 bottom-0 z-10">
          <img
            src={nexusAgent}
            alt="Nexus Agent"
            className="w-auto max-h-[240px] md:max-h-[400px] lg:max-h-[620px] drop-shadow-2xl"
            style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 28%)', maskImage: 'linear-gradient(to top, transparent 0%, black 28%)' }}
          />
        </Reveal>
        {/* Brand label under avatar */}
        <Reveal delayMs={260} className="absolute right-28 md:right-52 lg:right-76 bottom-4 z-20 flex items-center gap-3 select-none">
          <img src={logo} alt="Logo" className="h-12 w-12 opacity-100" />
          <div className="leading-tight">
            <div className="text-sm md:text-2xl lg:text-4xl font-semibold">
              <span className="text-[#FF154D]">NEXUS</span> <span className="text-white">Agent</span>
            </div>
            <div className="text-[10px] md:text-base text-white/80 text-right">By Schrid <span className="text-[#FF154D]">Avatar Artist</span></div>
          </div>
        </Reveal>
        
      </div>
    </section>
  )
}


