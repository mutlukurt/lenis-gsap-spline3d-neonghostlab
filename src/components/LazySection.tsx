import React, { ReactNode } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  rootMargin?: string
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
  </div>
)

export default function LazySection({ 
  children, 
  fallback = <DefaultFallback />, 
  className = "",
  rootMargin = "100px"
}: LazySectionProps) {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    rootMargin,
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div ref={targetRef} className={className}>
      {hasIntersected ? children : fallback}
    </div>
  )
}