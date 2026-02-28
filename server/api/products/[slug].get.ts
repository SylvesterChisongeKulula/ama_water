/**
 * GET /api/products/:slug
 * Returns a single product by slug.
 */
import { getProductBySlug } from '~~/server/services/productService'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Product slug is required' })
  }

  const product = getProductBySlug(slug)

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return product
})
