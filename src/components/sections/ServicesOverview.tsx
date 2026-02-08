'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatPrice, formatPriceRange } from '@/lib/utils'
import { WEDDING_PACKAGES } from '@/lib/constants'
import { Badge } from '@/components/ui'

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Packages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Wedding Photography Packages
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Every package is customizable. Build your perfect package based on your 
            requirements and budget. Contact us for a personalized quote.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {WEDDING_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover-lift ${
                'popular' in pkg && pkg.popular ? 'ring-2 ring-accent' : ''
              }`}
            >
              {'popular' in pkg && pkg.popular && (
                <div className="absolute top-4 right-4">
                  <Badge variant="accent">Most Popular</Badge>
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-primary mb-2">{pkg.name}</h3>
                <p className="text-muted text-sm mb-4">{pkg.description}</p>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-accent">
                    {formatPriceRange(pkg.price.min, pkg.price.max)}
                  </p>
                  {'perDay' in pkg && pkg.perDay && (
                    <p className="text-sm text-muted">per day (varies by destination)</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={'popular' in pkg && pkg.popular ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/booking">Get Quote</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted mb-4">
            Looking for other services? We offer pre-wedding shoots, product photography, 
            corporate events, and more.
          </p>
          <Button variant="outline" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
