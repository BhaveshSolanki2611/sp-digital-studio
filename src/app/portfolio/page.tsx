import type { Metadata } from 'next'
import { PortfolioHero } from './components/PortfolioHero'
import { PortfolioGrid } from './components/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'View our photography portfolio - weddings, pre-wedding shoots, events, product photography and more.',
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
    </>
  )
}
