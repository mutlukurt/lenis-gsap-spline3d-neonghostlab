import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Sparkles, Volume2, Cpu } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const background = backgroundRef.current
    const cta = ctaRef.current
    
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Light parallax background
      if (background) {
        gsap.fromTo(background,
          { y: 0 },
          {
            y: -50,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      }

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true
              }
            }
          )
        }
      })

      // Magnetic CTA button (desktop only)
      if (cta && !window.matchMedia('(max-width: 768px)').matches) {
        const magneticStrength = 16
        const quickToX = gsap.quickTo(cta, 'x', { duration: 0.3, ease: 'power2.out' })
        const quickToY = gsap.quickTo(cta, 'y', { duration: 0.3, ease: 'power2.out' })

        const handleMouseMove = (e: MouseEvent) => {
          const rect = cta.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          
          const deltaX = e.clientX - centerX
          const deltaY = e.clientY - centerY
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
          
          if (distance < 100) {
            const factor = Math.min(distance / 100, 1)
            quickToX(deltaX * factor * magneticStrength / 100)
            quickToY(deltaY * factor * magneticStrength / 100)
          }
        }

        const handleMouseLeave = () => {
          quickToX(0)
          quickToY(0)
        }

        cta.addEventListener('mousemove', handleMouseMove)
        cta.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          cta.removeEventListener('mousemove', handleMouseMove)
          cta.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

    }, section)

    return () => ctx.revert()
  }, [])

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el
  }

  const capabilities = [
    {
      icon: <Volume2 className="text-[var(--accent)]" size={32} />,
      title: 'Scroll Micro-Interactions',
      description: 'Velocity-aware animations that respond to user input with precision and smoothness.',
      features: ['Velocity-based skewing', 'Scroll-bound reveals', 'Momentum preservation']
    },
    {
      icon: <Sparkles className="text-[var(--accent)]" size={32} />,
      title: 'Spline-Powered 3D',
      description: 'Interactive 3D scenes that blend seamlessly with your web experience.',
      features: ['Hero scene integration', 'Subtle hover reactions', 'Mobile optimization']
    },
    {
      icon: <Cpu className="text-[var(--accent)]" size={32} />,
      title: 'Performance-First',
      description: 'Animations that maintain 60fps while respecting user preferences and device capabilities.',
      features: ['Transform-only animations', 'Reduced motion support', 'Mobile-safe parallax']
    }
  ]

  return (
    <section id="capabilities" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background with parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent-2)]/5"
      />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
            Our Capabilities
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Three core competencies that power exceptional digital experiences
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              ref={(el) => addCardRef(el, index)}
              className="bg-[var(--card)] border border-[var(--surface)] rounded-2xl p-8 hover:border-[var(--accent)]/40 transition-all duration-300 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {capability.icon}
              </div>
              
              <h3 className="text-2xl font-semibold text-[var(--text)] mb-4">
                {capability.title}
              </h3>
              
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                {capability.description}
              </p>
              
              <ul className="space-y-2">
                {capability.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-[var(--muted)]">
                    <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Magnetic CTA */}
        <div className="text-center">
          <button
            ref={ctaRef}
            className="bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white px-8 py-4 rounded-xl font-medium transition-colors duration-300 shadow-lg hover:shadow-[var(--accent)]/25"
            aria-label="Start your project"
          >
            Bring Your Vision to Life
          </button>
        </div>
      </div>
    </section>
  )
}