import type { Metadata } from 'next'
import { BookingHero } from './components/BookingHero'
import { BookingForm } from './components/BookingForm'

export const metadata: Metadata = {
  title: 'Book a Shoot',
  description: 'Book your photography or videography session with SP Digital Studio. Weddings, events, product shoots and more.',
}

export default function BookingPage() {
  return (
    <>
      <BookingHero />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <BookingForm />
        </div>
      </section>
    </>
  )
}
