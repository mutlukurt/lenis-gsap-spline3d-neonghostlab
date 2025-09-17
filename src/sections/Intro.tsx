import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useSplitText } from '../hooks/useSplitText'
import { Zap, Layers3, Gauge } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const { elementRef: headlineRef } = useSplitText()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Headline split animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word')
        gsap.fromTo(words,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              once: true
            }
          }
        )
      }

      // Cards lift animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { y: 32, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
              }
            }
          )
        }
      })

    }, section)

    return () => ctx.revert()
  }, [])

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el
  }

  const promises = [
    {
      icon: <Layers3 className="text-[var(--accent)]" size={24} />,
      title: 'Spline for Character',
      description: '3D mascots and hero scenes that respond to user interaction with subtle, engaging animations.'
    },
    {
      icon: <Zap className="text-[var(--accent)]" size={24} />,
      title: 'Lenis for Flow',
      description: 'Buttery smooth scrolling experiences that feel natural and performant across all devices.'
    },
    {
      icon: <Gauge className="text-[var(--accent)]" size={24} />,
      title: 'GSAP for Precision',
      description: 'Carefully crafted micro-interactions and transitions that enhance without overwhelming.'
    }
  ]

  return (
    <section id="intro" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        {/* Main headline with split text */}
        <div className="space-y-6">
          <h2 
            ref={headlineRef}
            className="text-4xl md:text-6xl font-bold text-[var(--text)] leading-tight"
          >
            We craft AI-first motion systems for websites that feel alive
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            Bringing together cutting-edge 3D graphics, smooth scrolling, and precision animations 
            to create digital experiences that captivate and engage.
          </p>
        </div>

        {/* Promise cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {promises.map((promise, index) => (
            <div
              key={index}
              ref={(el) => addCardRef(el, index)}
              className="bg-[var(--card)] border border-[var(--surface)] rounded-2xl p-8 text-center hover:border-[var(--accent)]/30 transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {promise.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)] mb-3">
                {promise.title}
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}