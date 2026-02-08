import type { Metadata } from 'next'
import { AboutHero } from './components/AboutHero'
import { FounderStory } from './components/FounderStory'
import { Timeline } from './components/Timeline'
import { WhyChooseUs } from './components/WhyChooseUs'
import { StatsSection } from '@/components/sections'
import { TrustLine } from '@/components/sections'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about SP Digital Studio & Color Lab - Photography & videography services since 1996. Founded by Satpal Solanki in Najafgarh, New Delhi.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderStory />
      <Timeline />
      <StatsSection variant="dark" />
      <WhyChooseUs />
      <TrustLine />
    </>
  )
}
