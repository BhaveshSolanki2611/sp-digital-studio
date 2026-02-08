import type { Metadata } from 'next'
import { ShoppingCart } from 'lucide-react'
import CheckoutForm from './components/CheckoutForm'

export const metadata: Metadata = {
  title: 'Checkout | SP Digital Studio & Color Lab',
  description: 'Complete your order from SP Digital Studio & Color Lab. Secure payment options including PayPal and Cash on Delivery.',
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-maroon to-brand-maroon/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingCart className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          </div>
          <p className="text-center text-white/80 max-w-xl mx-auto">
            Complete your order securely. Choose from store pickup or home delivery.
          </p>
        </div>
      </section>
      
      {/* Checkout Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <CheckoutForm />
        </div>
      </section>
    </main>
  )
}
