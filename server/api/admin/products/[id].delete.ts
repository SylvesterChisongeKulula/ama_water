/** DELETE /api/admin/products/:id — delete a product */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const db = useDb()
  await db.product.delete({ where: { id: Number(id) } })

  return { ok: true }
})
