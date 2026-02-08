'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'pre-wedding', label: 'Pre-Wedding' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'product', label: 'Product' },
  { id: 'events', label: 'Events' },
  { id: 'candid', label: 'Candid' },
  { id: 'drone', label: 'Drone' },
]

const portfolioItems = [
  {
    id: 1,
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    title: 'Royal Wedding Celebration',
    description: 'A grand wedding ceremony at The Leela Palace',
  },
  {
    id: 2,
    category: 'pre-wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    title: 'Romantic Pre-Wedding',
    description: 'Couple shoot at Hauz Khas Fort',
  },
  {
    id: 3,
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    title: 'Traditional Ceremony',
    description: 'Hindu wedding rituals captured beautifully',
  },
  {
    id: 4,
    category: 'product',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80',
    title: 'Jewelry Collection',
    description: 'Product shoot for luxury jewelry brand',
  },
  {
    id: 5,
    category: 'bridal',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800&q=80',
    title: 'Bridal Portrait',
    description: 'Stunning bridal photography',
  },
  {
    id: 6,
    category: 'events',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    title: 'Birthday Celebration',
    description: 'First birthday party coverage',
  },
  {
    id: 7,
    category: 'candid',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
    title: 'Candid Moments',
    description: 'Natural wedding moments',
  },
  {
    id: 8,
    category: 'drone',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
    title: 'Aerial View',
    description: 'Drone coverage of wedding venue',
  },
  {
    id: 9,
    category: 'pre-wedding',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    title: 'Beach Pre-Wedding',
    description: 'Goa beach photoshoot',
  },
  {
    id: 10,
    category: 'product',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    title: 'Product Photography',
    description: 'E-commerce product shots',
  },
  {
    id: 11,
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    title: 'Ring Exchange',
    description: 'Intimate ceremony moments',
  },
  {
    id: 12,
    category: 'events',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    title: 'Corporate Event',
    description: 'Annual corporate gathering',
  },
]

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  const currentIndex = selectedImage !== null
    ? filteredItems.findIndex(item => item.id === selectedImage)
    : -1

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1].id)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1].id)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-accent text-white shadow-accent'
                  : 'bg-gray-100 text-muted hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                  index % 5 === 0 ? 'row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(item.id)}
              >
                <div className={`relative ${index % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <AnimatePresence>
          {selectedImage !== null && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/95 z-50"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                  {/* Close Button */}
                  <Dialog.Close className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10">
                    <X className="w-6 h-6" />
                  </Dialog.Close>

                  {/* Navigation */}
                  {currentIndex > 0 && (
                    <button
                      onClick={goToPrev}
                      className="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}
                  {currentIndex < filteredItems.length - 1 && (
                    <button
                      onClick={goToNext}
                      className="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}

                  {/* Image */}
                  <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
                    {filteredItems.find(item => item.id === selectedImage) && (
                      <Image
                        src={filteredItems.find(item => item.id === selectedImage)!.image}
                        alt={filteredItems.find(item => item.id === selectedImage)!.title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                    <Dialog.Title className="font-bold text-lg">
                      {filteredItems.find(item => item.id === selectedImage)?.title}
                    </Dialog.Title>
                    <p className="text-white/70 text-sm mt-1">
                      {filteredItems.find(item => item.id === selectedImage)?.description}
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      {currentIndex + 1} / {filteredItems.length}
                    </p>
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
