'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Camera, Heart, Users, PartyPopper, Plane } from 'lucide-react'

// Sample testimonials data - will be replaced with Supabase data later
const testimonials = [
  {
    id: '1',
    name: 'Priya & Rahul Sharma',
    service: 'Wedding Photography',
    rating: 5,
    text: 'SP Digital Studio captured our wedding beautifully! The team was professional, punctual, and creative. Our album is absolutely stunning. Every moment from our special day was captured with such attention to detail. Highly recommend for anyone looking for quality wedding photography.',
    eventDate: '2024-11-15',
    featured: true,
  },
  {
    id: '2',
    name: 'Amit Verma',
    service: 'Pre-Wedding Shoot',
    rating: 5,
    text: 'Amazing pre-wedding shoot experience! Satpal ji and team knew exactly how to make us comfortable in front of the camera. The locations they suggested were perfect and the photos came out gorgeous. Great value for money.',
    eventDate: '2024-10-20',
    featured: true,
  },
  {
    id: '3',
    name: 'Sunita Devi',
    service: 'Photo Restoration',
    rating: 5,
    text: 'They restored my parents\' 50-year-old wedding photo perfectly. I was amazed at the quality. The faded, torn photo now looks brand new. It was like magic seeing the old photo come back to life. Brought tears to our eyes!',
    eventDate: '2024-09-10',
    featured: true,
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    service: 'Birthday Photography',
    rating: 5,
    text: 'Booked them for my daughter\'s first birthday. The team was patient with the kids and captured beautiful candid moments. The decorations looked amazing in the photos. Very happy with the results!',
    eventDate: '2024-08-25',
    featured: false,
  },
  {
    id: '5',
    name: 'Neha & Vikram Malhotra',
    service: 'Destination Wedding',
    rating: 5,
    text: 'We hired SP Digital for our Jaipur wedding and they exceeded all expectations. The drone footage was breathtaking, capturing the beautiful architecture and our ceremonies from unique angles. Worth every rupee!',
    eventDate: '2024-12-01',
    featured: true,
  },
  {
    id: '6',
    name: 'Meera Agarwal',
    service: 'Product Photography',
    rating: 5,
    text: 'I run a jewelry business and needed professional product photos for my website. SP Digital delivered exceptional quality. The lighting and details in every shot were perfect. My online sales have increased significantly!',
    eventDate: '2024-07-15',
    featured: false,
  },
  {
    id: '7',
    name: 'Deepak & Kavita',
    service: 'Wedding Photography',
    rating: 5,
    text: 'Our wedding video is like a Bollywood movie! The editing, music, and cinematography are all top-notch. Friends and family keep asking who did our wedding photography. Highly recommend SP Digital Studio!',
    eventDate: '2024-06-20',
    featured: true,
  },
  {
    id: '8',
    name: 'Sanjay Gupta',
    service: 'Corporate Event',
    rating: 5,
    text: 'Hired them for our company\'s annual function. They captured every moment professionally - from the awards ceremony to the entertainment. Quick delivery and excellent quality photos and videos.',
    eventDate: '2024-05-10',
    featured: false,
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
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => {
        const IconComponent = serviceIcons[testimonial.service] || Camera
        
        return (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl shadow-lg p-6 relative ${
              testimonial.featured ? 'ring-2 ring-brand-gold' : ''
            }`}
          >
            {testimonial.featured && (
              <span className="absolute -top-3 right-4 bg-brand-gold text-white text-xs font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            
            <Quote className="h-8 w-8 text-brand-maroon/20 mb-4" />
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-maroon to-brand-maroon/70 flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <IconComponent className="h-3.5 w-3.5" />
                  <span>{testimonial.service}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
