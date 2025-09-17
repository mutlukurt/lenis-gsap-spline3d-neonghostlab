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

    const trailCount = 8
    const trailDots: HTMLDivElement[] = []

    // Create trail dots
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement('div')
      dot.style.position = 'fixed'
      dot.style.width = `${6 - i * 0.3}px`
      dot.style.height = `${6 - i * 0.3}px`
      dot.style.backgroundColor = '#7A3FFD'
      dot.style.borderRadius = '50%'
      dot.style.pointerEvents = 'none'
      dot.style.zIndex = '9999'
      dot.style.opacity = '0'
      dot.style.transform = 'translate(-50%, -50%)'
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
        
        current.x += (previous.x - current.x) * 0.3
        current.y += (previous.y - current.y) * 0.3
        
        const dot = trailDots[i]
        if (dot) {
          dot.style.left = current.x + 'px'
          dot.style.top = current.y + 'px'
          dot.style.opacity = String(Math.max(0, 0.8 - i * 0.1))
          dot.style.transform = `translate(-50%, -50%) scale(${Math.max(0.3, 1 - i * 0.1)})`
        }
      }
      
      requestAnimationFrame(updateTrail)
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      
      // Show trail dots
      trailDots.forEach((dot, index) => {
        dot.style.opacity = String(Math.max(0, 0.8 - index * 0.1))
      })
    }

    // Hide trail when mouse leaves window
    const handleMouseLeave = () => {
      trailDots.forEach(dot => {
        dot.style.opacity = '0'
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Start animation loop
    updateTrail()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
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