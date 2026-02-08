'use client'

import { BUSINESS_INFO } from '@/lib/constants'

export function MapSection() {
  // URL encode the address for Google Maps embed
  const address = encodeURIComponent(BUSINESS_INFO.address.full)
  
  return (
    <section className="h-[400px] md:h-[500px] relative">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${address}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SP Digital Studio Location"
        className="absolute inset-0"
      />
      
      {/* Overlay Card */}
      <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs hidden md:block">
        <h3 className="font-bold text-primary mb-1">{BUSINESS_INFO.name}</h3>
        <p className="text-sm text-muted mb-2">{BUSINESS_INFO.address.street}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:underline"
        >
          Get Directions
        </a>
      </div>
    </section>
  )
}
