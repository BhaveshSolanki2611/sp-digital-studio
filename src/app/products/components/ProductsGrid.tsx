'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingCart, Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'prints', label: 'Photo Prints' },
  { id: 'frames', label: 'Frames' },
  { id: 'albums', label: 'Albums' },
  { id: 'merchandise', label: 'Merchandise' },
  { id: 'accessories', label: 'Accessories' },
]

const products = [
  // Photo Prints
  {
    id: 'print-4x6',
    name: '4x6" Photo Print',
    category: 'prints',
    price: 15,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    description: 'High-quality glossy photo print',
  },
  {
    id: 'print-5x7',
    name: '5x7" Photo Print',
    category: 'prints',
    price: 25,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    description: 'High-quality glossy photo print',
  },
  {
    id: 'print-8x10',
    name: '8x10" Photo Print',
    category: 'prints',
    price: 50,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    description: 'High-quality glossy photo print',
  },
  // Frames
  {
    id: 'frame-6x8',
    name: '6x8" Photo Frame',
    category: 'frames',
    price: 250,
    image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=400&q=80',
    description: 'Classic wooden frame with glass',
  },
  {
    id: 'frame-8x12',
    name: '8x12" Photo Frame',
    category: 'frames',
    price: 450,
    image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=400&q=80',
    description: 'Premium wooden frame with glass',
  },
  {
    id: 'collage-frame',
    name: 'Collage Frame (5 Photos)',
    category: 'frames',
    price: 850,
    image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=400&q=80',
    description: 'Multi-photo collage frame',
  },
  // Albums
  {
    id: 'album-25',
    name: '25-Sheet Photo Album',
    category: 'albums',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
    description: 'Premium leatherette cover album',
  },
  {
    id: 'album-50',
    name: '50-Sheet Photo Album',
    category: 'albums',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
    description: 'Premium leatherette cover album',
  },
  {
    id: 'album-premium',
    name: 'Premium Wedding Album',
    category: 'albums',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
    description: 'Hardcover with custom design',
  },
  // Merchandise
  {
    id: 'mug',
    name: 'Custom Photo Mug',
    category: 'merchandise',
    price: 299,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    description: 'Ceramic mug with your photo',
  },
  {
    id: 'tshirt',
    name: 'Custom Photo T-Shirt',
    category: 'merchandise',
    price: 499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    description: 'Cotton t-shirt with custom print',
  },
  {
    id: 'phone-cover',
    name: 'Custom Phone Cover',
    category: 'merchandise',
    price: 399,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80',
    description: 'Hard case with your photo',
  },
  {
    id: 'keychain',
    name: 'Photo Keychain',
    category: 'merchandise',
    price: 149,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    description: 'Metal keychain with photo',
  },
  // Accessories
  {
    id: 'pendrive-32',
    name: '32GB USB Pendrive',
    category: 'accessories',
    price: 399,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    description: 'High-speed USB 3.0',
  },
  {
    id: 'pendrive-64',
    name: '64GB USB Pendrive',
    category: 'accessories',
    price: 599,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    description: 'High-speed USB 3.0',
  },
  {
    id: 'card-reader',
    name: 'Card Reader',
    category: 'accessories',
    price: 299,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    description: 'Multi-format card reader',
  },
  {
    id: 'memory-32',
    name: '32GB Memory Card',
    category: 'accessories',
    price: 499,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    description: 'Class 10 SDHC card',
  },
]

export function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const addItem = useCartStore((state) => state.addItem)
  const toggleCart = useCartStore((state) => state.toggleCart)

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    toggleCart()
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Category Filter */}
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

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-white"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1 truncate">{product.name}</h3>
                <p className="text-xs text-muted mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-accent">{formatPrice(product.price)}</p>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-muted text-sm">
            Prices are indicative and may vary. Custom sizes and bulk orders available on request.
            <br />
            Store pickup available at our Najafgarh location.
          </p>
        </div>
      </div>
    </section>
  )
}
