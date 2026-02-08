'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Heart, 
  Camera, 
  Plane, 
  Sparkles, 
  Cake, 
  Users, 
  Aperture, 
  Package,
  RotateCcw,
  Video
} from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  { icon: Heart, label: 'Wedding', href: '/services#wedding', color: 'text-pink-500' },
  { icon: Camera, label: 'Pre-Wedding', href: '/services#pre-wedding', color: 'text-blue-500' },
  { icon: Plane, label: 'Destination', href: '/services#destination-wedding', color: 'text-cyan-500' },
  { icon: Sparkles, label: 'Bridal', href: '/services#bridal', color: 'text-purple-500' },
  { icon: Cake, label: 'Birthday', href: '/services#birthday', color: 'text-orange-500' },
  { icon: Users, label: 'Events', href: '/services#events', color: 'text-green-500' },
  { icon: Aperture, label: 'Candid', href: '/services#candid', color: 'text-red-500' },
  { icon: Package, label: 'Product', href: '/services#product', color: 'text-amber-500' },
  { icon: Video, label: 'Drone', href: '/services#drone', color: 'text-indigo-500' },
  { icon: RotateCcw, label: '360 Booth', href: '/services#360-booth', color: 'text-teal-500' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function ServicesStrip() {
  return (
    <section className="py-8 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:justify-center"
        >
          {services.map((service) => (
            <motion.div key={service.label} variants={itemVariants}>
              <Link
                href={service.href}
                className="group flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-300",
                  "group-hover:scale-110 group-hover:shadow-lg",
                  service.color
                )}>
                  <service.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-foreground whitespace-nowrap">
                  {service.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
