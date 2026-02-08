'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Camera } from 'lucide-react'

export function BookingHero() {
  return (
    <section className="relative py-16 md:py-20 bg-primary overflow-hidden">
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
            Book Your Session
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Fill out the form below to request a booking. We&apos;ll get back to you 
            within 24 hours to confirm availability and discuss details.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span>Flexible scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>24hr response time</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-accent" />
              <span>Custom packages</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
