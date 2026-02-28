/** PUT /api/admin/water-quality/:id — update a water quality entry */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { label, value, unit, subtitle, icon, sort_order, last_tested } = body || {}

  if (!label || !value) {
    throw createError({ statusCode: 400, statusMessage: 'Label and value are required' })
  }

  const db = useDb()
  
  const testedDate = last_tested ? new Date(last_tested) : new Date()

  const result = await db.waterQuality.update({
    where: { id: Number(id) },
    data: {
      label,
      value,
      unit: unit || '',
      subtitle: subtitle || '',
      icon: icon || 'lucide:droplets',
      sort_order: parseInt(sort_order) || 0,
      last_tested: testedDate
    }
  })

  return result
})
