'use client'

import { motion } from 'framer-motion'
import { BUSINESS_INFO } from '@/lib/constants'

export function AboutHero() {
  return (
    <section className="relative py-20 md:py-32 bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 border border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Est. {BUSINESS_INFO.foundedYear}
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Story
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            For over {new Date().getFullYear() - BUSINESS_INFO.foundedYear} years, 
            {BUSINESS_INFO.name} has been capturing life&apos;s most precious moments 
            for families across Delhi. Founded by {BUSINESS_INFO.founder}, we continue 
            to blend traditional expertise with modern technology.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
