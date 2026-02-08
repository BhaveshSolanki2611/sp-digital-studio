'use client'

import { motion } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'How long does it take to get passport photos?',
    answer: 'Our instant photo service takes just 5 minutes! Walk in, get photographed, and leave with your prints. No appointment needed.',
  },
  {
    question: 'What file formats do you accept for printing?',
    answer: 'We accept JPEG, PNG, and PDF files. You can bring your photos on a USB drive, send via WhatsApp, or email them to us for instant printing.',
  },
  {
    question: 'Do you provide photos that meet visa requirements?',
    answer: 'Yes! We provide photos for all countries including USA, UK, Canada, Australia, Schengen countries, and more. We stay updated with the latest requirements and guarantee acceptance.',
  },
  {
    question: 'What if my passport photo gets rejected?',
    answer: 'We offer a retake guarantee. If your photo is rejected by any authority due to quality issues, we\'ll reshoot for free (original receipt required).',
  },
  {
    question: 'Can I get photos printed from my phone?',
    answer: 'Absolutely! Send your photos via WhatsApp to our number or email them to us. We\'ll have them printed and ready in minutes.',
  },
  {
    question: 'Do you offer same-day printing for large orders?',
    answer: 'Yes, for most orders we can provide same-day service. For very large orders (100+ prints), we recommend calling ahead to confirm timing.',
  },
]

export function InstantFAQ() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted">
            Everything you need to know about our instant photo services.
          </p>
        </motion.div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Accordion.Item value={`faq-${index}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-muted shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 pb-6 text-muted">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
