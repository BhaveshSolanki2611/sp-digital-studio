'use client'

import { motion } from 'framer-motion'
import { FileCheck, Globe, CreditCard, Camera, Printer, Clock, Tag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { PASSPORT_PHOTOS, PHOTO_PRINTS, PRINT_BULK_DISCOUNTS } from '@/lib/constants'

const features = [
  { icon: Clock, title: '5-Minute Service', description: 'Quick turnaround for all instant services' },
  { icon: Camera, title: 'Professional Quality', description: 'High-resolution prints that meet all requirements' },
  { icon: Globe, title: 'All Visa Standards', description: 'Photos for any country\'s visa requirements' },
  { icon: FileCheck, title: 'Guaranteed Acceptance', description: 'Retake if your photo is rejected' },
]

export function InstantServices() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gray-50"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Passport/ID Photos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-accent" />
              Passport & ID Photos
            </h2>
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left p-4 text-sm">Photo Type</th>
                    <th className="text-left p-4 text-sm">Size</th>
                    <th className="text-right p-4 text-sm">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PASSPORT_PHOTOS.map((photo, index) => (
                    <tr key={photo.type} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 text-sm font-medium">{photo.type}</td>
                      <td className="p-4 text-sm text-muted">{photo.size}</td>
                      <td className="p-4 text-sm text-right">
                        <span className="font-bold text-accent">{formatPrice(photo.price)}</span>
                        <span className="text-xs text-muted block">{photo.quantity} photos</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Print Sizes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Printer className="w-6 h-6 text-accent" />
              Instant Photo Prints
            </h2>
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left p-4 text-sm">Print Size</th>
                    <th className="text-right p-4 text-sm">Price (per print)</th>
                  </tr>
                </thead>
                <tbody>
                  {PHOTO_PRINTS.map((print, index) => (
                    <tr key={print.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 text-sm font-medium">{print.size}</td>
                      <td className="p-4 text-sm text-right font-bold text-accent">
                        {formatPrice(print.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Bulk Discount Notice */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5" />
                Bulk Order Discounts
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {PRINT_BULK_DISCOUNTS.map((tier) => (
                  <div key={tier.minQty} className="text-sm text-green-700 bg-white rounded-lg px-3 py-2">
                    <span className="font-medium">{tier.minQty}+ photos:</span> {tier.discount}% off
                  </div>
                ))}
              </div>
              <p className="text-xs text-green-600 mt-3">
                * Discounts apply automatically for bulk orders. Contact us for custom quotes on large orders.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
