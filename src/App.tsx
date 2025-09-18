import React, { useEffect } from 'react'
import { Suspense, lazy } from 'react'
import './lib/lenis'

// Lazy load all components for better performance
const Nav = lazy(() => import('./components/Nav'))
const Footer = lazy(() => import('./components/Footer'))
const CursorTrail = lazy(() => import('./components/CursorTrail'))
const Intro = lazy(() => import('./sections/Intro'))
const Capabilities = lazy(() => import('./sections/Capabilities'))
const Cases = lazy(() => import('./sections/Cases'))
const Process = lazy(() => import('./sections/Process'))
const Playground = lazy(() => import('./sections/Playground'))
const Contact = lazy(() => import('./sections/Contact'))

// Import HeroSpline directly (no lazy loading)
import HeroSpline from './components/HeroSpline'
// Loading fallback component
const LoadingFallback = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
  </div>
)

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
      
      <Suspense fallback={null}>
        <CursorTrail />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback className="fixed top-4 right-4 z-50" />}>
        <Nav />
      </Suspense>
      
      <main id="main" className="relative">
        <HeroSpline />
        
        <Suspense fallback={<LoadingFallback className="py-32" />}>
          <Intro />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback className="py-32" />}>
          <Capabilities />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback className="py-32" />}>
          <Cases />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback className="py-32" />}>
          <Process />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback className="py-32" />}>
          <Playground />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback className="py-32" />}>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={<LoadingFallback className="py-16" />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App