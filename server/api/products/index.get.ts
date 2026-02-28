/** GET /api/products — public: list all products from DB */
export default defineEventHandler(async () => {
  const db = useDb()
  return await db.product.findMany({
    where: { in_stock: 1 },
    orderBy: { id: 'asc' }
  })
})
