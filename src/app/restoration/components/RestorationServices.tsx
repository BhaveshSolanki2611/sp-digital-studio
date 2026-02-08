'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Wand2, Palette, Eraser, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const services = [
  {
    icon: Eraser,
    title: 'Damage Repair',
    description: 'Fix tears, scratches, stains, and water damage',
    startingPrice: 500,
  },
  {
    icon: Wand2,
    title: 'Fading Restoration',
    description: 'Restore faded colors and contrast',
    startingPrice: 300,
  },
  {
    icon: Palette,
    title: 'B&W Colorization',
    description: 'Add realistic color to black & white photos',
    startingPrice: 800,
  },
  {
    icon: Sparkles,
    title: 'Complete Restoration',
    description: 'Full restoration including repair and color correction',
    startingPrice: 1000,
  },
]

export function RestorationServices() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gray-50 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted mb-4">{service.description}</p>
              <p className="text-accent font-bold">
                From {formatPrice(service.startingPrice)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Before/After Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            See the Transformation
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
                <Image
                  src="https://images.unsplash.com/photo-1516035645781-9f126e774e9e?w=600&q=80"
                  alt="Before restoration"
                  fill
                  className="object-cover grayscale opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  Before
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
                <Image
                  src="https://images.unsplash.com/photo-1516035645781-9f126e774e9e?w=600&q=80"
                  alt="After restoration"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
                  After
                </span>
              </div>
            </div>
          </div>
          <p className="text-center text-muted mt-6">
            * Actual restoration results vary based on original photo condition
          </p>
        </motion.div>
      </div>
    </section>
  )
}
