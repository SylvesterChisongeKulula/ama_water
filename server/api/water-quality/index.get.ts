/** GET /api/water-quality — public: list water quality data */
export default defineEventHandler(async () => {
  const db = useDb()
  const entries = await db.waterQuality.findMany({ orderBy: { sort_order: 'asc' } })
  const settings = await db.setting.findUnique({ where: { key: 'quality_quote' } })
  
  return {
    entries,
    quote: settings?.value || '',
  }
})
