import type { Metadata } from 'next'
import { RestorationHero } from './components/RestorationHero'
import { RestorationServices } from './components/RestorationServices'
import { RestorationForm } from './components/RestorationForm'

export const metadata: Metadata = {
  title: 'Photo Restoration & Colorization',
  description: 'Restore old, damaged photos and colorize black & white images. Upload for a free estimate.',
}

export default function RestorationPage() {
  return (
    <>
      <RestorationHero />
      <RestorationServices />
      <RestorationForm />
    </>
  )
}
