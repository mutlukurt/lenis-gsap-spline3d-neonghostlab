import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorTrail() {
  const trailDotsRef = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const trailPos = useRef<{ x: number, y: number }[]>([])

  useEffect(() => {
    // Only run on desktop and if user doesn't prefer reduced motion
    if (window.matchMedia('(max-width: 768px)').matches || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const trailCount = 12
    const trailDots: HTMLDivElement[] = []

    // Create trail dots
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement('div')
      dot.className = 'fixed pointer-events-none z-50 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] opacity-0'
      dot.style.width = `${8 - i * 0.4}px`
      dot.style.height = `${8 - i * 0.4}px`
      dot.style.mixBlendMode = 'screen'
      document.body.appendChild(dot)
      trailDots.push(dot)
      trailPos.current.push({ x: 0, y: 0 })
    }

    trailDotsRef.current = trailDots

    // Animation loop
    const updateTrail = () => {
      // Update first dot to mouse position
      trailPos.current[0] = { ...mousePos.current }
      
      // Update following dots with smooth interpolation
      for (let i = 1; i < trailPos.current.length; i++) {
        const current = trailPos.current[i]
        const previous = trailPos.current[i - 1]
        
        current.x += (previous.x - current.x) * 0.25
        current.y += (previous.y - current.y) * 0.25
        
        const dot = trailDots[i]
        if (dot) {
          gsap.set(dot, {
            x: current.x - dot.offsetWidth / 2,
            y: current.y - dot.offsetHeight / 2,
            opacity: Math.max(0, 1 - i * 0.08),
            scale: Math.max(0.2, 1 - i * 0.06)
          })
        }
      }
      
      requestAnimationFrame(updateTrail)
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    // Show trail when mouse enters window
    const handleMouseEnter = () => {
      trailDots.forEach((dot, index) => {
        gsap.to(dot, { 
          opacity: Math.max(0, 1 - index * 0.08), 
          duration: 0.3,
          delay: index * 0.02
        })
      })
    }

    // Hide trail when mouse leaves window
    const handleMouseLeave = () => {
      trailDots.forEach(dot => {
        gsap.to(dot, { opacity: 0, duration: 0.3 })
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Start animation loop
    updateTrail()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      trailDots.forEach(dot => {
        if (document.body.contains(dot)) {
          document.body.removeChild(dot)
        }
      })
    }
  }, [])

  return null // This component doesn't render anything visible
}