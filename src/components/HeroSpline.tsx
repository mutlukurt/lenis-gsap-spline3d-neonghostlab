import { Suspense } from 'react'
import Spline from '@splinetool/react-spline'

export default function HeroSpline() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Spline 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Spline 
          scene="https://prod.spline.design/ObdplrnhvfU4hogz/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
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