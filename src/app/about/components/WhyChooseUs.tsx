'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Clock, 
  Award, 
  Zap, 
  Shield, 
  Camera, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui'

const reasons = [
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description: 'Get your edited photos and videos faster. Same-day edits available for urgent needs.',
  },
  {
    icon: Award,
    title: '29+ Years Experience',
    description: 'Decades of expertise in capturing weddings, events, and commercial photography.',
  },
  {
    icon: Zap,
    title: 'Latest Technology',
    description: 'Professional cameras, drones, 4K video, and advanced editing software.',
  },
  {
    icon: Shield,
    title: 'Trusted & Reliable',
    description: 'Thousands of happy clients trust us with their most important moments.',
  },
  {
    icon: Camera,
    title: 'End-to-End Service',
    description: 'From shooting to editing to printing — we handle everything under one roof.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Approach',
    description: 'Custom packages tailored to your needs and budget. No one-size-fits-all.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Why SP Digital Studio?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Reasons Clients Choose Us
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            We&apos;re not just photographers — we&apos;re storytellers dedicated to preserving 
            your memories with excellence and care.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-accent hover:to-accent-600 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-white/20 flex items-center justify-center text-accent group-hover:text-white transition-colors mb-4">
                <reason.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary group-hover:text-white mb-2 transition-colors">
                {reason.title}
              </h3>
              <p className="text-muted group-hover:text-white/80 transition-colors">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link href="/booking">
              Book Your Shoot Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
