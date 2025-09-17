import React, { useEffect } from 'react'
import HeroSpline from './components/HeroSpline'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CursorTrail from './components/CursorTrail'
import Intro from './sections/Intro'
import Capabilities from './sections/Capabilities'
import Cases from './sections/Cases'
import Process from './sections/Process'
import Playground from './sections/Playground'
import Contact from './sections/Contact'
import './lib/lenis'

function App() {
  useEffect(() => {
    // Cleanup function for GSAP ScrollTriggers
    return () => {
      // ScrollTrigger cleanup will be handled by individual components
    }
  }, [])

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      {/* Skip link for accessibility */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      
      <CursorTrail />
      <Nav />
      
      <main id="main" className="relative">
        <HeroSpline />
        <Intro />
        <Capabilities />
        <Cases />
        <Process />
        <Playground />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}

export default App