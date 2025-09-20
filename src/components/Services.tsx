import { useState } from 'react'
import Reveal from './Reveal'
import appDev from '../assets/appDev-icon.png'
import brandId from '../assets/brandId-icon.png'
import webDev from '../assets/webDev-icon.png'
import arIcon from '../assets/ar-icon.png'
import videoIcon from '../assets/video-icon.png'
import aiIcon from '../assets/ai-icon.png'
import arrowIcon from '../assets/arrow-icon.png'
import plusIcon from '../assets/plus-icon.png'

type ServiceItem = {
  id: string
  title: string
  icon: string
  description: string
}

const services: ServiceItem[] = [
  {
    id: 'app-dev',
    title: 'App Development',
    icon: appDev,
    description:
      "We don’t just build apps, we build engines for your product. Our products are engineered to scale, designed to perform, and crafted to perform flawlessly across every platform. From frictionless flows to cultural lifestyle apps, we create tools that people don’t just use, they crave.",
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    icon: brandId,
    description:
      "Branding is war — and we make sure you win. A logo is only the surface; we engineer ecosystems: type, tone, palette, motion, symbol. Every detail is designed to burn into memory, disrupt markets, and dominate culture. With us, your brand doesn’t just stand out, it stands above.",
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    icon: webDev,
    description:
      "Your website is your stage, and we design for impact. We build high‑performance frontends with art‑direction precision—sites that move fast, look flawless, and feel alive. Whether it’s an experimental portfolio or a fortress‑scale platform, we make sure your digital presence commands attention and respect.",
  },
  {
    id: 'ar-filters',
    title: 'AR Filters',
    icon: arIcon,
    description:
      "Our AR filters aren’t ‘add‑ons.’ They hijack reality. Interactive, playful, and dangerously shareable, they put your brand directly onto people’s faces, bodies, and spaces. We don’t chase trends; we set them—turning filters into viral cultural artifacts.",
  },
  {
    id: 'cgi-vfx',
    title: 'CGI/VFX Videos',
    icon: videoIcon,
    description:
      "We play in the cinema’s league. Our CGI and VFX aren’t about explaining a product—they are about myth‑making. Ultra‑real drops, cinematic campaign worlds, futuristic motion that feels bigger than life. Every frame we produce is crafted to shock, seduce, and stamp the brand into the collective memory.",
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    icon: aiIcon,
    description:
      "Forget clunky chatbots. Our AI agents are sleek, smart, and alive with personality. They don’t just respond; they connect. We embed your brand in real time—from luxury digital concierges to playful virtual icons, we build AI characters that redefine how interaction feels.",
  },
  {
    id: 'ai-production',
    title: 'AI Production',
    icon: aiIcon,
    description:
      "This is the future of creation. We fuse human vision with machine speed, generating frames, imagery, soundscapes, and original visuals at a pace no traditional studio can match. AI is not a shortcut; it’s a weapon. With Celed Studio, it becomes your unfair advantage.",
  },
]

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
			<Reveal delayMs={50} className="mb-6 flex items-center gap-2 text-md text-white">
				<img src={arrowIcon} alt="" className="h-5 w-5" />
				<span className="pt-1">Our Services</span>
			</Reveal>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {services.map((item, index) => {
          const expanded = openId === item.id
          return (
            <Reveal key={item.id} delayMs={100 + index * 70} className="block">
					<button
                type="button"
                aria-expanded={expanded}
                onClick={() => toggle(item.id)}
						className={`flex w-full items-center gap-4 px-2 py-5 text-left hover:bg-white/5 ${expanded ? 'bg-white/5' : ''}`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="h-8 w-24 rounded-full object-cover"
                />
                <span className="flex-1 text-lg font-semibold text-white md:text-xl">
                  {item.title}
                </span>
						<span className="ml-4 grid h-6 w-6 place-items-center rounded-full text-white/80">
						<img
							src={plusIcon}
							alt=""
							className={`h-3 w-3 transition-transform duration-300 ${expanded ? 'rotate-45 scale-110' : ''}`}
						/>
						</span>
              </button>

					{/* Animated expandable area aligned with title */}
					<div
						className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
							expanded ? 'max-h-[280px] opacity-100' : 'max-h-0 opacity-0'
						}`}
					>
						<div className="px-2 pb-2 pr-10 text-sm leading-relaxed text-white/80 md:text-base md:pt-1 pl-[7.5rem]">
							{item.description}
						</div>
					</div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}


