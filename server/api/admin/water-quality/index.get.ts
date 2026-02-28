/** GET /api/admin/water-quality — list all water quality entries */
export default defineEventHandler(async () => {
  const db = useDb()
  return await db.waterQuality.findMany({ orderBy: { sort_order: 'asc' } })
})
