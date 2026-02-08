import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration for Sanity client
// Update NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local after creating project
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

// Create client
export const sanityClient = createClient(sanityConfig)

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch helpers
export async function getPortfolioItems() {
  return sanityClient.fetch(`
    *[_type == "portfolio"] | order(date desc) {
      _id,
      title,
      slug,
      category,
      "mainImage": mainImage.asset->url,
      date,
      featured
    }
  `)
}

export async function getBlogPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "mainImage": mainImage.asset->url,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title
    }
  `)
}

export async function getBlogPost(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      body,
      "mainImage": mainImage.asset->url,
      publishedAt,
      "author": author->{name, image},
      "categories": categories[]->title
    }
  `, { slug })
}
