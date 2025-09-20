import { useEffect, useMemo, useRef, useState } from 'react'
import phoneImage from '../assets/phoneImage.png'
import nextIcon from '../assets/next-slider-icon.png'

type SliderItem = {
  id: number
  image: string
}

function useItemsPerView() {
  const [items, setItems] = useState(1)

  useEffect(() => {
    function compute() {
      const w = window.innerWidth
      if (w >= 1280) return setItems(3)
      if (w >= 768) return setItems(2)
      return setItems(1)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  return items
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    function compute() {
      const w = window.innerWidth
      const coarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches
      setIsMobile(w < 768 || coarse)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])
  return isMobile
}

export default function PhoneSlider() {
  const items: SliderItem[] = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({ id: i, image: phoneImage })),
    []
  )

  const labels = ['VFX', 'CGI', 'AR', 'AI', 'AI', 'CGI', 'CGI']
  const titles = [
    'Luis Figo VFX Video',
    'Chryyt Logos Promo',
    'PythAI Project',
    'McKinley AI Shots',
    'CrissCross AI Campaign',
    'Prose CGI Promo',
    'Miu Miu FOOH',
  ]
  const descriptions = [
    'Sunglasses floating in Milan, an airship above Florence — reimagining icons through VFX.',
    'An angel crowned the Roman Pantheon — bold symbolism in motion.',
    'A multi-layered collaboration with Stephen Vineburg: AR try-ons, NFT collectibles, video storytelling, interactive web gaming, and live activations.',
    'A series of striking static AI-generated visuals blending style and precision.',
    'An AI-driven video campaign pushing the boundaries of narrative and design.',
    'A surreal installation — an automated shampoo line stretched across the Brooklyn Bridge.',
    'The world reframed through pink sunglasses — playful fashion illusion in hyperreality.',
  ]

  const itemsPerView = useItemsPerView()
  const isMobile = useIsMobile()
  const swipeDisabled = isMobile
  const maxIndex = Math.max(0, items.length - itemsPerView)
  const [index, setIndex] = useState(0)
  const [navLock, setNavLock] = useState(false)

  // swipe/drag state
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [restOffsetPercent, setRestOffsetPercent] = useState(0) // keeps user swipe offset when not using buttons

  // perf: avoid re-render on every pointer move
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef<number | null>(null)
  const dragDeltaXRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  function getViewportWidth(): number {
    const viewportEl = trackRef.current?.parentElement
    return viewportEl?.clientWidth || window.innerWidth || 1
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true)
    // refs for rAF-driven drag updates
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX
    dragDeltaXRef.current = 0
    // hint GPU acceleration while dragging
    if (trackRef.current) trackRef.current.style.willChange = 'transform'
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current || dragStartXRef.current === null) return
    const dx = e.clientX - dragStartXRef.current
    dragDeltaXRef.current = dx
    // schedule a single frame
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        const width = getViewportWidth()
        const deltaPercent = (dragDeltaXRef.current / width) * 100
        const slide = 100 / itemsPerView
        const basePercent = -(index * slide) + restOffsetPercent
        const minPercent = -(maxIndex * slide)
        const maxPercent = 0
        const percent = Math.max(minPercent, Math.min(maxPercent, basePercent + deltaPercent))
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${percent}%, 0, 0)`
        }
      })
    }
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return
    const width = getViewportWidth()
    const dx = (dragStartXRef.current != null ? e.clientX - dragStartXRef.current : 0)
    const threshold = Math.max(40, width * 0.15)

    // decide target index without triggering intermediate renders
    let targetIndex = index
    if (Math.abs(dx) > threshold) {
      targetIndex = dx > 0 ? Math.max(0, index - 1) : Math.min(maxIndex, index + 1)
    }

    const slide = 100 / itemsPerView
    const basePercentForTarget = -(targetIndex * slide)
    const minPercent = -(maxIndex * slide)
    const maxPercent = 0
    const deltaPercent = (dx / width) * 100
    const desiredPercent = (-(index * slide) + restOffsetPercent) + deltaPercent
    const clamped = Math.max(minPercent, Math.min(maxPercent, desiredPercent))

    setIndex(targetIndex)
    setRestOffsetPercent(clamped - basePercentForTarget)

    // cleanup drag state and return control to React styles
    setIsDragging(false)
    isDraggingRef.current = false
    dragStartXRef.current = null
    dragDeltaXRef.current = 0
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    if (trackRef.current) trackRef.current.style.willChange = ''
    ;(e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId)
  }

  function prev() {
    if (isMobile) {
      const target = Math.max(0, index - 1)
      void goToIndexMobile(target)
      return
    }
    setIndex((v) => {
      const nextIndex = Math.max(0, v - 1)
      setRestOffsetPercent(0) // center on button navigation
      return nextIndex
    })
  }
  function next() {
    if (isMobile) {
      const target = Math.min(maxIndex, index + 1)
      void goToIndexMobile(target)
      return
    }
    setIndex((v) => {
      const nextIndex = Math.min(maxIndex, v + 1)
      setRestOffsetPercent(0) // center on button navigation
      return nextIndex
    })
  }
  // reserved for future dot navigation
  // function goTo(i: number) {
  //   setIndex(() => Math.min(maxIndex, Math.max(0, i)))
  // }

  const slidePercent = 100 / itemsPerView
  const isPrevDisabled = index === 0
  const isNextDisabled = index === maxIndex
  const basePercent = -(index * slidePercent) + restOffsetPercent

  // --- image preload for mobile to avoid visible loading during navigation ---
  async function preloadImage(src: string): Promise<void> {
    try {
      await new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve() // fail open
        // decode if supported
        img.src = src
        // Safari may not expose decode on created Image
        ;(img as any).decode?.().then(() => resolve()).catch(() => resolve())
      })
    } catch {}
  }

  async function ensureSlideReady(targetIndex: number): Promise<void> {
    const indexesToPreload = [targetIndex, targetIndex + 1, targetIndex - 1]
    const unique = Array.from(new Set(indexesToPreload)).filter((i) => i >= 0 && i < items.length)
    await Promise.all(unique.map((i) => preloadImage(items[i].image)))
  }

  async function goToIndexMobile(targetIndex: number): Promise<void> {
    if (navLock || targetIndex === index) return
    setNavLock(true)
    try {
      await ensureSlideReady(targetIndex)
      setRestOffsetPercent(0)
      setIndex(targetIndex)
    } finally {
      setNavLock(false)
    }
  }

  return (
    <section id="cases" className="relative isolate scroll-mt-24 md:scroll-mt-24 bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="max-w-xl text-lg leading-relaxed text-white/80 pr-30">
            We’ve collaborated with leading brands such as
            {' '}
            <span className="font-semibold text-white">Luis Figo</span>,
            {' '}
            <span className="font-semibold text-white">Prose</span>,
            {' '}
            <span className="font-semibold text-white">ECA</span>,
            {' '}
            <span className="font-semibold text-white">Moncloa</span>,
            {' '}
            <span className="font-semibold text-white">McKinley</span>,
            {' '}
            <span className="font-semibold text-white">CrissCross</span>,
            {' '}
            <span className="font-semibold text-white">Chryyt Logos</span>,
            {' '}
            <span className="font-semibold text-white">AWE</span>, and
            {' '}
            <span className="font-semibold text-white">GardaBags</span>, alongside forward‑thinking
            organizations including StudyXR and HoneyLoveClub.
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-white/80 pl-30">
            We have also developed creative case studies inspired by iconic fashion houses — including
            {' '}
            <span className="font-semibold text-white">Prada</span>,
            {' '}
            <span className="font-semibold text-white">Miu Miu</span>,
            {' '}
            <span className="font-semibold text-white">Fendi</span>, and
            {' '}
            <span className="font-semibold text-white">Christian Louboutin</span>
            {' '}
            — exploring new ways to merge artistry, storytelling, and design innovation.
          </p>
        </div>

        <div className="relative mt-10 md:mt-12">
          {/* background blur glow behind slider */}
          <div
            className="pointer-events-none absolute -inset-x-40 top-0 -z-10 w-[1400px] h-[560px] rotate-[-6deg] opacity-85 md:h-[500px] mix-blend-screen"
            style={{
              background:
                'radial-gradient(60% 70% at 50% 45%, rgba(255,21,77,0.85) 0%, rgba(255,21,77,0.55) 30%, rgba(255,21,77,0.28) 55%, rgba(255,21,77,0.12) 70%, rgba(0,0,0,0) 85%)',
              filter: 'blur(300px)',
              transformOrigin: 'center',
            }}
          />
          <div className="overflow-visible rounded-2xl bg-transparent">
            <div
              className={`relative overflow-visible pt-28 md:pt-28 ${swipeDisabled ? '' : 'touch-pan-y select-none cursor-grab active:cursor-grabbing'}`}
              onPointerDown={swipeDisabled ? undefined : onPointerDown}
              onPointerMove={swipeDisabled ? undefined : onPointerMove}
              onPointerUp={swipeDisabled ? undefined : onPointerUp}
              onPointerCancel={swipeDisabled ? undefined : onPointerUp}
              onPointerLeave={swipeDisabled ? undefined : onPointerUp}
            >
              <div
                ref={trackRef}
                className={`flex pr-0 md:pr-8 ${isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'}`}
                style={{ transform: isDragging ? undefined : `translate3d(${basePercent}%, 0, 0)`, willChange: 'transform' }}
              >
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    className="px-3"
                    style={{ minWidth: `${slidePercent}%` }}
                  >
                    <div className="mx-auto w-full max-w-[400px]">
                      <div className="relative aspect-[14/15] overflow-visible rounded-[28px] bg-black/80">
                        <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[32px] opacity-80 blur-2xl"
                          style={{
                            background:
                              'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0) 70%)',
                          }}
                        />
                        <div className="absolute inset-0 z-10 flex items-end justify-center p-0">
                          <img
                            src={item.image}
                            alt="Phone preview"
                            className="relative z-20 h-auto w-full -mt-10 md:-mt-16 object-contain"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center gap-4">
                          <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-1.5 text-[12px] font-medium text-white/80">
                            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF154D]" />
                            <span className="tracking-wide">{labels[i % labels.length]}</span>
                          </div>
                          <div className="text-[16px] md:text-[18px] font-semibold tracking-tight text-white">
                            {titles[i % titles.length]}
                          </div>
                        </div>
                        <p className="mt-3 max-w-3xl text-[12px] md:text-[14px] leading-relaxed text-white/60">
                          {descriptions[i % descriptions.length]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-[-76px] right-0 flex gap-3 p-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              disabled={isPrevDisabled}
              className={`grid h-12 w-12 place-items-center ${isPrevDisabled ? 'opacity-40 cursor-not-allowed' : ''
                }`}
            >
              <img src={nextIcon} alt="Previous" className="h-8 w-8 -rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              disabled={isNextDisabled}
              className={`grid h-12 w-12 place-items-center ${isNextDisabled ? 'opacity-40 cursor-not-allowed' : ''
                }`}
            >
              <img src={nextIcon} alt="Next" className="h-8 w-8" />
            </button>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2 mt-32">
          <p className="max-w-xl text-lg leading-relaxed text-white/80 pr-32">
          At Celed Studio, we create more than visuals — 
            {' '}
            <span className="font-semibold text-white">we build experiences that break beyond the ordinary.</span> From bold, cinematic 3D design to refined, functional interfaces, our work smashes the hyperreality, blending artistry with purpose.
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-white/80 pl-32">
          Every project is driven by a deep understanding of aesthetics, technology, and
            {' '}
            <span className="font-semibold text-white">storytelling, ensuring each creation resonates with your audience</span> and elevates your brand.
          </p>
        </div>


      </div>
    </section>
  )
}


