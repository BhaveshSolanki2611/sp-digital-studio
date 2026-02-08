'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <span className="text-accent font-semibold text-sm uppercase tracking-wider">
        Contact Information
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-8">
        We&apos;re Here to Help
      </h2>

      <div className="space-y-6 mb-8">
        {/* Address */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Visit Our Studio</h3>
            <p className="text-muted">{BUSINESS_INFO.address.full}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
            <div className="space-y-1">
              <a 
                href={`tel:${BUSINESS_INFO.phonesRaw[0]}`}
                className="block text-muted hover:text-accent transition-colors"
              >
                {BUSINESS_INFO.phones[0]}
              </a>
              <a 
                href={`tel:${BUSINESS_INFO.phonesRaw[1]}`}
                className="block text-muted hover:text-accent transition-colors"
              >
                {BUSINESS_INFO.phones[1]}
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
            <div className="space-y-1">
              <a 
                href={`mailto:${BUSINESS_INFO.emails[0]}`}
                className="block text-muted hover:text-accent transition-colors break-all text-sm"
              >
                {BUSINESS_INFO.emails[0]}
              </a>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
            <div className="text-muted text-sm space-y-1">
              <p>Monday - Saturday: {BUSINESS_INFO.hours.weekdays}</p>
              <p>Sunday: {BUSINESS_INFO.hours.sunday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={BUSINESS_INFO.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group"
      >
        <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-green-800 group-hover:text-green-900">
            Chat on WhatsApp
          </h3>
          <p className="text-green-600 text-sm">Quick responses, easy sharing</p>
        </div>
      </a>
    </motion.div>
  )
}
