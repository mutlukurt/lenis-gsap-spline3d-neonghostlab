import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Lightbulb, Palette, Cog, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  metric: string
  metricLabel: string
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const metricRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        if (!step) return

        const metric = metricRefs.current[index]

        ScrollTrigger.create({
          trigger: step,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: () => {
            // Fade in current step
            gsap.to(step, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out'
            })

            // Animate metric counter
            if (metric) {
              const targetValue = parseInt(steps[index].metric)
              gsap.fromTo(metric, 
                { innerText: 0 },
                {
                  innerText: targetValue,
                  duration: 1,
                  ease: 'power2.out',
                  snap: { innerText: 1 }
                }
              )
            }
          },
          onLeave: () => {
            gsap.to(step, {
              opacity: 0.4,
              duration: 0.3
            })
          },
          onEnterBack: () => {
            gsap.to(step, {
              opacity: 1,
              duration: 0.3
            })
          }
        })
      })

    }, section)

    return () => ctx.revert()
  }, [])

  const addStepRef = (el: HTMLDivElement | null, index: number) => {
    if (el) stepsRef.current[index] = el
  }

  const addMetricRef = (el: HTMLSpanElement | null, index: number) => {
    if (el) metricRefs.current[index] = el
  }

  const steps: ProcessStep[] = [
    {
      id: 1,
      icon: <Lightbulb className="text-[var(--accent)]" size={24} />,
      title: 'Discovery & Strategy',
      description: 'We analyze your brand, users, and technical requirements to create a motion strategy.',
      metric: '7',
      metricLabel: 'Days Average'
    },
    {
      id: 2,
      icon: <Palette className="text-[var(--accent)]" size={24} />,
      title: 'Design & Prototyping',
      description: 'Interactive prototypes and motion studies to validate concepts before development.',
      metric: '14',
      metricLabel: 'Iterations'
    },
    {
      id: 3,
      icon: <Cog className="text-[var(--accent)]" size={24} />,
      title: 'Development & Testing',
      description: 'Performance-optimized implementation with cross-device testing and accessibility.',
      metric: '60',
      metricLabel: 'FPS Target'
    },
    {
      id: 4,
      icon: <Rocket className="text-[var(--accent)]" size={24} />,
      title: 'Launch & Optimization',
      description: 'Deployment support and performance monitoring with continuous improvements.',
      metric: '99',
      metricLabel: '% Uptime SLA'
    }
  ]

  return (
    <section id="process" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
            Our Process
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            A proven methodology for creating exceptional motion experiences
          </p>
        </div>

        {/* Process steps - single column layout */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => addStepRef(el, index)}
              className="opacity-30 transform translate-y-8"
            >
              <div className="bg-[var(--card)] border border-[var(--surface)] rounded-2xl p-8 hover:border-[var(--accent)]/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0">
                  {/* Icon and step number */}
                  <div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-4 md:items-center flex-shrink-0">
                    <div className="w-16 h-16 bg-[var(--surface)] border border-[var(--surface)] rounded-2xl flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="text-sm text-[var(--muted)] md:text-center">
                      Step {step.id}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-semibold text-[var(--text)] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[var(--muted)] leading-relaxed mb-6 text-lg">
                      {step.description}
                    </p>
                    
                    {/* Metric */}
                    <div className="inline-flex items-center space-x-3 bg-[var(--surface)] px-6 py-3 rounded-xl">
                      <span 
                        ref={(el) => addMetricRef(el, index)}
                        className="text-3xl font-bold text-[var(--accent)]"
                      >
                        0
                      </span>
                      <span className="text-[var(--muted)]">
                        {step.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}