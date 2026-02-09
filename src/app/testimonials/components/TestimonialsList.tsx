'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, Camera, Heart, Users, PartyPopper, Plane, Loader2 } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  service: string | null
  rating: number
  text: string
  featured: boolean
  created_at: string
}

// Fallback testimonials if API fails or no data
const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya & Rahul Sharma',
    service: 'Wedding Photography',
    rating: 5,
    text: 'SP Digital Studio captured our wedding beautifully! The team was professional, punctual, and creative. Our album is absolutely stunning. Every moment from our special day was captured with such attention to detail. Highly recommend for anyone looking for quality wedding photography.',
    featured: true,
    created_at: '2024-11-15',
  },
  {
    id: '2',
    name: 'Amit Verma',
    service: 'Pre-Wedding Shoot',
    rating: 5,
    text: 'Amazing pre-wedding shoot experience! Satpal ji and team knew exactly how to make us comfortable in front of the camera. The locations they suggested were perfect and the photos came out gorgeous. Great value for money.',
    featured: true,
    created_at: '2024-10-20',
  },
  {
    id: '3',
    name: 'Sunita Devi',
    service: 'Photo Restoration',
    rating: 5,
    text: 'They restored my parents\' 50-year-old wedding photo perfectly. I was amazed at the quality. The faded, torn photo now looks brand new. It was like magic seeing the old photo come back to life. Brought tears to our eyes!',
    featured: true,
    created_at: '2024-09-10',
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    service: 'Birthday Photography',
    rating: 5,
    text: 'Booked them for my daughter\'s first birthday. The team was patient with the kids and captured beautiful candid moments. The decorations looked amazing in the photos. Very happy with the results!',
    featured: false,
    created_at: '2024-08-25',
  },
  {
    id: '5',
    name: 'Neha & Vikram Malhotra',
    service: 'Destination Wedding',
    rating: 5,
    text: 'We hired SP Digital for our Jaipur wedding and they exceeded all expectations. The drone footage was breathtaking, capturing the beautiful architecture and our ceremonies from unique angles. Worth every rupee!',
    featured: true,
    created_at: '2024-12-01',
  },
  {
    id: '6',
    name: 'Meera Agarwal',
    service: 'Product Photography',
    rating: 5,
    text: 'I run a jewelry business and needed professional product photos for my website. SP Digital delivered exceptional quality. The lighting and details in every shot were perfect. My online sales have increased significantly!',
    featured: false,
    created_at: '2024-07-15',
  },
]

const serviceIcons: Record<string, typeof Camera> = {
  'Wedding Photography': Heart,
  'Pre-Wedding Shoot': Camera,
  'Photo Restoration': Camera,
  'Birthday Photography': PartyPopper,
  'Destination Wedding': Plane,
  'Product Photography': Camera,
  'Corporate Event': Users,
}

export function TestimonialsList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          if (data.testimonials && data.testimonials.length > 0) {
            setTestimonials(data.testimonials)
          }
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
        // Keep using fallback testimonials
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => {
        const IconComponent = serviceIcons[testimonial.service || ''] || Camera
        
        return (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl shadow-lg p-6 relative ${
              testimonial.featured ? 'ring-2 ring-yellow-400' : ''
            }`}
          >
            {testimonial.featured && (
              <span className="absolute -top-3 right-4 bg-yellow-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            
            <Quote className="h-8 w-8 text-primary/20 mb-4" />
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                {testimonial.service && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <IconComponent className="h-3.5 w-3.5" />
                    <span>{testimonial.service}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
