import type { Metadata } from 'next'
import { EquipmentHero } from './components/EquipmentHero'
import { EquipmentList } from './components/EquipmentList'
import { TrustLine } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Equipment Rental',
  description: 'Rent professional photography and event equipment - LED screens, drones, 360 selfie booths, and more.',
}

export default function EquipmentRentalPage() {
  return (
    <>
      <EquipmentHero />
      <EquipmentList />
      <TrustLine />
    </>
  )
}
