import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Mail, MessageCircle, Calendar, ArrowRight } from 'lucide-react'
import { useLenis } from '../hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const { scrollTo } = useLenis()

  useEffect(() => {
    const section = sectionRef.current
    const glow = glowRef.current
    const cta = ctaRef.current
    
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Ambient glow effect on scroll
      if (glow) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => {
            gsap.to(document.documentElement, {
              '--glow-opacity': '0.1',
              duration: 1,
              ease: 'power2.out'
            })
          },
          onLeave: () => {
            gsap.to(document.documentElement, {
              '--glow-opacity': '0',
              duration: 1,
              ease: 'power2.out'
            })
          }
        })
      }

      // CTA hover enhancement
      if (cta) {
        const quickToScale = gsap.quickTo(cta, 'scale', { duration: 0.3, ease: 'power2.out' })
        const quickToRotation = gsap.quickTo(cta, 'rotation', { duration: 0.3, ease: 'power2.out' })

        const handleMouseEnter = () => {
          quickToScale(1.05)
          quickToRotation(1)
        }

        const handleMouseLeave = () => {
          quickToScale(1)
          quickToRotation(0)
        }

        cta.addEventListener('mouseenter', handleMouseEnter)
        cta.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          cta.removeEventListener('mouseenter', handleMouseEnter)
          cta.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

    }, section)

    return () => ctx.revert()
  }, [])

  const contactMethods = [
    {
      icon: <Mail className="text-[var(--accent)]" size={24} />,
      title: 'Email Us',
      description: 'hello@neonghost.lab',
      action: 'Send Email'
    },
    {
      icon: <MessageCircle className="text-[var(--accent)]" size={24} />,
      title: 'Start a Chat',
      description: 'Quick questions and consultations',
      action: 'Open Chat'
    },
    {
      icon: <Calendar className="text-[var(--accent)]" size={24} />,
      title: 'Book a Call',
      description: '30-minute strategy session',
      action: 'Schedule Now'
    }
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6">
      {/* Ambient glow */}
      <div 
        ref={glowRef}
        className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/[var(--glow-opacity,0)] via-transparent to-transparent pointer-events-none"
        style={{ '--glow-opacity': '0' } as React.CSSProperties}
      />
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--text)] mb-6 leading-tight">
            Ready to bring your
            <span className="text-gradient"> vision to life?</span>
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            Let's create something extraordinary together. From concept to launch, 
            we'll craft motion experiences that captivate your audience.
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-[var(--card)] border border-[var(--surface)] rounded-2xl p-6 hover:border-[var(--accent)]/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {method.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                {method.title}
              </h3>
              
              <p className="text-[var(--muted)] text-sm mb-4">
                {method.description}
              </p>
              
              <button className="text-[var(--accent)] hover:text-[var(--accent-2)] text-sm font-medium transition-colors">
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="space-y-8">
          <button
            ref={ctaRef}
            className="bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>Start Your Project</span>
            <ArrowRight size={20} />
          </button>
          
          <p className="text-sm text-[var(--muted)]">
            Typical response time: 24 hours
          </p>
        </div>

        {/* Back to top hint */}
        <div className="mt-20 pt-8 border-t border-[var(--surface)]">
          <button
            onClick={() => scrollTo(0, { duration: 0.8 })}
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-sm group"
          >
            <span className="group-hover:-translate-y-0.5 transition-transform inline-block">
              ↑ Back to top
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}