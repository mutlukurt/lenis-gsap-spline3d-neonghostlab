import React, { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { useLenis } from '../hooks/useLenis'
import gsap from 'gsap'
import { lenis } from '../lib/lenis'

const navItems = [
  { href: '#intro', label: 'Intro' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#cases', label: 'Cases' },
  { href: '#process', label: 'Process' },
  { href: '#playground', label: 'Playground' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const { scrollTo } = useLenis()

  useEffect(() => {
    if (!lenis) return

    // Nav show/hide on scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
      
      if (currentScrollY > 100) {
        setIsVisible(direction === 'up')
      } else {
        setIsVisible(true)
      }
      
      lastScrollY.current = currentScrollY

      // Update active section
      const sections = navItems.map(item => item.href.slice(1))
      let current = ''
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = sectionId
            break
          }
        }
      }
      
      setActiveSection(current)
    }

    lenis.on('scroll', handleScroll)
    return () => lenis.off('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const target = href.slice(1)
    scrollTo(`#${target}`, { duration: 0.8, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
    setIsMenuOpen(false)
  }

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="backdrop-blur bg-[var(--surface)]/90 border-b border-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo(0, { duration: 0.8 })}
            className="text-xl font-semibold text-gradient hover:scale-105 transition-transform"
            aria-label="NeonGhost Lab - Go to top"
          >
            NeonGhost Lab
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-sm transition-colors hover:text-[var(--accent)] ${
                  activeSection === item.href.slice(1) 
                    ? 'text-[var(--accent)]' 
                    : 'text-[var(--muted)]'
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[var(--card)] border-t border-[var(--surface)]">
            <div className="max-w-6xl mx-auto px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left transition-colors hover:text-[var(--accent)] ${
                    activeSection === item.href.slice(1) 
                      ? 'text-[var(--accent)]' 
                      : 'text-[var(--muted)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}