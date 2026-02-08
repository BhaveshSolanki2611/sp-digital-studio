'use client'

import { motion } from 'framer-motion'
import { Wand2 } from 'lucide-react'

export function RestorationHero() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6">
            <Wand2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Photo Restoration & Colorization
          </h1>
          <p className="text-lg text-white/80">
            Bring your old, damaged, or faded photos back to life. We restore torn photos, 
            repair water damage, and colorize black & white memories.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
