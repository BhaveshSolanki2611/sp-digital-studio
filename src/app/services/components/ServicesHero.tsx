'use client'

import { motion } from 'framer-motion'

export function ServicesHero() {
  return (
    <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-80 h-80 border border-white rounded-full" />
        <div className="absolute bottom-10 left-10 w-60 h-60 border border-white rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
            Professional Photography & Video Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            From weddings to products, instant prints to professional editing — 
            we offer comprehensive photography and video services tailored to your needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
