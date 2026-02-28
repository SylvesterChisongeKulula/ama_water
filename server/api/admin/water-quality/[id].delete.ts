/** DELETE /api/admin/water-quality/:id — delete a water quality entry */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const db = useDb()
  await db.waterQuality.delete({ where: { id: Number(id) } })

  return { ok: true }
})
