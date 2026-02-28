/** POST /api/admin/water-quality — create a water quality entry */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { label, value, unit, subtitle, icon, sort_order, last_tested } = body || {}

  if (!label || !value) {
    throw createError({ statusCode: 400, statusMessage: 'Label and value are required' })
  }

  const db = useDb()
  
  // Parse last_tested string into Date or use current date
  const testedDate = last_tested ? new Date(last_tested) : new Date()

  const result = await db.waterQuality.create({
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
