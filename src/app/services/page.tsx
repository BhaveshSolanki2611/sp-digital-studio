import type { Metadata } from 'next'
import { ServicesHero } from './components/ServicesHero'
import { ServicesList } from './components/ServicesList'
import { CTASection } from './components/CTASection'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Photography and videography services - Wedding photography, pre-wedding shoots, product photography, photo editing, restoration, instant prints and more.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <CTASection />
    </>
  )
}
