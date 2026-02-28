/** GET /api/admin/products — list all products from DB */
export default defineEventHandler(async () => {
  const db = useDb()
  return await db.product.findMany({ orderBy: { id: 'asc' } })
})
