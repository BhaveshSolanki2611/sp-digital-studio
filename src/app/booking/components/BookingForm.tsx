'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, Upload, Check, ChevronRight, ChevronLeft, X, File } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'
import { SERVICES } from '@/lib/constants'

const steps = [
  { id: 1, title: 'Service' },
  { id: 2, title: 'Details' },
  { id: 3, title: 'Contact' },
  { id: 4, title: 'Confirm' },
]

const budgetOptions = [
  'Under ₹20,000',
  '₹20,000 - ₹40,000',
  '₹40,000 - ₹60,000',
  '₹60,000 - ₹1,00,000',
  'Above ₹1,00,000',
  'Flexible / Discuss',
]

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    service: '',
    eventDate: '',
    eventEndDate: '',
    location: '',
    budget: '',
    notes: '',
    name: '',
    email: '',
    phone: '',
    files: [] as File[],
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateForm = (field: string, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(file => {
      const isValidType = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })
    updateForm('files', [...formData.files, ...validFiles].slice(0, 5)) // Max 5 files
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(file => {
      const isValidType = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })
    updateForm('files', [...formData.files, ...validFiles].slice(0, 5)) // Max 5 files
  }

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index)
    updateForm('files', newFiles)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.service,
          event_date: formData.eventDate,
          event_end_date: formData.eventEndDate || null,
          location: formData.location || null,
          budget: formData.budget || null,
          notes: formData.notes || null,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to submit booking. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== ''
      case 2:
        return formData.eventDate !== ''
      case 3:
        return formData.name !== '' && formData.email !== '' && formData.phone !== ''
      default:
        return true
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Booking Request Submitted!
        </h2>
        <p className="text-muted mb-6 max-w-md mx-auto">
          Thank you for choosing SP Digital Studio. We&apos;ve received your booking request 
          and will contact you within 24 hours to confirm details.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left max-w-sm mx-auto">
          <h3 className="font-semibold text-foreground mb-3">Booking Summary</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Service:</dt>
              <dd className="font-medium">{formData.service}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Date:</dt>
              <dd className="font-medium">{formData.eventDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Name:</dt>
              <dd className="font-medium">{formData.name}</dd>
            </div>
          </dl>
        </div>
        <p className="text-sm text-muted">
          A confirmation email has been sent to <strong>{formData.email}</strong>
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-accent text-white' 
                    : 'bg-gray-200 text-muted'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  currentStep >= step.id ? 'text-foreground font-medium' : 'text-muted'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-accent' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold text-primary mb-6">
              What service are you interested in?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => updateForm('service', service.title)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.service === service.title
                      ? 'border-accent bg-accent/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-foreground">{service.title}</span>
                  <p className="text-xs text-muted mt-1">{service.shortDesc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Event Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-primary mb-6">
              Tell us about your event
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Event Date *"
                type="date"
                value={formData.eventDate}
                onChange={(e) => updateForm('eventDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <Input
                label="End Date (for multi-day events)"
                type="date"
                value={formData.eventEndDate}
                onChange={(e) => updateForm('eventEndDate', e.target.value)}
                min={formData.eventDate}
              />
            </div>

            <Input
              label="Event Location"
              placeholder="Venue name, city, or 'To be decided'"
              value={formData.location}
              onChange={(e) => updateForm('location', e.target.value)}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Budget Range
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateForm('budget', option)}
                    className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                      formData.budget === option
                        ? 'border-accent bg-accent/5 text-accent'
                        : 'border-gray-200 hover:border-gray-300 text-muted'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              label="Additional Notes"
              placeholder="Any specific requirements, ideas, or questions?"
              value={formData.notes}
              onChange={(e) => updateForm('notes', e.target.value)}
              rows={3}
            />

            {/* File Upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Reference Images / Moodboard (optional)
              </label>
              <div 
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-accent transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted">
                  Drag & drop files here or click to browse
                </p>
                <p className="text-xs text-muted mt-1">
                  PNG, JPG, PDF up to 10MB each (max 5 files)
                </p>
              </div>
              
              {/* Selected Files List */}
              {formData.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-accent" />
                        <span className="text-sm text-foreground truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-muted">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(index)
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X className="w-4 h-4 text-muted" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-primary mb-6">
              Your Contact Information
            </h2>
            
            <Input
              label="Full Name *"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => updateForm('name', e.target.value)}
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Email Address *"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => updateForm('email', e.target.value)}
                required
              />
              <Input
                label="Phone Number *"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
                required
              />
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                We&apos;ll use your phone number to send booking confirmations via WhatsApp/SMS.
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review & Confirm */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold text-primary mb-6">
              Review Your Booking
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-foreground mb-3">Service</h3>
                <p className="text-accent font-semibold">{formData.service}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-foreground mb-3">Event Details</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted">Date:</dt>
                  <dd>{formData.eventDate}</dd>
                  {formData.eventEndDate && (
                    <>
                      <dt className="text-muted">End Date:</dt>
                      <dd>{formData.eventEndDate}</dd>
                    </>
                  )}
                  {formData.location && (
                    <>
                      <dt className="text-muted">Location:</dt>
                      <dd>{formData.location}</dd>
                    </>
                  )}
                  {formData.budget && (
                    <>
                      <dt className="text-muted">Budget:</dt>
                      <dd>{formData.budget}</dd>
                    </>
                  )}
                </dl>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-foreground mb-3">Contact</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted">Name:</dt>
                  <dd>{formData.name}</dd>
                  <dt className="text-muted">Email:</dt>
                  <dd>{formData.email}</dd>
                  <dt className="text-muted">Phone:</dt>
                  <dd>{formData.phone}</dd>
                </dl>
              </div>

              {formData.notes && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium text-foreground mb-2">Notes</h3>
                  <p className="text-sm text-muted">{formData.notes}</p>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 mb-6">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-gray-300 text-accent focus:ring-accent"
                required
              />
              <label htmlFor="terms" className="text-sm text-muted">
                I agree to receive communications about my booking via email and SMS. 
                I understand this is a booking request and final confirmation will be 
                provided after availability is checked.
              </label>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Booking
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
