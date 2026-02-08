import type { Metadata } from 'next'
import { ContactHero } from './components/ContactHero'
import { ContactInfo } from './components/ContactInfo'
import { ContactForm } from './components/ContactForm'
import { MapSection } from './components/MapSection'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SP Digital Studio & Color Lab. Visit our studio in Najafgarh, New Delhi or call +91 99106 43200.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      <MapSection />
    </>
  )
}
