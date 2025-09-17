import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ExternalLink, Play, Palette, BarChart3, TrendingUp, Rocket, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Case {
  id: number
  title: string
  category: string
  description: string
  icon: React.ReactNode
  link: string
  tech: string[]
}

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const progress = progressRef.current
    
    if (!section || !container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Card animation on scroll
      const updateCards = () => {
        cardsRef.current.forEach((card, index) => {
          if (!card) return
          
          const rect = card.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          const cardCenter = rect.left + rect.width / 2
          const containerCenter = containerRect.left + containerRect.width / 2
          
          const distance = Math.abs(cardCenter - containerCenter)
          const maxDistance = containerRect.width / 2
          const factor = 1 - Math.min(distance / maxDistance, 1)
          
          gsap.set(card, {
            opacity: 0.5 + factor * 0.5,
            y: (1 - factor) * 10,
            rotationZ: (1 - factor) * -1,
            scale: 0.95 + factor * 0.05
          })
          
          if (factor > 0.7) {
            setCurrentIndex(index)
          }
        })
      }

      // Update progress bar
      const updateProgress = () => {
        if (!progress) return
        const scrollLeft = container.scrollLeft
        const scrollWidth = container.scrollWidth - container.clientWidth
        const progressPercent = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0
        gsap.set(progress, { width: `${progressPercent}%` })
      }

      const handleScroll = () => {
        updateCards()
        updateProgress()
      }

      container.addEventListener('scroll', handleScroll)
      updateCards() // Initial call

      // Mouse drag scrolling
      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - container.offsetLeft)
        setScrollLeft(container.scrollLeft)
        container.style.cursor = 'grabbing'
        container.style.userSelect = 'none'
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - container.offsetLeft
        const walk = (x - startX) * 2 // Scroll speed multiplier
        container.scrollLeft = scrollLeft - walk
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        container.style.cursor = 'grab'
        container.style.userSelect = 'auto'
      }

      const handleMouseLeave = () => {
        setIsDragging(false)
        container.style.cursor = 'grab'
        container.style.userSelect = 'auto'
      }

      // Add mouse drag events
      container.addEventListener('mousedown', handleMouseDown)
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseup', handleMouseUp)
      container.addEventListener('mouseleave', handleMouseLeave)

      // Prevent text selection while dragging
      container.addEventListener('selectstart', (e) => {
        if (isDragging) e.preventDefault()
      })

      return () => {
        container.removeEventListener('scroll', handleScroll)
        container.removeEventListener('mousedown', handleMouseDown)
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseup', handleMouseUp)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, section)

    return () => ctx.revert()
  }, [isDragging, startX, scrollLeft])

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el
  }

  const cases: Case[] = [
    {
      id: 1,
      title: 'Ethereal Studios',
      category: 'Creative Agency',
      description: 'Interactive 3D hero with particle systems that respond to scroll velocity and mouse movement.',
      icon: <Palette size={48} className="text-[var(--accent)]" />,
      link: '#',
      tech: ['Spline', 'GSAP', 'Three.js']
    },
    {
      id: 2,
      title: 'FlowState',
      category: 'SaaS Product',
      description: 'Smooth scroll-bound animations with data visualizations that animate in sequence.',
      icon: <BarChart3 size={48} className="text-[var(--accent)]" />,
      link: '#',
      tech: ['Lenis', 'D3.js', 'React']
    },
    {
      id: 3,
      title: 'Neon Ventures',
      category: 'Investment Firm',
      description: 'Sophisticated scroll-triggered reveals with magnetic cursor interactions.',
      icon: <TrendingUp size={48} className="text-[var(--accent)]" />,
      link: '#',
      tech: ['GSAP', 'ScrollTrigger', 'CSS']
    },
    {
      id: 4,
      title: 'Lunar Labs',
      category: 'Tech Startup',
      description: 'Performance-optimized animations with reduced motion support and mobile optimization.',
      icon: <Rocket size={48} className="text-[var(--accent)]" />,
      link: '#',
      tech: ['Framer Motion', 'React', 'TypeScript']
    },
    {
      id: 5,
      title: 'Pixel Perfect',
      category: 'Design Studio',
      description: 'Micro-interactions and hover states that enhance user experience without overwhelming.',
      icon: <Sparkles size={48} className="text-[var(--accent)]" />,
      link: '#',
      tech: ['CSS Animations', 'GSAP', 'Vue.js']
    }
  ]

  return (
    <section id="cases" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
            Featured Cases
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Projects that showcase our expertise in motion design and user experience
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex gap-8 overflow-x-auto scroll-snap-x pb-8 scrollbar-hide cursor-grab"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: isDragging ? 'auto' : 'smooth'
            }}
          >
            {cases.map((case_item, index) => (
              <div
                key={case_item.id}
                ref={(el) => addCardRef(el, index)}
                className="flex-shrink-0 w-80 md:w-96 scroll-snap-center bg-[var(--card)] border border-[var(--surface)] rounded-2xl overflow-hidden hover:border-[var(--accent)]/40 transition-all duration-300 group"
              >
                {/* Case icon header */}
                <div className="relative h-48 bg-gradient-to-br from-[var(--surface)] to-[var(--card)] flex items-center justify-center overflow-hidden">
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {case_item.icon}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[var(--accent)] text-white text-xs px-3 py-1 rounded-full">
                      {case_item.category}
                    </span>
                  </div>
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--accent)]/5 to-[var(--accent)]/10" />
                </div>

                {/* Case content */}
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">
                    {case_item.title}
                  </h3>
                  
                  <p className="text-[var(--muted)] mb-6 leading-relaxed flex-grow">
                    {case_item.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {case_item.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-[var(--surface)] text-[var(--muted)] px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action button */}
                  <div className="flex items-center justify-between mt-auto">
                    <a
                      href={case_item.link}
                      className="inline-flex items-center space-x-2 text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors group/link"
                    >
                      <span className="text-sm font-medium">View Case</span>
                      <ExternalLink size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                  <a
                    href={case_item.link}
                    className="inline-flex items-center space-x-2 text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors group/link mt-auto"
                  >
                    <span className="text-sm font-medium">View Case</span>
                    <ExternalLink size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="mt-8 flex justify-center">
            <div className="w-48 h-1 bg-[var(--surface)] rounded-full overflow-hidden">
              <div 
                ref={progressRef}
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Current case indicator */}
        <div className="text-center mt-8">
          <span className="text-sm text-[var(--muted)]">
            {currentIndex + 1} of {cases.length}
          </span>
        </div>
      </div>
    </section>
  )
}