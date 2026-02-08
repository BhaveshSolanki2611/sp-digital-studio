'use client'

import { motion } from 'framer-motion'
import { Clock, Printer } from 'lucide-react'

export function InstantHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-accent to-accent-600 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
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
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Printer className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Instant Photos in 5 Minutes!
          </h1>
          <p className="text-lg text-white/90">
            Walk in for passport photos, visa photos, ID photos, and quick prints. 
            No appointment needed. All standard sizes available with professional quality.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
