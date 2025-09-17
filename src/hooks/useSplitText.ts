import { useEffect, useRef } from 'react'
import SplitType from 'split-type'

export function useSplitText() {
  const elementRef = useRef<HTMLElement>(null)
  const splitInstanceRef = useRef<SplitType | null>(null)

  useEffect(() => {
    if (elementRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      splitInstanceRef.current = new SplitType(elementRef.current, {
        types: 'words',
      })
    }

    return () => {
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert()
      }
    }
  }, [])

  return { elementRef, splitInstance: splitInstanceRef.current }
}