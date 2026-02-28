/** GET /api/admin/settings — get all settings */
export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db.setting.findMany()
  
  // Return as a key-value object for convenient frontend use
  const settings: Record<string, string> = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }
  return settings
})
