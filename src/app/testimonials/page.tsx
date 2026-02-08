import type { Metadata } from 'next'
import { MessageSquare, Star, Users } from 'lucide-react'
import { TestimonialsList } from './components/TestimonialsList'
import { TestimonialForm } from './components/TestimonialForm'
import { STATS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials | SP Digital Studio & Color Lab',
  description: 'Read what our happy clients say about SP Digital Studio & Color Lab. Real reviews from weddings, events, and photography sessions across Delhi NCR.',
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-maroon to-brand-maroon/90 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageSquare className="h-8 w-8" />
              <h1 className="text-3xl md:text-5xl font-bold">Client Testimonials</h1>
            </div>
            <p className="text-lg text-white/80 mb-8">
              Real stories from real clients. See why families across Delhi NCR trust us for their special moments.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center gap-1 text-brand-gold mb-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-sm text-white/70">Average Rating</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center gap-1 text-brand-gold mb-1">
                  <Users className="h-5 w-5" />
                  <span className="text-2xl font-bold">{STATS.happyClients.toLocaleString()}+</span>
                </div>
                <p className="text-sm text-white/70">Happy Clients</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center gap-1 text-brand-gold mb-1">
                  <span className="text-2xl font-bold">{STATS.yearsInBusiness}+</span>
                </div>
                <p className="text-sm text-white/70">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <TestimonialsList />
        </div>
      </section>
      
      {/* Submit Review Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
              <p className="text-gray-600">
                Had a great experience with SP Digital Studio? We would love to hear from you! Your feedback helps us improve and helps others make informed decisions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <TestimonialForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Google Reviews CTA */}
      <section className="py-12 bg-brand-cream">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            You can also leave us a review on Google to help others find us!
          </p>
          <a
            href="https://www.google.com/search?q=SP+Digital+Studio+Najafgarh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Review us on Google
          </a>
        </div>
      </section>
    </main>
  )
}
