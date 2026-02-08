'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Monitor, Video, Tv, RotateCcw, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatPrice } from '@/lib/utils'

const equipment = [
  {
    id: 'drone',
    name: 'Professional Drone',
    description: 'High-quality aerial photography and videography with licensed operator.',
    dailyRate: 12000,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80',
    icon: Video,
    features: ['4K video capability', 'Experienced operator included', 'Aerial stills and video', 'Safe and legal operation'],
  },
  {
    id: 'led-double',
    name: '2x LED Screens (52")',
    description: 'Perfect for weddings and events to display photos and videos.',
    dailyRate: 8000,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    icon: Monitor,
    features: ['Two 52" LED screens', 'Stands included', 'Setup and pickup', 'HDMI connectivity'],
  },
  {
    id: 'led-single',
    name: 'Single LED Screen (52")',
    description: 'Great for smaller events and parties.',
    dailyRate: 5000,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    icon: Monitor,
    features: ['52" LED screen', 'Stand included', 'Setup and pickup', 'HDMI connectivity'],
  },
  {
    id: 'plasma',
    name: 'Plasma Screen (8x12 ft)',
    description: 'Large display perfect for grand events and outdoor functions.',
    dailyRate: 15000,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    icon: Tv,
    features: ['8x12 feet display', 'High brightness', 'Indoor/outdoor use', 'Professional setup'],
  },
  {
    id: '360-booth',
    name: '360 Selfie Booth',
    description: 'Interactive slow-motion video booth with instant sharing.',
    dailyRate: 10000,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80',
    icon: RotateCcw,
    features: ['360° rotating camera', 'Instant social sharing', 'On-site printing available', 'Props included'],
  },
]

export function EquipmentList() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="space-y-12">
          {equipment.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-video rounded-2xl overflow-hidden ${
                index % 2 === 1 ? 'md:order-2' : ''
              }`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-bold">
                  {formatPrice(item.dailyRate)}/day
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{item.name}</h3>
                </div>
                <p className="text-muted mb-6">{item.description}</p>
                
                <ul className="grid grid-cols-2 gap-3 mb-6">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-secondary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted">Daily Rate</p>
                    <p className="text-2xl font-bold text-accent">{formatPrice(item.dailyRate)}</p>
                  </div>
                  <Button asChild>
                    <Link href={`/booking?equipment=${item.id}`}>
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-bold text-primary mb-2">Need Multiple Items?</h3>
            <p className="text-muted mb-4">
              Get special discounts when you rent multiple equipment or book with our photography services.
            </p>
            <Button asChild>
              <Link href="/booking">Get a Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
