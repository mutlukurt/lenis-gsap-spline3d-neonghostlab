import { lenis } from '../lib/lenis'

export function useLenis() {
  const scrollTo = (target: string | number, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    }
  }

  return { scrollTo, lenis }
}