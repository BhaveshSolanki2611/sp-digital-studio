import { 
  Hero, 
  ServicesStrip, 
  StatsSection, 
  EquipmentHighlight,
  InstantServicesBadge,
  TrustLine,
  ServicesOverview 
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Animated Slideshow */}
      <Hero />
      
      {/* Quick Services Strip */}
      <ServicesStrip />
      
      {/* Wedding Packages Overview */}
      <ServicesOverview />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Equipment Rental Highlight */}
      <EquipmentHighlight />
      
      {/* Instant Photos Badge */}
      <InstantServicesBadge />
      
      {/* Trust Line */}
      <TrustLine />
    </>
  )
}
