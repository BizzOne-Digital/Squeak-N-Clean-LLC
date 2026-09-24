'use client'

import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/*
  Site-wide scroll reveal. Mark any server-rendered element with data-reveal:
    fade-up     opacity + small rise (default)
    fade-in     opacity only
    fade-scale  opacity + rise + 0.98 → 1 scale
    image       editorial clip reveal for image frames
    stagger     reveals the element's direct children in sequence
  Content is visible in the HTML; GSAP only hides elements still below the fold when it
  starts, so a failed/blocked script never leaves anything hidden, and nothing on screen flashes.
*/

type Variant = 'fade-up' | 'fade-in' | 'fade-scale' | 'image'

const fromState = (variant: Variant, distance: number): gsap.TweenVars => {
  switch (variant) {
    case 'fade-in':
      return { autoAlpha: 0 }
    case 'fade-scale':
      return { autoAlpha: 0, y: distance * 0.6, scale: 0.98 }
    case 'image':
      return { autoAlpha: 0, y: distance * 0.5, clipPath: 'inset(0% 0% 12% 0%)' }
    default:
      return { autoAlpha: 0, y: distance }
  }
}

const TO: gsap.TweenVars = { autoAlpha: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }

export function ScrollReveal() {
  const pathname = usePathname()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motionOk: '(prefers-reduced-motion: no-preference)', small: '(max-width: 560px)' }, (context) => {
        const { motionOk, small } = context.conditions as { motionOk: boolean; small: boolean }
        if (!motionOk) return // reduced motion: leave everything exactly as rendered

        const distance = small ? 16 : 24
        const fold = window.innerHeight * 0.92

        // Intentionally page-wide: this component is the single reveal system for the whole site.
        gsap.utils.toArray<HTMLElement>('main [data-reveal], footer [data-reveal]').forEach((el) => {
          if (el.getBoundingClientRect().top < fold) return // already visible (or scrolled past): don't touch it

          const stagger = el.dataset.reveal === 'stagger'
          const targets = stagger ? Array.from(el.children) : [el]
          const variant = (stagger ? 'fade-up' : el.dataset.reveal) as Variant

          gsap.fromTo(targets, fromState(variant, distance), {
            ...TO,
            duration: variant === 'image' ? 1 : 0.8,
            ease: 'power3.out',
            // ~80ms between items, capped so long lists never make people wait.
            stagger: stagger ? Math.min(0.08, 0.6 / targets.length) : 0,
            clearProps: 'opacity,visibility,transform,clipPath',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return null
}
