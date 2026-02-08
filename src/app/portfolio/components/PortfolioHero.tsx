'use client'

import { motion } from 'framer-motion'

export function PortfolioHero() {
  return (
    <section className="relative py-16 md:py-24 bg-primary overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-lg text-white/80">
            Explore our collection of work — from intimate weddings to grand celebrations, 
            stunning product shots to candid moments.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
