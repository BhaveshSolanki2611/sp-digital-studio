'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Monitor, Video, Tv, RotateCcw, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatPrice } from '@/lib/utils'

const equipment = [
  {
    icon: Video,
    name: 'Professional Drone',
    description: 'With expert operator',
    rate: 12000,
    unit: 'per day',
  },
  {
    icon: Monitor,
    name: 'LED Screens (52")',
    description: 'Single or double setup',
    rate: 5000,
    unit: 'per day',
  },
  {
    icon: Tv,
    name: 'Plasma Screen (8x12ft)',
    description: 'Large display for grand events',
    rate: 15000,
    unit: 'per day',
  },
  {
    icon: RotateCcw,
    name: '360 Selfie Booth',
    description: 'Interactive booth with instant prints',
    rate: 10000,
    unit: 'per day',
  },
]

export function EquipmentHighlight() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Equipment Rental
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
              Professional Equipment for Your Events
            </h2>
            <p className="text-muted mb-8">
              Enhance your event with our professional-grade equipment. From drone coverage 
              to LED displays and interactive 360 booths, we have everything you need to 
              make your occasion memorable.
            </p>

            <div className="space-y-4 mb-8">
              {equipment.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{formatPrice(item.rate)}</p>
                    <p className="text-xs text-muted">{item.unit}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button asChild>
              <Link href="/equipment-rental">
                View All Equipment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary to-primary-700 rounded-3xl overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
                <div className="absolute bottom-20 right-10 w-60 h-60 border-2 border-white rounded-full" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
                  <RotateCcw className="w-10 h-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  360 Selfie Booth
                </h3>
                <p className="text-white/80 mb-6 max-w-xs">
                  The life of every party! Interactive videos with instant sharing and on-site printing.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent">{formatPrice(10000)}</p>
                    <p className="text-sm text-white/60">per day</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Instant Delivery</p>
                <p className="text-sm text-muted">Same-day setup available</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
