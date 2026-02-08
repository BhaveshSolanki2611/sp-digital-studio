'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isInView])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

interface StatsData {
  value: number
  suffix: string
  label: string
}

interface StatsSectionProps {
  stats?: StatsData[]
  title?: string
  subtitle?: string
  variant?: 'default' | 'dark' | 'accent'
}

const defaultStats: StatsData[] = [
  { value: 29, suffix: '+', label: 'Years of Excellence' },
  { value: 10000, suffix: '+', label: 'Events Covered' },
  { value: 50000, suffix: '+', label: 'Albums Printed' },
  { value: 8000, suffix: '+', label: 'Happy Clients' },
]

export function StatsSection({ 
  stats = defaultStats,
  title = "Trusted by Thousands",
  subtitle = "Numbers that speak for our dedication to capturing your precious moments",
  variant = 'default'
}: StatsSectionProps) {
  const bgClass = {
    default: 'bg-gray-50',
    dark: 'bg-primary text-white',
    accent: 'bg-gradient-to-r from-accent to-secondary text-white',
  }

  const textClass = {
    default: 'text-foreground',
    dark: 'text-white',
    accent: 'text-white',
  }

  const mutedClass = {
    default: 'text-muted',
    dark: 'text-white/70',
    accent: 'text-white/80',
  }

  const valueClass = {
    default: 'text-accent',
    dark: 'text-accent',
    accent: 'text-white',
  }

  return (
    <section className={cn("py-16 md:py-24", bgClass[variant])}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", textClass[variant])}>
            {title}
          </h2>
          <p className={cn("max-w-2xl mx-auto", mutedClass[variant])}>
            {subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={cn("text-4xl md:text-5xl font-bold mb-2", valueClass[variant])}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className={cn("text-sm", mutedClass[variant])}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
