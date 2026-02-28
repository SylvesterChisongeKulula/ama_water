/** POST /api/admin/products — create a new product */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, slug, size, description, price, category, icon } = body || {}

  if (!name || !slug || !size || !description) {
    throw createError({ statusCode: 400, statusMessage: 'Name, slug, size, and description are required' })
  }

  const db = useDb()
  const result = await db.product.create({
    data: {
      name,
      slug,
      size,
      description,
      price: price || 0,
      category: category || 'still',
      icon: icon || 'lucide:glass-water'
    }
  })

  return result
})
