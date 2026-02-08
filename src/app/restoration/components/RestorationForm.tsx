'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Send, Loader2, Check } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'

export function RestorationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 text-center shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Request Submitted!</h3>
            <p className="text-muted mb-4">
              We&apos;ve received your photo restoration request. Our team will review it 
              and send you a free estimate within 24 hours.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">
            Get a Free Estimate
          </h2>
          <p className="text-muted">
            Upload your photo and tell us what you need. We&apos;ll provide a free estimate 
            within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg space-y-6"
        >
          {/* File Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Upload Your Photo *
            </label>
            <label className="block">
              <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                fileName ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                {fileName ? (
                  <div className="flex items-center justify-center gap-2 text-accent">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">{fileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted mx-auto mb-3" />
                    <p className="text-sm text-muted">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted mt-1">
                      PNG, JPG up to 25MB
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Service Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              What service do you need? *
            </label>
            <select
              className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              required
            >
              <option value="">Select a service</option>
              <option value="repair">Damage Repair (tears, scratches, stains)</option>
              <option value="restore">Fading Restoration</option>
              <option value="colorize">B&W Colorization</option>
              <option value="complete">Complete Restoration</option>
            </select>
          </div>

          {/* Description */}
          <Textarea
            label="Describe the restoration needed"
            placeholder="Tell us about the damage or what you'd like restored..."
            rows={3}
          />

          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Your Name *"
              placeholder="John Doe"
              required
            />
            <Input
              label="Phone Number *"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>

          <Input
            label="Email Address *"
            type="email"
            placeholder="john@example.com"
            required
          />

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Get Free Estimate
              </>
            )}
          </Button>

          <p className="text-xs text-muted text-center">
            By submitting, you agree to receive communications about your restoration request.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
