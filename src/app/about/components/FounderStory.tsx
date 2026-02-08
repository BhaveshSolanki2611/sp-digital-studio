'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Heart, Camera, Users } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export function FounderStory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dgqrgff7r/image/upload/v1770524949/WhatsApp_Image_2026-02-08_at_9.51.36_AM_qu0osj.jpg"
                alt="Satpal Solanki - Founder of SP Digital Studio"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">
                    {new Date().getFullYear() - BUSINESS_INFO.foundedYear}+
                  </p>
                  <p className="text-muted text-sm">Years of Trust</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Legacy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
              Founded on Passion, Built on Trust
            </h2>
            
            <div className="space-y-4 text-muted leading-relaxed mb-8">
              <p>
                In 1996, <span className="text-foreground font-medium">{BUSINESS_INFO.founder}</span> 
                {' '}started a small photo studio in Najafgarh with a simple vision: to capture 
                life&apos;s moments with authenticity and artistry. What began as a humble venture 
                has grown into one of New Delhi&apos;s most trusted photography studios.
              </p>
              <p>
                Today, <span className="text-foreground font-medium">{BUSINESS_INFO.name}</span> 
                {' '}serves thousands of families every year, covering weddings, events, 
                product shoots, and providing instant photo services. We&apos;ve embraced modern 
                technology while preserving the personal touch that made us popular.
              </p>
              <p>
                Our team now includes professional photographers, videographers, drone operators, 
                and editing specialists — all committed to delivering exceptional quality and 
                making your memories last forever.
              </p>
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3 mx-auto sm:mx-0">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Passion</h3>
                <p className="text-sm text-muted">Love for photography in every shot</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3 mx-auto sm:mx-0">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Quality</h3>
                <p className="text-sm text-muted">Premium equipment, expert editing</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3 mx-auto sm:mx-0">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Service</h3>
                <p className="text-sm text-muted">Client satisfaction is our priority</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
