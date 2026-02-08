'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, MapPin, Award } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export function TrustLine() {
  return (
    <section className="py-8 bg-primary">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          {/* Founder Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Award className="w-5 h-5 text-accent" />
            <p className="text-white">
              <span className="text-white/70">Established {BUSINESS_INFO.foundedYear} — Founder:</span>{' '}
              <span className="font-semibold text-accent">{BUSINESS_INFO.founder}</span>
            </p>
          </motion.div>

          <div className="hidden md:block w-px h-6 bg-white/20" />

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <MapPin className="w-5 h-5 text-accent" />
            <p className="text-white/80 text-sm">
              {BUSINESS_INFO.address.locality}, {BUSINESS_INFO.address.city}
            </p>
          </motion.div>

          <div className="hidden md:block w-px h-6 bg-white/20" />

          {/* Phone Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Phone className="w-5 h-5 text-accent" />
            <div className="flex gap-4">
              <a 
                href={`tel:${BUSINESS_INFO.phonesRaw[0]}`}
                className="text-white hover:text-accent transition-colors font-medium"
              >
                {BUSINESS_INFO.phones[0]}
              </a>
              <span className="text-white/40">|</span>
              <a 
                href={`tel:${BUSINESS_INFO.phonesRaw[1]}`}
                className="text-white hover:text-accent transition-colors font-medium"
              >
                {BUSINESS_INFO.phones[1]}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
