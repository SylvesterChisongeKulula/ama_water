/** PUT /api/admin/products/:id — update a product */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { name, slug, size, description, price, category, icon, in_stock } = body || {}

  if (!name || !slug || !size || !description) {
    throw createError({ statusCode: 400, statusMessage: 'Name, slug, size, and description are required' })
  }

  const db = useDb()
  const result = await db.product.update({
    where: { id: Number(id) },
    data: {
      name,
      slug,
      size,
      description,
      price: price || 0,
      category: category || 'still',
      icon: icon || 'lucide:glass-water',
      in_stock: in_stock ?? 1
    }
  })

  return result
})
