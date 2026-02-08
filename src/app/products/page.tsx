import type { Metadata } from 'next'
import { ProductsHero } from './components/ProductsHero'
import { ProductsGrid } from './components/ProductsGrid'

export const metadata: Metadata = {
  title: 'Shop Products',
  description: 'Shop for photo prints, frames, albums, merchandise and more at SP Digital Studio.',
}

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsGrid />
    </>
  )
}
