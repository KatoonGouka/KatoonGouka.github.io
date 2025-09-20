import arrowIcon from '../assets/arrow-icon.png'
import pic1 from '../assets/pic1.png'
import pic2 from '../assets/pic2.png'
import pic3 from '../assets/pic3.png'
import pic4 from '../assets/pic4.png'

type WorkItem = {
  id: string
  title: string
  image: string
}

const works: WorkItem[] = [
  { id: 'w1', title: 'Stephen Vineburg NYC', image: pic1 },
  { id: 'w2', title: 'Stephen Vineburg NYC', image: pic2 },
  { id: 'w3', title: 'Stephen Vineburg NYC', image: pic3 },
  { id: 'w4', title: 'Stephen Vineburg NYC', image: pic4 },
]

export default function OtherCGIs() {
  return (
    <section id="cases" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <div className="mb-6 flex items-center gap-2 text-md text-white">
        <img src={arrowIcon} alt="" className="h-5 w-5" />
        <span className="pt-1">Other CGIs</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {works.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
          >
            <div className="relative aspect-[6/5] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
            <div className="flex items-center justify-between px-8 py-6">
              <div className="text-[20px] font-medium text-white">{item.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        <a
          href="#cases"
          className="block w-full rounded-full border border-white/10 px-5 py-3 text-center text-sm font-medium text-white/80 hover:bg-white/5"
        >
          View all work ↗
        </a>
      </div>
    </section>
  )
}


