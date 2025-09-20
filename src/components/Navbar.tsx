import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Cases', href: '#cases' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [isHiddenMobile, setIsHiddenMobile] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    function measure() {
      const h = headerRef.current?.getBoundingClientRect().height || 0
      setHeaderHeight(h)
    }
    measure()

    const onResize = () => measure()
    window.addEventListener('resize', onResize)

    let ro: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => measure())
      if (headerRef.current) ro.observe(headerRef.current)
    }
    return () => {
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
    }
  }, [])

  useEffect(() => {
    function onScroll() {
      const width = window.innerWidth
      const y = window.scrollY || window.pageYOffset
      const lastY = lastScrollYRef.current
      const delta = y - lastY
      const threshold = 6

      // Only apply hide/show behavior on mobile
      if (width < 768) {
        if (open) {
          setIsHiddenMobile(false)
        } else if (y <= 0) {
          setIsHiddenMobile(false)
        } else if (delta > threshold) {
          setIsHiddenMobile(true)
        } else if (delta < -threshold) {
          setIsHiddenMobile(false)
        }
      } else if (isHiddenMobile) {
        setIsHiddenMobile(false)
      }

      lastScrollYRef.current = y
    }

    function onResize() {
      if (window.innerWidth >= 768) setIsHiddenMobile(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [open, isHiddenMobile])

  function onNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const id = href.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (!el) {
      // fallback to hash if element not found
      window.location.hash = href
      setOpen(false)
      return
    }
    // Prefer scrollIntoView with scroll-margin-top for reliability
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // update hash without jumping
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`)
    }
    setOpen(false)
  }

  return (
    <>
    <header
      ref={headerRef}
      className={`${isHiddenMobile ? '-translate-y-full' : 'translate-y-0'} fixed top-0 left-0 right-0 md:translate-y-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur transition-transform duration-300`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative flex items-center justify-between py-4">
          <a href="#home" onClick={(e) => onNavClick(e, '#home')} className="flex items-center gap-3">
            <img src={logo} alt="Celed" className="h-10 w-10 rounded-full object-cover" />
          </a>

          {/* Centered nav on desktop */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                className="text-xs font-medium text-white/80 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="inline-flex items-center justify-center rounded md:hidden"
            aria-label="Toggle Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 origin-center bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 origin-center bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? 'block' : 'hidden'}`}>
        <nav className="space-y-1 border-t border-white/10 px-4 py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className="block rounded px-2 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
    {/* Spacer to offset fixed navbar height on desktop */}
    <div className="hidden md:block" style={{ height: headerHeight }} />
    </>
  )
}
