'use client'

import { motion } from 'framer-motion'
import { FileCheck, Globe, CreditCard, Camera, Printer, Clock } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const photoSizes = [
  { name: 'Passport Size (Indian)', dimensions: '35mm x 45mm', price: 50, perSet: '4 photos' },
  { name: 'Passport Size (US/UK)', dimensions: '51mm x 51mm', price: 80, perSet: '4 photos' },
  { name: 'Visa Size (Schengen)', dimensions: '35mm x 45mm', price: 80, perSet: '4 photos' },
  { name: 'OCI/PIO Card', dimensions: '51mm x 51mm', price: 100, perSet: '4 photos' },
  { name: 'Aadhar Card', dimensions: '35mm x 45mm', price: 50, perSet: '4 photos' },
  { name: 'PAN Card', dimensions: '25mm x 35mm', price: 50, perSet: '4 photos' },
  { name: 'Driving License', dimensions: '35mm x 45mm', price: 50, perSet: '4 photos' },
  { name: 'College/School ID', dimensions: 'Standard', price: 50, perSet: '4 photos' },
]

const printSizes = [
  { name: '4x6 inches', price: 15 },
  { name: '5x7 inches', price: 25 },
  { name: '6x8 inches', price: 35 },
  { name: '8x10 inches', price: 50 },
  { name: '8x12 inches', price: 60 },
  { name: '10x12 inches', price: 80 },
  { name: '12x18 inches', price: 150 },
  { name: 'A4 Size', price: 100 },
]

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
                  {photoSizes.map((photo, index) => (
                    <tr key={photo.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 text-sm font-medium">{photo.name}</td>
                      <td className="p-4 text-sm text-muted">{photo.dimensions}</td>
                      <td className="p-4 text-sm text-right">
                        <span className="font-bold text-accent">{formatPrice(photo.price)}</span>
                        <span className="text-xs text-muted block">{photo.perSet}</span>
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
                  {printSizes.map((print, index) => (
                    <tr key={print.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 text-sm font-medium">{print.name}</td>
                      <td className="p-4 text-sm text-right font-bold text-accent">
                        {formatPrice(print.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted mt-4">
              * Prices for glossy finish. Matte finish available at slightly higher rates.
              Bulk orders get discounts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
