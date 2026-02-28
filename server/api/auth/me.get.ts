export default defineEventHandler((event) => {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const session = getSession(token)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Session expired' })
  }

  return { user: { id: session.userId, name: session.name, email: session.email } }
})
