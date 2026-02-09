'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { 
  Heart, Camera, Plane, Sparkles, Cake, Users, Aperture, 
  Package, Video, RotateCcw, Edit, ImageIcon, Printer, 
  Monitor, X, ArrowRight, Check 
} from 'lucide-react'
import { Button } from '@/components/ui'
import { formatPrice, formatPriceRange } from '@/lib/utils'

const services = [
  {
    id: 'wedding',
    icon: Heart,
    title: 'Wedding Photography',
    shortDesc: 'Complete wedding coverage with professional photographers and videographers.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    description: 'Capture every moment of your special day with our experienced wedding photography team. From traditional ceremonies to candid moments, we ensure no precious memory is missed.',
    deliverables: ['Full day coverage', 'Edited high-resolution photos', 'Cinematic highlight video', 'Premium album', 'Digital gallery'],
    turnaround: '2-4 weeks',
    startingPrice: 18000,
    packages: [
      { name: 'Basic', price: '18,000 - 20,000', includes: ['1 Photographer', '1 Videographer', '25-sheet album', '2 songs mix'] },
      { name: 'Premium', price: '35,000 - 45,000', includes: ['Everything in Basic', '2 LED screens', 'Drone coverage', 'Teaser video'] },
      { name: 'Destination', price: 'From 55,000/day', includes: ['Full team travel', 'Multi-day coverage', 'Custom equipment'] },
    ],
  },
  {
    id: 'pre-wedding',
    icon: Camera,
    title: 'Pre-Wedding Shoots',
    shortDesc: 'Beautiful couple portraits before the big day.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    description: 'Create lasting memories with a romantic pre-wedding photoshoot. Choose from our studio or any outdoor location of your choice.',
    deliverables: ['3-4 hour session', '50+ edited photos', 'Multiple outfit changes', 'Location of choice', 'Digital delivery'],
    turnaround: '1 week',
    startingPrice: 8000,
  },
  {
    id: 'bridal',
    icon: Sparkles,
    title: 'Bridal Shoot',
    shortDesc: 'Stunning bridal portraits and lehenga shoots.',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800&q=80',
    description: 'Showcase your bridal beauty with our specialized bridal photography. Perfect for capturing your wedding attire and jewelry in stunning detail.',
    deliverables: ['2-hour session', '30+ edited photos', 'Studio or on-location', 'Makeup-ready shots'],
    turnaround: '5 days',
    startingPrice: 5000,
  },
  {
    id: 'events',
    icon: Cake,
    title: 'Birthday & Events',
    shortDesc: 'Professional coverage for all celebrations.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    description: 'From birthdays to corporate events, anniversaries to parties — we capture the joy and excitement of every celebration.',
    deliverables: ['Full event coverage', 'Photo and video', 'Edited photos', 'Highlight reel'],
    turnaround: '1-2 weeks',
    startingPrice: 5000,
  },
  {
    id: 'corporate',
    icon: Users,
    title: 'Corporate & Business',
    shortDesc: 'Professional photos for your business needs.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    description: 'Elevate your brand with professional corporate photography. Headshots, team photos, event coverage, and office documentation.',
    deliverables: ['Professional headshots', 'Team photos', 'Office environment shots', 'Quick turnaround'],
    turnaround: '3-5 days',
    startingPrice: 8000,
  },
  {
    id: 'candid',
    icon: Aperture,
    title: 'Candid Photography',
    shortDesc: 'Natural, unposed moments captured beautifully.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    description: 'Our candid photography captures genuine emotions and spontaneous moments. Perfect for weddings, events, and family gatherings.',
    deliverables: ['Candid coverage', 'Natural light expertise', 'Story-telling approach', 'Edited collection'],
    turnaround: '1-2 weeks',
    startingPrice: 10000,
  },
  {
    id: 'product',
    icon: Package,
    title: 'Product & Brand',
    shortDesc: 'E-commerce, catalog, and lifestyle photography.',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80',
    description: 'Make your products shine with professional product photography. Perfect for e-commerce, catalogs, social media, and advertising.',
    deliverables: ['White background shots', 'Lifestyle photos', 'Multiple angles', 'High-res files'],
    turnaround: '2-3 days',
    startingPrice: 500,
    priceNote: 'per product',
  },
  {
    id: 'drone',
    icon: Video,
    title: 'Drone Shoots',
    shortDesc: 'Aerial photography and videography.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
    description: 'Capture breathtaking aerial views of your venue, property, or event with our professional drone services.',
    deliverables: ['Aerial photos', 'Aerial video footage', '4K quality', 'Licensed operator'],
    turnaround: '3-5 days',
    startingPrice: 5000,
  },
  {
    id: '360-booth',
    icon: RotateCcw,
    title: '360 Selfie Booth',
    shortDesc: 'Interactive booth for events and parties.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
    description: 'The life of the party! Our 360 selfie booth creates viral-worthy slow-motion videos for your guests.',
    deliverables: ['Full-day rental', 'Instant sharing', 'On-site printing', 'Props included'],
    turnaround: 'Instant',
    startingPrice: 10000,
    priceNote: 'per day',
  },
  {
    id: 'editing',
    icon: Edit,
    title: 'Photo & Video Editing',
    shortDesc: 'Color grading, mixing, album design, and more.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
    description: 'Professional editing services including color grading, retouching, video mixing, album design, and subtitle addition.',
    deliverables: ['Color correction', 'Retouching', 'Video editing', 'Album layouts'],
    turnaround: 'Varies by project',
    startingPrice: 2000,
  },
  {
    id: 'restoration',
    icon: ImageIcon,
    title: 'Photo Restoration',
    shortDesc: 'Restore old photos, B&W to color conversion.',
    image: 'https://images.unsplash.com/photo-1516035645781-9f126e774e9e?w=800&q=80',
    description: 'Bring old, damaged photos back to life. We restore torn, faded, or damaged photos and can colorize black and white images.',
    deliverables: ['Damage repair', 'Color restoration', 'B&W colorization', 'High-res output'],
    turnaround: '3-7 days',
    startingPrice: 500,
    priceNote: 'per photo',
  },
  {
    id: 'instant',
    icon: Printer,
    title: 'Instant Prints',
    shortDesc: 'Passport photos, visa photos, and instant prints.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Walk in for instant passport and visa photos. All standard sizes available with quick 5-minute turnaround.',
    deliverables: ['Passport size', 'Visa sizes', 'ID photos', 'Various print sizes'],
    turnaround: '5 minutes',
    startingPrice: 50,
    priceNote: 'per set',
  },
  {
    id: 'equipment',
    icon: Monitor,
    title: 'Equipment Rental',
    shortDesc: 'LED screens, drones, plasma displays, and more.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    description: 'Rent professional equipment for your events. LED screens, plasma displays, drones, and 360 booths available.',
    deliverables: ['LED screens', 'Plasma displays', 'Drones with operator', '360 booth'],
    turnaround: 'Same day setup',
    startingPrice: 5000,
    priceNote: 'per day',
  },
]

export function ServicesList() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <service.icon className="w-5 h-5" />
                    <span className="font-medium">{service.title}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted text-sm mb-4">{service.shortDesc}</p>
                
                <div className="flex items-end justify-between">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedService(service)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog.Root open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <AnimatePresence>
          {selectedService && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-50"
                >
                  {/* Header Image */}
                  <div className="relative h-48 md:h-64">
                    <Image
                      src={selectedService.image}
                      alt={selectedService.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <Dialog.Close className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                      <X className="w-5 h-5" />
                    </Dialog.Close>
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="flex items-center gap-3 text-white mb-2">
                        <selectedService.icon className="w-6 h-6 text-accent" />
                        <Dialog.Title className="text-2xl font-bold">
                          {selectedService.title}
                        </Dialog.Title>
                      </div>
                      <p className="text-white/80 text-sm">
                        {selectedService.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <p className="text-muted mb-6">
                      {selectedService.description}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">What&apos;s Included</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {selectedService.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-secondary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Turnaround */}
                    <div className="mb-6">
                      <p className="text-xs text-muted uppercase">Turnaround</p>
                      <p className="font-semibold">{selectedService.turnaround}</p>
                    </div>

                    {/* Packages (if available) - show features only */}
                    {selectedService.packages && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Available Packages</h4>
                        <div className="grid gap-4">
                          {selectedService.packages.map((pkg) => (
                            <div key={pkg.name} className="p-4 rounded-xl bg-gray-50">
                              <h5 className="font-semibold mb-2">{pkg.name}</h5>
                              <ul className="flex flex-wrap gap-2">
                                {pkg.includes.map((item) => (
                                  <li key={item} className="text-xs bg-white px-2 py-1 rounded">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="flex gap-4">
                      <Button className="flex-1" asChild>
                        <Link href="/booking">
                          Get a Quote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  )
}
