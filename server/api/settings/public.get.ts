/** GET /api/settings/public — public: get public settings (map, contact email) */
export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db.setting.findMany({
    where: {
      key: {
        in: ['map_lat', 'map_lng', 'map_address', 'contact_email', 'contact_phone', 'business_hours']
      }
    }
  })

  const settings: Record<string, string> = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }
  return settings
})
