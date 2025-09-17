import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis with smooth scroll settings
export const lenis = new Lenis({
  duration: 0.8,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1.5,
  touchMultiplier: 2,
  infinite: false,
  syncTouch: false,
  syncTouchLerp: 0.1,
  touchInertiaMultiplier: 35,
})

// RAF loop for Lenis
function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Connect Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(() => {
  lenis.raf(performance.now())
})
gsap.ticker.lagSmoothing(0)

// Disable smooth scrolling if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis.destroy()
}