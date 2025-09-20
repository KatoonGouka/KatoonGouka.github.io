import instaIcon from '../assets/insta.svg'
import twitterIcon from '../assets/twitter.svg'
import facebookIcon from '../assets/facebook.svg'
import youtubeIcon from '../assets/youtube.svg'
import tiktokIcon from '../assets/tiktok.svg'

export default function Footer() {
  return (
    <footer className=" bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left column */}
          <div>
            <h3 className="text-2xl font-medium tracking-tight">Celed Credit</h3>
            <div className="mt-3 text-sm text-white/80">
              <a href="tel:+393343244612" className="hover:text-white">+39 334 324 4612</a>
            </div>

            <div className="mt-2 text-sm text-white">
              <span className="font-medium text-[#FF154D]">2025</span>
              <span className="ml-2">CELED STUDIO SRL</span>
            </div>

            <nav className="mt-8 grid grid-cols-2 gap-6 sm:max-w-sm">
              <div className="space-y-3">
                <a href="#" className="block text-base hover:text-white/90">Sable Debit</a>
                <a href="#" className="block text-base hover:text-white/90">App</a>
                <a href="#" className="block text-base hover:text-white/90">Learn</a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-white/70 hover:text-white">FAQs</a>
                <a href="#" className="block text-sm text-white/70 hover:text-white">
                  About <span className="font-medium tracking-tight text-[#FF154D]">CELED</span>
                </a>
              </div>
            </nav>
          </div>

          {/* Right column */}
          <div>
            <h3 className="text-2xl font-medium tracking-tight">Contact</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-[#FF154D]">EMAIL:</dt>
                <dd>
                  <a href="mailto:contact@celed.io" className="text-white hover:underline">contact@celed.io</a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#FF154D]">VIA ROMEO ROMEI</dt>
                <dd className="text-white/90">27 00136 ROMA RM, ITALY</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#FF154D]">PARTITA IVA:</dt>
                <dd className="text-white/90">17450761006</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-5">
              {/* Instagram */}
              <a aria-label="Instagram" href="#" className="transition opacity-80 hover:opacity-100">
                <img src={instaIcon} alt="Instagram" className="w-[36px] h-[36px]" />
              </a>
              {/* X / Twitter */}
              <a aria-label="Twitter" href="#" className="transition opacity-80 hover:opacity-100">
                <img src={twitterIcon} alt="Twitter" className="w-[36px] h-[36px]" />
              </a>
              {/* Facebook */}
              <a aria-label="Facebook" href="#" className="transition opacity-80 hover:opacity-100">
                <img src={facebookIcon} alt="Facebook" className="w-[36px] h-[36px]" />
              </a>
              {/* YouTube */}
              <a aria-label="YouTube" href="#" className="transition opacity-80 hover:opacity-100">
                <img src={youtubeIcon} alt="YouTube" className="w-[36px] h-[36px]" />
              </a>
              {/* TikTok */}
              <a aria-label="TikTok" href="#" className="transition opacity-80 hover:opacity-100">
                <img src={tiktokIcon} alt="TikTok" className="w-[36px] h-[36px]" />
              </a>
            </div>

            <p className="mt-8 text-xs text-white/50">© CELED Inc, all rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


