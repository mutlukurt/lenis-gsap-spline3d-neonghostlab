import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Play, Code, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Playground() {
  const sectionRef = useRef<HTMLElement>(null)
  const blobsRef = useRef<HTMLDivElement[]>([])
  const cursorTrailRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Ambient parallax for background blobs
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        blobsRef.current.forEach((blob, index) => {
          if (blob) {
            gsap.fromTo(blob,
              { y: 0 },
              {
                y: -30 * (index + 1),
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true
                }
              }
            )
          }
        })
      }

      // Desktop cursor trail
      if (!window.matchMedia('(max-width: 768px)').matches && 
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        
        const trailDots: HTMLDivElement[] = []
        const mousePos = { x: 0, y: 0 }
        const trailPos: { x: number, y: number }[] = []
        
        // Create trail dots
        for (let i = 0; i < 8; i++) {
          const dot = document.createElement('div')
          dot.className = `fixed w-2 h-2 bg-[var(--accent)] rounded-full pointer-events-none z-40 opacity-0`
          document.body.appendChild(dot)
          trailDots.push(dot)
          trailPos.push({ x: 0, y: 0 })
        }

        const updateTrail = () => {
          trailPos[0] = { ...mousePos }
          
          for (let i = 1; i < trailPos.length; i++) {
            const current = trailPos[i]
            const previous = trailPos[i - 1]
            
            current.x += (previous.x - current.x) * 0.3
            current.y += (previous.y - current.y) * 0.3
            
            const dot = trailDots[i]
            if (dot) {
              gsap.set(dot, {
                x: current.x,
                y: current.y,
                opacity: 1 - i * 0.15,
                scale: 1 - i * 0.1
              })
            }
          }
          
          requestAnimationFrame(updateTrail)
        }

        const handleMouseMove = (e: MouseEvent) => {
          mousePos.x = e.clientX
          mousePos.y = e.clientY
        }

        const handleMouseEnter = () => {
          trailDots.forEach(dot => gsap.set(dot, { opacity: 1 }))
        }

        const handleMouseLeave = () => {
          trailDots.forEach(dot => gsap.to(dot, { opacity: 0, duration: 0.3 }))
        }

        section.addEventListener('mousemove', handleMouseMove)
        section.addEventListener('mouseenter', handleMouseEnter)
        section.addEventListener('mouseleave', handleMouseLeave)
        
        updateTrail()

        return () => {
          section.removeEventListener('mousemove', handleMouseMove)
          section.removeEventListener('mouseenter', handleMouseEnter)
          section.removeEventListener('mouseleave', handleMouseLeave)
          trailDots.forEach(dot => document.body.removeChild(dot))
        }
      }

    }, section)

    return () => ctx.revert()
  }, [])

  const addBlobRef = (el: HTMLDivElement | null, index: number) => {
    if (el) blobsRef.current[index] = el
  }

  const demos = [
    {
      title: 'Velocity Skewing',
      description: 'Text that skews based on scroll velocity, capped at safe angles.',
      icon: <Sparkles size={20} />,
      action: 'Try Scrolling'
    },
    {
      title: 'Magnetic Interactions',
      description: 'Elements that react to cursor proximity with subtle movements.',
      icon: <Code size={20} />,
      action: 'Hover Here'
    },
    {
      title: 'Scroll Reveals',
      description: 'Content that animates into view with staggered timing.',
      icon: <Play size={20} />,
      action: 'Watch Demo'
    }
  ]

  return (
    <section id="playground" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background blobs with parallax */}
      <div 
        ref={(el) => addBlobRef(el, 0)}
        className="absolute top-20 left-20 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl"
      />
      <div 
        ref={(el) => addBlobRef(el, 1)}
        className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--accent-2)]/10 rounded-full blur-3xl"
      />
      <div 
        ref={(el) => addBlobRef(el, 2)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--accent)]/5 rounded-full blur-2xl"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
            Interactive Playground
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Experience our motion techniques in action. Move your cursor, scroll, and interact.
          </p>
        </div>

        {/* Demo grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {demos.map((demo, index) => (
            <div
              key={index}
              className="bg-[var(--card)] border border-[var(--surface)] rounded-2xl p-8 text-center hover:border-[var(--accent)]/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="mb-4 flex justify-center text-[var(--accent)] group-hover:scale-110 transition-transform duration-300">
                {demo.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-[var(--text)] mb-3">
                {demo.title}
              </h3>
              
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                {demo.description}
              </p>
              
              <div className="inline-flex items-center space-x-2 text-sm text-[var(--accent)] bg-[var(--surface)] px-4 py-2 rounded-lg group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300">
                <span>{demo.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive demo area */}
        <div className="bg-[var(--card)] border border-[var(--surface)] rounded-2xl p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-[var(--text)] mb-4 demo-text">
              Playground Demo
            </h3>
            <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
              This area demonstrates our interactive capabilities. On desktop, you'll see a cursor trail. 
              Try scrolling to see velocity-based effects in action.
            </p>
            
            <div className="inline-flex space-x-4">
              <button className="magnetic-btn bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                Interactive Button
              </button>
              <button className="bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                Secondary Action
              </button>
            </div>
          </div>
          
          {/* Ambient effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent-2)]/5 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}