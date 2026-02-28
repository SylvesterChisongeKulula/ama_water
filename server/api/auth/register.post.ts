export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body || {}

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email and password are required' })
  }

  if (password.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 6 characters' })
  }

  const db = useDb()

  // Check if user already exists
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
  }

  const hashed = await hashPassword(password)
  const result = await db.user.create({
    data: { name, email, password: hashed }
  })

  const token = createSession(result.id, email, name)

  return { token, user: { id: result.id, name, email } }
})
