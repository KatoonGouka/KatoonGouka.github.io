import arrowIcon from '../assets/arrow-icon.png'
import Reveal from './Reveal'
import ak from '../assets/ak.png'
import yk from '../assets/yk.png'
import vm from '../assets/vm.png'
import gf from '../assets/gf.png'
import tk from '../assets/tk.png'
import vineburg from '../assets/vineburg.png'

type TeamMember = {
  id: string
  name: string
  role: string
  image: string
  accent?: 'red' | 'none'
}

const members: TeamMember[] = [
  { id: 'm1', name: 'ASIA KOTENKO', role: 'CHIEF EXECUTIVE OFFICER', image: ak, accent: 'red' },
  { id: 'm2', name: 'YEVHENII KISELOV', role: 'CHIEF TECHNOLOGY OFFICER', image: yk },
  { id: 'm3', name: 'VICTORIIA MELNYK', role: 'EVENT MANAGER', image: vm },
  { id: 'm4', name: 'GIORGIA FIUME', role: 'CHAIRWOMAN', image: gf },
  { id: 'm5', name: 'TINO COSTANZO', role: 'ART DIRECTOR', image: tk },
  { id: 'm6', name: 'STEPHEN VINEBURG', role: 'DIGITAL ARTIST, ADVISOR', image: vineburg },
]

export default function Team() {
  return (
    <section id="team" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <Reveal delayMs={50} className="mb-8 flex items-center gap-2 text-md text-white">
        <img src={arrowIcon} alt="" className="h-5 w-5" />
        <span className="pt-1">Our Team</span>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* First two slots: text area spanning 2 columns on large screens */}
        <Reveal delayMs={120} className="sm:col-span-2 lg:col-span-2">
          <h2 className="font-display text-2xl leading-tight text-white md:text-4xl font-semibold pr-12">
            We are Celed Studio, a circle of creators bound by one vision. We are not just a team, we are one soul creating through many hands.
          </h2>
        </Reveal>

        {/* Remaining 6 slots: member cards */}
        {members.map((m, index) => (
          <Reveal
            key={m.id}
            as="article"
            delayMs={150 + index * 80}
            className="group overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="relative aspect-[1] md:aspect-[8/8]">
              <img
                src={m.image}
                alt={m.name}
                className="h-full w-full object-cover  group-hover:scale-[1.02] transition-transform duration-500 pb-2"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/40" />
              {m.accent === 'red' ? (
                <div className="absolute inset-0 mix-blend-multiply bg-[#D61F3D]/70" />
              ) : null}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply bg-[#FF154D]" />
            </div>

            <div className="bg-black p-4 md:p-5">
              <h3 className="text-sm font-semibold tracking-wide text-white md:text-base">{m.name}</h3>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-white/70 md:text-xs">{m.role}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal delayMs={100} className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center">
        <button
          type="button"
          className="mx-auto flex items-center justify-center gap-2 text-sm text-white/90 md:text-base"
        >
          See all members ↗
        </button>
      </Reveal>
    </section>
  )
}


