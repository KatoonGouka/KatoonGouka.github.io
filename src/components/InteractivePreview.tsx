import sideAbstract from '../assets/sideAbstract.png'
import Reveal from './Reveal'

export default function InteractivePreview() {
  return (
    <section
      id="preview"
      className="relative isolate overflow-hidden bg-black py-20 md:py-28"
      style={{
        backgroundImage: `url(${sideAbstract})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0 top -100px',
        backgroundSize: 'auto 60%',
      }}
    >

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal as="h2" delayMs={50} className="mx-auto max-w-4xl text-center font-display text-3xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
          We Smash Hyperreality.
          <br />
          You Live It.
        </Reveal>

        {/* Placeholder for upcoming interactive 3D model */}
        <Reveal delayMs={150} className="mx-auto mt-10 w-full max-w-5xl rounded-lg border border-white/10 bg-white/[0.02] p-2 md:mt-12">
          <div
            id="model-canvas"
            aria-label="3D model preview placeholder"
            className="relative grid h-[360px] place-items-center rounded-md bg-black/60 md:h-[520px] lg:h-[620px]"
          >
            <div className="pointer-events-none select-none text-center text-xs text-white/50 md:text-sm">
              Interactive 3D preview coming soon
              <div className="mt-1 text-white/30">Drag to rotate</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


