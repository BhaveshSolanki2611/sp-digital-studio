'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { BUSINESS_INFO } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Capture Your Moments?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Every package is customizable to fit your needs and budget. 
            Contact us for a personalized quote or book your shoot online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="xl" asChild>
              <Link href="/booking">
                Book a Shoot
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outlineLight" asChild>
              <a href={`tel:${BUSINESS_INFO.phonesRaw[0]}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>

          <p className="text-white/60 text-sm">
            Or WhatsApp us at {BUSINESS_INFO.phones[0]} for quick responses
          </p>
        </motion.div>
      </div>
    </section>
  )
}
