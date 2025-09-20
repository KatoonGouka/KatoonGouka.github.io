import { type CSSProperties, type JSX, type PropsWithChildren, useEffect, useRef, useState } from 'react'

type RevealProps = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements
  className?: string
  /** Delay in milliseconds for the transition start */
  delayMs?: number
  /** Translate direction for entrance */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Once visible, keep it revealed and stop observing */
  once?: boolean
  /** Optional root margin for earlier/later reveal */
  rootMargin?: string
  /** Intersection threshold */
  threshold?: number
}>

export default function Reveal({
  as = 'div',
  className = '',
  delayMs = 0,
  direction = 'up',
  once = true,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.15,
  children,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { root: null, rootMargin, threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  const Component = as as any

  const translateClass = (() => {
    if (direction === 'none') return ''
    if (direction === 'up') return 'translate-y-3'
    if (direction === 'down') return '-translate-y-3'
    if (direction === 'left') return 'translate-x-3'
    if (direction === 'right') return '-translate-x-3'
    return 'translate-y-3'
  })()

  const style: CSSProperties = delayMs
    ? { transitionDelay: `${delayMs}ms` }
    : {}

  return (
    <Component
      ref={ref as any}
      style={style}
      className={
        `transform-gpu motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none ` +
        `${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${translateClass}`} ` +
        `${className}`
      }
    >
      {children}
    </Component>
  )
}


