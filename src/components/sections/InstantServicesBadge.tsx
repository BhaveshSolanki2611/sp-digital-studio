'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, CreditCard, FileCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

export function InstantServicesBadge() {
  return (
    <section className="py-12 bg-gradient-to-r from-accent to-accent-600">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Instant Photos in 5 Minutes!
              </h2>
            </div>
            <p className="text-white/90 max-w-xl">
              Walk in for passport & visa photos, ID photos, and instant prints. 
              All standard sizes available with professional quality.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-white/90">
              <FileCheck className="w-5 h-5" />
              <span className="text-sm">Visa & Passport Sizes</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">ID Photos</span>
            </div>
            <Button variant="outlineLight" asChild>
              <Link href="/instant-services">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
