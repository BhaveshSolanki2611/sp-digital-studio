'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Contact error:', error)
      alert('Failed to send message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-600 mb-4">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-gray-50 rounded-2xl p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Your Name"
            name="name"
            placeholder="John Doe"
            required
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            What can we help you with?
          </label>
          <select
            name="subject"
            className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            required
          >
            <option value="">Select a topic</option>
            <option value="wedding">Wedding Photography</option>
            <option value="pre-wedding">Pre-Wedding Shoot</option>
            <option value="product">Product Photography</option>
            <option value="event">Event Coverage</option>
            <option value="equipment">Equipment Rental</option>
            <option value="restoration">Photo Restoration</option>
            <option value="instant">Instant Prints</option>
            <option value="other">Other Inquiry</option>
          </select>
        </div>

        <Textarea
          label="Your Message"
          name="message"
          placeholder="Tell us about your project or inquiry..."
          rows={4}
          required
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            className="mt-1 rounded border-gray-300 text-accent focus:ring-accent"
            required
          />
          <label htmlFor="consent" className="text-sm text-muted">
            I agree to receive communications from SP Digital Studio. 
            You can unsubscribe at any time.
          </label>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
