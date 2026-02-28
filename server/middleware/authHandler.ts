export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  
  // Only protect /api/admin/* routes
  if (path.startsWith('/api/admin')) {
    const authHeader = getHeader(event, 'Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      throw createError({ statusCode: 401, statusMessage: 'Token missing' })
    }
    const session = getSession(token)
    
    if (!session) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }

    // Attach user to event context for downstream usage
    event.context.user = session
  }
})
