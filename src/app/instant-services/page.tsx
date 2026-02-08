import type { Metadata } from 'next'
import { InstantHero } from './components/InstantHero'
import { InstantServices } from './components/InstantServices'
import { InstantFAQ } from './components/InstantFAQ'

export const metadata: Metadata = {
  title: 'Instant Prints & Passport Photos',
  description: 'Walk-in for instant passport photos, visa photos, and quick prints. 5-minute service with all standard sizes available.',
}

export default function InstantServicesPage() {
  return (
    <>
      <InstantHero />
      <InstantServices />
      <InstantFAQ />
    </>
  )
}
