import { Suspense, lazy } from 'react'
import Spline from '@splinetool/react-spline'

// Lazy load Spline for better initial performance
const LazySpline = lazy(() => import('@splinetool/react-spline'))

export default function HeroSpline() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Spline 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--surface)] to-[var(--card)]">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[var(--muted)] text-sm">Loading 3D Scene...</p>
            </div>
          </div>
        }>
          <LazySpline 
            scene="https://prod.spline.design/ObdplrnhvfU4hogz/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(closest-side_at_50%_50%,_rgba(122,63,253,0.25),_transparent_70%)]" />
      
      {/* Hero content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="hero-title text-5xl md:text-7xl font-semibold text-[var(--text)] tracking-tight leading-none mb-6">
          NeonGhost Lab
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          AI-native motion, scrollcraft, and playful micro-interactions.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-[var(--muted)] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[var(--muted)] rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  )
}