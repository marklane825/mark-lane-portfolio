import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

// Single shared builder — import urlFor from '@/sanity/lib/image' everywhere
const builder = createImageUrlBuilder(client)

export const urlFor = (source) => {
  if (!source || !source.asset) return null
  return builder.image(source)
}
