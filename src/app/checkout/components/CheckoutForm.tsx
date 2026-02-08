'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import {
  ShoppingBag,
  Truck,
  Store,
  CreditCard,
  Wallet,
  ArrowLeft,
  CheckCircle,
  Loader2,
  AlertCircle,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useCartStore, CartItem } from '@/store/cart'
import { BUSINESS_INFO } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

type DeliveryOption = 'pickup' | 'shipping'
type PaymentMethod = 'paypal' | 'razorpay' | 'cod'

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  notes: string
}

export default function CheckoutForm() {
  const router = useRouter()
  const { items, getTotalPrice, updateQuantity, removeItem, clearCart } = useCartStore()
  
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<'cart' | 'details' | 'payment' | 'success'>('cart')
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('pickup')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paypal')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  })
  
  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const subtotal = mounted ? getTotalPrice() : 0
  const shippingCost = deliveryOption === 'shipping' ? 100 : 0
  const total = subtotal + shippingCost
  
  // Convert INR to USD for PayPal (approximate rate)
  const totalUSD = (total / 83).toFixed(2)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const validateDetails = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields')
      return false
    }
    if (deliveryOption === 'shipping' && (!formData.address || !formData.city || !formData.pincode)) {
      setError('Please fill in your complete shipping address')
      return false
    }
    setError('')
    return true
  }
  
  const handleContinueToPayment = () => {
    if (validateDetails()) {
      setStep('payment')
    }
  }
  
  const createOrder = async (paymentId: string, paymentStatus: 'pending' | 'completed') => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: deliveryOption === 'shipping' 
            ? `${formData.address}, ${formData.city} - ${formData.pincode}`
            : null,
          pickup_option: deliveryOption === 'pickup',
          payment_method: paymentMethod,
          payment_id: paymentId,
          payment_status: paymentStatus,
          subtotal,
          shipping: shippingCost,
          tax: 0,
          total,
          notes: formData.notes,
          items: items.map((item) => ({
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            options: item.options || null,
          })),
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }
      
      return data.orderId
    } catch (err) {
      console.error('Order creation error:', err)
      throw err
    }
  }
  
  const handleCODOrder = async () => {
    setIsProcessing(true)
    setError('')
    
    try {
      const newOrderId = await createOrder('cod-' + Date.now(), 'pending')
      setOrderId(newOrderId)
      clearCart()
      setStep('success')
    } catch (err) {
      setError('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  const handlePayPalApprove = async (data: { orderID: string }) => {
    setIsProcessing(true)
    setError('')
    
    try {
      const newOrderId = await createOrder(data.orderID, 'completed')
      setOrderId(newOrderId)
      clearCart()
      setStep('success')
    } catch (err) {
      setError('Payment successful but failed to save order. Please contact us.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-maroon" />
      </div>
    )
  }
  
  if (items.length === 0 && step !== 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <ShoppingBag className="h-20 w-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Button onClick={() => router.push('/products')}>
          Browse Products
        </Button>
      </motion.div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {['cart', 'details', 'payment', 'success'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === s || ['cart', 'details', 'payment', 'success'].indexOf(step) > i
                  ? 'bg-brand-maroon text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && (
              <div
                className={`w-12 h-1 mx-1 ${
                  ['cart', 'details', 'payment', 'success'].indexOf(step) > i
                    ? 'bg-brand-maroon'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {/* Step 1: Cart Review */}
        {step === 'cart' && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Cart</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            
            {/* Delivery Options */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Option</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryOption('pickup')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    deliveryOption === 'pickup'
                      ? 'border-brand-maroon bg-brand-maroon/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Store className="h-6 w-6 mb-2 text-brand-maroon" />
                  <div className="font-medium">Store Pickup</div>
                  <div className="text-sm text-gray-500">Free - Pick up from our studio</div>
                </button>
                
                <button
                  onClick={() => setDeliveryOption('shipping')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    deliveryOption === 'shipping'
                      ? 'border-brand-maroon bg-brand-maroon/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Truck className="h-6 w-6 mb-2 text-brand-maroon" />
                  <div className="font-medium">Home Delivery</div>
                  <div className="text-sm text-gray-500">+{formatPrice(100)} shipping</div>
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-brand-maroon">{formatPrice(total)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <Button variant="outline" onClick={() => router.push('/products')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              <Button onClick={() => setStep('details')} className="flex-1">
                Proceed to Details
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Customer Details */}
        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
              
              {deliveryOption === 'shipping' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address *
                    </label>
                    <Textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House no., Street, Locality"
                      rows={2}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New Delhi"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code *
                      </label>
                      <Input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="110043"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              
              {deliveryOption === 'pickup' && (
                <div className="bg-brand-cream rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-1">Pickup Location</h4>
                  <p className="text-gray-600 text-sm">{BUSINESS_INFO.address.full}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {BUSINESS_INFO.hours.weekdays} (Mon-Sat)
                  </p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Notes (Optional)
                </label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Special instructions, customization requests, etc."
                  rows={2}
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <Button variant="outline" onClick={() => setStep('cart')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleContinueToPayment} className="flex-1">
                Continue to Payment
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Payment */}
        {step === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}
            
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t mt-3 pt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span className="text-brand-maroon">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Select Payment Method</h3>
              
              <div className="grid gap-3">
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'paypal'
                      ? 'border-brand-maroon bg-brand-maroon/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Wallet className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-gray-500">
                      Pay securely with PayPal ({formatPrice(total)} ~ ${totalUSD} USD)
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('razorpay')}
                  disabled
                  className="p-4 rounded-lg border-2 border-gray-200 flex items-center gap-3 opacity-50 cursor-not-allowed"
                >
                  <CreditCard className="h-6 w-6 text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium">Razorpay (UPI/Cards)</div>
                    <div className="text-sm text-gray-500">Coming soon - Indian payment methods</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-brand-maroon bg-brand-maroon/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Store className="h-6 w-6 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">
                      {deliveryOption === 'pickup' ? 'Pay at Pickup' : 'Cash on Delivery'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Pay when you receive your order
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* PayPal Button */}
            {paymentMethod === 'paypal' && (
              <div className="mb-6">
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                    currency: 'USD',
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical', shape: 'rect' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                          {
                            description: `SP Digital Studio Order`,
                            amount: {
                              currency_code: 'USD',
                              value: totalUSD,
                            },
                          },
                        ],
                      })
                    }}
                    onApprove={async (data, actions) => {
                      if (actions.order) {
                        await actions.order.capture()
                        handlePayPalApprove(data)
                      }
                    }}
                    onError={() => {
                      setError('PayPal payment failed. Please try again.')
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
            
            {/* COD Button */}
            {paymentMethod === 'cod' && (
              <Button
                onClick={handleCODOrder}
                disabled={isProcessing}
                className="w-full mb-6"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - ${formatPrice(total)}`
                )}
              </Button>
            )}
            
            <Button variant="outline" onClick={() => setStep('details')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Details
            </Button>
          </motion.div>
        )}
        
        {/* Step 4: Success */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-2">Thank you for your order.</p>
            <p className="text-sm text-gray-500 mb-6">Order ID: {orderId}</p>
            
            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8 text-left">
              <h3 className="font-semibold mb-3">What&apos;s Next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>You&apos;ll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>We&apos;ll process your order within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>
                    {deliveryOption === 'pickup'
                      ? 'We\'ll call you when ready for pickup'
                      : 'We\'ll send tracking info once shipped'}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => router.push('/products')}>
                Continue Shopping
              </Button>
              <Button onClick={() => router.push('/')}>
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Cart Item Row Component
function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem
  onUpdateQuantity: (id: string, qty: number) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <ShoppingBag className="h-8 w-8 text-gray-400" />
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        {item.options && (
          <p className="text-sm text-gray-500">
            {Object.entries(item.options).map(([key, value]) => `${key}: ${value}`).join(', ')}
          </p>
        )}
        <p className="text-brand-maroon font-medium">{formatPrice(item.price)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 mt-1"
        >
          <Trash2 className="h-3 w-3" />
          Remove
        </button>
      </div>
    </div>
  )
}
