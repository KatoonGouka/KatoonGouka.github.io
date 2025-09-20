import leftSideAbstract from '../assets/left-side-abstract.png'
import podcastImage from '../assets/podcast.png'
import Reveal from './Reveal'

type MediaItem = {
  id: string
  title: string
  image: string
  colSpan?: string
  rowSpan?: string
}

const mediaItems: MediaItem[] = [
  {
    id: 'm1',
    title: 'Celed on Dubai Podcast',
    image: podcastImage,
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-2',
  },
  { id: 'm2', title: 'Mana Africa Interview', image: podcastImage },
  { id: 'm3', title: 'Marvel VFX Coordinator', image: podcastImage },
  { id: 'm4', title: 'Exhibitions (Milan, Berlin)', image: podcastImage },
  { id: 'm5', title: 'AR‑Mirrors', image: podcastImage },
  { id: 'm6', title: 'AI', image: podcastImage },
]

export default function MediaFeature() {
  return (
    <section className="relative isolate overflow-hidden bg-black py-16 md:py-24">
      {/* Left abstract decoration */}
      <img
        src={leftSideAbstract}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-0 top-32 hidden h-full max-h-[600px] select-none opacity-80 md:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="h2" delayMs={50} className="font-display text-4xl tracking-tight text-white md:text-6xl">
            <span className="text-white font-semibold">Media</span>
            <span className="text-white font-light"> / Interview Feature</span>
          </Reveal>
          <Reveal as="p" delayMs={150} className="my-12 text-sm leading-relaxed text-white/70 md:text-base">
            We don’t just design, we smash hyperreality. At Celed Studio, we create fiercely
            functional solutions<br /> that hit with impact. We are here to reveal something raw, bold,
            and unapologetically authentic.
          </Reveal>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[180px]">
          {mediaItems.map((item, index) => (
            <Reveal
              key={item.id}
              as="article"
              delayMs={100 + index * 80}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] ${
                item.colSpan ?? ''
              } ${item.rowSpan ?? ''}`}
            >
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  draggable={false}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />
                {/* subtle ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <div>
                  <h3 className="max-w-[90%] text-sm font-semibold text-white md:text-base">
                    {item.title}
                  </h3>
                </div>

                {item.id === 'm1' ? (
                  <button
                    type="button"
                    aria-label="Play video"
                    className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}


