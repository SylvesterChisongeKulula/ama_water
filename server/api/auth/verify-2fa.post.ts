export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, code } = body || {}

  if (!email || !code) {
    throw createError({ statusCode: 400, statusMessage: 'Email and code are required' })
  }

  const db = useDb()
  const user = await db.user.findUnique({ where: { email } })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired 2FA code' })
  }

  if (
    !user.two_factor_code ||
    user.two_factor_code !== code ||
    !user.two_factor_expires ||
    user.two_factor_expires < new Date()
  ) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired 2FA code' })
  }

  // Clear 2FA fields securely
  await db.user.update({
    where: { id: user.id },
    data: {
      two_factor_code: null,
      two_factor_expires: null
    }
  })

  const token = createSession(user.id, user.email, user.name)

  return { token, user: { id: user.id, name: user.name, email: user.email } }
})
