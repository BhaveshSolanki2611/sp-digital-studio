'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Camera, Video } from 'lucide-react'
import { Button } from '@/components/ui'
import { BUSINESS_INFO } from '@/lib/constants'

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80',
    alt: 'Wedding Photography',
    title: 'Weddings',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    alt: 'Pre-Wedding Shoot',
    title: 'Pre-Wedding',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=80',
    alt: 'Portrait Photography',
    title: 'Portraits',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920&q=80',
    alt: 'Product Photography',
    title: 'Products',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80',
    alt: 'Event Coverage',
    title: 'Events',
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full container-custom flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Serving New Delhi Since {BUSINESS_INFO.foundedYear}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            <span className="block">Moments Captured.</span>
            <span className="block text-gradient">Memories Crafted.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
          >
            End-to-end photography & video services — weddings, products, 
            instant prints, restoration. <span className="text-accent font-medium">{BUSINESS_INFO.tagline}</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="xl" asChild className="group">
              <Link href="/booking">
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Book a Shoot
              </Link>
            </Button>
            <Button size="xl" variant="outlineLight" asChild>
              <Link href="/portfolio">
                <Play className="w-5 h-5 mr-2" />
                View Portfolio
              </Link>
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
          >
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-accent">
                {new Date().getFullYear() - BUSINESS_INFO.foundedYear}+
              </p>
              <p className="text-white/60 text-sm">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">10K+</p>
              <p className="text-white/60 text-sm">Events Covered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">50K+</p>
              <p className="text-white/60 text-sm">Albums Printed</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-accent' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Current Slide Label */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute bottom-8 right-8 z-20 hidden md:block"
      >
        <p className="text-white/60 text-sm">
          <span className="text-accent font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
          {' / '}
          <span>{String(heroSlides.length).padStart(2, '0')}</span>
        </p>
        <p className="text-white font-medium">{heroSlides[currentSlide].title}</p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs uppercase tracking-widest rotate-[-90deg] origin-left translate-y-16">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white" />
        </motion.div>
      </motion.div>
    </section>
  )
}
