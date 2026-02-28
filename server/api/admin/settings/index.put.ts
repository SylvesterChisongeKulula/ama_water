/** PUT /api/admin/settings — update settings */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Settings object is required' })
  }

  const db = useDb()

  const entries = Object.entries(body as Record<string, string>)
  const operations = entries.map(([key, value]) => {
    return db.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    })
  })

  await db.$transaction(operations)

  return { ok: true }
})
